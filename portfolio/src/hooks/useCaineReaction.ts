import { useCaine } from '@/context/CaineContext'

/** Wires hover handlers that make Caine react with a specific line, then relax on leave. */
export function useCaineReaction(line: string) {
  const { say, reset } = useCaine()
  return {
    onMouseEnter: () => say(line),
    onMouseLeave: reset,
    onFocus: () => say(line),
    onBlur: reset,
  }
}
