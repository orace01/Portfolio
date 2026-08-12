import type { ReactNode } from 'react'
import PageShell from '@/components/layout/PageShell'
import GlowCard from '@/components/ui/GlowCard'
import { useCaineReaction } from '@/hooks/useCaineReaction'

type FactTone = 'cyan' | 'magenta' | 'purple' | 'green'

interface Fact {
  label: string
  value: string
  tone: FactTone
  icon: ReactNode
  reaction?: string
}

const TONE_TEXT: Record<FactTone, string> = {
  cyan: 'text-cyan-neon',
  magenta: 'text-magenta-neon',
  purple: 'text-neon-purple',
  green: 'text-neon-green',
}

const QUICK_FACTS: Fact[] = [
  {
    label: 'Location',
    value: 'Cotonou, Benin',
    tone: 'cyan',
    reaction: 'Cotonou, GMT+1 — the circus never really closes there.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 21s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Education',
    value: 'Epitech — IT Expert',
    tone: 'magenta',
    reaction: "Epitech's IT Expert track. Translation: ambitious deadlines, minimal sleep.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.6}>
        <path d="M2 9l10-5 10 5-10 5L2 9z" strokeLinejoin="round" />
        <path d="M6 11.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5" strokeLinejoin="round" />
        <path d="M22 9v5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Focus',
    value: 'Systems + AI + Creative Engineering',
    tone: 'purple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.6}>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Status',
    value: 'Open to opportunities',
    tone: 'green',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.6}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.3l2.6 2.6L16 9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

interface Value {
  text: string
  reaction?: string
}

const VALUES: Value[] = [
  {
    text: 'Correctness first, performance second, polish third — in that order, always.',
    reaction: 'Ask him about the bug that taught him this one. Bring coffee.',
  },
  { text: 'Low-level understanding makes high-level code trustworthy, not just fast.' },
  { text: "If it isn't fun to use, it isn't finished." },
  { text: 'Ship small, ship often — production is the real code review.' },
]

function FactChip({ fact }: { fact: Fact }) {
  const reaction = useCaineReaction(fact.reaction ?? '')
  const handlers = fact.reaction ? reaction : {}

  return (
    <GlowCard
      tone={fact.tone}
      tabIndex={fact.reaction ? 0 : undefined}
      className={`flex items-center gap-3 text-left ${fact.reaction ? 'cursor-help' : ''}`}
      {...handlers}
    >
      <span className={TONE_TEXT[fact.tone]}>{fact.icon}</span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">{fact.label}</p>
        <p className="text-sm font-semibold text-neutral-200 sm:text-base">{fact.value}</p>
      </div>
    </GlowCard>
  )
}

function ValueItem({ value, index }: { value: Value; index: number }) {
  const reaction = useCaineReaction(value.reaction ?? '')
  const handlers = value.reaction ? reaction : {}

  return (
    <li
      tabIndex={value.reaction ? 0 : undefined}
      className={`flex items-start gap-3 rounded-xl px-2 py-1.5 transition-colors duration-300 hover:bg-white/[0.03] ${value.reaction ? 'cursor-help' : ''}`}
      {...handlers}
    >
      <span className="mt-0.5 font-mono text-xs text-neon-purple">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-sm text-neutral-300 sm:text-base">{value.text}</span>
    </li>
  )
}

export default function About() {
  const circusReaction = useCaineReaction("That's my kingdom you're reading about. Mind the cables.")

  return (
    <PageShell title="ABOUT" subtitle="The human behind the jaw.">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <GlowCard tone="cyan">
          <h2 className="neon-text-cyan text-xs font-bold uppercase tracking-[0.25em]">Who's Behind The Jaw</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
            I'm <span className="font-semibold text-neutral-100">Honfin Orace</span>, a full-stack developer and
            creative technologist currently training as an IT Expert at{' '}
            <span className="font-semibold text-magenta-neon">Epitech</span>, based in Cotonou, Benin. I live at the
            intersection of systems-level engineering — Rust, C++, the layers underneath the abstractions — and
            distributed machine learning, with a steady detour into expressive front-end and creative-coding work.
          </p>
          <p className="mt-3 text-base leading-relaxed text-neutral-300 sm:text-lg">
            That mix is exactly why this portfolio is a{' '}
            <span tabIndex={0} className="neon-text-magenta cursor-help font-semibold" {...circusReaction}>
              Digital Circus
            </span>{' '}
            instead of a resume: Caine, the AI ringmaster you've been talking to, exists to walk visitors through the
            acts — projects, skills, and whatever gets built next — without pretending any of it is a finished show.
          </p>
        </GlowCard>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {QUICK_FACTS.map((fact) => (
            <FactChip key={fact.label} fact={fact} />
          ))}
        </div>

        <GlowCard tone="purple">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-neon-purple">How I Work</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {VALUES.map((value, index) => (
              <ValueItem key={value.text} value={value} index={index} />
            ))}
          </ul>
        </GlowCard>

        <GlowCard tone="magenta" className="text-center">
          <p className="neon-text-magenta text-lg font-semibold sm:text-xl">
            "He builds the circus. I just sell the tickets."
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            — Caine, Ringmaster of the Digital Circus
          </p>
        </GlowCard>
      </div>
    </PageShell>
  )
}
