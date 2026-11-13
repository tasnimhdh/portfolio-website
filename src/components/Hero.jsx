"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { copyText, scrollToId } from "@/lib/scroll";
import CodeEditor from "@/components/CodeEditor";
import HeroField from "@/components/HeroField";
import Placeholder from "@/components/Placeholder";
import ScrambleText from "@/components/ScrambleText";
import HeroCircuit from "@/components/svg/HeroCircuit";
import Icon from "@/components/svg/Icon";

export default function Hero() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (reduce || !fine || !wide) return undefined;

    const onMove = (event) => {
      const rect = section.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      section.style.setProperty("--px", x.toFixed(3));
      section.style.setProperty("--py", y.toFixed(3));
      if (glowRef.current) {
        glowRef.current.setAttribute("cx", String(40 + x * 740));
        glowRef.current.setAttribute("cy", String(24 + y * 380));
      }
    };
    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  const copyEmail = async () => {
    const ok = await copyText(profile.email);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="top" ref={sectionRef} className="hero" tabIndex={-1} aria-labelledby="hero-title">
      <HeroField />
      <HeroCircuit glowRef={glowRef} />
      <div className="hero-scan" aria-hidden="true" />
      <div className="hero-sheen" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-5 pb-20 pt-16 lg:flex-row lg:items-center lg:gap-16 lg:pb-28 lg:pt-24">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <p className="text-sm font-medium text-accent">
            {profile.pronouns} · {profile.location}
          </p>
          <h1 id="hero-title" className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <span className="sr-only">
              {profile.name}. {profile.role}
            </span>
            <ScrambleText text={profile.name} className="block" />
            <ScrambleText text={profile.role} className="mt-3 block text-2xl font-medium tracking-tight text-muted sm:text-3xl" />
          </h1>
          <p className="text-sm text-muted sm:text-base">
            {profile.companyRole}, {profile.company}
          </p>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-200">{profile.valueStatement}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="btn-primary group inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-semibold no-underline"
              onClick={(event) => {
                event.preventDefault();
                scrollToId("projects");
              }}
            >
              View projects
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <button
              type="button"
              className="group inline-flex h-11 items-center gap-2 rounded-md border border-line bg-canvas/70 px-4 text-sm font-semibold text-ink"
              onClick={copyEmail}
            >
              <Icon name="copy" className="h-4 w-4" />
              {copied ? "Copied" : "Copy email"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? `Copied ${profile.email}` : ""}
            </span>
          </div>
          {profile.emailPlaceholder ? (
            <p className="text-sm text-muted">
              {profile.email} <Placeholder />
            </p>
          ) : null}
        </div>
        <div className="min-w-0 w-full flex-1 lg:max-w-xl">
          <CodeEditor label="Hero theme files" />
        </div>
      </div>
    </section>
  );
}
