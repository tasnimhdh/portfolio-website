# Tasnim Islam · Portfolio

A one-page portfolio built with Next.js (App Router), React, TypeScript and Sass, using an Apple-inspired design.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## Edit the content

All text, brands, projects, skills and experience live in **`src/data/profile.ts`**. You don't need to touch any component.

- `profile`: name, role, hero text, email, social links and availability.
- `navItems`: the menu links (each `id` matches a section id).
- `brands`: the brand strip. Every brand needs a `url`. Add `ukUrl` to show a "UK store" link.
- `projects`: case-study cards and the detail modal. The filter buttons come from each project's `category`. Set `link` to `{ label, href }` to show a button in the modal.
- `skillTiles`: the bento grid. `size` can be `"large"`, `"wide"` or `"small"`, and `snippet` is optional code shown on a tile.
- `experience`: the timeline.
- `testimonials`: the section stays hidden until a quote no longer starts with "Add".

Anything that starts with **"Add …"**, plus `you@example.com` and the `your-username` / `your-profile` social links, is a placeholder. Replace it with real details before you publish.

## Wire up the contact form

The form validates in the browser and shows a success message. It doesn't send anything yet. To connect it, edit `submitContact` in `src/lib/submitContact.ts`: post to a Next.js route handler, Formspree, Resend or similar, and throw an error if sending fails so the form shows its error state.

## Design tokens

Colours (light and dark), fonts, type sizes, spacing, radii and breakpoints are all in `src/styles/_tokens.scss`. `src/styles/globals.scss` turns them into CSS custom properties. Each component has its own `*.module.scss` file next to it.

The theme toggle saves the choice in `localStorage` (`tasnim-theme`). On a first visit the site follows the system setting.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new, import the repository and keep the default settings (Framework: Next.js, Build command: `next build`).
3. Click **Deploy**. Every push to the main branch redeploys the site automatically.

You can also deploy from the terminal with `npx vercel` and then `npx vercel --prod`.

## Structure

```
src/
  app/            layout.tsx (fonts, theme script), page.tsx (sections)
  components/     one folder per section: Nav, Hero, BrandStrip, Projects, Skills, Experience, Testimonials, Contact, Footer, BackToTop, Reveal
  data/profile.ts all site content
  hooks/          useScrollSpy, useTheme
  lib/            scroll helper, theme init script, submitContact
  styles/         _tokens.scss, globals.scss
```
