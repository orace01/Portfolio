"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ensureGsapRegistered } from "@/lib/gsap";
import type { FrameSequenceState } from "@/hooks/useFrameSequence";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import {
  ACT1,
  ACT2,
  ACT2_CONTENT,
  ACT3,
  ACT3_CONTENT,
  MANIFESTO,
  TRANSITIONS,
  CROSSFADE_ZONE,
} from "@/lib/constants";
import { useScrollNav } from "@/context/ScrollNavContext";

import FrameCanvas, { type FrameCanvasHandle } from "@/components/canvas/FrameCanvas";
import LoadingScreen from "@/components/ui/LoadingScreen";
import HeroOverlay from "@/components/sections/HeroOverlay";
import ArchitectureOverlay from "@/components/sections/ArchitectureOverlay";
import DataSignalOverlay from "@/components/sections/DataSignalOverlay";
import ProjectNetworkOverlay from "@/components/sections/ProjectNetworkOverlay";
import { GlassPanel, TagPill, Eyebrow } from "@/components/ui/Glass";

interface CinematicSequenceProps {
  act1Frames: FrameSequenceState;
  act2Frames: FrameSequenceState;
  act3Frames: FrameSequenceState;
  /** Called once the loading screen has fully exited. */
  onLoaderExited?: () => void;
}

// All three Acts scrub off ONE shared pinned track instead of three
// independent ones. A pinned element always "lands" (settles back into
// normal flow) for a stretch of scroll equal to its own height once it
// releases — that's inherent to how scroll-pinning reserves space, not a
// sizing mistake, so three separate per-Act pins would reproduce a dead
// ~100vh gap at every boundary no matter how their scrub distances were
// tuned. A single pin spanning all three Acts has nowhere for that gap to
// appear: the next Act's content simply starts scrubbing earlier, inside
// the previous Act's own still-pinned crossfade zone.
const T1 = ACT1.heightVh;
const T2 = ACT2.heightVh;
const T3 = ACT3.heightVh;
const TOTAL_VH = T1 + T2 + T3;

const ACT1_START = 0;
const ACT2_START = T1;
const ACT3_START = T1 + T2;

// Crossfade lengths, in vh, for each boundary — 5% of the *outgoing* Act's
// own track, per CROSSFADE_ZONE.
const Z1 = T1 * CROSSFADE_ZONE;
const Z2 = T2 * CROSSFADE_ZONE;

// Act I and II compress their own narrative content into the front
// (1 - CROSSFADE_ZONE) portion of their track, freeing the tail for the
// crossfade. Act III has no outgoing crossfade, so it uses its full track.
const a1pos = (fraction: number) => ACT1_START + fraction * (1 - CROSSFADE_ZONE) * T1;
const a1dur = (fraction: number) => fraction * T1;
const a2pos = (fraction: number) => ACT2_START + fraction * (1 - CROSSFADE_ZONE) * T2;
const a2dur = (fraction: number) => fraction * T2;
const a3pos = (fraction: number) => ACT3_START + fraction * T3;
const a3dur = (fraction: number) => fraction * T3;

export default function CinematicSequence({
  act1Frames,
  act2Frames,
  act3Frames,
  onLoaderExited,
}: CinematicSequenceProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { registerSection } = useScrollNav();
  const [loaderExited, setLoaderExited] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const act1AnchorRef = useRef<HTMLDivElement>(null);
  const act2AnchorRef = useRef<HTMLDivElement>(null);
  const act3AnchorRef = useRef<HTMLDivElement>(null);

  const act1WrapRef = useRef<HTMLDivElement>(null);
  const act2WrapRef = useRef<HTMLDivElement>(null);
  const act3WrapRef = useRef<HTMLDivElement>(null);
  const act1CanvasRef = useRef<FrameCanvasHandle>(null);
  const act2CanvasRef = useRef<FrameCanvasHandle>(null);
  const act3CanvasRef = useRef<FrameCanvasHandle>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  const assemblyRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const expansionRef = useRef<HTMLDivElement>(null);

  const explosionRef = useRef<HTMLDivElement>(null);
  const circuitRef = useRef<HTMLDivElement>(null);
  const reassemblyRef = useRef<HTMLDivElement>(null);

  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  const isVisible = useInView(rootRef, "0px");
  const isVisibleRef = useRef(isVisible);
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    registerSection("act1", act1AnchorRef.current);
    registerSection("act2", act2AnchorRef.current);
    registerSection("act3", act3AnchorRef.current);
  }, [registerSection]);

  const { images: act1Images, loadedCount, total, ready: act1Ready, allMissing } = act1Frames;
  const { images: act2Images, ready: act2Ready } = act2Frames;
  const { images: act3Images, ready: act3Ready } = act3Frames;
  const ready = act1Ready && act2Ready && act3Ready;

  useEffect(() => {
    if (!ready) return;
    ensureGsapRegistered();

    const root = rootRef.current;
    const pin = pinRef.current;
    const hero = heroRef.current;
    const arch = archRef.current;
    const signal = signalRef.current;
    const network = networkRef.current;
    const assembly = assemblyRef.current;
    const rays = raysRef.current;
    const expansion = expansionRef.current;
    const explosion = explosionRef.current;
    const circuit = circuitRef.current;
    const reassembly = reassemblyRef.current;
    if (
      !root || !pin || !hero || !arch || !signal || !network ||
      !assembly || !rays || !expansion || !explosion || !circuit || !reassembly
    ) {
      return;
    }

    const dist = reducedMotion ? 0 : 18;

    const ctx = gsap.context(() => {
      const act1Frame = { frame: 0 };
      const renderAct1 = () => {
        if (!isVisibleRef.current) return;
        act1CanvasRef.current?.renderFrame(act1Frame.frame);
      };
      act1CanvasRef.current?.renderFrame(act1Frame.frame);

      const act2Frame = { frame: 0 };
      const renderAct2 = () => {
        if (!isVisibleRef.current) return;
        act2CanvasRef.current?.renderFrame(act2Frame.frame);
      };
      act2CanvasRef.current?.renderFrame(act2Frame.frame);

      const act3Frame = { frame: 0 };
      const renderAct3 = () => {
        if (!isVisibleRef.current) return;
        act3CanvasRef.current?.renderFrame(act3Frame.frame);
      };
      act3CanvasRef.current?.renderFrame(act3Frame.frame);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          pin,
          pinSpacing: false,
          start: "top top",
          end: () => `+=${window.innerHeight * (TOTAL_VH / 100)}`,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // === Act I — frame scrub across its full track ========================
      tl.to(act1Frame, { frame: ACT1.frameCount - 1, duration: T1, onUpdate: renderAct1 }, ACT1_START);

      // --- Hero: visible at rest, fades out approaching Architecture --------
      tl.set(hero, { pointerEvents: "auto" }, ACT1_START);
      tl.to(
        hero,
        { autoAlpha: 0, y: -dist * 2, duration: a1dur(0.05) },
        a1pos(ACT1.sections.hero.end) - a1dur(0.05)
      );
      tl.set(hero, { pointerEvents: "none" }, a1pos(ACT1.sections.hero.end));

      // --- Architecture: staggered badges + circuit-trace connectors --------
      const archBadges = arch.querySelectorAll<HTMLElement>('[data-anim="badge"]');
      const archLines = arch.querySelectorAll<SVGPathElement>('[data-anim="line"]');
      const archDots = arch.querySelectorAll<SVGCircleElement>('[data-anim="dot"]');

      archLines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(archDots, { transformOrigin: "50% 50%", scale: 0 });

      const A = {
        start: a1pos(ACT1.sections.architecture.start),
        end: a1pos(ACT1.sections.architecture.end),
      };
      tl.set(arch, { pointerEvents: "auto" }, A.start);
      tl.fromTo(
        archBadges,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a1dur(0.04), stagger: a1dur(0.012) },
        A.start + a1dur(0.005)
      );
      tl.to(archLines, { strokeDashoffset: 0, duration: a1dur(0.05), stagger: a1dur(0.012) }, A.start + a1dur(0.01));
      tl.to(archDots, { scale: 1, duration: a1dur(0.03), stagger: a1dur(0.012) }, A.start + a1dur(0.035));
      tl.to([archBadges, archDots], { autoAlpha: 0, duration: a1dur(0.04) }, A.end - a1dur(0.04));
      tl.to(archLines, { opacity: 0, duration: a1dur(0.04) }, A.end - a1dur(0.04));
      tl.set(arch, { pointerEvents: "none" }, A.end);

      // --- Data Signal: left panel slides in, features cascade --------------
      const panel = signal.querySelector<HTMLElement>('[data-anim="signal-panel"]');
      const features = signal.querySelectorAll<HTMLElement>('[data-anim="feature"]');

      const S = { start: a1pos(ACT1.sections.signal.start), end: a1pos(ACT1.sections.signal.end) };
      tl.set(signal, { pointerEvents: "auto" }, S.start);
      tl.fromTo(
        panel,
        { autoAlpha: 0, x: -dist * 3 },
        { autoAlpha: 1, x: 0, duration: a1dur(0.06) },
        S.start + a1dur(0.005)
      );
      tl.fromTo(
        features,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a1dur(0.03), stagger: a1dur(0.02) },
        S.start + a1dur(0.05)
      );
      tl.to(panel, { autoAlpha: 0, x: -dist * 3, duration: a1dur(0.05) }, S.end - a1dur(0.05));
      tl.set(signal, { pointerEvents: "none" }, S.end);

      // --- Project Network: cards fade/scale over the plexus ----------------
      const cards = network.querySelectorAll<HTMLElement>('[data-anim="card"]');
      const N = { start: a1pos(ACT1.sections.network.start), end: a1pos(ACT1.sections.network.end) };
      tl.set(network, { pointerEvents: "auto" }, N.start);
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: dist, scale: reducedMotion ? 1 : 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: a1dur(0.05), stagger: a1dur(0.03) },
        N.start + a1dur(0.005)
      );
      tl.to(cards, { autoAlpha: 0, duration: a1dur(0.04) }, N.end - a1dur(0.04));
      tl.set(network, { pointerEvents: "none" }, N.end);

      // === Crossfade I -> II =================================================
      // Act I keeps scrubbing to its literal last frame while fading out; Act
      // II's own canvas — already stacked in this same pinned layer — fades in
      // while scrubbing ITS opening frames, starting Z1 early so its own track
      // (below) can pick the scrub up already in motion, with no held frame.
      tl.to(act1WrapRef.current, { opacity: 0, duration: Z1 }, ACT1_START + T1 - Z1);
      tl.to(act2WrapRef.current, { opacity: 1, duration: Z1 }, ACT2_START - Z1);
      tl.fromTo(
        act2Frame,
        { frame: 0 },
        { frame: ACT2.frameCount - 1, duration: Z1 + T2, onUpdate: renderAct2 },
        ACT2_START - Z1
      );

      tl.fromTo(
        badge1Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: Z1 * 0.25 },
        ACT1_START + T1 - Z1 + Z1 * 0.15
      );
      tl.to(
        badge1Ref.current,
        { autoAlpha: 0, duration: Z1 * 0.25 },
        ACT1_START + T1 - Z1 + Z1 * 0.6
      );

      // === Act II — content sections =========================================
      const A2 = { start: a2pos(ACT2.sections.assembly.start), end: a2pos(ACT2.sections.assembly.end) };
      const assemblyItems = assembly.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(assembly, { pointerEvents: "auto" }, A2.start);
      tl.fromTo(
        assemblyItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a2dur(0.05), stagger: a2dur(0.02) },
        A2.start + a2dur(0.01)
      );
      tl.to(assemblyItems, { autoAlpha: 0, duration: a2dur(0.04) }, A2.end - a2dur(0.04));
      tl.set(assembly, { pointerEvents: "none" }, A2.end);

      const R = { start: a2pos(ACT2.sections.rays.start), end: a2pos(ACT2.sections.rays.end) };
      const rayItems = rays.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(rays, { pointerEvents: "auto" }, R.start);
      tl.fromTo(
        rayItems,
        { autoAlpha: 0, x: dist * 2 },
        { autoAlpha: 1, x: 0, duration: a2dur(0.05), stagger: a2dur(0.03) },
        R.start + a2dur(0.01)
      );
      tl.to(rayItems, { autoAlpha: 0, duration: a2dur(0.04) }, R.end - a2dur(0.04));
      tl.set(rays, { pointerEvents: "none" }, R.end);

      const E = { start: a2pos(ACT2.sections.expansion.start), end: a2pos(ACT2.sections.expansion.end) };
      const expansionItems = expansion.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(expansion, { pointerEvents: "auto" }, E.start);
      tl.fromTo(
        expansionItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a2dur(0.05), stagger: a2dur(0.02) },
        E.start + a2dur(0.01)
      );
      tl.to(expansionItems, { autoAlpha: 0, duration: a2dur(0.04) }, E.end - a2dur(0.04));
      tl.set(expansion, { pointerEvents: "none" }, E.end);

      // === Crossfade II -> III ===============================================
      tl.to(act2WrapRef.current, { opacity: 0, duration: Z2 }, ACT2_START + T2 - Z2);
      tl.to(act3WrapRef.current, { opacity: 1, duration: Z2 }, ACT3_START - Z2);
      tl.fromTo(
        act3Frame,
        { frame: 0 },
        { frame: ACT3.frameCount - 1, duration: Z2 + T3, onUpdate: renderAct3 },
        ACT3_START - Z2
      );

      tl.fromTo(
        badge2Ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: Z2 * 0.25 },
        ACT2_START + T2 - Z2 + Z2 * 0.15
      );
      tl.to(
        badge2Ref.current,
        { autoAlpha: 0, duration: Z2 * 0.25 },
        ACT2_START + T2 - Z2 + Z2 * 0.6
      );

      // === Act III — content sections (no outgoing crossfade) ===============
      const X = { start: a3pos(ACT3.sections.explosion.start), end: a3pos(ACT3.sections.explosion.end) };
      const explosionItems = explosion.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(explosion, { pointerEvents: "auto" }, X.start);
      tl.fromTo(
        explosionItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a3dur(0.05), stagger: a3dur(0.02) },
        X.start + a3dur(0.01)
      );
      tl.to(explosionItems, { autoAlpha: 0, duration: a3dur(0.04) }, X.end - a3dur(0.04));
      tl.set(explosion, { pointerEvents: "none" }, X.end);

      const C = { start: a3pos(ACT3.sections.circuit.start), end: a3pos(ACT3.sections.circuit.end) };
      const circuitItems = circuit.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(circuit, { pointerEvents: "auto" }, C.start);
      tl.fromTo(
        circuitItems,
        { autoAlpha: 0, x: -dist * 2 },
        { autoAlpha: 1, x: 0, duration: a3dur(0.05), stagger: a3dur(0.03) },
        C.start + a3dur(0.01)
      );
      tl.to(circuitItems, { autoAlpha: 0, duration: a3dur(0.04) }, C.end - a3dur(0.04));
      tl.set(circuit, { pointerEvents: "none" }, C.end);

      // --- How I Work: manifesto pills, mirrored in from the opposite edge ---
      const manifestoItems = circuit.querySelectorAll<HTMLElement>('[data-anim="manifesto-item"]');
      tl.fromTo(
        manifestoItems,
        { autoAlpha: 0, x: dist * 2 },
        { autoAlpha: 1, x: 0, duration: a3dur(0.05), stagger: a3dur(0.03) },
        C.start + a3dur(0.01)
      );
      tl.to(manifestoItems, { autoAlpha: 0, duration: a3dur(0.04) }, C.end - a3dur(0.04));

      const RE = { start: a3pos(ACT3.sections.reassembly.start), end: a3pos(ACT3.sections.reassembly.end) };
      const reassemblyItems = reassembly.querySelectorAll<HTMLElement>('[data-anim="item"]');
      tl.set(reassembly, { pointerEvents: "auto" }, RE.start);
      tl.fromTo(
        reassemblyItems,
        { autoAlpha: 0, y: dist },
        { autoAlpha: 1, y: 0, duration: a3dur(0.05), stagger: a3dur(0.02) },
        RE.start + a3dur(0.01)
      );

      // Anchor the timeline's total duration exactly at TOTAL_VH regardless
      // of which tween above happens to end last.
      tl.set({}, {}, TOTAL_VH);
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
          ready={act1Ready}
          onExited={() => {
            setLoaderExited(true);
            onLoaderExited?.();
          }}
        />
      )}

      <section ref={rootRef} className="relative" style={{ height: `${100 + TOTAL_VH}vh` }}>
        {/* Nav anchors — not pinned, so scrollIntoView lands exactly on each Act's start */}
        <div ref={act1AnchorRef} className="absolute inset-x-0" style={{ top: `${ACT1_START}vh` }} aria-hidden="true" />
        <div ref={act2AnchorRef} className="absolute inset-x-0" style={{ top: `${ACT2_START}vh` }} aria-hidden="true" />
        <div ref={act3AnchorRef} className="absolute inset-x-0" style={{ top: `${ACT3_START}vh` }} aria-hidden="true" />

        <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-[#030712]">
          {/* --- Act I: chip --- */}
          <div ref={act1WrapRef} className="pointer-events-none absolute inset-0">
            <FrameCanvas ref={act1CanvasRef} images={act1Images} className="absolute inset-0 h-full w-full" />
            <HeroOverlay ref={heroRef} />
            <ArchitectureOverlay ref={archRef} />
            <DataSignalOverlay ref={signalRef} />
            <ProjectNetworkOverlay ref={networkRef} />
          </div>

          {/* --- Act II: cube --- */}
          <div ref={act2WrapRef} className="pointer-events-none absolute inset-0 z-10 opacity-0">
            <FrameCanvas ref={act2CanvasRef} images={act2Images} className="absolute inset-0 h-full w-full" />

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
          </div>

          {/* --- Act III: keyboard --- */}
          <div ref={act3WrapRef} className="pointer-events-none absolute inset-0 z-20 opacity-0">
            <FrameCanvas ref={act3CanvasRef} images={act3Images} className="absolute inset-0 h-full w-full" />

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

            <div
              ref={circuitRef}
              className="pointer-events-none absolute inset-0 flex items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
            >
              <div className="flex flex-col gap-4">
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

              <div className="hidden flex-col items-end gap-3 lg:flex">
                <span data-anim="manifesto-item" className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                  How I Work
                </span>
                {MANIFESTO.map((line) => (
                  <div
                    key={line}
                    data-anim="manifesto-item"
                    className="max-w-xs rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-right font-mono text-xs text-white/70 backdrop-blur-xl"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

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

          {/* --- Floating transition badges --- */}
          <div
            ref={badge1Ref}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 opacity-0"
          >
            <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
              <p className="text-center font-mono text-xs tracking-[0.25em] text-[#00E5FF] sm:text-sm">
                {TRANSITIONS.toAct2}
              </p>
            </div>
          </div>
          <div
            ref={badge2Ref}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6 opacity-0"
          >
            <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
              <p className="text-center font-mono text-xs tracking-[0.25em] text-[#00E5FF] sm:text-sm">
                {TRANSITIONS.toAct3}
              </p>
            </div>
          </div>

          {allMissing && (
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-30 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-[11px] text-red-300">
              No frames found in {ACT1.framePath} — add frame_0001.webp …
              frame_{String(ACT1.frameCount).padStart(4, "0")}.webp
            </div>
          )}
        </div>
      </section>
    </>
  );
}
