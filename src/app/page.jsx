"use client";

import { useEffect } from "react";
import About from "@/components/About";
import Brands from "@/components/Brands";
import CommandPalette from "@/components/CommandPalette";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import BootIntro from "@/components/BootIntro";
import CursorGlow from "@/components/CursorGlow";
import MotionLayer from "@/components/MotionLayer";
import ProgressRail from "@/components/ProgressRail";
import NoiseOverlay from "@/components/svg/NoiseOverlay";

export default function Home() {
  useEffect(() => {
    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      const card = event.target.closest?.(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove);
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <BootIntro />
      <CursorGlow />
      <MotionLayer />
      <ProgressRail />
      <NoiseOverlay />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Brands />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
