import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl border border-line/80 bg-panel/40 p-6 shadow-[0_0_40px_-15px_rgba(0,240,255,0.15)] backdrop-blur-md transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_50px_-10px_rgba(0,240,255,0.25)] ${className}`}
    >
      {children}
    </div>
  )
}
