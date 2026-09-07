import { motion } from "framer-motion";
import { vision } from "../data/siteContent";
import PhotoPlaceholder from "./PhotoPlaceholder";
import { useReveal } from "../hooks/useReveal";

export default function VisionSection() {
  const revealImage = useReveal();
  const revealText = useReveal(0.15);

  return (
    <section className="border-b border-line bg-paper px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
            {vision.kicker}
          </span>
          <h2 className="font-script mt-4 text-4xl text-walnut sm:text-5xl">{vision.title}</h2>
        </div>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <motion.div {...revealImage} className="order-2 md:order-1">
            <PhotoPlaceholder className="h-[300px] border border-line sm:h-[360px]" />
          </motion.div>
          <motion.div {...revealText} className="order-1 md:order-2">
            <p className="mb-7 text-[17px] leading-relaxed text-ink">{vision.paragraph}</p>
            <p className="font-script border-l-2 border-amber pl-6 text-2xl leading-snug text-mocha">
              « {vision.quote} »
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
