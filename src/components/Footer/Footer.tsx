import { navItems, profile } from "@/data/profile";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.about}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.muted}>
            {profile.role} · {profile.companyRole}, {profile.company} · {profile.location}
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.muted}>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Sass.
        </p>
      </div>
    </footer>
  );
}
