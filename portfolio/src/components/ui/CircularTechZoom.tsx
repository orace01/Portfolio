import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface TechCardData {
  tag: string
  title: string
  subtitle: string
  description: string
  badge: string
}

interface CircularTechZoomProps {
  items: TechCardData[]
}

const RADIUS_X = 340
const RADIUS_Y = 160
const DEPTH_STEP = 2280
const FADE_STEP = 0.15
const PASSED_FADE_STEP = 0.7
const SCROLL_PER_CARD = 1500
// Vortex depth range: cards are born tiny in the far distance and grow as they approach the
// camera, clamped well under the container's `perspective` (1800px) so the near end never enters
// the distorted, oversized close-up zone. Z_FAR is widened alongside DEPTH_STEP so the extra
// per-card distance stays visible instead of every distant card clamping to the same far plane.
const Z_FAR = -12000
const Z_NEAR = 600
const SCALE_FAR = 0.05
const SCALE_NEAR = 1.15
const ROTATION_RANGE = 15

function TechCardNode({ tag, title, subtitle, description, badge }: TechCardData) {
  return (
    <div
      className="glass-panel group relative flex h-[600px] w-[640px] flex-col gap-4 overflow-hidden border-t-2 border-t-white/30 border-blue-800 p-7 shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-colors duration-300 sm:w-[720px]"
    >
      <span className="relative bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text font-mono text-[10px] uppercase tracking-[0.3em] text-transparent">
        {tag}
      </span>
      <div className="relative">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
      </div>
      <p className="relative flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
      <span className="relative inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-cyan-neon">
        {badge}
      </span>
    </div>
  )
}

export default function CircularTechZoom({ items }: CircularTechZoomProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const total = items.length

  useEffect(() => {
    if (!sectionRef.current || total === 0) return

    const ctx = gsap.context(() => {
      const update = (progress: number) => {
        const virtualIndex = progress * (total - 1)

        // Slow continuous roll of the whole stage, so the tunnel reads as a spiral dive
        // rather than a straight zoom.
        const stageRotation = -ROTATION_RANGE + progress * ROTATION_RANGE * 2
        if (stageRef.current) {
          gsap.set(stageRef.current, { rotationZ: stageRotation })
        }

        cardRefs.current.forEach((card, i) => {
          if (!card) return

          const angle = (i / total) * Math.PI * 2
          const rank = i - virtualIndex

          const z = gsap.utils.clamp(Z_FAR, Z_NEAR, -rank * DEPTH_STEP)
          const depthT = (z - Z_FAR) / (Z_NEAR - Z_FAR)
          const scale = SCALE_FAR + depthT * (SCALE_NEAR - SCALE_FAR)
          // Upcoming cards (rank >= 0) stay dimly visible as receding miniatures; cards that have
          // already passed the camera (rank < 0) fade out sharply so the current card fully clears
          // before the next one becomes readable, instead of the two overlapping mid-transition.
          const opacity =
            rank >= 0
              ? gsap.utils.clamp(0.15, 1, 1 - rank * FADE_STEP)
              : gsap.utils.clamp(0, 1, 1 + rank * PASSED_FADE_STEP)
          const isInteractive = rank > -0.5 && rank < 1.5
          // Cards swing out to their orbit slot while upcoming/passed, but pull back to dead
          // center at rank 0 so the active card is always fully on-screen, however large it gets.
          const orbitFactor = gsap.utils.clamp(0, 1, Math.abs(rank))

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: Math.cos(angle) * RADIUS_X * orbitFactor,
            y: Math.sin(angle) * RADIUS_Y * orbitFactor,
            z,
            scale,
            opacity,
            // Counter-rotate against the stage's roll so the card itself stays upright while
            // still orbiting with the spiral.
            rotationZ: -stageRotation,
            zIndex: Math.round(1000 - rank * 10),
            pointerEvents: isInteractive ? 'auto' : 'none',
          })
        })
      }

      update(0)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${total * SCROLL_PER_CARD}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        scrub: 1,
        onUpdate: (self) => update(self.progress),
      })
    }, sectionRef)

    // React 18 StrictMode double-invokes this effect in dev, which can leave GSAP's
    // pin-spacer sized from a stale measurement taken mid create/revert/create cycle.
    // A refresh once the DOM has settled forces ScrollTrigger to re-measure and fixes it.
    // We save the scroll position before and restore it if we were near the top, so the
    // refresh doesn't scroll the page to the pin-spacer position on navigation.
    const raf = requestAnimationFrame(() => {
      const savedScroll = window.scrollY
      ScrollTrigger.refresh()
      if (savedScroll < 50) {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
  }, [total])

  return (
    <div ref={sectionRef} className="relative h-screen w-full">
      {/* Ambient glow orbs to detach the cards from the flat black background. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-10 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-3xl"
      />
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
      >
        {items.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="absolute left-1/2 top-1/2"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <TechCardNode {...item} />
          </div>
        ))}
      </div>
    </div>
  )
}
