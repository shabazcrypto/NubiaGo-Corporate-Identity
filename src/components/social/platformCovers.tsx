import { Logo } from '@/components/brand/Logo';
import { useCompany } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { HERO } from '@/components/social/heroCatalog';
import {
  AliveFrame,
  CoverMark,
  CoverRule,
  Eyebrow,
  coverLogo,
  coverPad
} from '@/components/social/coverChrome';

function SafeType({
  left,
  top,
  width,
  height,
  children
}: {
  left: number;
  top: number;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute z-[1] flex flex-col justify-between"
      style={{ left, top, width, height, padding: '22px 26px' }}
    >
      {children}
    </div>
  );
}

/* ─── Facebook (7) ─────────────────────────────────────────── */

export function FacebookCoverCorporate() {
  const company = useCompany();
  const { width, height } = formats.fbCover;
  const sw = 820;
  const sh = 312;
  const left = (width - sw) / 2;
  const top = (height - sh) / 2;

  return (
    <AliveFrame width={width} height={height} hero={HERO.corporate} tone="navy" focus="16% center" rail={0.44}>
      <SafeType left={left + sw * 0.4} top={top} width={sw * 0.6} height={sh}>
        <CoverMark size={22} light />
        <div className="text-right">
          <Eyebrow light>Corporate</Eyebrow>
          <p className="mt-2 text-[21px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Where Businesses Connect.
          </p>
          <CoverRule width={48} />
          <p className="mt-2 text-[11px] text-white/50">{company.website}</p>
        </div>
      </SafeType>
    </AliveFrame>
  );
}

export function FacebookCoverMarketplace() {
  const { width, height } = formats.fbCover;
  const sw = 820;
  const sh = 312;
  const left = (width - sw) / 2;
  const top = (height - sh) / 2;

  return (
    <AliveFrame width={width} height={height} hero={HERO.marketplace} tone="sand" focus="14% center" rail={0.44}>
      <SafeType left={left + sw * 0.4} top={top} width={sw * 0.6} height={sh}>
        <CoverMark size={20} />
        <div className="text-right">
          <Eyebrow>Marketplace</Eyebrow>
          <p className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Your Marketplace for Business.
          </p>
          <CoverRule width={44} />
        </div>
      </SafeType>
    </AliveFrame>
  );
}

export function FacebookCoverMinimal() {
  const company = useCompany();
  const { width, height } = formats.fbCover;

  return (
    <AliveFrame width={width} height={height} hero={HERO.minimal} tone="sand" mode="veil" focus="45% center">
      <div className="absolute inset-0 z-[1] flex items-center justify-center">
        <div className="flex max-w-[480px] flex-col items-center text-center">
          <Logo size={28} />
          <CoverRule width={44} />
          <p className="mt-3 text-[13px] font-medium text-gray-700">{company.positioning}</p>
        </div>
      </div>
    </AliveFrame>
  );
}

export function FacebookCoverTrade() {
  const { width, height } = formats.fbCover;
  const p = coverPad(width, height);

  return (
    <AliveFrame width={width} height={height} hero={HERO.africanMarket} tone="ink" mode="band" focus="40% 45%">
      <div className="relative z-[1] flex h-full flex-col justify-between" style={{ padding: p }}>
        <div className="flex justify-between">
          <Eyebrow light>Trade</Eyebrow>
          <CoverMark size={20} light />
        </div>
        <div className="max-w-[50%]">
          <p className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Built for African commerce.
          </p>
          <CoverRule width={48} />
        </div>
      </div>
    </AliveFrame>
  );
}

export function FacebookCoverTrust() {
  const company = useCompany();
  const { width, height } = formats.fbCover;
  const sw = 820;
  const sh = 312;
  const left = (width - sw) / 2;
  const top = (height - sh) / 2;

  return (
    <AliveFrame width={width} height={height} hero={HERO.womanCeo} tone="navy" mode="veil" focus="30% center">
      <SafeType left={left + sw * 0.42} top={top} width={sw * 0.58} height={sh}>
        <CoverMark size={20} light />
        <div className="text-right">
          <Eyebrow light>Trust</Eyebrow>
          <p className="mt-2 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Reliable partners. Real opportunity.
          </p>
          <CoverRule width={44} />
          <p className="mt-2 text-[11px] text-white/50">{company.website}</p>
        </div>
      </SafeType>
    </AliveFrame>
  );
}

export function FacebookCoverLogistics() {
  const { width, height } = formats.fbCover;
  const sw = 820;
  const sh = 312;
  const left = (width - sw) / 2;
  const top = (height - sh) / 2;

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.shipping}
      tone="ink"
      mode="split"
      focus="35% center"
      rail={0.42}
    >
      <SafeType left={left + sw * 0.42} top={top} width={sw * 0.58} height={sh}>
        <CoverMark size={20} light />
        <div className="text-right">
          <Eyebrow light>Logistics</Eyebrow>
          <p className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-white">
            From warehouse to marketplace.
          </p>
          <CoverRule width={44} />
        </div>
      </SafeType>
    </AliveFrame>
  );
}

export function FacebookCoverExchange() {
  const { width, height } = formats.fbCover;
  const sw = 820;
  const sh = 312;
  const left = (width - sw) / 2;
  const top = (height - sh) / 2;

  return (
    <AliveFrame width={width} height={height} hero={HERO.handshake} tone="sand" focus="20% 40%" rail={0.44}>
      <SafeType left={left + sw * 0.4} top={top} width={sw * 0.6} height={sh}>
        <CoverMark size={20} />
        <div className="text-right">
          <Eyebrow>Exchange</Eyebrow>
          <p className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Buyers meet suppliers.
          </p>
          <CoverRule width={44} />
        </div>
      </SafeType>
    </AliveFrame>
  );
}

/* ─── X Headers (7) ────────────────────────────────────────── */

function XRail({ children }: { children: React.ReactNode }) {
  const { width, height } = formats.xHeader;
  const profileClear = 220;
  return (
    <div
      className="absolute z-[1] flex flex-col justify-between"
      style={{
        left: Math.max(profileClear, width * 0.5),
        right: 44,
        top: 32,
        bottom: 36,
        height: height - 68
      }}
    >
      {children}
    </div>
  );
}

export function XHeaderCorporate() {
  const company = useCompany();
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame width={width} height={height} hero={HERO.corporate} tone="navy" focus="14% center" rail={0.48}>
      <XRail>
        <CoverMark size={22} light />
        <div className="text-right">
          <Eyebrow light>Corporate</Eyebrow>
          <p className="mt-2 text-[24px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Where Businesses Connect.
          </p>
          <CoverRule width={48} />
          <p className="mt-2 text-[12px] text-white/50">{company.website}</p>
        </div>
      </XRail>
    </AliveFrame>
  );
}

export function XHeaderMarketplace() {
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame width={width} height={height} hero={HERO.marketplace} tone="sand" focus="12% center" rail={0.48}>
      <XRail>
        <CoverMark size={20} />
        <div className="text-right">
          <Eyebrow>Marketplace</Eyebrow>
          <p className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Your Marketplace for Business.
          </p>
          <CoverRule width={44} />
        </div>
      </XRail>
    </AliveFrame>
  );
}

export function XHeaderMinimal() {
  const company = useCompany();
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame width={width} height={height} hero={HERO.minimal} tone="sand" mode="veil" focus="45% center">
      <div
        className="absolute z-[1] flex flex-col justify-center"
        style={{ left: 240, right: 48, top: 0, bottom: 0 }}
      >
        <Logo size={26} />
        <CoverRule width={40} />
        <p className="mt-2 max-w-[400px] text-[13px] font-medium text-gray-700">{company.positioning}</p>
      </div>
    </AliveFrame>
  );
}

export function XHeaderTrade() {
  const { width, height } = formats.xHeader;
  const p = 36;

  return (
    <AliveFrame width={width} height={height} hero={HERO.spices} tone="ink" mode="band" focus="38% 42%">
      <div className="relative z-[1] flex h-full flex-col justify-between" style={{ padding: p }}>
        <div className="flex justify-between" style={{ paddingLeft: 220 }}>
          <Eyebrow light>Trade</Eyebrow>
          <CoverMark size={20} light />
        </div>
        <div className="max-w-[48%]" style={{ marginLeft: 220 }}>
          <p className="text-[24px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Built for African commerce.
          </p>
          <CoverRule width={44} />
        </div>
      </div>
    </AliveFrame>
  );
}

export function XHeaderTrust() {
  const company = useCompany();
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame width={width} height={height} hero={HERO.businesswoman} tone="navy" mode="veil" focus="32% center">
      <XRail>
        <CoverMark size={20} light />
        <div className="text-right">
          <Eyebrow light>Trust</Eyebrow>
          <p className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Reliable partners. Real opportunity.
          </p>
          <CoverRule width={44} />
          <p className="mt-2 text-[12px] text-white/50">{company.website}</p>
        </div>
      </XRail>
    </AliveFrame>
  );
}

export function XHeaderLogistics() {
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.portCrane}
      tone="ink"
      mode="split"
      focus="40% center"
      rail={0.46}
    >
      <XRail>
        <CoverMark size={20} light />
        <div className="text-right">
          <Eyebrow light>Logistics</Eyebrow>
          <p className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-white">
            From warehouse to marketplace.
          </p>
          <CoverRule width={44} />
        </div>
      </XRail>
    </AliveFrame>
  );
}

export function XHeaderExchange() {
  const { width, height } = formats.xHeader;

  return (
    <AliveFrame width={width} height={height} hero={HERO.collab} tone="sand" focus="25% 40%" rail={0.48}>
      <XRail>
        <CoverMark size={20} />
        <div className="text-right">
          <Eyebrow>Exchange</Eyebrow>
          <p className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Buyers meet suppliers.
          </p>
          <CoverRule width={44} />
        </div>
      </XRail>
    </AliveFrame>
  );
}

/* ─── Google (6) ───────────────────────────────────────────── */

export function GoogleCoverCorporate() {
  const company = useCompany();
  const { width, height } = formats.googleCover;
  const p = coverPad(width, height);
  const mark = coverLogo(width);

  return (
    <AliveFrame width={width} height={height} hero={HERO.connect} tone="navy" focus="18% center" rail={0.44}>
      <div
        className="absolute bottom-0 right-0 top-0 z-[1] flex flex-col justify-between"
        style={{ width: width * 0.44, padding: p }}
      >
        <CoverMark size={mark} light />
        <div className="text-right">
          <Eyebrow light>Corporate</Eyebrow>
          <p className="mt-2 text-[20px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Where Businesses Connect.
          </p>
          <CoverRule width={44} />
          <p className="mt-2 text-[11px] text-white/50">{company.website}</p>
        </div>
      </div>
    </AliveFrame>
  );
}

export function GoogleCoverMinimal() {
  const company = useCompany();
  const { width, height } = formats.googleCover;

  return (
    <AliveFrame width={width} height={height} hero={HERO.minimal} tone="sand" mode="veil" focus="45% center">
      <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center px-10">
        <Logo size={26} />
        <CoverRule width={40} />
        <p className="mt-3 max-w-[380px] text-center text-[13px] font-medium text-gray-700">
          {company.positioning}
        </p>
      </div>
    </AliveFrame>
  );
}

export function GoogleCoverTrade() {
  const { width, height } = formats.googleCover;
  const p = coverPad(width, height);

  return (
    <AliveFrame width={width} height={height} hero={HERO.atelier} tone="ink" mode="band" focus="40% 40%">
      <div className="relative z-[1] flex h-full flex-col justify-between" style={{ padding: p }}>
        <div className="flex justify-between">
          <Eyebrow light>Trade</Eyebrow>
          <CoverMark size={18} light />
        </div>
        <div className="max-w-[55%]">
          <p className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white">
            Built for African commerce.
          </p>
          <CoverRule width={44} />
        </div>
      </div>
    </AliveFrame>
  );
}

export function GoogleCoverTrust() {
  const company = useCompany();
  const { width, height } = formats.googleCover;
  const p = coverPad(width, height);

  return (
    <AliveFrame width={width} height={height} hero={HERO.portraitMan} tone="navy" mode="veil" focus="35% center">
      <div
        className="absolute bottom-0 right-0 top-0 z-[1] flex flex-col justify-between"
        style={{ width: width * 0.46, padding: p }}
      >
        <CoverMark size={18} light />
        <div className="text-right">
          <Eyebrow light>Trust</Eyebrow>
          <p className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-white">
            Reliable partners. Real opportunity.
          </p>
          <CoverRule width={40} />
          <p className="mt-2 text-[11px] text-white/50">{company.website}</p>
        </div>
      </div>
    </AliveFrame>
  );
}

export function GoogleCoverLogistics() {
  const { width, height } = formats.googleCover;
  const p = coverPad(width, height);

  return (
    <AliveFrame
      width={width}
      height={height}
      hero={HERO.cargoBay}
      tone="ink"
      mode="split"
      focus="30% center"
      rail={0.44}
    >
      <div
        className="absolute bottom-0 right-0 top-0 z-[1] flex flex-col justify-between"
        style={{ width: width * 0.44, padding: p }}
      >
        <CoverMark size={18} light />
        <div className="text-right">
          <Eyebrow light>Logistics</Eyebrow>
          <p className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-white">
            From warehouse to marketplace.
          </p>
          <CoverRule width={40} />
        </div>
      </div>
    </AliveFrame>
  );
}

export function GoogleCoverExchange() {
  const { width, height } = formats.googleCover;
  const p = coverPad(width, height);

  return (
    <AliveFrame width={width} height={height} hero={HERO.teamMeeting} tone="sand" focus="22% center" rail={0.44}>
      <div
        className="absolute bottom-0 right-0 top-0 z-[1] flex flex-col justify-between"
        style={{ width: width * 0.44, padding: p }}
      >
        <CoverMark size={18} />
        <div className="text-right">
          <Eyebrow>Exchange</Eyebrow>
          <p className="mt-2 text-[18px] font-semibold leading-snug tracking-[-0.02em] text-ink">
            Buyers meet suppliers.
          </p>
          <CoverRule width={40} />
        </div>
      </div>
    </AliveFrame>
  );
}

export const facebookCoverDefs = [
  { id: 'Corporate', Component: FacebookCoverCorporate },
  { id: 'Marketplace', Component: FacebookCoverMarketplace },
  { id: 'Minimal', Component: FacebookCoverMinimal },
  { id: 'Trade', Component: FacebookCoverTrade },
  { id: 'Trust', Component: FacebookCoverTrust },
  { id: 'Logistics', Component: FacebookCoverLogistics },
  { id: 'Exchange', Component: FacebookCoverExchange }
] as const;

export const xHeaderDefs = [
  { id: 'Corporate', Component: XHeaderCorporate },
  { id: 'Marketplace', Component: XHeaderMarketplace },
  { id: 'Minimal', Component: XHeaderMinimal },
  { id: 'Trade', Component: XHeaderTrade },
  { id: 'Trust', Component: XHeaderTrust },
  { id: 'Logistics', Component: XHeaderLogistics },
  { id: 'Exchange', Component: XHeaderExchange }
] as const;

export const googleCoverDefs = [
  { id: 'Corporate', Component: GoogleCoverCorporate },
  { id: 'Minimal', Component: GoogleCoverMinimal },
  { id: 'Trade', Component: GoogleCoverTrade },
  { id: 'Trust', Component: GoogleCoverTrust },
  { id: 'Logistics', Component: GoogleCoverLogistics },
  { id: 'Exchange', Component: GoogleCoverExchange }
] as const;
