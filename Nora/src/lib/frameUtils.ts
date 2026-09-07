/** Manifest written by scripts/extract-frames.js, served from public/frames/manifest.json */
export interface FrameManifest {
  count: number
  prefix: string
  ext: string
  digits: number
  width?: number
  height?: number
}

export const FRAMES_BASE_PATH = '/frames'
export const MANIFEST_URL = `${FRAMES_BASE_PATH}/manifest.json`

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Maps a 0..1 scroll progress value to a bounded frame index. */
export function frameIndexFromProgress(progress: number, frameCount: number): number {
  if (frameCount <= 1) return 0
  const index = Math.round(clamp(progress, 0, 1) * (frameCount - 1))
  return clamp(index, 0, frameCount - 1)
}

/** fileNumber is 1-based, matching ffmpeg's spine_0001.webp naming. */
export function frameUrl(fileNumber: number, manifest: FrameManifest): string {
  const n = String(fileNumber).padStart(manifest.digits, '0')
  return `${FRAMES_BASE_PATH}/${manifest.prefix}${n}.${manifest.ext}`
}
