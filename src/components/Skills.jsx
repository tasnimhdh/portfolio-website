import { skillGroups } from "@/data/profile";
import CodeEditor from "@/components/CodeEditor";
import SectionHeading from "@/components/SectionHeading";
import Icon from "@/components/svg/Icon";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5">
        <SectionHeading eyebrow="Skills" title="The stack behind the storefronts." id="skills-title">
          From Liquid and section schema to React and Next.js.
        </SectionHeading>

        <div className="spotlight rounded-lg border border-line bg-surface p-4 sm:p-5">
          <p className="mb-4 text-sm text-muted">Example Online Store 2.0 files for a product hero section.</p>
          <CodeEditor label="Skills theme files" />
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <li key={group.id} className="spotlight flex flex-col gap-4 rounded-lg border border-line bg-surface p-5">
              <h3 className="flex items-center gap-2 text-base font-semibold text-ink">
                <Icon name={group.icon} className="h-4 w-4 text-accent" />
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2" aria-label={group.title}>
                {group.items.map((item) => (
                  <li key={item.name}>
                    <span className="group inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-2.5 py-1 text-sm text-zinc-200">
                      <Icon name={item.icon} className="h-3.5 w-3.5 text-accent" />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
