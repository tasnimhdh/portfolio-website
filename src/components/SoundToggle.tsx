"use client";

import { useEffect, useRef, useState } from "react";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<any>(null);

  useEffect(() => {
    if (!on) return undefined;
    const context = new AudioContext();
    audioRef.current = context;
    const play = (event: any) => {
      const target = event.target.closest("a, button");
      if (!target || target.dataset.silent === "true") return;
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = "square";
      osc.frequency.value = 720;
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(context.destination);
      osc.start();
      osc.stop(context.currentTime + 0.07);
    };
    document.addEventListener("pointerdown", play);
    return () => {
      document.removeEventListener("pointerdown", play);
      context.close();
    };
  }, [on]);

  return (
    <button
      type="button"
      data-silent="true"
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-xs font-semibold text-muted"
      aria-pressed={on}
      aria-label={on ? "Turn interface sounds off" : "Turn interface sounds on"}
      onClick={() => setOn((value) => !value)}
    >
      {on ? "SND" : "MUTE"}
    </button>
  );
}
