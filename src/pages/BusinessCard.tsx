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

export { CorporateCardFront, CorporateCardBack, MinimalCardFront, MinimalCardBack };

export function BusinessCardPage() {
  return (
    <>
      <PageHeader
        code="06"
        title="Business Card"
        folder="06_BUSINESS_CARD"
        description="3.5 × 2 in (88.9 × 50.8 mm) at 300 dpi. Nine duplex sets — each with a Front and Back. Every pair has its own creative concept (mirror, invert, gatefold, day/night, whisper/echo, field/void, wrap, registration). Solid fields only."
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Trim', '3.5 × 2 in · 88.9 × 50.8 mm'],
          ['Export', `${formats.card.exportWidth} × ${formats.card.exportHeight} px · 300 dpi`],
          ['Sets', '9 duplex · 18 faces']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      {businessCardSets.map((set) => (
        <div key={set.id}>
          <GroupLabel note={set.concept}>
            {set.title}
          </GroupLabel>

          <AssetFrame
            title={`${set.title} — Front`}
            fileName={set.front.fileName}
            artboard={formats.card}
            description={set.front.description}
          >
            <set.front.Component />
          </AssetFrame>

          <AssetFrame
            title={`${set.title} — Back`}
            fileName={set.back.fileName}
            artboard={formats.card}
            description={set.back.description}
          >
            <set.back.Component />
          </AssetFrame>
        </div>
      ))}

      <GroupLabel note="Trim + 3 mm bleed · press">Bleed artboards</GroupLabel>

      {businessCardSets
        .filter((set) => set.bleedBg)
        .slice(0, 3)
        .map((set) => (
          <AssetFrame
            key={`bleed-${set.id}`}
            title={`${set.title} Back — with bleed`}
            fileName={`${set.back.fileName}_Bleed`}
            artboard={formats.cardBleed}
            description={`94.9 × 56.8 mm. ${set.concept}`}
          >
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ background: set.bleedBg }}
            >
              <div style={{ width: formats.card.width, height: formats.card.height }}>
                <set.back.Component />
              </div>
            </div>
          </AssetFrame>
        ))}
    </>
  );
}
