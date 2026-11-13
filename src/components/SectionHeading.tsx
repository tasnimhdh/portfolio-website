import SectionRule from "@/components/svg/SectionRule";

export default function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: string;
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="gsap-line mb-10 flex max-w-2xl flex-col gap-4">
      <p className="text-sm font-medium tracking-wide text-accent">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      <SectionRule />
      {children ? <div className="text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}
