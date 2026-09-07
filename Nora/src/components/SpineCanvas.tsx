import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { frameIndexFromProgress } from '../lib/frameUtils'

gsap.registerPlugin(ScrollTrigger)

interface SpineCanvasProps {
  images: (HTMLImageElement | null)[]
  frameCount: number
  reducedMotion: boolean
  /** Element whose scroll progress (top->bottom) drives the frame index. */
  scrollTargetId: string
}

/**
 * Fixed full-viewport canvas that paints the preloaded spine frame sequence.
 * The frame shown is driven by overall page scroll progress via
 * ScrollTrigger; the canvas itself never scrolls (position: fixed), so page
 * content scrolls normally above it.
 */
export function SpineCanvas({ images, frameCount, reducedMotion, scrollTargetId }: SpineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentIndexRef = useRef(0)
  const lastDrawnRef = useRef(-1)
  const imagesRef = useRef(images)

  useLayoutEffect(() => {
    imagesRef.current = images
  }, [images])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDrawnRef.current = -1 // force a redraw at the new size
    }

    const nearestImage = (index: number): HTMLImageElement | null => {
      const list = imagesRef.current
      if (list[index]) return list[index]
      for (let offset = 1; offset < list.length; offset += 1) {
        if (list[index - offset]) return list[index - offset]
        if (list[index + offset]) return list[index + offset]
      }
      return null
    }

    const draw = (index: number) => {
      const img = nearestImage(index)
      ctx.clearRect(0, 0, width, height)
      if (!img) return
      // "contain" fit: scale to fit within the viewport without cropping or distorting.
      const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight)
      const drawWidth = img.naturalWidth * scale
      const drawHeight = img.naturalHeight * scale
      const dx = (width - drawWidth) / 2
      const dy = (height - drawHeight) / 2
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    }

    resize()
    draw(currentIndexRef.current)

    window.addEventListener('resize', resize)
    window.addEventListener('orientationchange', resize)

    let rafId = 0
    const tick = () => {
      if (lastDrawnRef.current !== currentIndexRef.current) {
        draw(currentIndexRef.current)
        lastDrawnRef.current = currentIndexRef.current
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    let trigger: ScrollTrigger | undefined
    if (!reducedMotion && frameCount > 0) {
      trigger = ScrollTrigger.create({
        trigger: `#${scrollTargetId}`,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          currentIndexRef.current = frameIndexFromProgress(self.progress, frameCount)
        },
      })
    } else if (frameCount > 0) {
      // Reduced motion: show a single representative frame, no scrubbing.
      currentIndexRef.current = frameIndexFromProgress(0.5, frameCount)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('orientationchange', resize)
      trigger?.kill()
    }
  }, [frameCount, reducedMotion, scrollTargetId])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
