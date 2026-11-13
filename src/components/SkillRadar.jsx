"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/profile";

const CX = 160;
const CY = 160;
const RADIUS = 108;

export default function SkillRadar() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.toggle("is-live", entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const nodes = skillGroups.map((group, index) => {
    const angle = (Math.PI * 2 * index) / skillGroups.length - Math.PI / 2;
    return {
      ...group,
      x: CX + Math.cos(angle) * RADIUS,
      y: CY + Math.sin(angle) * RADIUS,
    };
  });

  return (
    <div ref={ref} className="radar" aria-hidden="true">
      <svg viewBox="0 0 320 320">
        <circle cx={CX} cy={CY} r="118" fill="none" stroke="#27272a" />
        <circle cx={CX} cy={CY} r="74" fill="none" stroke="#27272a" />
        <circle cx={CX} cy={CY} r="28" fill="none" stroke="#f97316" strokeOpacity="0.45" />
        {nodes.map((node) => (
          <line key={`${node.id}-line`} className="radar-flow" x1={CX} y1={CY} x2={node.x} y2={node.y} stroke="#f97316" strokeOpacity="0.55" strokeDasharray="5 7" />
        ))}
        <path className="radar-sweep" d={`M${CX} ${CY} L${CX} ${CY - 118} A118 118 0 0 1 ${CX + 84} ${CY - 84} Z`} fill="#f97316" opacity="0.14" />
        {nodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="5" fill="#09090b" stroke="#fb923c" strokeWidth="1.6" />
            <text x={node.x} y={node.y + 18} textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="ui-sans-serif, system-ui, sans-serif">
              {node.title}
            </text>
          </g>
        ))}
        <circle cx={CX} cy={CY} r="3" fill="#f59e0b" />
      </svg>
    </div>
  );
}
