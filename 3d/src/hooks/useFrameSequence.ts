"use client";

import { useEffect, useRef, useState } from "react";
import { frameSrc } from "@/lib/constants";

const CONCURRENCY = 10;

export interface FrameSequenceState {
  /** Loaded HTMLImageElements, indexed 0..frameCount-1. Missing entries are null. */
  images: React.RefObject<(HTMLImageElement | null)[]>;
  /** Frames attempted (loaded or errored) so far. */
  loadedCount: number;
  /** Total frames to load. */
  total: number;
  /** True once every frame has been attempted and the Act can be revealed/drawn. */
  ready: boolean;
  /** True if every single frame failed to load (helps surface a dev warning). */
  allMissing: boolean;
}

interface UseFrameSequenceOptions {
  framePath: string;
  frameCount: number;
  /** Gate for lazy Acts: preloading only starts once this becomes true. */
  enabled?: boolean;
}

/**
 * Progressively preloads one Act's frame sequence with bounded concurrency.
 * We wait for every frame before marking `ready` so ScrollTrigger scrubbing
 * never has to paint a blank/missing frame mid-scroll. `enabled` lets Acts
 * below the fold defer loading until the viewport is about to reach them.
 */
export function useFrameSequence({
  framePath,
  frameCount,
  enabled = true,
}: UseFrameSequenceOptions): FrameSequenceState {
  const images = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const [loadedCount, setLoadedCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [allMissing, setAllMissing] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // No "already started" guard here: React Strict Mode (dev only) mounts,
    // cleans up, and re-mounts every effect once. A guard keyed on a ref
    // would survive that cleanup and block the second (surviving) run from
    // ever starting, leaving the loader stuck — each run must be free to
    // start its own cancellable pass; already-loaded images are cheap to
    // re-touch since the browser serves them from cache.
    let cancelled = false;
    let attempted = 0;
    let failed = 0;
    let nextIndex = 0;

    const loadOne = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          images.current[i] = img;
          resolve();
        };
        img.onerror = () => {
          failed += 1;
          images.current[i] = null;
          resolve();
        };
        img.src = frameSrc(framePath, frameCount, i + 1);
      });

    const worker = async () => {
      while (!cancelled) {
        const i = nextIndex;
        nextIndex += 1;
        if (i >= frameCount) return;
        await loadOne(i);
        attempted += 1;
        if (!cancelled) setLoadedCount(attempted);
      }
    };

    const workers = Array.from({ length: Math.min(CONCURRENCY, frameCount) }, worker);

    Promise.all(workers).then(() => {
      if (cancelled) return;
      setAllMissing(failed === frameCount);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [enabled, framePath, frameCount]);

  return { images, loadedCount, total: frameCount, ready, allMissing };
}
