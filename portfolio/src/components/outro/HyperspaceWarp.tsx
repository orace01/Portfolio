import { useEffect, useRef } from 'react'

interface Star {
  angle: number
  radius: number
  speed: number
  color: string
}

const DURATION = 2500
const STAR_COUNT = 220

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * 80,
    speed: 0.6 + Math.random() * 1.8,
    color: Math.random() > 0.5 ? '0,243,255' : '255,0,127',
  }))
}

interface HyperspaceWarpProps {
  onDone: () => void
}

export default function HyperspaceWarp({ onDone }: HyperspaceWarpProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = createStars(STAR_COUNT)
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(elapsed / DURATION, 1)
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      ctx.fillStyle = `rgba(5,6,20,${0.12 + t * 0.55})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const accel = 1 + t * t * 26

      for (const s of stars) {
        const prevX = cx + Math.cos(s.angle) * s.radius
        const prevY = cy + Math.sin(s.angle) * s.radius
        s.radius += s.speed * accel
        const x = cx + Math.cos(s.angle) * s.radius
        const y = cy + Math.sin(s.angle) * s.radius

        ctx.strokeStyle = `rgba(${s.color},${0.9 - t * 0.2})`
        ctx.lineWidth = 1.4 + t * 1.2
        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(x, y)
        ctx.stroke()

        const maxRadius = Math.hypot(canvas.width, canvas.height) / 2 + 120
        if (s.radius > maxRadius) {
          s.radius = Math.random() * 40
          s.angle = Math.random() * Math.PI * 2
        }
      }

      if (elapsed < DURATION) {
        frame = requestAnimationFrame(tick)
      } else {
        ctx.fillStyle = '#000000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        onDone()
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]" />
}
