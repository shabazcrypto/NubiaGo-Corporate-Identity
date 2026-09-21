# NubiaGo Corporate Identity Kit

Living brand system for NubiaGo — browse templates, update company details, download production-ready files, and inspect components in Storybook.

## Live site

https://shabazcrypto.github.io/NubiaGo-Corporate-Identity/

Every artboard has **PNG** and/or **PDF** (or **HTML** for email signatures). Use **Brand details** to fill contact fields before downloading.

## Run locally

```bash
npm install
npm run dev          # kit app → http://localhost:5173
npm run storybook    # component workspace → http://localhost:6006
npm run build        # production build for GitHub Pages
```

## What this kit is for

1. **Browse** the full identity (brand system through assets).
2. **Update** company details via **Brand details** in the sidebar (saved in this browser).
3. **Download** high-quality files from each artboard, or zip packs from Assets.

## Download quality

| Family | Formats | Size |
| --- | --- | --- |
| A4 print (letterhead, commercial, covers, catalogue, reports) | PNG @ 300 dpi + PDF at true A4 | 2480 × 3508 px |
| Business cards | PNG @ 300 dpi + PDF 85 × 55 mm | 1004 × 650 px (bleed: 91 × 61 mm) |
| Presentation | PNG per slide + multi-page 16:9 PDF | 1280 × 720 @ 288 dpi raster |
| Social | PNG / JPG | 1200 × 627 or 1080 × 1080 |
| Logo | Outlined SVG + transparent PNG | Vector / screen |
| Email signatures | HTML only (copy or `.html` file) | — |

PNG files include a **pHYs** chunk so layout apps honour the intended DPI. PDFs are built with `pdf-lib` at exact millimetre page sizes — not the browser print dialog. Browser **Print** remains available as a preview only.

Large files download via Blob URLs so A4 PNGs/PDFs work reliably once the site is live.

Kit exports are **sRGB**. Convert to CMYK offline for offset press.

### Download packs (Assets page)

- **Logo pack** — outlined SVG (primary, black, gold, light) + transparent Primary PNG + reversed PNG
- **Icon pack** — icon sheet PNG
- **Social pack** — LinkedIn + square feed PNGs
- **QR pack** — placeholder row PNG

A4 documents download individually from their section pages.

## Storybook

Stories live under `src/**/*.stories.tsx` and use the same sizes as `src/lib/formats.ts`.

## Stack

- Vite + React + TypeScript
- Tailwind CSS (brand tokens) + shadcn/ui for kit chrome only (`--radius: 0`)
- Storybook 8
- Self-hosted Inter via `@fontsource/inter` (+ ExtraBold woff for outlined SVG)
- `html-to-image` + `pdf-lib` + `opentype.js` + `jszip`

Print artboards stay custom Tailwind layouts — shadcn is not used inside them so export pixels stay stable.

## Deploy

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy-pages.yml`.
