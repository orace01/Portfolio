import type { HTMLAttributes, ReactNode } from 'react'
import SpotlightOverlay from './SpotlightOverlay'
import { handleSpotlightMove } from '@/lib/spotlight'

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
    <div
      onMouseMove={handleSpotlightMove}
      className={`glass-panel group p-7 transition-all duration-300 ${TONE_CLASSES[tone]} ${className}`}
      {...props}
    >
      <SpotlightOverlay />
      {children}
    </div>
  )
}
