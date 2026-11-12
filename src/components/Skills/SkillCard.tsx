"use client";

import { useReducedMotion } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import type { SkillTile } from "@/data/profile";
import styles from "./Skills.module.scss";

const MAX_TILT = 6;

export default function SkillCard({ tile }: { tile: SkillTile }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLLIElement>) => {
    const card = cardRef.current;
    if (!card || reduceMotion || event.pointerType !== "mouse") return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * MAX_TILT}deg) rotateY(${x * MAX_TILT}deg)`;
    card.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  };

  const handlePointerLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <li
      ref={cardRef}
      className={`${styles.card} ${styles[tile.size]}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <h3 className={styles.title}>{tile.title}</h3>
      <p className={styles.description}>{tile.description}</p>
      {tile.snippet && (
        <pre className={styles.snippet} aria-label="Example section schema">
          <code>{tile.snippet}</code>
        </pre>
      )}
      <ul className={styles.items} aria-label={`${tile.title} skills`}>
        {tile.items.map((item) => (
          <li key={item} className={styles.pill}>
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
}
