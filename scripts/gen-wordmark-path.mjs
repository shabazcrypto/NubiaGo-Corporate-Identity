import opentypePkg from 'opentype.js';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const opentype = opentypePkg.default ?? opentypePkg;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const buf = readFileSync(join(root, 'public/fonts/Inter-ExtraBold.woff'));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const WORDMARK = 'nubiago';
const fontSize = 72;
const TRACKING_EM = -0.035;
const tones = {
  primary: '#1E3A5F',
  black: '#1A1A1A',
  light: '#FAFAFA',
  gold: '#C9A227'
};

const chars = WORDMARK.split('');
const tracking = TRACKING_EM * fontSize;
let x = 0;
let d = '';
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

for (const char of chars) {
  const glyph = font.charToGlyph(char);
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
const pathD = d.trim();

const outDir = join(root, 'src/lib');
mkdirSync(outDir, { recursive: true });

const ts = `/** Auto-generated outlined wordmark for email HTML. Do not edit by hand. */
export const WORDMARK_VIEW = {
  x: ${viewX.toFixed(2)},
  y: ${viewY.toFixed(2)},
  w: ${viewW.toFixed(2)},
  h: ${viewH.toFixed(2)}
} as const;

export const WORDMARK_PATH = ${JSON.stringify(pathD)};

export const WORDMARK_FILLS = ${JSON.stringify(tones, null, 2)} as const;
`;

writeFileSync(join(outDir, 'wordmarkPath.ts'), ts);
console.log('Wrote src/lib/wordmarkPath.ts', { viewW, viewH, pathLen: pathD.length });
