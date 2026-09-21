import React from 'react';
import { Logo, BrandRule } from '../brand/Logo';
import { company } from '../../data/brand';
import { type LineItem } from '../../data/commercial';

export function DocumentTypeHeader({
  type,
  reference,
  meta,
  tone = 'light'





}: {type: string;reference: string;meta: [string, string][];tone?: 'light' | 'dark';}) {
  if (tone === 'dark') {
    return (
      <header className="-mx-16 -mt-0 bg-brand px-16 pb-7 pt-10">
        <div className="flex items-start justify-between">
          <Logo size={24} tone="light" />
          <div className="text-right">
            <div className="text-[22px] font-bold uppercase tracking-[0.08em] text-white">{type}</div>
            <div className="mt-1 text-[10px] text-white/70">{reference}</div>
          </div>
        </div>
        <div className="mt-7 grid grid-cols-4 gap-6 border-t border-white/15 pt-5">
          {meta.map(([label, value]) =>
          <div key={label}>
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand-gold">{label}</div>
              <div className="mt-1 text-[10.5px] font-medium text-white">{value}</div>
            </div>
          )}
        </div>
      </header>);

  }

  return (
    <header className="pt-10">
      <div className="flex items-start justify-between">
        <div>
          <Logo size={24} />
          <div className="mt-5 text-[9px] leading-[1.7] text-gray-700">
            <div className="font-semibold text-ink">{company.legalName}</div>
            <div>
              {company.addressLine1}, {company.addressLine2}, {company.country}
            </div>
            <div>
              {company.registration} · {company.taxId}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[20px] font-bold uppercase tracking-[0.08em] text-brand">{type}</div>
          <div className="mt-1 text-[10px] text-gray-500">{reference}</div>
        </div>
      </div>
      <div className="mt-6">
        <BrandRule width="100%" thickness={1} />
      </div>
      <div className="mt-5 grid grid-cols-4 gap-6">
        {meta.map(([label, value]) =>
        <div key={label}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[10.5px] font-medium text-ink">{value}</div>
          </div>
        )}
      </div>
    </header>);

}

export function PartyBlocks({
  left,
  right



}: {left: {label: string;lines: string[];};right: {label: string;lines: string[];};}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-6">
      {[left, right].map((block) =>
      <div key={block.label} className="bg-gray-50 px-5 py-4">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">{block.label}</div>
          <div className="mt-2 space-y-0.5 text-[10px] leading-[1.7] text-gray-700">
            {block.lines.map((line, index) =>
          <div key={line} className={index === 0 ? 'text-[11px] font-semibold text-ink' : undefined}>
                {line}
              </div>
          )}
          </div>
        </div>
      )}
    </div>);

}

export function LineItemsTable({ items, currency }: {items: LineItem[];currency: string;}) {
  return (
    <table className="mt-8 w-full border-collapse text-[9.5px]">
      <thead>
        <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
          <th className="w-[12%] px-3 py-2.5 font-medium">Code</th>
          <th className="px-3 py-2.5 font-medium">Description</th>
          <th className="w-[9%] px-3 py-2.5 text-right font-medium">Qty</th>
          <th className="w-[10%] px-3 py-2.5 font-medium">Unit</th>
          <th className="w-[13%] px-3 py-2.5 text-right font-medium">Unit price</th>
          <th className="w-[14%] px-3 py-2.5 text-right font-medium">Total {currency}</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) =>
        <tr key={item.code}>
            <td className="border-b border-gray-200 px-3 py-3 align-top font-medium tabular-nums text-gray-500">
              {item.code}
            </td>
            <td className="border-b border-gray-200 px-3 py-3 align-top">
              <div className="text-[10.5px] font-semibold text-ink">{item.description}</div>
              <div className="mt-0.5 text-[9px] text-gray-500">{item.detail}</div>
            </td>
            <td className="border-b border-gray-200 px-3 py-3 text-right align-top tabular-nums text-gray-700">
              {item.qty}
            </td>
            <td className="border-b border-gray-200 px-3 py-3 align-top text-gray-700">{item.unit}</td>
            <td className="border-b border-gray-200 px-3 py-3 text-right align-top tabular-nums text-gray-700">
              {item.unitPrice}
            </td>
            <td className="border-b border-gray-200 px-3 py-3 text-right align-top font-semibold tabular-nums text-ink">
              {item.total}
            </td>
          </tr>
        )}
      </tbody>
    </table>);

}

export function TotalsBlock({
  rows,
  grandLabel,
  grand,
  currency,
  emphasis = 'primary'






}: {rows: [string, string][];grandLabel: string;grand: string;currency: string;emphasis?: 'primary' | 'sand';}) {
  return (
    <div className="ml-auto mt-5 w-[46%]">
      <table className="w-full border-collapse text-[10px]">
        <tbody>
          {rows.map(([label, value]) =>
          <tr key={label}>
              <td className="border-b border-gray-200 py-2 text-gray-500">{label}</td>
              <td className="border-b border-gray-200 py-2 text-right tabular-nums text-gray-700">{value}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        className={`mt-2 flex items-center justify-between border-t-2 px-4 py-3 ${
        emphasis === 'primary' ? 'border-brand bg-white text-ink' : 'border-brand-gold bg-brand-sand text-ink'}`
        }>
        
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">{grandLabel}</span>
        <span className="text-[16px] font-bold tabular-nums">
          {currency} {grand}
        </span>
      </div>
    </div>);

}

export function TermsGrid({ items, columns = 2 }: {items: [string, string][];columns?: number;}) {
  return (
    <div className={`mt-7 grid gap-x-8 gap-y-3 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {items.map(([label, value]) =>
      <div key={label} className="border-t border-gray-200 pt-2">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
          <div className="mt-0.5 text-[10px] text-ink">{value}</div>
        </div>
      )}
    </div>);

}

export function SignatureRow({ left = 'For NubiaGo', right = 'Accepted by customer' }: {left?: string;right?: string;}) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-10">
      {[left, right].map((label) =>
      <div key={label}>
          <div className="h-10 border-b border-gray-700" />
          <div className="mt-1.5 text-[8.5px] uppercase tracking-[0.12em] text-gray-500">{label}</div>
          <div className="mt-0.5 text-[8.5px] text-gray-500">Name · Title · Date</div>
        </div>
      )}
    </div>);

}