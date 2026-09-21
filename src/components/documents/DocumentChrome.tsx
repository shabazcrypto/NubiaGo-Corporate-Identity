import React from 'react';
import { Logo, BrandRule } from '../brand/Logo';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';

export const A4 = { width: formats.a4.width, height: formats.a4.height };
export const A4_LANDSCAPE = { width: formats.a4Landscape.width, height: formats.a4Landscape.height };
export const MARGIN = 64;

type HeaderVariant = 'full' | 'minimal' | 'continuation';

interface DocumentHeaderProps {
  variant?: HeaderVariant;
  /** Right-hand slot: document type, reference, or date block. */
  meta?: React.ReactNode;
  documentTitle?: string;
}

export function DocumentHeader({ variant = 'full', meta, documentTitle }: DocumentHeaderProps) {
  const company = useCompany();
  if (variant === 'continuation') {
    return (
      <header
        className="flex items-baseline justify-between border-b border-gray-200 pb-3"
        style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingTop: 40, marginLeft: -MARGIN, marginRight: -MARGIN }}>
        
        <Logo size={15} />
        <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-gray-500">
          {documentTitle ?? 'Continuation'}
        </span>
      </header>);

  }

  if (variant === 'minimal') {
    return (
      <header className="flex items-start justify-between pt-9">
        <Logo size={21} tone="black" />
        <div className="text-right text-[9px] leading-[1.7] text-gray-700">
          {meta ??
          <>
              <div>{company.website}</div>
              <div>{company.email}</div>
              <div>{company.phone}</div>
            </>
          }
        </div>
      </header>);

  }

  return (
    <header className="relative pt-10">
      <div className="flex items-start justify-between">
        <Logo size={26} />
        <div className="text-right">
          {meta ??
          <div className="text-[9.5px] leading-[1.75] text-gray-700">
              <div className="font-semibold text-ink">{company.legalName}</div>
              <div>
                {company.addressLine1}, {company.addressLine2}
              </div>
              <div>
                {company.country} · {company.phone}
              </div>
            </div>
          }
        </div>
      </div>
      <div className="mt-5">
        <BrandRule width="100%" thickness={1} />
      </div>
    </header>);

}

interface DocumentFooterProps {
  variant?: 'full' | 'minimal';
  page?: string;
  reference?: string;
  /** Telephone is carried on letterheads only — never in a general footer. */
  showPhone?: boolean;
}

export function DocumentFooter({ variant = 'full', page = '1 / 1', reference, showPhone = false }: DocumentFooterProps) {
  const company = useCompany();
  if (variant === 'minimal') {
    return (
      <footer className="flex items-baseline justify-between border-t border-gray-200 pt-3 text-[8.5px] text-gray-500">
        <span>
          {company.legalName} · {company.website} · {company.email}
          {showPhone ? ` · ${company.phone}` : ''} · {company.endorsement}
        </span>
        <span className="tabular-nums">{page}</span>
      </footer>);

  }

  return (
    <footer className="border-t border-gray-200 pt-4">
      <div className="flex items-start justify-between gap-8">
        <div className="grid flex-1 grid-cols-3 gap-6 text-[8.5px] leading-[1.7] text-gray-700">
          <div>
            <div className="mb-1 font-medium uppercase tracking-[0.12em] text-gray-500">Office</div>
            <div>{company.addressLine1}</div>
            <div>{company.addressLine2}</div>
            <div>{company.country}</div>
          </div>
          <div>
            <div className="mb-1 font-medium uppercase tracking-[0.12em] text-gray-500">Contact</div>
            {showPhone ? <div>{company.phone}</div> : null}
            <div>{company.email}</div>
            <div>{company.website}</div>
          </div>
          <div>
            <div className="mb-1 font-medium uppercase tracking-[0.12em] text-gray-500">Company</div>
            <div>{company.legalName}</div>
            <div>{company.registration}</div>
            <div>{company.taxId}</div>
          </div>
        </div>
        <div className="shrink-0 text-right text-[8.5px] leading-[1.7] text-gray-500">
          {reference ? <div>{reference}</div> : null}
          <div className="tabular-nums">Page {page}</div>
        </div>
      </div>
      <div className="mt-3 border-t border-gray-200 pt-2 text-[8px] uppercase tracking-[0.14em] text-gray-500">
        {company.endorsement}
      </div>
    </footer>);

}

/** Standard A4 body frame: fixed margins, header at top, footer pinned bottom. */
export function A4Page({
  header,
  footer,
  children,
  tint





}: {header?: React.ReactNode;footer?: React.ReactNode;children: React.ReactNode;tint?: string;}) {
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingBottom: 36, background: tint ?? '#FFFFFF' }}>
      
      {header}
      <div className="min-h-0 flex-1">{children}</div>
      {footer}
    </div>);

}