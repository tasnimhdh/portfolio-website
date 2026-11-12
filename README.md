# Tasnim Islam · Portfolio

A one-page portfolio for Tasnim Islam, senior Shopify theme developer. Built with Next.js (App Router), React and Tailwind CSS. Dark, minimal, and written in JavaScript.

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

All copy, brands, projects, skills and experience live in **`src/data/profile.js`**. The typing editor’s sample theme files live in **`src/data/snippets.js`**.

Placeholders are obvious. Replace them before you treat the site as final:

- Email: `hello@yourdomain.com`
- LinkedIn: `https://www.linkedin.com/in/your-profile`
- X: `https://x.com/your-handle`
- Availability: `Add your availability`
- Experience dates: `Add dates` on both roles
- Project results: `Add result` on all four case studies

GitHub is already set to https://github.com/tasnimhdh. Client themes do not have public repos, so the cards say **Private client repo**.

Do not invent metrics, testimonials, employers or dates. The eight brands are ForChics (US and UK), Quia Beauty (US and UK), LiftLab, and the HDH brands That Hair, Elire Skincare, Bleame, Remi and YouZu.

## Screenshots

`public/brands/` holds homepage captures from the live stores: a 1440×900 desktop shot and a 390×844 mobile shot for each, saved as WebP. They are shown inside the case-study frames and in the brands gallery. Retake them from the public sites if a store’s homepage changes. Do not draw fake storefronts over them.

## Contact form

The form checks name, email and message in the browser, then opens a `mailto:` draft to the address in `profile.email`. Swap that address when the real inbox is ready. There is no server route yet.

## Keyboard

- Skip link to the main content
- `Ctrl` or `Cmd` + `K` opens the command palette (sections, copy email, GitHub, live stores)
- Project and brand screenshots open in a dialog; `Escape` closes it

Animations, the typing editor and the circuit backdrop stay still when `prefers-reduced-motion` is set. The editor then shows each file in full.

## Deploy

Push to `main`. The Vercel project builds with `next build` and redeploys from that branch.

## Structure

```
src/app/            layout, page, global CSS
src/components/     sections, editor, lightbox
src/components/svg/ hand-written icons and frames
src/data/           profile.js, snippets.js
src/lib/            highlight, scroll, mailto
public/brands/      real homepage screenshots
```
