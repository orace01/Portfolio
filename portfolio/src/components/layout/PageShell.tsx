import type { ReactNode } from 'react'
import BackButton from '@/components/ui/BackButton'

interface PageShellProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-140px)] max-w-[1600px] flex-col px-4 pb-28 pt-14 sm:px-8">
      <div className="mb-14 text-center">
        <h1 className="neon-heading text-5xl font-bold sm:text-6xl md:text-7xl">{title}</h1>
        {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">{subtitle}</p> : null}
      </div>

      <div className="flex-1">{children}</div>

      <div className="mt-16 flex justify-center">
        <BackButton />
      </div>
    </div>
  )
}
