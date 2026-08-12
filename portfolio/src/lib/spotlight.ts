import type { MouseEvent } from 'react'

/**
 * Drop-in onMouseMove handler that tracks the cursor's position relative to whatever element
 * it's bound to, exposing it as --mouse-x/--mouse-y CSS custom properties (percentages) for a
 * SpotlightOverlay sibling to read. Works on any element without needing its own ref, since it
 * reads position off the event's own currentTarget.
 */
export function handleSpotlightMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  el.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`)
}
