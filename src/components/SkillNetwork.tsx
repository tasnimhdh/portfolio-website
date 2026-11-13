"use client";

import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/data/profile";

const LINKS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
  [0, 2],
  [1, 4],
];

function circleLayout() {
  return skillGroups.map((_, index) => {
    const angle = (Math.PI * 2 * index) / skillGroups.length - Math.PI / 2;
    return {
      x: 50 + Math.cos(angle) * 34,
      y: 50 + Math.sin(angle) * 32,
    };
  });
}

export default function SkillNetwork() {
  const boxRef = useRef<any>(null);
  const dragRef = useRef<any>(null);
  const [points, setPoints] = useState(circleLayout);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const move = (event: any) => {
      const drag = dragRef.current;
      const box = boxRef.current;
      if (!drag || !box) return;
      const rect = box.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setPoints((current) =>
        current.map((point, index) =>
          index === drag
            ? { x: Math.min(88, Math.max(12, x)), y: Math.min(84, Math.max(16, y)) }
            : point,
        ),
      );
    };
    const up = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div ref={boxRef} className={`skill-net${live ? " is-live" : ""}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        {LINKS.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className="skill-net-line"
            x1={points[from].x}
            y1={points[from].y}
            x2={points[to].x}
            y2={points[to].y}
          />
        ))}
      </svg>
      {skillGroups.map((group, index) => (
        <button
          key={group.id}
          type="button"
          className="skill-net-node"
          style={{ left: `${points[index].x}%`, top: `${points[index].y}%` }}
          aria-label={`Drag ${group.title}`}
          onPointerDown={(event) => {
            dragRef.current = index;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
        >
          {group.title}
        </button>
      ))}
    </div>
  );
}
