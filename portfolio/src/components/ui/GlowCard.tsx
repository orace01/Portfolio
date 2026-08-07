import type { HTMLAttributes, ReactNode } from 'react'

type Tone = 'cyan' | 'magenta' | 'purple' | 'green'

const TONE_CLASSES: Record<Tone, string> = {
  cyan: 'border-cyan-neon/55 hover:border-cyan-neon',
  magenta: 'border-magenta-neon/55 hover:border-magenta-neon',
  purple: 'border-neon-purple/55 hover:border-neon-purple',
  green: 'border-neon-green/55 hover:border-neon-green',
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
