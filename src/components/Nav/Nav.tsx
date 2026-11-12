"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navItems, profile } from "@/data/profile";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToId } from "@/lib/scroll";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.scss";

export default function Nav() {
  const activeId = useScrollSpy(navItems.map((item) => item.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 834) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToId(id);
  };

  const links = (variant: "desktop" | "mobile") =>
    navItems.map((item) => (
      <li key={item.id}>
        <a
          href={`#${item.id}`}
          className={variant === "desktop" ? styles.link : styles.mobileLink}
          aria-current={activeId === item.id ? "true" : undefined}
          onClick={(event) => handleNavClick(event, item.id)}
        >
          {item.label}
        </a>
      </li>
    ));

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main">
        <a href="#top" className={styles.brand} onClick={(event) => handleNavClick(event, "top")}>
          <span className={styles.monogram} aria-hidden="true">
            {profile.initials}
          </span>
          <span>{profile.name}</span>
        </a>

        <ul className={styles.links}>{links("desktop")}</ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <a href="#contact" className={styles.cta} onClick={(event) => handleNavClick(event, "contact")}>
            Let&apos;s talk
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </g>
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className={styles.mobileMenu}
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ul className={styles.mobileList}>{links("mobile")}</ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
