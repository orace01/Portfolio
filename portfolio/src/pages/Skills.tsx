import type { ReactNode } from 'react'
import PageShell from '@/components/layout/PageShell'
import GlowCard from '@/components/ui/GlowCard'
import { SKILL_CATEGORIES, type SkillCategory, type SkillTone } from '@/data/skills'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

const TONE_TEXT: Record<SkillTone, string> = {
  cyan: 'text-cyan-neon',
  magenta: 'text-magenta-neon',
  purple: 'text-neon-purple',
  green: 'text-neon-green',
}

const TONE_DOT: Record<SkillTone, string> = {
  cyan: 'bg-cyan-neon',
  magenta: 'bg-magenta-neon',
  purple: 'bg-neon-purple',
  green: 'bg-neon-green',
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'skill-languages': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <path d="M9 6 3 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'skill-systems': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" strokeLinecap="round" />
    </svg>
  ),
  'skill-web': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" strokeLinecap="round" />
    </svg>
  ),
  'skill-ai': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v6M12 13l-5.5 4M12 13l5.5 4" strokeLinecap="round" />
    </svg>
  ),
  'skill-devops': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.9 8.02 4.5 4.5 0 0 1 16.5 18H7z" strokeLinejoin="round" />
    </svg>
  ),
  'skill-tools': (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="9" width="18" height="11" rx="1" />
      <path d="M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13h18" />
    </svg>
  ),
}

function LevelDots({ level, tone }: { level: number; tone: SkillTone }) {
  return (
    <span className="flex shrink-0 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i < level ? TONE_DOT[tone] : 'border border-white/20'}`} />
      ))}
    </span>
  )
}

function CategoryCard({ category }: { category: SkillCategory }) {
  const reaction = useCaineReaction(HOVER_LINES[category.hoverKey])

  return (
    <GlowCard tone={category.tone} tabIndex={0} className="flex flex-col gap-4" {...reaction}>
      <div className="flex items-center gap-3">
        <span className={TONE_TEXT[category.tone]}>{CATEGORY_ICONS[category.hoverKey]}</span>
        <h2 className={`text-lg font-bold tracking-[0.1em] ${TONE_TEXT[category.tone]}`}>{category.title}</h2>
      </div>
      <ul className="flex flex-col gap-2">
        {category.skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3">
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-slate-300">
              {skill.name}
            </span>
            <LevelDots level={skill.level} tone={category.tone} />
          </li>
        ))}
      </ul>
    </GlowCard>
  )
}

export default function Skills() {
  return (
    <PageShell title="SKILLS" subtitle="The skill tree, grown at Epitech.">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((category) => (
          <CategoryCard key={category.hoverKey} category={category} />
        ))}
      </div>
    </PageShell>
  )
}
