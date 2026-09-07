import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { specialties } from '../data/siteContent'
import { GlassCard } from './GlassCard'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<(typeof specialties)[number]['icon'], string> = {
  spine: '🦴',
  sport: '🏃',
  joint: '🦵',
  minInvasive: '🔬',
}

interface SpecialtiesProps {
  reducedMotion: boolean
}

export function Specialties({ reducedMotion }: SpecialtiesProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-specialty-card]')
    const triggers = Array.from(cards).map((card) =>
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      ),
    )
    return () => {
      for (const tween of triggers) tween.scrollTrigger?.kill()
    }
  }, [reducedMotion])

  return (
    <section id="expertise" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="mx-auto mb-16 max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Domaines d'expertise</h2>
        <p className="mt-4 text-muted">
          Une prise en charge chirurgicale précise, appuyée sur des techniques éprouvées.
        </p>
      </div>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
        {specialties.map((item) => (
          <GlassCard key={item.title}>
            <div data-specialty-card>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line text-2xl" aria-hidden="true">
                {ICONS[item.icon]}
              </span>
              <h3 className="text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  )
}
