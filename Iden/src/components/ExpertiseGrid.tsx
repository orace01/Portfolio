import { motion } from "framer-motion";
import { BookOpen, Compass, Gauge, Scale, Sprout, type LucideIcon } from "lucide-react";
import { expertise } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

const icons: Record<string, LucideIcon> = {
  sprout: Sprout,
  "book-open": BookOpen,
  scale: Scale,
  gauge: Gauge,
  compass: Compass,
};

export default function ExpertiseGrid() {
  const reveal = useReveal();

  return (
    <section id="expertise" className="border-b border-line px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mocha">
            {expertise.kicker}
          </span>
          <h2 className="font-script mt-4 text-4xl text-walnut sm:text-5xl">{expertise.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-ink">{expertise.subtitle}</p>
        </div>

        <motion.div
          {...reveal}
          className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5"
        >
          {expertise.items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-4 bg-linen px-4 py-9 text-center transition-colors hover:bg-paper"
              >
                <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-walnut text-walnut">
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="font-script text-2xl text-walnut">{item.title}</h3>
                <p className="text-[13px] leading-snug text-ink">{item.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
