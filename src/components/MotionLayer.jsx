"use client";

import { useEffect } from "react";

export default function MotionLayer() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const reveals = [...document.querySelectorAll(".reveal")];

    if (reduce) {
      reveals.forEach((node) => node.classList.add("is-in"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 },
    );
    reveals.forEach((node) => observer.observe(node));

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        if (wide) document.documentElement.style.setProperty("--scroll", String(window.scrollY));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (!fine || !wide) {
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(scrollFrame);
      };
    }

    let tiltFrame = 0;
    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const card = event.target.closest?.("[data-tilt]");
      const button = event.target.closest?.(".btn-primary");
      if (!tiltFrame) {
        tiltFrame = requestAnimationFrame(() => {
          tiltFrame = 0;
          if (card) {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            card.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
            card.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
            card.style.setProperty("--spot-x", `${px * 100}%`);
            card.style.setProperty("--spot-y", `${py * 100}%`);
          }
          if (button) {
            const rect = button.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            button.style.transform = `translate3d(${px * 6}px, ${py * 4}px, 0)`;
            button.style.setProperty("--rip-x", `${((px + 0.5) * 100).toFixed(1)}%`);
            button.style.setProperty("--rip-y", `${((py + 0.5) * 100).toFixed(1)}%`);
          }
        });
      }
    };
    const onOut = (event) => {
      const card = event.target.closest?.("[data-tilt]");
      if (card && !card.contains(event.relatedTarget)) {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      }
      const button = event.target.closest?.(".btn-primary");
      if (button && !button.contains(event.relatedTarget)) button.style.transform = "";
    };
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerout", onOut);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(tiltFrame);
    };
  }, []);

  return null;
}
