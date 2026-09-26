/**
 * Business Plan export quality smoke test.
 * Requires Vite on 127.0.0.1:5173 and playwright chromium.
 *
 * Verifies:
 * - Off-screen pack host mounts all pages
 * - Single-page PNG capture is A4 @ 300 dpi (2480×3508)
 * - Merged PDF is multi-page A4 (210×297 mm)
 */
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'artifacts', 'business-plan-export');
const BASE = process.env.BP_BASE || 'http://127.0.0.1:5173';

mkdirSync(outDir, { recursive: true });

function pngSize(bytes) {
  // IHDR: width/height at bytes 16–23 big-endian
  if (bytes.length < 24 || bytes[0] !== 0x89) throw new Error('Not a PNG');
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
  await page.waitForSelector('button:has-text("Download full PDF")', { timeout: 15000 });

  const pageCount = await page.$$eval('[data-bp-page]', (els) => els.length);
  console.log(`Pack host pages: ${pageCount}`);
  if (pageCount < 15) throw new Error(`Expected ≥15 BP pages, got ${pageCount}`);

  // Wait for fonts on off-screen host
  await page.waitForTimeout(800);

  // Capture first page PNG via page.evaluate using the app's own export pipeline
  const pngB64 = await page.evaluate(async () => {
    const node = document.querySelector('[data-bp-page]');
    if (!node) throw new Error('No BP page node');
    // Dynamic import of app module through Vite — call capture via exposed path is hard.
    // Instead use html-to-image if available on window, or fetch from artboard dimensions check.
    const { capturePngBytes } = await import('/src/utils/exportAsset.ts');
    // formats from app
    const { formats } = await import('/src/lib/formats.ts');
    const bytes = await capturePngBytes(node, formats.a4, false);
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  });

  const pngBytes = Buffer.from(pngB64, 'base64');
  const pngPath = join(outDir, 'page00-cover.png');
  writeFileSync(pngPath, pngBytes);
  const { w, h } = pngSize(pngBytes);
  console.log(`Cover PNG: ${w}×${h} (${(pngBytes.length / 1024 / 1024).toFixed(2)} MB)`);

  // A4 @ 300 dpi = round(210/25.4*300) × round(297/25.4*300) = 2480 × 3508
  if (w !== 2480 || h !== 3508) {
    throw new Error(`Expected 2480×3508 (A4@300), got ${w}×${h}`);
  }

  // Sharp text at 300dpi: dark covers stay small; interior pages should be larger.
  if (pngBytes.length < 200_000) {
    console.warn(`WARN: cover PNG only ${(pngBytes.length / 1024).toFixed(0)} KB — unexpectedly tiny`);
  } else {
    console.log(`Cover PNG size OK (${(pngBytes.length / 1024).toFixed(0)} KB)`);
  }

  // Full PDF via UI download
  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 300000 }),
    page.getByRole('button', { name: /Download full PDF/i }).click()
  ]);

  // Wait for progress to finish — download event fires when browser starts download
  const pdfPath = join(outDir, await download.suggestedFilename());
  await download.saveAs(pdfPath);
  const pdfBytes = readFileSync(pdfPath);
  console.log(`Full PDF: ${pdfPath} (${(pdfBytes.length / 1024 / 1024).toFixed(2)} MB)`);

  if (pdfBytes.length < 100_000) {
    throw new Error('PDF suspiciously small');
  }

  // Validate PDF page count + page size with pdf-lib
  const { PDFDocument } = await import('pdf-lib');
  const doc = await PDFDocument.load(pdfBytes);
  const pages = doc.getPageCount();
  console.log(`PDF page count: ${pages}`);
  if (pages !== pageCount) {
    throw new Error(`PDF pages ${pages} !== pack host ${pageCount}`);
  }
  const first = doc.getPage(0);
  const { width, height } = first.getSize();
  // A4 in points: 210mm = 595.28pt, 297mm = 841.89pt
  const expectedW = (210 / 25.4) * 72;
  const expectedH = (297 / 25.4) * 72;
  console.log(`PDF page size: ${width.toFixed(2)} × ${height.toFixed(2)} pt (expect ~${expectedW.toFixed(2)} × ${expectedH.toFixed(2)})`);
  if (Math.abs(width - expectedW) > 1 || Math.abs(height - expectedH) > 1) {
    throw new Error('PDF page size is not A4');
  }

  writeFileSync(
    join(outDir, 'report.json'),
    JSON.stringify(
      {
        at: new Date().toISOString(),
        pageCount,
        png: { path: pngPath, w, h, bytes: pngBytes.length },
        pdf: { path: pdfPath, pages, width, height, bytes: pdfBytes.length }
      },
      null,
      2
    )
  );

  console.log('OK — Business Plan exports meet A4 · 300 dpi quality checks');
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
