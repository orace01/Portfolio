"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { ACT1 } from "@/lib/constants";
import { useScrollNav } from "@/context/ScrollNavContext";

import FrameCanvas, { type FrameCanvasHandle } from "@/components/canvas/FrameCanvas";
import LoadingScreen from "@/components/ui/LoadingScreen";
import HeroOverlay from "@/components/sections/HeroOverlay";
import ArchitectureOverlay from "@/components/sections/ArchitectureOverlay";
import DataSignalOverlay from "@/components/sections/DataSignalOverlay";
import ProjectNetworkOverlay from "@/components/sections/ProjectNetworkOverlay";

export default function Act1Chip() {
  const { images, loadedCount, total, ready, allMissing } = useFrameSequence({
    framePath: ACT1.framePath,
    frameCount: ACT1.frameCount,
    enabled: true, // Act I is the entry point — always eager.
  });
  const reducedMotion = usePrefersReducedMotion();
  const { registerSection } = useScrollNav();

  const [loaderExited, setLoaderExited] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const canvasHandleRef = useRef<FrameCanvasHandle>(null);

  const isVisible = useInView(rootRef, "0px");
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const heroRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerSection("act1", rootRef.current);
  }, [registerSection]);

  // Build the master scrub timeline once frames are ready and the DOM is mounted.
  useEffect(() => {
    if (!ready) return;
    ensureGsapRegistered();

    const root = rootRef.current;
    const hero = heroRef.current;
    const arch = archRef.current;
    const signal = signalRef.current;
    const network = networkRef.current;
    if (!root || !hero || !arch || !signal || !network) return;

    const dist = reducedMotion ? 0 : 18; // px offset used in entrance/exit slides

    const ctx = gsap.context(() => {
      const frameState = { frame: 0 };
      const renderFrame = () => {
        if (!isVisibleRef.current) return; // pause draw calls while offscreen
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

      // --- Continuous frame scrub across the whole track --------------------
      tl.to(frameState, { frame: ACT1.frameCount - 1, duration: 1, onUpdate: renderFrame }, 0);

      // --- Hero: visible at rest, fades out approaching Architecture --------
      tl.set(hero, { pointerEvents: "auto" }, 0);
      tl.to(
        hero,
        { autoAlpha: 0, y: -dist * 2, duration: 0.05 },
        ACT1.sections.hero.end - 0.05
      );
      tl.set(hero, { pointerEvents: "none" }, ACT1.sections.hero.end);

      // --- Architecture: staggered badges + circuit-trace connectors --------
      const badges = arch.querySelectorAll<HTMLElement>('[data-anim="badge"]');
      const lines = arch.querySelectorAll<SVGPathElement>('[data-anim="line"]');
      const dots = arch.querySelectorAll<SVGCircleElement>('[data-anim="dot"]');

      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(dots, { transformOrigin: "50% 50%", scale: 0 });

      const A = ACT1.sections.architecture;
      tl.set(arch, { pointerEvents: "auto" }, A.start);
      tl.fromTo(
        badges,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.04, stagger: 0.012 },
        A.start + 0.005
      );
      tl.to(lines, { strokeDashoffset: 0, duration: 0.05, stagger: 0.012 }, A.start + 0.01);
      tl.to(dots, { scale: 1, duration: 0.03, stagger: 0.012 }, A.start + 0.035);
      tl.to([badges, dots], { autoAlpha: 0, duration: 0.04 }, A.end - 0.04);
      tl.to(lines, { opacity: 0, duration: 0.04 }, A.end - 0.04);
      tl.set(arch, { pointerEvents: "none" }, A.end);

      // --- Data Signal: left panel slides in, features cascade --------------
      const panel = signal.querySelector<HTMLElement>('[data-anim="signal-panel"]');
      const features = signal.querySelectorAll<HTMLElement>('[data-anim="feature"]');

      const S = ACT1.sections.signal;
      tl.set(signal, { pointerEvents: "auto" }, S.start);
      tl.fromTo(
        panel,
        { autoAlpha: 0, x: -dist * 3 },
        { autoAlpha: 1, x: 0, duration: 0.06 },
        S.start + 0.005
      );
      tl.fromTo(
        features,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: 0.03, stagger: 0.02 },
        S.start + 0.05
      );
      tl.to(panel, { autoAlpha: 0, x: -dist * 3, duration: 0.05 }, S.end - 0.05);
      tl.set(signal, { pointerEvents: "none" }, S.end);

      // --- Project Network: cards fade/scale over the plexus ----------------
      const cards = network.querySelectorAll<HTMLElement>('[data-anim="card"]');
      const N = ACT1.sections.network;
      tl.set(network, { pointerEvents: "auto" }, N.start);
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: dist, scale: reducedMotion ? 1 : 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.05, stagger: 0.03 },
        N.start + 0.005
      );
    }, root);

    return () => ctx.revert();
  }, [ready, reducedMotion]);

  // One-time intro reveal once the loader has finished exiting.
  useEffect(() => {
    if (!loaderExited) return;
    ensureGsapRegistered();
    const words = document.querySelectorAll('[data-anim="title-word"]');
    const subtitle = document.querySelector('[data-anim="subtitle"]');
    const indicator = document.querySelector('[data-anim="scroll-indicator"]');
    const header = document.querySelector('[data-anim="header"]');

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(header, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo(
        words,
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
        "-=0.3"
      )
      .fromTo(subtitle, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
      .fromTo(indicator, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [loaderExited]);

  return (
    <>
      {!loaderExited && (
        <LoadingScreen
          progress={total > 0 ? loadedCount / total : 0}
          ready={ready}
          onExited={() => setLoaderExited(true)}
        />
      )}

      <section ref={rootRef} className="relative" style={{ height: `${ACT1.heightVh}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
          <FrameCanvas
            ref={canvasHandleRef}
            images={images}
            className="absolute inset-0 h-full w-full"
          />

          <HeroOverlay ref={heroRef} />
          <ArchitectureOverlay ref={archRef} />
          <DataSignalOverlay ref={signalRef} />
          <ProjectNetworkOverlay ref={networkRef} />

          {allMissing && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-[11px] text-red-300">
              No frames found in {ACT1.framePath} — add frame_0001.webp …
              frame_{String(ACT1.frameCount).padStart(4, "0")}.webp
            </div>
          )}
        </div>
      </section>
    </>
  );
}
