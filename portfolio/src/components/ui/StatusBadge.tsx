type Status = 'ONLINE' | 'BETA' | 'ARCHIVED'

const STATUS_STYLE: Record<Status, { badge: string; dot: string; glow: string }> = {
  ONLINE: {
    badge: 'border-cyan-500/20 bg-cyan-950/40 text-cyan-400',
    dot: 'bg-cyan-400',
    glow: 'rgba(0, 240, 255, 0.7)',
  },
  BETA: {
    badge: 'border-amber-500/20 bg-amber-950/40 text-amber-400',
    dot: 'bg-amber-400',
    glow: 'rgba(251, 191, 36, 0.7)',
  },
  ARCHIVED: {
    badge: 'border-white/10 bg-white/5 text-gray-400',
    dot: 'bg-gray-400',
    glow: 'rgba(156, 163, 175, 0.5)',
  },
}

export default function StatusBadge({ status }: { status: Status }) {
  const style = STATUS_STYLE[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${style.badge}`}
    >
      <span
        className={`h-1.5 w-1.5 animate-pulse rounded-full ${style.dot}`}
        style={{ boxShadow: `0 0 6px ${style.glow}` }}
      />
      {status}
    </span>
  )
}
