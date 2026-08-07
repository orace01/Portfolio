import type { HTMLAttributes, ReactNode } from 'react'

type Tone = 'cyan' | 'magenta' | 'purple' | 'green'

const TONE_CLASSES: Record<Tone, string> = {
  cyan: 'border-cyan-neon/55 shadow-[0_0_18px_rgba(0,243,255,0.12)] hover:border-cyan-neon hover:shadow-glow-cyan',
  magenta:
    'border-magenta-neon/55 shadow-[0_0_18px_rgba(255,0,127,0.12)] hover:border-magenta-neon hover:shadow-glow-magenta',
  purple:
    'border-neon-purple/55 shadow-[0_0_18px_rgba(139,47,255,0.12)] hover:border-neon-purple hover:shadow-glow-purple',
  green:
    'border-neon-green/55 shadow-[0_0_18px_rgba(57,255,20,0.12)] hover:border-neon-green hover:shadow-glow-green',
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
