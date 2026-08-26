"use client";

import { useEffect, useRef } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ACT3, ACT3_CONTENT } from "@/lib/constants";
import { useScrollNav } from "@/context/ScrollNavContext";
import FrameCanvas, { type FrameCanvasHandle } from "@/components/canvas/FrameCanvas";
import { GlassPanel, TagPill, Eyebrow } from "@/components/ui/Glass";

export default function Act3Keyboard() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasHandleRef = useRef<FrameCanvasHandle>(null);
  const explosionRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);
  const reassemblyRef = useRef<HTMLDivElement>(null);

  const { registerSection } = useScrollNav();
  const reducedMotion = usePrefersReducedMotion();

  const isNear = useInView(rootRef, "800px 0px 800px 0px");
  const isVisible = useInView(rootRef, "0px");
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const { images, ready } = useFrameSequence({
    framePath: ACT3.framePath,
    frameCount: ACT3.frameCount,
    enabled: isNear,
  });

  useEffect(() => {
    registerSection("act3", rootRef.current);
  }, [registerSection]);

  useEffect(() => {
    if (!ready) return;
    ensureGsapRegistered();

    const root = rootRef.current;
    const explosion = explosionRef.current;
    const circuit = circuitRef.current;
    const reassembly = reassemblyRef.current;
    if (!root || !explosion || !circuit || !reassembly) return;

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

      tl.to(frameState, { frame: ACT3.frameCount - 1, duration: 1, onUpdate: renderFrame }, 0);

      // --- Explosion: title + description -------------------------------
      const X = ACT3.sections.explosion;
      const explosionItems = explosion.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(explosion, { pointerEvents: "auto" }, X.start);
      tl.fromTo(
        explosionItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.02 },
        X.start + 0.01
      );
      tl.to(explosionItems, { autoAlpha: 0, duration: 0.04 }, X.end - 0.04);
      tl.set(explosion, { pointerEvents: "none" }, X.end);

      // --- Circuit: two edge project cards -------------------------------
      const C = ACT3.sections.circuit;
      const circuitItems = circuit.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(circuit, { pointerEvents: "auto" }, C.start);
      tl.fromTo(
        circuitItems,
        { autoAlpha: 0, x: -dist * 2 },
        { autoAlpha: 1, x: 0, duration: 0.05, stagger: 0.03 },
        C.start + 0.01
      );
      tl.to(circuitItems, { autoAlpha: 0, duration: 0.04 }, C.end - 0.04);
      tl.set(circuit, { pointerEvents: "none" }, C.end);

      // --- Reassembly: final summary badge --------------------------------
      const RE = ACT3.sections.reassembly;
      const reassemblyItems = reassembly.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(reassembly, { pointerEvents: "auto" }, RE.start);
      tl.fromTo(
        reassemblyItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.02 },
        RE.start + 0.01
      );
    }, root);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  return (
    <section ref={rootRef} className="relative" style={{ height: `${ACT3.heightVh}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <FrameCanvas
          ref={canvasHandleRef}
          images={images}
          className="absolute inset-0 h-full w-full"
        />

        {/* Explosion phase */}
        <div
          ref={explosionRef}
          className="pointer-events-none absolute inset-0 flex items-end px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12 lg:pb-32"
        >
          <div className="max-w-2xl">
            <div data-anim="item">
              <Eyebrow>{ACT3_CONTENT.explosion.eyebrow}</Eyebrow>
            </div>
            <h2
              data-anim="item"
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {ACT3_CONTENT.explosion.title}
            </h2>
            <p data-anim="item" className="mt-5 max-w-lg text-sm text-white/60 sm:text-base lg:text-lg">
              {ACT3_CONTENT.explosion.description}
            </p>
          </div>
        </div>

        {/* Circuit phase */}
        <div
          ref={circuitRef}
          className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 px-5 sm:px-8 lg:px-12"
        >
          {ACT3_CONTENT.projects.map((project) => (
            <div key={project.index} data-anim="item" className="w-full max-w-sm">
              <GlassPanel accent="electric" className="p-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#00E5FF]">{project.index}</span>
                  <h3 className="text-sm font-medium text-white sm:text-base">{project.title}</h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <TagPill key={tag}>{tag}</TagPill>
                  ))}
                </div>
              </GlassPanel>
            </div>
          ))}
        </div>

        {/* Reassembly phase */}
        <div
          ref={reassemblyRef}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
        >
          <div data-anim="item">
            <GlassPanel accent="violet" className="px-6 py-4">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-white sm:text-sm">
                {ACT3_CONTENT.summaryBadge}
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
