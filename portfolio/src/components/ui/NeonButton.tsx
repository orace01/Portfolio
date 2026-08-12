import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Tone = 'cyan' | 'magenta' | 'green' | 'purple'

const TONE_CLASSES: Record<Tone, string> = {
  cyan: 'border-cyan-neon/50 text-cyan-neon hover:bg-cyan-neon/10 hover:border-cyan-neon hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]',
  magenta: 'border-magenta-neon/50 text-magenta-neon hover:bg-magenta-neon/10 hover:border-magenta-neon hover:shadow-[0_0_20px_rgba(112,0,255,0.35)]',
  green: 'border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:border-neon-green hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]',
  purple: 'border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-[0_0_20px_rgba(112,0,255,0.35)]',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border bg-white/[0.02] px-5 py-2 font-mono text-sm uppercase tracking-wide transition-all duration-300'

interface CommonProps {
  tone?: Tone
  children: ReactNode
}

export function NeonLink({
  tone = 'cyan',
  children,
  className = '',
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${TONE_CLASSES[tone]} ${className}`} {...props}>
      {children}
    </a>
  )
}

export function NeonButton({
  tone = 'cyan',
  children,
  className = '',
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${TONE_CLASSES[tone]} ${className}`} {...props}>
      {children}
    </button>
  )
}
