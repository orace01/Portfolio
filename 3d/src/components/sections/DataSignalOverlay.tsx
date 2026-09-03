import { forwardRef } from "react";
import { SIGNAL_FEATURES } from "@/lib/constants";
import { GlassPanel, Eyebrow } from "@/components/ui/Glass";

const DataSignalOverlay = forwardRef<HTMLDivElement>(function DataSignalOverlay(
  _props,
  ref
) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center px-5 sm:px-8 lg:px-12"
    >
      <div
        data-anim="signal-panel"
        className="w-full max-w-md"
      >
        <GlassPanel accent="violet" className="p-6 sm:p-8">
          <Eyebrow>Comment je travaille</Eyebrow>
          <h2 className="mt-3 text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
            RIGUEUR, AUTONOMIE, PLEINE PROPRIÉTÉ
          </h2>

          <div className="mt-7 flex flex-col gap-5">
            {SIGNAL_FEATURES.map((feature) => (
              <div
                key={feature.index}
                data-anim="feature"
                className="flex gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
              >
                <span className="font-mono text-xs text-[#7C4DFF]">{feature.index}</span>
                <div>
                  <h3 className="text-sm font-medium text-white">{feature.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">
                    {feature.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wider text-[#00E5FF]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
});

export default DataSignalOverlay;
