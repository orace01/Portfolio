interface PreloaderProps {
  visible: boolean
  loadedCount: number
  frameCount: number
  error: string | null
  practiceInitials: string
  onDismiss: () => void
}

export function Preloader({ visible, loadedCount, frameCount, error, practiceInitials, onDismiss }: PreloaderProps) {
  const progress = frameCount > 0 ? Math.round((loadedCount / frameCount) * 100) : 0

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-abyss transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-lg tracking-widest text-cyan">
        {practiceInitials}
      </div>

      {error ? (
        <div className="flex max-w-sm flex-col items-center gap-4 px-6 text-center">
          <p className="text-sm text-muted">{error}</p>
          <button
            type="button"
            onClick={onDismiss}
            className="rounded-full border border-cyan/60 px-5 py-2 text-sm text-cyan transition-colors hover:bg-cyan/10"
          >
            Continuer vers le site →
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm tracking-[0.2em] text-muted uppercase">Chargement de l'imagerie</p>
          <div className="h-1 w-64 max-w-[70vw] overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-cyan transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="font-mono text-xs text-muted">
            {loadedCount} / {frameCount || '…'} frames
          </p>
        </>
      )}
    </div>
  )
}
