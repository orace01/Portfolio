export default function CircuitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* Hero-level cyan orb, top-left */}
      <div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full opacity-40 blur-[150px]"
        style={{ background: '#00F0FF' }}
      />
      {/* Showcase / Featured Projects level, violet-cyan orb, mid-right */}
      <div
        className="absolute right-[-10%] top-[45%] h-[700px] w-[700px] -translate-y-1/2 rounded-full opacity-30 blur-[180px]"
        style={{ background: 'linear-gradient(135deg, #7000FF, #00F0FF)' }}
      />
      {/* Soft cyan orb, bottom of page */}
      <div
        className="absolute bottom-[-15%] left-1/3 h-[550px] w-[550px] rounded-full opacity-25 blur-[160px]"
        style={{ background: '#00F0FF' }}
      />
    </div>
  )
}
