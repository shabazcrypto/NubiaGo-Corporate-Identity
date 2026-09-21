import * as opentype from 'opentype.js';

const WORDMARK = 'nubiago';
const TRACKING_EM = -0.035;

const TONE_HEX = {
  primary: '#1E3A5F',
  light: '#FAFAFA',
  black: '#1A1A1A',
  gold: '#C9A227'
} as const;

export type WordmarkTone = keyof typeof TONE_HEX;

let fontPromise: Promise<opentype.Font> | null = null;

function fontUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.endsWith('/') ? base : `${base}/`}fonts/Inter-ExtraBold.woff`;
}

function loadFont(): Promise<opentype.Font> {
  if (!fontPromise) {
    fontPromise = opentype.load(fontUrl());
  }
  return fontPromise;
}

export async function outlinedWordmarkSvg(
  tone: WordmarkTone = 'primary',
  fontSize = 72
): Promise<string> {
  const font = await loadFont();
  const glyphs = font.stringToGlyphs(WORDMARK);
  const tracking = TRACKING_EM * fontSize;
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
  const fill = TONE_HEX[tone];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX.toFixed(2)} ${viewY.toFixed(2)} ${viewW.toFixed(2)} ${viewH.toFixed(2)}" fill="${fill}" role="img" aria-label="nubiago">
  <title>nubiago</title>
  <path d="${d.trim()}"/>
</svg>
`;
}

export const wordmarkTones: WordmarkTone[] = ['primary', 'black', 'light', 'gold'];
