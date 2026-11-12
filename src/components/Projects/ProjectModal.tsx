"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import type { Project } from "@/data/profile";
import styles from "./Projects.module.scss";

type ProjectModalProps = { project: Project | null; onClose: () => void };

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="project-dialog-title"
      onClose={handleClose}
      onClick={handleBackdropClick}
    >
      {project && (
        <div className={styles.dialogBody}>
          <div className={styles.dialogHeader}>
            <div className={styles.dialogHeading}>
              <p className={styles.category}>{project.category}</p>
              <h3 id="project-dialog-title" className={styles.dialogTitle}>
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              className={styles.close}
              aria-label="Close project details"
              onClick={() => dialogRef.current?.close()}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className={styles.dialogSummary}>{project.summary}</p>

          <div className={styles.dialogSection}>
            <h4 className={styles.dialogLabel}>Brands</h4>
            <p>{project.brands.join(", ")}</p>
          </div>

          <div className={styles.dialogSection}>
            <h4 className={styles.dialogLabel}>What I did</h4>
            <ul className={styles.detailList}>
              {project.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className={styles.dialogSection}>
            <h4 className={styles.dialogLabel}>Built with</h4>
            <ul className={styles.tags}>
              {project.stack.map((tool) => (
                <li key={tool} className={styles.tag}>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.dialogSection}>
            <h4 className={styles.dialogLabel}>Outcome</h4>
            <p>{project.outcome}</p>
          </div>

          {project.link && (
            <a className="button button-primary" href={project.link.href} target="_blank" rel="noopener noreferrer">
              {project.link.label}
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}
