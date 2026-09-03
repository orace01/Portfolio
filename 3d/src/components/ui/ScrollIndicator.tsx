export default function ScrollIndicator() {
  return (
    <div
      data-anim="scroll-indicator"
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0"
    >
      <span className="font-mono text-[10px] tracking-[0.35em] text-white/40">
        DÉFILER
      </span>
      <div className="relative h-10 w-px overflow-hidden bg-white/15">
        <div className="absolute left-0 top-0 h-3 w-px animate-scroll-drip bg-gradient-to-b from-[#00E5FF] to-transparent" />
      </div>
    </div>
  );
}
