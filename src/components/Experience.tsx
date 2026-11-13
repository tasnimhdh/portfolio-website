"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experience, isPlaceholderText } from "@/data/profile";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import { NodeMark } from "@/components/svg/Marks";

export default function Experience() {
  const sectionRef = useRef<any>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.35 });

  return (
    <section id="experience" ref={sectionRef} className="holo scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 lg:flex-row lg:items-start">
        <div className="lg:sticky lg:top-24 lg:w-2/5">
          <SectionHeading eyebrow="Experience" title="Where the work sits." id="experience-title" />
        </div>
        <div className="timeline-shell lg:w-3/5">
          <svg className="timeline-svg" viewBox="0 0 16 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.path className="timeline-beam" d="M8 0 V100" style={{ pathLength: reduce ? 1 : beam }} vectorEffect="non-scaling-stroke" />
            <motion.path className="timeline-path" d="M8 0 V100" style={{ pathLength: reduce ? 1 : beam }} vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="timeline">
            {experience.map((item) => (
              <motion.li
                key={item.id}
                className="timeline-item is-lit"
                initial={reduce ? false : { y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="timeline-gutter" aria-hidden="true">
                  <NodeMark />
                </div>
                <div className="timeline-copy">
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
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
