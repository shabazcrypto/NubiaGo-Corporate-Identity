import React from 'react';
import { Logo, BrandRule } from '../brand/Logo';
import { company } from '../../data/brand';

export const SLIDE = { width: 1280, height: 720 };
export const SLIDE_MARGIN = 64;

interface SlideShellProps {
  eyebrow?: string;
  title?: string;
  lead?: string;
  number: string;
  children: React.ReactNode;
  tint?: 'white' | 'sand' | 'gray';
}

const tintMap = { white: '#FFFFFF', sand: '#F5F0E8', gray: '#FAFAFA' };

/** Standard content slide: fixed 64 px margins, heading block, footer bar. */
export function SlideShell({ eyebrow, title, lead, number, children, tint = 'white' }: SlideShellProps) {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ background: tintMap[tint], padding: SLIDE_MARGIN, paddingBottom: 40 }}>
      
      {title ?
      <header className="mb-8 shrink-0">
          {eyebrow ?
        <div className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-light">
              {eyebrow}
            </div> :
        null}
          <h2 className="text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">{title}</h2>
          {lead ? <p className="mt-3 max-w-[760px] text-[15px] leading-[1.7] text-gray-700">{lead}</p> : null}
        </header> :
      null}

      <div className="min-h-0 flex-1">{children}</div>

      <SlideFooter number={number} />
    </div>);

}

export function SlideFooter({ number, tone = 'light' }: {number: string;tone?: 'light' | 'dark';}) {
  const color = tone === 'light' ? 'text-gray-500' : 'text-white/55';
  const border = tone === 'light' ? 'border-gray-200' : 'border-white/15';
  return (
    <footer className={`mt-8 flex shrink-0 items-center justify-between border-t pt-3.5 ${border}`}>
      <Logo size={13} tone={tone === 'light' ? 'primary' : 'light'} />
      <div className={`flex items-center gap-5 text-[10px] ${color}`}>
        <span>{company.endorsement}</span>
        <span>{company.website}</span>
        <span className="font-medium tabular-nums">{number}</span>
      </div>
    </footer>);

}

/** Reversed slide used for the cover, section dividers and key statements. */
export function DarkSlide({ children, number }: {children: React.ReactNode;number?: string;}) {
  return (
    <div className="flex h-full w-full flex-col bg-brand" style={{ padding: SLIDE_MARGIN, paddingBottom: 40 }}>
      <div className="min-h-0 flex-1">{children}</div>
      {number ? <SlideFooter number={number} tone="dark" /> : null}
    </div>);

}

export function SlideRule() {
  return <BrandRule width={72} thickness={2} />;
}

export function StatBlock({ value, label, tone = 'light' }: {value: string;label: string;tone?: 'light' | 'dark';}) {
  return (
    <div>
      <div
        className={`text-[42px] font-bold leading-none tracking-[-0.03em] ${tone === 'light' ? 'text-brand' : 'text-white'}`}>
        
        {value}
      </div>
      <div
        className={`mt-2.5 text-[11px] font-medium uppercase tracking-[0.12em] ${
        tone === 'light' ? 'text-gray-500' : 'text-white/60'}`
        }>
        
        {label}
      </div>
    </div>);

}