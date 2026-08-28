"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ScrollNavContext } from "@/context/ScrollNavContext";
import { ProjectModalContext } from "@/context/ProjectModalContext";
import { ACT1, ACT2, ACT3, type SectionId } from "@/lib/constants";
import { useFrameSequence } from "@/hooks/useFrameSequence";

import Header from "@/components/layout/Header";
import CinematicSequence from "@/components/CinematicSequence";
import ContactFooter from "@/components/ContactFooter";
import ProjectModal from "@/components/projects/ProjectModal";
import AssistantWidget from "@/components/assistant/AssistantWidget";

export default function ScrollExperience() {
  const registry = useRef<Partial<Record<SectionId, HTMLElement>>>({});

  const registerSection = useCallback((id: SectionId, el: HTMLElement | null) => {
    if (el) registry.current[id] = el;
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    registry.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const [activeProjectSlug, setActiveProjectSlug] = useState<string | null>(null);
  const projectModalValue = useMemo(
    () => ({ openProject: setActiveProjectSlug }),
    []
  );

  // Frame sequences are loaded once here and shared downward: each Act needs
  // its own frames to play, plus the *next* Act's frames to paint a live
  // cross-fade overlay in its own sticky wrapper instead of a frozen hold.
  // All three load eagerly and concurrently (only Act I's progress blocks
  // the loading screen) so the crossfade at each boundary never runs ahead
  // of what's actually downloaded.
  const act1Frames = useFrameSequence({
    framePath: ACT1.framePath,
    frameCount: ACT1.frameCount,
    enabled: true,
  });
  const act2Frames = useFrameSequence({
    framePath: ACT2.framePath,
    frameCount: ACT2.frameCount,
    enabled: true,
  });
  const act3Frames = useFrameSequence({
    framePath: ACT3.framePath,
    frameCount: ACT3.frameCount,
    enabled: true,
  });

  return (
    <ScrollNavContext.Provider value={{ registerSection, scrollToSection }}>
      <ProjectModalContext.Provider value={projectModalValue}>
        <Header />

        <CinematicSequence act1Frames={act1Frames} act2Frames={act2Frames} act3Frames={act3Frames} />
        <ContactFooter />

        <ProjectModal slug={activeProjectSlug} onClose={() => setActiveProjectSlug(null)} />
        <AssistantWidget />
      </ProjectModalContext.Provider>
    </ScrollNavContext.Provider>
  );
}
