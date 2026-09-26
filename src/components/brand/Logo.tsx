import { useCompany, useBrandSettings } from '@/lib/brand-context';

type LogoTone = 'primary' | 'light' | 'black' | 'gold';

interface LogoProps {
  /** Cap-height-independent type size in px. Minimum permitted size is 14px. */
  size?: number;
  tone?: LogoTone;
  className?: string;
}

export const toneColor: Record<LogoTone, string> = {
  primary: '#000000',
  light: '#FFFFFF',
  black: '#000000',
  gold: '#FFFFFF'
};

/**
 * The AshBak wordmark: lowercase "ashbak", Inter Tight Medium, tightened tracking.
 */
export function Logo({ size = 24, tone = 'primary', className = '' }: LogoProps) {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  const word = isAshBak ? 'ashbak' : 'nubiago';
  const color = isAshBak
    ? tone === 'light' || tone === 'gold' ? '#FFFFFF' : '#000000'
    : tone === 'primary' ? '#1E3A5F' : tone === 'light' ? '#FAFAFA' : tone === 'black' ? '#1A1A1A' : '#C9A227';
  const weight = isAshBak ? 500 : 800;
  const tracking = isAshBak ? '-0.02em' : '-0.035em';
  const cls = isAshBak ? 'ab-wordmark' : 'ng-wordmark';
  return (
    <span
      className={`${cls} inline-block select-none ${className}`}
      style={{ fontSize: size, color, fontWeight: weight, letterSpacing: tracking, lineHeight: 1 }}
    >
      {word}
    </span>
  );
}

export function Endorsement({
  tone = 'light',
  size = 8.5,
  short = false
}: {
  tone?: 'light' | 'dark';
  size?: number;
  short?: boolean;
}) {
  const company = useCompany();
  return (
    <span
      style={{
        fontSize: size,
        letterSpacing: '0.14em',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: tone === 'light' ? '#737373' : 'rgba(255,255,255,0.6)'
      }}
    >
      {short ? company.endorsementShort : company.endorsement}
    </span>
  );
}

export function LogoLockup({
  size = 24,
  tone = 'primary',
  descriptor
}: LogoProps & { descriptor?: string }) {
  const company = useCompany();
  const muted = tone === 'light' ? 'rgba(255,255,255,0.72)' : '#737373';
  return (
    <div>
      <Logo size={size} tone={tone} />
      <div
        className="mt-1.5 uppercase"
        style={{ fontSize: Math.max(7, size * 0.28), letterSpacing: '0.16em', fontWeight: 500, color: muted }}
      >
        {descriptor ?? company.positioning}
      </div>
    </div>
  );
}

export function BrandRule({
  width = 96,
  thickness = 2,
  tone = 'primary'
}: {
  width?: number | string;
  thickness?: number;
  tone?: 'primary' | 'gold' | 'light' | 'secondary';
}) {
  const { brand } = useBrandSettings();
  const color = tone === 'light'
    ? 'rgba(255,255,255,0.35)'
    : tone === 'secondary' || (tone === 'gold' && brand === 'ashbak')
      ? '#FFFFFF'
      : tone === 'gold'
        ? '#C9A227'
        : brand === 'ashbak'
          ? '#000000'
          : '#1E3A5F';
  return <div style={{ width, height: Math.min(thickness, 2), backgroundColor: color }} aria-hidden="true" />;
}