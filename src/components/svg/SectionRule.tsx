"use client";

import { useEffect, useRef } from "react";

export default function SectionRule() {
  const ref = useRef<any>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svg.classList.add("is-drawn");
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add("is-drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} className="section-rule" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden="true">
      <path className="rule-path" pathLength="1" d="M0 4 H200" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
