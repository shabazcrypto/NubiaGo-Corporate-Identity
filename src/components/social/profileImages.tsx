import { Logo } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';
import { HERO } from '@/components/social/heroCatalog';

export interface ProfileProps {
  size?: number;
}

function markFor(canvas: number) {
  return Math.round(Math.max(36, Math.min(72, canvas * 0.085)));
}

/** Logo on Primary — readable when cropped to tiny avatars. */
export function ProfilePrimary({ size = formats.profileLg.width }: ProfileProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-brand"
      style={{ width: size, height: size }}
    >
      <Logo size={markFor(size)} tone="light" />
    </div>
  );
}

/** Logo on Warm Sand. */
export function ProfileSand({ size = formats.profileLg.width }: ProfileProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center bg-brand-sand"
      style={{ width: size, height: size }}
    >
      <Logo size={markFor(size)} />
    </div>
  );
}

/**
 * Logo only on transparent artboard.
 * Pair with AssetFrame transparent / formats that set transparent: true.
 */
export function ProfileTransparent({ size = formats.profileLg.width }: ProfileProps) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{ width: size, height: size, backgroundColor: 'transparent' }}
    >
      <Logo size={markFor(size)} />
    </div>
  );
}

function PhotoProfile({
  size,
  hero,
  focus = 'center'
}: ProfileProps & { hero: string; focus?: string }) {
  const s = size ?? formats.profileLg.width;
  return (
    <div className="relative overflow-hidden" style={{ width: s, height: s }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: focus
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(30,58,95,0.35) 0%, rgba(30,58,95,0.72) 100%)'
        }}
      />
      <div className="relative z-[1] flex h-full w-full items-center justify-center">
        <Logo size={markFor(s)} tone="light" />
      </div>
    </div>
  );
}

export function ProfilePortrait({ size }: ProfileProps) {
  return <PhotoProfile size={size} hero={HERO.womanCeo} focus="50% 20%" />;
}

export function ProfileMarket({ size }: ProfileProps) {
  return <PhotoProfile size={size} hero={HERO.africanMarket} focus="40% 40%" />;
}

export function ProfileLogistics({ size }: ProfileProps) {
  return <PhotoProfile size={size} hero={HERO.warehouse} focus="50% 40%" />;
}

export function ProfileTeam({ size }: ProfileProps) {
  return <PhotoProfile size={size} hero={HERO.teamMeeting} focus="45% 30%" />;
}

export const photoProfileDefs = [
  { id: 'Portrait', Component: ProfilePortrait },
  { id: 'Market', Component: ProfileMarket },
  { id: 'Logistics', Component: ProfileLogistics },
  { id: 'Team', Component: ProfileTeam }
] as const;
