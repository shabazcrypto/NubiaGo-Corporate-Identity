import React, { useRef, useState } from 'react';
import { CheckIcon, DownloadIcon, Loader2Icon, PrinterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ArtboardSpec, ExportKind } from '@/lib/formats';
import { specLabel } from '@/lib/formats';

export interface AssetFrameProps {
  title: string;
  fileName: string;
  artboard: ArtboardSpec;
  description?: string;
  formats?: ExportKind[];
  transparent?: boolean;
  htmlOnly?: boolean;
  printable?: boolean;
  /** Tone for outlined wordmark SVG downloads. */
  wordmarkTone?: 'primary' | 'light' | 'black' | 'gold';
  /** What the SVG button exports (defaults to wordmark). */
  svgKind?: 'wordmark' | 'icon-mark' | 'icon-app';
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
  wordmarkTone,
  svgKind,
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
  const isSmall = artboard.width < 200;

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth <= 0) return;
      const fit = el.clientWidth / artboard.width;
      if (isSmall) {
        const target = Math.min(200, el.clientWidth);
        setScale(Math.min(fit, target / artboard.width));
      } else {
        setScale(Math.min(1, fit));
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [artboard.width, isSmall]);

  const handleExport = async (format: ExportKind) => {
    if (!artboardRef.current) return;
    setBusy(format);
    setError(null);
    try {
      const { exportNode } = await import('@/utils/exportAsset');
      await exportNode(artboardRef.current, fileName, format, artboard, {
        transparent: useTransparent,
        wordmarkTone,
        svgKind
      });
      setDone(format);
      window.setTimeout(() => setDone(null), 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setBusy(null);
    }
  };

  const handlePrint = async () => {
    if (!artboardRef.current) return;
    const { printNode } = await import('@/utils/exportAsset');
    printNode(artboardRef.current);
  };

  const metaChips = [
    `${artboard.width} × ${artboard.height} px`,
    artboard.dpiLabel ?? `${artboard.targetDpi} dpi`,
    artboard.family,
    ...(useTransparent ? ['transparent'] : [])
  ];

  return (
    <section className="mb-16" aria-label={title}>
      <div className="mb-4 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <h3 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">{title}</h3>
          <p className="break-all font-mono text-[11px] font-medium tracking-[-0.01em] text-gray-500">
            {fileName}
            {htmlOnly ? ' · HTML' : ''}
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {metaChips.map((chip) => (
              <li
                key={chip}
                className="border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-gray-700"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-gray-500">{specLabel(artboard)}</p>
          {description ? <p className="max-w-2xl text-[13px] leading-relaxed text-gray-700">{description}</p> : null}
          {error ? <p className="text-[12px] text-state-error">{error}</p> : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-1.5 print:hidden">
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
            <Button type="button" variant="outline" size="sm" onClick={() => void handlePrint()}>
              <PrinterIcon strokeWidth={1.5} />
              Print
            </Button>
          ) : null}
        </div>
      </div>

      <div
        ref={measureRef}
        className={`w-full border border-gray-200 p-5 sm:p-7 ${
          useTransparent ? 'kit-checker' : ''
        }`}
        style={useTransparent ? undefined : { background: 'var(--kit-stage)' }}
      >
        <div
          className={`mx-auto ${isSmall ? 'flex justify-center' : ''}`}
          style={isSmall ? undefined : { maxWidth: artboard.width * scale }}
        >
          <div
            className="asset-clip"
            style={{
              height: artboard.height * scale,
              width: isSmall ? artboard.width * scale : '100%',
              overflow: 'hidden'
            }}
          >
            <div
              className="asset-scale"
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: artboard.width,
                height: artboard.height
              }}
            >
              <div
                ref={artboardRef}
                data-artboard={fileName}
                className="overflow-hidden ring-1 ring-black/10"
                style={{
                  width: artboard.width,
                  height: artboard.height,
                  backgroundColor: useTransparent ? 'transparent' : '#ffffff'
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
