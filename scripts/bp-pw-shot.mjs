import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('artifacts/business-plan-ab', { recursive: true });

// High-DPR browser screenshot = ground-truth sharpness of the live DOM
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 900, height: 1300 },
  deviceScaleFactor: 3
});
await page.addInitScript(() => {
  localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
});
await page.goto('http://127.0.0.1:5173/business-plan', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForSelector('[data-bp-page]');
await page.waitForTimeout(1000);

// Move pack page on-screen for screenshot
await page.evaluate(() => {
  const host = document.querySelector('[data-bp-page]')?.parentElement;
  if (host) {
    host.style.left = '0px';
    host.style.top = '0px';
    host.style.zIndex = '99999';
    host.style.background = '#fff';
  }
});
await page.waitForTimeout(300);

const el = page.locator('[data-bp-page]').first();
const shot = await el.screenshot({ type: 'png' });
writeFileSync('artifacts/business-plan-ab/playwright-dpr3.png', shot);
console.log('playwright-dpr3', shot.length, 'bytes');

// Crop body via page
const box = await el.boundingBox();
console.log('box', box);

const bodyShot = await page.screenshot({
  type: 'png',
  clip: {
    x: (box?.x ?? 0) + 60,
    y: (box?.y ?? 0) + 560,
    width: 500,
    height: 120
  }
});
writeFileSync('artifacts/business-plan-ab/playwright-dpr3-body.png', bodyShot);

await browser.close();
