import { hero } from '../data/siteContent'

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-[120vh] flex-col items-center justify-center px-6 text-center"
    >
      <div
        className={`max-w-2xl transition-all duration-1000 ease-out ${
          ready ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-cyan">{hero.eyebrow}</p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          {hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted">{hero.subtitle}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="w-full rounded-full bg-cyan px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] sm:w-auto"
          >
            {hero.primaryCta}
          </a>
          <a
            href="#expertise"
            className="w-full rounded-full border border-line px-8 py-3 text-sm text-white transition-colors hover:border-cyan/60 sm:w-auto"
          >
            {hero.secondaryCta}
          </a>
        </div>

        <p className="mt-8 text-sm text-muted">{hero.reassurance}</p>
      </div>

      <a
        href="#expertise"
        aria-label="Défiler vers la section expertise"
        className="absolute bottom-10 flex h-10 w-6 items-start justify-center rounded-full border border-line p-1.5"
      >
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan" />
      </a>
    </section>
  )
}
