import { useState } from 'react'
import PageShell from '@/components/layout/PageShell'
import GlowCard from '@/components/ui/GlowCard'
import { NeonButton, NeonLink } from '@/components/ui/NeonButton'
import StatusBadge from '@/components/ui/StatusBadge'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'
import { PROJECTS, type Project, type ProjectTone } from '@/data/projects'

const TONE_TEXT: Record<ProjectTone, string> = {
  cyan: 'text-cyan-neon',
  magenta: 'text-magenta-neon',
  purple: 'text-neon-purple',
  green: 'text-neon-green',
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const reaction = useCaineReaction(HOVER_LINES[project.reactionKey])

  return (
    <GlowCard tone={project.tone} className="flex flex-col gap-4" {...reaction}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-lg font-bold tracking-wide ${TONE_TEXT[project.tone]}`}>{project.name}</h3>
        <StatusBadge status={project.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[11px] text-neutral-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-neutral-300">{project.summary}</p>

      <div className="grid transition-[grid-template-rows] duration-300 ease-in-out" style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <p className={`border-t border-white/10 pt-3 text-sm text-neutral-400 transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
            {project.detail}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-2">
        <NeonButton type="button" tone={project.tone} aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          [ {expanded ? 'CLOSE' : 'CASE STUDY'} ]
        </NeonButton>
        <NeonLink href="https://github.com/" target="_blank" rel="noreferrer" tone={project.tone}>
          [ GITHUB ]
        </NeonLink>
      </div>
    </GlowCard>
  )
}

export default function Projects() {
  return (
    <PageShell title="PROJECTS" subtitle="Case studies from the Digital Circus.">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </PageShell>
  )
}
