import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const STORAGE_KEY = 'hasSeenIntro'

const SEL = {
  circuit: '[data-intro="circuit"]',
  bg: '[data-intro="bg-layer"]',
  torch: '[data-intro="torch"]',
  hat: '[data-intro="hat"]',
  eyes: '[data-intro="eyes"]',
  upperJaw: '[data-intro="upper-jaw"]',
  lowerJaw: '[data-intro="lower-jaw"]',
  bubble: '[data-intro="bubble"]',
  navcard: '[data-intro="navcard"]',
  interface: '[data-intro="interface"]',
}

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return true
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // storage unavailable, nothing to persist
  }
}

export default function IntroSequence() {
  const [active, setActive] = useState(() => !hasSeenIntro())
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const shockwaveRef = useRef<HTMLDivElement>(null)
  const titleGroupRef = useRef<HTMLDivElement>(null)
  const barFillRef = useRef<HTMLDivElement>(null)
  const welcomeRef = useRef<HTMLDivElement>(null)
  const blackoutRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!active) return
    markIntroSeen()

    const jaw = [SEL.eyes, SEL.upperJaw, SEL.lowerJaw]

    // ---- initial hidden states, set before first paint ----
    gsap.set(SEL.circuit, { opacity: 0 })
    gsap.set(SEL.bg, { opacity: 0 })
    gsap.set(SEL.torch, { opacity: 0 })
    gsap.set(SEL.hat, { y: -340, opacity: 1 })
    gsap.set(jaw, { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' })
    gsap.set(SEL.bubble, { opacity: 0 })
    gsap.set(SEL.navcard, { y: 60, opacity: 0 })
    gsap.set(SEL.interface, { y: -20, opacity: 0 })
    if (shockwaveRef.current) gsap.set(shockwaveRef.current, { scale: 0, opacity: 0 })
    if (barFillRef.current) gsap.set(barFillRef.current, { width: '0%' })
    if (welcomeRef.current) gsap.set(welcomeRef.current, { opacity: 0, y: 12 })
    if (blackoutRef.current) gsap.set(blackoutRef.current, { opacity: 1 })

    const tl = gsap.timeline({ onComplete: () => setActive(false) })
    timelineRef.current = tl

    // ============ Phase 1 -- name and neon loading bar, 0.0s to 2.5s ============
    if (barFillRef.current) {
      tl.to(barFillRef.current, { width: '100%', duration: 2.0, ease: 'power1.inOut' }, 0)
    }
    if (titleGroupRef.current) {
      tl.to(titleGroupRef.current, { opacity: 0.4, duration: 0.04 }, 2.02)
        .to(titleGroupRef.current, { opacity: 1, x: -4, duration: 0.04 }, 2.07)
        .to(titleGroupRef.current, { opacity: 0.5, x: 4, duration: 0.04 }, 2.12)
        .to(titleGroupRef.current, { opacity: 1, x: 0, duration: 0.06 }, 2.17)
        .to(titleGroupRef.current, { opacity: 0, duration: 0.35, ease: 'power1.in' }, 2.25)
    }

    // ============ Phase 2 -- Caine assembly and centered welcome text, 2.5s to 4.5s ============
    tl.to(SEL.hat, { y: 0, duration: 0.5, ease: 'bounce.out' }, 2.5)
    tl.to(jaw, { opacity: 1, scale: 1.08, duration: 0.1, ease: 'power1.inOut' }, 2.85)
      .to(jaw, { opacity: 0.35, duration: 0.05 }, 2.93)
      .to(jaw, { opacity: 1, duration: 0.05 }, 2.98)
      .to(jaw, { opacity: 0.5, duration: 0.04 }, 3.04)
      .to(jaw, { opacity: 1, scale: 1, duration: 0.18, ease: 'power2.out' }, 3.09)
    if (welcomeRef.current) {
      tl.to(welcomeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 3.5)
    }

    // ============ Phase 3 -- cyan and magenta shockwave, background ignition, 4.5s to 5.5s ============
    if (blackoutRef.current) {
      tl.to(blackoutRef.current, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 4.5)
    }
    if (shockwaveRef.current) {
      tl.to(shockwaveRef.current, { opacity: 0.9, duration: 0.05 }, 4.5).to(
        shockwaveRef.current,
        { scale: 48, opacity: 0, duration: 1.0, ease: 'power2.out' },
        4.5,
      )
    }
    tl.to(SEL.circuit, { opacity: 1, duration: 0.7, stagger: 0.008, ease: 'power1.out' }, 4.55)
    tl.to(SEL.bg, { opacity: 1, duration: 0.8, ease: 'power1.out' }, 4.6)
    if (welcomeRef.current) {
      tl.to(welcomeRef.current, { opacity: 0, duration: 0.3, ease: 'power1.in' }, 5.15)
    }

    // ============ Phase 4 -- full interface cascade reveal, 5.5s to 7.0s ============
    tl.to(SEL.interface, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 5.5)
    tl.to(
      SEL.navcard,
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.15, ease: 'back.out(1.7)' },
      5.65,
    )
    tl.to(SEL.bubble, { opacity: 1, duration: 0.4 }, 6.1)
    tl.to(SEL.torch, { opacity: 1, duration: 0.4 }, 6.7)

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const handleSkip = () => {
    const tl = timelineRef.current
    if (tl) {
      tl.progress(1)
      tl.kill()
    }
    setActive(false)
  }

  if (!active) return null

  return (
    <>
      <div
        ref={blackoutRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ backgroundColor: '#030303' }}
      />

      <div
        ref={titleGroupRef}
        className="pointer-events-none fixed left-1/2 top-1/2 z-[92] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6"
      >
        <h1 className="text-center text-5xl font-black uppercase tracking-[0.15em] text-cyan-neon sm:text-6xl md:text-7xl">
          Honfin Orace
        </h1>
        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
          <div
            ref={barFillRef}
            className="h-full rounded-full bg-gradient-to-r from-cyan-neon to-magenta-neon"
          />
        </div>
      </div>

      <div
        ref={welcomeRef}
        className="pointer-events-none fixed left-1/2 top-[42%] z-[92] w-[90vw] max-w-xl -translate-x-1/2 text-center"
      >
        <p className="text-xl font-bold uppercase tracking-[0.1em] text-cyan-neon sm:text-2xl">
          Welcome to the Digital Circus... Let's begin the tour!
        </p>
      </div>

      <div
        ref={shockwaveRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 top-[12%] z-[90] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(161,161,170,0.5) 55%, transparent 75%)',
        }}
      />

      <button
        type="button"
        onClick={handleSkip}
        className="fixed right-6 top-24 z-[100] rounded-full border border-cyan-neon/60 bg-void/70 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-neon backdrop-blur-md transition-all hover:scale-105 hover:bg-cyan-neon/10"
      >
        Skip
      </button>
    </>
  )
}
