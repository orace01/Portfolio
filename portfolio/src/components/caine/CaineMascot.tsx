import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TOOTH_X = [72, 100, 128, 156, 184, 212]

interface CaineMascotProps {
  excited: boolean
  talkKey: number
}

export default function CaineMascot({ excited, talkKey }: CaineMascotProps) {
  const lowerJawRef = useRef<SVGGElement>(null)
  const pupilsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!lowerJawRef.current) return
    const tl = gsap.timeline()
    tl.to(lowerJawRef.current, { y: 10, duration: 0.14, ease: 'power2.out' })
      .to(lowerJawRef.current, { y: 0, duration: 0.22, ease: 'bounce.out' })
    return () => {
      tl.kill()
    }
  }, [talkKey])

  useEffect(() => {
    if (!pupilsRef.current) return
    gsap.to(pupilsRef.current, {
      x: excited ? (Math.random() > 0.5 ? 3 : -3) : 0,
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [excited])

  return (
    <svg
      viewBox="0 0 300 300"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Caine, the digital ringmaster"
    >
      <defs>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#dfe7ee" />
          <stop offset="55%" stopColor="#b9c4d0" />
          <stop offset="100%" stopColor="#eef3f7" />
        </linearGradient>
        <linearGradient id="hatBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241b3d" />
          <stop offset="100%" stopColor="#120c22" />
        </linearGradient>
        <radialGradient id="gum" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ff2e8f" />
          <stop offset="100%" stopColor="#b8005c" />
        </radialGradient>
      </defs>

      {/* top hat */}
      <g data-intro="hat">
        <g transform="rotate(-7 150 60)">
          <ellipse cx="150" cy="78" rx="58" ry="11" fill="url(#hatBody)" stroke="#00f3ff" strokeWidth="1.5" opacity="0.95" />
          <rect x="120" y="18" width="60" height="62" rx="6" fill="url(#hatBody)" stroke="#00f3ff" strokeOpacity="0.5" strokeWidth="1" />
          <rect x="120" y="60" width="60" height="9" fill="#ff007f" opacity="0.85" />
          <ellipse cx="150" cy="18" rx="30" ry="9" fill="#1a1230" stroke="#00f3ff" strokeWidth="1.5" />
        </g>
      </g>

      {/* upper jaw */}
      <g data-intro="upper-jaw">
        <path
          d="M42,78 Q150,26 258,78 L250,122 Q150,150 50,122 Z"
          fill="url(#chrome)"
          stroke="#7f8ea0"
          strokeWidth="1"
        />
        {TOOTH_X.map((x) => (
          <line key={x} x1={x} y1="88" x2={x} y2="118" stroke="#9fb0c0" strokeWidth="1" opacity="0.6" />
        ))}
        <path d="M42,78 Q150,26 258,78" fill="none" stroke="#00f3ff" strokeWidth="1.5" opacity="0.55" />
      </g>

      {/* eyes, floating in the gap */}
      <g ref={pupilsRef} data-intro="eyes">
        <g>
          <circle cx="118" cy="150" r={excited ? 26 : 23} fill="#f5faff" stroke="#00f3ff" strokeWidth="1.5" className="transition-all duration-200" />
          <circle cx="118" cy="150" r={excited ? 8 : 11} fill="#0a0a1f" />
          <circle cx="122" cy="145" r="3" fill="#fff" opacity="0.85" />
        </g>
        <g>
          <circle cx="182" cy="150" r={excited ? 26 : 23} fill="#f5faff" stroke="#ff007f" strokeWidth="1.5" className="transition-all duration-200" />
          <circle cx="182" cy="150" r={excited ? 8 : 11} fill="#0a0a1f" />
          <circle cx="186" cy="145" r="3" fill="#fff" opacity="0.85" />
        </g>
      </g>

      {/* lower jaw */}
      <g ref={lowerJawRef} data-intro="lower-jaw">
        <path
          d="M48,178 Q150,152 252,178 L260,222 Q150,266 40,222 Z"
          fill="url(#chrome)"
          stroke="#7f8ea0"
          strokeWidth="1"
        />
        <path d="M40,222 Q150,266 260,222 L256,236 Q150,278 44,236 Z" fill="url(#gum)" opacity="0.9" />
        {TOOTH_X.map((x) => (
          <line key={x} x1={x} y1="186" x2={x} y2="218" stroke="#9fb0c0" strokeWidth="1" opacity="0.6" />
        ))}
        <path d="M48,178 Q150,152 252,178" fill="none" stroke="#ff007f" strokeWidth="1.5" opacity="0.55" />
      </g>
    </svg>
  )
}
