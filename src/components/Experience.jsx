"use client";

import { useEffect, useRef } from "react";
import { experience, isPlaceholderText } from "@/data/profile";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import { NodeMark } from "@/components/svg/Marks";

export default function Experience() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const beamRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    const beam = beamRef.current;
    const beamLength = beam ? beam.getTotalLength() : length;
    if (beam) beam.style.strokeDasharray = `${beamLength}`;
    const items = [...section.querySelectorAll(".timeline-item")];

    const paint = (progress) => {
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
      if (beam) beam.style.strokeDashoffset = `${beamLength * (1 - progress)}`;
      items.forEach((item) => {
        const top = item.getBoundingClientRect().top;
        item.classList.toggle("is-lit", reduce || top < window.innerHeight * 0.72);
      });
    };

    if (reduce) {
      paint(1);
      return undefined;
    }

    paint(0);
    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.8;
      const progress = (start - rect.top) / (rect.height + window.innerHeight * 0.15);
      paint(Math.min(1, Math.max(0, progress)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:flex-row lg:items-start">
        <div className="lg:sticky lg:top-24 lg:w-2/5">
          <SectionHeading eyebrow="Experience" title="Where the work sits." id="experience-title" />
        </div>
        <div className="timeline lg:w-3/5">
          <svg className="timeline-svg" viewBox="0 0 32 100" preserveAspectRatio="none" aria-hidden="true">
            <path ref={beamRef} className="timeline-beam" d="M16 0 V100" vectorEffect="non-scaling-stroke" />
            <path ref={pathRef} className="timeline-path" d="M16 0 V100" vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="flex flex-col gap-10">
            {experience.map((item) => (
              <li key={item.id} className="timeline-item">
                <NodeMark />
                <p className="text-sm font-medium text-accent">
                  {item.period}
                  {isPlaceholderText(item.period) ? (
                    <>
                      {" "}
                      <Placeholder />
                    </>
                  ) : null}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-ink">{item.role}</h3>
                <p className="text-sm text-zinc-300">{item.organisation}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                <ul className="mt-3 flex flex-col gap-2 pl-4 text-sm text-zinc-300">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="list-disc">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
