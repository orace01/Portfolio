import { useRef, useState } from 'react'
import gsap from 'gsap'
import CaineMascot from '@/components/caine/CaineMascot'
import HyperspaceWarp from './HyperspaceWarp'

type Stage = 'idle' | 'warp' | 'void' | 'reset'

const SPARK_COUNT = 22

function randomSparkOffset() {
  const angle = Math.random() * Math.PI * 2
  const dist = 60 + Math.random() * 170
  return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }
}

function clearIntroFlag() {
  try {
    sessionStorage.removeItem('hasSeenIntro')
  } catch {
    // storage unavailable, nothing to clear
  }
}

export default function OutroSequence() {
  const [stage, setStage] = useState<Stage>('idle')
  const [talkKey, setTalkKey] = useState(0)
  const caineWrapRef = useRef<HTMLDivElement>(null)
  const farewellRef = useRef<HTMLParagraphElement>(null)
  const sparksRef = useRef<HTMLDivElement>(null)

  const handleTrigger = () => {
    document.body.style.overflow = 'hidden'
    setStage('warp')
  }

  const playVoidTimeline = () => {
    const tl = gsap.timeline({ onComplete: () => setStage('reset') })

    if (caineWrapRef.current) {
      gsap.set(caineWrapRef.current, { opacity: 0, scale: 1 })
      tl.to(caineWrapRef.current, { opacity: 1, duration: 1.0, ease: 'power1.out' }, 0)
    }
    tl.call(() => setTalkKey((k) => k + 1), undefined, 0.7)
    if (farewellRef.current) {
      gsap.set(farewellRef.current, { opacity: 0, y: 10 })
      tl.to(farewellRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.6)
    }

    tl.to({}, { duration: 1.1 }, 1.6)

    if (farewellRef.current) {
      tl.to(farewellRef.current, { opacity: 0, duration: 0.4 }, 2.7)
    }
    if (caineWrapRef.current) {
      tl.to(caineWrapRef.current, { opacity: 0, scale: 1.15, duration: 0.7, ease: 'power1.in' }, 2.7)
    }
    if (sparksRef.current) {
      Array.from(sparksRef.current.children).forEach((el) => {
        const { x, y } = randomSparkOffset()
        gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0.6 })
        tl.to(el, { opacity: 1, duration: 0.15 }, 2.75).to(
          el,
          { x, y, opacity: 0, scale: 1.4, duration: 0.9, ease: 'power2.out' },
          2.8,
        )
      })
    }
  }

  const handleWarpDone = () => {
    setStage('void')
    requestAnimationFrame(() => playVoidTimeline())
  }

  const handleRestart = () => {
    clearIntroFlag()
    document.body.style.overflow = ''
    window.scrollTo({ top: 0, behavior: 'auto' })
    window.location.reload()
  }

  if (stage === 'idle') {
    return (
      <div className="mt-20 flex w-full justify-center">
        <button
          type="button"
          onClick={handleTrigger}
          className="group flex items-center gap-2 rounded-full border border-cyan-neon/50 bg-white/[0.02] px-8 py-4 font-mono text-sm uppercase tracking-[0.25em] text-cyan-neon shadow-glow-cyan transition-all hover:scale-105 hover:bg-cyan-neon/10"
        >
          [ <span className="inline-block animate-pulse">↓</span> End Show ]
        </button>
      </div>
    )
  }

  return (
    <>
      {stage === 'warp' && <HyperspaceWarp onDone={handleWarpDone} />}

      {(stage === 'void' || stage === 'reset') && (
        <div className="fixed inset-0 z-[150]" style={{ backgroundColor: '#060913' }}>
          {stage === 'void' && (
            <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center gap-8">
              <div ref={caineWrapRef} className="relative h-[280px] w-[280px]">
                <CaineMascot excited={false} talkKey={talkKey} />
                <div ref={sparksRef} className="absolute left-1/2 top-1/2">
                  {Array.from({ length: SPARK_COUNT }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: i % 2 ? '#60A5FA' : '#3B82F6',
                        boxShadow: `0 0 8px ${i % 2 ? '#60A5FA' : '#3B82F6'}`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <p
                ref={farewellRef}
                className="w-[90vw] max-w-xl text-center text-xl font-bold uppercase tracking-[0.08em] text-cyan-neon [text-shadow:0_0_10px_rgba(59,130,246,0.85),0_0_30px_rgba(96,165,250,0.4)] sm:text-2xl"
              >
                Thank you for visiting the Digital Circus... Until next time!
              </p>
            </div>
          )}

          {stage === 'reset' && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-8">
              <h1 className="text-center text-5xl font-black uppercase tracking-[0.15em] text-cyan-neon sm:text-6xl md:text-7xl [text-shadow:0_0_12px_rgba(59,130,246,0.9),0_0_40px_rgba(59,130,246,0.6),0_0_80px_rgba(96,165,250,0.4)]">
                Honfin Orace
              </h1>
              <button
                type="button"
                onClick={handleRestart}
                className="rounded-full border border-magenta-neon/60 bg-magenta-neon/10 px-10 py-4 font-mono text-lg uppercase tracking-[0.25em] text-magenta-neon shadow-glow-magenta transition-all hover:scale-105 hover:bg-magenta-neon/20"
              >
                [ Start ]
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
