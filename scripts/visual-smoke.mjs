/**
 * Storybook visual smoke — builds on CI after `npm run build-storybook`.
 * Serves storybook-static, screenshots key stories, writes artifacts.
 * Exit 1 if Storybook is missing or a story iframe fails to load.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..');
const staticDir = join(root, 'storybook-static');
const outDir = join(root, 'artifacts', 'visual-smoke');

const STORIES = [
  { id: 'brand-logo--primary', name: 'logo-primary' },
  { id: 'kit-button--default', name: 'button-default' },
  { id: 'templates-letterhead--full-colour', name: 'letterhead-full-colour' },
  { id: 'templates-businesscard--executive', name: 'business-card-executive' },
  { id: 'templates-digital--page', name: 'digital-page' }
];

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.map': 'application/json'
};

function assertStorybook() {
  if (!existsSync(join(staticDir, 'index.html'))) {
    console.error('storybook-static/ missing. Run: npm run build-storybook');
    process.exit(1);
  }
}

function startStaticServer(port) {
  const server = createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      if (urlPath === '/') urlPath = '/index.html';
      const filePath = join(staticDir, urlPath.replace(/^\//, ''));
      if (!filePath.startsWith(staticDir) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(readFileSync(filePath));
    } catch {
      res.writeHead(500);
      res.end('Error');
    }
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

async function runWithPlaywright(baseUrl) {
  let playwright;
  try {
    playwright = await import('playwright');
  } catch {
    console.error('playwright not installed. Run: npm i -D playwright');
    process.exit(1);
  }

  mkdirSync(outDir, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const results = [];

  for (const story of STORIES) {
    const url = `${baseUrl}/iframe.html?id=${story.id}&viewMode=story`;
    const entry = { story: story.name, id: story.id, ok: false, error: null };
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(800);
      const path = join(outDir, `${story.name}.png`);
      await page.screenshot({ path, fullPage: true });
      entry.ok = true;
      entry.file = path;
      console.log(`✓ ${story.name}`);
    } catch (err) {
      entry.error = err instanceof Error ? err.message : String(err);
      console.error(`✗ ${story.name}: ${entry.error}`);
    }
    results.push(entry);
  }

  await browser.close();
  writeFileSync(join(outDir, 'report.json'), JSON.stringify({ baseUrl, results }, null, 2));

  const failed = results.filter((r) => !r.ok);
  if (failed.length) {
    console.error(`Visual smoke failed: ${failed.length}/${results.length}`);
    process.exit(1);
  }
  console.log(`Visual smoke passed: ${results.length} stories → ${outDir}`);
}

async function main() {
  assertStorybook();
  const port = 6007;
  const server = await startStaticServer(port);
  try {
    await runWithPlaywright(`http://127.0.0.1:${port}`);
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
