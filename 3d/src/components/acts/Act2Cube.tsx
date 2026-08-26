"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import {
  ACT2,
  ACT2_CONTENT,
  ACT3,
  TRANSITIONS,
  CROSSFADE_START,
  CROSSFADE_ZONE,
  frameSrc,
} from "@/lib/constants";
import { useScrollNav } from "@/context/ScrollNavContext";
import FrameCanvas, { type FrameCanvasHandle } from "@/components/canvas/FrameCanvas";
import { GlassPanel, TagPill, Eyebrow } from "@/components/ui/Glass";

// Act II's own narrative content is compressed into [0, CROSSFADE_START] so
// the last 10% of its track is free for the crossfade into Act III.
const scale = (fraction: number) => fraction * CROSSFADE_START;

export default function Act2Cube() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasHandleRef = useRef<FrameCanvasHandle>(null);
  const nextPreviewRef = useRef<HTMLImageElement>(null);
  const transitionBadgeRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const expansionRef = useRef<HTMLDivElement>(null);

  const { registerSection } = useScrollNav();
  const reducedMotion = usePrefersReducedMotion();

  // Start preloading well before the Act reaches the viewport; pause draw
  // calls entirely once it's fully offscreen either direction.
  const isNear = useInView(rootRef, "800px 0px 800px 0px");
  const isVisible = useInView(rootRef, "0px");
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const { images, ready } = useFrameSequence({
    framePath: ACT2.framePath,
    frameCount: ACT2.frameCount,
    enabled: isNear,
  });

  useEffect(() => {
    registerSection("act2", rootRef.current);
  }, [registerSection]);

  useEffect(() => {
    if (!ready) return;
    ensureGsapRegistered();

    const root = rootRef.current;
    const assembly = assemblyRef.current;
    const rays = raysRef.current;
    const expansion = expansionRef.current;
    if (!root || !assembly || !rays || !expansion) return;

    const dist = reducedMotion ? 0 : 18;

    const ctx = gsap.context(() => {
      const frameState = { frame: 0 };
      const renderFrame = () => {
        if (!isVisibleRef.current) return;
        canvasHandleRef.current?.renderFrame(frameState.frame);
      };
      renderFrame();

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });

      tl.to(
        frameState,
        { frame: ACT2.frameCount - 1, duration: CROSSFADE_START, onUpdate: renderFrame },
        0
      );

      // --- Assembly: title + description -------------------------------
      const A = { start: scale(ACT2.sections.assembly.start), end: scale(ACT2.sections.assembly.end) };
      const assemblyItems = assembly.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(assembly, { pointerEvents: "auto" }, A.start);
      tl.fromTo(
        assemblyItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.02 },
        A.start + 0.01
      );
      tl.to(assemblyItems, { autoAlpha: 0, duration: 0.04 }, A.end - 0.04);
      tl.set(assembly, { pointerEvents: "none" }, A.end);

      // --- Rays: two feature cards --------------------------------------
      const R = { start: scale(ACT2.sections.rays.start), end: scale(ACT2.sections.rays.end) };
      const rayItems = rays.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(rays, { pointerEvents: "auto" }, R.start);
      tl.fromTo(
        rayItems,
        { autoAlpha: 0, x: dist * 2 },
        { autoAlpha: 1, x: 0, duration: 0.05, stagger: 0.03 },
        R.start + 0.01
      );
      tl.to(rayItems, { autoAlpha: 0, duration: 0.04 }, R.end - 0.04);
      tl.set(rays, { pointerEvents: "none" }, R.end);

      // --- Expansion: tech stack tags -----------------------------------
      const E = { start: scale(ACT2.sections.expansion.start), end: scale(ACT2.sections.expansion.end) };
      const expansionItems = expansion.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(expansion, { pointerEvents: "auto" }, E.start);
      tl.fromTo(
        expansionItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.02 },
        E.start + 0.01
      );
      tl.to(expansionItems, { autoAlpha: 0, duration: 0.04 }, E.end - 0.04);
      tl.set(expansion, { pointerEvents: "none" }, E.end);

      // --- Crossfade into Act III: dissolve the canvas, hold the badge ------
      tl.to(canvasWrapRef.current, { opacity: 0, duration: CROSSFADE_ZONE }, CROSSFADE_START);
      tl.to(nextPreviewRef.current, { opacity: 1, duration: CROSSFADE_ZONE }, CROSSFADE_START);
      tl.fromTo(
        transitionBadgeRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.03 },
        CROSSFADE_START + 0.01
      );
      tl.to(transitionBadgeRef.current, { autoAlpha: 0, duration: 0.03 }, 1 - 0.03);
    }, root);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <section ref={rootRef} className="relative" style={{ height: `${ACT2.heightVh}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <div ref={canvasWrapRef} className="absolute inset-0">
          <FrameCanvas
            ref={canvasHandleRef}
            images={images}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* Assembly phase */}
        <div
          ref={assemblyRef}
          className="pointer-events-none absolute inset-0 flex items-end px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32"
        >
          <div className="max-w-2xl">
            <div data-anim="item">
              <Eyebrow>{ACT2_CONTENT.assembly.eyebrow}</Eyebrow>
            </div>
            <h2
              data-anim="item"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {ACT2_CONTENT.assembly.title}
            </h2>
            <p data-anim="item" className="mt-5 max-w-lg text-sm text-white/60 sm:text-base lg:text-lg">
              {ACT2_CONTENT.assembly.description}
            </p>
          </div>
        </div>

        {/* Rays phase */}
        <div
          ref={raysRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-end justify-center gap-4 px-5 sm:px-8 lg:px-12"
        >
          {ACT2_CONTENT.features.map((feature) => (
            <div key={feature.index} data-anim="item" className="w-full max-w-sm">
              <GlassPanel accent="violet" className="p-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#7C4DFF]">{feature.index}</span>
                  <h3 className="text-sm font-medium text-white sm:text-base">{feature.title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{feature.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <TagPill key={tag}>{tag}</TagPill>
                  ))}
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>

        {/* Expansion phase */}
        <div
          ref={expansionRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
        >
          <div data-anim="item">
            <Eyebrow>{ACT2_CONTENT.expansion.eyebrow}</Eyebrow>
          </div>
          <div data-anim="item" className="flex flex-wrap items-center justify-center gap-3">
            {ACT2_CONTENT.expansion.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#00E5FF]/25 bg-white/[0.04] px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/80 backdrop-blur-xl"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Crossfade target: Act III's opening frame, dissolved in over Act II's last frame */}
        {/* eslint-disable-next-line @next/next/no-img-element -- loading is hand-managed alongside the frame sequences, not next/image */}
        <img
          ref={nextPreviewRef}
          src={frameSrc(ACT3.framePath, ACT3.frameCount, 1)}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
        />

        {/* Floating transition badge — no dedicated section, just a glass pill over the crossfade */}
        <div
          ref={transitionBadgeRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 opacity-0"
        >
          <div className="rounded-full border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-md">
            <p className="text-center font-mono text-xs tracking-[0.25em] text-[#00E5FF] sm:text-sm">
              {TRANSITIONS.toAct3}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
