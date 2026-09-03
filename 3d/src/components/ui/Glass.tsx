import type { AnchorHTMLAttributes, ReactNode } from "react";
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
        "rounded-2xl border bg-slate-900/80 shadow-2xl backdrop-blur-lg backdrop-saturate-150",
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
    <span className="rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-white/70">
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

/** Small "expand" corner hint shown on bento cards. */
export function ExpandHint() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100"
    >
      <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3 text-white/60">
        <path
          d="M2 10L10 2M10 2H6M10 2V6"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type NeoLinkTone = "white" | "glass";

const NEO_TONE: Record<NeoLinkTone, string> = {
  white:
    "border-white/20 bg-white/5 text-white hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]",
  glass:
    "border-cyan-500/30 bg-cyan-500/10 text-[#00E5FF] hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/15 hover:shadow-[0_0_16px_rgba(0,229,255,0.25)]",
};

interface NeoLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  tone?: NeoLinkTone;
}

/** A glassmorphism-style anchor button used in modals and cards. */
export function NeoLinkButton({ children, tone = "white", className, ...props }: NeoLinkButtonProps) {
  return (
    <a
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider backdrop-blur-sm transition-all duration-200",
        NEO_TONE[tone],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
