import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DownloadIcon, Loader2Icon } from 'lucide-react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { LazyMount } from '../components/ui/LazyMount';
import { Button } from '@/components/ui/button';
import { useBrandSettings } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { businessPlanCatalog } from '@/components/business-plan/planPages';
import { exportDocumentPdf, exportDocumentPngZip } from '@/utils/exportAsset';

type PackId = 'pdf' | 'zip';

export function BusinessPlanPage() {
  const { brand } = useBrandSettings();
  const packHostRef = useRef<HTMLDivElement>(null);
  const [packBusy, setPackBusy] = useState<PackId | null>(null);
  const [packProgress, setPackProgress] = useState<string | null>(null);
  const [packError, setPackError] = useState<string | null>(null);

  if (brand !== 'ashbak') {
    return <Navigate to="/brand-system" replace />;
  }

  let lastGroup = '';
  const a4 = formats.a4;
  const pageCount = businessPlanCatalog.length;

  const collectNodes = () => {
    const host = packHostRef.current;
    if (!host) return [] as HTMLElement[];
    return Array.from(host.querySelectorAll('[data-bp-page]')) as HTMLElement[];
  };

  const downloadFullPdf = async () => {
    setPackBusy('pdf');
    setPackError(null);
    setPackProgress('Preparing…');
    try {
      const nodes = collectNodes();
      if (nodes.length !== pageCount) {
        throw new Error(`Expected ${pageCount} pages, found ${nodes.length}.`);
      }
      await exportDocumentPdf(
        nodes,
        'AshBak_BusinessPlan_Master_Full',
        a4,
        (done, total) => setPackProgress(`PDF ${done} / ${total}`)
      );
      setPackProgress(null);
    } catch (err) {
      setPackError(err instanceof Error ? err.message : 'Full PDF export failed');
      setPackProgress(null);
    } finally {
      setPackBusy(null);
    }
  };

  const downloadAllPngZip = async () => {
    setPackBusy('zip');
    setPackError(null);
    setPackProgress('Preparing…');
    try {
      const nodes = collectNodes();
      if (nodes.length !== pageCount) {
        throw new Error(`Expected ${pageCount} pages, found ${nodes.length}.`);
      }
      const items = nodes.map((node, i) => ({
        node,
        fileName: businessPlanCatalog[i]?.fileName ?? `AshBak_BusinessPlan_${String(i).padStart(2, '0')}`
      }));
      await exportDocumentPngZip(
        items,
        'AshBak_BusinessPlan_Master_PNG',
        a4,
        (done, total) => setPackProgress(`PNG ${done} / ${total}`)
      );
      setPackProgress(null);
    } catch (err) {
      setPackError(err instanceof Error ? err.message : 'PNG ZIP export failed');
      setPackProgress(null);
    } finally {
      setPackBusy(null);
    }
  };

  return (
    <>
      <PageHeader
        code="12"
        title="Business Plan"
        folder="12_BUSINESS_PLAN"
        description="AshBak Industries Master Business Plan — $0 → $250M annual revenue. Cover uses reversed primary with oversized year (annual-report DNA). Download each page as PNG/PDF, or the full merged document at A4 · 300 dpi."
        specs={['A4 · 300 dpi', `${pageCount} artboards`, 'AshBak only']}
      />

      <div className="mb-8 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Parent', 'AshBak Industries Inc. · Delaware'],
          ['Portfolio', 'NubiaGo · Bagster'],
          ['Target', '$250M ARR · $1.25B GMV']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-3 border border-gray-200 bg-gray-50 px-5 py-4 print:hidden">
        <Button type="button" onClick={() => void downloadFullPdf()} disabled={packBusy !== null}>
          {packBusy === 'pdf' ? (
            <Loader2Icon className="animate-spin" strokeWidth={1.5} />
          ) : (
            <DownloadIcon strokeWidth={1.5} />
          )}
          {packBusy === 'pdf' && packProgress ? packProgress : `Download full PDF (${pageCount} pages)`}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => void downloadAllPngZip()}
          disabled={packBusy !== null}
        >
          {packBusy === 'zip' ? (
            <Loader2Icon className="animate-spin" strokeWidth={1.5} />
          ) : (
            <DownloadIcon strokeWidth={1.5} />
          )}
          {packBusy === 'zip' && packProgress ? packProgress : `Download all PNG (ZIP)`}
        </Button>
        <p className="max-w-xl text-[13px] text-gray-700">
          Full document is A4 · 300 dpi (true mm pages via pdf-lib). Each artboard below also exports its own PNG and
          single-page PDF.
        </p>
        {packError ? <p className="w-full text-[12px] text-state-error">{packError}</p> : null}
      </div>

      {/* Off-screen true-size pages for merged export.
          Keep fully visible (not opacity/visibility hidden) so Chromium paints
          fonts/AA at full quality; park far off-screen instead. */}
      <div
        ref={packHostRef}
        aria-hidden
        className="pointer-events-none fixed"
        style={{
          left: -10000,
          top: 0,
          width: a4.width
        }}
      >
        {businessPlanCatalog.map((entry) => (
          <div
            key={`pack-${entry.id}`}
            data-bp-page
            data-bp-file={entry.fileName}
            className="overflow-hidden bg-white"
            style={{
              width: a4.width,
              height: a4.height
            }}
          >
            {entry.render()}
          </div>
        ))}
      </div>

      {businessPlanCatalog.map((entry) => {
        const showGroup = entry.group !== lastGroup;
        lastGroup = entry.group;
        return (
          <div key={entry.id}>
            {showGroup ? <GroupLabel note={entry.note}>{entry.group}</GroupLabel> : null}
            <LazyMount minHeight={520}>
              <AssetFrame
                title={entry.title}
                fileName={entry.fileName}
                description={entry.description}
                artboard={a4}
              >
                {entry.render()}
              </AssetFrame>
            </LazyMount>
          </div>
        );
      })}
    </>
  );
}
