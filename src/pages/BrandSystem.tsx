import { PageHeader, GroupLabel } from '@/components/ui/PageHeader';
import { AssetFrame } from '@/components/ui/AssetFrame';
import { Logo } from '@/components/brand/Logo';
import { BrandMark, BrandMarkApp, BrandMarkAppPrimary } from '@/components/brand/BrandMark';
import {
  ClearspaceGuide,
  MinimumSizeGuide,
  MisuseSheet,
  LockupMatrix
} from '@/components/brand/BrandBook';
import { useBrandMeta } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { brandColors as nubiaColors } from '@/data/brand';
import { brandColors as ashbakColors } from '@/data/brand-ashbak';

function SwatchGrid({
  colors
}: {
  colors: { name: string; hex: string; rgb: string; cmyk: string; onDark?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {colors.map((c) => (
        <div key={c.name} className="border border-gray-200">
          <div
            className="h-20 w-full"
            style={{ backgroundColor: c.hex, opacity: c.onDark ? 1 : 1 }}
          />
          <div className="bg-white px-3 py-2">
            <div className="text-[12px] font-semibold text-ink">{c.name}</div>
            <div className="text-[11px] text-gray-500">{c.hex}</div>
            <div className="text-[10px] text-gray-400">{c.rgb}</div>
            <div className="text-[10px] text-gray-400">{c.cmyk}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const spacingScale = [
  { label: '4 px', value: 4 },
  { label: '8 px', value: 8 },
  { label: '12 px', value: 12 },
  { label: '16 px', value: 16 },
  { label: '24 px', value: 24 },
  { label: '32 px', value: 32 },
  { label: '48 px', value: 48 },
  { label: '64 px', value: 64 }
];

export function BrandSystemPage() {
  const { company, prefix, wordmark, isAshBak } = useBrandMeta();
  const colors = isAshBak ? ashbakColors : nubiaColors;
  const weightLabel = isAshBak ? 'Inter Tight Medium' : 'Inter Tight ExtraBold';

  return (
    <>
      <PageHeader
        code="01"
        title={`${company.name} Design System`}
        folder="01_BRAND_SYSTEM"
        description={`The single source of truth for every asset in this kit. Logo, colour, type, spacing, brand-book construction sheets and components are taken from the ${company.name} ${company.guidelines}.`}
      />

      <GroupLabel note="Wordmark only — download outlined SVG or transparent PNG">Logo system</GroupLabel>
      <AssetFrame
        title="Wordmark — Primary"
        fileName={`${prefix}_Logo_Primary`}
        description="Official download: outlined SVG for print and vector tools, transparent PNG for screen. Live Inter Tight is only for on-page preview."
        artboard={formats.logoMark}
        transparent
        formats={['png', 'svg']}
        wordmarkTone="primary"
        svgKind="wordmark"
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-transparent">
          <Logo size={72} />
          <span className="mt-8 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Primary</span>
        </div>
      </AssetFrame>
      <AssetFrame
        title="Wordmark — Reversed"
        fileName={`${prefix}_Logo_Reversed`}
        description="Light wordmark on Primary. Use on dark fields, slides and social covers."
        artboard={formats.logoMarkDark}
        formats={['png']}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-brand">
          <Logo size={72} tone="light" />
          <span className="mt-8 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">Reversed</span>
        </div>
      </AssetFrame>
      <AssetFrame
        title="Wordmark — Mono on Light Gray"
        fileName={`${prefix}_Logo_Mono_LightGray`}
        description="Black wordmark on Light Gray for low-ink print and mono applications."
        artboard={formats.logoMark}
        transparent={false}
        formats={['png']}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary">
          <Logo size={72} tone="black" />
          <span className="mt-8 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
            Mono on Light Gray
          </span>
        </div>
      </AssetFrame>

      <GroupLabel note={isAshBak ? 'Wordmark mark' : 'Official icon · n + gold tittle'}>Brand mark</GroupLabel>
      <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-gray-700">
        {isAshBak ? (
          <>
            The {company.name} brand is a text-only wordmark: lowercase &quot;{wordmark}&quot; in {weightLabel}.
            Use the wordmark for app icons, favicons, documents and marketing.
          </>
        ) : (
          <>
            The {company.name} logo is the lowercase wordmark (&quot;{wordmark}&quot; in {weightLabel}).
            The official app icon is the Icon Blue tile with a white &quot;n&quot; and gold tittle — use it for
            favicons, PWA and store artwork only. Do not redraw or recolour the icon.
          </>
        )}
      </p>
      <AssetFrame
        title="Brand Mark — On Light"
        fileName={`${prefix}_Mark_OnLight`}
        description={
          isAshBak
            ? 'Wordmark on transparent ground. For white and Light Gray grounds.'
            : 'Official icon mark on transparent — blue “n” + gold tittle for light grounds.'
        }
        artboard={formats.brandMark}
        transparent
        formats={['png', 'svg']}
        wordmarkTone="primary"
        svgKind={isAshBak ? 'wordmark' : 'icon-mark'}
      >
        <div className="flex h-full w-full items-center justify-center bg-transparent px-6">
          <BrandMark size={isAshBak ? 52 : 240} tone="onLight" uid="bs-light" asIcon={!isAshBak} />
        </div>
      </AssetFrame>
      <AssetFrame
        title="Brand Mark — App Icon"
        fileName={`${prefix}_Mark_App`}
        description={
          isAshBak
            ? 'Official OS / store tile — wordmark on Primary with white social padding.'
            : 'Official OS / store tile — Icon Blue field, white “n”, gold tittle (with white social padding).'
        }
        artboard={formats.brandMarkField}
        formats={['png']}
      >
        <div className="flex h-full w-full items-center justify-center bg-white">
          <BrandMarkApp size={220} uid="bs-app" />
        </div>
      </AssetFrame>
      <AssetFrame
        title="Brand Mark — On Primary"
        fileName={`${prefix}_Mark_OnPrimary`}
        description={
          isAshBak
            ? 'Full-bleed Primary field with white wordmark — for UI chrome without white social padding.'
            : 'Full-bleed official icon — Icon Blue field for UI chrome and dense layouts.'
        }
        artboard={formats.brandMarkField}
        formats={['png']}
      >
        <BrandMarkAppPrimary size={320} uid="bs-pri" className="h-full w-full" />
      </AssetFrame>
      <AssetFrame
        title="Brand Mark — Mono"
        fileName={`${prefix}_Mark_Mono`}
        description="Single-ink mark for print, engraving and fax."
        artboard={formats.brandMark}
        transparent
        formats={['png', 'svg']}
        wordmarkTone="black"
        svgKind="wordmark"
      >
        <div className="flex h-full w-full items-center justify-center bg-transparent px-8">
          <BrandMark size={52} tone="mono" />
        </div>
      </AssetFrame>

      <GroupLabel note="Brand book · downloadable construction sheets">Governance</GroupLabel>
      <AssetFrame
        title="Brand Book — Clearspace"
        fileName={`${prefix}_BrandBook_Clearspace`}
        description="Exclusion zone equal to the height of the lowercase 'a' on all four sides."
        artboard={formats.clearspace}
      >
        <ClearspaceGuide />
      </AssetFrame>
      <AssetFrame
        title="Brand Book — Minimum Size"
        fileName={`${prefix}_BrandBook_MinimumSize`}
        description="14 px on screen · ≈ 12 mm wide in print. Below this, counters close on press."
        artboard={formats.clearspace}
      >
        <MinimumSizeGuide />
      </AssetFrame>
      <AssetFrame
        title="Brand Book — Do Not"
        fileName={`${prefix}_BrandBook_Misuse`}
        description="Eight prohibited treatments. Any other construction requires brand approval."
        artboard={formats.misuseSheet}
      >
        <MisuseSheet />
      </AssetFrame>
      <AssetFrame
        title="Brand Book — Lockup Matrix"
        fileName={`${prefix}_BrandBook_Lockups`}
        description="Standalone · descriptor · endorsement-on-footer — the only approved constructions."
        artboard={formats.lockupMatrix}
      >
        <LockupMatrix />
      </AssetFrame>

      <div className="mb-10 grid gap-8 md:grid-cols-3">
        <div className="border border-gray-200 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Clear space</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            Keep clear space equal to the height of the lowercase "a" on all four sides. Nothing — type, rules, images
            or page edges — enters this zone.
          </p>
          <div className="mt-5 flex justify-center bg-gray-50 p-6">
            <div className="relative border border-dashed border-brand-secondary p-5">
              <Logo size={26} />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Minimum size</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            14 px on screen and 12 mm wide in print. Below this the counters in "g" and "a" begin to close on press.
          </p>
          <div className="mt-5 flex items-end justify-center gap-6 bg-gray-50 p-6">
            <div className="text-center">
              <Logo size={14} />
              <div className="mt-3 text-[10px] text-gray-500">14 px · minimum</div>
            </div>
            <div className="text-center">
              <Logo size={26} />
              <div className="mt-3 text-[10px] text-gray-500">26 px · documents</div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Backgrounds</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            Permitted on White, Light Gray, Gray 50 and Primary. On photography, place the reversed wordmark only over a
            calm, dark area.
          </p>
          <ul className="mt-5 space-y-2 text-[12px] text-gray-700">
            {[
            { ok: true, label: 'Reversed wordmark on Primary' },
            { ok: true, label: 'Wordmark on Light Gray' },
            { ok: true, label: 'Primary wordmark on Dark Gray' },
            { ok: false, label: 'Wordmark on a busy photo' },
            { ok: false, label: 'Re-lettered, outlined or stretched wordmark' },
            { ok: false, label: 'Locking the wordmark under another element' }].
            map((rule) =>
              <li key={rule.label} className="flex items-center gap-2">
                <span className={rule.ok ? 'text-brand' : 'text-state-error'}>
                  {rule.ok ? '✓' : '✗'}
                </span>
                <span className={rule.ok ? 'text-gray-700' : 'text-gray-500 line-through'}>
                  {rule.label}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <GroupLabel note="Brand palette from active guidelines">Colour system</GroupLabel>
      <div className="mb-10">
        <h3 className="mb-3 text-[13px] font-semibold text-ink">Brand colours</h3>
        <SwatchGrid colors={colors} />
      </div>
      <div className="mb-10">
        <h3 className="mb-3 text-[13px] font-semibold text-ink">Semantic colours</h3>
        <SwatchGrid colors={[
          { name: 'Success', hex: '#22C55E', rgb: '34, 197, 94', cmyk: '83 / 0 / 52 / 23' },
          { name: 'Warning', hex: '#F59E0B', rgb: '245, 158, 11', cmyk: '0 / 36 / 96 / 4' },
          { name: 'Error', hex: '#EF4444', rgb: '239, 68, 68', cmyk: '0 / 72 / 72 / 6' },
          { name: 'Info', hex: '#3B82F6', rgb: '59, 130, 246', cmyk: '76 / 47 / 0 / 4' }
        ]} />
      </div>

      <GroupLabel note="Inter Tight · weights 400 / 500 / 600 / 700">Typography</GroupLabel>
      <div className="mb-10 space-y-4">
        {[
          { label: 'Display', size: '48px', weight: 700, tracking: '-0.03em' },
          { label: 'Heading 1', size: '36px', weight: 700, tracking: '-0.02em' },
          { label: 'Heading 2', size: '30px', weight: 600, tracking: '-0.015em' },
          { label: 'Heading 3', size: '20px', weight: 600, tracking: '-0.01em' },
          { label: 'Body', size: '16px', weight: 400, tracking: '0' },
          { label: 'Small', size: '14px', weight: 400, tracking: '0' },
          { label: 'Caption', size: '11px', weight: 500, tracking: '0.08em' }
        ].map((t) => (
          <div key={t.label} className="flex items-end gap-6 border-b border-gray-200 pb-4">
            <span className="w-28 shrink-0 text-[12px] font-semibold text-gray-500 uppercase">{t.label}</span>
            <span className="text-[28px] font-semibold text-ink" style={{ fontWeight: t.weight, letterSpacing: t.tracking }}>
              Abc
            </span>
            <span className="text-[12px] text-gray-500">{t.size} · {t.weight} · {t.tracking}</span>
          </div>
        ))}
      </div>

      <GroupLabel note="8 px base · consistent multiples">Spacing scale</GroupLabel>
      <div className="mb-10 flex items-end gap-4">
        {spacingScale.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <div className="bg-brand" style={{ width: s.value, height: s.value }} />
            <span className="text-[10px] text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>

      <GroupLabel note="Professional · approachable · trustworthy · empowering">Voice & tone</GroupLabel>
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {[
          { title: 'Professional', body: 'Precise, clear, meaningful language' },
          { title: 'Approachable', body: 'Warm, welcoming, accessible' },
          { title: 'Trustworthy', body: 'Honest, transparent, reliable' },
          { title: 'Empowering', body: 'Inspiring action, creating possibilities' }
        ].map((v) => (
          <div key={v.title} className="border border-gray-200 p-6">
            <h4 className="text-[13px] font-semibold text-ink">{v.title}</h4>
            <p className="mt-1.5 text-[13px] text-gray-700">{v.body}</p>
          </div>
        ))}
      </div>

      <GroupLabel note="Company details from brand data">Company info</GroupLabel>
      <div className="mb-10 border border-gray-200 bg-gray-50 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Name</div>
            <div className="text-[14px] text-ink">{company.name}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Legal name</div>
            <div className="text-[14px] text-ink">{company.legalName}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Positioning</div>
            <div className="text-[14px] text-ink">{company.positioning}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Website</div>
            <div className="text-[14px] text-ink">{company.website}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Email</div>
            <div className="text-[14px] text-ink">{company.email}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">LinkedIn</div>
            <div className="text-[14px] text-ink">{company.linkedin}</div>
          </div>
        </div>
      </div>
    </>
  );
}