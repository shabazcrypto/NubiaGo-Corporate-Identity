import { DownloadIcon, Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Button } from '@/components/ui/button';
import { Logo, BrandRule } from '../components/brand/Logo';
import { brandIcons, AB_STROKE, QrPlaceholder } from '../components/brand/iconSystem';
import { navigation } from '../data/navigation';
import { useBrandMeta } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { faviconDefs } from '../components/brand/AppIcons';
import { CorporateSeal, PackingTape, unsplashCredits } from '../components/brand/EnvironmentalAssets';
import {
  downloadIconPack,
  downloadLogoPack,
  downloadMasterKit,
  downloadQrPack,
  downloadSocialPack
} from '@/utils/downloadPacks';

const exportMatrix: [string, string, string][] = [
  ['Letterhead · covers · reports · catalogue · commercial', 'PNG + PDF', '300 dpi PNG with pHYs · PDF page is true A4'],
  ['Presentation slides', 'PNG per slide · deck PDF', '1280 × 720 · multi-page 16:9 PDF from the Presentation page'],
  ['Email signatures', 'HTML only', 'Copy HTML or download .html — never paste a screenshot'],
  ['HTML emails (announce / invite / digest / receipt)', 'HTML only', 'Full documents · nested tables · Arial · do not wrap again'],
  ['Newsletter', 'PNG preview', 'Rebuild blocks in your ESP from these values'],
  ['Business cards', 'PNG + PDF', '3.5 × 2 in · 88.9 × 50.8 mm · 300 dpi · bleed 94.9 × 56.8 mm'],
  ['Social templates', 'PNG · JPG', '1200 × 627 and 1080 × 1080 · sRGB'],
  ['Favicons · app icons', 'SVG + PNG', 'Official brand mark · favicon.svg + PNG 16–512'],
  ['Corporate seal · packing tape', 'PNG', '320×320 seal · 640×80 tape strip tile'],
  ['Logo', 'Outlined SVG · transparent PNG', 'SVG is path-outlined Inter Tight — not foreignObject HTML'],
  ['Icons & patterns', 'PNG', 'Icon sheet optional transparency · patterns are sRGB screen files'],
  ['Business Plan (AshBak)', 'PNG + PDF · full PDF · PNG ZIP', 'A4 · 300 dpi · 17 pages · per-page or merged master document']
];

type PackId = 'logo' | 'icons' | 'social' | 'qr' | 'master';

export function AssetsPage() {
  const { company, prefix, isAshBak } = useBrandMeta();
  const [busyPack, setBusyPack] = useState<PackId | null>(null);
  const [packError, setPackError] = useState<string | null>(null);
  const [packProgress, setPackProgress] = useState<string | null>(null);
  const primaryHex = isAshBak ? '#000000' : '#1E3A5F';
  const rootFolder = isAshBak ? 'ASHBAK_CORPORATE_IDENTITY' : 'NUBIAGO_CORPORATE_IDENTITY';

  const runPack = async (id: PackId, action: () => Promise<void>) => {
    setBusyPack(id);
    setPackError(null);
    setPackProgress(null);
    try {
      await action();
    } catch (err) {
      setPackError(err instanceof Error ? err.message : 'Pack download failed');
    } finally {
      setBusyPack(null);
      setPackProgress(null);
    }
  };

  return (
    <>
      <PageHeader
        code="11"
        title="Assets, Patterns & Export"
        folder="11_ASSETS"
        description="Favicons, app icons, icon sheet, brand patterns, QR placeholders, export rules, and download packs for handoff."
      />

      <GroupLabel note={company.name === 'NubiaGo' ? 'Official icon · Icon Blue field' : 'Wordmark on Primary field'}>
        Favicon & app icons
      </GroupLabel>
      <p className="mb-6 max-w-3xl text-[13px] leading-relaxed text-gray-700">
        {company.name === 'NubiaGo' ? (
          <>
            Use the official NubiaGo icon (Icon Blue · white “n” · gold tittle) for browsers, PWA and app stores.
            SVG masters live in <code className="text-[12px]">/brand/icon/</code> and{' '}
            <code className="text-[12px]">/favicon.svg</code>. The wordmark remains the logo for documents and marketing.
          </>
        ) : (
          <>
            Use the {company.name} wordmark on Primary ({primaryHex}) for browsers, PWA and app stores.
            Export PNG at each size below. The wordmark remains the logo for documents and marketing.
          </>
        )}
      </p>
      {faviconDefs.map(({ id, title, file, artboard, Component }) => (
        <AssetFrame
          key={id}
          title={title}
          fileName={`${prefix}_${file}`}
          description="Primary field · off-white glyph. Export PNG for browsers, PWA and app stores."
          artboard={artboard}
        >
          <Component />
        </AssetFrame>
      ))}

      <GroupLabel note="Print overlays · environmental">Seal & packing</GroupLabel>
      <AssetFrame
        title="Corporate Seal"
        fileName={`${prefix}_Seal_Official`}
        description="Circular official seal for certificates and stamped PDFs — wordmark inside Primary ring."
        artboard={formats.seal}
      >
        <CorporateSeal />
      </AssetFrame>
      <AssetFrame
        title="Packing Tape Pattern"
        fileName={`${prefix}_Packing_Tape`}
        description="Repeatable 640×80 strip — tile horizontally for carton tape artwork."
        artboard={formats.packingTape}
      >
        <PackingTape />
      </AssetFrame>

      <GroupLabel note="Required for commercial redistribution of Unsplash photography">
        Photography attribution ledger
      </GroupLabel>
      <div className="mb-14 overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border-b-2 border-brand bg-gray-50 text-left text-[10px] uppercase tracking-[0.12em] text-gray-500">
              <th className="px-4 py-2.5 font-medium">File</th>
              <th className="px-4 py-2.5 font-medium">Credit</th>
              <th className="px-4 py-2.5 font-medium">Source</th>
            </tr>
          </thead>
          <tbody>
            {unsplashCredits.map((row) => (
              <tr key={row.file} className="border-b border-gray-200">
                <td className="px-4 py-2.5 font-medium text-ink">{row.file}</td>
                <td className="px-4 py-2.5 text-gray-700">{row.credit}</td>
                <td className="px-4 py-2.5">
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    Unsplash
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-[11px] leading-relaxed text-gray-500">
          Studio heroes (
          <code className="text-[11px]">{`${isAshBak ? 'ashbak' : 'nubiago'}-hero-*.png`}</code>) are
          kit-generated campaign assets.
          Confirm Unsplash license terms for your redistribution channel before external publication.
        </p>
      </div>

      <GroupLabel note="Zip packs for design and marketing handoff">Download packs</GroupLabel>
      <div className="mb-14 space-y-3 border border-gray-200 bg-gray-50 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={() =>
              runPack('master', () => downloadMasterKit((label) => setPackProgress(label)))
            }
            disabled={busyPack !== null}
          >
            {busyPack === 'master' ? (
              <Loader2Icon className="animate-spin" strokeWidth={1.5} />
            ) : (
              <DownloadIcon strokeWidth={1.5} />
            )}
            {busyPack === 'master' && packProgress ? packProgress : 'Master kit ZIP'}
          </Button>
          <Button type="button" variant="outline" onClick={() => runPack('logo', downloadLogoPack)} disabled={busyPack !== null}>
            {busyPack === 'logo' ? (
              <Loader2Icon className="animate-spin" strokeWidth={1.5} />
            ) : (
              <DownloadIcon strokeWidth={1.5} />
            )}
            Logo pack
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runPack('icons', downloadIconPack)}
            disabled={busyPack !== null}
          >
            {busyPack === 'icons' ? (
              <Loader2Icon className="animate-spin" strokeWidth={1.5} />
            ) : (
              <DownloadIcon strokeWidth={1.5} />
            )}
            Icon pack
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runPack('social', downloadSocialPack)}
            disabled={busyPack !== null}
          >
            {busyPack === 'social' ? (
              <Loader2Icon className="animate-spin" strokeWidth={1.5} />
            ) : (
              <DownloadIcon strokeWidth={1.5} />
            )}
            Social pack
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runPack('qr', downloadQrPack)}
            disabled={busyPack !== null}
          >
            {busyPack === 'qr' ? (
              <Loader2Icon className="animate-spin" strokeWidth={1.5} />
            ) : (
              <DownloadIcon strokeWidth={1.5} />
            )}
            QR pack
          </Button>
        </div>
        <p className="text-[13px] text-gray-700">
          Master kit builds the {rootFolder} folder tree with logos, all 13 email signatures (HTML), social masters,
          icon sheet and company JSON. Section READMEs point to per-artboard PNG/PDF downloads for A4 templates.
        </p>
        {packError ? <p className="text-[12px] text-state-error">{packError}</p> : null}
      </div>

      <GroupLabel note="Lucide line icons · 1.5 px stroke · 24 px grid">Icon system</GroupLabel>
      <AssetFrame
        title="Icon Sheet"
        fileName={`${prefix}_Icon_Sheet`}
        description="The complete supporting set. Icons carry meaning in documents and signatures; they are never used as decoration."
        artboard={formats.iconSheet}
        transparent
      >
        <div className="flex h-full w-full flex-col bg-white p-12">
          <div className="flex items-start justify-between">
            <div>
              <Logo size={18} />
              <div className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.16em] text-gray-500">
                Icon system v1.0
              </div>
            </div>
            <div className="text-right text-[9px] leading-[1.7] text-gray-500">
              Stroke 1.5 px · 24 px grid
              <br />
              Primary #000000 or Gray 500 #F4F3F9
              <br />
              {company.endorsement}
            </div>
          </div>
          <div className="mt-4">
            <BrandRule width="100%" thickness={1} />
          </div>
          <div className="mt-8 grid flex-1 grid-cols-5 gap-x-4 gap-y-8 content-start">
            {brandIcons.map(({ key, label, usage, Icon }) => (
              <div key={key} className="flex min-w-0 flex-col items-center px-1 text-center">
                <div className="flex h-11 w-11 items-center justify-center border border-gray-200 bg-gray-50">
                  <Icon className="h-6 w-6 text-brand" strokeWidth={AB_STROKE} />
                </div>
                <div className="mt-2.5 w-full truncate text-[11px] font-semibold text-ink">{label}</div>
                <div className="mt-0.5 w-full text-[8.5px] leading-snug text-gray-500 line-clamp-2">{usage}</div>
              </div>
            ))}
          </div>
        </div>
      </AssetFrame>

      <GroupLabel note="Two devices only — nothing else is a brand pattern">Patterns</GroupLabel>
      <AssetFrame
        title="Rule stack"
        fileName={`${prefix}_Pattern_Rule_Stack`}
        description="Primary hairlines at decreasing widths, closed by one rule. Maximum weight is two pixels."
        artboard={formats.pattern}
      >
        <div className="flex h-full w-full flex-col justify-center gap-4 bg-white px-16">
          {[100, 72, 44].map((width) => (
            <div key={width} className="h-[2px] bg-brand" style={{ width: `${width}%` }} />
          ))}
          <div className="h-[2px] w-[22%] bg-brand-secondary" />
        </div>
      </AssetFrame>
      <AssetFrame
        title="Grid field"
        fileName={`${prefix}_Pattern_Grid_Field`}
        description="32 px Primary grid at 10% on Light Gray — quiet field behind image placeholders and diagrams."
        artboard={formats.pattern}
      >
        <div
          className="h-full w-full bg-brand-secondary"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </AssetFrame>

      <GroupLabel note="Destinations are never invented — replace before publishing">QR placeholders</GroupLabel>
      <AssetFrame
        title="QR placeholder row"
        fileName={`${prefix}_QR_Placeholders`}
        description="Marked placeholders only. Generate real codes with the final URL before any public use."
        artboard={formats.qrRow}
      >
        <div className="flex h-full w-full flex-wrap items-center justify-center gap-10 bg-white px-8">
          {['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'].map((label) => (
            <QrPlaceholder key={label} size={96} label={label} />
          ))}
        </div>
      </AssetFrame>

      <GroupLabel note="What each asset actually exports">Export requirements</GroupLabel>
      <div className="mb-14 overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-brand text-left text-white">
              <th className="px-4 py-3 font-semibold">Asset family</th>
              <th className="px-4 py-3 font-semibold">Formats</th>
              <th className="px-4 py-3 font-semibold">Production note</th>
            </tr>
          </thead>
          <tbody>
            {exportMatrix.map((row, index) => (
              <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-b border-gray-200 px-4 py-3 font-medium text-ink">{row[0]}</td>
                <td className="border-b border-gray-200 px-4 py-3 text-gray-700">{row[1]}</td>
                <td className="border-b border-gray-200 px-4 py-3 text-gray-500">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mb-8 border-l-2 bg-brand-secondary px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Resolution.</strong> Raster exports render from the unscaled artboard
        at the dpi in <code className="text-[12px]">formats.ts</code> — never from the on-screen preview. PDF pages are
        sized in millimetres via pdf-lib.
      </div>
      <div className="mb-14 border-l-2 bg-brand-secondary px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Colour.</strong> Kit files are sRGB. For offset or digital print,
        convert to CMYK offline using Brand System values and add bleed / crop marks in your press workflow.
      </div>

      <GroupLabel note="Every asset in this kit carries its own file name">File organisation</GroupLabel>
      <div className="mb-10 border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[12px] font-semibold text-ink">
          {rootFolder}/
        </div>
        <ul className="divide-y divide-gray-200">
          {navigation
            .filter((item) => isAshBak || item.path !== '/business-plan')
            .map((item) => (
              <li key={item.folder} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3">
                <span className="w-56 shrink-0 font-mono text-brand">{item.folder}/</span>
                <span className="text-[13px] text-gray-700">{item.description}</span>
              </li>
            ))}
        </ul>
      </div>
      <p className="text-[13px] leading-relaxed text-gray-500">
        File names follow{' '}
        <span className="font-mono text-[12px] text-gray-700">{prefix}_[Asset]_[Variant]</span> — the same name
        shown on every asset card in this kit.
      </p>
    </>
  );
}