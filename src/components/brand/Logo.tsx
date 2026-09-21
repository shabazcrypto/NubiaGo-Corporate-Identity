import React from 'react';
import { company } from '../../data/brand';

type LogoTone = 'primary' | 'light' | 'black' | 'gold';

interface LogoProps {
  /** Cap-height-independent type size in px. Minimum permitted size is 14px. */
  size?: number;
  tone?: LogoTone;
  className?: string;
}

const toneColor: Record<LogoTone, string> = {
  primary: '#1E3A5F',
  light: '#FAFAFA',
  black: '#1A1A1A',
  gold: '#C9A227'
};

/**
 * The NubiaGo wordmark, reproduced exactly as supplied in the brand
 * guidelines: lowercase "nubiago", Inter Extra Bold, tightened tracking.
 * Never re-letter, outline, rotate, stretch or add effects to this mark.
 */
export function Logo({ size = 24, tone = 'primary', className = '' }: LogoProps) {
  return (
    <span
      className={`ng-wordmark inline-block select-none ${className}`}
      style={{ fontSize: size, color: toneColor[tone] }}>
      
      nubiago
    </span>);

}

/**
 * The endorsement line. NubiaGo is a brand of AshBak Industries.
 * It belongs in FOOTER TEXT ONLY — it is never locked to the wordmark, never
 * set directly beneath it, and never treated as part of the logo.
 */
export function Endorsement({
  tone = 'light',
  size = 8.5,
  short = false




}: {tone?: 'light' | 'dark';size?: number;short?: boolean;}) {
  return (
    <span
      style={{
        fontSize: size,
        letterSpacing: '0.14em',
        fontWeight: 500,
        textTransform: 'uppercase',
        color: tone === 'light' ? '#737373' : 'rgba(250,250,250,0.6)'
      }}>
      
      {short ? company.endorsementShort : company.endorsement}
    </span>);

}

/** Wordmark with the positioning descriptor — for covers and formal documents. */
export function LogoLockup({
  size = 24,
  tone = 'primary',
  descriptor = company.positioning
}: LogoProps & {descriptor?: string;}) {
  const muted = tone === 'light' ? 'rgba(250,250,250,0.72)' : '#737373';
  return (
    <div>
      <Logo size={size} tone={tone} />
      <div
        className="mt-1.5 uppercase"
        style={{ fontSize: Math.max(7, size * 0.28), letterSpacing: '0.16em', fontWeight: 500, color: muted }}>
        
        {descriptor}
      </div>
    </div>);

}

/**
 * The accent rule: one hairline in Primary. Kept deliberately plain — the
 * identity is carried by type, space and alignment, not by ornament.
 */
export function BrandRule({
  width = 96,
  thickness = 2,
  tone = 'primary'




}: {width?: number | string;thickness?: number;tone?: 'primary' | 'gold' | 'light';}) {
  const color = tone === 'gold' ? '#C9A227' : tone === 'light' ? 'rgba(250,250,250,0.35)' : '#1E3A5F';
  // Capped at 2 px so the rule stays a hairline everywhere it is used.
  return <div style={{ width, height: Math.min(thickness, 2), backgroundColor: color }} aria-hidden="true" />;
}