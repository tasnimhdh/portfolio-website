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
import Lab from "@/components/Lab";
import Skills from "@/components/Skills";
import BootIntro from "@/components/BootIntro";
import CursorGlow from "@/components/CursorGlow";
import MotionLayer from "@/components/MotionLayer";
import ProgressRail from "@/components/ProgressRail";
import GitHubActivity from "@/components/GitHubActivity";
import Marquee from "@/components/Marquee";
import NoiseOverlay from "@/components/svg/NoiseOverlay";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  useEffect(() => {
    const onMove = (event: any) => {
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
      <SmoothScroll />
      <ProgressRail />
      <NoiseOverlay />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Brands />
        <Skills />
        <Lab />
        <GitHubActivity />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
