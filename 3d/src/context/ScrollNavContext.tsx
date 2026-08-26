"use client";

import { createContext, useContext } from "react";
import type { SectionId } from "@/lib/constants";

export interface ScrollNavContextValue {
  /** Called by each Act/Footer on mount so nav clicks know where to scroll. */
  registerSection: (id: SectionId, el: HTMLElement | null) => void;
  /** Smooth-scrolls the given section's top edge into view. */
  scrollToSection: (id: SectionId) => void;
}

export const ScrollNavContext = createContext<ScrollNavContextValue | null>(null);

export function useScrollNav(): ScrollNavContextValue {
  const ctx = useContext(ScrollNavContext);
  if (!ctx) {
    // Outside the experience — no-op fallback.
    return { registerSection: () => {}, scrollToSection: () => {} };
  }
  return ctx;
}
