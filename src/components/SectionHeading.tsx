"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionRule from "@/components/svg/SectionRule";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#";

function DecryptText({ text }: { text: string }) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = text;
      return undefined;
    }
    let frame = 0;
    let started = false;
    const chars = [...text];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      const tick = () => {
        frame += 1;
        node.textContent = chars
          .map((char, index) => {
            if (char === " ") return " ";
            if (frame > 8 + index * 1.3) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        if (frame < 12 + chars.length * 1.3) requestAnimationFrame(tick);
        else node.textContent = text;
      };
      requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </>
  );
}

export default function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  id: string;
  children?: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="mb-10 flex max-w-2xl flex-col gap-4"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="neon-flicker text-sm font-medium tracking-wide text-accent">{eyebrow}</p>
      <h2 id={id} className="glitch text-3xl font-semibold tracking-tight text-ink sm:text-4xl" data-text={title}>
        <DecryptText text={title} />
      </h2>
      <SectionRule />
      {children ? <div className="text-lg leading-relaxed text-muted">{children}</div> : null}
    </motion.div>
  );
}
