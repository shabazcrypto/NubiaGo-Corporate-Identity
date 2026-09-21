import { Logo, LogoLockup, BrandRule, Endorsement } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';
import { CheckIcon, XIcon } from 'lucide-react';
import { NG_STROKE } from '@/components/brand/iconSystem';

/** Downloadable clearspace construction — n-height exclusion zone. */
export function ClearspaceGuide() {
  const { width, height } = formats.clearspace;
  const mark = 48;
  const n = Math.round(mark * 0.72);
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-white" style={{ width, height }}>
      <div
        className="relative border border-dashed border-brand-gold bg-brand-sand/40"
        style={{ padding: n }}
      >
        <Logo size={mark} />
        <span
          className="absolute left-1 top-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-gold"
        >
          n
        </span>
      </div>
      <p className="absolute bottom-8 left-0 right-0 text-center text-[12px] text-gray-500">
        Clear space = height of the lowercase “n” on all four sides
      </p>
    </div>
  );
}

/** Minimum size proof — screen 14px / print 12 mm. */
export function MinimumSizeGuide() {
  const { width, height } = formats.clearspace;
  return (
    <div className="flex h-full w-full items-center justify-center gap-16 bg-white" style={{ width, height }}>
      <div className="text-center">
        <Logo size={14} />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">14 px · screen min</p>
      </div>
      <div className="h-16 w-px bg-gray-200" />
      <div className="text-center">
        <Logo size={36} />
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">≈ 12 mm · print min</p>
      </div>
    </div>
  );
}

const DONT = [
  { title: 'Stretch', desc: 'Never scale non-uniformly', distort: 'scaleX' as const },
  { title: 'Recolor', desc: 'Never set in Gold or off-palette hues', tone: 'gold' as const },
  { title: 'Outline', desc: 'Never stroke or hollow the letterforms', outline: true },
  { title: 'Shadow', desc: 'Never add drop shadows or glow', shadow: true },
  { title: 'Rotate', desc: 'Never rotate or skew the wordmark', rotate: true },
  { title: 'Box', desc: 'Never enclose in a decorative container', box: true },
  { title: 'Busy photo', desc: 'Never place primary mark on a busy image', busy: true },
  { title: 'Stack endorsement', desc: 'Never lock AshBak under the wordmark', stack: true }
];

/** Eight misuse tiles — brand book don’ts. */
export function MisuseSheet() {
  const { width, height } = formats.misuseSheet;
  const company = useCompany();

  return (
    <div className="bg-white p-8" style={{ width, height }}>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Brand book</p>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink">Wordmark — do not</h2>
        </div>
        <p className="text-[11px] text-gray-500">{company.guidelines}</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {DONT.map((item) => (
          <div key={item.title} className="border border-gray-200 bg-gray-50 p-4">
            <div className="relative flex h-20 items-center justify-center overflow-hidden bg-white">
              {item.busy ? (
                <div
                  className="absolute inset-0 opacity-80"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg,#E5E5E5 0,#E5E5E5 6px,#FAFAFA 6px,#FAFAFA 12px)'
                  }}
                />
              ) : null}
              <div
                className={item.box ? 'border-2 border-brand px-3 py-1' : undefined}
                style={{
                  transform: item.distort
                    ? 'scaleX(1.45)'
                    : item.rotate
                      ? 'rotate(-12deg)'
                      : undefined,
                  filter: item.shadow ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))' : undefined,
                  WebkitTextStroke: item.outline ? '1px #1E3A5F' : undefined,
                  color: item.outline ? 'transparent' : undefined
                }}
              >
                {item.stack ? (
                  <div className="text-center">
                    <Logo size={18} />
                    <p className="mt-1 text-[7px] uppercase tracking-[0.12em] text-gray-500">
                      A brand of AshBak
                    </p>
                  </div>
                ) : (
                  <Logo size={18} tone={item.tone ?? 'primary'} />
                )}
              </div>
              <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-white">
                <XIcon className="h-3 w-3" strokeWidth={2.5} />
              </div>
            </div>
            <p className="mt-2 text-[12px] font-semibold text-ink">{item.title}</p>
            <p className="mt-0.5 text-[10px] leading-snug text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Approved lockups: wordmark alone, with descriptor, endorsement on footer line. */
export function LockupMatrix() {
  const { width, height } = formats.lockupMatrix;
  const company = useCompany();

  return (
    <div className="bg-white p-8" style={{ width, height }}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Brand book</p>
          <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-ink">Approved lockups</h2>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-state-success">
          <CheckIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} />
          Use only these constructions
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-gray-200 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">01 · Standalone</p>
          <div className="mt-8 flex justify-center">
            <Logo size={32} />
          </div>
          <p className="mt-8 text-[11px] leading-relaxed text-gray-700">
            Default. Covers, social, app chrome. Nothing locked beneath.
          </p>
        </div>
        <div className="border border-gray-200 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">02 · Descriptor</p>
          <div className="mt-8 flex justify-center">
            <LogoLockup size={28} />
          </div>
          <p className="mt-8 text-[11px] leading-relaxed text-gray-700">
            Cards, first pages, proposals. Caption weight only — never competes with the mark.
          </p>
        </div>
        <div className="border border-gray-200 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">03 · Endorsement</p>
          <div className="mt-8">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <Logo size={16} />
              <Endorsement size={8} />
            </div>
            <BrandRule width="100%" thickness={1} />
          </div>
          <p className="mt-8 text-[11px] leading-relaxed text-gray-700">
            Footer line only. “{company.endorsementShort}” is never part of the logo.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex h-24 items-center justify-center bg-brand">
          <Logo size={26} tone="light" />
        </div>
        <div className="flex h-24 items-center justify-center bg-brand-sand">
          <Logo size={26} />
        </div>
        <div className="flex h-24 items-center justify-center bg-ink">
          <Logo size={26} tone="light" />
        </div>
      </div>
      <p className="mt-3 text-center text-[10px] text-gray-500">
        Permitted fields: Primary · Warm Sand · Ink / Black — never Gold as a wordmark field
      </p>
    </div>
  );
}
