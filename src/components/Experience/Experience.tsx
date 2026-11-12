import { experience } from "@/data/profile";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Experience.module.scss";

export default function Experience() {
  return (
    <section id="experience" className="section" tabIndex={-1} aria-labelledby="experience-title">
      <div className={`container ${styles.layout}`}>
        <Reveal className={`section-header ${styles.header}`}>
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title" className="section-title">
            Where I&apos;ve been building.
          </h2>
        </Reveal>

        <ol className={styles.timeline}>
          {experience.map((item, index) => (
            <li key={item.id} className={styles.entry}>
              <span className={styles.marker} aria-hidden="true" />
              <Reveal className={styles.content} delay={index * 0.08}>
                <p className={styles.period}>{item.period}</p>
                <h3 className={styles.role}>{item.role}</h3>
                <p className={styles.organisation}>{item.organisation}</p>
                <p className={styles.summary}>{item.summary}</p>
                {item.highlights.length > 0 && (
                  <ul className={styles.highlights}>
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
