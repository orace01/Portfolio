interface SpeechBubbleProps {
  message: string
  compact?: boolean
}

export default function SpeechBubble({ message, compact }: SpeechBubbleProps) {
  return (
    <div
      data-intro="bubble"
      className={`glass-panel neon-border-cyan px-4 py-2.5 text-slate-100 ${
        compact ? 'max-w-[220px] text-xs' : 'max-w-sm text-sm'
      }`}
    >
      <span className="mr-1 font-mono text-cyan-neon">{'>'}</span>
      {message}
    </div>
  )
}
