import { brands, profile, projects } from "@/data/profile";
import CountUp from "@/components/CountUp";
import SectionHeading from "@/components/SectionHeading";

const brandCount = new Set(brands.map((brand) => brand.name)).size;

export default function About() {
  return (
    <section id="about" className="holo scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="About" title="Theme work merchants can edit." id="about-title" />
        <div className="flex max-w-3xl flex-col gap-6">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-zinc-300">
              {paragraph}
            </p>
          ))}
          <div className="count-row">
            <CountUp value={brandCount} label="Brands" />
            <CountUp value={projects.length} label="Case studies" />
            <CountUp value={brands.length} label="Homepages" />
          </div>
        </div>
      </div>
    </section>
  );
}
