"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { brands, projects, type Project, type ProjectCategory } from "@/data/profile";
import Reveal from "@/components/Reveal/Reveal";
import ProjectModal from "./ProjectModal";
import styles from "./Projects.module.scss";

type Filter = "All" | ProjectCategory;

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filters = useMemo<Filter[]>(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [],
  );

  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="section" tabIndex={-1} aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="section-title">
            Case studies
          </h2>
          <p className="section-lead">
            Shopify theme work across {brands.length} brands. Filter by type, then open a card for details.
          </p>
        </Reveal>

        <div className={styles.filters} role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.filter}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        <LayoutGroup>
          <motion.ul className={styles.grid} layout={!reduceMotion}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.id}
                  className={styles.item}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    className={styles.card}
                    onClick={() => setSelected(project)}
                    aria-haspopup="dialog"
                  >
                    <span className={styles.category}>{project.category}</span>
                    <span className={styles.cardTitle}>{project.title}</span>
                    <span className={styles.summary}>{project.summary}</span>
                    <span className={styles.brands}>{project.brands.join(" · ")}</span>
                    <span className={styles.more} aria-hidden="true">
                      View details →
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
