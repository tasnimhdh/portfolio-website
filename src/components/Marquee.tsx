import { brands } from "@/data/profile";

const tech = [
  "TypeScript",
  "Next.js",
  "Python",
  "Django",
  "Liquid",
  "Tailwind",
  "Shopify OS 2.0",
  "JavaScript",
  "CSS",
  "HTML",
  "JSON",
];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className={reverse ? "marquee-track is-reverse" : "marquee-track"}>
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const names = brands.map((brand) => (brand.market ? `${brand.name} ${brand.market}` : brand.name));
  return (
    <section className="border-y border-white/10 py-6" aria-label="Brands and stack">
      <p className="sr-only">{names.join(", ")}. Stack: {tech.join(", ")}.</p>
      <Row items={names} />
      <div className="h-3" />
      <Row items={tech} reverse />
    </section>
  );
}
