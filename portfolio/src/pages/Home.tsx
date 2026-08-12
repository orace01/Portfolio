import { useNavigate } from 'react-router-dom'
import IntroSequence from '@/components/intro/IntroSequence'
import OutroSequence from '@/components/outro/OutroSequence'
import CardSwap, { Card } from '@/components/ui/CardSwap'
import CircularTechZoom, { type TechCardData } from '@/components/ui/CircularTechZoom'
import Particles from '@/components/ui/Particles'
import StatusBadge from '@/components/ui/StatusBadge'
import { useCaine } from '@/context/CaineContext'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'
import { PROJECTS } from '@/data/projects'
import { SKILL_CATEGORIES } from '@/data/skills'

const TECH_ZOOM_ITEMS: TechCardData[] = SKILL_CATEGORIES.map((category, index) => {
  const topLevel = Math.max(...category.skills.map((skill) => skill.level))
  return {
    tag: `STACK // ${String(index + 1).padStart(2, '0')}`,
    title: category.title,
    subtitle: `${category.skills.length} core skills tracked`,
    description: `Primary tools: ${category.skills
      .slice(0, 3)
      .map((skill) => skill.name)
      .join(', ')}.`,
    badge: `PROFICIENCY ${topLevel}/5`,
  }
})

const NAV_CARDS = [
  {
    to: '/projects',
    tone: 'cyan' as const,
    label: 'PROJECTS',
    reactionKey: 'nav-projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
      </svg>
    ),
  },
  {
    to: '/skills',
    tone: 'cyan' as const,
    label: 'SKILLS',
    reactionKey: 'nav-skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.6}>
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/about',
    tone: 'blue' as const,
    label: 'ABOUT',
    reactionKey: 'nav-about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.6}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c1.5-4.5 5-7 8-7s6.5 2.5 8 7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: '/contact',
    tone: 'green' as const,
    label: 'CONTACT',
    reactionKey: 'nav-contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11" stroke="currentColor" strokeWidth={1.6}>
        <path d="M4 5h16v11H8l-4 4V5z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

type NavTone = (typeof NAV_CARDS)[number]['tone']

const NAV_TONE_STYLES: Record<NavTone, { text: string; border: string }> = {
  cyan: {
    text: 'text-cyan-neon',
    border: 'border-blue-800',
  },
  blue: {
    text: 'text-neon-blue',
    border: 'border-blue-800',
  },
  green: {
    text: 'text-neon-green',
    border: 'border-blue-800',
  },
}

const FEATURED_PROJECTS = PROJECTS.slice(0, 3)

function NavGridCard({
  to,
  tone,
  label,
  icon,
  reactionKey,
  compact,
}: (typeof NAV_CARDS)[number] & { compact?: boolean }) {
  const navigate = useNavigate()
  const reaction = useCaineReaction(HOVER_LINES[reactionKey])
  const styles = NAV_TONE_STYLES[tone]

  return (
    <div
      role="button"
      tabIndex={0}
      data-intro="navcard"
      onClick={() => navigate(to)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(to)}
      className={`relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border-[3px] text-center backdrop-blur-[16px] transition-all duration-300 hover:scale-[1.03] hover:bg-cyan-neon/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] ${
        compact ? 'gap-2 py-5' : 'gap-5 py-12'
      } ${styles.border}`}
      style={{
        background: 'linear-gradient(165deg, rgba(15,23,42,0.55), rgba(6,9,19,0.85))',
      }}
      {...reaction}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent"
      />
      <span className={`relative ${styles.text} ${compact ? 'scale-75' : ''}`}>{icon}</span>
      <span
        className={`relative font-bold uppercase tracking-[0.15em] ${styles.text} ${
          compact ? 'text-sm' : 'text-xl'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default function Home() {
  const { heroAnchorRef } = useCaine()
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4 pb-24 sm:px-6">
      <IntroSequence />

      <div className="relative flex min-h-screen w-full flex-col justify-center pt-20 pb-10">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <Particles
            particleColors={['#00F0FF', '#7000FF']}
            particleCount={180}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={80}
            sizeRandomness={1}
            alphaParticles
            disableRotation={false}
          />
        </div>
        <section className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          {/* Left column: headline, subtitle, bio */}
          <div data-intro="interface" className="flex flex-col justify-center text-left">
            <h1 className="text-[clamp(4.5rem,16vw,15rem)] font-black uppercase leading-[0.85] tracking-tighter">
              <span className="block text-white">Orace</span>
              <span
                className="ml-1 block bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.35)] sm:ml-2"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #FFFFFF, #00F0FF)',
                  fontSize: 'clamp(4.5rem, 17vw, 15.5rem)',
                }}
              >
                Honfin
              </span>
            </h1>
            <p className="mt-6 text-2xl font-semibold tracking-wide text-gray-400">
              Full-Stack Developer &amp; Creative Technologist
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
              I build systems-level software — Rust, C++, distributed machine learning — paired with
              expressive, real-time 3D web experiences. Currently training as an IT Expert at Epitech,
              based in Cotonou, Benin.
            </p>
          </div>

          {/* Right column: reserved space Caine docks himself into (see CaineContext.heroAnchorRef) */}
          <div
            ref={heroAnchorRef}
            className="relative flex h-full min-h-[560px] w-full items-center justify-center"
            aria-hidden="true"
          />
        </section>
      </div>

      <div data-intro="interface" className="grid w-full grid-cols-2 gap-4 pb-8 sm:grid-cols-4">
        {NAV_CARDS.map((card) => (
          <NavGridCard key={card.to} {...card} />
        ))}
      </div>

      <section className="mx-auto flex w-full max-w-[1900px] flex-col items-center px-4 py-16 text-center">
        <div className="mb-16 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
            [ SHOWCASE // ARCHIVES ]
          </span>
          <h2 className="text-5xl font-extrabold leading-none tracking-tight text-white md:text-[6.75rem]">
            Featured Projects
          </h2>
          <p className="mt-1 max-w-lg text-sm font-light text-gray-400">
            A rotating index of live systems, case studies, and architecture specs.
          </p>
        </div>

        <div className="relative mt-16 mb-4 flex w-full items-center justify-center">
          <CardSwap width={1445} height={816} cardDistance={136} verticalDistance={77} skewAmount={0} delay={4500} pauseOnHover>
            {FEATURED_PROJECTS.map((project, index) => (
              <Card
                key={project.slug}
                onClick={() => navigate('/projects')}
                className="flex cursor-pointer flex-col justify-between p-6"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px] text-gray-400">
                    <span>DOC_ID // {String(index + 1).padStart(2, '0')}</span>
                    <StatusBadge status={project.status} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-wide text-white">{project.name}</h3>
                  <p className="mt-2 text-xs font-light leading-relaxed text-gray-400">{project.summary}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[10px]">
                  <div className="flex gap-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-cyan-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-500">v1.{index}.0</span>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>

        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="mt-12 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/60 hover:bg-white/10 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        >
          VIEW ALL PROJECTS ({FEATURED_PROJECTS.length})
        </button>
      </section>

      <CircularTechZoom items={TECH_ZOOM_ITEMS} />

      <OutroSequence />
    </div>
  )
}
