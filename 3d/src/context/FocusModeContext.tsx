"use client";

import { createContext, useContext } from "react";
import type { ProjectStatus } from "@/lib/constants";

export type FocusAccent = "electric" | "violet";

export interface FocusPayload {
  /** Unique per focusable item — re-opening a different id restarts the FLIP. */
  id: string;
  accent: FocusAccent;
  eyebrow?: string;
  title: string;
  description: string;
  tags: string[];
  /** Project-only extras — present only for Project-Network cards. */
  status?: ProjectStatus;
  github?: string;
  caseStudy?: { problem: string; approach: string; outcome: string };
}

export interface FocusModeContextValue {
  /** Opens Focus Mode for this content, FLIP-animating in from `originEl`'s current position. */
  openFocus: (payload: FocusPayload, originEl: HTMLElement) => void;
}

export const FocusModeContext = createContext<FocusModeContextValue | null>(null);

export function useFocusMode(): FocusModeContextValue {
  const ctx = useContext(FocusModeContext);
  if (!ctx) {
    // Outside the provider — no-op fallback, mirrors ScrollNavContext's pattern.
    return { openFocus: () => {} };
  }
  return ctx;
}
