"use client";

import { useEffect, useState } from "react";
import { PROJECTS } from "@/lib/constants";
import { TagPill } from "@/components/ui/Glass";
import { cx } from "@/lib/utils";

const TRANSITION_MS = 220;

interface ProjectModalProps {
  slug: string | null;
  onClose: () => void;
}

/**
 * Rendered once at the top of the tree (see ScrollExperience) so it sits
 * outside the pinned/transformed canvas layer entirely — project cards deep
 * inside CinematicSequence trigger it via ProjectModalContext instead of
 * rendering their own modal, so it isn't clipped or transformed by GSAP's
 * pin.
 */
export default function ProjectModal({ slug, onClose }: ProjectModalProps) {
  const project = slug ? PROJECTS.find((p) => p.slug === slug) ?? null : null;

  // Kept mounted through the exit transition, then cleared. Adjusted
  // synchronously during render (React's blessed pattern for "derive state
  // from a changed prop") rather than in an effect, so opening a project
  // never needs a extra render pass before the content appears.
  const [trackedSlug, setTrackedSlug] = useState<string | null>(null);
  const [rendered, setRendered] = useState<typeof project>(null);
  const [visible, setVisible] = useState(false);

  if (slug !== trackedSlug) {
    setTrackedSlug(slug);
    if (project) setRendered(project);
    setVisible(false);
  }

  // Entrance: flip visible one frame after the (now-mounted) content paints.
  useEffect(() => {
    if (!project) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [project]);

  // Exit: keep the last project rendered until the fade/scale-out finishes.
  useEffect(() => {
    if (project || !rendered) return;
    const t = setTimeout(() => setRendered(null), TRANSITION_MS);
    return () => clearTimeout(t);
  }, [project, rendered]);

  useEffect(() => {
    if (!rendered) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 z-[90] flex items-center justify-center px-4 py-10 transition-opacity",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      role="dialog"
      aria-modal="true"
      aria-label={rendered.title}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div
        className={cx(
          "relative w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_0_60px_-15px_rgba(0,229,255,0.25)] transition-all",
          visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0"
        )}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <span
              className={cx(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider",
                rendered.status === "ONLINE"
                  ? "border-[#00E5FF]/25 bg-[#00E5FF]/10 text-[#00E5FF]"
                  : "border-amber-400/25 bg-amber-400/10 text-amber-300"
              )}
            >
              <span
                className={cx(
                  "h-1.5 w-1.5 animate-pulse rounded-full",
                  rendered.status === "ONLINE" ? "bg-[#00E5FF]" : "bg-amber-300"
                )}
              />
              {rendered.status}
            </span>
            <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{rendered.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:border-white/30 hover:text-white"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          <div className="flex flex-wrap gap-1.5">
            {rendered.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>

          <dl className="mt-6 flex flex-col gap-5">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
                Problem
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-white/70">
                {rendered.caseStudy.problem}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
                Approach
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-white/70">
                {rendered.caseStudy.approach}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
                Outcome
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-white/70">
                {rendered.caseStudy.outcome}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-4">
          <a
            href={rendered.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/80 transition-all hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF]"
          >
            {"[ GITHUB ]"}
          </a>
        </div>
      </div>
    </div>
  );
}
