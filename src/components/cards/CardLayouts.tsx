import type { ReactNode } from 'react';
import { LinkedinIcon } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '@/components/brand/iconSystem';
import { useCompany } from '@/lib/brand-context';

/** 4 mm safe margin · 3.5 × 2 in artboard. */
export const CARD_PAD = Math.round((4 / 25.4) * 96);

/** Single accent — rules and icons only. */
export const CARD_ACCENT = '#1E3A5F';
const INK = '#111827';
/** Contact / secondary body — press-safe charcoal (not gray-500). */
const SECONDARY = '#404040';
const RULE = '#E5E7EB';
const HAIRLINE = '#E5E5E5';
const WHITE = '#FFFFFF';
const BLACK = '#0A0A0A';
const NAVY = '#1E3A5F';
/** Brand Warm Sand. */
const SAND = '#F5F0E8';

function formatAddress(company: ReturnType<typeof useCompany>) {
  return [company.addressLine1, company.addressLine2, company.country]
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(', ');
}

function webOf(company: ReturnType<typeof useCompany>) {
  return company.website.startsWith('www.') ? company.website : `www.${company.website}`;
}

function Mark({
  size = 12,
  tone = 'primary'
}: {
  size?: number;
  tone?: 'primary' | 'light' | 'black';
}) {
  const fill = tone === 'light' ? WHITE : tone === 'black' ? BLACK : NAVY;
  const d = Math.max(3.5, size * 0.38);
  return (
    <div className="flex items-center gap-[5px]">
      <span className="inline-block shrink-0 rounded-full" style={{ width: d, height: d, background: fill }} />
      <Logo size={size} tone={tone === 'light' ? 'light' : tone === 'black' ? 'black' : 'primary'} />
    </div>
  );
}

function Rule({ w = 16 }: { w?: number }) {
  return <span className="inline-block shrink-0" style={{ width: w, height: 1.5, background: CARD_ACCENT }} />;
}

function Shell({
  bg,
  children,
  className = ''
}: {
  bg: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`box-border flex h-full w-full overflow-hidden ${className}`}
      style={{ background: bg, padding: CARD_PAD }}
    >
      {children}
    </div>
  );
}

/* ── 01 Executive: white · name TR · contacts BL ── */
export function CardExecutive() {
  const company = useCompany();
  const Phone = iconByKey('phone');
  const Mail = iconByKey('email');
  const Globe = iconByKey('website');
  const rows = [
    [Phone, company.phone],
    [Mail, company.email],
    [Globe, webOf(company)]
  ] as const;
  const address = formatAddress(company);

  return (
    <Shell bg={WHITE} className="flex-col justify-between">
      <div className="flex justify-end">
        <div className="text-right">
          <div className="text-[12px] font-semibold leading-none tracking-[-0.02em]" style={{ color: INK }}>
            {company.personName}
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <Rule w={14} />
            <span className="text-[6.5px] font-medium" style={{ color: SECONDARY }}>
              {company.jobTitle}
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map(([Icon, value], i) =>
          value ? (
            <div key={i} className="flex items-center gap-2">
              <Icon className="h-[7.5px] w-[7.5px] shrink-0" style={{ color: CARD_ACCENT }} strokeWidth={1.5} />
              <span className="text-[6.5px] leading-none" style={{ color: SECONDARY }}>
                {value}
              </span>
            </div>
          ) : null
        )}
        {address ? (
          <div className="text-[6.5px] leading-snug" style={{ color: SECONDARY }}>
            {address}
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

/* ── 02 Manifesto: black · brand reverse ── */
export function CardManifesto() {
  const company = useCompany();
  const linkedIn = company.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <Shell bg={BLACK} className="flex-col text-white">
      <div className="flex justify-end">
        <Mark size={11} tone="light" />
      </div>
      <div className="mt-5 max-w-[68%]">
        <div className="text-[11px] font-semibold leading-[1.25] tracking-[-0.02em]">
          Connecting Africa through Commerce
        </div>
        <div className="mt-2.5">
          <Rule w={24} />
        </div>
        <p className="mt-2 text-[6.5px] leading-snug text-white/70">Global reach. Local settlement.</p>
      </div>
      <div className="mt-auto flex items-end justify-between gap-3">
        <div>
          <div className="text-[5px] font-semibold uppercase tracking-[0.2em] text-white/35">Connect</div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <LinkedinIcon className="h-[7px] w-[7px] text-white/60" strokeWidth={NG_STROKE} />
              <span className="text-[6px] text-white/80">{linkedIn}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[6px] font-semibold leading-none text-white/60">X</span>
              <span className="text-[6px] text-white/80">@nubiago</span>
            </div>
          </div>
        </div>
        <QrPlaceholder size={36} label="" tone="light" framed />
      </div>
    </Shell>
  );
}

/* ── 03 Split: navy column + white column ── */
export function CardSplit() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div
        className="flex w-[26%] flex-col justify-between"
        style={{ background: NAVY, padding: CARD_PAD }}
      >
        <Logo size={10} tone="light" />
        <div className="text-[6px] font-medium uppercase leading-[1.35] tracking-[0.12em] text-white/45">
          {company.positioning}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white" style={{ padding: CARD_PAD }}>
        <div>
          <div className="text-[11px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            {company.personName}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Rule w={12} />
            <span className="text-[6.5px]" style={{ color: SECONDARY }}>
              {company.jobTitle}
            </span>
          </div>
        </div>
        <div className="space-y-1 text-[6.5px] leading-snug" style={{ color: SECONDARY }}>
          <div>{company.phone}</div>
          <div>{company.email}</div>
          <div style={{ color: CARD_ACCENT }}>{webOf(company)}</div>
          <div className="pt-0.5 text-[6px]">{formatAddress(company)}</div>
        </div>
      </div>
    </div>
  );
}

/* ── 04 Editorial: two columns, hairline ── */
export function CardEditorial() {
  const company = useCompany();
  return (
    <Shell bg={WHITE} className="flex-col">
      <Mark size={10} tone="primary" />
      <div className="mt-auto grid w-full grid-cols-[minmax(0,1.2fr)_1px_minmax(0,1fr)]">
        <div
          className="pr-3 text-[14px] font-semibold leading-[1.05] tracking-[-0.03em]"
          style={{ color: INK, gridColumn: 1, gridRow: 1 }}
        >
          {company.personName}
        </div>
        <div style={{ gridColumn: 2, gridRow: '1 / -1', background: HAIRLINE }} />
        <div className="pr-3 pt-2 text-[6.5px]" style={{ color: SECONDARY, gridColumn: 1, gridRow: 2 }}>
          {company.jobTitle}
        </div>
        <div
          className="pl-3 pt-2 text-[6.5px] leading-[1.55]"
          style={{ color: SECONDARY, gridColumn: 3, gridRow: 2 }}
        >
          {company.phone}
        </div>
        <div className="space-y-0 pl-3 text-[6.5px] leading-[1.55]" style={{ color: SECONDARY, gridColumn: 3, gridRow: 3 }}>
          <div>{company.email}</div>
          <div style={{ color: CARD_ACCENT }}>{webOf(company)}</div>
          <div className="pt-1 text-[6px]">{formatAddress(company)}</div>
        </div>
      </div>
    </Shell>
  );
}

/* ── 05 Horizon: header / body / footer zones ── */
export function CardHorizon() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div
        className="flex items-center justify-between border-b"
        style={{
          height: 26,
          borderColor: RULE,
          paddingLeft: CARD_PAD,
          paddingRight: CARD_PAD
        }}
      >
        <Logo size={9} />
        <span className="text-[5px] font-semibold uppercase tracking-[0.16em]" style={{ color: SECONDARY }}>
          {company.endorsementShort}
        </span>
      </div>
      <div className="flex flex-1 items-start justify-between" style={{ padding: CARD_PAD }}>
        <div>
          <div className="text-[11px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            {company.personName}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Rule w={12} />
            <span className="text-[6.5px]" style={{ color: SECONDARY }}>
              {company.jobTitle}
            </span>
          </div>
        </div>
        <div className="text-right text-[6.5px] leading-[1.55]" style={{ color: SECONDARY }}>
          <div>{company.phone}</div>
          <div>{company.email}</div>
          <div>{formatAddress(company)}</div>
        </div>
      </div>
      <div
        className="flex items-center justify-between border-t text-[5.5px]"
        style={{
          borderColor: RULE,
          paddingLeft: CARD_PAD,
          paddingRight: CARD_PAD,
          paddingTop: 5,
          paddingBottom: 5,
          color: SECONDARY
        }}
      >
        <span style={{ color: CARD_ACCENT }}>{webOf(company)}</span>
        <span className="uppercase tracking-[0.1em]">{company.legalName}</span>
      </div>
    </div>
  );
}

/* ── 06 Quiet: sand · centred · minimal ── */
export function CardQuiet() {
  const company = useCompany();
  return (
    <Shell bg={SAND} className="flex-col items-center justify-between">
      <Logo size={12} />
      <div className="text-center">
        <div className="text-[11.5px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
          {company.personName}
        </div>
        <div className="mx-auto mt-2 flex justify-center">
          <Rule w={18} />
        </div>
        <div className="mt-2 text-[6.5px]" style={{ color: SECONDARY }}>
          {company.jobTitle}
        </div>
      </div>
      <div className="text-center text-[6px] leading-[1.55]" style={{ color: SECONDARY }}>
        <div>{company.email}</div>
        <div style={{ color: CARD_ACCENT }}>{webOf(company)}</div>
        <div>{formatAddress(company)}</div>
      </div>
    </Shell>
  );
}

/* ── 07 Solid: navy field · gold rule ── */
export function CardSolid() {
  const company = useCompany();
  return (
    <Shell bg={NAVY} className="flex-col justify-between text-white">
      <div className="flex items-start justify-between">
        <Logo size={11} tone="light" />
        <span className="text-[5px] font-semibold uppercase tracking-[0.16em] text-white/40">
          {company.endorsementShort}
        </span>
      </div>
      <div>
        <div className="text-[12px] font-semibold tracking-[-0.02em]">{company.personName}</div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="inline-block w-3.5 bg-brand-gold" style={{ height: 1.5 }} />
          <span className="text-[6.5px] text-white/75">{company.jobTitle}</span>
        </div>
        <div className="mt-3.5 space-y-1 text-[6.5px] leading-snug text-white/65">
          <div>{company.phone}</div>
          <div>{company.email}</div>
          <div className="text-white/90">{webOf(company)}</div>
        </div>
      </div>
    </Shell>
  );
}

/* ── 08 Ribbon: white + navy footer bar ── */
export function CardRibbon() {
  const company = useCompany();
  const Phone = iconByKey('phone');
  const Mail = iconByKey('email');
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      <div className="flex flex-1 flex-col justify-between" style={{ padding: CARD_PAD }}>
        <Mark size={10} tone="primary" />
        <div>
          <div className="text-[11.5px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            {company.personName}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Rule w={12} />
            <span className="text-[6.5px]" style={{ color: SECONDARY }}>
              {company.jobTitle}
            </span>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Phone className="h-[7.5px] w-[7.5px]" style={{ color: CARD_ACCENT }} strokeWidth={1.5} />
              <span className="text-[6.5px]" style={{ color: SECONDARY }}>
                {company.phone}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="h-[7.5px] w-[7.5px]" style={{ color: CARD_ACCENT }} strokeWidth={1.5} />
              <span className="text-[6.5px]" style={{ color: SECONDARY }}>
                {company.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-between text-[6px] text-white"
        style={{
          background: NAVY,
          paddingLeft: CARD_PAD,
          paddingRight: CARD_PAD,
          paddingTop: 6,
          paddingBottom: 6
        }}
      >
        <span className="font-medium">{webOf(company)}</span>
        <span className="uppercase tracking-[0.12em] text-white/70">{formatAddress(company)}</span>
      </div>
    </div>
  );
}

/* ── 09 Corner Front: L-mark · identity · QR ── */
export function CardCorner() {
  const company = useCompany();
  return (
    <div className="relative h-full w-full overflow-hidden bg-white" style={{ padding: CARD_PAD }}>
      <div
        className="absolute"
        style={{ background: CARD_ACCENT, left: CARD_PAD, top: CARD_PAD, width: 1.5, height: 28 }}
      />
      <div
        className="absolute"
        style={{ background: CARD_ACCENT, left: CARD_PAD, top: CARD_PAD, width: 28, height: 1.5 }}
      />
      <div className="flex h-full w-full flex-col justify-between">
        <Logo size={10} />
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[11.5px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              {company.personName}
            </div>
            <div className="mt-1 text-[6.5px]" style={{ color: SECONDARY }}>
              {company.jobTitle}
            </div>
            <div className="mt-2.5 space-y-0.5 text-[6.5px] leading-snug" style={{ color: SECONDARY }}>
              <div>{company.email}</div>
              <div style={{ color: CARD_ACCENT }}>{webOf(company)}</div>
            </div>
          </div>
          <QrPlaceholder size={44} label="" tone="light" framed />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
 * REVERSE SIDES — one creative pair per card set
 * ═══════════════════════════════════════════════════ */

/** Executive reverse — Mirror Dialectic: brand face on matte black. */
export function CardExecutiveBack() {
  return <CardManifesto />;
}

/** Manifesto reverse — Statement / Scan: white field, oversized QR. */
export function CardManifestoBack() {
  const company = useCompany();
  return (
    <Shell bg={WHITE} className="flex-col justify-between">
      <div className="flex items-start justify-between">
        <Mark size={11} tone="primary" />
        <span className="text-[5px] font-semibold uppercase tracking-[0.18em]" style={{ color: SECONDARY }}>
          Scan to connect
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center py-2">
        <QrPlaceholder size={72} label="" tone="light" framed />
        <div className="mt-3 text-center text-[7px] font-medium" style={{ color: CARD_ACCENT }}>
          {webOf(company)}
        </div>
      </div>
      <div className="text-[6px] leading-snug" style={{ color: SECONDARY }}>
        {company.mission}
      </div>
    </Shell>
  );
}

/** Split reverse — Inverted Rail: white brand rail, navy content. */
export function CardSplitBack() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div
        className="flex w-[26%] flex-col justify-between border-r"
        style={{ background: WHITE, padding: CARD_PAD, borderColor: HAIRLINE }}
      >
        <Logo size={10} />
        <div className="text-[5px] font-semibold uppercase leading-[1.35] tracking-[0.14em]" style={{ color: SECONDARY }}>
          Brand
        </div>
      </div>
      <div
        className="flex flex-1 flex-col justify-between text-white"
        style={{ background: NAVY, padding: CARD_PAD }}
      >
        <div>
          <div className="text-[10px] font-semibold leading-[1.3] tracking-[-0.02em]">
            Connecting Africa through Commerce
          </div>
          <div className="mt-2">
            <span className="inline-block w-5 bg-brand-gold" style={{ height: 1.5 }} />
          </div>
        </div>
        <div className="flex items-end justify-between gap-2">
          <p className="max-w-[58%] text-[6px] leading-snug text-white/65">{company.mission}</p>
          <QrPlaceholder size={36} label="" tone="dark" framed />
        </div>
      </div>
    </div>
  );
}

/** Editorial reverse — Gatefold: mission left, connect right. */
export function CardEditorialBack() {
  const company = useCompany();
  const linkedIn = company.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <Shell bg={WHITE} className="flex-col">
      <Mark size={10} tone="primary" />
      <div className="mt-auto grid w-full grid-cols-[minmax(0,1.2fr)_1px_minmax(0,1fr)] gap-y-0">
        <div
          className="pr-3 text-[10px] font-semibold leading-[1.25] tracking-[-0.02em]"
          style={{ color: INK, gridColumn: 1, gridRow: 1 }}
        >
          Connecting Africa through Commerce
        </div>
        <div style={{ gridColumn: 2, gridRow: '1 / -1', background: HAIRLINE }} />
        <div className="pr-3 pt-2 text-[6px] leading-snug" style={{ color: SECONDARY, gridColumn: 1, gridRow: 2 }}>
          {company.tagline}
        </div>
        <div className="pl-3 text-[5px] font-semibold uppercase tracking-[0.16em]" style={{ color: SECONDARY, gridColumn: 3, gridRow: 1 }}>
          Connect
        </div>
        <div className="space-y-1.5 pl-3 pt-1 text-[6px]" style={{ color: SECONDARY, gridColumn: 3, gridRow: 2 }}>
          <div className="flex items-center gap-1">
            <LinkedinIcon className="h-[7px] w-[7px]" style={{ color: CARD_ACCENT }} strokeWidth={NG_STROKE} />
            <span>{linkedIn}</span>
          </div>
          <QrPlaceholder size={34} label="" tone="light" framed />
        </div>
      </div>
    </Shell>
  );
}

/** Horizon reverse — Day / Night: same three zones on navy. */
export function CardHorizonBack() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: NAVY }}>
      <div
        className="flex items-center justify-between border-b border-white/15"
        style={{ height: 26, paddingLeft: CARD_PAD, paddingRight: CARD_PAD }}
      >
        <Logo size={9} tone="light" />
        <span className="text-[5px] font-semibold uppercase tracking-[0.16em] text-white/40">
          {company.endorsementShort}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center" style={{ padding: CARD_PAD }}>
        <div className="text-[11px] font-semibold leading-[1.25] tracking-[-0.02em] text-white">
          Connecting Africa through Commerce
        </div>
        <div className="mt-2.5">
          <span className="inline-block w-6 bg-brand-gold" style={{ height: 1.5 }} />
        </div>
        <p className="mt-2 max-w-[80%] text-[6.5px] leading-snug text-white/60">{company.mission}</p>
      </div>
      <div
        className="flex items-center justify-between border-t border-white/15 text-[5.5px] text-white/55"
        style={{ paddingLeft: CARD_PAD, paddingRight: CARD_PAD, paddingTop: 5, paddingBottom: 5 }}
      >
        <span className="text-white/80">{webOf(company)}</span>
        <span className="uppercase tracking-[0.1em]">{company.legalName}</span>
      </div>
    </div>
  );
}

/** Quiet reverse — Whisper / Echo: centred black. */
export function CardQuietBack() {
  const company = useCompany();
  return (
    <Shell bg={BLACK} className="flex-col items-center justify-between text-white">
      <Logo size={12} tone="light" />
      <div className="text-center">
        <div className="text-[10px] font-semibold leading-[1.3] tracking-[-0.02em]">
          Connecting Africa through Commerce
        </div>
        <div className="mx-auto mt-2.5 flex justify-center">
          <span className="inline-block w-5 bg-brand-gold" style={{ height: 1.5 }} />
        </div>
        <p className="mt-2.5 max-w-[200px] text-[6.5px] leading-snug text-white/55">{company.tagline}</p>
      </div>
      <div className="text-center text-[6px] text-white/45">{webOf(company)}</div>
    </Shell>
  );
}

/** Solid reverse — Field / Void: white negative with gold rule + QR. */
export function CardSolidBack() {
  const company = useCompany();
  return (
    <Shell bg={WHITE} className="flex-col justify-between">
      <div className="flex items-start justify-between">
        <Logo size={11} />
        <span className="text-[5px] font-semibold uppercase tracking-[0.16em]" style={{ color: SECONDARY }}>
          {company.endorsementShort}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="max-w-[55%]">
          <div className="text-[10px] font-semibold leading-[1.25] tracking-[-0.02em]" style={{ color: INK }}>
            Connecting Africa through Commerce
          </div>
          <div className="mt-2">
            <span className="inline-block w-4 bg-brand-gold" style={{ height: 1.5 }} />
          </div>
          <p className="mt-2 text-[6px] leading-snug" style={{ color: SECONDARY }}>
            {company.mission}
          </p>
        </div>
        <QrPlaceholder size={44} label="" tone="light" framed />
      </div>
    </Shell>
  );
}

/** Ribbon reverse — Wrap Continuity: navy body, white header ribbon. */
export function CardRibbonBack() {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ background: NAVY }}>
      <div
        className="flex items-center justify-between text-[6px]"
        style={{
          background: WHITE,
          paddingLeft: CARD_PAD,
          paddingRight: CARD_PAD,
          paddingTop: 6,
          paddingBottom: 6,
          color: SECONDARY
        }}
      >
        <Mark size={9} tone="primary" />
        <span className="uppercase tracking-[0.12em]">{formatAddress(company)}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between text-white" style={{ padding: CARD_PAD }}>
        <div>
          <div className="text-[11px] font-semibold leading-[1.25] tracking-[-0.02em]">
            Connecting Africa through Commerce
          </div>
          <div className="mt-2">
            <span className="inline-block w-5 bg-brand-gold" style={{ height: 1.5 }} />
          </div>
          <p className="mt-2 max-w-[75%] text-[6.5px] leading-snug text-white/60">{company.mission}</p>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[6px] text-white/80">{webOf(company)}</span>
          <QrPlaceholder size={36} label="" tone="dark" framed />
        </div>
      </div>
    </div>
  );
}

/** Corner reverse — Registration Match: L-mark bottom-right (aligns when flipped). */
export function CardCornerBack() {
  const company = useCompany();
  return (
    <div className="relative h-full w-full overflow-hidden bg-white" style={{ padding: CARD_PAD }}>
      <div
        className="absolute"
        style={{
          background: CARD_ACCENT,
          right: CARD_PAD,
          bottom: CARD_PAD,
          width: 1.5,
          height: 28
        }}
      />
      <div
        className="absolute"
        style={{
          background: CARD_ACCENT,
          right: CARD_PAD,
          bottom: CARD_PAD,
          width: 28,
          height: 1.5
        }}
      />
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex justify-end">
          <Mark size={11} tone="primary" />
        </div>
        <div className="max-w-[70%]">
          <div className="text-[10px] font-semibold leading-[1.25] tracking-[-0.02em]" style={{ color: INK }}>
            Connecting Africa through Commerce
          </div>
          <div className="mt-2">
            <Rule w={16} />
          </div>
          <p className="mt-2 text-[6.5px] leading-snug" style={{ color: SECONDARY }}>
            {company.tagline}
          </p>
        </div>
        <div className="text-[6px]" style={{ color: SECONDARY }}>
          {webOf(company)}
        </div>
      </div>
    </div>
  );
}

export type CardSide = {
  Component: () => JSX.Element;
  fileName: string;
  description: string;
  side: 'Front' | 'Back';
};

export type CardSet = {
  id: string;
  title: string;
  concept: string;
  front: CardSide;
  back: CardSide;
  bleedBg?: string;
};

/** Nine duplex sets — each with a unique front/back concept. */
export const businessCardSets: CardSet[] = [
  {
    id: 'executive',
    title: 'Executive',
    concept: 'Mirror dialectic — white person face / black brand face',
    front: {
      side: 'Front',
      Component: CardExecutive,
      fileName: 'NubiaGo_Card_Executive_Front',
      description: 'Person face. Name top-right, contacts bottom-left.'
    },
    back: {
      side: 'Back',
      Component: CardExecutiveBack,
      fileName: 'NubiaGo_Card_Executive_Back',
      description: 'Brand face. Mark, Africa mission, CONNECT and QR.'
    },
    bleedBg: '#0A0A0A'
  },
  {
    id: 'manifesto',
    title: 'Manifesto',
    concept: 'Statement / Scan — black manifesto / white QR destination',
    front: {
      side: 'Front',
      Component: CardManifesto,
      fileName: 'NubiaGo_Card_Manifesto_Front',
      description: 'Matte black. Positioning statement and social connect.'
    },
    back: {
      side: 'Back',
      Component: CardManifestoBack,
      fileName: 'NubiaGo_Card_Manifesto_Back',
      description: 'White scan face. Oversized QR to the website.'
    },
    bleedBg: '#0A0A0A'
  },
  {
    id: 'split',
    title: 'Split',
    concept: 'Inverted rail — navy|white flips to white|navy',
    front: {
      side: 'Front',
      Component: CardSplit,
      fileName: 'NubiaGo_Card_Split_Front',
      description: 'Navy brand rail left, person panel right.'
    },
    back: {
      side: 'Back',
      Component: CardSplitBack,
      fileName: 'NubiaGo_Card_Split_Back',
      description: 'Inverted: white rail, navy mission + QR.'
    },
    bleedBg: '#1E3A5F'
  },
  {
    id: 'editorial',
    title: 'Editorial',
    concept: 'Gatefold columns — same hairline grammar both sides',
    front: {
      side: 'Front',
      Component: CardEditorial,
      fileName: 'NubiaGo_Card_Editorial_Front',
      description: 'Name left, contacts right, hairline spine.'
    },
    back: {
      side: 'Back',
      Component: CardEditorialBack,
      fileName: 'NubiaGo_Card_Editorial_Back',
      description: 'Mission left, CONNECT + QR right — same spine.'
    }
  },
  {
    id: 'horizon',
    title: 'Horizon',
    concept: 'Day / Night — three zones on white, then on navy',
    front: {
      side: 'Front',
      Component: CardHorizon,
      fileName: 'NubiaGo_Card_Horizon_Front',
      description: 'Header / body / footer chrome on white.'
    },
    back: {
      side: 'Back',
      Component: CardHorizonBack,
      fileName: 'NubiaGo_Card_Horizon_Back',
      description: 'Identical zoning on Primary — night side.'
    },
    bleedBg: '#1E3A5F'
  },
  {
    id: 'quiet',
    title: 'Quiet',
    concept: 'Whisper / Echo — centred sand, centred black',
    front: {
      side: 'Front',
      Component: CardQuiet,
      fileName: 'NubiaGo_Card_Quiet_Front',
      description: 'Warm sand. Centred person lockup.'
    },
    back: {
      side: 'Back',
      Component: CardQuietBack,
      fileName: 'NubiaGo_Card_Quiet_Back',
      description: 'Matte black echo. Centred mission.'
    },
    bleedBg: '#0A0A0A'
  },
  {
    id: 'solid',
    title: 'Solid',
    concept: 'Field / Void — full Primary, then white negative',
    front: {
      side: 'Front',
      Component: CardSolid,
      fileName: 'NubiaGo_Card_Solid_Front',
      description: 'Solid Primary. Gold rule. Person contacts.'
    },
    back: {
      side: 'Back',
      Component: CardSolidBack,
      fileName: 'NubiaGo_Card_Solid_Back',
      description: 'White void. Gold rule, mission, QR.'
    },
    bleedBg: '#1E3A5F'
  },
  {
    id: 'ribbon',
    title: 'Ribbon',
    concept: 'Wrap continuity — footer ribbon becomes header on flip',
    front: {
      side: 'Front',
      Component: CardRibbon,
      fileName: 'NubiaGo_Card_Ribbon_Front',
      description: 'White body, navy footer ribbon.'
    },
    back: {
      side: 'Back',
      Component: CardRibbonBack,
      fileName: 'NubiaGo_Card_Ribbon_Back',
      description: 'Navy body, white header ribbon — continuous wrap.'
    },
    bleedBg: '#1E3A5F'
  },
  {
    id: 'corner',
    title: 'Corner',
    concept: 'Registration match — L-marks meet when the card is flipped',
    front: {
      side: 'Front',
      Component: CardCorner,
      fileName: 'NubiaGo_Card_Corner_Front',
      description: 'L-mark top-left. Identity + QR.'
    },
    back: {
      side: 'Back',
      Component: CardCornerBack,
      fileName: 'NubiaGo_Card_Corner_Back',
      description: 'L-mark bottom-right — registers with the front when flipped.'
    }
  }
];

/** Flat list for Storybook / legacy iteration. */
export const businessCardCatalog = businessCardSets.flatMap((set) => [
  {
    id: `${set.id}-front`,
    title: `${set.title} — Front`,
    fileName: set.front.fileName,
    description: set.front.description,
    Component: set.front.Component
  },
  {
    id: `${set.id}-back`,
    title: `${set.title} — Back`,
    fileName: set.back.fileName,
    description: set.back.description,
    Component: set.back.Component
  }
]);

export const CorporateCardFront = CardExecutive;
export const CorporateCardBack = CardExecutiveBack;
export const MinimalCardFront = CardQuiet;
export const MinimalCardBack = CardQuietBack;
