import { motion } from "framer-motion";
import { hero } from "../data/siteContent";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useReveal } from "../hooks/useReveal";

export default function Hero() {
  const reveal = useReveal();

  return (
    <section id="accueil" className="border-b border-line px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-14 flex items-center justify-between border-b border-line pb-4 text-[11px] uppercase tracking-[0.2em] text-mocha">
          <span>{hero.folioNumber}</span>
          <span className="hidden font-semibold sm:inline">{hero.kicker}</span>
          <span>{hero.edition}</span>
        </div>

        <motion.div {...reveal} className="relative mx-auto mb-6 w-full max-w-[600px] border border-line bg-paper p-3">
          <span className="absolute -top-px -left-px h-[18px] w-[18px] border-t-2 border-l-2 border-walnut" />
          <span className="absolute -top-px -right-px h-[18px] w-[18px] border-t-2 border-r-2 border-walnut" />
          <span className="absolute -bottom-px -left-px h-[18px] w-[18px] border-b-2 border-l-2 border-walnut" />
          <span className="absolute -bottom-px -right-px h-[18px] w-[18px] border-b-2 border-r-2 border-walnut" />
          <PhotoPlaceholder className="h-[420px] w-full sm:h-[509px]" />
        </motion.div>
        <p className="mb-16 text-center text-xs italic text-mocha">{hero.figureCaption}</p>

        <div className="text-center">
          <motion.h1
            {...reveal}
            className="font-script mb-7 text-5xl leading-[1.2] text-walnut sm:text-6xl"
          >
            {hero.titleLead}{" "}
            <em className="not-italic text-mocha">{hero.titleEmphasis}</em>
          </motion.h1>
          <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-ink">
            {hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a
              href={hero.ctaPrimary.href}
              className="border border-walnut bg-walnut px-8 py-4 text-sm font-semibold text-paper transition-colors hover:bg-[#5c3319]"
            >
              {hero.ctaPrimary.label}
            </a>
            <a
              href={hero.ctaSecondary.href}
              className="border border-walnut px-8 py-4 text-sm font-semibold text-walnut transition-colors hover:bg-walnut hover:text-paper"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
