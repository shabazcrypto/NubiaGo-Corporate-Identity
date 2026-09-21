import React from 'react';
import { CheckIcon } from 'lucide-react';
import { Logo, BrandRule } from '../brand/Logo';
import { SlideShell, DarkSlide, StatBlock, SLIDE_MARGIN } from './SlideChrome';
import { NG_STROKE, iconByKey } from '../brand/iconSystem';
import { company } from '../../data/brand';

export function CoverSlide() {
  return (
    <DarkSlide>
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <Logo size={26} tone="light" />
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">December 2024</span>
        </div>
        <div className="max-w-[820px]">
          <BrandRule width={96} thickness={2} tone="gold" />
          <h1 className="mt-8 text-[56px] font-bold leading-[1.05] tracking-[-0.035em] text-white">
            Infrastructure for African commerce
          </h1>
          <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-white/70">
            A trusted, modern platform connecting buyers and sellers across the continent.
          </p>
        </div>
        <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[12px] text-white/55">
          <span>Prepared for [Client name] · Confidential</span>
          <span>
            {company.endorsement} · {company.website}
          </span>
        </div>
      </div>
    </DarkSlide>);

}

export function SectionDividerSlide() {
  return (
    <DarkSlide number="02">
      <div className="flex h-full flex-col justify-center">
        <div className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Section 02</div>
        <h1 className="mt-4 text-[46px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
          How the platform works
        </h1>
        <p className="mt-4 max-w-[560px] text-[15px] leading-[1.7] text-white/65">
          Onboarding, verification, settlement and reconciliation as a single operational layer.
        </p>
      </div>
    </DarkSlide>);

}

export function CompanyIntroSlide() {
  return (
    <SlideShell
      eyebrow="Company introduction"
      title="A single operating layer for cross-border trade"
      number="03">
      
      <div className="grid h-full grid-cols-12 gap-10">
        <div className="col-span-7 space-y-4 text-[14.5px] leading-[1.8] text-gray-700">
          <p>
            NubiaGo connects buyers and sellers across African markets with the infrastructure that trade depends on:
            verified counterparties, predictable settlement and a single reconciliation record.
          </p>
          <p>
            We operate where fragmentation is most expensive — cross-border payments, merchant verification and the
            paperwork that surrounds both — and replace it with one integration.
          </p>
          <ul className="space-y-2.5 pt-2">
            {[
            'Merchant onboarding and compliance screening',
            'Local-currency settlement with next-day value',
            'Automated reconciliation against your ledger'].
            map((item) =>
            <li key={item} className="flex items-start gap-2.5 text-[14px]">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand-gold" strokeWidth={2} />
                <span>{item}</span>
              </li>
            )}
          </ul>
        </div>
        <div className="col-span-5 bg-brand-sand p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Positioning</div>
          <p className="mt-3 text-[20px] font-semibold leading-[1.4] tracking-[-0.015em] text-ink">
            {company.positioning}
          </p>
          <div className="mt-7 space-y-5 border-t border-gray-200 pt-6">
            {[
            ['Tone', 'Calm, trustworthy, professional'],
            ['Approach', 'Minimal, timeless, enterprise-ready']].
            map(([label, value]) =>
            <div key={label}>
                <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">{label}</div>
                <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideShell>);

}

export function AboutSlide() {
  const Product = iconByKey('product');
  const Shipping = iconByKey('shipping');
  const Certification = iconByKey('certification');
  const Support = iconByKey('support');
  return (
    <SlideShell
      eyebrow="About NubiaGo"
      title="Built for the way African trade actually works"
      lead="Four capabilities, one contract, one integration. Each is available independently and priced transparently."
      number="04">
      
      <div className="grid h-full grid-cols-4 gap-px bg-gray-200">
        {[
        { Icon: Product, title: 'Marketplace', body: 'Verified supply across categories, searchable and comparable.' },
        { Icon: Shipping, title: 'Logistics', body: 'Freight and last-mile partners coordinated through one view.' },
        { Icon: Certification, title: 'Compliance', body: 'Identity, sanctions and document checks before transacting.' },
        { Icon: Support, title: 'Service', body: 'Named account management with published response times.' }].
        map(({ Icon, title, body }) =>
        <div key={title} className="flex flex-col bg-white p-7">
            <Icon className="h-6 w-6 text-brand" strokeWidth={NG_STROKE} />
            <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
            <p className="mt-2.5 text-[13.5px] leading-[1.7] text-gray-700">{body}</p>
            <div className="mt-auto pt-5 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">
              Available independently
            </div>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function KeyNumbersSlide() {
  return (
    <SlideShell eyebrow="Company facts" title="Key numbers" number="05" tint="gray">
      <div className="flex h-full flex-col justify-between">
        <div className="grid grid-cols-4 gap-8">
          {[
          ['18,400', 'Active merchants'],
          ['12', 'Markets served'],
          ['99.95%', 'Settlement uptime'],
          ['$240M', 'Annualised volume']].
          map(([value, label]) =>
          <div key={label} className="border-t-2 border-brand pt-5">
              <StatBlock value={value} label={label} />
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
          {[
          ['Founded', '2021 · Lagos, Nigeria'],
          ['Team', '180 across 6 offices'],
          ['Coverage', 'West, East and Southern Africa']].
          map(([label, value]) =>
          <div key={label}>
              <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">{label}</div>
              <div className="mt-1.5 text-[16px] font-medium text-ink">{value}</div>
            </div>
          )}
        </div>
      </div>
    </SlideShell>);

}

export function ProductCategoriesSlide() {
  return (
    <SlideShell
      eyebrow="Products"
      title="Product categories"
      lead="Six core categories, each with verified supply and published specification data."
      number="06">
      
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-6">
        {[
        ['Industrial equipment', '1,240 SKUs'],
        ['Building materials', '980 SKUs'],
        ['Agricultural inputs', '760 SKUs'],
        ['Packaging', '540 SKUs'],
        ['Energy & power', '410 SKUs'],
        ['Logistics services', '120 partners']].
        map(([title, meta]) =>
        <div key={title} className="flex flex-col border border-gray-200">
            <div className="flex-1 bg-brand-sand" />
            <div className="flex items-baseline justify-between px-5 py-4">
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</span>
              <span className="text-[11px] text-gray-500">{meta}</span>
            </div>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function ComparisonSlide() {
  const rows = [
  ['Settlement time', 'T+1 local currency', 'T+3 to T+7', 'T+5 average'],
  ['Merchant verification', 'Included', 'Add-on', 'Manual'],
  ['Reconciliation', 'Automated', 'Manual export', 'Manual'],
  ['Market coverage', '12 markets', '4 markets', '6 markets'],
  ['Integration', 'Single API', 'Per-market API', 'File transfer']];

  return (
    <SlideShell eyebrow="Product comparison" title="How we compare" number="07">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr>
            <th className="w-[28%] border-b border-gray-200 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Capability
            </th>
            <th className="bg-brand px-4 py-3 text-left text-[13px] font-semibold text-white">NubiaGo</th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-[13px] font-semibold text-gray-700">
              Regional aggregator
            </th>
            <th className="border-b border-gray-200 px-4 py-3 text-left text-[13px] font-semibold text-gray-700">
              Bank-led process
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) =>
          <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
              <td className="border-b border-gray-200 px-4 py-3.5 font-medium text-ink">{row[0]}</td>
              <td className="border-b border-gray-200 bg-brand-sand px-4 py-3.5 font-semibold text-brand">{row[1]}</td>
              <td className="border-b border-gray-200 px-4 py-3.5 text-gray-700">{row[2]}</td>
              <td className="border-b border-gray-200 px-4 py-3.5 text-gray-700">{row[3]}</td>
            </tr>
          )}
        </tbody>
      </table>
    </SlideShell>);

}

export function SpecificationSlide() {
  return (
    <SlideShell eyebrow="Product specification" title="Settlement API — NG-SET-100" number="08">
      <div className="grid h-full grid-cols-12 gap-10">
        <div className="col-span-5 flex flex-col">
          <div className="flex flex-1 items-center justify-center bg-brand-sand">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
              Product image · 4:3
            </span>
          </div>
          <p className="mt-5 text-[13.5px] leading-[1.7] text-gray-700">
            A single endpoint for payout instruction, status and reconciliation across all supported markets.
          </p>
        </div>
        <div className="col-span-7">
          <table className="w-full border-collapse text-[13.5px]">
            <tbody>
              {[
              ['Interface', 'REST / JSON over HTTPS'],
              ['Authentication', 'OAuth 2.0 client credentials, mTLS optional'],
              ['Currencies', 'NGN, GHS, KES, XOF, ZAR, USD'],
              ['Settlement window', 'T+1 business day, cut-off 16:00 WAT'],
              ['Throughput', '400 instructions / second sustained'],
              ['Availability', '99.95% monthly, measured at the edge'],
              ['Reconciliation', 'Daily statement, ISO 20022 and CSV'],
              ['Support', '24 / 5 with named account manager']].
              map(([label, value], index) =>
              <tr key={label} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="w-[38%] border-b border-gray-200 px-4 py-3 font-medium text-gray-500">{label}</td>
                  <td className="border-b border-gray-200 px-4 py-3 text-ink">{value}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </SlideShell>);

}

export function ImageTextSlide() {
  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 items-center justify-center bg-brand-sand">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
          Full-bleed image · 640 × 720
        </span>
      </div>
      <div className="flex w-1/2 flex-col" style={{ padding: SLIDE_MARGIN, paddingBottom: 40 }}>
        <div className="flex flex-1 flex-col justify-center">
          <BrandRule width={72} thickness={2} />
          <h2 className="mt-7 text-[32px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
            Verification before the first transaction
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-gray-700">
            Every merchant on the network completes identity, sanctions and document checks before they can transact.
            Buyers see the verification status on the counterparty record, with the underlying evidence available on
            request.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-6 border-t border-gray-200 pt-6">
            <StatBlock value="4.2 days" label="Average onboarding" />
            <StatBlock value="100%" label="Screened counterparties" />
          </div>
        </div>
        <footer className="flex items-center justify-between border-t border-gray-200 pt-3.5">
          <Logo size={13} />
          <div className="flex items-center gap-5 text-[10px] text-gray-500">
            <span>{company.endorsement}</span>
            <span className="font-medium tabular-nums">09</span>
          </div>
        </footer>
      </div>
    </div>);

}