"use client";

import { NAV_LINKS, SITE } from "@/lib/constants";
import { useScrollNav } from "@/context/ScrollNavContext";

export default function Header() {
  const { scrollToSection } = useScrollNav();

  return (
    <header
      data-anim="header"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 opacity-0 sm:px-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/70 to-transparent"
      />

      <button
        onClick={() => scrollToSection("act1")}
        className="font-mono text-[11px] tracking-[0.2em] text-white/80 transition-colors hover:text-white sm:text-xs"
      >
        {SITE.headerTag}
      </button>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <button
            key={link.target}
            onClick={() => scrollToSection(link.target)}
            className="font-mono text-xs uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#00E5FF]"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => scrollToSection("contact")}
        className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs tracking-wide text-white transition-all hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
      >
        {`[ ${SITE.ctaLabel} ]`}
      </button>
    </header>
  );
}
