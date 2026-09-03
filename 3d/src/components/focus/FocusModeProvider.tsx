"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { TagPill, NeoLinkButton } from "@/components/ui/Glass";
import { cx } from "@/lib/utils";
import { FocusModeContext, type FocusPayload } from "@/context/FocusModeContext";

// useLayoutEffect warns ("does nothing on the server") if it runs during
// Next.js's static prerender; this component only ever needs the pre-paint
// timing in the browser, so fall back to a plain effect on the server.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface Session {
  payload: FocusPayload;
  originRect: DOMRect;
}

const ENTER_DURATION = 0.5;
const EXIT_DURATION = 0.32;
/** The pinned canvas layer in CinematicSequence — see the matching attribute there. */
const BACKDROP_SELECTOR = "[data-focus-backdrop]";

const ACCENT_BG: Record<FocusPayload["accent"], string> = {
  electric: "bg-[#00E5FF]",
  violet: "bg-[#7C4DFF]",
};
const ACCENT_TEXT: Record<FocusPayload["accent"], string> = {
  electric: "text-[#00E5FF]",
  violet: "text-[#7C4DFF]",
};

/** FLIP delta: how far/how scaled the panel must start to visually sit at `from`. */
function flipDelta(from: DOMRect, to: DOMRect) {
  return {
    x: from.left + from.width / 2 - (to.left + to.width / 2),
    y: from.top + from.height / 2 - (to.top + to.height / 2),
    scaleX: Math.max(Math.min(from.width / to.width, 1), 0.15),
    scaleY: Math.max(Math.min(from.height / to.height, 1), 0.15),
  };
}

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [session, setSession] = useState<Session | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);

  const openFocus = useCallback((payload: FocusPayload, originEl: HTMLElement) => {
    closingRef.current = false;
    setSession({ payload, originRect: originEl.getBoundingClientRect() });
  }, []);

  const closeFocus = useCallback(() => {
    if (!session || closingRef.current) return;
    closingRef.current = true;

    const backdrop = document.querySelector<HTMLElement>(BACKDROP_SELECTOR);
    if (backdrop) {
      gsap.to(backdrop, {
        filter: "blur(0px) brightness(1)",
        duration: reducedMotion ? 0 : EXIT_DURATION,
        ease: "power2.out",
      });
    }

    const panel = panelRef.current;
    if (panel && !reducedMotion) {
      const finalRect = panel.getBoundingClientRect();
      const { x, y, scaleX, scaleY } = flipDelta(session.originRect, finalRect);
      gsap.to(panel, {
        x,
        y,
        scaleX,
        scaleY,
        opacity: 0,
        duration: EXIT_DURATION,
        ease: "power2.in",
        onComplete: () => setSession(null),
      });
    } else {
      setSession(null);
    }
  }, [session, reducedMotion]);

  // Entrance — runs synchronously before paint so the panel never flashes at
  // its resting (centered) position before the FLIP-in starts. Also owns the
  // background dim/blur, scroll lock, and ScrollTrigger pause for as long as
  // a session is open; its cleanup (on close or unmount) restores all three.
  useIsomorphicLayoutEffect(() => {
    if (!session) return;
    const panel = panelRef.current;
    const backdrop = document.querySelector<HTMLElement>(BACKDROP_SELECTOR);

    if (backdrop) {
      gsap.to(backdrop, {
        filter: "blur(12px) brightness(0.3)",
        duration: reducedMotion ? 0 : ENTER_DURATION,
        ease: "power2.out",
      });
    }

    if (panel) {
      if (reducedMotion) {
        gsap.set(panel, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1 });
      } else {
        const finalRect = panel.getBoundingClientRect();
        const { x, y, scaleX, scaleY } = flipDelta(session.originRect, finalRect);
        gsap.set(panel, { x, y, scaleX, scaleY, opacity: 0.4, transformOrigin: "center center" });
        gsap.to(panel, { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: ENTER_DURATION, ease: "power3.out" });
      }
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Prevents the canvas scrub from jumping under the focused card — the
    // body scroll lock already blocks user scrolling, this belt-and-braces
    // stops any programmatic ScrollTrigger refresh from moving it too.
    const triggers = ScrollTrigger.getAll();
    triggers.forEach((st) => st.disable(false));

    return () => {
      document.body.style.overflow = prevOverflow;
      triggers.forEach((st) => st.enable());
    };
  }, [session?.payload.id]);

  useEffect(() => {
    if (!session) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFocus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [session, closeFocus]);

  return (
    <FocusModeContext.Provider value={{ openFocus }}>
      {children}

      {session && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={session.payload.title}
        >
          {/* Blurred dim backdrop */}
          <div
            aria-hidden="true"
            onClick={closeFocus}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Glassmorphism panel */}
          <div
            ref={panelRef}
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl border border-cyan-500/30 bg-slate-900/80 shadow-[0_0_50px_rgba(0,229,255,0.15)] backdrop-blur-xl transition-all duration-300"
          >
            {/* Header row */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8 sm:py-6">
              <div>
                {(session.payload.eyebrow || session.payload.status) && (
                  <span
                    className={cx(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border",
                      session.payload.status === "BETA"
                        ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                        : "border-cyan-500/30 bg-cyan-500/10 text-[#00E5FF]"
                    )}
                  >
                    {session.payload.status && (
                      <span
                        className={cx(
                          "h-1.5 w-1.5 animate-pulse rounded-full",
                          session.payload.status === "BETA" ? "bg-amber-400" : "bg-[#00E5FF]"
                        )}
                      />
                    )}
                    {session.payload.status ?? session.payload.eyebrow}
                  </span>
                )}
                <h3 className="mt-3 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  {session.payload.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeFocus}
                aria-label="Fermer (ÉCHAP)"
                className="shrink-0 rounded-full border border-white/15 bg-white/5 p-2 text-white/60 backdrop-blur-sm transition-all duration-200 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
              >
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
              <p className="max-w-2xl text-base leading-relaxed text-white/70">
                {session.payload.description}
              </p>

              {session.payload.role && (
                <p
                  className={cx(
                    "mt-3 font-mono text-xs uppercase tracking-[0.15em]",
                    ACCENT_TEXT[session.payload.accent]
                  )}
                >
                  {session.payload.role}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {session.payload.tags.map((tag) => (
                  <TagPill key={tag}>{tag}</TagPill>
                ))}
              </div>

              {session.payload.caseStudy && (
                <dl className="mt-8 flex max-w-2xl flex-col gap-6">
                  <div>
                    <dt className={cx("font-mono text-xs font-bold uppercase tracking-[0.2em]", ACCENT_TEXT[session.payload.accent])}>
                      Problème
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/60">
                      {session.payload.caseStudy.problem}
                    </dd>
                  </div>
                  <div>
                    <dt className={cx("font-mono text-xs font-bold uppercase tracking-[0.2em]", ACCENT_TEXT[session.payload.accent])}>
                      Approche
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/60">
                      {session.payload.caseStudy.approach}
                    </dd>
                  </div>
                  <div>
                    <dt className={cx("font-mono text-xs font-bold uppercase tracking-[0.2em]", ACCENT_TEXT[session.payload.accent])}>
                      Résultat
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/60">
                      {session.payload.caseStudy.outcome}
                    </dd>
                  </div>
                </dl>
              )}
            </div>

            {/* Footer actions */}
            {session.payload.github && (
              <div className="flex shrink-0 items-center justify-end gap-3 border-t border-white/10 px-6 py-4 sm:px-8">
                <NeoLinkButton href={session.payload.github} target="_blank" rel="noreferrer" tone="glass">
                  {"[ GITHUB ]"}
                </NeoLinkButton>
              </div>
            )}
          </div>
        </div>
      )}
    </FocusModeContext.Provider>
  );
}
