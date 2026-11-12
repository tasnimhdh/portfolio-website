import { profile } from "@/data/profile";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="About" title="Theme work merchants can edit." id="about-title" />
        <div className="flex max-w-3xl flex-col gap-6">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-zinc-300">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
