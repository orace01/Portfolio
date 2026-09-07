import { motion } from "framer-motion";
import { method } from "../data/siteContent";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { revealProps, useReducedMotion } from "../hooks/useReveal";

const rowBackgrounds = ["bg-paper", "bg-champagne", "bg-paper", "bg-champagne"];

export default function MethodSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="methode" className="border-b border-line">
      <div className="mx-auto max-w-[1320px] px-6 pb-16 pt-24 text-center md:px-10">
        <motion.div {...revealProps(prefersReducedMotion)}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
            {method.kicker}
          </span>
          <h2 className="font-script mt-4 text-4xl text-walnut sm:text-5xl">{method.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-ink">{method.subtitle}</p>
        </motion.div>
      </div>

      {method.steps.map((step, index) => {
        const isEven = index % 2 === 1;

        return (
          <div
            key={step.number}
            className={`${rowBackgrounds[index]} border-t border-line px-6 py-16 md:px-10 ${
              index === method.steps.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
              <motion.div
                {...revealProps(prefersReducedMotion)}
                className={isEven ? "md:order-2" : "md:order-1"}
              >
                <PhotoPlaceholder className="h-[280px] border border-line sm:h-[320px]" />
              </motion.div>
              <motion.div
                {...revealProps(prefersReducedMotion, 0.15)}
                className={isEven ? "md:order-1" : "md:order-2"}
              >
                <span className="font-script text-6xl leading-none text-amber">
                  {step.number}
                </span>
                <h3 className="font-script mt-3 mb-4 text-3xl text-walnut">{step.title}</h3>
                <div className="mb-4 h-px w-10 bg-line" />
                <p className="max-w-md text-[15px] leading-relaxed text-ink">
                  {step.description}
                </p>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
