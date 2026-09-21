import { Logo, BrandRule, Endorsement } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';

/** DL envelope face — 220 × 110 mm. */
export function EnvelopeDl() {
  const company = useCompany();
  const { width, height } = formats.envelopeDl;

  return (
    <div className="relative bg-white" style={{ width, height }}>
      {/* Return address */}
      <div className="absolute left-8 top-7">
        <Logo size={14} />
        <p className="mt-2 text-[8px] leading-[1.55] text-gray-700">
          {company.legalName}
          <br />
          {company.addressLine2}
          {company.addressLine2 ? ', ' : ''}
          {company.country}
          <br />
          {company.website}
        </p>
      </div>
      {/* Recipient window zone (visual guide) */}
      <div
        className="absolute border border-dashed border-gray-200"
        style={{ left: width * 0.38, top: height * 0.38, width: width * 0.42, height: height * 0.36 }}
      >
        <p className="p-2 text-[8px] text-gray-400">Recipient address window</p>
      </div>
      <div className="absolute bottom-5 right-8 text-right">
        <Endorsement size={7} />
      </div>
    </div>
  );
}

/** C5 envelope face — 229 × 162 mm. */
export function EnvelopeC5() {
  const company = useCompany();
  const { width, height } = formats.envelopeC5;

  return (
    <div className="relative bg-brand-sand" style={{ width, height }}>
      <div className="absolute left-10 top-9">
        <Logo size={18} />
        <BrandRule width={40} thickness={1.5} tone="gold" />
        <p className="mt-3 text-[9px] leading-[1.6] text-gray-700">
          {company.legalName}
          <br />
          {company.addressLine2}
          {company.addressLine2 ? ' · ' : ''}
          {company.country}
          <br />
          {company.email}
        </p>
      </div>
      <div
        className="absolute border border-dashed border-brand/25 bg-white/50"
        style={{ left: width * 0.36, top: height * 0.32, width: width * 0.48, height: height * 0.4 }}
      >
        <p className="p-3 text-[9px] text-gray-400">Recipient</p>
      </div>
      <div className="absolute bottom-7 left-10 right-10 flex items-center justify-between border-t border-brand/15 pt-3">
        <span className="text-[8px] uppercase tracking-[0.14em] text-gray-500">{company.positioning}</span>
        <Endorsement size={7} />
      </div>
    </div>
  );
}

/** With-compliments slip — A6. */
export function WithCompliments() {
  const company = useCompany();
  const { width, height } = formats.compliments;

  return (
    <div className="flex flex-col bg-white" style={{ width, height, padding: 36 }}>
      <Logo size={20} />
      <BrandRule width={48} thickness={1.5} tone="gold" />
      <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-brand">With compliments</p>
      <div className="mt-5 flex-1 border-b border-dashed border-gray-200" />
      <div className="mt-4 space-y-0.5 text-[8.5px] leading-[1.55] text-gray-700">
        <p className="font-semibold text-ink">{company.personName}</p>
        <p>
          {company.jobTitle} · {company.name}
        </p>
        <p>
          {company.email} · {company.website}
        </p>
        <p className="pt-1 text-gray-500">{company.endorsement}</p>
      </div>
    </div>
  );
}
