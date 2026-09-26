import { useState, type ReactNode } from 'react';
import { formats } from '@/lib/formats';

type DuplexPreviewProps = {
  front: ReactNode;
  back: ReactNode;
  frontLabel?: string;
  backLabel?: string;
};

/**
 * Interactive front/back flip for business card pairs.
 * Export still uses separate AssetFrames; this is a handoff preview.
 */
export function DuplexPreview({
  front,
  back,
  frontLabel = 'Front',
  backLabel = 'Back'
}: DuplexPreviewProps) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const flipped = side === 'back';
  const w = formats.card.width;
  const h = formats.card.height;

  return (
    <div className="flex flex-col items-center gap-4 py-2">
      <div className="flex items-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setSide('front')}
          className={`border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${
            !flipped ? 'border-brand bg-brand text-white' : 'border-gray-200 bg-white text-gray-700'
          }`}
        >
          {frontLabel}
        </button>
        <button
          type="button"
          onClick={() => setSide((s) => (s === 'front' ? 'back' : 'front'))}
          className="border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink hover:border-brand"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={() => setSide('back')}
          className={`border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${
            flipped ? 'border-brand bg-brand text-white' : 'border-gray-200 bg-white text-gray-700'
          }`}
        >
          {backLabel}
        </button>
      </div>

      <div style={{ width: w, height: h, perspective: 900 }}>
        <div
          className="relative h-full w-full transition-transform duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden ring-1 ring-black/10"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {front}
          </div>
          <div
            className="absolute inset-0 overflow-hidden ring-1 ring-black/10"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {back}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-gray-500">
        Showing {flipped ? backLabel : frontLabel} · trim {formats.card.widthMm.toFixed(1)} ×{' '}
        {formats.card.heightMm.toFixed(1)} mm
      </p>
    </div>
  );
}
