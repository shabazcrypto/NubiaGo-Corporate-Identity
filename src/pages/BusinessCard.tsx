import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '../components/brand/iconSystem';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';

const PAD = Math.round((6 / 25.4) * 96);

function ContactLines({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const company = useCompany();
  const Phone = iconByKey('phone');
  const Mail = iconByKey('email');
  const Globe = iconByKey('website');
  const Pin = iconByKey('location');
  const text = tone === 'light' ? 'text-gray-700' : 'text-white/75';
  const icon = tone === 'light' ? 'text-brand' : 'text-brand-gold';
  return (
    <div className={`space-y-1 text-[7px] ${text}`}>
      {[
        [Phone, company.phone],
        [Mail, company.email],
        [Globe, company.website],
        [Pin, `${company.addressLine1}, ${company.addressLine2}, ${company.country}`]
      ].map(([Icon, value], index) => {
        const Component = Icon as typeof Phone;
        return (
          <div key={index} className="flex items-start gap-1.5">
            <Component className={`mt-0.5 h-2 w-2 shrink-0 ${icon}`} strokeWidth={NG_STROKE} />
            <span className="leading-snug">{value as string}</span>
          </div>
        );
      })}
    </div>
  );
}

export function CorporateCardFront() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
      <BrandRule width={32} thickness={2} tone="gold" />
      <div>
        <Logo size={22} tone="light" />
      </div>
      <div className="flex items-baseline justify-between text-[6px] text-white/50">
        <span>{company.website}</span>
        <span className="uppercase tracking-[0.12em]">{company.endorsementShort}</span>
      </div>
    </div>
  );
}

export function CorporateCardBack() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[11px] font-semibold tracking-[-0.02em] text-ink">{company.personName}</div>
          <div className="mt-0.5 text-[7px] text-gray-500">{company.jobTitle}</div>
        </div>
        <Logo size={9} />
      </div>
      <div className="flex items-end justify-between gap-4">
        <ContactLines />
        <QrPlaceholder size={40} label="Profile" />
      </div>
      <div className="border-t border-gray-200 pt-1.5 text-[5.5px] uppercase tracking-[0.12em] text-gray-500">
        {company.endorsement}
      </div>
    </div>
  );
}

export function MinimalCardFront() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-center bg-white" style={{ padding: PAD }}>
      <Logo size={20} />
      <div className="mt-2 h-[2px] w-8 bg-brand-gold" />
      <div className="mt-2 text-[6px] font-medium uppercase tracking-[0.18em] text-gray-500">{company.positioning}</div>
    </div>
  );
}

export function MinimalCardBack() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
      <div>
        <div className="text-[10px] font-semibold tracking-[-0.02em] text-ink">{company.personName}</div>
        <div className="mt-0.5 text-[7px] text-gray-500">{company.jobTitle} · NubiaGo</div>
      </div>
      <div className="space-y-0.5 text-[7px] leading-snug text-gray-700">
        <div>{company.phone}</div>
        <div>{company.email}</div>
        <div className="text-brand">{company.website}</div>
        <div className="text-[6.5px] text-gray-500">
          {company.addressLine2}, {company.country}
        </div>
        <div className="pt-1 text-[5.5px] uppercase tracking-[0.12em] text-gray-500">{company.endorsement}</div>
      </div>
    </div>
  );
}

export function BusinessCardPage() {
  return (
    <>
      <PageHeader
        code="06"
        title="Business Card"
        folder="06_BUSINESS_CARD"
        description="85 × 55 mm at 1× CSS (96 dpi), 6 mm safe margin. Downloads are true-size 300 dpi PNG and 85 × 55 mm PDF — not a doubled artboard."
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Trim size', '85 × 55 mm'],
          ['Export', '1004 × 650 px PNG · 85 × 55 mm PDF'],
          ['Stock', '400 gsm uncoated, matt lamination']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <GroupLabel note="Reversed front, information back">Standard corporate card</GroupLabel>

      <AssetFrame
        title="Corporate Card — Front"
        fileName="NubiaGo_Business_Card_Corporate_Front"
        artboard={formats.card}
        description="Full Primary field with the wordmark centred on the optical middle and the descriptor beneath."
      >
        <CorporateCardFront />
      </AssetFrame>

      <AssetFrame
        title="Corporate Card — Back"
        fileName="NubiaGo_Business_Card_Corporate_Back"
        artboard={formats.card}
        description="Name and position lead, contact details follow in the icon system, and a QR placeholder sits in the lower right."
      >
        <CorporateCardBack />
      </AssetFrame>

      <GroupLabel note="Low ink, maximum legibility">Minimal card</GroupLabel>

      <AssetFrame
        title="Minimal Card — Front"
        fileName="NubiaGo_Business_Card_Minimal_Front"
        artboard={formats.card}
        description="Wordmark in Primary on White with a single Gold rule. Prints cleanly on uncoated stock without a solid ink area."
      >
        <MinimalCardFront />
      </AssetFrame>

      <AssetFrame
        title="Minimal Card — Back"
        fileName="NubiaGo_Business_Card_Minimal_Back"
        artboard={formats.card}
        description="Warm Sand field with contact details set as plain lines — no icons — for the shortest possible read."
      >
        <MinimalCardBack />
      </AssetFrame>

      <GroupLabel note="Trim + 3 mm bleed on each side · for press">Bleed artboard</GroupLabel>
      <AssetFrame
        title="Corporate Card — Front with bleed"
        fileName="NubiaGo_Business_Card_Corporate_Front_Bleed"
        artboard={formats.cardBleed}
        description="91 × 61 mm artboard (85 × 55 mm trim + 3 mm bleed). Centre the trim content; extend the Primary field to the bleed edge."
      >
        <div className="flex h-full w-full items-center justify-center bg-brand">
          <div style={{ width: formats.card.width, height: formats.card.height }}>
            <CorporateCardFront />
          </div>
        </div>
      </AssetFrame>
    </>
  );
}
