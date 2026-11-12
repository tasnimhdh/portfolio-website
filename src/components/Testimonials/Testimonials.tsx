import { testimonials } from "@/data/profile";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Testimonials.module.scss";

const isPlaceholder = (text: string) => text.trim().toLowerCase().startsWith("add ");

export default function Testimonials() {
  const real = testimonials.filter((item) => !isPlaceholder(item.quote));
  if (real.length === 0) return null;

  return (
    <section className="section section-alt" aria-labelledby="testimonials-title">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">Kind words</p>
          <h2 id="testimonials-title" className="section-title">
            What clients say.
          </h2>
        </Reveal>
        <ul className={styles.list}>
          {real.map((item) => (
            <li key={item.quote} className={styles.card}>
              <figure className={styles.figure}>
                <blockquote className={styles.quote}>“{item.quote}”</blockquote>
                <figcaption className={styles.caption}>
                  <strong>{item.name}</strong> · {item.role}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
