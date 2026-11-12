import { brands } from "@/data/profile";
import styles from "./BrandStrip.module.scss";

const newTab = <span className="visually-hidden"> (opens in a new tab)</span>;

export default function BrandStrip() {
  return (
    <section className={styles.strip} aria-labelledby="brands-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="brands-title" className={styles.title}>
          Brands I&apos;ve built for
        </h2>
        <ul className={styles.list}>
          {brands.map((brand) => (
            <li key={brand.name} className={styles.item}>
              <a className={styles.brand} href={brand.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.name}>{brand.name}</span>
                <span className={styles.domain}>
                  {[brand.domain, brand.stores].filter(Boolean).join(" · ")}
                  {newTab}
                </span>
              </a>
              {brand.ukUrl && (
                <a className={styles.uk} href={brand.ukUrl} target="_blank" rel="noopener noreferrer">
                  UK store
                  <span className="visually-hidden">: {brand.name} UK</span>
                  {newTab}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
