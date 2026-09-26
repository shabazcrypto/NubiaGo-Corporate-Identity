import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
await page.addInitScript(() => {
  localStorage.setItem('brand-settings', JSON.stringify({ brand: 'ashbak', company: {} }));
});
await page.goto('http://127.0.0.1:5173/business-plan', { waitUntil: 'networkidle' });
await page.waitForSelector('[data-artboard="AshBak_BusinessPlan_01_FrontMatter"]');
const el = await page.$('[data-artboard="AshBak_BusinessPlan_01_FrontMatter"]');
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
const m = await el.evaluate((node) => {
  const shell = node.firstElementChild;
  const content = shell?.children[1];
  const stack = content?.firstElementChild;
  const bottom = stack?.children[2];
  const fill = bottom?.firstElementChild;
  const grow = fill ? [...fill.children].find((c) => getComputedStyle(c).flexGrow !== '0') : null;
  const field = grow?.firstElementChild;
  return {
    bottomH: bottom?.clientHeight,
    fillH: fill?.clientHeight,
    fillFlex: fill ? getComputedStyle(fill).flex : null,
    growH: grow?.clientHeight,
    growFlex: grow ? `${getComputedStyle(grow).flexGrow} ${getComputedStyle(grow).flex}` : null,
    fieldH: field?.clientHeight,
    fieldFlex: field ? getComputedStyle(field).flex : null,
    fillChildren: fill
      ? [...fill.children].map((c) => ({
          h: c.clientHeight,
          flexGrow: getComputedStyle(c).flexGrow,
          cls: c.className?.slice?.(0, 80)
        }))
      : []
  };
});
console.log(JSON.stringify(m, null, 2));
await browser.close();
