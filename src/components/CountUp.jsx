"use client";

import { useEffect, useRef } from "react";

export default function CountUp({ value, label }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const write = (next) => {
      node.textContent = String(next);
    };
    if (reduce) {
      write(value);
      return undefined;
    }
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 900);
        const eased = 1 - (1 - progress) ** 3;
        write(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <p>
      <strong ref={ref}>{value}</strong>
      <span className="text-sm text-muted">{label}</span>
    </p>
  );
}
