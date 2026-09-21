import { createRoot, type Root } from 'react-dom/client';
import { createElement, type ReactNode } from 'react';
import JSZip from 'jszip';
import { BrandProvider } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { Logo } from '@/components/brand/Logo';
import { BrandRule } from '@/components/brand/Logo';
import { brandIcons, NG_STROKE, QrPlaceholder } from '@/components/brand/iconSystem';
import { outlinedWordmarkSvg, type WordmarkTone } from '@/lib/wordmark';
import { capturePngBytes, triggerDownloadBytes } from '@/utils/exportAsset';

async function wait(ms: number) {
  await new Promise((resolve) => window.setTimeout(resolve, ms));
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
  await wait(120);

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
    createElement('div', { className: 'mt-8' }, createElement(BrandRule, { width: 96, tone: 'gold' }))
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
      { className: 'mt-10 grid flex-1 grid-cols-7 gap-y-10' },
      ...brandIcons.map(({ key, label, Icon }) =>
        createElement(
          'div',
          { key, className: 'flex flex-col items-center px-2 text-center' },
          createElement(Icon, { className: 'h-7 w-7 text-brand', strokeWidth: NG_STROKE }),
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
      createElement(BrandRule, { width: 96, tone: 'gold' }),
      createElement(
        'h1',
        { className: 'mt-6 max-w-3xl text-[48px] font-bold leading-tight tracking-[-0.03em]' },
        'Infrastructure for African commerce'
      ),
      createElement('p', { className: 'mt-4 text-[18px] text-white/70' }, 'nubiago.com')
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
        'Built for continental trade'
      )
    )
  );
}

export async function downloadLogoPack() {
  const zip = new JSZip();
  const folder = zip.folder('NubiaGo_Logo_Pack');
  if (!folder) throw new Error('Could not create zip folder');

  const tones: WordmarkTone[] = ['primary', 'black', 'gold', 'light'];
  for (const tone of tones) {
    folder.file(`NubiaGo_Logo_${tone}.svg`, await outlinedWordmarkSvg(tone));
  }

  folder.file(
    'NubiaGo_Logo_Primary.png',
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'primary', bg: 'transparent' }),
      formats.logoMark,
      true
    )
  );
  folder.file(
    'NubiaGo_Logo_Reversed.png',
    await captureReactArtboard(
      createElement(LogoMark, { tone: 'light', bg: '#1E3A5F' }),
      formats.logoMarkDark,
      false
    )
  );

  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, 'NubiaGo_Logo_Pack.zip', 'application/zip');
}

export async function downloadIconPack() {
  const zip = new JSZip();
  const folder = zip.folder('NubiaGo_Icon_Pack');
  if (!folder) throw new Error('Could not create zip folder');
  folder.file('NubiaGo_Icon_Sheet.png', await captureReactArtboard(createElement(IconSheet), formats.iconSheet, false));
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, 'NubiaGo_Icon_Pack.zip', 'application/zip');
}

export async function downloadSocialPack() {
  const zip = new JSZip();
  const folder = zip.folder('NubiaGo_Social_Pack');
  if (!folder) throw new Error('Could not create zip folder');
  folder.file(
    'NubiaGo_Social_LinkedIn.png',
    await captureReactArtboard(createElement(SocialLinkedIn), formats.linkedIn, false)
  );
  folder.file(
    'NubiaGo_Social_Square.png',
    await captureReactArtboard(createElement(SocialSquare), formats.square, false)
  );
  const bytes = await zip.generateAsync({ type: 'uint8array' });
  triggerDownloadBytes(bytes, 'NubiaGo_Social_Pack.zip', 'application/zip');
}

export async function downloadQrPack() {
  const zip = new JSZip();
  const folder = zip.folder('NubiaGo_QR_Pack');
  if (!folder) throw new Error('Could not create zip folder');
  const labels = ['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'];
  folder.file(
    'NubiaGo_QR_Placeholders.png',
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
  triggerDownloadBytes(bytes, 'NubiaGo_QR_Pack.zip', 'application/zip');
}
