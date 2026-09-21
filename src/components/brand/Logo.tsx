import { useCompany } from '@/lib/brand-context';

type LogoTone = 'primary' | 'light' | 'black' | 'gold';

interface LogoProps {
  /** Cap-height-independent type size in px. Minimum permitted size is 14px. */
  size?: number;
  tone?: LogoTone;
  className?: string;
}

export const toneColor: Record<LogoTone, string> = {
  primary: '#1E3A5F',
  light: '#FAFAFA',
  black: '#1A1A1A',
  gold: '#C9A227'
};

/**
 * The NubiaGo wordmark, reproduced exactly as supplied in the brand
 * guidelines: lowercase "nubiago", Inter Extra Bold, tightened tracking.
 */
export function Logo({ size = 24, tone = 'primary', className = '' }: LogoProps) {
  return (
    <span
      className={`ng-wordmark inline-block select-none ${className}`}
      style={{ fontSize: size, color: toneColor[tone] }}
    >
      nubiago
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
        color: tone === 'light' ? '#737373' : 'rgba(250,250,250,0.6)'
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
  const muted = tone === 'light' ? 'rgba(250,250,250,0.72)' : '#737373';
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
  tone?: 'primary' | 'gold' | 'light';
}) {
  const color = tone === 'gold' ? '#C9A227' : tone === 'light' ? 'rgba(250,250,250,0.35)' : '#1E3A5F';
  return <div style={{ width, height: Math.min(thickness, 2), backgroundColor: color }} aria-hidden="true" />;
}
