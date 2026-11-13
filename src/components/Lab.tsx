"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import SkillNetwork from "@/components/SkillNetwork";

const SPECS = {
  magnetic:
    "type MagneticButtonProps = {\n  label: string;\n  intensity: number;\n};\n\nfunction onMove(event: PointerEvent) {\n  const pull = (event.offsetX / width - 0.5) * intensity;\n}",
  tilt:
    "type TiltState = { rx: number; ry: number };\n\nfunction tiltFromPointer(x: number, y: number): TiltState {\n  return { rx: (0.5 - y) * 8, ry: (x - 0.5) * 10 };\n}",
  scroll:
    "const { scrollYProgress } = useScroll();\nconst smooth = useSpring(scrollYProgress, {\n  stiffness: 90,\n  damping: 24,\n});",
  graph:
    "type Node = { id: string; x: number; y: number };\n\nfunction dragNode(node: Node, point: { x: number; y: number }) {\n  node.x = clamp(point.x, 12, 88);\n  node.y = clamp(point.y, 16, 84);\n}",
};

export default function Lab() {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const [preset, setPreset] = useState("standard");
  const [intensity, setIntensity] = useState(6);
  const [panel, setPanel] = useState("magnetic");
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pulled, setPulled] = useState({ x: 0, y: 0 });
  const stiffness = preset === "soft" ? 40 : preset === "snappy" ? 180 : 90;

  return (
    <section id="lab" className="holo scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5">
        <SectionHeading eyebrow="Engineering" title="Component and architecture lab." id="lab-title">
          Interactive demos of the stack: TypeScript, Next.js, Python, Django, and the storefront languages. These are engineering samples, not client project claims.
        </SectionHeading>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Physics preset">
          {["soft", "standard", "snappy"].map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-md border px-3 py-2 text-sm capitalize ${preset === item ? "border-accent text-ink" : "border-line text-muted"}`}
              aria-pressed={preset === item}
              onClick={() => setPreset(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="flex max-w-sm flex-col gap-2 text-sm text-muted">
          Intensity {intensity}
          <input
            type="range"
            min="2"
            max="12"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
          />
        </label>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="hud-card rounded-lg border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold">Magnetic control</h3>
            <button
              type="button"
              className="btn-primary mt-4 inline-flex h-11 items-center rounded-md px-4 text-sm font-semibold"
              style={{ transform: `translate3d(${pulled.x}px, ${pulled.y}px, 0)` }}
              onPointerMove={(event) => {
                if (reduce || event.pointerType !== "mouse") return;
                const rect = event.currentTarget.getBoundingClientRect();
                setPulled({
                  x: ((event.clientX - rect.left) / rect.width - 0.5) * intensity,
                  y: ((event.clientY - rect.top) / rect.height - 0.5) * intensity * 0.6,
                });
              }}
              onPointerLeave={() => setPulled({ x: 0, y: 0 })}
              onClick={() => setPanel("magnetic")}
            >
              Pull me
            </button>
          </article>

          <article
            className="hud-card rounded-lg border border-line bg-surface p-5"
            onPointerMove={(event) => {
              if (reduce || event.pointerType !== "mouse") return;
              const rect = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width;
              const y = (event.clientY - rect.top) / rect.height;
              setTilt({ rx: (0.5 - y) * intensity, ry: (x - 0.5) * intensity });
              setPanel("tilt");
            }}
            onPointerLeave={() => setTilt({ rx: 0, ry: 0 })}
            style={{
              transform: reduce ? undefined : `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: `transform ${preset === "snappy" ? 80 : preset === "soft" ? 280 : 140}ms linear`,
            }}
          >
            <h3 className="text-lg font-semibold">Tilt inspector</h3>
            <p className="mt-3 font-mono text-sm text-accent">
              rx {tilt.rx.toFixed(1)} / ry {tilt.ry.toFixed(1)} / spring {stiffness}
            </p>
          </article>

          <article className="hud-card rounded-lg border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold">Scroll telemetry</h3>
            <motion.p className="mt-3 font-mono text-sm text-muted" style={{ opacity: reduce ? 1 : smooth }}>
              Scroll-linked spring is driving this line.
            </motion.p>
            <p className="mt-2 font-mono text-xs text-muted">useScroll + useSpring, stiffness {stiffness}</p>
            <button type="button" className="mt-4 text-sm text-accent" onClick={() => setPanel("scroll")}>
              Show the hook
            </button>
            <ScrollReadout scrollY={scrollY} />
          </article>

          <article className="hud-card rounded-lg border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold">Node graph</h3>
            <p className="mt-2 text-sm text-muted">Drag a skill node. The badge list below the lab stays the accessible source.</p>
            <div className="mt-4" onPointerDown={() => setPanel("graph")}>
              <SkillNetwork />
            </div>
          </article>
        </div>

        <article className="rounded-lg border border-line bg-canvas p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {Object.keys(SPECS).map((key) => (
              <button
                key={key}
                type="button"
                className={`rounded-md border px-3 py-1 text-xs uppercase ${panel === key ? "border-accent text-ink" : "border-line text-muted"}`}
                aria-pressed={panel === key}
                onClick={() => setPanel(key)}
              >
                {key}
              </button>
            ))}
            <button
              type="button"
              className="rounded-md border border-line px-3 py-1 text-xs text-accent"
              onClick={() => window.dispatchEvent(new CustomEvent("command-palette:open"))}
            >
              Open command palette
            </button>
          </div>
          <pre className="overflow-x-auto font-mono text-sm text-zinc-200">
            <code>{SPECS[panel as keyof typeof SPECS]}</code>
          </pre>
        </article>
      </div>
    </section>
  );
}

function ScrollReadout({ scrollY }: { scrollY: { on: (event: "change", cb: (value: number) => void) => () => void } }) {
  const [y, setY] = useState(0);
  useEffect(() => {
    const unsub = scrollY.on("change", (value: any) => setY(Math.round(value)));
    return () => unsub();
  }, [scrollY]);
  return <p className="mt-2 font-mono text-sm text-ink">scrollY {y}px</p>;
}
