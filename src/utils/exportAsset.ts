import { toPng, toJpeg, toSvg } from 'html-to-image';

export type ExportFormat = 'png' | 'jpg' | 'svg';

function triggerDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Screen artboards are authored at 96 dpi, so a 3.125× pixel ratio produces a
 * true 300 dpi file — the minimum for print. Raster exports are never taken at
 * 1× or 2×, which is what made earlier downloads look soft.
 */
export const PRINT_SCALE = 3.125;
export const SCREEN_SCALE = 3;

async function waitForFonts() {
  if ('fonts' in document) {
    try {
      await (document as Document & {fonts: FontFaceSet;}).fonts.ready;
    } catch {

      /* font loading is best-effort */}
  }
}

function baseOptions(pixelRatio: number, width: number, height: number) {
  return {
    cacheBust: true,
    pixelRatio,
    width,
    height,
    canvasWidth: Math.round(width * pixelRatio),
    canvasHeight: Math.round(height * pixelRatio),
    backgroundColor: '#ffffff',
    skipAutoScale: true,
    style: { transform: 'none', margin: '0', boxShadow: 'none' }
  };
}

export async function exportNode(
node: HTMLElement,
fileName: string,
format: ExportFormat,
pixelRatio: number = SCREEN_SCALE)
{
  await waitForFonts();

  const width = node.offsetWidth;
  const height = node.offsetHeight;
  const options = baseOptions(pixelRatio, width, height);

  // The first pass primes image and font caches; the second renders cleanly.
  if (format !== 'svg') await toPng(node, { ...options, pixelRatio: 1 });

  const dataUrl =
  format === 'png' ?
  await toPng(node, options) :
  format === 'jpg' ?
  await toJpeg(node, { ...options, quality: 1 }) :
  await toSvg(node, { ...options, pixelRatio: 1 });

  triggerDownload(dataUrl, `${fileName}.${format}`);
}

/** Prints a single artboard at true size via the browser's Save-as-PDF dialog. */
export function printNode(node: HTMLElement) {
  node.classList.add('print-active');
  const cleanup = () => {
    node.classList.remove('print-active');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
  window.setTimeout(cleanup, 2000);
}

export async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export function downloadText(value: string, fileName: string, mime: string) {
  const blob = new Blob([value], { type: mime });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, fileName);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}