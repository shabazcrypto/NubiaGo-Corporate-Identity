export const CSS_DPI = 96;
export const PRINT_DPI = 300;
export const SCREEN_DPI = 288;

export type ExportKind = 'png' | 'jpg' | 'svg' | 'pdf';
export type FormatFamily = 'print' | 'screen' | 'logo';

export interface ArtboardSpec {
  id: string;
  label: string;
  width: number;
  height: number;
  widthMm: number;
  heightMm: number;
  targetDpi: number;
  pixelRatio: number;
  exportWidth: number;
  exportHeight: number;
  family: FormatFamily;
  defaultExports: ExportKind[];
  transparent?: boolean;
  dpiLabel: string;
}

export function mmToCssPx(mm: number): number {
  return Math.round((mm / 25.4) * CSS_DPI);
}

export function cssPxToMm(px: number): number {
  return (px / CSS_DPI) * 25.4;
}

export function mmToPt(mm: number): number {
  return (mm / 25.4) * 72;
}

function printSpec(
  id: string,
  label: string,
  widthMm: number,
  heightMm: number,
  extras: Partial<ArtboardSpec> = {}
): ArtboardSpec {
  const width = mmToCssPx(widthMm);
  const height = mmToCssPx(heightMm);
  const exportWidth = Math.round((widthMm / 25.4) * PRINT_DPI);
  const exportHeight = Math.round((heightMm / 25.4) * PRINT_DPI);
  return {
    id,
    label,
    width,
    height,
    widthMm,
    heightMm,
    targetDpi: PRINT_DPI,
    pixelRatio: exportWidth / width,
    exportWidth,
    exportHeight,
    family: 'print',
    defaultExports: ['png', 'pdf'],
    dpiLabel: `${PRINT_DPI} dpi`,
    ...extras
  };
}

function screenSpec(
  id: string,
  label: string,
  width: number,
  height: number,
  extras: Partial<ArtboardSpec> = {}
): ArtboardSpec {
  const targetDpi = extras.targetDpi ?? SCREEN_DPI;
  const pixelRatio = targetDpi / CSS_DPI;
  const exportWidth = Math.round(width * pixelRatio);
  const exportHeight = Math.round(height * pixelRatio);
  return {
    id,
    label,
    width,
    height,
    widthMm: cssPxToMm(width),
    heightMm: cssPxToMm(height),
    targetDpi,
    pixelRatio,
    exportWidth,
    exportHeight,
    family: 'screen',
    defaultExports: ['png', 'jpg'],
    dpiLabel: `${targetDpi} dpi`,
    ...extras
  };
}

export const formats = {
  a4: printSpec('a4', 'A4 · 210 × 297 mm', 210, 297),
  a4Landscape: printSpec('a4Landscape', 'A4 landscape · 297 × 210 mm', 297, 210),
  /** Standard business card · 3.5 × 2 in · 300 dpi. */
  card: printSpec('card', '3.5 × 2 in · 88.9 × 50.8 mm', 88.9, 50.8),
  cardBleed: printSpec('cardBleed', '3.5 × 2 in + 3 mm bleed · 94.9 × 56.8 mm', 94.9, 56.8),
  /** @deprecated Alias of card — kept for older references. */
  cardUs: printSpec('cardUs', '3.5 × 2 in · 88.9 × 50.8 mm', 88.9, 50.8),
  cardUsBleed: printSpec('cardUsBleed', '3.5 × 2 in + 3 mm bleed · 94.9 × 56.8 mm', 94.9, 56.8),
  slide: screenSpec('slide', 'Slide · 1280 × 720 px', 1280, 720, {
    defaultExports: ['png', 'pdf'],
    targetDpi: SCREEN_DPI
  }),
  linkedIn: screenSpec('linkedIn', 'LinkedIn link post · 1200 × 627 px', 1200, 627),
  square: screenSpec('square', 'Feed post · 1080 × 1080 px', 1080, 1080),
  /** Facebook Page Cover @2× · 820 × 312 @1×. */
  fbCover: screenSpec('fbCover', 'Facebook cover · 1640 × 624 px', 1640, 624),
  /** X / Twitter profile header. */
  xHeader: screenSpec('xHeader', 'X header · 1500 × 500 px', 1500, 500),
  /** Instagram / Facebook / unified profile. */
  profileLg: screenSpec('profileLg', 'Profile · 1080 × 1080 px', 1080, 1080),
  /** X profile quality. */
  profileMd: screenSpec('profileMd', 'Profile · 800 × 800 px', 800, 800),
  /** Google Business Profile avatar. */
  profileGoogle: screenSpec('profileGoogle', 'Google profile · 720 × 720 px', 720, 720),
  /** Google Business Profile cover. */
  googleCover: screenSpec('googleCover', 'Google cover · 1080 × 608 px', 1080, 608),
  /** Instagram highlight cover. */
  highlight: screenSpec('highlight', 'IG highlight · 1080 × 1080 px', 1080, 1080),
  /** Master cover direction canvas. */
  masterCover: screenSpec('masterCover', 'Master cover · 1920 × 640 px', 1920, 640),
  newsletter: screenSpec('newsletter', 'Email · 600 px column', 600, 1180, {
    defaultExports: ['png']
  }),
  signature: screenSpec('signature', 'HTML signature preview', 720, 420, {
    defaultExports: []
  }),
  signatureCompact: screenSpec('signatureCompact', 'HTML signature preview', 720, 260, {
    defaultExports: []
  }),
  signatureExecutive: screenSpec('signatureExecutive', 'HTML signature preview', 720, 520, {
    defaultExports: []
  }),
  footerFull: screenSpec('footerFull', 'A4 width footer', 794, 172, {
    defaultExports: ['png']
  }),
  footerCompact: screenSpec('footerCompact', 'A4 width footer', 794, 90, {
    defaultExports: ['png']
  }),
  footerBand: screenSpec('footerBand', 'A4 width footer', 794, 120, {
    defaultExports: ['png']
  }),
  iconSheet: screenSpec('iconSheet', 'Icon sheet · 960 × 520 px', 960, 520, {
    family: 'logo',
    defaultExports: ['png'],
    transparent: true
  }),
  logoMark: screenSpec('logoMark', 'Wordmark lockup', 640, 280, {
    family: 'logo',
    defaultExports: ['png', 'svg'],
    transparent: true
  }),
  logoMarkDark: screenSpec('logoMarkDark', 'Wordmark on Primary', 640, 280, {
    family: 'logo',
    defaultExports: ['png'],
    transparent: false
  }),
  pattern: screenSpec('pattern', 'Brand pattern', 640, 280, {
    defaultExports: ['png']
  }),
  qrRow: screenSpec('qrRow', 'QR placeholders', 960, 220, {
    defaultExports: ['png']
  })
} as const satisfies Record<string, ArtboardSpec>;

export type FormatId = keyof typeof formats;

export function specLabel(spec: ArtboardSpec): string {
  return `${spec.label} · ${spec.dpiLabel}`;
}
