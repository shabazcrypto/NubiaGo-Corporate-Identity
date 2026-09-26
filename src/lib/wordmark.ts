import * as opentype from 'opentype.js';
import ashbakWoffUrl from '@fontsource/inter-tight/files/inter-tight-latin-500-normal.woff?url';
import { brandWordmark, readStoredBrand, type BrandId } from '@/lib/brandMeta';
import { WORDMARK_FILLS, WORDMARK_PATH, WORDMARK_VIEW } from '@/lib/wordmarkPath';
import { NUBIAGO_ICON } from '@/components/brand/NubiaGoIcon';

export type WordmarkTone = 'primary' | 'light' | 'black' | 'gold';

const TONE_HEX_NUBIAGO = {
  primary: '#1E3A5F',
  light: '#FAFAFA',
  black: '#1A1A1A',
  gold: '#C9A227'
} as const;

const TONE_HEX_ASHBAK = {
  primary: '#000000',
  light: '#FFFFFF',
  black: '#1A1A1A',
  gold: '#FFFFFF'
} as const;

let ashbakFontPromise: Promise<opentype.Font> | null = null;

function loadAshbakFont(): Promise<opentype.Font> {
  if (!ashbakFontPromise) {
    ashbakFontPromise = opentype.load(ashbakWoffUrl);
  }
  return ashbakFontPromise;
}

async function outlineFromFont(
  text: string,
  fill: string,
  fontSize: number,
  trackingEm: number
): Promise<string> {
  const font = await loadAshbakFont();
  const glyphs = font.stringToGlyphs(text);
  const tracking = trackingEm * fontSize;
  let x = 0;
  let d = '';
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const glyph of glyphs) {
    const path = glyph.getPath(x, 0, fontSize);
    d += `${path.toPathData(2)} `;
    const box = path.getBoundingBox();
    minX = Math.min(minX, box.x1);
    minY = Math.min(minY, box.y1);
    maxX = Math.max(maxX, box.x2);
    maxY = Math.max(maxY, box.y2);
    x += ((glyph.advanceWidth ?? 0) / font.unitsPerEm) * fontSize + tracking;
  }

  const pad = Math.max(2, fontSize * 0.08);
  const viewX = minX - pad;
  const viewY = minY - pad;
  const viewW = maxX - minX + pad * 2;
  const viewH = maxY - minY + pad * 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX.toFixed(2)} ${viewY.toFixed(2)} ${viewW.toFixed(2)} ${viewH.toFixed(2)}" fill="${fill}" role="img" aria-label="${text}">
  <title>${text}</title>
  <path d="${d.trim()}"/>
</svg>
`;
}

function nubiaGoOutlinedSvg(tone: WordmarkTone): string {
  const fill = TONE_HEX_NUBIAGO[tone] ?? WORDMARK_FILLS[tone] ?? WORDMARK_FILLS.primary;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEW.x} ${WORDMARK_VIEW.y} ${WORDMARK_VIEW.w} ${WORDMARK_VIEW.h}" fill="${fill}" role="img" aria-label="nubiago">
  <title>nubiago</title>
  <path d="${WORDMARK_PATH}"/>
</svg>
`;
}

/**
 * Outlined wordmark SVG for download (no React hooks — safe from click handlers).
 * NubiaGo uses the pre-generated path; AshBak outlines Inter Tight 500 at runtime.
 */
export async function outlinedWordmarkSvg(
  tone: WordmarkTone = 'primary',
  fontSize = 72,
  brand?: BrandId
): Promise<string> {
  const resolved = brand ?? (typeof window !== 'undefined' ? readStoredBrand() : 'nubiago');
  const word = brandWordmark(resolved);
  if (resolved === 'nubiago') {
    return nubiaGoOutlinedSvg(tone);
  }
  const fill = TONE_HEX_ASHBAK[tone];
  return outlineFromFont(word, fill, fontSize, -0.02);
}

/** Official NubiaGo icon mark (glyph only) as standalone SVG. */
export function outlinedIconMarkSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1104 1104" fill="none" role="img" aria-label="NubiaGo">
  <title>NubiaGo icon mark</title>
  <circle cx="310" cy="200" r="85" fill="${NUBIAGO_ICON.gold}"/>
  <path d="M220 330 L220 880 L380 880 L380 600 C380 500 440 410 580 410 C720 410 760 500 760 600 L760 880 L920 880 L920 540 C920 360 820 240 620 240 C520 240 440 290 380 370 L380 330 L220 330 Z" fill="${NUBIAGO_ICON.markGlyph}"/>
</svg>
`;
}

/** Official NubiaGo app icon tile as standalone SVG. */
export function outlinedIconAppSvg(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1104 1104" fill="none" role="img" aria-label="NubiaGo">
  <title>NubiaGo app icon</title>
  <defs>
    <linearGradient id="ng-app-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${NUBIAGO_ICON.blueStart}"/>
      <stop offset="100%" stop-color="${NUBIAGO_ICON.blueEnd}"/>
    </linearGradient>
  </defs>
  <rect width="1104" height="1104" fill="url(#ng-app-bg)"/>
  <circle cx="310" cy="200" r="85" fill="${NUBIAGO_ICON.gold}"/>
  <path d="M220 330 L220 880 L380 880 L380 600 C380 500 440 410 580 410 C720 410 760 500 760 600 L760 880 L920 880 L920 540 C920 360 820 240 620 240 C520 240 440 290 380 370 L380 330 L220 330 Z" fill="${NUBIAGO_ICON.glyph}"/>
</svg>
`;
}

export const wordmarkTones: WordmarkTone[] = ['primary', 'black', 'light', 'gold'];
