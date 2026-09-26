/**
 * Official NubiaGo app icon — white “n” + gold tittle on Icon Blue.
 * Path scaled from the master 1104 artboard to match
 * public/brand/icon/nubiago-icon-256.png.
 */

export const NUBIAGO_ICON = {
  blueStart: '#2B5FD9',
  blueEnd: '#1E4BB8',
  gold: '#FFC857',
  glyph: '#F5F5F5',
  markGlyph: '#2B5FD9'
} as const;

/**
 * Master geometry (viewBox 0 0 1104 1104):
 * circle cx=310 cy=200 r=85
 * n path from the official icon source.
 */
const MASTER = 1104;
const N_PATH =
  'M220 330 L220 880 L380 880 L380 600 C380 500 440 410 580 410 C720 410 760 500 760 600 L760 880 L920 880 L920 540 C920 360 820 240 620 240 C520 240 440 290 380 370 L380 330 L220 330 Z';

type NubiaGoIconProps = {
  size?: number;
  className?: string;
  /** `app` = full blue tile; `mark` = glyph only on transparent (On Light). */
  variant?: 'app' | 'mark';
  title?: string;
  uid?: string;
};

export function NubiaGoIcon({
  size = 128,
  className = '',
  variant = 'app',
  title = 'NubiaGo',
  uid = 'ng'
}: NubiaGoIconProps) {
  const gid = `ng-bg-${uid}`;
  const isApp = variant === 'app';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${MASTER} ${MASTER}`}
      className={className}
      role="img"
      aria-label={title}
      style={{ display: 'block', flexShrink: 0 }}
    >
      {isApp ? (
        <>
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={NUBIAGO_ICON.blueStart} />
              <stop offset="100%" stopColor={NUBIAGO_ICON.blueEnd} />
            </linearGradient>
          </defs>
          <rect width={MASTER} height={MASTER} fill={`url(#${gid})`} />
          <circle cx="310" cy="200" r="85" fill={NUBIAGO_ICON.gold} />
          <path d={N_PATH} fill={NUBIAGO_ICON.glyph} />
        </>
      ) : (
        <>
          <circle cx="310" cy="200" r="85" fill={NUBIAGO_ICON.gold} />
          <path d={N_PATH} fill={NUBIAGO_ICON.markGlyph} />
        </>
      )}
    </svg>
  );
}

export function NubiaGoIconApp({
  size = 128,
  className = '',
  uid = 'app'
}: {
  size?: number;
  className?: string;
  uid?: string;
}) {
  return <NubiaGoIcon size={size} className={className} variant="app" uid={uid} />;
}

export function NubiaGoIconMark({
  size = 128,
  className = '',
  uid = 'mark'
}: {
  size?: number;
  className?: string;
  uid?: string;
}) {
  return <NubiaGoIcon size={size} className={className} variant="mark" uid={uid} />;
}
