type Status = 'ONLINE' | 'BETA' | 'ARCHIVED'

const STATUS_STYLE: Record<Status, string> = {
  ONLINE: 'bg-neon-green shadow-glow-green',
  BETA: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]',
  ARCHIVED: 'bg-slate-500 shadow-none',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-slate-300">
      <span className={`h-2 w-2 rounded-full ${STATUS_STYLE[status]}`} />
      {status}
    </span>
  )
}
