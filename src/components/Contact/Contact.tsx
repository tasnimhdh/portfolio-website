import { profile } from "@/data/profile";
import Reveal from "@/components/Reveal/Reveal";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section id="contact" className="section section-alt" tabIndex={-1} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.intro}>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">
            Have a Shopify project in mind?
          </h2>
          <p className="section-lead">Tell me about your store and what you need. {profile.availability}.</p>
          <a className={styles.email} href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>
        <div className={styles.panel}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
