import { motion } from "framer-motion";
import { about } from "../data/siteContent";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useReveal } from "../hooks/useReveal";

export default function AboutSection() {
  const revealImage = useReveal();
  const revealText = useReveal(0.15);

  return (
    <section id="apropos" className="border-b border-line bg-paper px-6 py-24 md:px-10">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-start gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
        <motion.div {...revealImage}>
          <div className="relative border border-line bg-linen p-[10px]">
            <span className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 border-walnut" />
            <span className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 border-walnut" />
            <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-walnut" />
            <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-walnut" />
            <PhotoPlaceholder tone="dark" className="h-[420px] sm:h-[570px]" />
          </div>
          <p className="mt-4 text-center text-xs italic text-mocha">{about.portraitCaption}</p>
        </motion.div>

        <motion.div {...revealText}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
            {about.kicker}
          </span>
          <h2 className="font-script mt-4 mb-6 text-4xl text-walnut sm:text-5xl">{about.title}</h2>
          <p className="mb-8 text-base leading-relaxed text-ink">{about.paragraph}</p>

          <ul className="mb-8 flex flex-col gap-4">
            {about.values.map((value) => (
              <li key={value.title} className="flex items-baseline gap-3">
                <span className="h-2 w-2 shrink-0 bg-walnut" aria-hidden="true" />
                <p className="text-[15px] leading-relaxed">
                  <strong className="text-walnut">{value.title}</strong> — {value.description}
                </p>
              </li>
            ))}
          </ul>

          <p className="font-script border-l-2 border-amber pl-6 text-2xl leading-snug text-mocha">
            « {about.quote} »
          </p>
        </motion.div>
      </div>
    </section>
  );
}
