"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";

export default function TransitionDivider({ text }: { text: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 75%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex h-[32vh] w-full items-center justify-center overflow-hidden bg-[#050505] px-6 sm:h-[36vh]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <p
        ref={textRef}
        className="relative max-w-3xl text-center font-mono text-xs tracking-[0.25em] text-[#00E5FF] opacity-0 sm:text-sm"
      >
        {text}
      </p>
    </div>
  );
}
