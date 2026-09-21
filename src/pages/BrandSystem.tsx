import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { Logo, LogoLockup, BrandRule, Endorsement } from '../components/brand/Logo';
import { brandIcons, NG_STROKE } from '../components/brand/iconSystem';
import { brandColors, neutralColors, semanticColors, typeScale, voiceAndTone, company, type Swatch } from '../data/brand';
import { MailIcon, GlobeIcon, CheckIcon, XIcon } from 'lucide-react';

function SwatchGrid({ title, swatches }: {title: string;swatches: Swatch[];}) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-[13px] font-semibold text-ink">{title}</h3>
      <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-4 lg:grid-cols-5">
        {swatches.map((swatch) =>
        <div key={swatch.hex} className="bg-white">
            <div className="h-24 w-full" style={{ backgroundColor: swatch.hex }} />
            <div className="px-3 py-3">
              <div className="text-[13px] font-semibold text-ink">{swatch.name}</div>
              <dl className="mt-2 space-y-0.5 text-[11px] leading-tight text-gray-500">
                <div className="flex justify-between gap-2">
                  <dt>HEX</dt>
                  <dd className="font-medium text-gray-700">{swatch.hex}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>RGB</dt>
                  <dd className="font-medium text-gray-700">{swatch.rgb}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt>CMYK</dt>
                  <dd className="font-medium text-gray-700">{swatch.cmyk}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>);

}

const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64];

export function BrandSystemPage() {
  return (
    <>
      <PageHeader
        code="01"
        title="NubiaGo Design System"
        folder="01_BRAND_SYSTEM"
        description="The single source of truth for every asset in this kit. Logo, colour, type, spacing and components are taken directly from the NubiaGo Brand Guidelines v1.0 and are not reinterpreted anywhere downstream." />
      

      <GroupLabel note="Wordmark only — the mark supplied in the guidelines">Logo system</GroupLabel>
      <div className="mb-8 grid gap-px bg-gray-200 md:grid-cols-3">
        <div className="flex h-48 flex-col items-center justify-center bg-gray-50">
          <Logo size={44} />
          <span className="mt-6 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">Primary</span>
        </div>
        <div className="flex h-48 flex-col items-center justify-center bg-brand">
          <Logo size={44} tone="light" />
          <span className="mt-6 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">Reversed</span>
        </div>
        <div className="flex h-48 flex-col items-center justify-center bg-brand-sand">
          <Logo size={44} tone="black" />
          <span className="mt-6 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
            Mono on Warm Sand
          </span>
        </div>
      </div>

      <div className="mb-10 grid gap-8 md:grid-cols-3">
        <div className="border border-gray-200 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Clear space</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            Keep clear space equal to the height of the lowercase “n” on all four sides. Nothing — type, rules, images
            or page edges — enters this zone.
          </p>
          <div className="mt-5 flex justify-center bg-gray-50 p-6">
            <div className="relative border border-dashed border-brand-gold p-5">
              <Logo size={26} />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Minimum size</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            14 px on screen and 12 mm wide in print. Below this the counters in “g” and “a” begin to close on press.
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
            Permitted on White, Warm Sand, Gray 50 and Primary. On photography, place the reversed wordmark only over a
            calm, dark area.
          </p>
          <ul className="mt-5 space-y-2 text-[12px] text-gray-700">
            {[
            { ok: true, label: 'Reversed wordmark on Primary' },
            { ok: true, label: 'Primary wordmark on Warm Sand' },
            { ok: false, label: 'Wordmark on Gold or a busy photo' },
            { ok: false, label: 'Re-lettered, outlined or stretched mark' },
            { ok: false, label: 'Any line locked under the wordmark — it stands alone' }].
            map((rule) =>
            <li key={rule.label} className="flex items-start gap-2">
                {rule.ok ?
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-state-success" strokeWidth={2} /> :

              <XIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-state-error" strokeWidth={2} />
              }
                <span>{rule.label}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="mb-14 grid gap-8 lg:grid-cols-2">
        <div className="border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Lockup with descriptor</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            Used on covers, business cards and the first page of formal documents. The descriptor is set in Caption
            style and never competes with the wordmark.
          </p>
          <div className="mt-6 bg-white p-8">
            <LogoLockup size={34} />
          </div>
        </div>
        <div className="border border-gray-200 bg-gray-50 p-6">
          <h3 className="text-[13px] font-semibold text-ink">Endorsement</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-gray-700">
            <strong className="font-semibold text-ink">{company.endorsement}</strong> It is footer copy — set on the
            footer line, in Caption style, alongside the other administrative details. It is never locked to the
            wordmark, never set directly beneath it, and never treated as part of the logo.
          </p>
          <div className="mt-6 bg-white p-8">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <Logo size={16} />
              <Endorsement />
            </div>
          </div>
          <ul className="mt-5 space-y-2 text-[12px] text-gray-700">
            <li className="flex items-start gap-2">
              <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-state-success" strokeWidth={2} />
              <span>On the footer line, separated from the wordmark</span>
            </li>
            <li className="flex items-start gap-2">
              <XIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-state-error" strokeWidth={2} />
              <span>Stacked under the wordmark as a lockup</span>
            </li>
          </ul>
        </div>
      </div>

      <GroupLabel note="Exact values from Brand Guidelines v1.0. CMYK conversions for coated stock.">
        Colour palette
      </GroupLabel>
      <SwatchGrid title="Brand colours" swatches={brandColors} />
      <SwatchGrid title="Neutral colours" swatches={neutralColors} />
      <SwatchGrid title="Semantic colours" swatches={semanticColors} />
      <div className="mb-14 border-l-2 border-brand-gold bg-gray-50 px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Application rule.</strong> Primary carries the identity; Warm Sand
        and Gray 50 carry the page. Gold is an accent only — rules, key figures and small marks — never a background for
        body text. Semantic colours are reserved for status in tables and data, never for decoration.
      </div>

      <GroupLabel note="Inter — the single corporate typeface">Typography</GroupLabel>
      <div className="mb-8 border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-8">
          <div className="text-[64px] font-light leading-none tracking-[-0.03em] text-ink">Inter</div>
          <p className="mt-3 text-[13px] text-gray-500">
            Primary typeface — highly legible, system-friendly. Weights 300–800. Arial is the substitute in email
            clients and Office documents where Inter is unavailable.
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {typeScale.map((step) =>
          <li key={step.label} className="grid grid-cols-12 items-center gap-4 px-6 py-4">
              <div
              className="col-span-12 text-ink sm:col-span-5"
              style={{
                fontSize: step.size,
                fontWeight: step.weight,
                letterSpacing: step.tracking,
                textTransform: step.label === 'Caption' ? 'uppercase' : 'none',
                lineHeight: 1.15
              }}>
              
                {step.label}
              </div>
              <div className="col-span-4 text-[12px] font-medium text-gray-500 sm:col-span-2">
                {step.size} / {step.weight}
              </div>
              <div className="col-span-8 text-[12px] text-gray-700 sm:col-span-5">{step.usage}</div>
            </li>
          )}
        </ul>
      </div>

      <GroupLabel note="4 px base unit">Spacing</GroupLabel>
      <div className="mb-14 border border-gray-200 p-6">
        <div className="flex flex-wrap items-end gap-6">
          {spacingScale.map((value) =>
          <div key={value} className="text-center">
              <div className="bg-brand-light" style={{ width: value, height: value }} />
              <div className="mt-2 text-[11px] text-gray-500">{value}</div>
            </div>
          )}
        </div>
        <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-gray-700">
          Documents use a 17 mm (64 px) page margin and a 12-column grid with 24 px gutters. Slides use a 64 px margin
          on a 1280 × 720 artboard. Vertical rhythm steps in multiples of 8 px; 48 px and 64 px separate major sections.
        </p>
      </div>

      <GroupLabel>Components</GroupLabel>
      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Buttons</h3>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="bg-brand px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-150 ease-out hover:bg-brand-light">
              Primary action
            </button>
            <button type="button" className="border border-brand px-5 py-2.5 text-[13px] font-semibold text-brand transition-colors duration-150 ease-out hover:bg-brand-sand">
              Secondary action
            </button>
            <button type="button" className="border-b border-brand-gold pb-0.5 text-[13px] font-semibold text-ink">
              Tertiary link
            </button>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
            Square corners, no shadows, no gradients. One primary action per view.
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Dividers &amp; accent rule</h3>
          <BrandRule width="100%" thickness={2} />
          <div className="mt-5 h-px w-full bg-gray-200" />
          <div className="mt-5">
            <BrandRule width={72} thickness={2} tone="gold" />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
            One weight, one purpose. A 2 px Primary rule opens a section, a 1 px Gray 200 hairline separates content,
            and a short Gold rule marks emphasis. Nothing heavier than 2 px, and no multi-colour devices.
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Table</h3>
          <table className="w-full border-collapse text-[12px]">
            <thead>
              <tr className="border-b-2 border-brand text-left text-[10px] uppercase tracking-[0.12em] text-gray-500">
                <th className="px-3 py-2 font-medium">Item</th>
                <th className="px-3 py-2 font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {[
              ['Platform integration', '1', '12,400.00'],
              ['Merchant onboarding', '250', '8,750.00'],
              ['Support retainer', '12', '3,600.00']].
              map((row) =>
              <tr key={row[0]}>
                  <td className="border-b border-gray-200 px-3 py-2 text-gray-700">{row[0]}</td>
                  <td className="border-b border-gray-200 px-3 py-2 text-gray-700">{row[1]}</td>
                  <td className="border-b border-gray-200 px-3 py-2 text-right tabular-nums text-ink">{row[2]}</td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
            No filled header bar and no zebra rows — a 2 px Primary rule under the caption line and hairlines between
            rows carry the structure. Figures are right-aligned and tabular.
          </p>
        </div>

        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Cards</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-gray-200 bg-white p-4">
              <div className="text-[26px] font-bold tracking-[-0.02em] text-brand">18,400</div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-gray-500">
                Active merchants
              </div>
            </div>
            <div className="bg-brand-sand p-4">
              <div className="text-[13px] font-semibold text-ink">Warm Sand card</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-gray-700">
                Used to group supporting content without adding another border.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-8 lg:grid-cols-2">
        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Document header &amp; footer</h3>
          <div className="border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <Logo size={18} />
              <span className="text-[9px] text-gray-500">{company.website}</span>
            </div>
            <BrandRule width="100%" thickness={2} />
          </div>
          <div className="mt-4 border border-gray-200 p-4">
            <div className="h-px w-full bg-gray-200" />
            <div className="mt-2 flex items-center justify-between text-[9px] text-gray-500">
              <span>
                {company.legalName} · {company.email} · {company.endorsement}
              </span>
              <span className="tabular-nums">Page 1 / 4</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h3 className="mb-4 text-[13px] font-semibold text-ink">Image treatment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/3] bg-brand" />
            <div className="aspect-[4/3] bg-brand-sand" />
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
            Square-cropped, full-bleed within its column, no rounded corners and no drop shadows. Where a photograph
            carries text, overlay Primary at 80% rather than a gradient scrim.
          </p>
        </div>
      </div>

      <div className="mb-14 border border-gray-200 p-6">
        <h3 className="mb-4 text-[13px] font-semibold text-ink">Icon system</h3>
        <div className="grid grid-cols-3 gap-5 sm:grid-cols-6 lg:grid-cols-7">
          {brandIcons.map(({ key, label, Icon }) =>
          <div key={key} className="flex flex-col items-center gap-2 text-center">
              <Icon className="h-6 w-6 text-brand" strokeWidth={NG_STROKE} />
              <span className="text-[10px] leading-tight text-gray-500">{label}</span>
            </div>
          )}
        </div>
        <p className="mt-6 text-[12px] leading-relaxed text-gray-500">
          Lucide line icons, 1.5 px stroke on a 24 px grid, drawn in Primary or Gray 500. No filled, duotone or
          multi-colour icons, and never an emoji in place of an icon.
        </p>
      </div>

      <GroupLabel>Voice &amp; tone</GroupLabel>
      <div className="mb-10 grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
        {voiceAndTone.map((item) =>
        <div key={item.title} className="bg-gray-50 p-5">
            <div className="text-[13px] font-semibold text-ink">{item.title}</div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-gray-700">{item.body}</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-gray-200 pt-6 text-[12px] text-gray-500">
        <span className="flex items-center gap-1.5">
          <GlobeIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} /> {company.website}
        </span>
        <span className="flex items-center gap-1.5">
          <MailIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} /> {company.email}
        </span>
        <span className="uppercase tracking-[0.12em]">{company.endorsement}</span>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-gray-500">
        Telephone is carried on letterheads, business cards and contact pages only — never in a document, email or
        social footer.
      </p>
    </>);

}