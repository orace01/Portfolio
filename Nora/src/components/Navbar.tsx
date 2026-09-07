import { useEffect, useState } from 'react'
import { doctor, hero, nav } from '../data/siteContent'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string>(nav[0]?.href ?? '')

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`)
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-abyss/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4" aria-label="Navigation principale">
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-wide text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan/50 text-xs text-cyan">
            {doctor.logoInitials}
          </span>
          <span className="hidden sm:inline">{doctor.name}</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={activeHref === item.href ? 'page' : undefined}
                className={`text-sm transition-colors ${
                  activeHref === item.href ? 'text-cyan' : 'text-muted hover:text-white'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-cyan/60 px-4 py-2 text-sm text-cyan transition-colors hover:bg-cyan/10 md:inline-block"
        >
          {hero.primaryCta}
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-white md:hidden"
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-line/60 bg-abyss/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeHref === item.href ? 'page' : undefined}
                  className={`text-base ${activeHref === item.href ? 'text-cyan' : 'text-muted'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block rounded-full border border-cyan/60 px-4 py-2 text-sm text-cyan"
              >
                {hero.primaryCta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
