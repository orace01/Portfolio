import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience, isDemoContent } from '../data/siteContent'
import { GlassCard } from './GlassCard'

gsap.registerPlugin(ScrollTrigger)

interface ExperienceProps {
  reducedMotion: boolean
}

export function Experience({ reducedMotion }: ExperienceProps) {
  const statsRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reducedMotion || !statsRef.current) return
    const items = statsRef.current.querySelectorAll('[data-stat]')
    const tween = gsap.fromTo(
      items,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
    }
  }, [reducedMotion])

  return (
    <section id="parcours" className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="mx-auto mb-6 max-w-xl text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Parcours &amp; expérience</h2>
        <p className="mt-4 text-muted">{experience.intro}</p>
        {isDemoContent && (
          <p className="mt-2 text-xs uppercase tracking-widest text-muted/70">
            Contenu de démonstration
          </p>
        )}
      </div>

      <div ref={statsRef} className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {experience.stats.map((stat) => (
          <div data-stat key={stat.label} className="rounded-2xl border border-line/70 bg-panel/30 p-6 text-center">
            <p className="text-3xl font-semibold text-cyan">{stat.value}</p>
            <p className="mt-2 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h3 className="mb-4 text-lg font-medium text-white">Formation &amp; parcours</h3>
          <ol className="space-y-4 border-l border-line pl-4">
            {experience.timeline.map((step) => (
              <li key={step.year}>
                <p className="text-xs font-mono text-cyan">{step.year}</p>
                <p className="text-sm text-white">{step.title}</p>
                <p className="text-xs text-muted">{step.place}</p>
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard>
          <h3 className="mb-4 text-lg font-medium text-white">Technologies utilisées</h3>
          <ul className="space-y-3">
            {experience.technologies.map((tech) => (
              <li key={tech} className="flex items-start gap-3 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                {tech}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </section>
  )
}
