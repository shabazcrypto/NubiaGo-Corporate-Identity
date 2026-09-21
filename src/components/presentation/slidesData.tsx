import { SlideShell, DarkSlide, StatBlock } from './SlideChrome';
import { Logo, BrandRule } from '../brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '../brand/iconSystem';
import { company } from '../../data/brand';

export function TwoColumnSlide() {
  return (
    <SlideShell
      eyebrow="Two-column content"
      title="Commercial model"
      lead="Pricing follows usage, with no per-market minimums and no charge for onboarding."
      number="10">
      
      <div className="grid h-full grid-cols-2 gap-14">
        {[
        {
          title: 'What you pay for',
          items: [
          'Settlement volume, charged per transaction',
          'Optional compliance screening per merchant',
          'Premium support tiers where required']

        },
        {
          title: 'What is included',
          items: [
          'Integration, sandbox and staged rollout',
          'Daily reconciliation statements',
          'Named account manager and quarterly review']

        }].
        map((column) =>
        <div key={column.title}>
            <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-ink">{column.title}</h3>
            <div className="mt-4 h-px w-full bg-gray-200" />
            <ul className="mt-5 space-y-4">
              {column.items.map((item) =>
            <li key={item} className="flex gap-4 text-[14.5px] leading-[1.7] text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-gold" aria-hidden="true" />
                  <span>{item}</span>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function ThreeColumnSlide() {
  return (
    <SlideShell eyebrow="Three-column content" title="Engagement tiers" number="11">
      <div className="grid h-full grid-cols-3 gap-6">
        {[
        { name: 'Standard', price: 'From 0.9%', body: 'Single market, shared support, monthly reporting.', featured: false },
        { name: 'Growth', price: 'From 0.7%', body: 'Up to four markets, named manager, weekly reporting.', featured: true },
        { name: 'Enterprise', price: 'Negotiated', body: 'Full coverage, custom SLA, dedicated integration team.', featured: false }].
        map((tier) =>
        <div
          key={tier.name}
          className={`flex flex-col p-8 ${tier.featured ? 'bg-brand text-white' : 'border border-gray-200'}`}>
          
            <div
            className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
            tier.featured ? 'text-brand-gold' : 'text-gray-500'}`
            }>
            
              {tier.name}
            </div>
            <div
            className={`mt-5 text-[32px] font-bold tracking-[-0.03em] ${tier.featured ? 'text-white' : 'text-brand'}`}>
            
              {tier.price}
            </div>
            <p className={`mt-4 text-[14px] leading-[1.7] ${tier.featured ? 'text-white/70' : 'text-gray-700'}`}>
              {tier.body}
            </p>
            <div
            className={`mt-auto border-t pt-5 text-[11px] font-medium uppercase tracking-[0.12em] ${
            tier.featured ? 'border-white/15 text-white/60' : 'border-gray-200 text-gray-500'}`
            }>
            
              Per settled transaction
            </div>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function ProcessSlide() {
  const steps = [
  ['Scope', 'Markets, volumes and integration surface agreed.'],
  ['Integrate', 'Sandbox access, API build and test transactions.'],
  ['Verify', 'Merchant onboarding and compliance screening.'],
  ['Operate', 'Live settlement, daily reconciliation, review.']];

  return (
    <SlideShell
      eyebrow="Process"
      title="From agreement to live settlement"
      lead="Four stages across twelve weeks, with the first market live in week five."
      number="12">
      
      <div className="relative flex h-full items-start">
        <div className="absolute left-0 right-0 top-[22px] h-px bg-gray-200" aria-hidden="true" />
        <div className="relative grid w-full grid-cols-4 gap-8">
          {steps.map(([title, body], index) =>
          <div key={title}>
              <div className="flex h-11 w-11 items-center justify-center bg-brand text-[15px] font-semibold text-white">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-6 text-[18px] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-gray-700">{body}</p>
            </div>
          )}
        </div>
      </div>
    </SlideShell>);

}

export function TimelineSlide() {
  const milestones = [
  ['2021', 'Founded in Lagos', 'First settlement corridor opened between Nigeria and Ghana.'],
  ['2022', 'Compliance layer', 'Merchant verification launched; 2,000 merchants onboarded.'],
  ['2023', 'Regional expansion', 'Coverage extended to East Africa; API v2 released.'],
  ['2024', 'Twelve markets', 'Annualised volume passes $240M with 99.95% uptime.']];

  return (
    <SlideShell eyebrow="Timeline" title="Four years of build" number="13" tint="gray">
      <div className="h-full">
        {milestones.map(([year, title, body], index) =>
        <div key={year} className="grid grid-cols-12 gap-8 border-t border-gray-200 py-5">
            <div className="col-span-2 text-[26px] font-bold tracking-[-0.025em] text-brand">{year}</div>
            <div className="col-span-3 flex items-center text-[16px] font-semibold text-ink">{title}</div>
            <div className="col-span-6 flex items-center text-[14px] leading-[1.7] text-gray-700">{body}</div>
            <div className="col-span-1 flex items-center justify-end">
              {index === milestones.length - 1 ? <div className="h-2 w-2 bg-brand-gold" aria-hidden="true" /> : null}
            </div>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function ChartSlide() {
  const bars = [
  { label: 'Q1', value: 42 },
  { label: 'Q2', value: 58 },
  { label: 'Q3', value: 71 },
  { label: 'Q4', value: 96 }];

  const max = 100;
  return (
    <SlideShell
      eyebrow="Data"
      title="Settled volume by quarter"
      lead="Figures in USD millions, 2024. Source: internal settlement ledger."
      number="14">
      
      <div className="grid h-full grid-cols-12 gap-12">
        <div className="col-span-8 flex h-full flex-col">
          <div className="relative flex flex-1 items-end gap-10 border-b border-l border-gray-200 pl-8">
            {[25, 50, 75, 100].map((tick) =>
            <div
              key={tick}
              className="absolute left-0 right-0 border-t border-dashed border-gray-200"
              style={{ bottom: `${tick / max * 100}%` }}
              aria-hidden="true" />

            )}
            {bars.map((bar, index) =>
            <div key={bar.label} className="relative flex flex-1 flex-col items-center justify-end">
                <span className="mb-2 text-[13px] font-semibold tabular-nums text-ink">{bar.value}</span>
                <div
                className="w-full"
                style={{
                  height: `${bar.value / max * 100}%`,
                  backgroundColor: index === bars.length - 1 ? '#C9A227' : '#2D5A8A'
                }} />
              
              </div>
            )}
          </div>
          <div className="flex gap-10 pl-8 pt-3">
            {bars.map((bar) =>
            <div key={bar.label} className="flex-1 text-center text-[12px] font-medium text-gray-500">
                {bar.label}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-4 space-y-8 border-l border-gray-200 pl-10">
          <StatBlock value="+128%" label="Year on year" />
          <StatBlock value="$267M" label="2025 run rate" />
          <p className="text-[13px] leading-[1.7] text-gray-700">
            Growth is driven by corridor additions rather than price, and settlement uptime held above target through
            every expansion.
          </p>
        </div>
      </div>
    </SlideShell>);

}

export function PartnerLogosSlide() {
  return (
    <SlideShell
      eyebrow="Customers & partners"
      title="Trusted across the continent"
      lead="A selection of buyers, sellers and infrastructure partners on the network."
      number="15">
      
      <div className="grid h-full grid-cols-5 grid-rows-2 gap-px bg-gray-200">
        {Array.from({ length: 10 }).map((_, index) =>
        <div key={index} className="flex items-center justify-center bg-white">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-200">Partner logo</span>
          </div>
        )}
      </div>
    </SlideShell>);

}

export function QuoteSlide() {
  return (
    <DarkSlide number="16">
      <div className="flex h-full flex-col justify-center">
        <BrandRule width={72} thickness={2} tone="gold" />
        <blockquote className="mt-9 max-w-[900px] text-[38px] font-semibold leading-[1.3] tracking-[-0.025em] text-white">
          “Settlement used to take a week and three phone calls. It now takes a day and no one has to ask where the
          money is.”
        </blockquote>
        <div className="mt-9 border-t border-white/15 pt-5 text-[14px] text-white/65">
          <span className="font-semibold text-white">Amara Okonkwo</span> · Director of Procurement, Continental Trade
          Partners
        </div>
      </div>
    </DarkSlide>);

}

export function ContactSlide() {
  const Phone = iconByKey('phone');
  const Mail = iconByKey('email');
  const Globe = iconByKey('website');
  const Pin = iconByKey('location');
  return (
    <DarkSlide number="17">
      <div className="flex h-full flex-col justify-between">
        <Logo size={26} tone="light" />
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-7">
            <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              Let’s scope your first corridor
            </h1>
            <p className="mt-4 max-w-[480px] text-[15px] leading-[1.7] text-white/65">
              Send us your markets and monthly volumes and we will return an indicative quotation within two business
              days.
            </p>
          </div>
          <div className="col-span-5 space-y-3.5 border-l border-white/15 pl-10 text-[14px] text-white/75">
            {[
            [Phone, company.phone],
            [Mail, company.email],
            [Globe, company.website],
            [Pin, `${company.addressLine2}, ${company.country}`]].
            map(([Icon, value], index) => {
              const Component = Icon as typeof Phone;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Component className="h-4 w-4 shrink-0 text-brand-gold" strokeWidth={NG_STROKE} />
                  <span>{value as string}</span>
                </div>);

            })}
            <div className="pt-4">
              <QrPlaceholder size={72} label="Company profile" tone="dark" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/15 pt-5 text-[11px] text-white/45">
          {company.endorsement} · {company.legalName} · {company.registration} · {company.copyright}
        </div>
      </div>
    </DarkSlide>);

}