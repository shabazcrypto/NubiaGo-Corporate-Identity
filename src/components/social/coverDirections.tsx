import { useCompany } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { HERO } from '@/components/social/heroCatalog';
import { Logo, BrandRule } from '@/components/brand/Logo';
import {
  AliveFrame,
  CoverMark,
  CoverRule,
  Eyebrow,
  Rail,
  coverLogo,
  coverPad
} from '@/components/social/coverChrome';

export interface CoverSizeProps {
  width?: number;
  height?: number;
  pad?: number;
}

export { HERO };

/** 01 Corporate — studio campaign */
export function CoverCorporate({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const company = useCompany();
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.38;

  return (
    <AliveFrame width={width} height={height} hero={HERO.corporate} tone="navy" focus="18% center" rail={rail}>
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} light />
        <div className="text-right">
          <Eyebrow light>Corporate</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: Math.round(Math.min(height * 0.078, 48)), lineHeight: 1.12 }}
          >
            Where Businesses
            <br />
            Connect.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
          <p className="mt-3 text-white/50" style={{ fontSize: Math.round(height * 0.03) }}>
            {company.website}
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 02 Marketplace — studio still life */
export function CoverMarketplace({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.38;

  return (
    <AliveFrame width={width} height={height} hero={HERO.marketplace} tone="sand" focus="16% center" rail={rail}>
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} />
        <div className="text-right">
          <Eyebrow>Marketplace</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-ink"
            style={{ fontSize: Math.round(Math.min(height * 0.07, 44)), lineHeight: 1.12 }}
          >
            Your Marketplace
            <br />
            for Business.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
          <p className="mt-3 text-gray-700" style={{ fontSize: Math.round(height * 0.028) }}>
            Products · Suppliers · Buyers
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 03 Connect — studio */
export function CoverConnect({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const company = useCompany();
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.4;

  return (
    <AliveFrame width={width} height={height} hero={HERO.connect} tone="sand" focus="20% center" rail={rail}>
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} />
        <div className="text-right">
          <div className="mb-3 flex items-center justify-end gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Buyers</span>
            <span className="h-px w-5 bg-brand-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">Suppliers</span>
          </div>
          <p
            className="font-semibold tracking-[-0.03em] text-ink"
            style={{ fontSize: Math.round(Math.min(height * 0.07, 44)), lineHeight: 1.12 }}
          >
            Where Businesses
            <br />
            Connect.
          </p>
          <p className="mt-3 text-gray-700" style={{ fontSize: Math.round(height * 0.028) }}>
            {company.website}
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 04 Discover — studio */
export function CoverDiscover({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.38;

  return (
    <AliveFrame width={width} height={height} hero={HERO.discover} tone="navy" focus="18% center" rail={rail}>
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} light />
        <div className="text-right">
          <Eyebrow light>Discover</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: Math.round(Math.min(height * 0.08, 50)), lineHeight: 1.15 }}
          >
            Discover.
            <br />
            Connect.
            <br />
            Grow.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 05 Minimal — atmospheric */
export function CoverMinimal({
  width = formats.masterCover.width,
  height = formats.masterCover.height,
  showPositioning = true
}: CoverSizeProps & { showPositioning?: boolean }) {
  const company = useCompany();
  const p = coverPad(width, height);
  const mark = coverLogo(width);

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.minimal}
      tone="sand"
      mode="veil"
      focus="45% center"
    >
      <div className="flex h-full flex-col items-center justify-center text-center" style={{ padding: p }}>
        <Logo size={Math.round(mark * 1.35)} />
        {showPositioning ? (
          <>
            <div className="mt-5 flex justify-center">
              <BrandRule width={Math.round(width * 0.03)} thickness={1.5} tone="gold" />
            </div>
            <p
              className="mt-4 max-w-[55%] font-medium text-gray-700"
              style={{ fontSize: Math.round(height * 0.036) }}
            >
              {company.positioning}
            </p>
          </>
        ) : null}
      </div>
    </AliveFrame>
  );
}

/** 06 Trade — Unsplash market / spices, editorial band */
export function CoverTrade({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const p = coverPad(width, height);
  const mark = coverLogo(width);

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.spices}
      tone="ink"
      mode="band"
      focus="35% 40%"
    >
      <div className="flex h-full flex-col justify-between" style={{ padding: p }}>
        <div className="flex items-start justify-between">
          <Eyebrow light>Trade</Eyebrow>
          <CoverMark size={mark} light />
        </div>
        <div className="max-w-[55%]">
          <p
            className="font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: Math.round(Math.min(height * 0.08, 50)), lineHeight: 1.1 }}
          >
            Built for African
            <br />
            commerce.
          </p>
          <CoverRule width={Math.round(width * 0.035)} />
          <p className="mt-3 text-white/55" style={{ fontSize: Math.round(height * 0.03) }}>
            Categories · Suppliers · Cross-border trade
          </p>
        </div>
      </div>
    </AliveFrame>
  );
}

/** 07 Trust — Unsplash leadership portrait */
export function CoverTrust({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const company = useCompany();
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.42;

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.womanCeo}
      tone="navy"
      mode="veil"
      focus="28% center"
    >
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} light />
        <div className="text-right">
          <Eyebrow light>Trust</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: Math.round(Math.min(height * 0.075, 46)), lineHeight: 1.12 }}
          >
            Reliable partners.
            <br />
            Real opportunity.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
          <p className="mt-3 text-white/50" style={{ fontSize: Math.round(height * 0.028) }}>
            {company.website}
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 08 Logistics — Unsplash warehouse / shipping */
export function CoverLogistics({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.4;

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.warehouse}
      tone="ink"
      mode="split"
      focus="30% center"
      rail={rail}
    >
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} light />
        <div className="text-right">
          <Eyebrow light>Logistics</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-white"
            style={{ fontSize: Math.round(Math.min(height * 0.072, 44)), lineHeight: 1.12 }}
          >
            From warehouse
            <br />
            to marketplace.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
          <p className="mt-3 text-white/50" style={{ fontSize: Math.round(height * 0.028) }}>
            Freight · Fulfilment · Scale
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** 09 Exchange — Unsplash handshake / collab */
export function CoverExchange({
  width = formats.masterCover.width,
  height = formats.masterCover.height
}: CoverSizeProps) {
  const company = useCompany();
  const p = coverPad(width, height);
  const mark = coverLogo(width);
  const rail = 0.4;

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.handshake}
      tone="sand"
      mode="rail"
      focus="22% 35%"
      rail={rail}
    >
      <Rail width={width} height={height} pad={p} rail={rail}>
        <CoverMark size={mark} />
        <div className="text-right">
          <Eyebrow>Exchange</Eyebrow>
          <p
            className="mt-3 font-semibold tracking-[-0.03em] text-ink"
            style={{ fontSize: Math.round(Math.min(height * 0.07, 44)), lineHeight: 1.12 }}
          >
            Buyers meet
            <br />
            suppliers.
          </p>
          <CoverRule width={Math.round(width * 0.032)} />
          <p className="mt-3 text-gray-700" style={{ fontSize: Math.round(height * 0.028) }}>
            {company.positioning}
          </p>
        </div>
      </Rail>
    </AliveFrame>
  );
}

/** Catalog for page wiring */
export const masterCoverDefs = [
  { id: 'Corporate', Component: CoverCorporate, desc: 'Studio team — navy type rail' },
  { id: 'Marketplace', Component: CoverMarketplace, desc: 'Product still life — sand rail' },
  { id: 'Connect', Component: CoverConnect, desc: 'Human connection — sand rail' },
  { id: 'Discover', Component: CoverDiscover, desc: 'Discovery stack — navy rail' },
  { id: 'Minimal', Component: CoverMinimal, desc: 'Quiet atmosphere — centred mark' },
  { id: 'Trade', Component: CoverTrade, desc: 'Unsplash market — editorial band' },
  { id: 'Trust', Component: CoverTrust, desc: 'Unsplash leadership — veil' },
  { id: 'Logistics', Component: CoverLogistics, desc: 'Unsplash warehouse — ink split' },
  { id: 'Exchange', Component: CoverExchange, desc: 'Unsplash handshake — sand rail' }
] as const;
