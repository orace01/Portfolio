import { useEffect, useRef } from 'react'

export default function MouseTorch() {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 3 }

    const apply = () => {
      frame.current = null
      ref.current?.style.setProperty('--torch-x', `${pos.current.x}px`)
      ref.current?.style.setProperty('--torch-y', `${pos.current.y}px`)
    }

    const onMove = (e: PointerEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (frame.current === null) frame.current = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-intro="torch"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] hidden sm:block"
      style={{
        background:
          'radial-gradient(220px circle at var(--torch-x, 50%) var(--torch-y, 33%), rgba(59,130,246,0.22), rgba(96,165,250,0.13) 45%, transparent 70%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
