import { SlideShell, DarkSlide, StatBlock } from './SlideChrome';
import { Logo, BrandRule } from '../brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '../brand/iconSystem';
import { useCompany } from '@/lib/brand-context';

/** 18 — Formal meeting agenda */
export function AgendaSlide() {
  return (
    <SlideShell
      eyebrow="Meeting agenda"
      title="Steering committee"
      lead="Forty-five minutes. Decisions required on corridor expansion and FY budget release."
      number="18"
    >
      <ol className="space-y-0">
        {[
          ['01', 'Opening & prior actions', '5 min', 'Chair'],
          ['02', 'Market performance Q4', '10 min', 'Finance'],
          ['03', 'Corridor expansion proposal', '15 min', 'Product'],
          ['04', 'Risk & compliance update', '8 min', 'Legal'],
          ['05', 'Decisions & next steps', '7 min', 'Chair']
        ].map(([num, item, time, owner], index) => (
          <li
            key={num}
            className={`grid grid-cols-12 items-baseline gap-4 border-b border-gray-300 py-4 ${index === 0 ? 'border-t' : ''}`}
          >
            <span className="col-span-1 text-[12px] font-semibold tabular-nums text-brand">{num}</span>
            <span className="col-span-6 text-[16px] font-medium text-ink">{item}</span>
            <span className="col-span-2 text-[13px] tabular-nums text-gray-500">{time}</span>
            <span className="col-span-3 text-right text-[14px] text-gray-700">{owner}</span>
          </li>
        ))}
      </ol>
    </SlideShell>
  );
}

/** 19 — Problem / opportunity framing */
export function ProblemOpportunitySlide() {
  return (
    <SlideShell eyebrow="Context" title="The settlement gap" number="19">
      <div className="grid h-full grid-cols-2 gap-10">
        <div className="flex flex-col border border-gray-200 p-8">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Problem</div>
          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-ink">
            Cross-border settlement still takes days
          </h3>
          <ul className="mt-6 space-y-3 text-[14px] leading-[1.7] text-gray-700">
            {['Fragmented local rails', 'Manual reconciliation', 'Unclear FX and cut-offs'].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col bg-brand p-8 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">Opportunity</div>
          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">Next-day local currency, end to end</h3>
          <ul className="mt-6 space-y-3 text-[14px] leading-[1.7] text-white/75">
            {['Unified API across markets', 'Automated daily statements', 'Published service levels'].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideShell>
  );
}

/** 20 — Solution architecture overview */
export function SolutionOverviewSlide() {
  return (
    <SlideShell
      eyebrow="Solution"
      title="How NubiaGo settles"
      lead="Three layers — access, clearing, and reconciliation — under one commercial contract."
      number="20"
    >
      <div className="grid h-full grid-cols-3 gap-10">
        {[
          {
            layer: '01 Access',
            title: 'Merchant & buyer APIs',
            body: 'Onboarding, KYC hooks and transaction authorisation against your systems of record.'
          },
          {
            layer: '02 Clearing',
            title: 'Local-currency rails',
            body: 'Corridor partners execute settlement with next-day value and published cut-off windows.'
          },
          {
            layer: '03 Reconcile',
            title: 'Statements & controls',
            body: 'ISO 20022 and CSV delivery, exception queues and audit-ready ledgers.'
          }
        ].map((card) => (
          <div key={card.layer} className="flex flex-col">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-light">{card.layer}</div>
            <div className="mt-3">
              <BrandRule width={40} thickness={2} tone="gold" />
            </div>
            <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.015em] text-ink">{card.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.7] text-gray-700">{card.body}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/** 21 — Geographic market map */
export function MarketMapSlide() {
  return (
    <SlideShell eyebrow="Coverage" title="Live and planned corridors" number="21" tint="sand">
      <div className="grid h-full grid-cols-12 gap-8">
        <div className="col-span-5 flex flex-col justify-center gap-6">
          {[
            ['Live', 'Nigeria · Ghana · Kenya · Côte d’Ivoire', 'gold'],
            ['Pilot', 'Senegal · Cameroon', 'brand'],
            ['Roadmap', 'Egypt · Morocco · South Africa', 'gray']
          ].map(([status, markets, tone]) => (
            <div
              key={status}
              className={`border-l-2 bg-white px-5 py-4 ${
                tone === 'gold'
                  ? 'border-brand-gold'
                  : tone === 'brand'
                    ? 'border-brand'
                    : 'border-gray-300'
              }`}
            >
              <div
                className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  tone === 'gold'
                    ? 'text-brand-gold'
                    : tone === 'brand'
                      ? 'text-brand'
                      : 'text-gray-500'
                }`}
              >
                {status}
              </div>
              <div className="mt-1.5 text-[15px] font-medium text-ink">{markets}</div>
            </div>
          ))}
        </div>
        <div className="col-span-7 flex items-center justify-center border border-dashed border-gray-200 bg-white">
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
            Map placeholder · Africa corridors
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

/** 22 — Case study narrative */
export function CaseStudySlide() {
  return (
    <SlideShell eyebrow="Case study" title="Continental Trade Partners" number="22">
      <div className="grid h-full grid-cols-12 gap-10">
        <div className="col-span-7 flex flex-col">
          <p className="text-[16px] leading-[1.75] text-gray-700">
            A regional importer needed next-day settlement in four markets without standing up local entities. NubiaGo
            integrated their ERP in six weeks and cut average settlement time from five days to one.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-8">
            <StatBlock value="6 wks" label="Time to first live" />
            <StatBlock value="80%" label="Faster settlement" />
            <StatBlock value="4" label="Markets live" />
          </div>
        </div>
        <div className="col-span-5 flex flex-col justify-between bg-brand p-8 text-white">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-gold">Outcome</div>
            <p className="mt-4 text-[18px] font-semibold leading-[1.45] tracking-[-0.015em]">
              “We stopped chasing statements and started planning inventory.”
            </p>
          </div>
          <div className="border-t border-white/15 pt-4 text-[12px] text-white/65">
            Director of Procurement · Continental Trade Partners
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

/** 23 — Risk & compliance matrix */
export function RiskComplianceSlide() {
  return (
    <SlideShell
      eyebrow="Governance"
      title="Risk & compliance controls"
      lead="Controls map to the operating model — not a separate brochure."
      number="23"
    >
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b-[3px] border-brand text-left">
            <th className="py-3.5 font-semibold text-ink">Domain</th>
            <th className="py-3.5 font-semibold text-ink">Control</th>
            <th className="py-3.5 font-semibold text-ink">Evidence</th>
            <th className="py-3.5 font-semibold text-ink">Owner</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['KYC / KYB', 'Tiered onboarding & screening', 'Onboarding pack · audit log', 'Compliance'],
            ['Sanctions', 'Daily list refresh', 'Exception report', 'Compliance'],
            ['Settlement', 'Dual approval above threshold', 'Maker-checker log', 'Operations'],
            ['Data', 'Encryption in transit & at rest', 'Architecture review', 'Security'],
            ['Continuity', 'RTO 4h / RPO 15m', 'DR test record', 'Technology']
          ].map((row, index) => (
            <tr key={row[0]} className={index % 2 ? 'bg-gray-50' : ''}>
              {row.map((cell) => (
                <td key={cell} className="border-b border-gray-200 px-1 py-4 text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SlideShell>
  );
}

/** 24 — Leadership / org snapshot */
export function TeamOrgSlide() {
  const company = useCompany();
  return (
    <SlideShell eyebrow="Organisation" title="Leadership for this engagement" number="24">
      <div className="grid h-full grid-cols-4 gap-5">
        {[
          { role: 'Executive sponsor', name: 'Group CEO', title: 'AshBak Industries', placeholder: false },
          { role: 'Account lead', name: company.personName, title: company.jobTitle, placeholder: false },
          { role: 'Delivery lead', name: '[Name]', title: 'Integration', placeholder: true },
          { role: 'Compliance lead', name: '[Name]', title: 'Risk & Legal', placeholder: true }
        ].map(({ role, name, title, placeholder }) => (
          <div key={role} className="flex flex-col border border-gray-200">
            <div className="flex h-28 items-center justify-center bg-brand-sand text-[10px] font-medium uppercase tracking-[0.12em] text-gray-500">
              Portrait
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-light">{role}</div>
              <div
                className={`mt-2 text-[15px] font-semibold ${
                  placeholder ? 'italic text-gray-500' : 'text-ink'
                }`}
              >
                {name}
              </div>
              <div className="mt-1 text-[12px] text-gray-500">{title}</div>
            </div>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

/** 25 — Implementation roadmap */
export function RoadmapSlide() {
  return (
    <SlideShell eyebrow="Delivery" title="Twelve-week implementation" number="25">
      <div className="flex h-full flex-col">
        <div className="mb-8">
          <BrandRule width="100%" thickness={2} tone="gold" />
        </div>
        <div className="grid flex-1 grid-cols-4 gap-6">
          {[
            { num: '01', phase: 'Weeks 1–2', title: 'Discover', items: ['Scope lock', 'Access & environments'] },
            { num: '02', phase: 'Weeks 3–6', title: 'Integrate', items: ['API build', 'Sandbox UAT'] },
            { num: '03', phase: 'Weeks 7–9', title: 'Pilot', items: ['First corridor live', 'Ops runbook'] },
            { num: '04', phase: 'Weeks 10–12', title: 'Scale', items: ['Remaining markets', 'Handover'] }
          ].map((col) => (
            <div key={col.phase} className="flex flex-col">
              <div className="text-[11px] font-semibold tabular-nums text-brand-gold">{col.num}</div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{col.phase}</div>
              <div className="mt-2 text-[18px] font-semibold text-brand">{col.title}</div>
              <ul className="mt-4 space-y-2 text-[13px] text-gray-700">
                {col.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[12px] text-gray-500">
          Critical path assumes customer API credentials within five business days of kick-off.
        </p>
      </div>
    </SlideShell>
  );
}

/** 26 — Enterprise pricing matrix */
export function PricingMatrixSlide() {
  return (
    <SlideShell eyebrow="Commercial" title="Enterprise pricing matrix" number="26">
      <div className="mb-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
        Confidential
      </div>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-brand text-left text-white">
            <th className="px-4 py-3.5 font-semibold">Component</th>
            <th className="px-4 py-3.5 font-semibold">Standard</th>
            <th className="px-4 py-3.5 font-semibold">Growth</th>
            <th className="px-4 py-3.5 font-semibold">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Settlement fee', '0.90%', '0.70%', 'Negotiated'],
            ['Markets included', '1', 'Up to 4', 'Full footprint'],
            ['Onboarding', 'Included', 'Included', 'Dedicated team'],
            ['Support', 'Shared · business hours', 'Named · extended', '24/5 premium'],
            ['Reporting', 'Monthly', 'Weekly', 'Custom + API'],
            ['SLA credit', '—', 'Standard', 'Enhanced']
          ].map((row, index) => (
            <tr key={row[0]} className={index % 2 ? 'bg-brand-sand/60' : 'bg-white'}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${row[0]}-${cell}`}
                  className={`border-b border-gray-200 px-4 py-3.5 ${
                    cellIndex === 0 ? 'font-semibold text-ink' : 'text-gray-700'
                  } ${cellIndex === 3 ? 'bg-brand-sand/50' : ''}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </SlideShell>
  );
}

/** 27 — Decision / next steps closing */
export function NextStepsSlide() {
  const company = useCompany();
  const Mail = iconByKey('email');
  const Phone = iconByKey('phone');
  return (
    <DarkSlide number="27">
      <div className="flex h-full flex-col justify-between">
        <div>
          <Logo size={22} tone="light" />
          <div className="mt-6">
            <BrandRule width={72} thickness={2} tone="gold" />
          </div>
          <div className="mt-8 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Next steps</div>
          <h2 className="mt-4 max-w-[820px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Approve scope, issue purchase order, schedule kick-off
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 border-t border-white/15 pt-8">
          {[
            ['01', 'Sign quotation QT-2024-0417'],
            ['02', 'Return PO and contacts'],
            ['03', 'Kick-off within ten days']
          ].map(([num, text]) => (
            <div key={num}>
              <div className="text-[11px] font-semibold tabular-nums text-brand-gold">{num}</div>
              <div className="mt-2 text-[15px] font-medium text-white">{text}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-end justify-between">
          <div className="space-y-2 text-[13px] text-white/70">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" strokeWidth={NG_STROKE} /> {company.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" strokeWidth={NG_STROKE} /> {company.phone}
            </div>
          </div>
          <QrPlaceholder size={72} label="Book kick-off" />
        </div>
      </div>
    </DarkSlide>
  );
}
