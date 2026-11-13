"use client";

import { useEffect, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/\\";

export default function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const chars = [...text];
    let frame = 0;
    const limit = 28 + chars.length;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const next = chars
        .map((char, index) => {
          if (char === " ") return " ";
          if (frame > 10 + index * 1.4) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setShown(next);
      if (frame < limit) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span className={className} aria-hidden="true">
      {shown}
    </span>
  );
}
