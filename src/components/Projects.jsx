"use client";

import { useState } from "react";
import { brandById, isPlaceholderText, projects } from "@/data/profile";
import Lightbox from "@/components/Lightbox";
import Placeholder from "@/components/Placeholder";
import SectionHeading from "@/components/SectionHeading";
import ShotStage from "@/components/ShotStage";
import Icon from "@/components/svg/Icon";
import Sparkline from "@/components/svg/Sparkline";

export default function Projects() {
  const [open, setOpen] = useState(null);

  return (
    <section id="projects" className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Selected work" title="Case studies" id="projects-title">
          Four storefronts. Open a screenshot, or go straight to the live site. These themes stay in private client repos.
        </SectionHeading>

        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const shots = project.brandIds.map(brandById).filter(Boolean);
            return (
              <li key={project.id} className="project-card spotlight">
                <span className="project-border" aria-hidden="true" />
                <div className="relative z-10 flex h-full flex-col gap-4 p-4 sm:p-5">
                  <ShotStage shots={shots} onOpen={(shot, view) => setOpen({ shot, view })} />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-tight text-ink">{project.title}</h3>
                    <Sparkline index={index} />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-300">{project.problem}</p>
                  <p className="text-sm text-muted">
                    {project.result}
                    {isPlaceholderText(project.result) ? (
                      <>
                        {" "}
                        <Placeholder />
                      </>
                    ) : null}
                  </p>
                  <ul className="flex flex-wrap gap-2" aria-label={`${project.title} tech`}>
                    {project.tech.map((item) => (
                      <li key={item} className="rounded-md border border-line px-2 py-1 text-xs text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                    {shots.map((shot) => (
                      <a
                        key={shot.id}
                        href={shot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent no-underline"
                      >
                        Live site{shot.market ? ` · ${shot.market}` : ""}
                        <Icon name="external" className="h-3.5 w-3.5" />
                        <span className="sr-only"> for {shot.name} (opens in a new tab)</span>
                      </a>
                    ))}
                    <span className="text-sm text-muted">Private client repo</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Lightbox shot={open?.shot} view={open?.view} onClose={() => setOpen(null)} />
    </section>
  );
}
