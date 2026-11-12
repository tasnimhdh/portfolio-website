import { skillTiles } from "@/data/profile";
import Reveal from "@/components/Reveal/Reveal";
import SkillCard from "./SkillCard";
import styles from "./Skills.module.scss";

export default function Skills() {
  return (
    <section id="skills" className="section section-alt" tabIndex={-1} aria-labelledby="skills-title">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">Skills</p>
          <h2 id="skills-title" className="section-title">
            Everything a Shopify storefront needs.
          </h2>
          <p className="section-lead">From Liquid and section schema to React and Next.js.</p>
        </Reveal>

        <ul className={styles.bento}>
          {skillTiles.map((tile) => (
            <SkillCard key={tile.id} tile={tile} />
          ))}
        </ul>
      </div>
    </section>
  );
}
