import type { CompanyInfo } from '@/data/brand';
import { defaultCompany } from '@/data/brand';
import { WORDMARK_FILLS } from '@/lib/wordmarkPath';

/** Body stack — Arial first for Outlook. */
export const FONT = 'font-family:Arial,Helvetica,sans-serif;';

export type SigPalette = {
  ink: string;
  contact: string;
  muted: string;
  rule: string;
  accent: string;
  markTone: keyof typeof WORDMARK_FILLS | string;
  markOnAccent: string;
};

/** Restrained corporate palette — Primary accent only; no copper / sand / gold. */
export function sigPalette(company: CompanyInfo): SigPalette {
  const isAshBak = /ashbak/i.test(company.name);
  if (isAshBak) {
    return {
      ink: '#000000',
      contact: '#737373',
      muted: '#A3A3A3',
      rule: '#E5E5E5',
      accent: '#000000',
      markTone: 'black',
      markOnAccent: '#FAFAFA'
    };
  }
  return {
    ink: '#1E3A5F',
    contact: '#64748B',
    muted: '#94A3B8',
    rule: '#E5E5E5',
    accent: '#1E3A5F',
    markTone: 'primary',
    markOnAccent: '#FAFAFA'
  };
}

/** Org suffixes — do not shout as a personal surname (e.g. AshBak Industries). */
const CORPORATE_LAST =
  /^(industries|inc\.?|ltd\.?|llc\.?|gmbh|corp\.?|co\.?|limited|plc|sa|sas|group|holdings)$/i;

/**
 * Personal lockup: last token uppercased. Company-style names keep natural casing.
 */
export function displayPersonName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return name;
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  if (CORPORATE_LAST.test(last)) return parts.join(' ');
  return `${parts.slice(0, -1).join(' ')} ${last.toUpperCase()}`;
}

export function formatLocation(company: CompanyInfo): string {
  const city = company.addressLine2?.trim();
  const country = company.country?.trim();
  if (city && country) return `${city}, ${country}`;
  return city || country || '';
}

type WordmarkTone = keyof typeof WORDMARK_FILLS;

function resolveMarkFill(tone: WordmarkTone | string, isAshBak: boolean): string {
  if (typeof tone === 'string' && tone.startsWith('#')) return tone;
  if (tone in WORDMARK_FILLS) {
    const mapped = WORDMARK_FILLS[tone as WordmarkTone];
    if (isAshBak && tone === 'primary') return '#000000';
    if (isAshBak && tone === 'light') return '#FFFFFF';
    return mapped;
  }
  return isAshBak ? '#000000' : WORDMARK_FILLS.primary;
}

/**
 * Brand wordmark for HTML signatures — Outlook-safe text (no SVG data-URI).
 * Outlined SVG downloads live on Brand System / Logo pack.
 */
export function wordmarkHtml(
  widthPx = 128,
  tone: WordmarkTone | string = 'primary',
  align: 'left' | 'right' | 'center' = 'right',
  company?: CompanyInfo
): string {
  const isAshBak = company ? /ashbak/i.test(company.name) : false;
  const fill = resolveMarkFill(tone, isAshBak);
  const margin =
    align === 'right' ? 'margin-left:auto;' : align === 'center' ? 'margin-left:auto;margin-right:auto;' : '';
  const label = isAshBak ? 'ashbak' : 'nubiago';
  const fontSize = Math.max(14, Math.round(widthPx * (isAshBak ? 0.28 : 0.26)));
  const heightPx = Math.round(fontSize * 1.15);
  const weight = isAshBak ? 700 : 800;
  return (
    `<div role="img" aria-label="${label}" ` +
    `style="display:block;${FONT}font-size:${fontSize}px;font-weight:${weight};letter-spacing:-0.04em;` +
    `line-height:1.15;color:${fill};width:${widthPx}px;height:${heightPx}px;${margin}">${label}</div>`
  );
}

export function linkHtml(label: string, href: string, color: string): string {
  return `<a href="${href}" style="${FONT}color:${color};text-decoration:none;">${label}</a>`;
}

export type ContactLine = { label?: string; value: string; href?: string };

/* ── Shared primitives (0 / 4 / 8 / 12 / 16 rhythm) ── */

export function sigName(text: string, color: string, size = 17): string {
  return `<div style="${FONT}font-size:${size}px;font-weight:700;color:${color};letter-spacing:-0.02em;line-height:1.25;">${text}</div>`;
}

export function sigTitle(text: string, color: string): string {
  return `<div style="${FONT}font-size:12px;color:${color};padding-top:4px;line-height:1.35;">${text}</div>`;
}

export function sigRule(color: string, height = 1): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
  <tr><td height="${height}" style="background-color:${color};font-size:0;line-height:0;border:0;">&nbsp;</td></tr>
</table>`;
}

export function sigFooter(text: string, color: string): string {
  return `<div style="${FONT}font-size:11px;color:${color};line-height:1.55;">${text}</div>`;
}

/** Labelled contact stack (muted uppercase labels) or bare links. */
export function sigContactStack(
  lines: ContactLine[],
  colors: { label: string; value: string },
  mode: 'labelled' | 'plain' = 'labelled'
): string {
  if (mode === 'plain') {
    const bits = lines.map((line) =>
      line.href ? linkHtml(line.value, line.href, colors.value) : line.value
    );
    return `<div style="${FONT}font-size:12px;line-height:1.7;color:${colors.value};">${bits.join(
      `&nbsp;&nbsp;<span style="color:${colors.label};">·</span>&nbsp;&nbsp;`
    )}</div>`;
  }
  const rows = lines
    .map((line) => {
      const value = line.href ? linkHtml(line.value, line.href, colors.value) : line.value;
      const label = line.label
        ? `<td valign="top" style="${FONT}padding:0 12px 4px 0;font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${colors.label};white-space:nowrap;">${line.label}</td>`
        : '';
      return `<tr>${label}<td valign="top" style="${FONT}padding:0 0 4px 0;font-size:12px;line-height:1.45;color:${colors.value};">${value}</td></tr>`;
    })
    .join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${rows}</table>`;
}

export function sigShell(width: number, inner: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" style="border-collapse:collapse;${FONT}width:${width}px;max-width:100%;">${inner}</table>`;
}

export function defaultContacts(company: CompanyInfo): ContactLine[] {
  const location = formatLocation(company);
  return [
    { label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { label: 'Phone', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      label: 'Web',
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    },
    ...(location ? [{ label: 'Base', value: location }] : [])
  ];
}

export type SignatureLayoutOptions = {
  name?: string;
  title?: string;
  contacts?: ContactLine[];
  tagline?: string;
  footer?: string;
  markSize?: number;
  width?: number;
};

/**
 * Standard — Layout #1: two-column identity | mark · hairline · mission footer.
 */
export function signatureLayoutHtml(
  company: CompanyInfo,
  options: SignatureLayoutOptions = {}
): string {
  const p = sigPalette(company);
  const name = displayPersonName(options.name ?? company.personName);
  const title = options.title ?? company.jobTitle;
  const footer = options.footer ?? company.mission;
  const markSize = options.markSize ?? 112;
  const width = options.width ?? 540;

  const contactLines: ContactLine[] = (options.contacts ??
    ([
      { label: 'E', value: company.email, href: `mailto:${company.email}` },
      {
        label: 'W',
        value: company.website.replace(/^https?:\/\//, ''),
        href: company.websiteUrl
      },
      ...(formatLocation(company) ? [{ label: 'A', value: formatLocation(company) }] : [])
    ] as ContactLine[])).filter((line) => Boolean(line.value));

  return sigShell(
    width,
    `
  <tr>
    <td valign="top" style="padding:0 24px 0 0;">
      ${sigName(name, p.ink, 17)}
      ${sigTitle(title, p.contact)}
      <div style="padding-top:12px;">
        ${sigContactStack(contactLines, { label: p.muted, value: p.contact }, 'labelled')}
      </div>
    </td>
    <td valign="top" align="right" width="180" style="padding:2px 0 0 0;">
      ${wordmarkHtml(markSize, p.markTone, 'right', company)}
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:16px 0 0 0;">${sigRule(p.rule)}</td>
  </tr>
  <tr>
    <td colspan="2" style="padding:12px 0 0 0;">${sigFooter(footer, p.muted)}</td>
  </tr>`
  );
}

/** Default staff lockup. */
export function standardSignatureHtml(company: CompanyInfo = defaultCompany) {
  return signatureLayoutHtml(company);
}

/**
 * Compact — Layout #3: mark + name · Primary rail · middot contacts.
 */
export function compactSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const bits = [
    linkHtml(company.email, `mailto:${company.email}`, p.contact),
    linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, p.contact),
    location || null
  ].filter(Boolean);

  return sigShell(
    480,
    `
  <tr>
    <td valign="middle" width="72" style="padding:0 12px 0 0;">
      ${wordmarkHtml(72, p.markTone, 'left', company)}
    </td>
    <td valign="middle" style="border-left:2px solid ${p.accent};padding:0 0 0 12px;">
      ${sigName(name, p.ink, 14)}
      ${sigTitle(company.jobTitle, p.contact)}
    </td>
  </tr>
  <tr>
    <td colspan="2" style="${FONT}padding:12px 0 0 0;font-size:11px;line-height:1.55;color:${p.contact};">
      ${bits.join(`&nbsp;&nbsp;<span style="color:${p.muted};">·</span>&nbsp;&nbsp;`)}
    </td>
  </tr>`
  );
}

/**
 * Executive — Layout #7: Primary rail · name · title · mark · links · legal.
 */
export function executiveSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const linkedinHref = `https://${company.linkedin.replace(/^https?:\/\//, '')}`;
  const linkedinLabel = company.linkedin.replace(/^https?:\/\//, '');

  const links = [
    linkHtml(company.email, `mailto:${company.email}`, p.ink),
    linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, p.ink),
    linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, p.ink),
    linkHtml(linkedinLabel, linkedinHref, p.ink)
  ];

  return sigShell(
    520,
    `
  <tr>
    <td width="3" style="background-color:${p.accent};font-size:0;line-height:0;width:3px;">&nbsp;</td>
    <td style="padding:0 0 0 16px;">
      ${sigName(name, p.ink, 18)}
      ${sigTitle(company.jobTitle, p.contact)}
      <div style="padding-top:12px;">${wordmarkHtml(100, p.markTone, 'left', company)}</div>
      <div style="${FONT}font-size:12px;line-height:1.7;color:${p.contact};padding-top:12px;">
        ${links.join(`&nbsp;&nbsp;<span style="color:${p.muted};">|</span>&nbsp;&nbsp;`)}
      </div>
      ${location ? `<div style="${FONT}font-size:11px;color:${p.muted};padding-top:4px;">${location}</div>` : ''}
      <div style="padding-top:16px;">${sigRule(p.rule)}</div>
      <div style="padding-top:12px;">
        ${sigFooter(`${company.legalName} · ${company.registration} · ${company.endorsement}`, p.muted)}
      </div>
    </td>
  </tr>`
  );
}

export function wrapAsEmailDocument(body: string, title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:32px;background:#ffffff;color:#0F172A;">
${body}
  </body>
</html>`;
}

/** @deprecated Prefer sigPalette(company). Kept for legacy imports. */
export const signatureTokens = {
  FONT,
  NAVY: '#1E3A5F',
  SLATE: '#64748B',
  MUTED: '#94A3B8',
  RULE: '#E5E5E5',
  INK: '#1E3A5F'
} as const;
