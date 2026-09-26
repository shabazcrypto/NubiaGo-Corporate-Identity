import { useMemo, useState, type ReactNode } from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { SectionTabs } from '../components/ui/SectionTabs';
import { LazyMount } from '../components/ui/LazyMount';
import { Logo, BrandRule } from '../components/brand/Logo';
import { QrPlaceholder } from '../components/brand/iconSystem';
import { useCompany, useBrandSettings } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import {
  COVER_FAMILIES,
  enterpriseCovers,
  type CoverCatalogEntry,
  type CoverFamily
} from '@/components/documents/CoverLayouts';

const PAD = 64;

type FamilyFilter = CoverFamily | 'all';

function CoverSlot({
  entry,
  prefix,
  children
}: {
  entry: Pick<CoverCatalogEntry, 'title' | 'fileName' | 'description' | 'groupLabel' | 'groupNote'>;
  prefix: string;
  children: ReactNode;
}) {
  return (
    <LazyMount minHeight={480}>
      <GroupLabel note={entry.groupNote}>{entry.groupLabel}</GroupLabel>
      <AssetFrame
        title={entry.title}
        fileName={entry.fileName.replace(/NubiaGo|AshBak/g, prefix)}
        description={entry.description}
        artboard={formats.a4}
      >
        {children}
      </AssetFrame>
    </LazyMount>
  );
}

export function DocumentCoversPage() {
  const company = useCompany();
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  const prefix = isAshBak ? 'AshBak' : 'NubiaGo';
  const sectorDescriptor = isAshBak
    ? 'Industrial infrastructure for commerce, payments, and logistics'
    : 'Infrastructure for African commerce';

  const [family, setFamily] = useState<FamilyFilter>('all');

  const coreCovers: CoverCatalogEntry[] = useMemo(
    () => [
      {
        id: 'reversed',
        title: 'Cover — Reversed Primary',
        fileName: `${prefix}_Cover_01_Reversed`,
        description:
          'The default cover. Title occupies the lower third so a cropped image or debossed finish can occupy the space above.',
        family: 'corporate',
        groupLabel: 'Cover 01 — Reversed',
        groupNote: 'Company profiles, corporate overviews',
        render: () => (
          <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
            <div className="flex items-start justify-between">
              <Logo size={24} tone="light" />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
                Confidential
              </span>
            </div>
            <div>
              <BrandRule width={96} thickness={2} tone="secondary" />
              <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Company profile
              </div>
              <h1 className="mt-4 text-[46px] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                {sectorDescriptor}
              </h1>
              <p className="mt-5 max-w-[420px] text-[14px] leading-[1.7] text-white/65">
                {company.descriptor}
              </p>
            </div>
            <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[10px] text-white/55">
              <span>
                December 2024 · Ref. CP-2024-01 · {company.endorsement}
              </span>
              <span>{company.website}</span>
            </div>
          </div>
        )
      },
      {
        id: 'image-band',
        title: 'Cover — Image Band',
        fileName: `${prefix}_Cover_02_Image_Band`,
        description:
          'A full-width image band between two white fields. Type never sits on the photograph, so any image can be dropped in without a legibility check.',
        family: 'catalogue',
        groupLabel: 'Cover 02 — Image-led',
        groupNote: 'Product catalogues, technical documentation',
        render: () => (
          <div className="flex h-full w-full flex-col bg-white">
            <div className="flex items-start justify-between" style={{ padding: PAD, paddingBottom: 40 }}>
              <Logo size={24} />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
                2025 Edition
              </span>
            </div>
            <div className="flex h-[300px] items-center justify-center bg-brand-sand">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
                Image area · full width × 300 px
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between" style={{ padding: PAD, paddingTop: 48 }}>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">
                  {isAshBak ? 'Infrastructure catalogue' : 'Services catalogue'}
                </div>
                <h1 className="mt-4 text-[42px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
                  {isAshBak ? 'Commerce, payments & logistics' : 'Settlement & logistics services'}
                </h1>
                <div className="mt-6">
                  <BrandRule width={96} thickness={2} />
                </div>
              </div>
              <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
                <span>Ref. CAT-2025-SVC · Volume 01 · {company.endorsement}</span>
                <span>{company.website}</span>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'editorial',
        title: 'Cover — Editorial Light Gray',
        fileName: `${prefix}_Cover_03_Editorial`,
        description:
          'Light Gray field with the title set against a client and reference block. Used where the document is addressed to one named recipient.',
        family: 'proposal',
        groupLabel: 'Cover 03 — Editorial',
        groupNote: 'Commercial proposals, tenders',
        render: () => (
          <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
            <Logo size={24} />
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Commercial proposal
              </div>
              <h1 className="mt-4 max-w-[520px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
                {isAshBak
                  ? 'Integrated infrastructure across four African markets'
                  : 'Cross-border settlement across four markets'}
              </h1>
              <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-8 border-t border-gray-200 pt-6">
                {[
                  ['Prepared for', 'Continental Trade Partners Ltd.'],
                  ['Attention', 'Ms. Amara Okonkwo'],
                  ['Date', '12 December 2024'],
                  ['Reference', 'PR-2024-0417']
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">
                      {label}
                    </div>
                    <div className="mt-1 text-[13px] font-medium text-ink">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
              <span>
                {company.legalName} · {company.registration} · {company.endorsement}
              </span>
              <span>{company.website}</span>
            </div>
          </div>
        )
      },
      {
        id: 'technical',
        title: 'Cover — Technical Index',
        fileName: `${prefix}_Cover_04_Technical`,
        description:
          'Minimal cover that doubles as a contents page for technical documents, with a QR placeholder linking to the online version.',
        family: 'report',
        groupLabel: 'Cover 04 — Technical index',
        groupNote: 'Technical documentation, reports',
        render: () => (
          <div className="flex h-full w-full flex-col bg-white" style={{ padding: PAD }}>
            <div className="flex items-end justify-between pb-5">
              <Logo size={22} />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">
                Technical documentation
              </span>
            </div>
            <BrandRule width="100%" thickness={1} />
            <div className="mt-12">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">
                {isAshBak ? 'Document AB-100 · Rev. 04' : 'Document TD-100 · Rev. 04'}
              </div>
              <h1 className="mt-4 max-w-[560px] text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
                {isAshBak
                  ? 'Integrated infrastructure — technical overview'
                  : 'Settlement API — integration specification'}
              </h1>
            </div>
            <div className="mt-12 flex-1">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Contents</div>
              <ul className="mt-4">
                {[
                  ['01', 'Scope and intended audience', '03'],
                  ['02', 'Infrastructure and security', '06'],
                  ['03', 'Services and specifications', '11'],
                  ['04', 'Delivery windows and cut-offs', '19'],
                  ['05', 'Reconciliation and statements', '24'],
                  ['06', 'Error handling and retries', '31'],
                  ['07', 'Service levels and support', '38']
                ].map(([number, title, page]) => (
                  <li key={number} className="flex items-baseline gap-4 border-b border-gray-200 py-3">
                    <span className="w-6 text-[10px] font-semibold tabular-nums text-brand">{number}</span>
                    <span className="flex-1 text-[13px] text-ink">{title}</span>
                    <span className="text-[11px] tabular-nums text-gray-500">{page}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-end justify-between border-t border-gray-200 pt-5">
              <div className="text-[10px] leading-[1.7] text-gray-500">
                {company.legalName} · {company.endorsement}
                <br />
                {company.website} · {company.email}
              </div>
              <QrPlaceholder size={64} label="Online version" />
            </div>
          </div>
        )
      }
    ],
    [company, isAshBak, prefix, sectorDescriptor]
  );

  const catalog = useMemo(
    () => [
      ...coreCovers,
      ...enterpriseCovers.map((c) => ({
        ...c,
        fileName: c.fileName.replace(/NubiaGo/g, prefix)
      }))
    ],
    [coreCovers, prefix]
  );

  const tabs = useMemo(
    () =>
      COVER_FAMILIES.map((f) => ({
        id: f.id,
        label: f.label,
        count: f.id === 'all' ? catalog.length : catalog.filter((c) => c.family === f.id).length
      })),
    [catalog]
  );

  const visible = family === 'all' ? catalog : catalog.filter((c) => c.family === family);
  const activeNote = COVER_FAMILIES.find((f) => f.id === family)?.note ?? '';

  return (
    <>
      <PageHeader
        code="07"
        title="Document Covers"
        folder="07_DOCUMENT_COVERS"
        description="Fourteen A4 covers on one grid, distinguished by field rather than by ornament. Every cover carries the document type, title, date and reference in the same positions so a stack of them reads as one library."
        specs={['Family filters', 'A4 · 210 × 297 mm', '14 covers']}
      />

      <div className="mb-8 grid gap-px bg-gray-200 sm:grid-cols-4">
        {[
          ['Library', `${catalog.length} covers`],
          ['Grid', '64 mm margins · A4'],
          ['Filter', family === 'all' ? 'All families' : family],
          ['Showing', String(visible.length)]
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium capitalize text-ink">{value}</div>
          </div>
        ))}
      </div>

      <SectionTabs
        tabs={tabs}
        active={family}
        onChange={(id) => setFamily(id as FamilyFilter)}
      />
      <p className="mb-8 text-[13px] leading-relaxed text-gray-700">{activeNote}</p>

      {visible.length === 0 ? (
        <p className="border border-dashed border-gray-200 bg-gray-50 px-5 py-8 text-[13px] text-gray-500">
          No covers in this family.
        </p>
      ) : (
        visible.map((cover) => (
          <CoverSlot key={cover.id} entry={cover} prefix={prefix}>
            {cover.render()}
          </CoverSlot>
        ))
      )}
    </>
  );
}
