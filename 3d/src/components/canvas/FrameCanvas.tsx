"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface FrameCanvasHandle {
  /** Imperatively paints the given frame index. Called from the GSAP scrub loop. */
  renderFrame: (index: number) => void;
}

interface FrameCanvasProps {
  images: React.RefObject<(HTMLImageElement | null)[]>;
  className?: string;
}

/**
 * A bare <canvas> that paints whichever frame it's told to, imperatively.
 * Deliberately outside React's render cycle during scroll: GSAP calls
 * `renderFrame` directly on every scrub tick so we never pay for a
 * component re-render at 60fps.
 */
const FrameCanvas = forwardRef<FrameCanvasHandle, FrameCanvasProps>(
  function FrameCanvas({ images, className }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const sizeRef = useRef({ w: 0, h: 0 });
    const lastIndexRef = useRef(0);

    const draw = useCallback((img: HTMLImageElement | null) => {
      const ctx = ctxRef.current;
      const { w, h } = sizeRef.current;
      if (!ctx || w === 0 || h === 0) return;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
      if (!img) return;

      // object-fit: cover
      const canvasRatio = w / h;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let dw: number, dh: number, dx: number, dy: number;
      if (imgRatio > canvasRatio) {
        dh = h;
        dw = h * imgRatio;
        dx = (w - dw) / 2;
        dy = 0;
      } else {
        dw = w;
        dh = w / imgRatio;
        dx = 0;
        dy = (h - dh) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    }, []);

    const resize = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement ?? canvas;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctxRef.current = ctx;
      }
      sizeRef.current = { w: rect.width, h: rect.height };
      draw(images.current[lastIndexRef.current] ?? null);
    }, [draw, images]);

    useEffect(() => {
      resize();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        renderFrame(index: number) {
          const total = images.current.length;
          const clamped = Math.round(Math.min(Math.max(index, 0), total - 1));
          lastIndexRef.current = clamped;
          draw(images.current[clamped] ?? null);
        },
      }),
      [draw, images]
    );

    return (
      <canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
      />
    );
  }
);

export default FrameCanvas;
