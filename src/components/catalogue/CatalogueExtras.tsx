import { Logo, BrandRule } from '@/components/brand/Logo';
import { HERO } from '@/components/social/heroCatalog';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';

const PAD = 56;

/** Catalogue table of contents. */
export function CatalogueToc() {
  const company = useCompany();
  const { width, height } = formats.a4;
  const rows: [string, string, string][] = [
    ['01', 'Industrial equipment', '04'],
    ['02', 'Textiles & apparel', '18'],
    ['03', 'Agri commodities', '32'],
    ['04', 'Logistics & fulfilment', '44'],
    ['05', 'Specifications index', '56'],
    ['06', 'Comparison matrices', '62'],
    ['07', 'How to order', '68']
  ];

  return (
    <div className="flex h-full w-full flex-col bg-white" style={{ width, height, padding: PAD }}>
      <header className="flex items-baseline justify-between border-b border-gray-200 pb-3">
        <Logo size={14} />
        <span className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-gray-500">Contents</span>
      </header>
      <div className="flex-1 pt-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-ink">Catalogue 2025</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-ink">Contents</h1>
        <BrandRule width={48} thickness={1.5} tone="secondary" />
        <div className="mt-8 space-y-0">
          {rows.map(([n, title, page]) => (
            <div
              key={n}
              className="flex items-baseline gap-3 border-b border-gray-200 py-3.5 text-[12px]"
            >
              <span className="w-8 font-semibold tabular-nums text-brand">{n}</span>
              <span className="flex-1 font-medium text-ink">{title}</span>
              <span className="text-gray-300" aria-hidden>
                ·················
              </span>
              <span className="w-8 text-right tabular-nums text-gray-500">{page}</span>
            </div>
          ))}
        </div>
      </div>
      <footer className="flex items-center justify-between border-t border-gray-200 pt-3 text-[8.5px] text-gray-500">
        <span>
          {company.website} · {company.endorsement}
        </span>
        <span className="tabular-nums">02</span>
      </footer>
    </div>
  );
}

function LifestyleCover({
  hero,
  number,
  title,
  blurb,
  focus = 'center'
}: {
  hero: string;
  number: string;
  title: string;
  blurb: string;
  focus?: string;
}) {
  const { width, height } = formats.a4;
  return (
    <div className="flex h-full w-full flex-col bg-white" style={{ width, height }}>
      <div className="flex items-end justify-between px-14 pb-8 pt-12">
        <Logo size={20} />
        <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-gray-500">Catalogue 2025</span>
      </div>
      <div
        className="relative flex-1"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: 'cover',
          backgroundPosition: focus
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(30,58,95,0.5) 0%, transparent 50%)' }}
        />
      </div>
      <div className="bg-brand px-14 py-12">
        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Category {number}</div>
        <h1 className="mt-3 text-[36px] font-bold leading-[1.1] tracking-[-0.03em] text-white">{title}</h1>
        <p className="mt-3 max-w-[460px] text-[13px] leading-[1.7] text-white/65">{blurb}</p>
      </div>
    </div>
  );
}

export function CatalogueLifestyleTextiles() {
  return (
    <LifestyleCover
      hero={HERO.atelier}
      number="02"
      title="Textiles & apparel"
      blurb="Verified mills and finished-goods suppliers across West and East Africa, with published MOQs and lead times."
      focus="40% center"
    />
  );
}

export function CatalogueLifestyleAgri() {
  return (
    <LifestyleCover
      hero={HERO.spices}
      number="03"
      title="Agri commodities"
      blurb="Origin-documented lots for staples and specialties — grading, storage and corridor logistics included."
      focus="35% 40%"
    />
  );
}

export function CatalogueLifestyleLogistics() {
  return (
    <LifestyleCover
      hero={HERO.shipping}
      number="04"
      title="Logistics & fulfilment"
      blurb="Warehouse, freight and last-mile partners with published SLA windows for cross-border delivery."
      focus="30% center"
    />
  );
}

/** Supplier narrative spread. */
export function CatalogueSupplierStory() {
  const company = useCompany();
  const { width, height } = formats.a4;

  return (
    <div className="flex h-full w-full bg-white" style={{ width, height }}>
      <div
        className="w-[42%]"
        style={{
          backgroundImage: `url(${HERO.africanMarket})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="flex w-[58%] flex-col" style={{ padding: PAD }}>
        <header className="flex items-baseline justify-between border-b border-gray-200 pb-3">
          <Logo size={14} />
          <span className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-gray-500">Supplier story</span>
        </header>
        <div className="flex flex-1 flex-col justify-center pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-gold">Featured partner</p>
          <h1 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-ink">
            From market stall to verified SKU
          </h1>
          <BrandRule width={40} thickness={1.5} tone="gold" />
          <p className="mt-5 text-[11px] leading-[1.75] text-gray-700">
            Continental Trade Partners onboarded 240 textile SKUs in ninety days — each with published specs, MOQ and
            corridor-ready fulfilment. Buyers discover once; suppliers settle on T+1.
          </p>
          <blockquote className="mt-6 border-l-2 border-brand-gold pl-4 text-[12px] leading-[1.65] text-ink">
            “Settlement used to take a week. It now takes a day.”
            <footer className="mt-2 text-[10px] text-gray-500">Amara Okonkwo · Director of Procurement</footer>
          </blockquote>
        </div>
        <footer className="border-t border-gray-200 pt-3 text-[8.5px] text-gray-500">
          {company.website} · {company.endorsement}
        </footer>
      </div>
    </div>
  );
}
