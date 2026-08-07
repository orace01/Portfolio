type Status = 'ONLINE' | 'BETA' | 'ARCHIVED'

const STATUS_STYLE: Record<Status, string> = {
  ONLINE: 'bg-neon-green',
  BETA: 'bg-amber-400',
  ARCHIVED: 'bg-slate-500',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-slate-300">
      <span className={`h-2 w-2 rounded-full ${STATUS_STYLE[status]}`} />
      {status}
    </span>
  )
}
