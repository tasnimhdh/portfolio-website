"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type MouseEvent } from "react";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";
import styles from "./Hero.module.scss";

const words = profile.heroRotatingWords;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const timer = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % words.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const fadeUp = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const goTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToId(id);
  };

  return (
    <section id="top" className={styles.hero} tabIndex={-1} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <motion.p className={styles.eyebrow} {...fadeUp(0)}>
            {profile.heroEyebrow}
          </motion.p>

          <motion.h1 id="hero-title" className={styles.title} {...fadeUp(0.1)}>
            <span className="visually-hidden">
              {profile.heroTitleStart} {words.join(", ")} {profile.heroTitleEnd}
            </span>
            <span aria-hidden="true">
              {profile.heroTitleStart}
              <span className={styles.wordWindow}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={words[wordIndex]}
                    className={styles.word}
                    initial={{ opacity: 0, y: "0.4em" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-0.4em" }}
                    transition={{ duration: 0.35 }}
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {profile.heroTitleEnd}
            </span>
          </motion.h1>

          <motion.p className={styles.lead} {...fadeUp(0.2)}>
            {profile.heroLead}
          </motion.p>

          <motion.div className={styles.ctas} {...fadeUp(0.3)}>
            <a href="#work" className="button button-primary" onClick={(event) => goTo(event, "work")}>
              See my work
            </a>
            <a href="#contact" className="button button-secondary" onClick={(event) => goTo(event, "contact")}>
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.aside className={styles.card} aria-label="Profile summary" {...fadeUp(0.4)}>
          <div className={styles.cardTop}>
            <span className={styles.avatar} aria-hidden="true">
              {profile.initials}
            </span>
            <div className={styles.cardName}>
              <p className={styles.name}>{profile.name}</p>
              <p className={styles.meta}>
                {profile.pronouns} · {profile.location}
              </p>
            </div>
          </div>
          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt>Role</dt>
              <dd>{profile.role}</dd>
            </div>
            <div className={styles.fact}>
              <dt>Company</dt>
              <dd>
                {profile.companyRole}, {profile.company}
              </dd>
            </div>
          </dl>
          <ul className={styles.chips} aria-label="Focus areas">
            {profile.heroChips.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        </motion.aside>
      </div>
    </section>
  );
}
