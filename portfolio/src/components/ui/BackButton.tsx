import { useNavigate } from 'react-router-dom'
import { useCaineReaction } from '@/hooks/useCaineReaction'
import { HOVER_LINES } from '@/lib/caine-lines'

export default function BackButton() {
  const navigate = useNavigate()
  const reaction = useCaineReaction(HOVER_LINES['back-button'])

  return (
    <button
      type="button"
      onClick={() => navigate('/')}
      className="group liquid-glass neon-border-cyan flex items-center gap-3 overflow-hidden rounded-full px-9 py-3.5 font-mono text-base tracking-[0.2em] text-cyan-neon transition-all hover:scale-105"
      {...reaction}
    >
      <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
        ←
      </span>
      BACK
    </button>
  )
}
