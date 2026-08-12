import { useEffect, useRef } from 'react'

/**
 * A soft white torch that follows the cursor across the entire site, sitting above every page's
 * background, glow orbs and cards. Purely decorative (pointer-events-none, aria-hidden), driven
 * imperatively so it never triggers a React re-render on mousemove.
 */
export default function GlobalSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(200px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 45%, transparent 80%)`
      el.style.opacity = '1'
    }
    const handleLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-0 transition-opacity duration-300"
    />
  )
}
