import type { ReactNode } from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { formats } from '@/lib/formats';
import {
  businessCardSets,
  CorporateCardFront,
  CorporateCardBack,
  MinimalCardFront,
  MinimalCardBack
} from '@/components/cards/CardLayouts';
import { DuplexPreview } from '@/components/cards/DuplexPreview';
import { useBrandSettings } from '@/lib/brand-context';

export { CorporateCardFront, CorporateCardBack, MinimalCardFront, MinimalCardBack };

function BleedShell({ padColor, children }: { padColor: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: padColor }}>
      <div style={{ width: formats.card.width, height: formats.card.height }}>{children}</div>
    </div>
  );
}

export function BusinessCardPage() {
  const { brand } = useBrandSettings();
  const prefix = brand === 'ashbak' ? 'AshBak' : 'NubiaGo';

  return (
    <>
      <PageHeader
        code="06"
        title="Business Card"
        folder="06_BUSINESS_CARD"
        description="3.5 × 2 in (88.9 × 50.8 mm) at 300 dpi. Nine duplex sets — each with a Front and Back. Every pair has its own creative concept (mirror, invert, gatefold, day/night, whisper/echo, field/void, wrap, registration). Solid fields only. Bleed artboards (+3 mm) for every face."
        specs={['3.5 × 2 in · 300 dpi', '9 duplex sets', '18 bleed faces']}
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Trim', '3.5 × 2 in · 88.9 × 50.8 mm'],
          ['Export', `${formats.card.exportWidth} × ${formats.card.exportHeight} px · 300 dpi`],
          ['Bleed', '94.9 × 56.8 mm · all 18 faces']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      {businessCardSets.map((set) => (
        <div key={set.id} className="mb-4">
          <GroupLabel note={set.concept}>{set.title}</GroupLabel>

          <div className="mb-10 border border-gray-200 bg-gray-50 px-4 py-6 print:hidden">
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              Duplex flip · handoff preview
            </p>
            <DuplexPreview
              front={<set.front.Component />}
              back={<set.back.Component />}
              frontLabel="Front"
              backLabel="Back"
            />
          </div>

          <AssetFrame
            title={`${set.title} — Front`}
            fileName={`${prefix}_${set.title}_Front`}
            artboard={formats.card}
            description={set.front.description}
          >
            <set.front.Component />
          </AssetFrame>

          <AssetFrame
            title={`${set.title} — Back`}
            fileName={`${prefix}_${set.title}_Back`}
            artboard={formats.card}
            description={set.back.description}
          >
            <set.back.Component />
          </AssetFrame>

          <AssetFrame
            title={`${set.title} Front — with bleed`}
            fileName={`${prefix}_${set.title}_Front_Bleed`}
            artboard={formats.cardBleed}
            description={`94.9 × 56.8 mm (+3 mm). ${set.concept}`}
          >
            <BleedShell padColor={set.frontBleedBg ?? '#FFFFFF'}>
              <set.front.Component />
            </BleedShell>
          </AssetFrame>

          <AssetFrame
            title={`${set.title} Back — with bleed`}
            fileName={`${prefix}_${set.title}_Back_Bleed`}
            artboard={formats.cardBleed}
            description={`94.9 × 56.8 mm (+3 mm). ${set.concept}`}
          >
            <BleedShell padColor={set.bleedBg ?? '#FFFFFF'}>
              <set.back.Component />
            </BleedShell>
          </AssetFrame>
        </div>
      ))}
    </>
  );
}
