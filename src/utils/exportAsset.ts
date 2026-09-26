import type { ArtboardSpec, ExportKind } from '@/lib/formats';
import { mmToPt } from '@/lib/formats';
import { dataUrlToBytes, injectPngDpi } from '@/lib/png-phys';
import type { WordmarkTone } from '@/lib/wordmark';

export type ExportFormat = ExportKind;

async function htmlToImage() {
  return import('html-to-image');
}

async function modernScreenshot() {
  return import('modern-screenshot');
}

async function pdfLib() {
  return import('pdf-lib');
}

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
      const fonts = (document as Document & { fonts: FontFaceSet }).fonts;
      await fonts.ready;
      const sizes = [16, 48, 96, 160];
      const weights = [400, 500, 600, 700, 800];
      await Promise.allSettled(
        weights.flatMap((w) => sizes.map((px) => fonts.load(`${w} ${px}px "Inter Tight"`)))
      );
    } catch {
      /* font loading is best-effort */
    }
  }
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
}

function printScale(spec: ArtboardSpec) {
  return Math.min(spec.exportWidth / spec.width, spec.exportHeight / spec.height);
}

function isTransparentColor(value: string) {
  const v = value.replace(/\s+/g, '').toLowerCase();
  return !v || v === 'transparent' || v === 'rgba(0,0,0,0)' || v === 'hsla(0,0%,0%,0)';
}

/** Resolved fill behind the artboard — dark pages must not composite on white. */
function detectArtboardBackground(node: HTMLElement): string {
  const candidates: HTMLElement[] = [node];
  const first = node.firstElementChild;
  if (first instanceof HTMLElement) candidates.push(first);
  for (const el of candidates) {
    const bg = getComputedStyle(el).backgroundColor;
    if (!isTransparentColor(bg)) return bg;
  }
  return '#ffffff';
}

function normalizeCanvas(canvas: HTMLCanvasElement, spec: ArtboardSpec): HTMLCanvasElement {
  if (canvas.width === spec.exportWidth && canvas.height === spec.exportHeight) return canvas;
  const out = document.createElement('canvas');
  out.width = spec.exportWidth;
  out.height = spec.exportHeight;
  const ctx = out.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D unavailable');
  // Only smooth when shrinking; never soft-upscale a smaller paint.
  ctx.imageSmoothingEnabled = canvas.width > spec.exportWidth;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(canvas, 0, 0, spec.exportWidth, spec.exportHeight);
  return out;
}

/**
 * Print-quality raster capture at artboard export pixels (e.g. A4 @ 300 dpi).
 * Prefers modern-screenshot (scale = dpi ratio). Falls back to html-to-image.
 */
export async function capturePngBytes(
  node: HTMLElement,
  spec: ArtboardSpec,
  transparent = Boolean(spec.transparent)
): Promise<Uint8Array> {
  await waitForFonts();
  const scale = printScale(spec);
  const backgroundColor = transparent ? null : detectArtboardBackground(node);
  const filter = (el: Node) =>
    !(el instanceof HTMLElement && el.classList?.contains('print:hidden'));

  try {
    const { domToCanvas } = await modernScreenshot();
    let cssText: string | undefined;
    try {
      const { getFontEmbedCSS } = await htmlToImage();
      cssText = await getFontEmbedCSS(node, { preferredFontFormat: 'woff2' });
    } catch {
      /* font css optional — modern-screenshot also embeds */
    }
    const canvas = await domToCanvas(node, {
      width: spec.width,
      height: spec.height,
      scale,
      backgroundColor,
      maximumCanvasSize: 16384,
      timeout: 60000,
      filter,
      font: {
        preferredFormat: 'woff2',
        ...(cssText ? { cssText } : {})
      },
      style: {
        margin: '0',
        boxShadow: 'none',
        transform: 'none',
        transformOrigin: 'top left',
        textRendering: 'geometricPrecision',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }
    });
    const normalized = normalizeCanvas(canvas, spec);
    return injectPngDpi(dataUrlToBytes(normalized.toDataURL('image/png')), spec.targetDpi);
  } catch {
    /* fall through to html-to-image */
  }

  const { toCanvas, getFontEmbedCSS } = await htmlToImage();
  let fontEmbedCSS = '';
  try {
    fontEmbedCSS = await getFontEmbedCSS(node, { preferredFontFormat: 'woff2' });
  } catch {
    /* best-effort */
  }

  const canvas = await toCanvas(node, {
    cacheBust: true,
    pixelRatio: scale,
    skipAutoScale: true,
    width: spec.width,
    height: spec.height,
    fontEmbedCSS: fontEmbedCSS || undefined,
    preferredFontFormat: 'woff2',
    filter: (n: HTMLElement) => !n.classList?.contains('print:hidden'),
    style: {
      margin: '0',
      boxShadow: 'none',
      transform: 'none',
      width: `${spec.width}px`,
      height: `${spec.height}px`,
      textRendering: 'geometricPrecision',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    } as Partial<CSSStyleDeclaration>,
    ...(transparent || !backgroundColor ? {} : { backgroundColor })
  });

  const normalized = normalizeCanvas(canvas, spec);
  return injectPngDpi(dataUrlToBytes(normalized.toDataURL('image/png')), spec.targetDpi);
}

async function captureJpegBytes(node: HTMLElement, spec: ArtboardSpec): Promise<Uint8Array> {
  await waitForFonts();
  const scale = printScale(spec);
  const backgroundColor = detectArtboardBackground(node);
  try {
    const { domToCanvas } = await modernScreenshot();
    const canvas = await domToCanvas(node, {
      width: spec.width,
      height: spec.height,
      scale,
      backgroundColor,
      maximumCanvasSize: 16384,
      style: { margin: '0', transform: 'none', boxShadow: 'none' }
    });
    return dataUrlToBytes(normalizeCanvas(canvas, spec).toDataURL('image/jpeg', 1));
  } catch {
    const { toCanvas } = await htmlToImage();
    const canvas = await toCanvas(node, {
      pixelRatio: scale,
      skipAutoScale: true,
      width: spec.width,
      height: spec.height,
      backgroundColor,
      style: {
        margin: '0',
        transform: 'none',
        width: `${spec.width}px`,
        height: `${spec.height}px`
      } as Partial<CSSStyleDeclaration>
    });
    return dataUrlToBytes(normalizeCanvas(canvas, spec).toDataURL('image/jpeg', 1));
  }
}

export async function pngBytesToPdf(pngBytes: Uint8Array, spec: ArtboardSpec): Promise<Uint8Array> {
  const { PDFDocument } = await pdfLib();
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
  const { PDFDocument } = await pdfLib();
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

export type SvgExportKind = 'wordmark' | 'icon-mark' | 'icon-app';

export async function exportNode(
  node: HTMLElement,
  fileName: string,
  format: ExportFormat,
  spec: ArtboardSpec,
  options: {
    transparent?: boolean;
    wordmarkTone?: WordmarkTone;
    svgKind?: SvgExportKind;
  } = {}
) {
  const transparent = options.transparent ?? Boolean(spec.transparent);

  if (format === 'svg') {
    const { outlinedWordmarkSvg, outlinedIconMarkSvg, outlinedIconAppSvg } = await import('@/lib/wordmark');
    const kind = options.svgKind ?? 'wordmark';
    let svg: string;
    if (kind === 'icon-mark') {
      svg = outlinedIconMarkSvg();
    } else if (kind === 'icon-app') {
      svg = outlinedIconAppSvg();
    } else {
      svg = await outlinedWordmarkSvg(options.wordmarkTone ?? 'primary');
    }
    downloadText(svg, `${fileName}.svg`, 'image/svg+xml;charset=utf-8');
    return;
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

export async function exportDeckPdf(
  nodes: HTMLElement[],
  fileName: string,
  spec: ArtboardSpec,
  onProgress?: (done: number, total: number) => void
) {
  if (!nodes.length) {
    throw new Error('No slides available to export.');
  }
  // Deck uses a lighter capture ratio than single-slide PNG to stay within memory limits.
  const deckSpec: ArtboardSpec = {
    ...spec,
    pixelRatio: Math.min(spec.pixelRatio, 2),
    exportWidth: Math.round(spec.width * Math.min(spec.pixelRatio, 2)),
    exportHeight: Math.round(spec.height * Math.min(spec.pixelRatio, 2))
  };
  const pages: Array<{ bytes: Uint8Array; spec: ArtboardSpec }> = [];
  for (let i = 0; i < nodes.length; i += 1) {
    pages.push({ bytes: await capturePngBytes(nodes[i], deckSpec, false), spec: deckSpec });
    onProgress?.(i + 1, nodes.length);
  }
  const pdfBytes = await pngPagesToPdf(pages);
  triggerDownloadBytes(pdfBytes, `${fileName}.pdf`, 'application/pdf');
}

/**
 * Multi-page print PDF at full artboard dpi (e.g. A4 @ 300).
 * Embeds one page at a time so peak memory stays near a single raster, not N×.
 */
export async function exportDocumentPdf(
  nodes: HTMLElement[],
  fileName: string,
  spec: ArtboardSpec,
  onProgress?: (done: number, total: number) => void
) {
  if (!nodes.length) {
    throw new Error('No pages available to export.');
  }
  const { PDFDocument } = await pdfLib();
  const doc = await PDFDocument.create();
  const pageW = mmToPt(spec.widthMm);
  const pageH = mmToPt(spec.heightMm);

  for (let i = 0; i < nodes.length; i += 1) {
    const pngBytes = await capturePngBytes(nodes[i], spec, false);
    const page = doc.addPage([pageW, pageH]);
    const image = await doc.embedPng(pngBytes);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: page.getWidth(),
      height: page.getHeight()
    });
    onProgress?.(i + 1, nodes.length);
  }

  const pdfBytes = await doc.save();
  triggerDownloadBytes(pdfBytes, `${fileName}.pdf`, 'application/pdf');
}

/** ZIP of full-dpi PNG pages (document / print packs). */
export async function exportDocumentPngZip(
  items: Array<{ node: HTMLElement; fileName: string }>,
  zipName: string,
  spec: ArtboardSpec,
  onProgress?: (done: number, total: number) => void
) {
  if (!items.length) throw new Error('No pages selected.');
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const folder = zip.folder(zipName);
  if (!folder) throw new Error('Could not create zip folder');

  for (let i = 0; i < items.length; i += 1) {
    const bytes = await capturePngBytes(items[i].node, spec, false);
    folder.file(`${items[i].fileName}.png`, bytes);
    onProgress?.(i + 1, items.length);
  }
  const out = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(out, `${zipName}.zip`, 'application/zip');
}

/** ZIP of PNG slides (subset or full deck) for pitch packs. */
export async function exportSlidesPngZip(
  items: Array<{ node: HTMLElement; fileName: string }>,
  zipName: string,
  spec: ArtboardSpec,
  onProgress?: (done: number, total: number) => void
) {
  if (!items.length) throw new Error('No slides selected.');
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const folder = zip.folder(zipName);
  if (!folder) throw new Error('Could not create zip folder');
  const captureSpec: ArtboardSpec = {
    ...spec,
    pixelRatio: Math.min(spec.pixelRatio, 2),
    exportWidth: Math.round(spec.width * Math.min(spec.pixelRatio, 2)),
    exportHeight: Math.round(spec.height * Math.min(spec.pixelRatio, 2))
  };
  for (let i = 0; i < items.length; i += 1) {
    const bytes = await capturePngBytes(items[i].node, captureSpec, false);
    folder.file(`${items[i].fileName}.png`, bytes);
    onProgress?.(i + 1, items.length);
  }
  const out = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(out, `${zipName}.zip`, 'application/zip');
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
