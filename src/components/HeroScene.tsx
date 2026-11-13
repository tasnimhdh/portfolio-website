"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState } from "react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

class SceneBoundary extends Component<{ children?: React.ReactNode }, { failed: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function HeroScene() {
  const wrapRef = useRef<any>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return undefined;
    const onMove = (event: any) => {
      if (event.pointerType !== "mouse") return;
      const rect = node.getBoundingClientRect();
      pointer.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };
    let seen = true;
    const sync = () => setLive(seen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      seen = entry.isIntersecting;
      sync();
    });
    observer.observe(node);
    node.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      node.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-webgl-wrap">
      <SceneBoundary>
        <HeroCanvas pointer={pointer} scroll={scroll} live={live} />
      </SceneBoundary>
    </div>
  );
}
