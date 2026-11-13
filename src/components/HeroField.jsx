"use client";

import { useEffect, useRef } from "react";

export default function HeroField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !wide) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
    }));
    const pointer = { x: 0.72, y: 0.28 };
    let visible = true;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, canvas.clientWidth * ratio);
      canvas.height = Math.max(1, canvas.clientHeight * ratio);
    };
    resize();

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    canvas.parentElement?.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    const draw = () => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      const width = canvas.width;
      const height = canvas.height;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.vx += (pointer.x - particle.x) * 0.000012;
        particle.vy += (pointer.y - particle.y) * 0.000012;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.992;
        particle.vy *= 0.992;
        if (particle.x < 0 || particle.x > 1) particle.vx *= -1;
        if (particle.y < 0 || particle.y > 1) particle.vy *= -1;
        particle.x = Math.min(1, Math.max(0, particle.x));
        particle.y = Math.min(1, Math.max(0, particle.y));
      });
      context.lineWidth = 1;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = dx * dx + dy * dy;
          if (dist > 0.018) continue;
          context.strokeStyle = `rgba(249, 115, 22, ${0.28 - dist * 10})`;
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }
      context.fillStyle = "#fb923c";
      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x * width, particle.y * height, 1.7, 0, Math.PI * 2);
        context.fill();
      });
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.parentElement?.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="hero-field" aria-hidden="true" />;
}
