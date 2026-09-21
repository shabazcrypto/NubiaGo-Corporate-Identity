import React, { useRef, useState } from 'react';
import { CheckIcon, DownloadIcon, Loader2Icon, PrinterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ArtboardSpec, ExportKind } from '@/lib/formats';
import { specLabel } from '@/lib/formats';
import { exportNode, printNode } from '@/utils/exportAsset';

export interface AssetFrameProps {
  title: string;
  fileName: string;
  artboard: ArtboardSpec;
  description?: string;
  formats?: ExportKind[];
  transparent?: boolean;
  htmlOnly?: boolean;
  printable?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function AssetFrame({
  title,
  fileName,
  artboard,
  description,
  formats,
  transparent,
  htmlOnly = false,
  printable = false,
  actions,
  children
}: AssetFrameProps) {
  const artboardRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const exportFormats = htmlOnly ? [] : (formats ?? artboard.defaultExports);
  const useTransparent = transparent ?? Boolean(artboard.transparent);

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth > 0) setScale(Math.min(1, el.clientWidth / artboard.width));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [artboard.width]);

  const handleExport = async (format: ExportKind) => {
    if (!artboardRef.current) return;
    setBusy(format);
    setError(null);
    try {
      await exportNode(artboardRef.current, fileName, format, artboard, { transparent: useTransparent });
      setDone(format);
      window.setTimeout(() => setDone(null), 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="mb-14" aria-label={title}>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b border-gray-200 pb-2.5">
        <div>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-gray-500">
            {specLabel(artboard)} · {fileName}
            {useTransparent ? ' · transparent PNG' : ''}
          </p>
          {description ? <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-gray-700">{description}</p> : null}
          {error ? <p className="mt-1.5 text-[12px] text-state-error">{error}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 print:hidden">
          {actions}
          {exportFormats.map((format) => (
            <Button
              key={format}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleExport(format)}
              disabled={busy !== null}
            >
              {busy === format ? (
                <Loader2Icon className="animate-spin" strokeWidth={1.5} />
              ) : done === format ? (
                <CheckIcon className="text-state-success" strokeWidth={2} />
              ) : (
                <DownloadIcon strokeWidth={1.5} />
              )}
              {format.toUpperCase()}
            </Button>
          ))}
          {printable ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => artboardRef.current && printNode(artboardRef.current)}
            >
              <PrinterIcon strokeWidth={1.5} />
              Print
            </Button>
          ) : null}
        </div>
      </div>

      <div ref={measureRef} className="w-full">
        <div className="asset-clip" style={{ height: artboard.height * scale, overflow: 'hidden' }}>
          <div
            className="asset-scale"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: artboard.width, height: artboard.height }}
          >
            <div
              ref={artboardRef}
              data-artboard={fileName}
              className="bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(30,58,95,0.25)] ring-1 ring-gray-200"
              style={{
                width: artboard.width,
                height: artboard.height,
                overflow: 'hidden',
                backgroundColor: useTransparent ? 'transparent' : '#ffffff'
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
