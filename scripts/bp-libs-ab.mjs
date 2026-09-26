import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('artifacts/business-plan-ab', { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.addInitScript(() => {
  localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
});
await page.goto('http://127.0.0.1:5173/business-plan', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForSelector('[data-bp-page]');
await page.waitForTimeout(800);

const results = await page.evaluate(async () => {
  const node = document.querySelector('[data-bp-page]');
  const { formats } = await import('/src/lib/formats.ts');
  const spec = formats.a4;
  const scale = spec.exportWidth / spec.width;
  if (document.fonts?.ready) await document.fonts.ready;

  function score(canvas, name) {
    const ctx = canvas.getContext('2d');
    // body text region — small type is the blur complaint
    const sx = Math.floor(canvas.width * 0.08);
    const sy = Math.floor(canvas.height * 0.52);
    const sw = Math.floor(canvas.width * 0.7);
    const sh = Math.floor(canvas.height * 0.1);
    const { data } = ctx.getImageData(sx, sy, sw, sh);
    let edge = 0;
    let n = 0;
    for (let y = 1; y < sh - 1; y++) {
      for (let x = 1; x < sw - 1; x++) {
        const i = (y * sw + x) * 4;
        const g = data[i];
        edge += Math.abs(g - data[i + 4]) + Math.abs(g - data[((y + 1) * sw + x) * 4]);
        n += 1;
      }
    }
    // crop for visual
    const crop = document.createElement('canvas');
    crop.width = Math.min(1200, sw);
    crop.height = sh;
    crop.getContext('2d').drawImage(canvas, sx, sy, crop.width, sh, 0, 0, crop.width, sh);
    return {
      name,
      w: canvas.width,
      h: canvas.height,
      bodyEdge: edge / n,
      full: canvas.toDataURL('image/png'),
      crop: crop.toDataURL('image/png')
    };
  }

  const out = [];

  // modern-screenshot
  try {
    const { domToCanvas } = await import('/node_modules/modern-screenshot/es/index.js');
    const c = await domToCanvas(node, {
      scale,
      width: spec.width,
      height: spec.height,
      backgroundColor: '#ffffff',
      font: true
    });
    out.push(score(c, 'modern-screenshot'));
  } catch (e) {
    out.push({ name: 'modern-screenshot', error: String(e) });
  }

  // html2canvas without FO
  try {
    const html2canvas = (await import('/node_modules/html2canvas/dist/html2canvas.esm.js')).default;
    const c = await html2canvas(node, {
      scale,
      useCORS: true,
      backgroundColor: '#000000',
      logging: false,
      foreignObjectRendering: false,
      width: spec.width,
      height: spec.height
    });
    out.push(score(c, 'html2canvas-no-fo'));
  } catch (e) {
    out.push({ name: 'html2canvas-no-fo', error: String(e) });
  }

  // Playwright-like: draw via temporary SVG is baseline FO
  try {
    const { toCanvas } = await import('/node_modules/html-to-image/es/index.js');
    const c = await toCanvas(node, {
      pixelRatio: scale,
      width: spec.width,
      height: spec.height,
      skipAutoScale: true,
      backgroundColor: '#ffffff'
    });
    out.push(score(c, 'html-to-image-dpr'));
  } catch (e) {
    out.push({ name: 'html-to-image-dpr', error: String(e) });
  }

  return out;
});

for (const r of results) {
  if (r.error) {
    console.log(r.name, 'ERROR', r.error);
    continue;
  }
  const bytes = Buffer.from(r.full.split(',')[1], 'base64');
  writeFileSync(`artifacts/business-plan-ab/${r.name}.png`, bytes);
  writeFileSync(
    `artifacts/business-plan-ab/${r.name}-body.png`,
    Buffer.from(r.crop.split(',')[1], 'base64')
  );
  console.log(
    JSON.stringify({
      name: r.name,
      bodyEdge: Number(r.bodyEdge.toFixed(3)),
      size: `${r.w}x${r.h}`,
      kb: Number((bytes.length / 1024).toFixed(1))
    })
  );
}
await browser.close();
