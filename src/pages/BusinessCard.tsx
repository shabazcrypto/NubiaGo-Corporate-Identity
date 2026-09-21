import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '../components/brand/iconSystem';
import { company } from '../data/brand';

/** 85 × 55 mm at 2× screen scale. Add 3 mm bleed on each side for print. */
const CARD = { width: 642, height: 416 };
const PAD = 44;

function ContactLines({ tone = 'light' }: {tone?: 'light' | 'dark';}) {
  const Phone = iconByKey('phone');
  const Mail = iconByKey('email');
  const Globe = iconByKey('website');
  const Pin = iconByKey('location');
  const text = tone === 'light' ? 'text-gray-700' : 'text-white/75';
  const icon = tone === 'light' ? 'text-brand' : 'text-brand-gold';
  return (
    <div className={`space-y-2.5 text-[13px] ${text}`}>
      {[
      [Phone, company.phone],
      [Mail, company.email],
      [Globe, company.website],
      [Pin, `${company.addressLine1}, ${company.addressLine2}, ${company.country}`]].
      map(([Icon, value], index) => {
        const Component = Icon as typeof Phone;
        return (
          <div key={index} className="flex items-start gap-2.5">
            <Component className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${icon}`} strokeWidth={NG_STROKE} />
            <span className="leading-snug">{value as string}</span>
          </div>);

      })}
    </div>);

}

export function BusinessCardPage() {
  return (
    <>
      <PageHeader
        code="06"
        title="Business Card"
        folder="06_BUSINESS_CARD"
        description="85 × 55 mm, portrait-safe margins of 6 mm and a 3 mm bleed. Two systems — corporate and minimal — each with a brand-led front and an information-led back." />
      

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
        ['Trim size', '85 × 55 mm'],
        ['Bleed / safe area', '3 mm bleed · 6 mm margin'],
        ['Stock', '400 gsm uncoated, matt lamination']].
        map(([label, value]) =>
        <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        )}
      </div>

      <GroupLabel note="Reversed front, information back">Standard corporate card</GroupLabel>

      <AssetFrame
        title="Corporate Card — Front"
        fileName="NubiaGo_Business_Card_Corporate_Front"
        spec="85 × 55 mm · front"
        description="Full Primary field with the wordmark centred on the optical middle and the descriptor beneath. No other content competes for attention."
        width={CARD.width}
        height={CARD.height}>
        
        <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
          <BrandRule width={64} thickness={2} tone="gold" />
          <div>
            <Logo size={44} tone="light" />
          </div>
          <div className="flex items-baseline justify-between text-[11px] text-white/50">
            <span>{company.website}</span>
            <span className="uppercase tracking-[0.12em]">{company.endorsement}</span>
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Corporate Card — Back"
        fileName="NubiaGo_Business_Card_Corporate_Back"
        spec="85 × 55 mm · back"
        description="Name and position lead, contact details follow in the icon system, and a QR placeholder sits in the lower right for the company profile."
        width={CARD.width}
        height={CARD.height}>
        
        <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[22px] font-semibold tracking-[-0.02em] text-ink">[Name Surname]</div>
              <div className="mt-1 text-[13px] text-gray-500">[Job Title]</div>
            </div>
            <Logo size={18} />
          </div>
          <div className="flex items-end justify-between gap-8">
            <ContactLines />
            <QrPlaceholder size={78} label="Company profile" />
          </div>
          <div className="border-t border-gray-200 pt-3 text-[10px] uppercase tracking-[0.12em] text-gray-500">
            {company.endorsement}
          </div>
        </div>
      </AssetFrame>

      <GroupLabel note="Low ink, maximum legibility">Minimal card</GroupLabel>

      <AssetFrame
        title="Minimal Card — Front"
        fileName="NubiaGo_Business_Card_Minimal_Front"
        spec="85 × 55 mm · front"
        description="Wordmark in Primary on White with a single Gold rule. Prints cleanly on uncoated stock without a solid ink area."
        width={CARD.width}
        height={CARD.height}>
        
        <div className="flex h-full w-full flex-col justify-center bg-white" style={{ padding: PAD }}>
          <Logo size={40} />
          <div className="mt-4 h-[2px] w-16 bg-brand-gold" />
          <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500">
            {company.positioning}
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Minimal Card — Back"
        fileName="NubiaGo_Business_Card_Minimal_Back"
        spec="85 × 55 mm · back"
        description="Warm Sand field with contact details set as plain lines — no icons — for the shortest possible read."
        width={CARD.width}
        height={CARD.height}>
        
        <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
          <div>
            <div className="text-[20px] font-semibold tracking-[-0.02em] text-ink">[Name Surname]</div>
            <div className="mt-1 text-[13px] text-gray-500">[Job Title] · NubiaGo</div>
          </div>
          <div className="space-y-1.5 text-[13px] leading-snug text-gray-700">
            <div>{company.phone}</div>
            <div>{company.email}</div>
            <div className="text-brand">{company.website}</div>
            <div className="text-[12px] text-gray-500">
              {company.addressLine2}, {company.country}
            </div>
            <div className="pt-1 text-[10px] uppercase tracking-[0.12em] text-gray-500">{company.endorsement}</div>
          </div>
        </div>
      </AssetFrame>
    </>);

}