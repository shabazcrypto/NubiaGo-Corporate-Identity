import type { CSSProperties, ReactNode } from 'react';
import { Logo, BrandRule } from '@/components/brand/Logo';

export type CoverTone = 'navy' | 'sand' | 'ink' | 'clear';

const RAIL: Record<Exclude<CoverTone, 'clear'>, string> = {
  navy: 'linear-gradient(90deg, rgba(30,58,95,0) 0%, rgba(30,58,95,0.88) 14%, #1E3A5F 42%)',
  sand: 'linear-gradient(90deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.92) 14%, #F5F0E8 42%)',
  ink: 'linear-gradient(90deg, rgba(15,18,24,0) 0%, rgba(15,18,24,0.9) 14%, #0F1218 42%)'
};

const BAND: Record<'navy' | 'sand' | 'ink', string> = {
  navy: 'linear-gradient(0deg, rgba(30,58,95,0.97) 0%, rgba(30,58,95,0.82) 55%, transparent 100%)',
  sand: 'linear-gradient(0deg, rgba(245,240,232,0.98) 0%, rgba(245,240,232,0.85) 55%, transparent 100%)',
  ink: 'linear-gradient(0deg, rgba(15,18,24,0.96) 0%, rgba(15,18,24,0.75) 55%, transparent 100%)'
};

export function coverPad(width: number, height: number) {
  return Math.round(Math.min(height * 0.1, width * 0.032, 56));
}

export function coverLogo(width: number) {
  return Math.round(Math.max(18, Math.min(30, width * 0.014)));
}

export function AliveFrame({
  width,
  height,
  hero,
  focus = 'left',
  tone = 'navy',
  mode = 'rail',
  rail = 0.4,
  children
}: {
  width: number;
  height: number;
  hero: string;
  focus?: string;
  tone?: CoverTone;
  mode?: 'rail' | 'band' | 'split' | 'veil';
  rail?: number;
  children: ReactNode;
}) {
  const style: CSSProperties = { width, height };

  return (
    <div className="relative overflow-hidden" style={style}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: focus,
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Subtle depth wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            tone === 'sand' || tone === 'clear'
              ? 'radial-gradient(80% 100% at 30% 40%, transparent 0%, rgba(30,58,95,0.12) 100%)'
              : 'radial-gradient(80% 100% at 25% 40%, transparent 0%, rgba(0,0,0,0.28) 100%)'
        }}
      />
      {mode === 'rail' && tone !== 'clear' ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0"
          style={{ width: `${Math.round(rail * 100)}%`, background: RAIL[tone] }}
        />
      ) : null}
      {mode === 'band' && tone !== 'clear' ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{ height: '52%', background: BAND[tone] }}
        />
      ) : null}
      {mode === 'split' && tone !== 'clear' ? (
        <div
          className="pointer-events-none absolute inset-y-0 right-0"
          style={{
            width: `${Math.round(rail * 100)}%`,
            background: tone === 'navy' ? '#1E3A5F' : tone === 'sand' ? '#F5F0E8' : '#0F1218'
          }}
        />
      ) : null}
      {mode === 'veil' ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              tone === 'sand'
                ? 'linear-gradient(105deg, rgba(245,240,232,0.15) 0%, rgba(245,240,232,0.55) 48%, rgba(245,240,232,0.94) 100%)'
                : 'linear-gradient(105deg, rgba(15,18,24,0.15) 0%, rgba(30,58,95,0.55) 48%, rgba(30,58,95,0.92) 100%)'
          }}
        />
      ) : null}
      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  );
}

export function Rail({
  width,
  height,
  pad,
  rail = 0.4,
  children
}: {
  width: number;
  height: number;
  pad: number;
  rail?: number;
  children: ReactNode;
}) {
  return (
    <div
      className="absolute bottom-0 right-0 top-0 flex flex-col justify-between"
      style={{
        width: width * rail,
        height,
        padding: `${pad}px ${pad}px ${pad}px ${Math.round(pad * 0.65)}px`
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
        light ? 'text-brand-gold' : 'text-brand-gold'
      }`}
    >
      {children}
    </span>
  );
}

export function CoverMark({
  size,
  light = false
}: {
  size: number;
  light?: boolean;
}) {
  return (
    <div className="flex justify-end">
      <Logo size={size} tone={light ? 'light' : 'primary'} />
    </div>
  );
}

export function CoverRule({ width }: { width: number }) {
  return (
    <div className="mt-4 flex justify-end">
      <BrandRule width={width} thickness={1.5} tone="gold" />
    </div>
  );
}
