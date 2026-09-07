import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand, navLinks } from "../data/siteContent";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper border-b border-line">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#accueil" className="flex flex-col leading-none text-paper hover:text-paper">
          <span className="font-script text-2xl">{brand.name}</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-amber">
            {brand.baseline}
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] uppercase tracking-wide text-paper hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 border border-amber bg-amber px-6 py-3 text-[13px] font-semibold tracking-wide text-ink transition-colors hover:bg-champagne md:inline-block"
        >
          Prendre rendez-vous
        </a>

        <button
          type="button"
          className="text-paper md:hidden"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="border-t border-line px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm uppercase tracking-wide text-paper"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="mt-2 inline-block border border-amber bg-amber px-6 py-3 text-[13px] font-semibold text-ink"
                onClick={() => setIsOpen(false)}
              >
                Prendre rendez-vous
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
