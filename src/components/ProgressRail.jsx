"use client";

import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scroll";

const stops = [
  { id: "top", label: "Top" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "brands", label: "Brands" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function ProgressRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = stops.map((stop) => document.getElementById(stop.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(0, stops.findIndex((stop) => stop.id === active));

  return (
    <nav className="progress-rail" aria-label="Section progress">
      {stops.map((stop, index) => (
        <a
          key={stop.id}
          href={`#${stop.id}`}
          className={index <= activeIndex ? "is-on" : ""}
          aria-current={stop.id === active ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            scrollToId(stop.id);
          }}
        >
          <span className="sr-only">{stop.label}</span>
        </a>
      ))}
    </nav>
  );
}
