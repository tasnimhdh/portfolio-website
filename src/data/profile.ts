// All site content lives in this file. Edit the values below to update the website.
// Anything that starts with "Add" or uses example.com is a placeholder: replace it with real details.

export type NavItem = { id: string; label: string };

export type Brand = { name: string; domain: string; stores: string; url: string; ukUrl?: string };

export type ProjectCategory = "Product pages" | "Landers" | "Storefronts" | "Campaigns" | "Performance";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  brands: string[];
  summary: string;
  details: string[];
  stack: string[];
  outcome: string;
  link: { label: string; href: string } | null;
};

export type SkillTile = {
  id: string;
  title: string;
  description: string;
  items: string[];
  size: "large" | "wide" | "small";
  snippet?: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  organisation: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Testimonial = { quote: string; name: string; role: string };

export const profile = {
  name: "Tasnim Islam",
  pronouns: "she/her",
  initials: "TI",
  location: "Dhaka, Bangladesh",
  role: "Senior Shopify Online Store 2.0 theme developer",
  company: "Tasnim Tech Venture",
  companyRole: "Owner and Managing Director",
  heroEyebrow: "Senior Shopify OS 2.0 theme developer",
  heroTitleStart: "I build Shopify",
  heroRotatingWords: ["product pages", "landers", "storefronts", "campaigns"],
  heroTitleEnd: "that are fast and ready to sell.",
  heroLead:
    "I'm Tasnim, a Shopify theme developer based in Dhaka and the owner of Tasnim Tech Venture. I turn Figma designs into Online Store 2.0 themes, CRO landing pages and product pages for brands selling in the US and UK.",
  heroChips: ["Online Store 2.0", "Figma to code", "US + UK multi-store"],
  about:
    "I work in Liquid, JSON templates and section/block schema, so merchants can edit what I build from the theme editor. Alongside client theme work, I run Tasnim Tech Venture as its Owner and Managing Director.",
  email: "you@example.com",
  availability: "Add your availability, for example: open to new Shopify projects",
  socials: [
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" },
  ],
  resumeUrl: "",
};

export const navItems: NavItem[] = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const brands: Brand[] = [
  { name: "ForChics", domain: "forchics.com", stores: "US and UK", url: "https://forchics.com", ukUrl: "https://www.forchics.co.uk" },
  { name: "Quia Beauty", domain: "quiabeauty.com", stores: "US and UK", url: "https://quiabeauty.com", ukUrl: "https://www.quiabeauty.co.uk" },
  { name: "LiftLab", domain: "liftlabskin.co", stores: "", url: "https://liftlabskin.co" },
  { name: "That Hair", domain: "that-hair.com", stores: "HDH", url: "https://that-hair.com" },
  { name: "Elire Skincare", domain: "elireskincare.com", stores: "HDH", url: "https://elireskincare.com" },
  { name: "Bleame", domain: "bleame.com", stores: "HDH", url: "https://bleame.com" },
  { name: "Remi", domain: "heyremi.co", stores: "HDH", url: "https://heyremi.co" },
  { name: "YouZu", domain: "youzuskin.com", stores: "HDH", url: "https://youzuskin.com" },
];

export const projects: Project[] = [
  {
    id: "cro-product-pages",
    title: "CRO product pages",
    category: "Product pages",
    brands: ["ForChics", "Quia Beauty", "LiftLab"],
    summary: "Conversion-focused product detail pages built as editable Online Store 2.0 sections.",
    details: [
      "Product templates built from Figma designs with Liquid, JSON templates and section/block schema.",
      "Reviews, subscriptions and upsells connected through Loox, Recharge and One Click Upsell.",
    ],
    stack: ["Liquid", "JSON templates", "CSS/Sass", "Vanilla JS"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "advertorial-listicle-landers",
    title: "Advertorial and listicle landers",
    category: "Landers",
    brands: ["ForChics", "Quia Beauty"],
    summary: "Long-form advertorial and listicle landing pages for paid traffic.",
    details: [
      "Landing pages built from Figma designs as reusable, schema-driven sections.",
      "Built and replicated across the US and UK stores.",
    ],
    stack: ["Liquid", "Section schema", "CSS/Sass", "Figma"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "spanish-storefront",
    title: "Spanish-language storefront",
    category: "Storefronts",
    brands: ["Add brand"],
    summary: "A Spanish-language storefront with translated product pages and content.",
    details: ["Add a short description of the storefront and your role."],
    stack: ["Shopify OS 2.0", "Liquid", "JSON templates"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "four-store-sale",
    title: "Sale campaign across four stores",
    category: "Campaigns",
    brands: ["Add brands"],
    summary: "One sale campaign rolled out consistently across four Shopify stores.",
    details: [
      "Campaign theme changes replicated across US and UK stores.",
      "Add the details of the campaign and what you built.",
    ],
    stack: ["Shopify CLI", "Git/GitHub", "Liquid"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "multi-store-replication",
    title: "US/UK multi-store theme replication",
    category: "Storefronts",
    brands: ["ForChics", "Quia Beauty"],
    summary: "Keeping US and UK storefronts in step by replicating theme work between stores.",
    details: [
      "Theme sections, templates and pages replicated between US and UK stores.",
      "Changes managed with Shopify CLI and Git/GitHub.",
    ],
    stack: ["Shopify CLI", "Git/GitHub", "JSON templates"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "hdh-brand-themes",
    title: "Shopify themes for HDH brands",
    category: "Storefronts",
    brands: ["That Hair", "Elire Skincare", "Bleame", "Remi", "YouZu"],
    summary: "Shopify theme development for HDH brands.",
    details: ["Add what you built for each brand."],
    stack: ["Shopify OS 2.0", "Liquid", "JSON templates"],
    outcome: "Add an outcome you can share",
    link: null,
  },
  {
    id: "page-performance",
    title: "Page performance work",
    category: "Performance",
    brands: ["Add brands"],
    summary: "Speed work on landing and product pages.",
    details: ["Add what you optimised and how."],
    stack: ["Liquid", "CSS/Sass", "Vanilla JS"],
    outcome: "Add a measured result you can share",
    link: null,
  },
];

export const skillTiles: SkillTile[] = [
  {
    id: "os2",
    title: "Shopify Online Store 2.0",
    description: "Themes merchants can edit from the theme editor.",
    items: ["Liquid", "JSON templates", "Section/block schema", "Shopify CLI"],
    size: "large",
    snippet: `{% schema %}
{
  "name": "Product hero",
  "blocks": [
    { "type": "headline" },
    { "type": "price" },
    { "type": "buy_buttons" }
  ],
  "presets": [{ "name": "Product hero" }]
}
{% endschema %}`,
  },
  {
    id: "cro",
    title: "CRO landing pages and PDPs",
    description: "Product pages and landers built to convert.",
    items: ["Product pages", "Advertorials", "Listicles"],
    size: "small",
  },
  {
    id: "multi-store",
    title: "US/UK multi-store",
    description: "Theme work replicated across regional stores.",
    items: ["US stores", "UK stores"],
    size: "small",
  },
  {
    id: "frontend",
    title: "Front-end",
    description: "Clean, readable code from the browser up.",
    items: ["Vanilla JS", "CSS/Sass", "React", "Next.js"],
    size: "wide",
  },
  {
    id: "figma",
    title: "Figma to code",
    description: "Designs turned into faithful, responsive sections.",
    items: ["Figma"],
    size: "small",
  },
  {
    id: "apps",
    title: "App integrations",
    description: "Shopify apps wired into custom themes.",
    items: ["Loox", "Recharge", "One Click Upsell", "PageFly"],
    size: "small",
  },
  {
    id: "workflow",
    title: "Workflow",
    description: "Version-controlled theme development.",
    items: ["Git/GitHub", "Shopify CLI"],
    size: "wide",
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "ttv",
    role: "Owner and Managing Director",
    organisation: "Tasnim Tech Venture",
    period: "Add dates",
    summary: "Running Tasnim Tech Venture.",
    highlights: ["Add a highlight"],
  },
  {
    id: "shopify-dev",
    role: "Senior Shopify OS 2.0 theme developer",
    organisation: "ForChics, Quia Beauty, LiftLab and HDH brands",
    period: "Add dates",
    summary: "Theme development, CRO pages and multi-store work for ForChics (US and UK), Quia Beauty (US and UK), LiftLab, and the HDH brands That Hair, Elire Skincare, Bleame, Remi and YouZu.",
    highlights: [
      "CRO product pages, advertorial and listicle landers",
      "A Spanish-language storefront",
      "A sale campaign rolled out across four stores",
      "Page performance work",
    ],
  },
];

export const testimonials: Testimonial[] = [
  { quote: "Add testimonial", name: "Add name", role: "Add role and company" },
];
