// All site copy lives here. Anything marked placeholder: true, or starting with "Add ",
// still needs a real value. Do not invent metrics, dates, testimonials or employers.

export const profile = {
  name: "Tasnim Islam",
  pronouns: "she/her",
  location: "Dhaka, Bangladesh",
  role: "Senior Shopify Theme Developer",
  company: "Tasnim Tech Venture",
  companyRole: "Owner and Managing Director",
  valueStatement:
    "I build and ship CRO product pages, landers, and multi-store US/UK rollouts for 8 DTC beauty and wellness brands.",
  about: [
    "I build Shopify Online Store 2.0 themes in Liquid, JSON templates and section/block schema, with vanilla JavaScript where the storefront needs it. I turn Figma designs into CRO product pages and landing pages that merchants can edit from the theme editor. I'm based in Dhaka and run Tasnim Tech Venture as Owner and Managing Director.",
    "I write clean, readable code, and nothing goes live without verification. Performance and conversion come first: pages should load quickly and make the next step obvious.",
  ],
  email: "hello@yourdomain.com",
  emailPlaceholder: true,
  availability: "Add your availability",
  socials: [
    { label: "GitHub", href: "https://github.com/tasnimhdh", placeholder: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile", placeholder: true },
    { label: "X", href: "https://x.com/your-handle", placeholder: true },
  ],
};

export const navItems = [
  { id: "about", label: "About", icon: "about" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "skills", label: "Skills", icon: "skills" },
  { id: "lab", label: "Lab", icon: "code" },
  { id: "experience", label: "Experience", icon: "experience" },
  { id: "contact", label: "Contact", icon: "contact" },
];

export const skillGroups = [
  {
    id: "languages",
    title: "Languages",
    icon: "code",
    items: [
      { name: "Liquid", icon: "liquid" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "HTML", icon: "html" },
      { name: "CSS/Sass", icon: "css" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    items: [
      { name: "Shopify OS 2.0 themes", icon: "shopify" },
      { name: "JSON templates", icon: "json" },
      { name: "section/block schema", icon: "schema" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next" },
      { name: "Tailwind", icon: "tailwind" },
    ],
  },
  {
    id: "shopify",
    title: "Shopify & apps",
    icon: "shopify",
    items: [
      { name: "Shopify CLI", icon: "cli" },
      { name: "Admin API", icon: "api" },
      { name: "Loox", icon: "loox" },
      { name: "Recharge", icon: "recharge" },
      { name: "One Click Upsell", icon: "upsell" },
      { name: "PageFly", icon: "pagefly" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & tooling",
    icon: "git",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "PageSpeed/Lighthouse", icon: "lighthouse" },
    ],
  },
  {
    id: "ai",
    title: "AI tools",
    icon: "spark",
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "Codex", icon: "codex" },
      { name: "ChatGPT", icon: "chatgpt" },
      { name: "Cursor", icon: "cursor" },
    ],
  },
];

const shot = (id: string, name: string, market: string, domain: string, url: string) => ({
  id,
  name,
  market,
  domain,
  url,
  desktop: { src: `/brands/${id}-desktop.webp`, width: 1440, height: 900 },
  mobile: { src: `/brands/${id}-mobile.webp`, width: 390, height: 844 },
});

export const brands = [
  shot("forchics-us", "ForChics", "US", "forchics.com", "https://forchics.com"),
  shot("forchics-uk", "ForChics", "UK", "forchics.co.uk", "https://www.forchics.co.uk"),
  shot("quia-us", "Quia Beauty", "US", "quiabeauty.com", "https://quiabeauty.com"),
  shot("quia-uk", "Quia Beauty", "UK", "quiabeauty.co.uk", "https://www.quiabeauty.co.uk"),
  shot("liftlab", "LiftLab", "", "liftlabskin.co", "https://liftlabskin.co"),
  shot("that-hair", "That Hair", "HDH", "that-hair.com", "https://that-hair.com"),
  shot("elire", "Elire Skincare", "HDH", "elireskincare.com", "https://elireskincare.com"),
  shot("bleame", "Bleame", "HDH", "bleame.com", "https://bleame.com"),
  shot("remi", "Remi", "HDH", "heyremi.co", "https://heyremi.co"),
  shot("youzu", "YouZu", "HDH", "youzuskin.com", "https://youzuskin.com"),
];

export function brandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function brandLabel(brand: { name: string; market: string }) {
  return brand.market ? `${brand.name} ${brand.market}` : brand.name;
}

export const projects = [
  {
    id: "forchics",
    title: "ForChics",
    brandIds: ["forchics-us", "forchics-uk"],
    problem: "CRO product pages and advertorial landers, replicated across the US and UK stores.",
    result: "Add result",
    tech: ["Liquid", "JSON templates", "CSS/Sass", "Shopify CLI", "Loox", "Recharge", "One Click Upsell"],
  },
  {
    id: "quia",
    title: "Quia Beauty",
    brandIds: ["quia-us", "quia-uk"],
    problem: "Product pages and listicle landers for the US and UK stores, with theme work kept in step between them.",
    result: "Add result",
    tech: ["Liquid", "JSON templates", "CSS/Sass", "Shopify CLI", "Loox", "Recharge", "One Click Upsell"],
  },
  {
    id: "liftlab",
    title: "LiftLab",
    brandIds: ["liftlab"],
    problem: "Conversion-focused product detail pages built as editable Online Store 2.0 sections.",
    result: "Add result",
    tech: ["Liquid", "JSON templates", "CSS/Sass", "Vanilla JS", "Loox", "Recharge", "One Click Upsell"],
  },
  {
    id: "hdh",
    title: "HDH brand themes",
    brandIds: ["that-hair", "elire", "bleame", "remi", "youzu"],
    problem: "Shopify theme development for That Hair, Elire Skincare, Bleame, Remi and YouZu.",
    result: "Add result",
    tech: ["Shopify OS 2.0", "Liquid", "JSON templates"],
  },
];

export const experience = [
  {
    id: "ttv",
    role: "Owner and Managing Director",
    organisation: "Tasnim Tech Venture",
    period: "Add dates",
    summary: "Running Tasnim Tech Venture alongside client theme work.",
    highlights: [
      "Shipped a Spanish-language storefront with translated product pages and content.",
      "Carried out page performance work on landing and product pages.",
    ],
  },
  {
    id: "hdh",
    role: "Lead Shopify Developer",
    organisation: "HDH",
    period: "Add dates",
    summary: "Theme development, CRO pages and multi-store work.",
    highlights: [
      "Replicated theme sections, templates and pages between US and UK stores.",
      "Rolled a sale campaign out across four Shopify stores.",
    ],
  },
];

export function isPlaceholderText(value: string) {
  return typeof value === "string" && value.trim().toLowerCase().startsWith("add ");
}
