/**
 * NubiaGo brand mark — exact geometry from the official icon source
 * (`Downloads/NubiaGo Icon/src/components/AppIcon.tsx`).
 *
 * viewBox 0 0 1104 1104
 * — white padding frame
 * — Icon Blue gradient field (square, inset 40)
 * — gold tittle + soft glow
 * — “n” path (reads with tittle as “in”)
 */

export const ICON_BLUE_START = '#2B5FD9';
export const ICON_BLUE_END = '#1E4BB8';
/** Solid mid for swatches / CSS tokens. */
export const ICON_BLUE = '#2255C8';
export const ICON_GOLD = '#FFC857';
export const ICON_GLYPH = '#F5F5F5';

/** Exact path from the official AppIcon source. */
export const BRAND_MARK_N_PATH =
  'M220 330 L220 880 L380 880 L380 600 C380 500 440 410 580 410 C720 410 760 500 760 600 L760 880 L920 880 L920 540 C920 360 820 240 620 240 C520 240 440 290 380 370 L380 330 L220 330 Z';

export const BRAND_MARK_VIEW = { w: 1104, h: 1104 } as const;

export type BrandMarkTone = 'app' | 'onLight' | 'mono' | 'monoLight';

const glyphFill: Record<BrandMarkTone, string> = {
  app: ICON_GLYPH,
  /** Filled via gradient in BrandMark — placeholder unused for onLight. */
  onLight: ICON_BLUE_START,
  mono: '#1A1A1A',
  monoLight: '#FAFAFA'
};

const tittleFill: Record<BrandMarkTone, string> = {
  app: ICON_GOLD,
  onLight: ICON_GOLD,
  mono: '#1A1A1A',
  monoLight: '#FAFAFA'
};

type BrandMarkProps = {
  size?: number;
  tone?: BrandMarkTone;
  className?: string;
  title?: string;
  /** Unique suffix so gradient ids do not collide when many icons render. */
  uid?: string;
};

/**
 * Glyph only (tittle + n) — transparent ground.
 * onLight uses Icon Blue gradient (#2B5FD9 → #1E4BB8) + Icon Gold tittle.
 */
export function BrandMark({
  size = 128,
  tone = 'onLight',
  className = '',
  title = 'NubiaGo',
  uid = 'mark'
}: BrandMarkProps) {
  const t = tittleFill[tone];
  const gradId = `markGlyphGrad-${uid}`;
  const useIconGradient = tone === 'onLight';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${BRAND_MARK_VIEW.w} ${BRAND_MARK_VIEW.h}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      fill="none"
    >
      {useIconGradient ? (
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={ICON_BLUE_START} />
            <stop offset="100%" stopColor={ICON_BLUE_END} />
          </linearGradient>
        </defs>
      ) : null}
      <circle cx="310" cy="200" r="85" fill={t} />
      <path
        d={BRAND_MARK_N_PATH}
        fill={useIconGradient ? `url(#${gradId})` : glyphFill[tone]}
      />
    </svg>
  );
}

type BrandMarkAppProps = {
  size?: number;
  className?: string;
  /** Include white social padding (official). */
  padded?: boolean;
  /** Soft glow behind the gold tittle (official). */
  glow?: boolean;
  uid?: string;
};

/**
 * Official app / favicon tile — exact structure from AppIcon.tsx:
 * white pad · gradient field · gold glow · gold tittle · light “n”.
 */
export function BrandMarkApp({
  size = 128,
  className = '',
  padded = true,
  glow = true,
  uid = 'ng'
}: BrandMarkAppProps) {
  const gradId = `bgGradient-${uid}`;
  const shadowId = `innerShadow-${uid}`;
  const glowId = `tittleGlow-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${BRAND_MARK_VIEW.w} ${BRAND_MARK_VIEW.h}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="NubiaGo app icon"
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ICON_BLUE_START} />
          <stop offset="100%" stopColor={ICON_BLUE_END} />
        </linearGradient>
        <filter id={shadowId}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
      </defs>

      {padded ? <rect width="1104" height="1104" fill="white" /> : null}
      <rect
        x={padded ? 40 : 0}
        y={padded ? 40 : 0}
        width={padded ? 1024 : 1104}
        height={padded ? 1024 : 1104}
        fill={`url(#${gradId})`}
        filter={`url(#${shadowId})`}
      />
      {glow ? (
        <circle
          cx="310"
          cy="200"
          r="85"
          fill={ICON_GOLD}
          opacity="0.15"
          filter={`url(#${glowId})`}
        />
      ) : null}
      <circle cx="310" cy="200" r="85" fill={ICON_GOLD} />
      <path d={BRAND_MARK_N_PATH} fill={ICON_GLYPH} />
    </svg>
  );
}

/**
 * Mark on Icon Blue gradient field (#2B5FD9 → #1E4BB8) — full-bleed, no white pad.
 * For navy / dark UI chrome when the padded app tile is not required.
 */
export function BrandMarkAppPrimary({
  size = 128,
  className = '',
  uid = 'ngp',
  glow = true
}: {
  size?: number;
  className?: string;
  uid?: string;
  glow?: boolean;
}) {
  const gradId = `bgGradient-${uid}`;
  const glowId = `tittleGlow-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${BRAND_MARK_VIEW.w} ${BRAND_MARK_VIEW.h}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="NubiaGo mark on Icon Blue"
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ICON_BLUE_START} />
          <stop offset="100%" stopColor={ICON_BLUE_END} />
        </linearGradient>
        {glow ? (
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
          </filter>
        ) : null}
      </defs>
      <rect width="1104" height="1104" fill={`url(#${gradId})`} />
      {glow ? (
        <circle
          cx="310"
          cy="200"
          r="85"
          fill={ICON_GOLD}
          opacity="0.15"
          filter={`url(#${glowId})`}
        />
      ) : null}
      <circle cx="310" cy="200" r="85" fill={ICON_GOLD} />
      <path d={BRAND_MARK_N_PATH} fill={ICON_GLYPH} />
    </svg>
  );
}
