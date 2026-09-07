#!/usr/bin/env node
/**
 * Découpe public/source/spine.mp4 en une séquence d'images WebP utilisée par
 * SpineCanvas pour l'animation pilotée par le scroll.
 *
 * Usage : node scripts/extract-frames.js [--frames=120] [--no-watermark-mask]
 */
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE_VIDEO = join(ROOT, 'public', 'source', 'spine.mp4')
const FRAMES_DIR = join(ROOT, 'public', 'frames')
const PREFIX = 'spine_'
const DIGITS = 4
const EXT = 'webp'
const MIN_FPS = 5
const MAX_FPS = 30

function fail(message) {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

function parseArgFrames() {
  const arg = process.argv.find((a) => a.startsWith('--frames='))
  const fromEnv = process.env.FRAME_COUNT
  const raw = arg ? arg.split('=')[1] : fromEnv
  const parsed = raw ? Number.parseInt(raw, 10) : 120
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 120
}

function checkFfmpeg() {
  const ffmpeg = spawnSync('ffmpeg', ['-version'])
  const ffprobe = spawnSync('ffprobe', ['-version'])
  if (ffmpeg.error || ffmpeg.status !== 0) {
    fail(
      "FFmpeg est introuvable. Installez-le puis réessayez :\n" +
        '  - macOS   : brew install ffmpeg\n' +
        '  - Ubuntu  : sudo apt install ffmpeg\n' +
        '  - Fedora  : sudo dnf install ffmpeg\n' +
        '  - Windows : https://ffmpeg.org/download.html',
    )
  }
  if (ffprobe.error || ffprobe.status !== 0) {
    fail('ffprobe est introuvable (il est normalement installé avec FFmpeg).')
  }
}

function getDuration() {
  const result = spawnSync('ffprobe', [
    '-v',
    'error',
    '-select_streams',
    'v:0',
    '-show_entries',
    'format=duration',
    '-of',
    'csv=p=0',
    SOURCE_VIDEO,
  ])
  if (result.status !== 0) {
    fail(`Impossible de lire la durée de la vidéo :\n${result.stderr}`)
  }
  const duration = Number.parseFloat(result.stdout.toString().trim())
  if (!Number.isFinite(duration) || duration <= 0) {
    fail('Durée de vidéo invalide.')
  }
  return duration
}

function main() {
  console.log('→ Découpage de la vidéo source en frames…\n')

  if (!existsSync(SOURCE_VIDEO)) {
    fail(
      `Vidéo source introuvable : ${SOURCE_VIDEO}\n` +
        "Placez votre vidéo à cet emplacement exact : public/source/spine.mp4",
    )
  }

  checkFfmpeg()

  const targetFrames = parseArgFrames()
  const duration = getDuration()
  const rawFps = targetFrames / duration
  const fps = Math.min(MAX_FPS, Math.max(MIN_FPS, Math.round(rawFps * 100) / 100))

  console.log(`  Durée de la vidéo   : ${duration.toFixed(2)}s`)
  console.log(`  Frames cibles       : ~${targetFrames}`)
  console.log(`  Fréquence d'extraction : ${fps} fps\n`)

  mkdirSync(FRAMES_DIR, { recursive: true })
  for (const file of readdirSync(FRAMES_DIR)) {
    if (file.startsWith(PREFIX) && file.endsWith(`.${EXT}`)) {
      unlinkSync(join(FRAMES_DIR, file))
    }
  }

  // The bundled Kling AI source clip carries a "KlingAI 3.0" watermark in the
  // bottom-right corner. A heavy boxblur restricted to that corner destroys
  // the logo/text while blending with whatever local background that frame
  // has (a flat fill color mismatches on lighter frames), so no on-screen
  // text survives into the frames — a hard requirement for the medical UI.
  // Disable with --no-watermark-mask if you swap in a clip that doesn't need it.
  const maskWatermark = !process.argv.includes('--no-watermark-mask')
  const scaleStep = 'scale=1920:-1:force_original_aspect_ratio=decrease'
  const filterComplex = maskWatermark
    ? `[0:v]fps=${fps},${scaleStep},split=2[base][wm];` +
      `[wm]crop=340:130:in_w-340:in_h-130,boxblur=30:4[blur];` +
      `[base][blur]overlay=W-340:H-130[outv]`
    : `[0:v]fps=${fps},${scaleStep}[outv]`

  const outputPattern = join(FRAMES_DIR, `${PREFIX}%0${DIGITS}d.${EXT}`)
  const ffmpegArgs = [
    '-y',
    '-i',
    SOURCE_VIDEO,
    '-filter_complex',
    filterComplex,
    '-map',
    '[outv]',
    // Force the still-image libwebp encoder: some ffmpeg builds default a
    // %04d.webp pattern to the animated libwebp_anim muxer, which writes a
    // single multi-frame file instead of one still image per frame.
    '-c:v',
    'libwebp',
    '-q:v',
    '80',
    '-f',
    'image2',
    outputPattern,
  ]

  const result = spawnSync('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'pipe'] })
  if (result.status !== 0) {
    fail(`FFmpeg a échoué :\n${result.stderr}`)
  }

  const generated = readdirSync(FRAMES_DIR)
    .filter((file) => file.startsWith(PREFIX) && file.endsWith(`.${EXT}`))
    .sort()

  if (generated.length === 0) {
    fail("Aucune frame n'a été générée. Vérifiez la vidéo source et les logs FFmpeg ci-dessus.")
  }

  const manifest = {
    count: generated.length,
    prefix: PREFIX,
    ext: EXT,
    digits: DIGITS,
    sourceDuration: duration,
    fps,
    generatedAt: new Date().toISOString(),
  }
  writeFileSync(join(FRAMES_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(`✔ ${generated.length} frames générées dans public/frames/`)
  console.log('✔ Manifeste écrit dans public/frames/manifest.json\n')
}

main()
