import React, { useRef, useState } from 'react';
import { DownloadIcon, PrinterIcon, CheckIcon, Loader2Icon } from 'lucide-react';
import { exportNode, printNode, PRINT_SCALE, SCREEN_SCALE, type ExportFormat } from '../../utils/exportAsset';

export interface AssetFrameProps {
  title: string;
  fileName: string;
  /** e.g. "A4 · 210 × 297 mm" */
  spec: string;
  description?: string;
  width: number;
  height: number;
  formats?: ExportFormat[];
  printable?: boolean;
  /** Extra controls rendered beside the export buttons (e.g. "Copy HTML"). */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

const buttonBase =
'inline-flex items-center gap-1.5 border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-700 transition-colors duration-150 ease-out hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 disabled:opacity-50';

export function AssetFrame({
  title,
  fileName,
  spec,
  description,
  width,
  height,
  formats = ['png', 'svg'],
  printable = true,
  actions,
  children
}: AssetFrameProps) {
  const artboardRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth > 0) setScale(Math.min(1, el.clientWidth / width));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  const handleExport = async (format: ExportFormat) => {
    if (!artboardRef.current) return;
    setBusy(format);
    try {
      await exportNode(artboardRef.current, fileName, format, printable ? PRINT_SCALE : SCREEN_SCALE);
      setDone(format);
      window.setTimeout(() => setDone(null), 1600);
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
            {spec} · {fileName} · {printable ? '300 dpi export' : '288 dpi export'}
          </p>
          {description ? <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-gray-700">{description}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-1.5 print:hidden">
          {actions}
          {formats.map((format) =>
          <button key={format} type="button" className={buttonBase} onClick={() => handleExport(format)} disabled={busy !== null}>
              {busy === format ?
            <Loader2Icon className="h-3.5 w-3.5 animate-spin" strokeWidth={1.5} /> :
            done === format ?
            <CheckIcon className="h-3.5 w-3.5 text-state-success" strokeWidth={2} /> :

            <DownloadIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
            }
              {format.toUpperCase()}
            </button>
          )}
          {printable ?
          <button
            type="button"
            className={buttonBase}
            onClick={() => artboardRef.current && printNode(artboardRef.current)}>
            
              <PrinterIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
              PDF
            </button> :
          null}
        </div>
      </div>

      <div ref={measureRef} className="w-full">
        <div className="asset-clip" style={{ height: height * scale, overflow: 'hidden' }}>
          <div className="asset-scale" style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width, height }}>
            <div
              ref={artboardRef}
              className="bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(30,58,95,0.25)] ring-1 ring-gray-200"
              style={{ width, height, overflow: 'hidden' }}>
              
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>);

}