import { useBrandSettings } from '@/lib/brand-context';
import { NubiaGoIcon, NubiaGoIconMark } from '@/components/brand/NubiaGoIcon';

export const BRAND_MARK_VIEW = { w: 640, h: 280 } as const;

export type BrandMarkTone = 'onLight' | 'onDark' | 'mono' | 'monoLight';

type BrandMarkProps = {
  size?: number;
  tone?: BrandMarkTone;
  className?: string;
  title?: string;
  uid?: string;
  /**
   * When true (default for NubiaGo onLight), render the official icon mark
   * instead of the wordmark. Set false to force the wordmark.
   */
  asIcon?: boolean;
};

function useWordmarkStyle() {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return {
    isAshBak,
    word: isAshBak ? 'ashbak' : 'nubiago',
    cls: isAshBak ? 'ab-wordmark' : 'ng-wordmark',
    weight: isAshBak ? 500 : 800,
    tracking: isAshBak ? '-0.02em' : '-0.035em',
    primary: isAshBak ? '#000000' : '#1E3A5F'
  };
}

/** Wordmark (or NubiaGo icon mark when tone is onLight). */
export function BrandMark({
  size = 128,
  tone = 'onLight',
  className = '',
  title = 'Brand',
  uid = 'bm',
  asIcon
}: BrandMarkProps) {
  const { word, cls, weight, tracking, primary, isAshBak } = useWordmarkStyle();
  const useIcon = asIcon ?? (!isAshBak && tone === 'onLight');

  if (useIcon) {
    return <NubiaGoIconMark size={size} className={className} uid={uid} />;
  }

  const color = tone === 'onLight' ? primary : tone === 'onDark' ? '#FFFFFF' : '#1A1A1A';
  return (
    <span
      className={`${cls} inline-block select-none ${className}`}
      style={{ fontSize: size, color, fontWeight: weight, letterSpacing: tracking, lineHeight: 1 }}
      role="img"
      aria-label={title}
    >
      {word}
    </span>
  );
}

type BrandMarkAppProps = {
  size?: number;
  className?: string;
  padded?: boolean;
  uid?: string;
  glow?: boolean;
};

/**
 * App / favicon tile.
 * NubiaGo → official Icon Blue “n” + gold tittle.
 * AshBak → wordmark / monogram on Primary.
 */
export function BrandMarkApp({
  size = 128,
  className = '',
  padded = true,
  uid = 'app',
  glow = false
}: BrandMarkAppProps) {
  void glow;
  const { word, cls, weight, tracking, primary, isAshBak } = useWordmarkStyle();

  if (!isAshBak) {
    return <NubiaGoIcon size={size} className={className} variant="app" uid={uid} />;
  }

  const inset = Math.max(3, Math.round(size * 0.24));
  const inner = Math.max(4, size - inset * 2);
  const useMono = size < 48;
  const glyph = useMono ? word.charAt(0) : word;
  const charEm = useMono ? 0.72 : 0.62;
  const fontSize = useMono
    ? Math.max(7, Math.floor(inner * 0.56))
    : Math.max(5, Math.floor(inner / (glyph.length * charEm)));
  const letterSpacing = useMono ? '0' : tracking;

  return (
    <div
      className={`box-border flex items-center justify-center overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: padded ? primary : 'transparent',
        padding: inset,
        boxShadow:
          padded && size >= 32
            ? `inset 0 0 0 ${Math.max(1, Math.round(size * 0.02))}px rgba(255,255,255,0.12)`
            : undefined
      }}
    >
      <span
        className={`${cls} block select-none text-center`}
        style={{
          fontSize,
          color: '#FFFFFF',
          fontWeight: weight,
          letterSpacing,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          maxWidth: '100%'
        }}
      >
        {glyph}
      </span>
    </div>
  );
}

export function BrandMarkAppPrimary({
  size = 128,
  className = '',
  uid = 'abp',
  glow = false
}: {
  size?: number;
  className?: string;
  uid?: string;
  glow?: boolean;
}) {
  return <BrandMarkApp size={size} className={className} padded uid={uid} glow={glow} />;
}
