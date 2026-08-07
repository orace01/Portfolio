const TRACE_PATHS = [
  'M0,40 H120 V90 H220 V40 H320',
  'M0,140 H60 V200 H180 V260 H340',
  'M0,320 H160 V380 H80 V440',
  'M0,220 H40 V180 H100',
  'M40,0 V60 H160 V20',
  'M260,0 V50 H200 V110 H300',
]

const NODES = [
  [120, 40],
  [220, 90],
  [60, 140],
  [180, 200],
  [340, 260],
  [160, 320],
  [80, 380],
  [300, 110],
]

function CircuitCorner({ className, color }: { className: string; color: string }) {
  return (
    <svg
      className={className}
      width="360"
      height="460"
      viewBox="0 0 360 460"
      fill="none"
      aria-hidden="true"
    >
      {TRACE_PATHS.map((d, i) => (
        <path
          key={i}
          data-intro="circuit"
          d={d}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          opacity={0.55}
        />
      ))}
      {NODES.map(([cx, cy], i) => (
        <circle key={i} data-intro="circuit" cx={cx} cy={cy} r={3} fill={color} opacity={0.85} />
      ))}
    </svg>
  )
}

export default function CircuitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* wrapper carries the intro opacity so it never fights the children's own CSS keyframe animations */}
      <div data-intro="bg-layer" className="absolute inset-0">
        <div className="starfield absolute inset-0 opacity-90" />
        <div className="starfield-near absolute inset-0 opacity-100" />
        <div className="nebula-purple absolute -left-1/4 top-0 h-[75vh] w-[75vh]" />
        <div className="nebula-magenta absolute -right-1/4 bottom-0 h-[75vh] w-[75vh]" />
        <div className="nebula-core absolute left-1/2 top-0 h-[85vh] w-[85vh] -translate-x-1/2" />
        <div className="absolute inset-0 bg-radial-fade" />
      </div>

      <CircuitCorner
        className="absolute -left-4 -top-4 opacity-60 [filter:drop-shadow(0_0_6px_rgba(0,243,255,0.5))]"
        color="#00f3ff"
      />
      <CircuitCorner
        className="absolute -bottom-4 -left-4 rotate-180 opacity-40 [filter:drop-shadow(0_0_6px_rgba(0,243,255,0.4))]"
        color="#00f3ff"
      />
      <CircuitCorner
        className="absolute -right-4 -top-4 scale-x-[-1] opacity-60 [filter:drop-shadow(0_0_6px_rgba(255,0,127,0.5))]"
        color="#ff007f"
      />
      <CircuitCorner
        className="absolute -bottom-4 -right-4 rotate-180 scale-x-[-1] opacity-40 [filter:drop-shadow(0_0_6px_rgba(255,0,127,0.4))]"
        color="#ff007f"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
    </div>
  )
}
