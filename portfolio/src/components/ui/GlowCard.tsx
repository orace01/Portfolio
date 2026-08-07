import type { HTMLAttributes, ReactNode } from 'react'

type Tone = 'cyan' | 'magenta' | 'purple' | 'green'

const TONE_CLASSES: Record<Tone, string> = {
  cyan: 'border-cyan-neon/55 shadow-[0_0_18px_rgba(59,130,246,0.12)] hover:border-cyan-neon hover:shadow-glow-cyan',
  magenta:
    'border-magenta-neon/55 shadow-[0_0_18px_rgba(96,165,250,0.12)] hover:border-magenta-neon hover:shadow-glow-magenta',
  purple:
    'border-neon-purple/55 shadow-[0_0_18px_rgba(147,197,253,0.12)] hover:border-neon-purple hover:shadow-glow-purple',
  green:
    'border-neon-green/55 shadow-[0_0_18px_rgba(37,99,235,0.12)] hover:border-neon-green hover:shadow-glow-green',
}

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone
  children: ReactNode
  as?: 'div' | 'article'
}

export default function GlowCard({ tone = 'cyan', children, className = '', ...props }: GlowCardProps) {
  return (
    <div className={`glass-panel p-7 transition-all duration-300 ${TONE_CLASSES[tone]} ${className}`} {...props}>
      {children}
    </div>
  )
}
