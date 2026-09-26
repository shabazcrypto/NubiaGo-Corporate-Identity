import type { JSX } from 'react';
import { BrandRule } from '@/components/brand/Logo';
import {
  AshBakWordmark,
  Body,
  BP_PAD,
  BulletList,
  Callout,
  DataTable,
  Eyebrow,
  Field,
  Fill,
  FlowBox,
  Grow,
  H1,
  H2,
  MetricStrip,
  PanelGrid,
  PlanShell,
  Small,
  Stack2
} from './PlanChrome';

export const BP_TOTAL = 17;

export function PlanCover() {
  return (
    <div className="box-border flex h-full w-full flex-col justify-between bg-brand" style={{ padding: BP_PAD }}>
      <div className="flex items-start justify-between">
        <AshBakWordmark size={24} tone="light" />
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55">Confidential</span>
      </div>
      <div>
        <BrandRule width={96} thickness={2} tone="gold" />
        <div className="mt-7 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
          Master business plan 2026
        </div>
        <h1 className="mt-6 text-[80px] font-bold leading-none tracking-[-0.04em] text-white">2026</h1>
        <p className="mt-6 max-w-[520px] text-[17px] font-semibold leading-snug tracking-[-0.02em] text-white">
          $0 → $250,000,000 annual revenue
        </p>
        <p className="mt-4 max-w-[480px] text-[14px] leading-[1.65] text-white/70">
          Initial operating businesses: NubiaGo and Bagster. Strategic parent: AshBak Industries Inc. — Delaware.
          Turkish operating company after market fit and $100K revenue. Long-term financial infrastructure evaluated
          only after $250M annual revenue.
        </p>
      </div>
      <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[11px] text-white/55">
        <span>AshBak Industries Inc. · Delaware · Nov 2026 incorporation planned</span>
        <span>ashbakindustries.com</span>
      </div>
    </div>
  );
}

export function PlanFrontMatter() {
  const facts = [
    ['Document', 'Master Business Plan'],
    ['Classification', 'Confidential — internal'],
    ['Strategic parent', 'AshBak Industries Inc. (Delaware)'],
    ['Turkish ops', 'AshBak Industries AŞ — after $100K + market fit'],
    ['Initial portfolio', 'NubiaGo · Bagster'],
    ['Payments', 'Strategic review only after $250M ARR'],
    ['Base AOV', '$50'],
    ['Base take rate', '20% → $10 revenue / order']
  ];
  const toc = [
    ['01', 'Executive summary'],
    ['02', 'Vision & mission'],
    ['03', 'Strategic architecture'],
    ['04', 'Corporate formation'],
    ['05', 'Portfolio — NubiaGo'],
    ['06', 'Marketplace economics'],
    ['07', 'Revenue ladder & AOV'],
    ['08', 'Unit economics & margins'],
    ['09', 'Suppliers & customers'],
    ['10', 'Ground sales'],
    ['11', 'Phases 1–5'],
    ['12', 'Phases 6–10'],
    ['13', 'Finance & capital'],
    ['14', 'KPI, org & technology'],
    ['15', 'Risk & strategic rules'],
    ['16', 'Master map & end state']
  ];
  return (
    <PlanShell page={2} total={BP_TOTAL} chapter="Front matter">
      <Stack2
        topWeight={1.15}
        bottomWeight={1}
        top={
          <Fill>
            <Eyebrow>Document control</Eyebrow>
            <H1>AshBak Industries — Master Business Plan</H1>
            <Body>
              Operating blueprint for building a technology group from NubiaGo and Bagster to $250M annual revenue.
              Distinguishes GMV from revenue, revenue from profit, and validation from scale.
            </Body>
            <Grow className="mt-2">
              <div className="grid h-full auto-rows-fr grid-cols-2 gap-x-4">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex flex-col justify-center border-t border-gray-200">
                    <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500">{k}</div>
                    <div className="mt-0.5 text-[13px] font-medium leading-snug text-ink">{v}</div>
                  </div>
                ))}
              </div>
            </Grow>
            <Callout title="Strategic principle">
              Build → Validate → Monetize → Scale → Integrate → Expand — not Build → Spend → Hire → Hope.
            </Callout>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>Contents</Eyebrow>
            <H1>How to read this plan</H1>
            <Body>Each chapter maps to a downloadable A4 artboard · print-ready at 300 dpi.</Body>
            <Grow className="mt-1.5">
              <div className="flex h-full min-h-0 flex-col border border-gray-200">
                <div className="grid shrink-0 grid-cols-2 gap-x-5 px-3 pt-2">
                  {[toc.slice(0, 8), toc.slice(8)].map((col, i) => (
                    <ul key={i} className="space-y-0">
                      {col.map(([n, t]) => (
                        <li key={n} className="flex items-baseline gap-2 border-b border-gray-100 py-1">
                          <span className="w-5 text-[11px] font-semibold tabular-nums text-black">{n}</span>
                          <span className="text-[13px] text-ink">{t}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                <div className="mt-auto border-t border-gray-200 bg-gray-50 px-3 py-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Reading note</div>
                  <p className="mt-1 text-[12.5px] leading-[1.5] text-gray-700">
                    Max two sections per artboard. Tables and diagrams are sized for A4 print. Export PNG or PDF at
                    300 dpi from each card. AshBak-only section — not shown under NubiaGo brand.
                  </p>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanExec() {
  return (
    <PlanShell page={3} total={BP_TOTAL} chapter="01 · Executive summary">
      <Fill>
        <Eyebrow>01 · Executive summary</Eyebrow>
        <H1>A technology group — not a payments company first</H1>
        <Body>
          AshBak Industries builds, operates, and scales interconnected digital businesses. Initial portfolio: NubiaGo
          (marketplace/commerce) and Bagster. Payment infrastructure evaluated only after $250M annual revenue.
        </Body>
        <MetricStrip
          items={[
            { label: 'Revenue / order', value: '$10', hint: 'AOV $50 × 20% take' },
            { label: 'Path to $100K', value: '$500K GMV', hint: '≈ 10,000 orders' },
            { label: 'Path to $250M', value: '$1.25B GMV', hint: '≈ 25M orders / year' },
            { label: 'Daily at $250M', value: '~68,500', hint: 'Orders / day @ $50 AOV' }
          ]}
        />
        <H2>Revenue journey</H2>
        <div className="mt-1 border border-gray-200 bg-gray-50 px-3 py-2.5 text-[13px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          $0 → $100K → $500K → $1M → $3M → $10M → $25M → $50M → $100M → $175M → $250M annual revenue
        </div>
        <div className="mt-2 grid shrink-0 grid-cols-2 gap-2">
          <div className="border border-gray-200 p-3">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Base-case economics</div>
            <ul className="mt-2 space-y-1 text-[12.5px] leading-[1.45] text-gray-700">
              <li>· AOV $50 · Take rate 20% · $10 revenue / order</li>
              <li>· Supplier-side transaction value ≈ $40</li>
              <li>· $100K ARR ≈ $500K GMV · 10,000 orders</li>
              <li>· $250M ARR ≈ $1.25B GMV · 25M orders / year</li>
              <li>· ≈ 2.08M orders / month · ~68,500 / day</li>
            </ul>
          </div>
          <div className="border border-black bg-black p-3 text-white">
            <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/55">First objective</div>
            <p className="mt-2 text-[12px] font-semibold leading-[1.45]">
              Build a large, profitable technology group from NubiaGo and Bagster.
            </p>
            <p className="mt-2 text-[12.5px] leading-[1.5] text-white/70">
              The first strategic objective is not payments. Payment infrastructure is evaluated only after $250M
              annual revenue.
            </p>
          </div>
        </div>
        <Grow className="mt-2">
          <div className="grid h-full grid-cols-3 gap-2">
            {[
              ['NubiaGo', 'Primary marketplace / commerce engine. Aggregates suppliers → buyers → GMV → take rate.'],
              ['Bagster', 'Second portfolio business. Must develop clear unit economics alongside NubiaGo.'],
              ['AshBak HQ', 'Operating system: Strategy → Objectives → KPIs → Actuals → Variance → Action.']
            ].map(([t, d]) => (
              <div key={t} className="flex flex-col border border-gray-200 bg-gray-50 p-3">
                <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">{t}</div>
                <p className="mt-2 text-[12.5px] leading-[1.5] text-ink">{d}</p>
              </div>
            ))}
          </div>
        </Grow>
      </Fill>
    </PlanShell>
  );
}

export function PlanVision() {
  return (
    <PlanShell page={4} total={BP_TOTAL} chapter="02 · Vision">
      <Stack2
        topWeight={1}
        bottomWeight={1.05}
        top={
          <Fill>
            <Eyebrow>02 · Vision</Eyebrow>
            <H1>The AshBak vision</H1>
            <Field>
              <p className="text-[14px] font-semibold leading-[1.45] tracking-[-0.02em] text-ink">
                Build a global technology group that creates interconnected digital businesses, aggregates demand and
                supply, develops shared infrastructure, and eventually expands into financial infrastructure.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ['Create', 'Interconnected digital businesses across commerce and operations'],
                  ['Aggregate', 'Demand and supply networks with measurable GMV economics'],
                  ['Expand', 'Into financial infrastructure only after $250M ARR']
                ].map(([t, d]) => (
                  <div key={t} className="border border-gray-200 bg-white p-2.5">
                    <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">{t}</div>
                    <div className="mt-1 text-[12.5px] leading-snug text-ink">{d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-auto border-t border-gray-200 pt-2.5">
                <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Long-term horizon</div>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-gray-700">
                  Financial infrastructure is deliberately deferred. The first journey is NubiaGo + Bagster to $250M
                  annual revenue — then evaluate payments.
                </p>
              </div>
            </Field>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>02 · Mission & principle</Eyebrow>
            <H1>How AshBak operates</H1>
            <Body>
              Build useful digital businesses, prove their economics, scale them systematically, and create additional
              value through shared technology, data, distribution, operations, and infrastructure.
            </Body>
            <Grow className="mt-2">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-black bg-black p-3.5 text-white">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/55">Follow</div>
                  <div className="mt-2 text-[13px] font-semibold leading-snug">
                    Build → Validate → Monetize → Scale → Integrate → Expand
                  </div>
                  <p className="mt-3 text-[11px] leading-[1.45] text-white/55">
                    Evidence before headcount. Economics before complexity. Scale only when gates are satisfied.
                  </p>
                </div>
                <div className="flex flex-col border border-gray-200 bg-gray-50 p-3.5">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">Not</div>
                  <div className="mt-2 text-[13px] font-semibold leading-snug text-ink">
                    Build → Spend → Hire → Hope
                  </div>
                  <p className="mt-3 text-[11px] leading-[1.45] text-gray-500">
                    Do not look like a $1B company before earning the economics of becoming one.
                  </p>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanArchFormation() {
  return (
    <PlanShell page={5} total={BP_TOTAL} chapter="03–04 · Structure">
      <Stack2
        topWeight={1.15}
        bottomWeight={0.9}
        top={
          <Fill>
            <Eyebrow>03 · Strategic architecture</Eyebrow>
            <H1>Corporate structure</H1>
            <Body>
              AshBak Industries Inc. (Delaware) is the strategic parent. NubiaGo and Bagster sit under shared
              infrastructure and AshBak HQ. AshBak Industries AŞ supports Turkish operational execution after market fit.
            </Body>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <FlowBox
                  fill
                  lines={[
                    'ASHBAK INDUSTRIES INC. (Delaware)',
                    '              │',
                    '    ┌─────────┴─────────┐',
                    ' NubiaGo             Bagster',
                    '    └─────────┬─────────┘',
                    '     Shared Infrastructure',
                    '          AshBak HQ',
                    '   Finance · Ops · Technology',
                    '              │',
                    '   AshBak Industries AŞ',
                    '    Turkish Operations'
                  ]}
                />
                <FlowBox
                  fill
                  lines={[
                    'Later structure',
                    'AshBak Industries Inc.',
                    '├── NubiaGo',
                    '├── Bagster',
                    '├── AshBak Shared Platform',
                    '└── AshBak Industries AŞ',
                    '     ├── Operations',
                    '     ├── Finance',
                    '     ├── Support',
                    '     ├── Administration',
                    '     └── Regional execution'
                  ]}
                />
              </div>
            </Grow>
            <Small>
              Legal, tax, IP, transfer-pricing, employment, and regulatory structure — finalize with US & Turkish counsel.
            </Small>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>04 · Corporate formation</Eyebrow>
            <H1>Two-stage formation</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                    Stage 1 · Nov 2026
                  </div>
                  <div className="mt-1.5 text-[15px] font-bold tracking-[-0.02em] text-ink">AshBak Industries Inc.</div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-gray-600">
                    Delaware strategic parent. Initial portfolio: NubiaGo and Bagster.
                  </p>
                  <ul className="mt-3 space-y-0.5 text-[11px] text-gray-600">
                    <li>· Strategic ownership & IP</li>
                    <li>· Group-level capital allocation</li>
                    <li>· Parent for operating businesses</li>
                  </ul>
                </div>
                <div className="flex flex-col border border-black bg-black p-3 text-white">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    Stage 2 · $100K + market fit
                  </div>
                  <div className="mt-1.5 text-[15px] font-bold tracking-[-0.02em]">AshBak Industries AŞ</div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-white/70">
                    Turkish ops — execution support, not a duplicate parent. Ops, finance, support, supplier coordination,
                    sales ops, regional execution.
                  </p>
                  <p className="mt-3 text-[11px] text-white/50">
                    Gate: proven demand · paying customers · ≈ $100K revenue
                  </p>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanPortfolioEconomics() {
  return (
    <PlanShell page={6} total={BP_TOTAL} chapter="05–07 · Marketplace">
      <Stack2
        top={
          <Fill>
            <Eyebrow>05 · Initial business portfolio</Eyebrow>
            <H1>NubiaGo — primary marketplace engine</H1>
            <Callout title="Fundamental model">
              Suppliers → NubiaGo → Buyers → Orders → GMV → Take Rate → AshBak Revenue
            </Callout>
            <Body>
              Aggregates manufacturers, wholesalers, distributors, exporters, importers, regional and specialized
              suppliers — without owning all inventory. Bagster is the second growth engine.
            </Body>
            <Grow className="mt-1.5">
              <PanelGrid
                fill
                cols={3}
                items={[
                  { title: 'China', body: 'Manufacturing depth, variety, competitive pricing, OEM / private label' },
                  { title: 'Turkey', body: 'Proximity, regional logistics, export-oriented manufacturers' },
                  { title: 'Vietnam', body: 'Manufacturing diversification and sourcing balance' }
                ]}
              />
            </Grow>
            <Small>
              India, SEA, Europe, Middle East as economics justify. Diversified supply — not one-country dependence.
            </Small>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>06–07 · Economics & GMV</Eyebrow>
            <H1>Measurable operating model</H1>
            <MetricStrip
              items={[
                { label: 'AOV', value: '$50' },
                { label: 'Take rate', value: '20%' },
                { label: 'Rev / order', value: '$10' }
              ]}
            />
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Formulas</div>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-[1.4] text-gray-700">
                    <li>Revenue = GMV × Take Rate</li>
                    <li>GMV = Orders × AOV</li>
                    <li>AshBak Revenue = Orders × $10</li>
                  </ul>
                  <p className="mt-auto pt-2 text-[11px] text-gray-500">
                    $1.25B GMV × 20% = $250M revenue
                  </p>
                </div>
                <div className="flex flex-col">
                  <DataTable
                    dense
                    headers={['Metric', 'Meaning']}
                    rows={[
                      ['GMV', 'Total value transacted'],
                      ['Revenue', 'AshBak take on GMV'],
                      ['Profit', 'Revenue − operating costs']
                    ]}
                  />
                  <Callout title="Critical distinction">
                    A $1.25B marketplace is not a $1.25B-revenue company at 20% take.
                  </Callout>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanLadder() {
  return (
    <PlanShell page={7} total={BP_TOTAL} chapter="08–09 · Ladder">
      <Stack2
        topWeight={1.35}
        bottomWeight={0.75}
        top={
          <Fill>
            <Eyebrow>08 · Revenue ladder</Eyebrow>
            <H1>Ten-phase ARR / GMV / orders</H1>
            <Grow className="mt-1.5 justify-between">
              <DataTable
                dense
                headers={['Phase', 'ARR', 'GMV', 'Orders @ $50']}
                rows={[
                  ['1', '$100K', '$500K', '10,000'],
                  ['2', '$500K', '$2.5M', '50,000'],
                  ['3', '$1M', '$5M', '100,000'],
                  ['4', '$3M', '$15M', '300,000'],
                  ['5', '$10M', '$50M', '1,000,000'],
                  ['6', '$25M', '$125M', '2,500,000'],
                  ['7', '$50M', '$250M', '5,000,000'],
                  ['8', '$100M', '$500M', '10,000,000'],
                  ['9', '$175M', '$875M', '17,500,000'],
                  ['10', '$250M', '$1.25B', '25,000,000']
                ]}
              />
              <MetricStrip
                items={[
                  { label: '+$1M GMV', value: '+$200K', hint: 'AshBak revenue @ 20%' },
                  { label: '100K orders', value: '+$1M', hint: 'Revenue @ $50 AOV' },
                  { label: 'Phase 10', value: '25M', hint: 'Orders / year target' }
                ]}
              />
            </Grow>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>09 · AOV sensitivity</Eyebrow>
            <H1>$50 AOV is a planning assumption</H1>
            <Body>Strategic volume metric is GMV. AOV sets how many transactions produce that GMV.</Body>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-[1.25fr_0.75fr] gap-2">
                <div className="flex flex-col">
                  <DataTable
                    dense
                    headers={['AOV', 'Rev / order', 'Orders for $250M', 'GMV']}
                    rows={[
                      ['$25', '$5', '50M', '$1.25B'],
                      ['$50', '$10', '25M', '$1.25B'],
                      ['$75', '$15', '16.67M', '$1.25B'],
                      ['$100', '$20', '12.5M', '$1.25B']
                    ]}
                  />
                  <Callout title="Implication">
                    Higher AOV reduces required order volume for the same GMV. Continuously measure actual AOV — do not
                    treat $50 as permanent.
                  </Callout>
                </div>
                <div className="flex flex-col border border-gray-200 bg-gray-50 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Constant</div>
                  <div className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-ink">$1.25B</div>
                  <div className="mt-1 text-[11.5px] text-gray-600">GMV for $250M ARR @ 20% take</div>
                  <div className="mt-auto space-y-2 border-t border-gray-200 pt-3 text-[11.5px] leading-[1.45] text-gray-600">
                    <div>
                      <span className="font-semibold text-ink">At $50 AOV:</span> 25M orders / year
                    </div>
                    <div>
                      <span className="font-semibold text-ink">At $100 AOV:</span> 12.5M orders / year
                    </div>
                    <div>
                      <span className="font-semibold text-ink">At $25 AOV:</span> 50M orders / year
                    </div>
                  </div>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanMargins() {
  return (
    <PlanShell page={8} total={BP_TOTAL} chapter="10–11 · Margins">
      <Stack2
        topWeight={0.85}
        bottomWeight={1.15}
        top={
          <Fill>
            <Eyebrow>10 · Marketplace unit economics</Eyebrow>
            <H1>Take rate is not profit</H1>
            <div className="mt-1.5 grid flex-1 grid-cols-2 gap-2">
              <FlowBox
                fill
                lines={[
                  'Customer order $50',
                  '        ↓',
                  'AshBak take $10',
                  '        ↓',
                  '− Payment · Refunds · Chargebacks',
                  '− Fraud · Infra · Support',
                  '− Commissions · Promos · Logistics',
                  '        ↓',
                  'Contribution profit',
                  '        ↓',
                  '− Fixed opex → EBITDA'
                ]}
              />
              <div className="flex flex-col border border-gray-200 p-3">
                <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Track the chain</div>
                <p className="mt-2 text-[12px] font-semibold leading-snug text-ink">
                  GMV → Revenue → Gross Profit → Contribution → EBITDA → Cash Flow
                </p>
                <p className="mt-auto pt-3 text-[11.5px] leading-[1.45] text-gray-600">
                  20% take is revenue, not profit. Contribution must clear variable costs before fixed opex.
                </p>
              </div>
            </div>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>11 · Margin framework</Eyebrow>
            <H1>Internal planning targets</H1>
            <DataTable
              dense
              headers={['Stage', 'Gross', 'Contribution', 'EBITDA']}
              rows={[
                ['$100K', '~50–60%', 'Neg → Pos', 'Negative'],
                ['$500K', '~55–65%', '~10–20%', 'Neg → BE'],
                ['$1M', '~60–65%', '~15–25%', '~0–5%'],
                ['$3M', '~60–70%', '~20–30%', '~5–10%'],
                ['$10M', '~65–70%', '~20–30%', '~5–15%'],
                ['$25M', '~65–75%', '~25–35%', '~10–15%'],
                ['$50M', '~70–75%', '~25–35%', '~10–20%'],
                ['$100M', '~70–80%', '~30–40%', '~15–20%'],
                ['$175M', '~70–80%', '~30–40%', '~15–25%'],
                ['$250M', '~70–80%', '~30–40%', '~15–25%']
              ]}
            />
            <Callout title="At $250M ARR">
              15% EBITDA = $37.5M · 20% = $50M · 25% = $62.5M. Early stages prove the engine — not maximize EBITDA.
            </Callout>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanSupplyDemand() {
  return (
    <PlanShell page={9} total={BP_TOTAL} chapter="12–16 · Supply & demand">
      <Stack2
        top={
          <Fill>
            <Eyebrow>12–14 · Supplier strategy</Eyebrow>
            <H1>Diversified, productive supply</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Categories</div>
                  <BulletList
                    items={[
                      'Manufacturers — direct sourcing',
                      'Wholesalers — breadth & availability',
                      'Distributors — brands & regional',
                      'Exporters — cross-border',
                      'Specialized — expertise / unique SKUs'
                    ]}
                  />
                </div>
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Quality system</div>
                  <BulletList
                    items={[
                      'Active / approved · Listed vs selling',
                      'Orders, GMV, retention per supplier',
                      'Fulfillment · Cancel · Return · Defect',
                      'Delivery · Response · Contribution',
                      'Objective: productive GMV — not headcount'
                    ]}
                  />
                </div>
              </div>
            </Grow>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>15–16 · Customers & flywheel</Eyebrow>
            <H1>Economic value on both sides</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    Customer metrics
                  </div>
                  <BulletList
                    items={[
                      'New / active / repeat customers',
                      'Orders & GMV per customer · AOV',
                      'CAC · LTV · Retention · Frequency',
                      'Refund rate · Purchase cadence'
                    ]}
                  />
                </div>
                <FlowBox
                  fill
                  lines={[
                    'More Suppliers → More Products',
                    '→ Better Selection → More Buyers',
                    '→ More Orders → Higher GMV',
                    '→ More Revenue → More Investment',
                    '→ More Suppliers',
                    '',
                    'Self-reinforcing marketplace'
                  ]}
                />
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanSales() {
  return (
    <PlanShell page={10} total={BP_TOTAL} chapter="17–20 · Sales">
      <Stack2
        top={
          <Fill>
            <Eyebrow>17–18 · Ground sales timing</Eyebrow>
            <H1>Digital first — field sales after proof</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-4">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Before $100K</div>
                  <div className="mt-2 text-[16px] font-bold tracking-[-0.02em] text-ink">
                    Founder-led + digital acquisition
                  </div>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-gray-600">
                    Evidence that the marketplace works before physical sales scale.
                  </p>
                  <p className="mt-auto pt-3 text-[11px] text-gray-500">No large ground sales organization yet.</p>
                </div>
                <div className="flex flex-col border border-black bg-black p-4 text-white">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/55">After $100K</div>
                  <div className="mt-2 text-[16px] font-bold tracking-[-0.02em]">Digital + field sales</div>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-white/70">
                    Physical sales accelerate supplier and customer acquisition once fit is proven.
                  </p>
                  <p className="mt-auto pt-3 text-[11px] text-white/50">CRM · territory · commissions · activation</p>
                </div>
              </div>
            </Grow>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>19–20 · Roles & productivity</Eyebrow>
            <H1>Hire to GMV capacity — not fantasy</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Roles</div>
                  <BulletList
                    items={[
                      'Supplier Acquisition — find, meet, onboard, activate',
                      'Buyer Acquisition — BD, first order, repeat, growth',
                      'Account Managers — key accounts, expansion, cross-sell'
                    ]}
                  />
                </div>
                <div className="flex flex-col border border-gray-200 bg-gray-50 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">Example</div>
                  <p className="mt-2 text-[12px] font-medium leading-[1.5] text-ink">
                    $1M GMV/rep → $200K revenue at 20% take. Fully loaded cost $70K → $130K before other costs.
                  </p>
                  <p className="mt-auto pt-2 text-[11px] leading-[1.45] text-gray-600">
                    Scale: Productivity → Team → Regional → Country → International — only when capacity produces
                    acceptable economics.
                  </p>
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanPhasesEarly() {
  return (
    <PlanShell page={11} total={BP_TOTAL} chapter="21–25 · Phases 1–5">
      <Fill>
        <Eyebrow>21–25 · Phases 1–5</Eyebrow>
        <H1>$0 → $10M — prove to scale</H1>
        <DataTable
          dense
          headers={['Phase', 'ARR / GMV', 'Focus']}
          rows={[
            ['1 · $0–$100K', '$500K GMV · 10K orders', 'Prove demand, AOV, take rate, fulfillment'],
            ['2 · $100K–$500K', '$2.5M GMV · 50K', 'AŞ if gated · launch ground sales · CRM'],
            ['3 · $500K–$1M', '$5M GMV · 100K', 'Sales mgmt · retention · monthly reviews'],
            ['4 · $1M–$3M', '$15M GMV · 300K', 'Repeatable growth without founder bottleneck'],
            ['5 · $3M–$10M', '$50M GMV · 1M', 'Professional functions · automation · controls']
          ]}
        />
        <Grow className="mt-2">
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="flex flex-col border-l-2 border-black bg-gray-50 px-3 py-3">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">Phase 1 gates</div>
              <p className="mt-1.5 text-[13px] font-medium leading-[1.5] text-ink">
                Customers transact · Suppliers stay active · Orders fulfilled · Take rate achievable · AOV measurable ·
                Repeat activity · Unit economics becoming clear
              </p>
            </div>
            <div className="flex flex-col border-l-2 border-black bg-gray-50 px-3 py-3">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                AshBak HQ (from Phase 5)
              </div>
              <p className="mt-1.5 text-[13px] font-medium leading-[1.5] text-ink">
                Strategy → Objectives → KPIs → Actuals → Variance → Action across Corporate, NubiaGo, Bagster, Sales,
                Finance, Ops, Support, Product, Tech, Analytics
              </p>
            </div>
          </div>
        </Grow>
      </Fill>
    </PlanShell>
  );
}

export function PlanPhasesLate() {
  return (
    <PlanShell page={12} total={BP_TOTAL} chapter="26–31 · Phases 6–10">
      <Fill>
        <Eyebrow>26–31 · Phases 6–10</Eyebrow>
        <H1>$10M → $250M — group to enterprise</H1>
        <DataTable
          dense
          headers={['Phase', 'ARR / GMV', 'Primary objective']}
          rows={[
            ['6 · $10–$25M', '$125M GMV · 2.5M orders', 'Multi-business group · clear P&Ls'],
            ['7 · $25–$50M', '$250M GMV · 5M', 'Shared infra when it creates leverage'],
            ['8 · $50–$100M', '$500M GMV · 10M', 'International scale · multiple engines'],
            ['9 · $100–$175M', '$875M GMV · 17.5M', 'Ecosystem economics & synergies'],
            ['10 · $175–$250M', '$1.25B GMV · 25M', 'Enterprise AshBak · ~68,500 orders/day']
          ]}
        />
        <Grow className="mt-2">
          <div className="grid h-full grid-cols-2 gap-2">
            <div className="flex flex-col border-l-2 border-black bg-gray-50 px-3 py-3">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                Shared infrastructure rule
              </div>
              <p className="mt-1.5 text-[13px] font-medium leading-[1.5] text-ink">
                Do not build shared systems because they are interesting. Build when they create measurable economic
                leverage (identity, billing, analytics, APIs, security, support, reporting).
              </p>
            </div>
            <div className="flex flex-col border-l-2 border-black bg-gray-50 px-3 py-3">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">At $250M maturity</div>
              <p className="mt-1.5 text-[13px] font-medium leading-[1.5] text-ink">
                Mature Finance, Legal, Compliance, Security, Engineering, Product, Data, Marketing, Sales, CS,
                Operations, HR, Corp Dev. First major strategic journey complete.
              </p>
            </div>
          </div>
        </Grow>
      </Fill>
    </PlanShell>
  );
}

export function PlanFinanceCapital() {
  return (
    <PlanShell page={13} total={BP_TOTAL} chapter="32–38 · Finance">
      <Stack2
        top={
          <Fill>
            <Eyebrow>32–34 · $250M waterfall</Eyebrow>
            <H1>Financial target economics</H1>
            <div className="mt-1.5 grid flex-1 grid-cols-2 gap-2">
              <FlowBox
                fill
                lines={[
                  '$1,250,000,000 GMV',
                  '        ↓  20% Take Rate',
                  '$250,000,000 Revenue',
                  '        ↓  Variable Costs',
                  'Gross Profit',
                  '→ Sales & Marketing',
                  '→ Technology & Product',
                  '→ Operations',
                  '→ Finance / Legal / HR',
                  '        ↓',
                  'EBITDA → Cash Flow'
                ]}
              />
              <div className="flex flex-col">
                <DataTable
                  dense
                  headers={['EBITDA margin', 'EBITDA']}
                  rows={[
                    ['10%', '$25M'],
                    ['15%', '$37.5M'],
                    ['20%', '$50M'],
                    ['25%', '$62.5M']
                  ]}
                />
                <Callout title="Not forecasts">
                  Outcomes depend on growth, mix, CAC, leverage, capital allocation. Avoid concentrating $250M on one
                  product/customer without deliberate reason.
                </Callout>
              </div>
            </div>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>35–38 · Capital & acquisition</Eyebrow>
            <H1>Capital follows evidence</H1>
            <Grow className="mt-1.5">
              <PanelGrid
                fill
                cols={2}
                items={[
                  {
                    title: 'Capital stages',
                    body: 'S1 — Product, tech, ops, acquisition, legal. S2 — Sales, marketing, product, WC. S3+ — Analytical: revenue, GMV, margin, capability, defensibility.'
                  },
                  {
                    title: 'Working capital',
                    body: 'Track cash, AR/AP, settlement, supplier payouts, refunds, processor fees. Revenue growth ≠ cash-flow growth.'
                  },
                  {
                    title: 'Customers',
                    body: 'CAC · LTV · Payback · Repeat rate · Contribution per customer. Scale channels on actual economics.'
                  },
                  {
                    title: 'Suppliers',
                    body: 'Acquisition cost · Activation · Time to first order · GMV / supplier. Zero-GMV signups are not productive.',
                    dark: true
                  }
                ]}
              />
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanOpsSystem() {
  return (
    <PlanShell page={14} total={BP_TOTAL} chapter="39–44 · Operating system">
      <Stack2
        top={
          <Fill>
            <Eyebrow>39–41 · KPI & phase gates</Eyebrow>
            <H1>Operate with gates — not vanity</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-1.5 text-[11.5px] leading-[1.4] text-gray-700">
                {[
                  ['Marketplace', 'GMV, orders, AOV, take rate, active buyers/suppliers, repeat, GMV/buyer, GMV/supplier'],
                  ['Financial', 'Revenue, gross/contribution, EBITDA, OCF, burn, runway'],
                  ['Sales', 'Leads, meetings, conversion, GMV & revenue per rep, sales CAC/payback'],
                  ['Customer / Supplier', 'CAC, LTV, retention, fulfillment, quality, defects']
                ].map(([t, d]) => (
                  <div key={t} className="border border-gray-200 px-2.5 py-2">
                    <span className="font-semibold text-ink">{t}</span>
                    <div className="mt-0.5">{d}</div>
                  </div>
                ))}
              </div>
            </Grow>
            <Callout title="All gates required">
              Revenue · GMV · Unit economics · Ops · Customer retention · Supplier quality · Org capacity · Cash. HQ:
              Master Plan → Strategic → Annual → Quarterly → Team → KPIs → Actuals → Variance → Action.
            </Callout>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>42–44 · Organisation & technology</Eyebrow>
            <H1>Hire for the next constraint</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <DataTable
                  dense
                  headers={['Scale', 'Organisation']}
                  rows={[
                    ['$0–$100K', 'Founder-led · small team'],
                    ['$100K–$1M', 'Initial sales · acq. teams'],
                    ['$1–$10M', 'Functional departments'],
                    ['$10–$25M', 'Professional management'],
                    ['$25–$50M', 'Business-unit leadership'],
                    ['$50–$100M', 'International leadership'],
                    ['$100–$250M', 'Enterprise-grade org']
                  ]}
                />
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    Technology follows economics
                  </div>
                  <BulletList
                    items={[
                      'Early — transact, onboard, orders, pay, support, measure',
                      'Middle — automation, data, CRM, analytics, security, APIs',
                      'Later — shared AshBak infra when portfolio benefits',
                      'Unified data so HQ sees where value is created'
                    ]}
                  />
                </div>
              </div>
            </Grow>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanRiskRules() {
  return (
    <PlanShell page={15} total={BP_TOTAL} chapter="45–46 · Risk & rules">
      <Stack2
        topWeight={0.9}
        bottomWeight={1.1}
        top={
          <Fill>
            <Eyebrow>45 · Risk framework</Eyebrow>
            <H1>Protect the economic engine</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-1.5 text-[12.5px] leading-[1.4] text-gray-700">
                {[
                  ['Liquidity', 'Too few buyers or suppliers → fund the constrained side'],
                  ['CAC', 'Uneconomic growth → diversify channels · improve retention'],
                  ['Concentration', 'Supplier or geo dependence → diversify deliberately'],
                  ['Complexity', 'Scale chaos → automation + AshBak HQ'],
                  ['Cash', 'Growth consumes WC → settlement discipline'],
                  ['Tech / Regulatory', 'Progressive architecture · compliance at scale']
                ].map(([t, d]) => (
                  <div key={t} className="border border-gray-200 px-2.5 py-2">
                    <span className="font-semibold text-ink">{t}</span>
                    <div className="mt-0.5">{d}</div>
                  </div>
                ))}
              </div>
            </Grow>
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>46 · Core strategic rules</Eyebrow>
            <H1>Fifteen rules</H1>
            <Field className="mt-1.5 !bg-white">
              <ol className="grid h-full grid-cols-2 gap-x-4 text-[11.5px] leading-[1.3] text-gray-700">
                {[
                  'Revenue before complexity',
                  'Validate before scaling',
                  'Always distinguish GMV and revenue',
                  '20% take rate is revenue, not profit',
                  'Measure the $50 AOV continuously',
                  'Sales headcount needs productivity proof',
                  'Ground sales after $100K + fit',
                  'Supplier growth = productive GMV',
                  'Customer growth = lifetime value',
                  'Capital follows evidence',
                  'Shared infra needs measurable leverage',
                  'AshBak Inc. remains strategic parent',
                  'AshBak AŞ supports execution',
                  'NubiaGo & Bagster need clear economics',
                  'Payments do not start before $250M ARR'
                ].map((r, i) => (
                  <li key={r} className="flex items-center border-b border-gray-100 py-0.5">
                    <span className="mr-1.5 font-semibold text-ink">{i + 1}.</span> {r}
                  </li>
                ))}
              </ol>
            </Field>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanClose() {
  return (
    <PlanShell page={16} total={BP_TOTAL} chapter="47–54 · Close">
      <Stack2
        topWeight={1.25}
        bottomWeight={0.85}
        top={
          <Fill>
            <Eyebrow>47–49 · Master map</Eyebrow>
            <H1>$0 → $250M — the first journey</H1>
            <DataTable
              dense
              headers={['Phase', 'Revenue', 'GMV', 'Orders', 'Objective']}
              rows={[
                ['1', '$100K', '$500K', '10K', 'Prove business'],
                ['2', '$500K', '$2.5M', '50K', 'Build sales engine'],
                ['3', '$1M', '$5M', '100K', 'Sustainable company'],
                ['4', '$3M', '$15M', '300K', 'Repeatable growth'],
                ['5', '$10M', '$50M', '1M', 'Scalable operations'],
                ['6', '$25M', '$125M', '2.5M', 'Multi-business group'],
                ['7', '$50M', '$250M', '5M', 'Shared platform'],
                ['8', '$100M', '$500M', '10M', 'International scale'],
                ['9', '$175M', '$875M', '17.5M', 'Ecosystem economics'],
                ['10', '$250M', '$1.25B', '25M', 'Enterprise AshBak']
              ]}
            />
          </Fill>
        }
        bottom={
          <Fill>
            <Eyebrow>50–54 · End state & payments</Eyebrow>
            <H1>$250M is the foundation</H1>
            <Grow className="mt-1.5">
              <div className="grid h-full grid-cols-2 gap-2">
                <div className="flex flex-col border border-gray-200 p-3">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                    Operating philosophy
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink">
                    $0 Prove · $100K Repeat · $1M Systematize · $10M Scale · $25M Professionalize · $50M Integrate ·
                    $100M Internationalize · $175M Optimize · $250M Enterprise · After: evaluate payments
                  </p>
                </div>
                <div className="flex flex-col border border-black bg-black p-3 text-white">
                  <div className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-white/55">
                    Phase 11+ payments
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-[1.5] text-white/80">
                    Only after $250M. Review processing, merchant payouts, APIs, wallets, cross-border, embedded finance
                    against volume, regulation, security, capital, demand. Never assume today.
                  </p>
                </div>
              </div>
            </Grow>
            <p className="mt-1.5 shrink-0 text-[13px] font-semibold text-ink">
              Customers → Orders → AOV → GMV → Take Rate → Revenue → Margin → EBITDA → Cash Flow
            </p>
            <Small>
              Central model inside AshBak HQ. Valuation (e.g. 4× = $1B) is a market outcome — not automatic with ARR.
            </Small>
          </Fill>
        }
      />
    </PlanShell>
  );
}

export function PlanFinale() {
  const stages = [
    { label: 'Portfolio', items: ['NubiaGo', 'Bagster'] },
    { label: 'Platform', items: ['Shared platform', 'AshBak HQ'] },
    { label: 'Functions', items: ['Sales', 'Finance', 'Operations'] },
    { label: 'Outcome', items: ['$250M revenue', '$1.25B GMV*', '25M orders*'] }
  ];
  return (
    <PlanShell page={17} total={BP_TOTAL} chapter="End state" dark>
      <Fill>
        <Eyebrow light>Ultimate AshBak architecture</Eyebrow>
        <H1 light>Master business architecture</H1>
        <Grow className="mt-2">
          <div className="flex h-full flex-col border border-white/20 p-4">
            <div className="shrink-0 text-center">
              <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">AshBak Industries</div>
              <div className="mt-1 text-[9px] text-white/45">Delaware · Strategic parent</div>
            </div>
            <div className="mx-auto my-3 h-5 w-px shrink-0 bg-white/25" />
            <div className="grid min-h-0 flex-1 grid-cols-4 gap-2">
              {stages.map((s) => (
                <div key={s.label} className="flex flex-col border border-white/20 bg-white/5 px-2.5 py-3">
                  <div className="text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
                    {s.label}
                  </div>
                  <div className="mt-3 flex flex-1 flex-col justify-center space-y-2 text-center">
                    {s.items.map((item) => (
                      <div key={item} className="text-[12px] font-medium text-white">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto my-3 h-5 w-px shrink-0 bg-white/25" />
            <div className="shrink-0 border border-white/25 bg-white px-4 py-3.5 text-center">
              <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-black/50">Next</div>
              <div className="mt-1 text-[14px] font-bold tracking-[-0.02em] text-black">
                Payment infrastructure — strategic review
              </div>
            </div>
            <p className="mt-3 shrink-0 text-center text-[9px] leading-[1.45] text-white/40">
              *Based on initial $50 AOV and 20% take-rate planning assumptions. Execute against this architecture.
            </p>
          </div>
        </Grow>
      </Fill>
    </PlanShell>
  );
}

export type PlanPageEntry = {
  id: string;
  title: string;
  fileName: string;
  description: string;
  group: string;
  note: string;
  render: () => JSX.Element;
};

export const businessPlanCatalog: PlanPageEntry[] = [
  {
    id: 'cover',
    title: 'Cover — Reversed Primary',
    fileName: 'AshBak_BusinessPlan_00_Cover',
    description: 'Reversed primary field with oversized year — statutory annual-report cover DNA.',
    group: 'Cover',
    note: 'Primary field · oversized year',
    render: PlanCover
  },
  {
    id: 'front',
    title: 'Front Matter',
    fileName: 'AshBak_BusinessPlan_01_FrontMatter',
    description: 'Document control on top · Contents below — both fill the field.',
    group: 'Front matter',
    note: 'Control · Contents',
    render: PlanFrontMatter
  },
  {
    id: 'exec',
    title: '01 — Executive Summary',
    fileName: 'AshBak_BusinessPlan_02_ExecSummary',
    description: 'Full-field executive summary with journey and base economics.',
    group: 'Strategy',
    note: '§1',
    render: PlanExec
  },
  {
    id: 'vision',
    title: '02 — Vision & Mission',
    fileName: 'AshBak_BusinessPlan_03_Vision',
    description: 'Vision statement field on top · Mission and principle below.',
    group: 'Strategy',
    note: '§2',
    render: PlanVision
  },
  {
    id: 'arch',
    title: '03–04 — Architecture & Formation',
    fileName: 'AshBak_BusinessPlan_04_ArchFormation',
    description: 'Structure diagrams on top · Two-stage formation below.',
    group: 'Strategy',
    note: '§3–4',
    render: PlanArchFormation
  },
  {
    id: 'portfolio',
    title: '05–07 — Portfolio & Economics',
    fileName: 'AshBak_BusinessPlan_05_PortfolioEconomics',
    description: 'NubiaGo portfolio on top · Economics and GMV below.',
    group: 'Marketplace',
    note: '§5–7',
    render: PlanPortfolioEconomics
  },
  {
    id: 'ladder',
    title: '08–09 — Revenue Ladder',
    fileName: 'AshBak_BusinessPlan_06_Ladder',
    description: 'Phase ladder on top · AOV sensitivity below.',
    group: 'Marketplace',
    note: '§8–9',
    render: PlanLadder
  },
  {
    id: 'margins',
    title: '10–11 — Unit Economics',
    fileName: 'AshBak_BusinessPlan_07_Margins',
    description: 'Transaction waterfall on top · Margin targets below.',
    group: 'Marketplace',
    note: '§10–11',
    render: PlanMargins
  },
  {
    id: 'supply',
    title: '12–16 — Supply & Demand',
    fileName: 'AshBak_BusinessPlan_08_SupplyDemand',
    description: 'Suppliers on top · Customers and flywheel below.',
    group: 'Growth',
    note: '§12–16',
    render: PlanSupplyDemand
  },
  {
    id: 'sales',
    title: '17–20 — Ground Sales',
    fileName: 'AshBak_BusinessPlan_09_Sales',
    description: 'Timing on top · Roles and productivity below.',
    group: 'Growth',
    note: '§17–20',
    render: PlanSales
  },
  {
    id: 'phases1',
    title: '21–25 — Phases 1–5',
    fileName: 'AshBak_BusinessPlan_10_Phases_1_5',
    description: 'Full-field prove-to-scale phase table.',
    group: 'Phases',
    note: '§21–25',
    render: PlanPhasesEarly
  },
  {
    id: 'phases2',
    title: '26–31 — Phases 6–10',
    fileName: 'AshBak_BusinessPlan_11_Phases_6_10',
    description: 'Full-field group-to-enterprise phase table.',
    group: 'Phases',
    note: '§26–31',
    render: PlanPhasesLate
  },
  {
    id: 'finance',
    title: '32–38 — Finance & Capital',
    fileName: 'AshBak_BusinessPlan_12_FinanceCapital',
    description: 'Waterfall on top · Capital and acquisition below.',
    group: 'Finance',
    note: '§32–38',
    render: PlanFinanceCapital
  },
  {
    id: 'ops',
    title: '39–44 — Operating System',
    fileName: 'AshBak_BusinessPlan_13_OpsSystem',
    description: 'KPI gates on top · Org and technology below.',
    group: 'Operations',
    note: '§39–44',
    render: PlanOpsSystem
  },
  {
    id: 'risk',
    title: '45–46 — Risk & Rules',
    fileName: 'AshBak_BusinessPlan_14_RiskRules',
    description: 'Risk grid on top · Fifteen rules below.',
    group: 'Governance',
    note: '§45–46',
    render: PlanRiskRules
  },
  {
    id: 'close',
    title: '47–54 — Master Map & End',
    fileName: 'AshBak_BusinessPlan_15_Close',
    description: 'Master map on top · End state and payments below.',
    group: 'Close',
    note: '§47–54',
    render: PlanClose
  },
  {
    id: 'finale',
    title: 'Architecture — End State',
    fileName: 'AshBak_BusinessPlan_16_Architecture',
    description: 'Full-bleed dark architecture diagram.',
    group: 'Close',
    note: 'End architecture',
    render: PlanFinale
  }
];
