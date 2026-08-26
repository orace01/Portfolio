import { forwardRef } from "react";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const TITLE_WORDS = ["BUILDING", "INTELLECTUAL", "INFRASTRUCTURE"];

const HeroOverlay = forwardRef<HTMLDivElement>(function HeroOverlay(_props, ref) {
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 flex items-end">
      <div className="w-full px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {TITLE_WORDS.map((word, i) => (
            <span key={word} className="mr-4 inline-block overflow-hidden align-bottom last:mr-0">
              <span
                data-anim="title-word"
                data-index={i}
                className="inline-block bg-gradient-to-r from-white to-white bg-clip-text text-transparent opacity-0"
                style={i === 2 ? { backgroundImage: "linear-gradient(90deg,#00E5FF,#7C4DFF)" } : undefined}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          data-anim="subtitle"
          className="mt-6 max-w-lg text-sm text-white/60 opacity-0 sm:text-base lg:text-lg"
        >
          AI Systems Architecture, Local LLM Orchestration &amp; Full-Stack
          Engineering.
        </p>
      </div>

      <ScrollIndicator />
    </div>
  );
});

export default HeroOverlay;
