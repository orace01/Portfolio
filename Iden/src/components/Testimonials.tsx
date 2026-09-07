import { motion } from "framer-motion";
import { testimonials } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

export default function Testimonials() {
  const reveal = useReveal();

  return (
    <section className="border-b border-line px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
            {testimonials.kicker}
          </span>
          <h2 className="font-script mt-4 mb-3 text-4xl text-walnut sm:text-5xl">
            {testimonials.title}
          </h2>
          {testimonials.isDemoData && (
            <p className="text-xs italic text-mocha">{testimonials.demoNote}</p>
          )}
        </div>

        <motion.div {...reveal} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <figure
              key={item.author}
              className="border border-line bg-paper px-7 py-9 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <span aria-hidden="true" className="font-script text-5xl leading-none text-amber">
                »
              </span>
              <blockquote className="my-3 text-[15px] leading-relaxed text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="text-[13px] font-semibold text-walnut">
                — {item.author}, {item.role}
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
