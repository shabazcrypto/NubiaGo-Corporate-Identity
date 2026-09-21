import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { QrPlaceholder } from '../components/brand/iconSystem';
import { useCompany } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { enterpriseCovers } from '@/components/documents/CoverLayouts';

const PAD = 64;

export function DocumentCoversPage() {
  const company = useCompany();

  return (
    <>
      <PageHeader
        code="07"
        title="Document Covers"
        folder="07_DOCUMENT_COVERS"
        description="Fourteen A4 covers on one grid, distinguished by field rather than by ornament. Every cover carries the document type, title, date and reference in the same positions so a stack of them reads as one library." />
      

      <GroupLabel note="Company profiles, corporate overviews">Cover 01 — Reversed</GroupLabel>
      <AssetFrame
        title="Cover — Reversed Primary"
        fileName="NubiaGo_Cover_01_Reversed"
        description="The default cover. Title occupies the lower third so a cropped image or debossed finish can occupy the space above."
        artboard={formats.a4}>
        
        <div className="flex h-full w-full flex-col justify-between bg-brand" style={{ padding: PAD }}>
          <div className="flex items-start justify-between">
            <Logo size={24} tone="light" />
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">Confidential</span>
          </div>
          <div>
            <BrandRule width={96} thickness={2} tone="gold" />
            <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Company profile
            </div>
            <h1 className="mt-4 text-[46px] font-bold leading-[1.08] tracking-[-0.03em] text-white">
              Infrastructure for African commerce
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
      </AssetFrame>

      <GroupLabel note="Product catalogues, technical documentation">Cover 02 — Image-led</GroupLabel>
      <AssetFrame
        title="Cover — Image Band"
        fileName="NubiaGo_Cover_02_Image_Band"
        description="A full-width image band between two white fields. Type never sits on the photograph, so any image can be dropped in without a legibility check."
        artboard={formats.a4}>
        
        <div className="flex h-full w-full flex-col bg-white">
          <div className="flex items-start justify-between" style={{ padding: PAD, paddingBottom: 40 }}>
            <Logo size={24} />
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">2025 Edition</span>
          </div>
          <div className="flex h-[300px] items-center justify-center bg-brand-sand">
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
              Image area · full width × 300 px
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-between" style={{ padding: PAD, paddingTop: 48 }}>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">
                Services catalogue
              </div>
              <h1 className="mt-4 text-[42px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
                Settlement &amp; logistics services
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
      </AssetFrame>

      <GroupLabel note="Commercial proposals, tenders">Cover 03 — Editorial</GroupLabel>
      <AssetFrame
        title="Cover — Editorial Warm Sand"
        fileName="NubiaGo_Cover_03_Editorial"
        description="Warm Sand field with the title set against a client and reference block. Used where the document is addressed to one named recipient."
        artboard={formats.a4}>
        
        <div className="flex h-full w-full flex-col justify-between bg-brand-sand" style={{ padding: PAD }}>
          <Logo size={24} />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Commercial proposal</div>
            <h1 className="mt-4 max-w-[520px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Cross-border settlement across four markets
            </h1>
            <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-8 border-t border-gray-200 pt-6">
              {[
              ['Prepared for', 'Continental Trade Partners Ltd.'],
              ['Attention', 'Ms. Amara Okonkwo'],
              ['Date', '12 December 2024'],
              ['Reference', 'PR-2024-0417']].
              map(([label, value]) =>
              <div key={label}>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
                  <div className="mt-1 text-[13px] font-medium text-ink">{value}</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end justify-between border-t border-gray-200 pt-5 text-[10px] text-gray-500">
            <span>
              {company.legalName} · {company.registration} · {company.endorsement}
            </span>
            <span>{company.website}</span>
          </div>
        </div>
      </AssetFrame>

      <GroupLabel note="Technical documentation, reports">Cover 04 — Technical index</GroupLabel>
      <AssetFrame
        title="Cover — Technical Index"
        fileName="NubiaGo_Cover_04_Technical"
        description="Minimal cover that doubles as a contents page for technical documents, with a QR placeholder linking to the online version."
        artboard={formats.a4}>
        
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
              Document TD-100 · Rev. 04
            </div>
            <h1 className="mt-4 max-w-[560px] text-[38px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              Settlement API — integration specification
            </h1>
          </div>
          <div className="mt-12 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Contents</div>
            <ul className="mt-4">
              {[
              ['01', 'Scope and intended audience', '03'],
              ['02', 'Authentication and security', '06'],
              ['03', 'Endpoints and payloads', '11'],
              ['04', 'Settlement windows and cut-offs', '19'],
              ['05', 'Reconciliation and statements', '24'],
              ['06', 'Error handling and retries', '31'],
              ['07', 'Service levels and support', '38']].
              map(([number, title, page]) =>
              <li key={number} className="flex items-baseline gap-4 border-b border-gray-200 py-3">
                  <span className="w-6 text-[10px] font-semibold tabular-nums text-brand">{number}</span>
                  <span className="flex-1 text-[13px] text-ink">{title}</span>
                  <span className="text-[11px] tabular-nums text-gray-500">{page}</span>
                </li>
              )}
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
      </AssetFrame>

      <GroupLabel note="Enterprise library · same A4 grid · downloadable PNG/PDF">Extended cover suite</GroupLabel>
      {enterpriseCovers.map((cover) => (
        <AssetFrame
          key={cover.fileName}
          title={cover.title}
          fileName={cover.fileName}
          description={cover.description}
          artboard={formats.a4}
        >
          {cover.render()}
        </AssetFrame>
      ))}
    </>);

}