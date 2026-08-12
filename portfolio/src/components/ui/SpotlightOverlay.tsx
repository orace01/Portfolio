/**
 * Interactive cursor-follow glow + border highlight. Pair with `handleSpotlightMove` (bound to
 * the parent's onMouseMove) and a `group` class on that same parent — the parent must also be
 * `relative` (or use `.glass-panel`, which already is) so this overlay positions correctly.
 * Sits on a negative z-index so it always renders behind the card's own (unmodified) content,
 * regardless of whether that content is itself position:relative.
 */
export default function SpotlightOverlay() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,240,255,0.15), rgba(0,102,255,0.25) 20%, transparent 40%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: 1,
          background:
            'radial-gradient(200px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,240,255,0.9), rgba(0,102,255,0.5) 35%, transparent 65%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
    </>
  )
}
