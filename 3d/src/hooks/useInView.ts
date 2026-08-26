"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the given element intersects the viewport (expanded by
 * `rootMargin`). Used both to trigger lazy frame preloading well before an
 * Act scrolls into view, and — with a tight margin — to pause canvas draw
 * calls for Acts that are currently offscreen.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px"): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin, threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
