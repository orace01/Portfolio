"use client";

import { useScrollNav } from "@/context/ScrollNavContext";
import { type SectionId } from "@/lib/constants";

const HEADER_LINKS: { label: string; target: SectionId }[] = [
  { label: "À PROPOS", target: "act1" },
  { label: "RÉALISATIONS", target: "act2" },
  { label: "COMPÉTENCES", target: "act3" },
];

export default function Header() {
  const { scrollToSection } = useScrollNav();

  return (
    <header
      data-anim="header"
      className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex items-center justify-between bg-[#0A0F1D]/80 backdrop-blur-md border-b border-cyan-500/30 shadow-[0_1px_15px_rgba(0,229,255,0.15)] opacity-0"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Accueil"
        className="text-white font-bold tracking-widest text-sm"
      >
        ORACE HONFIN
      </button>

      <nav className="hidden md:flex gap-8">
        {HEADER_LINKS.map((link) => (
          <button
            key={link.target}
            onClick={() => scrollToSection(link.target)}
            className="text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors tracking-wider"
          >
            {link.label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => scrollToSection("contact")}
        className="px-5 py-2 text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all"
      >
        CONTACT
      </button>
    </header>
  );
}
