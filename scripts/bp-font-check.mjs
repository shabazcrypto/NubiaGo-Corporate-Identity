import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('artifacts/business-plan-ab', { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
});
await page.goto('http://127.0.0.1:5173/business-plan', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForSelector('[data-bp-page]');
await page.waitForTimeout(500);

const out = await page.evaluate(async () => {
  const node = document.querySelector('[data-bp-page]');
  const { getFontEmbedCSS, toCanvas } = await import('/node_modules/html-to-image/es/index.js');
  const { formats } = await import('/src/lib/formats.ts');
  const spec = formats.a4;
  const scale = spec.exportWidth / spec.width;
  if (document.fonts?.ready) await document.fonts.ready;

  const css = await getFontEmbedCSS(node, { preferredFontFormat: 'woff2' });
  const faces = [...document.fonts]
    .filter((f) => /inter/i.test(f.family))
    .map((f) => ({ family: f.family, weight: String(f.weight), status: f.status }));

  const family = 'Inter Tight';
  const c = document.createElement('canvas');
  c.width = 1000;
  c.height = 520;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1000, 520);
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'top';
  ctx.font = `600 ${Math.round(11 * scale)}px "${family}"`;
  ctx.fillText('MASTER BUSINESS PLAN 2026', 40, 80);
  ctx.font = `700 ${Math.round(80 * scale)}px "${family}"`;
  ctx.fillText('2026', 40, 160);
  ctx.font = `400 ${Math.round(12.5 * scale)}px "${family}"`;
  ctx.fillText('Initial operating businesses: NubiaGo and Bagster.', 40, 420);

  // edge of control
  const { data } = ctx.getImageData(40, 160, 700, 280);
  let edge = 0;
  let n = 0;
  const w = 700;
  const h = 280;
  for (let y = 1; y < h - 1; y += 2) {
    for (let x = 1; x < w - 1; x += 2) {
      const i = (y * w + x) * 4;
      const g = data[i];
      edge += Math.abs(g - data[i + 4]) + Math.abs(g - data[((y + 1) * w + x) * 4]);
      n += 1;
    }
  }

  const canvas = await toCanvas(node, {
    pixelRatio: 1,
    skipAutoScale: true,
    width: spec.exportWidth,
    height: spec.exportHeight,
    fontEmbedCSS: css,
    backgroundColor: '#000000',
    style: {
      zoom: String(scale),
      width: `${spec.width}px`,
      height: `${spec.height}px`,
      transform: 'none'
    }
  });

  return {
    fontCssLen: css.length,
    fontCssHasInter: /Inter Tight/i.test(css),
    fontCssHasData: /data:/.test(css),
    fontCssSnippet: css.slice(0, 300),
    faces,
    controlEdge: edge / n,
    control: c.toDataURL('image/png'),
    captureW: canvas.width,
    captureH: canvas.height
  };
});

writeFileSync(
  'artifacts/business-plan-ab/control-canvas-text.png',
  Buffer.from(out.control.split(',')[1], 'base64')
);
console.log(
  JSON.stringify(
    {
      fontCssLen: out.fontCssLen,
      fontCssHasInter: out.fontCssHasInter,
      fontCssHasData: out.fontCssHasData,
      fontCssSnippet: out.fontCssSnippet,
      faces: out.faces,
      controlEdge: out.controlEdge,
      capture: `${out.captureW}x${out.captureH}`
    },
    null,
    2
  )
);
await browser.close();
