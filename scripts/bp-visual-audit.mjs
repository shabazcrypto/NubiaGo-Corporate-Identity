/**
 * Visual audit of AshBak Business Plan A4 artboards.
 * Usage: node scripts/bp-visual-audit.mjs
 * Requires: vite on 127.0.0.1:5173, playwright installed.
 */
import { chromium } from 'playwright';
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'artifacts', 'business-plan-visual');
const BASE = process.env.BP_BASE || 'http://127.0.0.1:5173';

mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1
  });

  await page.addInitScript(() => {
    localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
  });

  await page.goto(`${BASE}/business-plan`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForSelector('[data-artboard]', { timeout: 30000 });

  // LazyMount: scroll through page to mount all artboards
  for (let i = 0; i < 40; i++) {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const boards = await page.$$eval('[data-artboard]', (els) =>
    els.map((el) => el.getAttribute('data-artboard'))
  );

  const report = [];
  for (const name of boards) {
    const handle = await page.$(`[data-artboard="${name}"]`);
    if (!handle) continue;
    await handle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    // Force parent LazyMount visible region
    const box = await handle.boundingBox();
    if (!box) continue;

    const file = `${name}.png`;
    await handle.screenshot({ path: join(outDir, file), type: 'png' });

    // Measure content fill: compare content height vs artboard
    const metrics = await handle.evaluate((el) => {
      const shell = el.firstElementChild;
      if (!shell) return { emptyRatio: 1, h: el.clientHeight };
      const rect = shell.getBoundingClientRect();
      // Find last content child's bottom within shell
      const kids = shell.querySelectorAll('*');
      let maxBottom = 0;
      kids.forEach((k) => {
        const r = k.getBoundingClientRect();
        if (r.height > 0) maxBottom = Math.max(maxBottom, r.bottom);
      });
      const used = Math.min(1, Math.max(0, (maxBottom - rect.top) / rect.height));
      return {
        h: Math.round(rect.height),
        w: Math.round(rect.width),
        fillApprox: Math.round(used * 100) / 100
      };
    });

    report.push({ name, file, ...metrics });
    console.log(`OK ${name} fill~${metrics.fillApprox}`);
  }

  writeFileSync(join(outDir, 'report.json'), JSON.stringify({ at: new Date().toISOString(), report }, null, 2));
  console.log(`Wrote ${report.length} screenshots → ${outDir}`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
