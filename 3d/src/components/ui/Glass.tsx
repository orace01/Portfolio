import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  accent?: "electric" | "violet" | "none";
}

const accentBorder: Record<NonNullable<GlassPanelProps["accent"]>, string> = {
  electric: "border-[#00E5FF]/25 shadow-[0_0_40px_-12px_rgba(0,229,255,0.35)]",
  violet: "border-[#7C4DFF]/25 shadow-[0_0_40px_-12px_rgba(124,77,255,0.35)]",
  none: "border-white/10",
};

/** Standard glassmorphism surface used for every overlay badge/panel/card. */
export function GlassPanel({ children, className, accent = "none" }: GlassPanelProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-white/[0.04] backdrop-blur-xl backdrop-saturate-150",
        accentBorder[accent],
        className
      )}
    >
      {children}
    </div>
  );
}

export function TagPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60">
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#00E5FF]">
      {children}
    </span>
  );
}
