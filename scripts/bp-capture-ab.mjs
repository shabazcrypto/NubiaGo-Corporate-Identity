/**
 * A/B capture sharpness for Business Plan cover.
 * Methods: transform-scale (old), zoom (new), pixelRatio.
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'artifacts', 'business-plan-ab');
const BASE = process.env.BP_BASE || 'http://127.0.0.1:5173';
mkdirSync(outDir, { recursive: true });

function pngSize(bytes) {
  const w = (bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19];
  const h = (bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | bytes[23];
  return { w, h };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
  });
  await page.goto(`${BASE}/business-plan`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('[data-bp-page]', { timeout: 30000 });
  await page.waitForTimeout(1000);

  const results = await page.evaluate(async () => {
    const node = document.querySelector('[data-bp-page]');
    if (!node) throw new Error('no page');
    const { toCanvas, getFontEmbedCSS } = await import('/node_modules/html-to-image/es/index.js');
    const { formats } = await import('/src/lib/formats.ts');
    const spec = formats.a4;
    const scale = spec.exportWidth / spec.width;

    if (document.fonts?.ready) await document.fonts.ready;
    let fontEmbedCSS = '';
    try {
      fontEmbedCSS = await getFontEmbedCSS(node, { preferredFontFormat: 'woff2' });
    } catch {}

    const filter = (n) => !n.classList?.contains('print:hidden');

    async function capture(name, options) {
      const canvas = await toCanvas(node, options);
      // Edge energy on a crop around the giant "2026" (center-left of cover)
      const ctx = canvas.getContext('2d');
      const sx = Math.floor(canvas.width * 0.08);
      const sy = Math.floor(canvas.height * 0.38);
      const sw = Math.floor(canvas.width * 0.55);
      const sh = Math.floor(canvas.height * 0.18);
      const { data } = ctx.getImageData(sx, sy, sw, sh);
      let edge = 0;
      for (let y = 1; y < sh - 1; y += 2) {
        for (let x = 1; x < sw - 1; x += 2) {
          const i = (y * sw + x) * 4;
          const g = data[i];
          const gx = Math.abs(g - data[i + 4]);
          const gy = Math.abs(g - data[((y + 1) * sw + x) * 4]);
          edge += gx + gy;
        }
      }
      const samples = Math.floor(((sw - 2) / 2) * ((sh - 2) / 2));
      const dataUrl = canvas.toDataURL('image/png');
      return {
        name,
        w: canvas.width,
        h: canvas.height,
        edgeMean: edge / samples,
        bytes: dataUrl.length,
        dataUrl
      };
    }

    const base = {
      cacheBust: true,
      skipAutoScale: true,
      fontEmbedCSS: fontEmbedCSS || undefined,
      filter,
      backgroundColor: '#ffffff'
    };

    const transform = await capture('transform', {
      ...base,
      pixelRatio: 1,
      width: spec.exportWidth,
      height: spec.exportHeight,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${spec.width}px`,
        height: `${spec.height}px`
      }
    });

    const zoom = await capture('zoom', {
      ...base,
      pixelRatio: 1,
      width: spec.exportWidth,
      height: spec.exportHeight,
      style: {
        zoom: String(scale),
        transform: 'none',
        width: `${spec.width}px`,
        height: `${spec.height}px`
      }
    });

    const dpr = await capture('pixelRatio', {
      ...base,
      pixelRatio: scale,
      width: spec.width,
      height: spec.height,
      style: {
        transform: 'none',
        width: `${spec.width}px`,
        height: `${spec.height}px`
      }
    });

    // Live-DOM zoom then capture at natural zoomed metrics
    const prevZoom = node.style.zoom;
    node.style.zoom = String(scale);
    await new Promise((r) => requestAnimationFrame(() => r()));
    const liveZoom = await capture('live-zoom', {
      ...base,
      pixelRatio: 1,
      width: spec.exportWidth,
      height: spec.exportHeight,
      style: {
        zoom: String(scale),
        transform: 'none',
        width: `${spec.width}px`,
        height: `${spec.height}px`
      }
    });
    node.style.zoom = prevZoom;

    return [transform, zoom, dpr, liveZoom];
  });

  const summary = [];
  for (const r of results) {
    const b64 = r.dataUrl.split(',')[1];
    const bytes = Buffer.from(b64, 'base64');
    const { w, h } = pngSize(bytes);
    const path = join(outDir, `${r.name}.png`);
    writeFileSync(path, bytes);
    const row = {
      name: r.name,
      edgeMean: Number(r.edgeMean.toFixed(2)),
      pngKB: Number((bytes.length / 1024).toFixed(1)),
      canvas: `${r.w}x${r.h}`,
      png: `${w}x${h}`
    };
    summary.push(row);
    console.log(JSON.stringify(row));
  }

  summary.sort((a, b) => b.edgeMean - a.edgeMean);
  writeFileSync(join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log('Winner:', summary[0].name, 'edgeMean', summary[0].edgeMean);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
