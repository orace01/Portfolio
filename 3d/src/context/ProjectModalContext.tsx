"use client";

import { createContext, useContext } from "react";

export interface ProjectModalContextValue {
  /** Opens the case-study modal for the project with this slug. */
  openProject: (slug: string) => void;
}

export const ProjectModalContext = createContext<ProjectModalContextValue | null>(null);

export function useProjectModal(): ProjectModalContextValue {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) {
    // Outside the provider — no-op fallback, mirrors ScrollNavContext's pattern.
    return { openProject: () => {} };
  }
  return ctx;
}
