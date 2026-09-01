"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import { SITE, FOOTER_CONTENT } from "@/lib/constants";
import { Eyebrow } from "@/components/ui/Glass";
import { useScrollNav } from "@/context/ScrollNavContext";
import TerminalContact from "@/components/contact/TerminalContact";

const CTA_LINKS = [
  { label: "Download CV / Resume", href: SITE.cvHref, external: false },
  { label: "GitHub", href: SITE.github, external: true },
  { label: "LinkedIn", href: SITE.linkedin, external: true },
];

export default function ContactFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const { registerSection } = useScrollNav();

  useEffect(() => {
    registerSection("contact", rootRef.current);
  }, [registerSection]);

  useEffect(() => {
    ensureGsapRegistered();
    const ctx = gsap.context(() => {
      const items = rootRef.current?.querySelectorAll('[data-anim="item"]') ?? [];
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#030712] px-6 pt-12 pb-0 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,229,255,0.06),transparent_70%)]"
      />

      <h2
        data-anim="item"
        className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white opacity-0 sm:text-5xl lg:text-6xl"
      >
        {FOOTER_CONTENT.heading}
      </h2>

      <p
        data-anim="item"
        className="mt-5 max-w-xl text-sm text-white/60 opacity-0 sm:text-base"
      >
        {FOOTER_CONTENT.subtext}
      </p>

      <div data-anim="item" className="mt-10 w-full opacity-0">
        <TerminalContact />
      </div>

      <div
        data-anim="item"
        className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-0 sm:gap-4 pb-16"
      >
        {CTA_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white/80 transition-all hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div
        data-anim="item"
        className="flex w-full flex-col items-center gap-2 bg-[#0A0F1D]/60 backdrop-blur-md border-t border-cyan-500/30 shadow-[0_-4px_25px_rgba(0,229,255,0.1)] py-6 opacity-0"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
            AVAILABLE FOR NEW OPPORTUNITIES
          </span>
        </div>
        <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
          © 2026 ORACE HONFIN <span className="text-cyan-400/80 mx-1">—</span> AI & FULLSTACK ENGINEER
        </span>
      </div>
    </section>
  );
}
