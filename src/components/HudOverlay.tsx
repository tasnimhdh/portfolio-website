"use client";

import { useEffect, useRef } from "react";

function dhakaTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
}

export default function HudOverlay() {
  const timeRef = useRef<any>(null);
  const fpsRef = useRef<any>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (timeRef.current) timeRef.current.textContent = dhakaTime();
    if (reduce) return undefined;

    let frame = 0;
    let frames = 0;
    let last = performance.now();
    const tick = (now: any) => {
      frames += 1;
      if (now - last >= 500) {
        if (fpsRef.current) fpsRef.current.textContent = `${Math.round((frames * 1000) / (now - last))} FPS`;
        if (timeRef.current) timeRef.current.textContent = dhakaTime();
        frames = 0;
        last = now;
      }
      if (document.hidden) return;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const onVis = () => {
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-frame" />
      <p className="hud-readout hud-tl">
        <span ref={timeRef}>--:--:--</span>
        <span>DHK 23.81N 90.41E</span>
      </p>
      <p className="hud-readout hud-tr">
        <span>SYS ONLINE</span>
        <span ref={fpsRef}>-- FPS</span>
      </p>
      <p className="hud-readout hud-bl">ORBIT / THEME</p>
      <p className="hud-readout hud-br">LINK STABLE</p>
    </div>
  );
}
