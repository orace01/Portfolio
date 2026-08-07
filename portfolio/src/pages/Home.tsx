import { type CSSProperties, type FormEvent, type MouseEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IntroSequence from '@/components/intro/IntroSequence'
import OutroSequence from '@/components/outro/OutroSequence'
import GlowCard from '@/components/ui/GlowCard'
import { NeonButton } from '@/components/ui/NeonButton'
import StatusBadge from '@/components/ui/StatusBadge'
import { useCaine } from '@/context/CaineContext'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'
import { PROJECTS, type ProjectTone } from '@/data/projects'
import { SKILL_CATEGORIES, type SkillTone } from '@/data/skills'

const TONE_RGB: Record<ProjectTone | SkillTone, string> = {
  cyan: '0,243,255',
  magenta: '255,0,127',
  purple: '139,47,255',
  green: '57,255,20',
}

const TAG_HOVER: Record<ProjectTone | SkillTone, string> = {
  cyan: 'hover:border-cyan-neon hover:text-cyan-neon hover:shadow-glow-cyan',
  magenta: 'hover:border-magenta-neon hover:text-magenta-neon hover:shadow-glow-magenta',
  purple: 'hover:border-neon-purple hover:text-neon-purple hover:shadow-glow-purple',
  green: 'hover:border-neon-green hover:text-neon-green hover:shadow-glow-green',
}

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
    tone: 'magenta' as const,
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

const NAV_TONE_STYLES: Record<NavTone, { text: string; border: string; shadow: string; hoverShadow: string }> = {
  cyan: {
    text: 'text-cyan-neon',
    border: 'border-cyan-neon',
    shadow: 'shadow-[0_0_10px_rgba(0,243,255,0.7),0_0_35px_rgba(0,243,255,0.5),0_0_70px_rgba(0,243,255,0.25)]',
    hoverShadow: 'hover:shadow-[0_0_16px_rgba(0,243,255,0.9),0_0_55px_rgba(0,243,255,0.7),0_0_100px_rgba(0,243,255,0.4)]',
  },
  magenta: {
    text: 'text-magenta-neon',
    border: 'border-magenta-neon',
    shadow: 'shadow-[0_0_10px_rgba(255,0,127,0.7),0_0_35px_rgba(255,0,127,0.5),0_0_70px_rgba(255,0,127,0.25)]',
    hoverShadow: 'hover:shadow-[0_0_16px_rgba(255,0,127,0.9),0_0_55px_rgba(255,0,127,0.7),0_0_100px_rgba(255,0,127,0.4)]',
  },
  blue: {
    text: 'text-neon-blue',
    border: 'border-neon-blue',
    shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.7),0_0_35px_rgba(59,130,246,0.5),0_0_70px_rgba(59,130,246,0.25)]',
    hoverShadow: 'hover:shadow-[0_0_16px_rgba(59,130,246,0.9),0_0_55px_rgba(59,130,246,0.7),0_0_100px_rgba(59,130,246,0.4)]',
  },
  green: {
    text: 'text-neon-green',
    border: 'border-neon-green',
    shadow: 'shadow-[0_0_10px_rgba(57,255,20,0.7),0_0_35px_rgba(57,255,20,0.5),0_0_70px_rgba(57,255,20,0.25)]',
    hoverShadow: 'hover:shadow-[0_0_16px_rgba(57,255,20,0.9),0_0_55px_rgba(57,255,20,0.7),0_0_100px_rgba(57,255,20,0.4)]',
  },
}

const QUICK_LINKS = [
  { label: 'Inspect Projects', to: '/projects' },
  { label: 'Core Skills', to: '/skills' },
  { label: 'Meet The Creator', to: '/about' },
  { label: 'Ask The Ringmaster', to: null },
]

const RINGMASTER_REPLIES = [
  'Interesting query. Filed under things I will exaggerate about later.',
  "Ask him directly — I'm contractually just the mouthpiece.",
  'That question deserves a full case study. Try Showcase.',
  "My circuits say yes. His git log says it's complicated.",
]

const FEATURED_PROJECTS = PROJECTS.slice(0, 3)
const FEATURED_SKILLS = SKILL_CATEGORIES.slice(0, 3)

const TONE_TEXT: Record<ProjectTone | SkillTone, string> = {
  cyan: 'text-cyan-neon',
  magenta: 'text-magenta-neon',
  purple: 'text-neon-purple',
  green: 'text-neon-green',
}

function NavGridCard({ to, tone, label, icon, reactionKey }: (typeof NAV_CARDS)[number]) {
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
      className={`relative flex cursor-pointer flex-col items-center gap-5 overflow-hidden rounded-3xl border-[3px] py-12 text-center backdrop-blur-[16px] transition-all duration-300 hover:scale-[1.03] ${styles.border} ${styles.shadow} ${styles.hoverShadow}`}
      style={{
        background: 'linear-gradient(165deg, rgba(20,22,38,0.55), rgba(6,7,18,0.85))',
      }}
      {...reaction}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent"
      />
      <span className={`relative drop-shadow-[0_0_14px_currentColor] ${styles.text}`}>{icon}</span>
      <span
        className={`relative text-xl font-bold uppercase tracking-[0.15em] drop-shadow-[0_0_12px_currentColor] ${styles.text}`}
      >
        {label}
      </span>
    </div>
  )
}

function SectionHeading({ eyebrow, title, tone }: { eyebrow: string; title: string; tone: ProjectTone }) {
  return (
    <div className="mb-10 text-center">
      <p className={`font-mono text-sm uppercase tracking-[0.3em] ${TONE_TEXT[tone]}`}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-wide text-slate-100 sm:text-4xl">{title}</h2>
    </div>
  )
}

function FeaturedProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const reaction = useCaineReaction(HOVER_LINES[project.reactionKey])
  const wrapRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: py * -9, ry: px * 9 })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
    reaction.onMouseLeave()
  }

  return (
    <div
      ref={wrapRef}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={reaction.onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={reaction.onFocus}
      onBlur={reaction.onBlur}
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <GlowCard
        tone={project.tone}
        className="relative flex flex-col gap-4 overflow-hidden group-hover:[animation:border-glow-pulse_1.4s_ease-in-out_infinite]"
        style={{ '--glow-rgb': TONE_RGB[project.tone] } as CSSProperties}
      >
        <span aria-hidden="true" className="glass-shimmer" />
        <div className="relative flex items-start justify-between gap-3">
          <h3 className={`text-lg font-bold tracking-wide ${TONE_TEXT[project.tone]}`}>{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="relative text-base text-slate-300">{project.summary}</p>
        <div className="relative mt-1 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`chip-pill rounded-full border border-white/10 px-2.5 py-1 font-mono text-xs text-slate-400 transition-all duration-200 ${TAG_HOVER[project.tone]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}

function FeaturedSkillCard({ category }: { category: (typeof SKILL_CATEGORIES)[number] }) {
  const reaction = useCaineReaction(HOVER_LINES[category.hoverKey])
  const rgb = TONE_RGB[category.tone]
  return (
    <GlowCard tone={category.tone} className="flex flex-col gap-4" {...reaction}>
      <h3 className={`text-lg font-bold tracking-wide ${TONE_TEXT[category.tone]}`}>{category.title}</h3>
      <div className="flex flex-wrap gap-3">
        {category.skills.slice(0, 4).map((skill) => (
          <span
            key={skill.name}
            className={`chip-pill cursor-default rounded-md border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-slate-300 transition-transform duration-200 hover:scale-105 hover:text-white hover:[animation:border-glow-pulse_0.8s_ease-in-out_infinite]`}
            style={{ '--glow-rgb': rgb } as CSSProperties}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </GlowCard>
  )
}

export default function Home() {
  const { say } = useCaine()
  const [question, setQuestion] = useState('')
  const navigate = useNavigate()
  const contactReaction = useCaineReaction(HOVER_LINES['nav-contact'])

  const handleAsk = (e: FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    say(RINGMASTER_REPLIES[Math.floor(Math.random() * RINGMASTER_REPLIES.length)])
    setQuestion('')
  }

  const handleQuickLink = (link: (typeof QUICK_LINKS)[number]) => {
    if (link.to) {
      navigate(link.to)
    } else {
      say(RINGMASTER_REPLIES[Math.floor(Math.random() * RINGMASTER_REPLIES.length)])
    }
  }

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col items-center px-4 pb-24 sm:px-6">
      <IntroSequence />
      {/* space reserved for the absolutely-positioned Caine mascot + bubble stacked above */}
      <div className="h-[260px] sm:h-[340px] md:h-[420px]" aria-hidden="true" />

      <form
        onSubmit={handleAsk}
        data-intro="interface"
        className="glass-panel neon-border-cyan flex w-full max-w-3xl items-center gap-3 px-5 py-4"
      >
        <span className="font-mono text-cyan-neon">{'>'}</span>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask the neural network a question..."
          className="flex-1 bg-transparent text-base text-slate-200 outline-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-magenta-neon/20 text-magenta-neon shadow-glow-magenta transition-transform hover:scale-110"
        >
          →
        </button>
      </form>

      <div data-intro="interface" className="mt-5 flex flex-wrap justify-center gap-3">
        {QUICK_LINKS.map((link) => (
          <button
            key={link.label}
            type="button"
            onClick={() => handleQuickLink(link)}
            className="bracket-btn rounded-full border border-white/10 px-4 py-2 text-sm hover:border-cyan-neon/50"
          >
            [ {link.label} ]
          </button>
        ))}
      </div>

      <div className="mt-16 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {NAV_CARDS.map((card) => (
          <NavGridCard key={card.to} {...card} />
        ))}
      </div>

      <section className="mt-28 w-full">
        <SectionHeading eyebrow="Showcase" title="Featured Projects" tone="cyan" />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <FeaturedProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <NeonButton type="button" tone="cyan" onClick={() => navigate('/projects')}>
            [ View All Projects ]
          </NeonButton>
        </div>
      </section>

      <section className="mt-28 w-full">
        <SectionHeading eyebrow="Lab" title="Core Skills" tone="magenta" />
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-3">
          {FEATURED_SKILLS.map((category) => (
            <FeaturedSkillCard key={category.hoverKey} category={category} />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <NeonButton type="button" tone="magenta" onClick={() => navigate('/skills')}>
            [ View Full Skill Tree ]
          </NeonButton>
        </div>
      </section>

      <section className="mt-28 w-full max-w-2xl">
        <SectionHeading eyebrow="Direct Line" title="Get In Touch" tone="green" />
        <GlowCard
          tone="green"
          className="relative flex flex-col items-center gap-5 overflow-hidden text-center [animation:border-glow-pulse_3.5s_ease-in-out_infinite]"
          style={{ '--glow-rgb': TONE_RGB.green } as CSSProperties}
          {...contactReaction}
        >
          <div className="mb-1 flex w-full items-center gap-2 border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-neon/70 shadow-glow-cyan" />
            <span className="h-2.5 w-2.5 rounded-full bg-magenta-neon/70 shadow-glow-magenta" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon-green/70 shadow-glow-green" />
            <span className="ml-2">Caine Terminal — Live</span>
          </div>
          <p className="text-base text-slate-300">
            Based in <span className="neon-text-cyan font-semibold">Cotonou, Benin</span> and always reachable.
          </p>
          <a href="mailto:orace.honfin@epitech.eu" className="neon-text-magenta text-xl font-semibold break-all">
            orace.honfin@epitech.eu
          </a>
          <NeonButton
            type="button"
            tone="green"
            onClick={() => navigate('/contact')}
            className="[animation:border-glow-pulse_1.8s_ease-in-out_infinite]"
            style={{ '--glow-rgb': TONE_RGB.green } as CSSProperties}
          >
            [ Send A Message ]
          </NeonButton>
        </GlowCard>
      </section>

      <div className="mt-28 flex w-full flex-col items-center gap-3 border-t border-white/10 pt-12 text-center">
        <p className="font-mono text-base text-slate-400">
          <span className="text-cyan-neon">Cotonou, Benin</span> · <span className="text-magenta-neon">orace.honfin@epitech.eu</span>
        </p>
        <p className="neon-text-cyan mt-2 text-2xl font-semibold sm:text-3xl">
          "Let's code the future, one architecture at a time."
        </p>
      </div>

      <OutroSequence />
    </div>
  )
}
