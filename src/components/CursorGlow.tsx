"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const reticleRef = useRef<any>(null);
  const trailRef = useRef<any>(null);

  useEffect(() => {
    const reticle = reticleRef.current;
    const trail = trailRef.current;
    if (!reticle || !trail) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !fine || !wide) return undefined;

    document.documentElement.classList.remove("has-reticle");
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    const paint = () => {
      frame = requestAnimationFrame(paint);
      tx += (x - tx) * 0.18;
      ty += (y - ty) * 0.18;
      reticle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      trail.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    };
    const onMove = (event: any) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      const typing = event.target.closest?.("input, textarea");
      reticle.style.opacity = typing ? "0" : "1";
    };
    frame = requestAnimationFrame(paint);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className="cursor-glow" aria-hidden="true" />
      <div ref={reticleRef} className="reticle" aria-hidden="true">
        <span />
        <span />
      </div>
    </>
  );
}
