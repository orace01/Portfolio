"use client";

import { useEffect, useRef } from "react";
import { useScrollNav } from "@/context/ScrollNavContext";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

interface PersonalHeroProps {
  /** Becomes true once the CinematicSequence loading screen exits */
  loaderReady?: boolean;
}

export default function PersonalHero({ loaderReady = false }: PersonalHeroProps) {
  const { scrollToSection } = useScrollNav();
  const rootRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animated = useRef(false);

  // Entrance animation — triggered once the loader is gone so this hero
  // enters in sync with the rest of the intro reveal.
  useEffect(() => {
    if (!loaderReady || animated.current) return;
    animated.current = true;

    ensureGsapRegistered();
    const root = rootRef.current;
    if (!root) return;

    const label = root.querySelector('[data-anim="hero-label"]');
    const name1 = root.querySelector('[data-anim="hero-name-1"]');
    const name2 = root.querySelector('[data-anim="hero-name-2"]');
    const sub   = root.querySelector('[data-anim="hero-sub"]');
    const desc  = root.querySelector('[data-anim="hero-desc"]');
    const btns  = root.querySelectorAll('[data-anim="hero-btn"]');

    if (reducedMotion) {
      gsap.set([label, name1, name2, sub, desc, ...btns], { autoAlpha: 1, yPercent: 0, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(label, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
      .fromTo(name1, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.85 }, "-=0.25")
      .fromTo(name2, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.85 }, "-=0.68")
      .fromTo(sub,   { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.5")
      .fromTo(desc,  { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 },  "-=0.4")
      .fromTo(btns,  { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 }, "-=0.35");
  }, [loaderReady, reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Hero — Orace Honfin"
      className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 pt-24 pb-12 text-center"
    >
      {/* ── Ambient halos ─────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Cyan top halo */}
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[560px] -translate-x-1/2 rounded-full bg-[#00E5FF] opacity-[0.07] blur-[130px]" />
        {/* Violet lower-left accent */}
        <div className="absolute left-[12%] top-[55%] h-[280px] w-[360px] rounded-full bg-[#7C4DFF] opacity-[0.055] blur-[110px]" />
        {/* Emerald right accent */}
        <div className="absolute right-[8%] top-[35%] h-[220px] w-[280px] rounded-full bg-[#00D084] opacity-[0.04] blur-[100px]" />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Label */}
        <span
          data-anim="hero-label"
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]/65 opacity-0"
        >
          Full-Stack Developer&nbsp;/&nbsp;AI Engineer
        </span>

        {/* Name — two clipped lines for clean reveal */}
        <div className="overflow-hidden leading-none">
          <h1
            data-anim="hero-name-1"
            className="block font-bold tracking-[-0.02em] text-white opacity-0"
            style={{ fontSize: "clamp(3.8rem, 12.5vw, 12.5rem)", lineHeight: "0.92" }}
          >
            ORACE
          </h1>
        </div>
        <div className="overflow-hidden leading-none">
          <span
            data-anim="hero-name-2"
            aria-hidden="true"
            className="block font-bold tracking-[-0.02em] opacity-0"
            style={{
              fontSize: "clamp(3.8rem, 12.5vw, 12.5rem)",
              lineHeight: "0.92",
              background: "linear-gradient(95deg, #00E5FF 0%, #3B9FFF 50%, #7C4DFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            HONFIN
          </span>
        </div>
        {/* Screen-reader duplicate for the gradient word */}
        <span className="sr-only">HONFIN</span>

        {/* Tagline */}
        <p
          data-anim="hero-sub"
          className="mt-8 text-base font-medium tracking-wide text-white/75 opacity-0 sm:text-lg"
        >
          Full-Stack Developer &amp; Creative Technologist
        </p>

        {/* Description */}
        <p
          data-anim="hero-desc"
          className="mt-4 max-w-lg text-sm leading-relaxed text-white/40 opacity-0 sm:text-[0.95rem]"
        >
          I build systems-level software, distributed machine learning tools
          and expressive real-time web&nbsp;experiences.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            data-anim="hero-btn"
            onClick={() => scrollToSection("act1")}
            className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white/75 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:shadow-[0_0_18px_rgba(0,229,255,0.2)]"
          >
            View My Work
          </button>
          <button
            data-anim="hero-btn"
            onClick={() => scrollToSection("contact")}
            className="rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-[#00E5FF] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]"
          >
            Contact Me
          </button>
        </div>
      </div>

      {/* ── Scroll nudge ───────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
          scroll
        </span>
        <div className="h-10 w-px overflow-hidden rounded-full bg-white/10">
          <div className="h-1/2 w-full animate-scroll-drip bg-gradient-to-b from-[#00E5FF]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
