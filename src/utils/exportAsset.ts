import { toJpeg, toPng } from 'html-to-image';
import { PDFDocument } from 'pdf-lib';
import type { ArtboardSpec, ExportKind } from '@/lib/formats';
import { mmToPt } from '@/lib/formats';
import { dataUrlToBytes, injectPngDpi } from '@/lib/png-phys';
import { outlinedWordmarkSvg, type WordmarkTone } from '@/lib/wordmark';

export type ExportFormat = ExportKind;

function triggerDownload(href: string, fileName: string) {
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function triggerDownloadBytes(bytes: Uint8Array, fileName: string, mime: string) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy], { type: mime });
  const url = URL.createObjectURL(blob);
  triggerDownload(url, fileName);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

async function waitForFonts() {
  if ('fonts' in document) {
    try {
      await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      // Warm the wordmark face used across artboards.
      await (document as Document & { fonts: FontFaceSet }).fonts.load('800 72px Inter');
    } catch {
      /* font loading is best-effort */
    }
  }
  // Give layout a frame after fonts settle (important on first production visit).
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
}

function cloneOptions(spec: ArtboardSpec, transparent: boolean) {
  const base = {
    cacheBust: true,
    pixelRatio: spec.pixelRatio,
    width: spec.width,
    height: spec.height,
    canvasWidth: spec.exportWidth,
    canvasHeight: spec.exportHeight,
    skipAutoScale: true,
    // Keep only the artboard subtree — ignore scaled preview wrappers.
    filter: (node: HTMLElement) => {
      if (node.classList?.contains('print:hidden')) return false;
      return true;
    },
    style: {
      transform: 'none' as const,
      margin: '0',
      boxShadow: 'none',
      // Force true artboard size even if the live node sits inside a scaled preview.
      width: `${spec.width}px`,
      height: `${spec.height}px`
    }
  };
  return transparent ? base : { ...base, backgroundColor: '#ffffff' };
}

export async function capturePngBytes(
  node: HTMLElement,
  spec: ArtboardSpec,
  transparent = Boolean(spec.transparent)
): Promise<Uint8Array> {
  await waitForFonts();
  const options = cloneOptions(spec, transparent);
  // Warm-up pass primes font/image caches; second pass is the production capture.
  try {
    await toPng(node, { ...options, pixelRatio: 1, canvasWidth: spec.width, canvasHeight: spec.height });
  } catch {
    /* warm-up is best-effort */
  }
  const dataUrl = await toPng(node, options);
  return injectPngDpi(dataUrlToBytes(dataUrl), spec.targetDpi);
}

async function captureJpegBytes(node: HTMLElement, spec: ArtboardSpec): Promise<Uint8Array> {
  await waitForFonts();
  const options = { ...cloneOptions(spec, false), quality: 1 as const };
  try {
    await toPng(node, { ...options, pixelRatio: 1, canvasWidth: spec.width, canvasHeight: spec.height });
  } catch {
    /* warm-up is best-effort */
  }
  const dataUrl = await toJpeg(node, options);
  return dataUrlToBytes(dataUrl);
}

export async function pngBytesToPdf(pngBytes: Uint8Array, spec: ArtboardSpec): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([mmToPt(spec.widthMm), mmToPt(spec.heightMm)]);
  const image = await doc.embedPng(pngBytes);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight()
  });
  return doc.save();
}

export async function pngPagesToPdf(pages: Array<{ bytes: Uint8Array; spec: ArtboardSpec }>): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (const pageSpec of pages) {
    const page = doc.addPage([mmToPt(pageSpec.spec.widthMm), mmToPt(pageSpec.spec.heightMm)]);
    const image = await doc.embedPng(pageSpec.bytes);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight()
    });
  }
  return doc.save();
}

export async function exportNode(
  node: HTMLElement,
  fileName: string,
  format: ExportFormat,
  spec: ArtboardSpec,
  options: { transparent?: boolean; wordmarkTone?: WordmarkTone } = {}
) {
  const transparent = options.transparent ?? Boolean(spec.transparent);

  if (format === 'svg') {
    if (spec.family === 'logo') {
      const svg = await outlinedWordmarkSvg(options.wordmarkTone ?? 'primary');
      downloadText(svg, `${fileName}.svg`, 'image/svg+xml;charset=utf-8');
      return;
    }
    throw new Error('SVG download is reserved for outlined logo files.');
  }

  if (format === 'jpg') {
    const bytes = await captureJpegBytes(node, spec);
    triggerDownloadBytes(bytes, `${fileName}.jpg`, 'image/jpeg');
    return;
  }

  const pngBytes = await capturePngBytes(node, spec, transparent);

  if (format === 'png') {
    // Always use Blob URLs — large A4 PNGs can exceed data-URL limits in some browsers.
    triggerDownloadBytes(pngBytes, `${fileName}.png`, 'image/png');
    return;
  }

  const pdfBytes = await pngBytesToPdf(pngBytes, spec);
  triggerDownloadBytes(pdfBytes, `${fileName}.pdf`, 'application/pdf');
}

export async function exportDeckPdf(nodes: HTMLElement[], fileName: string, spec: ArtboardSpec) {
  if (!nodes.length) {
    throw new Error('No slides available to export.');
  }
  const pages: Array<{ bytes: Uint8Array; spec: ArtboardSpec }> = [];
  for (const node of nodes) {
    pages.push({ bytes: await capturePngBytes(node, spec, false), spec });
  }
  const pdfBytes = await pngPagesToPdf(pages);
  triggerDownloadBytes(pdfBytes, `${fileName}.pdf`, 'application/pdf');
}

/** Prints a single artboard at true size via the browser print dialog (preview only). */
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
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}
