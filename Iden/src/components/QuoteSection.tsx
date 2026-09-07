import { motion } from "framer-motion";
import { featuredQuote } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

export default function QuoteSection() {
  const reveal = useReveal();

  return (
    <section className="border-b border-line px-6 py-28 md:px-10">
      <motion.div
        {...reveal}
        className="relative mx-auto max-w-[900px] border border-line px-8 py-16 text-center sm:px-16"
      >
        <span
          aria-hidden="true"
          className="font-script absolute left-6 top-4 text-6xl text-amber sm:left-9"
        >
          “
        </span>
        <span
          aria-hidden="true"
          className="font-script absolute bottom-0 right-6 text-6xl text-amber sm:right-9"
        >
          ”
        </span>
        <p className="font-script text-3xl leading-snug text-walnut sm:text-4xl">
          {featuredQuote.quote}
        </p>
        <div className="mx-auto mt-5 mb-5 h-px w-12 bg-amber" />
        <span className="text-[11px] uppercase tracking-[0.2em] text-mocha">
          {featuredQuote.caption}
        </span>
      </motion.div>
    </section>
  );
}
