import { forwardRef } from "react";
import { ACT1_CONTENT } from "@/lib/constants";
import { Eyebrow } from "@/components/ui/Glass";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const HeroOverlay = forwardRef<HTMLDivElement>(function HeroOverlay(_props, ref) {
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 flex items-end">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/25 to-transparent"
      />

      <div className="relative w-full px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32">
        <div className="max-w-2xl">
          <div data-anim="title-word" className="opacity-0">
            <Eyebrow>{ACT1_CONTENT.hero.eyebrow}</Eyebrow>
          </div>

          <h1
            data-anim="title-word"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white opacity-0 sm:text-5xl lg:text-6xl"
          >
            {ACT1_CONTENT.hero.title}
          </h1>

          <p
            data-anim="subtitle"
            className="mt-5 max-w-lg text-sm text-white/70 opacity-0 sm:text-base lg:text-lg"
          >
            {ACT1_CONTENT.hero.description}
          </p>
        </div>
      </div>

      <ScrollIndicator />
    </div>
  );
});

export default HeroOverlay;
