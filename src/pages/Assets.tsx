import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { brandIcons, NG_STROKE, QrPlaceholder } from '../components/brand/iconSystem';
import { navigation } from '../data/navigation';
import { company } from '../data/brand';

const exportMatrix: [string, string, string][] = [
['Letterhead · covers · reports', 'PDF (print dialog), PNG, SVG', 'PNG renders at 300 dpi · A4 at 100%, never scaled to fit'],
['Presentation slides', 'PNG per slide, PDF for the deck', '1280 × 720 px · place 1:1 in 16:9 masters'],
['Email signatures', 'HTML file, copy-to-clipboard HTML', 'Paste as HTML — never as an image'],
['Newsletter', 'PNG preview, 600 px modular blocks', 'Rebuild blocks in the ESP using these values'],
['Business cards', 'PDF, PNG, SVG', '85 × 55 mm + 3 mm bleed, CMYK on export'],
['Catalogue pages', 'PDF, PNG', 'A4 · supply images at 300 dpi'],
['Social templates', 'PNG, JPG', '1200 × 627 and 1080 × 1080 px, sRGB'],
['Logo & icons', 'SVG, PNG (transparent)', 'Wordmark is live Inter 800 — outline before print']];


export function AssetsPage() {
  return (
    <>
      <PageHeader
        code="11"
        title="Assets, Patterns & Export"
        folder="11_ASSETS"
        description="The supporting layer: the icon set, the two permitted brand patterns, QR placeholders, and the export and file-naming rules that keep everything in this kit consistent once it leaves here." />
      

      <GroupLabel note="Lucide line icons · 1.5 px stroke · 24 px grid">Icon system</GroupLabel>
      <AssetFrame
        title="Icon Sheet"
        fileName="NubiaGo_Icon_Sheet"
        spec="Sheet · 960 × 520 px"
        description="The complete supporting set. Icons carry meaning in documents and signatures; they are never used as decoration or as bullet ornaments."
        width={960}
        height={520}
        printable={false}>
        
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
              Primary #1E3A5F or Gray 500 #737373
              <br />
              {company.endorsement}
            </div>
          </div>
          <div className="mt-4">
            <BrandRule width="100%" thickness={1} />
          </div>
          <div className="mt-10 grid flex-1 grid-cols-7 gap-y-10">
            {brandIcons.map(({ key, label, usage, Icon }) =>
            <div key={key} className="flex flex-col items-center px-2 text-center">
                <Icon className="h-7 w-7 text-brand" strokeWidth={NG_STROKE} />
                <div className="mt-3 text-[11px] font-semibold text-ink">{label}</div>
                <div className="mt-0.5 text-[8.5px] leading-tight text-gray-500">{usage}</div>
              </div>
            )}
          </div>
        </div>
      </AssetFrame>

      <GroupLabel note="Two devices only — nothing else is a brand pattern">Patterns</GroupLabel>
      <div className="mb-14 grid gap-8 lg:grid-cols-2">
        <div className="border border-gray-200">
          <div className="flex h-56 flex-col justify-center gap-4 bg-white px-10">
            {[100, 72, 44].map((width) =>
            <div key={width} className="h-[2px] bg-brand" style={{ width: `${width}%` }} />
            )}
            <div className="h-[2px] w-[22%] bg-brand-gold" />
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-[13px] font-semibold text-ink">Rule stack</div>
            <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
              Primary hairlines at decreasing widths, closed by one Gold rule. Two pixels is the maximum weight — the
              rule marks a division, it is not a graphic.
            </p>
          </div>
        </div>
        <div className="border border-gray-200">
          <div
            className="h-56 bg-brand-sand"
            style={{
              backgroundImage:
              'linear-gradient(to right, rgba(30,58,95,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,58,95,0.10) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="text-[13px] font-semibold text-ink">Grid field</div>
            <p className="mt-1 text-[12px] leading-relaxed text-gray-500">
              A 32 px Primary grid at 10% on Warm Sand. Used as a quiet field behind image placeholders and technical
              diagrams.
            </p>
          </div>
        </div>
      </div>

      <GroupLabel note="Destinations are never invented — replace before publishing">QR placeholders</GroupLabel>
      <div className="mb-14 flex flex-wrap items-start gap-10 border border-gray-200 p-8">
        {['Website', 'Product catalogue', 'Company profile', 'Contact card', 'LinkedIn'].map((label) =>
        <QrPlaceholder key={label} size={96} label={label} />
        )}
      </div>

      <GroupLabel note="What each asset exports as">Export requirements</GroupLabel>
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
            {exportMatrix.map((row, index) =>
            <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border-b border-gray-200 px-4 py-3 font-medium text-ink">{row[0]}</td>
                <td className="border-b border-gray-200 px-4 py-3 text-gray-700">{row[1]}</td>
                <td className="border-b border-gray-200 px-4 py-3 text-gray-500">{row[2]}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mb-8 border-l-2 border-brand-gold bg-gray-50 px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Resolution.</strong> Every raster export is rendered from the
        artboard at 300 dpi for print families and 288 dpi for screen families — never from the on-screen preview,
        which is scaled down to fit the column. SVG exports stay resolution-independent, so use SVG wherever the
        destination supports it.
      </div>
      <div className="mb-14 border-l-2 border-brand-gold bg-gray-50 px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Print colour.</strong> Screen assets are sRGB. For offset or digital
        print, convert to CMYK using the values on the Brand System page and supply files with 3 mm bleed and crop
        marks. Primary must be checked on press — it flattens if printed as a rich black build.
      </div>

      <GroupLabel note="Every asset in this kit carries its own file name">File organisation</GroupLabel>
      <div className="mb-10 border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-[12px] font-semibold text-ink">
          NUBIAGO_CORPORATE_IDENTITY/
        </div>
        <ul className="divide-y divide-gray-200">
          {navigation.map((item) =>
          <li key={item.folder} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-3">
              <span className="w-56 shrink-0 font-mono text-[12px] text-brand">{item.folder}/</span>
              <span className="text-[13px] text-gray-700">{item.description}</span>
            </li>
          )}
        </ul>
      </div>
      <p className="text-[13px] leading-relaxed text-gray-500">
        File names follow <span className="font-mono text-[12px] text-gray-700">NubiaGo_[Asset]_[Variant]</span> — the
        same name shown on every asset card in this kit, so a downloaded file can always be traced back to its template.
      </p>
    </>);

}