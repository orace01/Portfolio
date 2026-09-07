import { motion } from "framer-motion";
import { stats } from "../data/siteContent";
import { useReveal } from "../hooks/useReveal";

export default function StatsSection() {
  const reveal = useReveal();

  return (
    <section className="border-b border-line bg-walnut px-6 py-20 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <motion.div {...reveal} className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.items.map((stat) => (
            <div key={stat.label} className="border border-amber px-6 py-8 text-center">
              <span className="font-script block text-5xl text-paper">{stat.value}</span>
              <span className="mt-2 block text-[13px] uppercase tracking-wide text-champagne">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
        {stats.isDemoData && (
          <p className="mt-8 text-center text-xs italic text-champagne">{stats.demoNote}</p>
        )}
      </div>
    </section>
  );
}
