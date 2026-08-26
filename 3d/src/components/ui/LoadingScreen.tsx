"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface LoadingScreenProps {
  progress: number; // 0..1
  ready: boolean;
  onExited?: () => void;
}

export default function LoadingScreen({ progress, ready, onExited }: LoadingScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const exitedRef = useRef(false);

  useEffect(() => {
    const pct = Math.round(progress * 100);
    gsap.to(barRef.current, { scaleX: progress, duration: 0.35, ease: "power2.out" });
    if (pctRef.current) pctRef.current.textContent = String(pct);
  }, [progress]);

  useEffect(() => {
    if (!ready || exitedRef.current) return;
    exitedRef.current = true;
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.7,
      delay: 0.2,
      ease: "power2.inOut",
      onComplete: onExited,
    });
  }, [ready, onExited]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      role="status"
      aria-live="polite"
      aria-busy={!ready}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-mono text-xs tracking-[0.35em] text-white/40">
          INITIALIZING AI CORE
        </div>
        <div className="flex items-baseline gap-1 font-mono text-4xl font-light text-white tabular-nums">
          <span ref={pctRef}>0</span>
          <span className="text-base text-white/40">%</span>
        </div>
        <div className="h-px w-40 overflow-hidden bg-white/10 sm:w-56">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
