# Abu Bakar Yasir — Portfolio

Personal portfolio for **Abu Bakar Yasir**, Full-Stack & AI Engineer. Dark, liquid-glass aesthetic with real SVG refraction (Chromium) and a graceful `backdrop-filter` blur fallback everywhere else.

## Stack
- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens in `app/globals.css`)
- **Framer Motion** (nav pill + scroll progress) + CSS/IntersectionObserver scroll reveals
- **lucide-react** icons · fonts: Space Grotesk (display) · Inter (body) · JetBrains Mono

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & run
```bash
npm run build
npm start
```

## Edit content
All copy is data-driven — you rarely touch JSX:
- `content/profile.ts` — name, tagline, about, contact, education, experience, skills
- `content/projects.ts` — flagship case studies + open-source grid

## Project images
Drop real screenshots under `public/projects/<slug>/` and reference them in
`content/projects.ts` (`images` / `cover`). Cards with no images show an on-brand
placeholder with a "preview soon" badge. neuroMedica images are already wired.
Magnai and Lynxflow-Health are placeholders awaiting screenshots.

## Deploy
Push to GitHub and import into **Vercel** (zero-config for Next.js). Set the
production domain, then update `siteUrl` in `app/layout.tsx`, `app/sitemap.ts`,
and `app/robots.ts`.

## Notes
- `puppeteer-core` is a dev-only dependency used for local screenshot QA; safe to remove.
- Liquid-glass refraction (`.glass-refract`) only applies in Chromium; other browsers
  automatically use the frosted `.glass` blur.
