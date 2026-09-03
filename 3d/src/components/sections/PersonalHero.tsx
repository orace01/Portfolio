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

  useEffect(() => {
    if (!loaderReady || animated.current) return;
    animated.current = true;

    ensureGsapRegistered();
    const root = rootRef.current;
    if (!root) return;

    const name1 = root.querySelector('[data-anim="hero-name-1"]');
    const name2 = root.querySelector('[data-anim="hero-name-2"]');
    const divider = root.querySelector('[data-anim="hero-divider"]');
    const sub   = root.querySelector('[data-anim="hero-sub"]');
    const desc  = root.querySelector('[data-anim="hero-desc"]');
    const btns  = root.querySelectorAll('[data-anim="hero-btn"]');

    if (reducedMotion) {
      gsap.set([name1, name2, divider, sub, desc, ...btns], {
        autoAlpha: 1, yPercent: 0, y: 0,
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl
      .fromTo(name1,   { autoAlpha: 0, yPercent: 80 }, { autoAlpha: 1, yPercent: 0, duration: 1.0 }, 0)
      .fromTo(name2,   { autoAlpha: 0, yPercent: 80 }, { autoAlpha: 1, yPercent: 0, duration: 1.0 }, 0.12)
      .fromTo(divider, { autoAlpha: 0, scaleX: 0 },    { autoAlpha: 1, scaleX: 1, duration: 0.6, transformOrigin: "left center" }, 0.55)
      .fromTo(sub,     { autoAlpha: 0, y: 16 },        { autoAlpha: 1, y: 0, duration: 0.6 }, 0.62)
      .fromTo(desc,    { autoAlpha: 0, y: 12 },        { autoAlpha: 1, y: 0, duration: 0.55 }, 0.72)
      .fromTo(btns,    { autoAlpha: 0, y: 10 },        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.82);
  }, [loaderReady, reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Accueil — Orace Honfin"
      className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden bg-[#030712] px-4 pb-16 pt-28 text-center sm:px-8 sm:pt-28"
    >
      {/* ── Background depth layer ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Primary cyan halo — centred behind the name */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] rounded-full"
          style={{
            width: "min(900px, 100vw)",
            height: "min(600px, 80vw)",
            background:
              "radial-gradient(ellipse at center, rgba(0,180,220,0.11) 0%, rgba(0,80,180,0.07) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Emerald deep accent — bottom left */}
        <div
          className="absolute bottom-[10%] left-[5%] rounded-full"
          style={{
            width: "min(480px, 60vw)",
            height: "min(320px, 40vw)",
            background:
              "radial-gradient(ellipse at center, rgba(0,168,100,0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Bottom fade — smooth transition into the cinematic section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#030712]" />
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col items-center">

        {/* ── NAME BLOCK ── */}
        {/*
          Target: "ORACE HONFIN" as dominant visual.
          On a 1440px screen, 20vw = 288px. clamp keeps it large on desktop,
          manageable on mobile (min ~52px at 320px viewport).
          overflow-hidden on each wrapper gives a clean clip-reveal on mount.
        */}
        <div className="w-full max-w-[1200px] px-2">
          <div className="overflow-hidden leading-[0.88]">
            <h1
              data-anim="hero-name-1"
              className="block select-none font-bold tracking-[-0.03em] text-[#E8F0F8] opacity-0"
              style={{ fontSize: "clamp(4rem, 19vw, 19rem)" }}
            >
              ORACE
            </h1>
          </div>
          <div className="overflow-hidden leading-[0.88]">
            <span
              data-anim="hero-name-2"
              aria-hidden="true"
              className="block select-none font-bold tracking-[-0.03em] opacity-0"
              style={{
                fontSize: "clamp(4rem, 19vw, 19rem)",
                background:
                  "linear-gradient(100deg, #C8F0FF 0%, #5DD8F5 30%, #00B5E2 65%, #2660E8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HONFIN
            </span>
          </div>
          {/* Screen-reader text for gradient word */}
          <span className="sr-only">HONFIN</span>
        </div>

        {/* Thin separator */}
        <div
          data-anim="hero-divider"
          aria-hidden="true"
          className="mt-8 h-px w-full max-w-[560px] bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0"
        />

        {/* Subtitle / Label (Moved from above) */}
        <p
          data-anim="hero-sub"
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.35em] text-[#00C8E8]/80 opacity-0 sm:text-xs"
        >
          Ingénieur Logiciel&nbsp;Fullstack
        </p>

        {/* Description */}
        <p
          data-anim="hero-desc"
          className="mt-5 max-w-[540px] text-sm leading-[1.75] opacity-0 sm:text-[0.95rem]"
          style={{ color: "#A6AFB8" }}
        >
          Je conçois et je livre des produits web &amp; mobile de bout en
          bout — co-fondateur chez Webspace, porté par l&rsquo;IA
          et&nbsp;la cybersécurité.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Primary */}
          <button
            data-anim="hero-btn"
            onClick={() => scrollToSection("act2")}
            className="w-48 rounded-full border border-[#00C8E8]/40 bg-[#00C8E8]/10 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#00C8E8] opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-[#00C8E8]/70 hover:bg-[#00C8E8]/18 hover:shadow-[0_0_22px_rgba(0,200,232,0.22)] sm:w-auto"
          >
            Voir mes réalisations
          </button>
          {/* Secondary */}
          <button
            data-anim="hero-btn"
            onClick={() => scrollToSection("contact")}
            className="w-48 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white/85 sm:w-auto"
          >
            Me contacter
          </button>
        </div>
      </div>

      {/* ── Scroll nudge ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/18">
          défiler
        </span>
        <div className="h-10 w-px overflow-hidden bg-white/10">
          <div className="h-1/2 w-full animate-scroll-drip bg-gradient-to-b from-[#00C8E8]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
