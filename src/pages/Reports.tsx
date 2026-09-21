import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { A4, A4Page, DocumentHeader, DocumentFooter } from '../components/documents/DocumentChrome';
import { Logo, BrandRule } from '../components/brand/Logo';
import { QrPlaceholder } from '../components/brand/iconSystem';
import { company } from '../data/brand';

const PAD = 64;

function MiniBarChart() {
  const bars = [
  { label: 'Q1', value: 42 },
  { label: 'Q2', value: 58 },
  { label: 'Q3', value: 71 },
  { label: 'Q4', value: 96 }];

  return (
    <div>
      <div className="relative flex h-[150px] items-end gap-6 border-b border-l border-gray-200 pl-5">
        {bars.map((bar, index) =>
        <div key={bar.label} className="flex flex-1 flex-col items-center justify-end">
            <span className="mb-1 text-[9px] font-semibold tabular-nums text-ink">{bar.value}</span>
            <div
            className="w-full"
            style={{ height: `${bar.value}%`, backgroundColor: index === bars.length - 1 ? '#C9A227' : '#2D5A8A' }} />
          
          </div>
        )}
      </div>
      <div className="flex gap-6 pl-5 pt-2">
        {bars.map((bar) =>
        <div key={bar.label} className="flex-1 text-center text-[8.5px] font-medium text-gray-500">
            {bar.label}
          </div>
        )}
      </div>
    </div>);

}

function MiniLineChart() {
  const points = [18, 26, 24, 38, 46, 44, 58, 66, 74, 71, 88, 96];
  const max = 100;
  const path = points.
  map((value, index) => {
    const x = index / (points.length - 1) * 100;
    const y = 100 - value / max * 100;
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).
  join(' ');
  return (
    <div className="relative h-[150px] border-b border-l border-gray-200">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path d={path} fill="none" stroke="#1E3A5F" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>);

}

export function ReportsPage() {
  return (
    <>
      <PageHeader
        code="09"
        title="Corporate Reports"
        folder="09_REPORTS"
        description="A report shell that carries company, technical, sales and project reporting: cover, executive summary, data pages, tables, conclusions and contact. Charts use Primary Light with the current period in Gold, and every figure carries a source line." />
      

      <GroupLabel note="Company · technical · sales · project">Report cover</GroupLabel>
      <AssetFrame
        title="Report — Cover"
        fileName="NubiaGo_Report_01_Cover"
        spec="A4 · 210 × 297 mm"
        description="Reporting period and classification sit above the title; the metadata block below records author, reference and distribution."
        width={A4.width}
        height={A4.height}>
        
        <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD }}>
          <div className="flex items-start justify-between">
            <Logo size={24} />
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">Internal · Confidential</span>
          </div>
          <div>
            <BrandRule width={96} thickness={2} />
            <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">
              Quarterly business review · Q4 2024
            </div>
            <h1 className="mt-4 max-w-[560px] text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
              Settlement performance and market expansion
            </h1>
            <p className="mt-5 max-w-[440px] text-[14px] leading-[1.7] text-gray-700">
              Volume, uptime and corridor performance across twelve markets, with the 2025 expansion case.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-8 border-t border-gray-200 pt-6">
              {[
              ['Reference', 'QBR-2024-Q4'],
              ['Prepared by', '[Name Surname]'],
              ['Date', '19 December 2024'],
              ['Distribution', 'Board · Executive']].
              map(([label, value]) =>
              <div key={label}>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
                  <div className="mt-1 text-[12px] font-medium text-ink">{value}</div>
                </div>
              )}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-3 text-[9px] uppercase tracking-[0.14em] text-gray-500">
              {company.endorsement}
            </div>
          </div>
        </div>
      </AssetFrame>

      <GroupLabel note="One page, four findings">Executive summary</GroupLabel>
      <AssetFrame
        title="Report — Executive Summary"
        fileName="NubiaGo_Report_02_Executive_Summary"
        spec="A4 · 210 × 297 mm"
        description="Headline figures, then findings as numbered statements. Written so a reader who stops here still has the argument."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="continuation" documentTitle="QBR-2024-Q4 · Executive summary" />}
          footer={<DocumentFooter variant="minimal" page="02 / 24" />}>
          
          <div className="pt-9">
            <h1 className="text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">Executive summary</h1>
            <BrandRule width={64} thickness={3} />
            <div className="mt-7 grid grid-cols-4 gap-6">
              {[
              ['$96M', 'Q4 settled volume'],
              ['+128%', 'Year on year'],
              ['99.95%', 'Settlement uptime'],
              ['4', 'Corridors added']].
              map(([value, label]) =>
              <div key={label} className="border-t-2 border-brand pt-3">
                  <div className="text-[26px] font-bold tracking-[-0.025em] text-brand">{value}</div>
                  <div className="mt-1 text-[8.5px] font-medium uppercase tracking-[0.12em] text-gray-500">{label}</div>
                </div>
              )}
            </div>
            <div className="mt-9 space-y-5">
              {[
              [
              'Volume growth came from corridor additions, not price',
              'Average take rate held at 0.78% while volume grew 128%, confirming that expansion rather than repricing drove the quarter.'],

              [
              'Settlement reliability held through every launch',
              'Uptime remained above the 99.9% target in all twelve markets, including the four launched during the period.'],

              [
              'Onboarding time is now the binding constraint',
              'Average merchant onboarding of 4.2 days is the longest step before revenue; reducing it is the highest-value change available in 2025.'],

              [
              'The 2025 case rests on three corridors',
              'Senegal, Tanzania and Zambia account for 71% of projected incremental volume and should be sequenced first.']].

              map(([title, body], index) =>
              <div key={title} className="flex gap-5 border-t border-gray-200 pt-4">
                  <span className="text-[11px] font-semibold tabular-nums text-brand-light">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
                    <p className="mt-1.5 text-[10.5px] leading-[1.8] text-gray-700">{body}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Charts, commentary and source lines">Data page</GroupLabel>
      <AssetFrame
        title="Report — Data Page"
        fileName="NubiaGo_Report_03_Data_Page"
        spec="A4 · 210 × 297 mm"
        description="Two charts with commentary beside each, and a source line under every exhibit. Figures never appear without an attribution."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="continuation" documentTitle="QBR-2024-Q4 · Performance" />}
          footer={<DocumentFooter variant="minimal" page="06 / 24" />}>
          
          <div className="pt-9">
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">Settlement performance</h1>
            <BrandRule width={56} thickness={3} />

            <section className="mt-7">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                Exhibit 1 — Settled volume by quarter
              </h2>
              <div className="mt-4 grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <MiniBarChart />
                </div>
                <div className="col-span-5 text-[10px] leading-[1.8] text-gray-700">
                  <p>
                    Volume grew in every quarter, with Q4 carrying the four corridors launched in September. The Gold
                    column marks the current period.
                  </p>
                  <p className="mt-3">
                    Growth is concentrated in West Africa, which represents 62% of settled volume for the year.
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[8.5px] text-gray-500">Source: internal settlement ledger, December 2024. USD millions.</p>
            </section>

            <section className="mt-8">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                Exhibit 2 — Monthly volume trend
              </h2>
              <div className="mt-4 grid grid-cols-12 gap-8">
                <div className="col-span-7">
                  <MiniLineChart />
                </div>
                <div className="col-span-5 text-[10px] leading-[1.8] text-gray-700">
                  <p>
                    The trend is unbroken except for the April reconciliation migration, which suppressed reported
                    volume for a single month without affecting value dated.
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[8.5px] text-gray-500">Source: internal settlement ledger, December 2024. USD millions.</p>
            </section>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Dense figures, scannable rows">Table page</GroupLabel>
      <AssetFrame
        title="Report — Table Page"
        fileName="NubiaGo_Report_04_Table_Page"
        spec="A4 · 210 × 297 mm"
        description="Market-level table with status marked in semantic colour. Semantic colours appear only as status, never as decoration."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="continuation" documentTitle="QBR-2024-Q4 · Market detail" />}
          footer={<DocumentFooter variant="minimal" page="11 / 24" />}>
          
          <div className="pt-9">
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">Market detail</h1>
            <BrandRule width={56} thickness={3} />
            <table className="mt-6 w-full border-collapse text-[9.5px]">
              <thead>
                <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
                  <th className="px-3 py-2.5 font-medium">Market</th>
                  <th className="px-3 py-2.5 text-right font-medium">Volume $M</th>
                  <th className="px-3 py-2.5 text-right font-medium">Merchants</th>
                  <th className="px-3 py-2.5 text-right font-medium">Uptime</th>
                  <th className="px-3 py-2.5 text-right font-medium">Onboarding</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                ['Nigeria', '38.4', '7,240', '99.98%', '3.1 d', 'On track', '#22C55E'],
                ['Ghana', '17.2', '3,110', '99.96%', '3.8 d', 'On track', '#22C55E'],
                ['Kenya', '13.9', '2,480', '99.94%', '4.4 d', 'On track', '#22C55E'],
                ['Côte d’Ivoire', '9.1', '1,620', '99.91%', '5.6 d', 'Watch', '#F59E0B'],
                ['South Africa', '8.3', '1,410', '99.97%', '3.4 d', 'On track', '#22C55E'],
                ['Senegal', '4.6', '890', '99.89%', '6.9 d', 'Watch', '#F59E0B'],
                ['Tanzania', '2.8', '540', '99.72%', '8.2 d', 'Action', '#EF4444'],
                ['Zambia', '1.7', '310', '99.93%', '5.1 d', 'On track', '#22C55E']].
                map((row) =>
                <tr key={row[0]}>
                    <td className="border-b border-gray-200 px-3 py-2.5 font-medium text-ink">{row[0]}</td>
                    <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">{row[1]}</td>
                    <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">{row[2]}</td>
                    <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">{row[3]}</td>
                    <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">{row[4]}</td>
                    <td className="border-b border-gray-200 px-3 py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-gray-700">
                        <span className="h-1.5 w-1.5" style={{ backgroundColor: row[6] }} aria-hidden="true" />
                        {row[5]}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between text-[8.5px] text-gray-500">
              <span>Source: internal settlement ledger and onboarding system, December 2024.</span>
              <span>Volumes rounded to one decimal place.</span>
            </div>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Findings, recommendations, next steps">Conclusions</GroupLabel>
      <AssetFrame
        title="Report — Conclusions"
        fileName="NubiaGo_Report_05_Conclusions"
        spec="A4 · 210 × 297 mm"
        description="Recommendations with an owner and a date against each one, closing on a decision requested from the reader."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="continuation" documentTitle="QBR-2024-Q4 · Conclusions" />}
          footer={<DocumentFooter variant="minimal" page="22 / 24" />}>
          
          <div className="pt-9">
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
              Conclusions and recommendations
            </h1>
            <BrandRule width={56} thickness={3} />
            <div className="mt-7 space-y-4">
              {[
              ['Reduce onboarding to under three days', 'Operations', 'Q1 2025'],
              ['Sequence Senegal, Tanzania and Zambia first', 'Commercial', 'Q1 2025'],
              ['Move reconciliation to ISO 20022 by default', 'Platform', 'Q2 2025'],
              ['Publish corridor-level service levels', 'Commercial', 'Q2 2025']].
              map(([action, owner, due]) =>
              <div key={action} className="grid grid-cols-12 items-center gap-4 border-b border-gray-200 pb-3.5">
                  <div className="col-span-7 text-[12px] font-medium text-ink">{action}</div>
                  <div className="col-span-3 text-[10px] text-gray-500">{owner}</div>
                  <div className="col-span-2 text-right text-[10px] tabular-nums text-brand">{due}</div>
                </div>
              )}
            </div>
            <div className="mt-9 border-l-2 border-brand-gold bg-gray-50 px-5 py-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">Decision requested</div>
              <p className="mt-2 text-[11px] leading-[1.8] text-gray-700">
                Approval of the 2025 corridor sequence and the associated operations headcount, to be confirmed at the
                January board meeting.
              </p>
            </div>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Closes every report">Contact page</GroupLabel>
      <AssetFrame
        title="Report — Contact Page"
        fileName="NubiaGo_Report_06_Contact"
        spec="A4 · 210 × 297 mm"
        description="Author, department contacts and a QR placeholder for the online version, over the reversed closing band."
        width={A4.width}
        height={A4.height}>
        
        <div className="flex h-full w-full flex-col justify-between bg-white" style={{ padding: PAD, paddingBottom: 0 }}>
          <div>
            <div className="pb-5">
              <Logo size={22} />
            </div>
            <BrandRule width="100%" thickness={1} />
            <h1 className="mt-12 text-[30px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
              Questions on this report
            </h1>
            <div className="mt-8 grid grid-cols-2 gap-10">
              {[
              ['Report author', '[Name Surname]', '[Job Title]', company.email],
              ['Investor relations', '[Name Surname]', '[Job Title]', 'ir@nubiago.com'],
              ['Commercial enquiries', '[Name Surname]', '[Job Title]', 'sales@nubiago.com'],
              ['Press', '[Name Surname]', '[Job Title]', 'press@nubiago.com']].
              map(([label, name, title, email]) =>
              <div key={label} className="border-t border-gray-200 pt-4">
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">{label}</div>
                  <div className="mt-2 text-[13px] font-semibold text-ink">{name}</div>
                  <div className="text-[10px] text-gray-500">{title}</div>
                  <div className="mt-1 text-[10px] text-gray-700">{email}</div>
                </div>
              )}
            </div>
          </div>
          <div className="-mx-16 bg-brand px-16 py-9">
            <div className="flex items-end justify-between">
              <Logo size={20} tone="light" />
              <QrPlaceholder size={64} label="Online version" tone="dark" />
            </div>
            <div className="mt-6 border-t border-white/15 pt-3 text-[10px] leading-[1.7] text-white/60">
              {company.endorsement} · {company.legalName} · {company.addressLine1}, {company.addressLine2},{' '}
              {company.country} · {company.registration} · {company.taxId}
            </div>
          </div>
        </div>
      </AssetFrame>
    </>);

}