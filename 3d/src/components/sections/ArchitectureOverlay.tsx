import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { ARCHITECTURE_LAYERS } from "@/lib/constants";
import { GlassPanel, TagPill } from "@/components/ui/Glass";
import { cx } from "@/lib/utils";

const ArchitectureOverlay = forwardRef<HTMLDivElement>(function ArchitectureOverlay(
  _props,
  ref
) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col gap-3 overflow-y-auto px-5 pb-6 pt-24 sm:px-8 md:block md:overflow-visible md:px-0 md:pt-0 lg:px-0"
    >
      {/* Circuit-trace connectors — desktop only, mobile relies on a plain stacked list */}
      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="archLineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#7C4DFF" />
          </linearGradient>
        </defs>
        {ARCHITECTURE_LAYERS.map((layer, i) => (
          <path
            key={layer.index}
            data-anim="line"
            data-index={i}
            d={`M ${layer.lineStart.x} ${layer.lineStart.y} L ${layer.anchor.x} ${layer.lineStart.y} L ${layer.anchor.x} ${layer.anchor.y}`}
            fill="none"
            stroke="url(#archLineGradient)"
            strokeWidth={0.15}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {ARCHITECTURE_LAYERS.map((layer, i) => (
          <circle
            key={`${layer.index}-dot`}
            data-anim="dot"
            data-index={i}
            cx={layer.anchor.x}
            cy={layer.anchor.y}
            r={0.55}
            fill="#00E5FF"
          />
        ))}
      </svg>

      {ARCHITECTURE_LAYERS.map((layer, i) => {
        const style = {
          "--x": `${layer.badge.x}%`,
          "--y": `${layer.badge.y}%`,
        } as CSSProperties;

        return (
          <div
            key={layer.index}
            data-anim="badge"
            data-index={i}
            style={style}
            className={cx(
              "md:absolute md:w-64 lg:w-72",
              layer.badge.side === "left" ? "md:left-[var(--x)]" : "md:right-[var(--x)]",
              "md:top-[var(--y)]"
            )}
          >
            <GlassPanel accent="electric" className="p-4">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/40">{layer.index}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {layer.layer}
                </span>
              </div>
              <h3 className="text-sm font-medium leading-snug text-white sm:text-base">
                {layer.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {layer.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>
            </GlassPanel>
          </div>
        );
      })}
    </div>
  );
});

export default ArchitectureOverlay;
