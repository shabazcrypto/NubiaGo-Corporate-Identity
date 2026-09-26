import { createRoot, type Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import { BrandProvider } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { brandIcons, AB_STROKE, QrPlaceholder } from '@/components/brand/iconSystem';
import type { WordmarkTone } from '@/lib/wordmark';
import { capturePngBytes, triggerDownloadBytes } from '@/utils/exportAsset';
import { brandPrefix, readStoredBrand } from '@/lib/brandMeta';

function activeBrandPrefix(): string {
  return brandPrefix(readStoredBrand());
}

function activeWebsite(): string {
  return readStoredBrand() === 'ashbak' ? 'ashbakindustries.com' : 'nubiago.com';
}

function activeHeadline(): string {
  return readStoredBrand() === 'ashbak'
    ? 'The industrial backbone of Africa'
    : 'Infrastructure for African commerce';
}

async function wait(ms: number) {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function settleForCapture() {
  if ('fonts' in document) {
    try {
      const fonts = (document as Document & { fonts: FontFaceSet }).fonts;
      await fonts.ready;
      await Promise.allSettled([
        fonts.load('800 72px "Inter Tight"'),
        fonts.load('500 72px "Inter Tight"')
      ]);
    } catch {
      /* best-effort */
    }
  }
  await wait(400);
  await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));
}

async function captureReactArtboard(
  node: ReactNode,
  spec: (typeof formats)[keyof typeof formats],
  transparent = Boolean(spec.transparent)
): Promise<Uint8Array> {
  const host = document.createElement('div');
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${spec.width}px;height:${spec.height}px;overflow:hidden;pointer-events:none;opacity:0;`;
  document.body.appendChild(host);

  const artboard = document.createElement('div');
  artboard.style.width = `${spec.width}px`;
  artboard.style.height = `${spec.height}px`;
  artboard.style.overflow = 'hidden';
  artboard.style.backgroundColor = transparent ? 'transparent' : '#ffffff';
  host.appendChild(artboard);

  const root: Root = createRoot(artboard);
  root.render(createElement(BrandProvider, null, node));
  await settleForCapture();

  try {
    return await capturePngBytes(artboard, spec, transparent);
  } finally {
    root.unmount();
    document.body.removeChild(host);
  }
}

function LogoMark({ tone, bg }: { tone: 'primary' | 'light' | 'black' | 'gold'; bg: string }) {
  return createElement(
    'div',
    {
      className: 'flex h-full w-full flex-col items-center justify-center',
      style: { background: bg, width: '100%', height: '100%' }
    },
    createElement(Logo, { size: 72, tone }),
    createElement('div', { className: 'mt-8' }, createElement(BrandRule, { width: 96, tone: 'secondary' }))
  );
}

function IconSheet() {
  return createElement(
    'div',
    { className: 'flex h-full w-full flex-col bg-white p-12', style: { width: '100%', height: '100%' } },
    createElement(Logo, { size: 18 }),
    createElement('div', { className: 'mt-4' }, createElement(BrandRule, { width: '100%', thickness: 1 })),
    createElement(
      'div',
      { className: 'mt-10 grid flex-1 grid-cols-5 gap-y-10' },
      ...brandIcons.map(({ key, label, Icon }) =>
        createElement(
          'div',
          { key, className: 'flex flex-col items-center px-2 text-center' },
          createElement(Icon, { className: 'h-7 w-7 text-brand', strokeWidth: AB_STROKE }),
          createElement('div', { className: 'mt-3 text-[11px] font-semibold text-ink' }, label)
        )
      )
    )
  );
}

function SocialLinkedIn() {
  return createElement(
    'div',
    {
      className: 'flex h-full w-full flex-col justify-between bg-brand p-16 text-white',
      style: { width: '100%', height: '100%' }
    },
    createElement(Logo, { size: 28, tone: 'light' }),
    createElement(
      'div',
      null,
      createElement(BrandRule, { width: 96, tone: 'secondary' }),
      createElement(
        'h1',
        { className: 'mt-6 max-w-3xl text-[48px] font-bold leading-tight tracking-[-0.03em]' },
        activeHeadline()
      ),
      createElement('p', { className: 'mt-4 text-[18px] text-white/70' }, activeWebsite())
    )
  );
}

function SocialSquare() {
  return createElement(
    'div',
    {
      className: 'flex h-full w-full flex-col justify-between bg-brand-sand p-14',
      style: { width: '100%', height: '100%' }
    },
    createElement(Logo, { size: 28 }),
    createElement(
      'div',
      null,
      createElement(BrandRule, { width: 72 }),
      createElement(
        'h1',
        { className: 'mt-6 text-[42px] font-bold leading-tight tracking-[-0.03em] text-ink' },
        readStoredBrand() === 'ashbak' ? 'Built for industrial scale' : 'Built for continental trade'
      )
    )
  );
}

export async function downloadLogoPack() {
  const brand = readStoredBrand();
  const prefix = brandPrefix(brand);
  const [{ default: JSZip }, { outlinedWordmarkSvg }] = await Promise.all([
    import('jszip'),
    import('@/lib/wordmark')
  ]);
  const zip = new JSZip();
  const folder = zip.folder(`${prefix}_Logo_Pack`);
  if (!folder) throw new Error('Could not create zip folder');

  const tones: WordmarkTone[] = ['primary', 'black', 'light', 'gold'];
  for (const tone of tones) {
    folder.file(`${prefix}_Logo_${tone}.svg`, await outlinedWordmarkSvg(tone, 72, brand));
  }

  folder.file(
    `${prefix}_Logo_Primary.png`,
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'primary', bg: 'transparent' }),
      formats.logoMark,
      true
    )
  );
  folder.file(
    `${prefix}_Logo_Reversed.png`,
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'light', bg: brand === 'ashbak' ? '#000000' : '#1E3A5F' }),
      formats.logoMarkDark,
      false
    )
  );

  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, `${prefix}_Logo_Pack.zip`, 'application/zip');
}

export async function downloadIconPack() {
  const prefix = activeBrandPrefix();
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const folder = zip.folder(`${prefix}_Icon_Pack`);
  if (!folder) throw new Error('Could not create zip folder');
  folder.file(`${prefix}_Icon_Sheet.png`, await captureReactArtboard(createElement(IconSheet), formats.iconSheet, false));
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, `${prefix}_Icon_Pack.zip`, 'application/zip');
}

export async function downloadSocialPack() {
  const prefix = activeBrandPrefix();
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const folder = zip.folder(`${prefix}_Social_Pack`);
  if (!folder) throw new Error('Could not create zip folder');
  folder.file(
    `${prefix}_Social_LinkedIn.png`,
    await captureReactArtboard(createElement(SocialLinkedIn), formats.linkedIn, false)
  );
  folder.file(
    `${prefix}_Social_Square.png`,
    await captureReactArtboard(createElement(SocialSquare), formats.square, false)
  );
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, `${prefix}_Social_Pack.zip`, 'application/zip');
}

export async function downloadQrPack() {
  const prefix = activeBrandPrefix();
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const folder = zip.folder(`${prefix}_QR_Pack`);
  if (!folder) throw new Error('Could not create zip folder');
  const labels = ['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'];
  folder.file(
    `${prefix}_QR_Placeholders.png`,
    await captureReactArtboard(
      createElement(
        'div',
        {
          className: 'flex h-full w-full flex-wrap items-center justify-center gap-10 bg-white px-8',
          style: { width: '100%', height: '100%' }
        },
        ...labels.map((label) => createElement(QrPlaceholder, { key: label, size: 96, label }))
      ),
      formats.qrRow,
      false
    )
  );
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, `${prefix}_QR_Pack.zip`, 'application/zip');
}

/** Full handoff ZIP matching 01–11 folder tree (core exportable assets). */
export async function downloadMasterKit(onProgress?: (label: string) => void) {
  const brand = readStoredBrand();
  const prefix = brandPrefix(brand);
  const rootName = brand === 'ashbak' ? 'ASHBAK_CORPORATE_IDENTITY' : 'NUBIAGO_CORPORATE_IDENTITY';

  const [
    { default: JSZip },
    { outlinedWordmarkSvg, outlinedIconMarkSvg, outlinedIconAppSvg },
    { defaultCompany: ngCompany },
    ashbakMod,
    emailCore,
    emailExtra
  ] = await Promise.all([
    import('jszip'),
    import('@/lib/wordmark'),
    import('@/data/brand'),
    import('@/data/brand-ashbak'),
    import('@/utils/emailSignatures'),
    import('@/utils/emailSignaturesExtra')
  ]);

  let companyOverrides: Record<string, string> = {};
  try {
    const raw = window.localStorage.getItem('brand-settings');
    if (raw) {
      const parsed = JSON.parse(raw) as { company?: Record<string, string> };
      companyOverrides = parsed.company ?? {};
    }
  } catch {
    /* ignore */
  }
  const company = {
    ...(brand === 'ashbak' ? ashbakMod.defaultCompany : ngCompany),
    ...companyOverrides
  };

  const zip = new JSZip();
  const root = zip.folder(rootName);
  if (!root) throw new Error('Could not create kit root');

  onProgress?.('Writing README & company profile…');
  root.file(
    '00_README.txt',
    `${prefix} Corporate Identity — master kit
Generated: ${new Date().toISOString()}
Brand: ${company.name}

Folders mirror the kit navigation (01–11).
- Outlined SVG logos are print/vector-ready.
- Email signatures are Outlook-safe HTML (text wordmark, nested tables).
- Raster files are sRGB; convert to CMYK offline for offset press.
- Open Brand details → Export JSON to sync company fields across machines.
`
  );
  root.file(
    '00_Company.json',
    JSON.stringify(
      { version: 1, brand, company, overrides: companyOverrides, exportedAt: new Date().toISOString() },
      null,
      2
    )
  );

  const brandFolder = root.folder('01_BRAND_SYSTEM');
  onProgress?.('Packing logos…');
  const tones: WordmarkTone[] = ['primary', 'black', 'light', 'gold'];
  for (const tone of tones) {
    brandFolder?.file(`${prefix}_Logo_${tone}.svg`, await outlinedWordmarkSvg(tone, 72, brand));
  }
  if (brand === 'nubiago') {
    brandFolder?.file(`${prefix}_Mark_OnLight.svg`, outlinedIconMarkSvg());
    brandFolder?.file(`${prefix}_Mark_App.svg`, outlinedIconAppSvg());
  }
  brandFolder?.file(
    `${prefix}_Logo_Primary.png`,
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'primary', bg: 'transparent' }),
      formats.logoMark,
      true
    )
  );
  brandFolder?.file(
    `${prefix}_Logo_Reversed.png`,
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'light', bg: brand === 'ashbak' ? '#000000' : '#1E3A5F' }),
      formats.logoMarkDark,
      false
    )
  );

  const emailFolder = root.folder('03_EMAIL');
  onProgress?.('Packing email signatures…');
  const {
    standardSignatureHtml,
    compactSignatureHtml,
    executiveSignatureHtml,
    wrapAsEmailDocument
  } = emailCore;
  const cores = [
    ['Signature_Standard', standardSignatureHtml],
    ['Signature_Compact', compactSignatureHtml],
    ['Signature_Executive', executiveSignatureHtml]
  ] as const;
  for (const [name, build] of cores) {
    const html = build(company);
    emailFolder?.file(`${prefix}_${name}.html`, wrapAsEmailDocument(html, `${prefix}_${name}`));
  }
  for (const entry of emailExtra.enterpriseSignatureCatalog) {
    const html = entry.html(company);
    emailFolder?.file(
      `${prefix}_${entry.fileName}.html`,
      wrapAsEmailDocument(html, `${prefix}_${entry.fileName}`)
    );
  }
  emailFolder?.file(
    `${prefix}_Email_Install_Notes.txt`,
    `Install notes
1. Open the .html file in a browser, Select All, Copy.
2. Paste into your email client signature editor (Gmail / Outlook / Apple Mail).
3. Wordmarks are text (Arial stack) so they render in desktop Outlook — do not paste screenshots.
4. Keep mailto: and tel: links selectable.
`
  );

  const digitalFolder = root.folder('10_DIGITAL_SOCIAL');
  onProgress?.('Packing social masters…');
  digitalFolder?.file(
    `${prefix}_Social_LinkedIn.png`,
    await captureReactArtboard(createElement(SocialLinkedIn), formats.linkedIn, false)
  );
  digitalFolder?.file(
    `${prefix}_Social_Square.png`,
    await captureReactArtboard(createElement(SocialSquare), formats.square, false)
  );

  const assetsFolder = root.folder('11_ASSETS');
  onProgress?.('Packing icon sheet & QR placeholders…');
  assetsFolder?.file(
    `${prefix}_Icon_Sheet.png`,
    await captureReactArtboard(createElement(IconSheet), formats.iconSheet, false)
  );
  const labels = ['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'];
  assetsFolder?.file(
    `${prefix}_QR_Placeholders.png`,
    await captureReactArtboard(
      createElement(
        'div',
        {
          className: 'flex h-full w-full flex-wrap items-center justify-center gap-10 bg-white px-8',
          style: { width: '100%', height: '100%' }
        },
        ...labels.map((label) => createElement(QrPlaceholder, { key: label, size: 96, label }))
      ),
      formats.qrRow,
      false
    )
  );

  // Stub folders so the tree matches navigation even when assets stay page-local.
  for (const folder of [
    '02_LETTERHEAD',
    '04_PRESENTATION',
    '05_COMMERCIAL_DOCUMENTS',
    '06_BUSINESS_CARD',
    '07_DOCUMENT_COVERS',
    '08_CATALOGUE',
    '09_REPORTS'
  ]) {
    root
      .folder(folder)
      ?.file(
        'README.txt',
        `Download individual PNG/PDF artboards from the ${folder.replace(/^\d+_/, '').replace(/_/g, ' ')} section in the kit.\n`
      );
  }

  onProgress?.('Compressing ZIP…');
  const bytes = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  triggerDownloadBytes(bytes, `${prefix}_Corporate_Identity_Master.zip`, 'application/zip');
}
