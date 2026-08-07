import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'

export default function CurtainTransition({ children }: { children: ReactNode }) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (!leftRef.current || !rightRef.current) return
    const delay = isFirstRender.current ? 0.2 : 0.06

    gsap.set([leftRef.current, rightRef.current], { xPercent: 0 })
    window.scrollTo(0, 0)
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut', duration: 0.7 } })
    tl.to(leftRef.current, { xPercent: -100, delay }, 0).to(rightRef.current, { xPercent: 100, delay }, 0)

    isFirstRender.current = false
    return () => {
      tl.kill()
    }
  }, [pathname])

  return (
    <>
      <div
        ref={leftRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-50 w-1/2 bg-gradient-to-r from-void via-void to-cyan-neon/25"
        style={{ boxShadow: '10px 0 50px rgba(59,130,246,0.35)' }}
      />
      <div
        ref={rightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 right-0 z-50 w-1/2 bg-gradient-to-l from-void via-void to-magenta-neon/25"
        style={{ boxShadow: '-10px 0 50px rgba(96,165,250,0.35)' }}
      />
      {children}
    </>
  )
}
