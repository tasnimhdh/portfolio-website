"use client";

import { useEffect, useState } from "react";

const LINES = ["tasnim islam", "theme runtime", "storefronts linked", "ready"];

export default function BootIntro() {
  const [phase, setPhase] = useState("pending");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("ti-boot") === "1";
    } catch {
      seen = true;
    }
    const root = document.querySelector("main");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const lock = (on) => {
      root?.toggleAttribute("inert", on);
      header?.toggleAttribute("inert", on);
      footer?.toggleAttribute("inert", on);
    };
    if (reduce || seen) {
      const timer = window.setTimeout(() => setPhase("done"), 0);
      return () => window.clearTimeout(timer);
    }
    const start = window.setTimeout(() => {
      lock(true);
      setPhase("play");
    }, 0);
    const finish = () => {
      try {
        sessionStorage.setItem("ti-boot", "1");
      } catch {
        /* ignore */
      }
      lock(false);
      setPhase("done");
    };
    const end = window.setTimeout(finish, 2600);
    const onKey = (event) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      lock(false);
    };
  }, []);

  if (phase !== "play") return null;

  return (
    <div className="boot-overlay">
      <button
        type="button"
        className="boot-skip btn-primary rounded-md px-3 py-2 text-sm font-semibold"
        onClick={() => {
          try {
            sessionStorage.setItem("ti-boot", "1");
          } catch {
            /* ignore */
          }
          document.querySelector("main")?.removeAttribute("inert");
          document.querySelector("header")?.removeAttribute("inert");
          document.querySelector("footer")?.removeAttribute("inert");
          setPhase("done");
        }}
      >
        Skip
      </button>
      <div className="flex flex-col gap-2" aria-hidden="true">
        {LINES.map((line) => (
          <p key={line} className="boot-line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
