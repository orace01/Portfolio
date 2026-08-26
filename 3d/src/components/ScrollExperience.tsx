"use client";

import { useCallback, useRef } from "react";
import { ScrollNavContext } from "@/context/ScrollNavContext";
import type { SectionId } from "@/lib/constants";
import { TRANSITIONS } from "@/lib/constants";

import Header from "@/components/layout/Header";
import Act1Chip from "@/components/acts/Act1Chip";
import Act2Cube from "@/components/acts/Act2Cube";
import Act3Keyboard from "@/components/acts/Act3Keyboard";
import TransitionDivider from "@/components/TransitionDivider";
import ContactFooter from "@/components/ContactFooter";

export default function ScrollExperience() {
  const registry = useRef<Partial<Record<SectionId, HTMLElement>>>({});

  const registerSection = useCallback((id: SectionId, el: HTMLElement | null) => {
    if (el) registry.current[id] = el;
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    registry.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <ScrollNavContext.Provider value={{ registerSection, scrollToSection }}>
      <Header />

      <Act1Chip />
      <TransitionDivider text={TRANSITIONS.toAct2} />
      <Act2Cube />
      <TransitionDivider text={TRANSITIONS.toAct3} />
      <Act3Keyboard />
      <ContactFooter />
    </ScrollNavContext.Provider>
  );
}
