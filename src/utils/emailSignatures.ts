import type { CompanyInfo } from '@/data/brand';
import { defaultCompany } from '@/data/brand';
import { WORDMARK_FILLS, WORDMARK_PATH, WORDMARK_VIEW } from '@/lib/wordmarkPath';

/** Body stack — Arial first for Outlook; kit preview may still use Inter via page CSS. */
const FONT = 'font-family:Arial,Helvetica,sans-serif;';
const NAVY = '#1E3A5F';
/** Contact labels — warm copper from the approved lockup (not Gold fill). */
const COPPER = '#C2410C';
const SLATE = '#64748B';
const MUTED = '#94A3B8';
const RULE = '#E2E8F0';
const INK = '#0F172A';

export function displayPersonName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return name;
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1].toUpperCase();
  return `${parts.slice(0, -1).join(' ')} ${last}`;
}

export function formatLocation(company: CompanyInfo): string {
  const city = company.addressLine2?.trim();
  const country = company.country?.trim();
  if (city && country) return `${city}, ${country}`;
  return city || country || '';
}

type WordmarkTone = keyof typeof WORDMARK_FILLS;

/**
 * Outlined Inter Extra Bold wordmark (same path as logo downloads).
 * Width is the display width in px; height follows the true aspect ratio.
 */
export function wordmarkHtml(widthPx = 128, tone: WordmarkTone | string = 'primary'): string {
  const fill =
    tone in WORDMARK_FILLS
      ? WORDMARK_FILLS[tone as WordmarkTone]
      : typeof tone === 'string' && tone.startsWith('#')
        ? tone
        : WORDMARK_FILLS.primary;
  const heightPx = Math.max(1, Math.round((widthPx * WORDMARK_VIEW.h) / WORDMARK_VIEW.w));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WORDMARK_VIEW.x} ${WORDMARK_VIEW.y} ${WORDMARK_VIEW.w} ${WORDMARK_VIEW.h}" width="${widthPx}" height="${heightPx}" fill="${fill}" role="img" aria-label="nubiago">` +
    `<path d="${WORDMARK_PATH}"/></svg>`;
  const src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return (
    `<img src="${src}" width="${widthPx}" height="${heightPx}" alt="nubiago" ` +
    `style="display:block;border:0;outline:none;text-decoration:none;width:${widthPx}px;height:${heightPx}px;margin-left:auto;" />`
  );
}

export function linkHtml(label: string, href: string, color = SLATE): string {
  return `<a href="${href}" style="${FONT}color:${color};text-decoration:none;">${label}</a>`;
}

export type ContactLine = { label: string; value: string; href?: string };

export type SignatureLayoutOptions = {
  name?: string;
  title?: string;
  contacts?: ContactLine[];
  tagline?: string;
  footer?: string;
  /** Wordmark display width in px (outlined SVG). */
  markSize?: number;
  width?: number;
};

/**
 * Canonical NubiaGo signature:
 * name + title + labelled contacts | wordmark + italic tagline
 * hairline rule · mission footer
 */
export function signatureLayoutHtml(
  company: CompanyInfo,
  options: SignatureLayoutOptions = {}
): string {
  const name = displayPersonName(options.name ?? company.personName);
  const title = options.title ?? company.jobTitle;
  const tagline = options.tagline ?? company.tagline;
  const footer = options.footer ?? company.mission;
  const markSize = options.markSize ?? 128;
  const width = options.width ?? 560;

  const contacts =
    options.contacts ??
    ([
      {
        label: 'E',
        value: company.email,
        href: `mailto:${company.email}`
      },
      {
        label: 'W',
        value: company.website.replace(/^https?:\/\//, ''),
        href: company.websiteUrl
      },
      {
        label: 'A',
        value: formatLocation(company)
      }
    ].filter((line) => Boolean(line.value)) as ContactLine[]);

  const contactRows = contacts
    .map((line) => {
      const value = line.href ? linkHtml(line.value, line.href, SLATE) : line.value;
      return `<tr>
      <td valign="top" style="${FONT}padding:0 0 3px 0;font-size:12px;line-height:1.45;white-space:nowrap;">
        <span style="font-weight:700;color:${COPPER};">${line.label}:</span>&nbsp;<span style="color:${SLATE};">${value}</span>
      </td>
    </tr>`;
    })
    .join('');

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" style="border-collapse:collapse;${FONT}width:${width}px;max-width:100%;">
  <tr>
    <td valign="top" style="padding:0 28px 0 0;">
      <div style="${FONT}font-size:18px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;line-height:1.25;">${name}</div>
      <div style="${FONT}font-size:13px;font-weight:500;color:${SLATE};padding:6px 0 14px 0;line-height:1.35;">${title}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        ${contactRows}
      </table>
    </td>
    <td valign="top" align="right" width="200" style="padding:2px 0 0 0;">
      ${wordmarkHtml(markSize, 'primary')}
      <div style="${FONT}font-size:11px;font-style:italic;color:${MUTED};line-height:1.45;padding-top:8px;max-width:190px;margin-left:auto;text-align:right;">
        ${tagline}
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:18px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:${RULE};font-size:0;line-height:0;border:0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="${FONT}padding:12px 0 0 0;font-size:11px;color:${MUTED};line-height:1.55;">
      ${footer}
    </td>
  </tr>
</table>`.trim();
}

/** Default staff / founder lockup — matches the approved reference. */
export function standardSignatureHtml(company: CompanyInfo = defaultCompany) {
  return signatureLayoutHtml(company);
}

/** One-line reply variant — same type, compressed. */
export function compactSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const mailto = `mailto:${company.email}`;
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${FONT}">
  <tr>
    <td valign="top" style="padding:0 20px 0 0;">
      <div style="${FONT}font-size:15px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;">${name}</div>
      <div style="${FONT}font-size:12px;color:${SLATE};padding:4px 0 8px 0;">${company.jobTitle}</div>
      <div style="${FONT}font-size:12px;line-height:1.55;color:${SLATE};">
        <span style="font-weight:700;color:${COPPER};">E:</span> ${linkHtml(company.email, mailto)}
        &nbsp;&nbsp;<span style="font-weight:700;color:${COPPER};">W:</span> ${linkHtml(company.website, company.websiteUrl)}
        ${location ? `&nbsp;&nbsp;<span style="font-weight:700;color:${COPPER};">A:</span> ${location}` : ''}
      </div>
    </td>
    <td valign="top" align="right">${wordmarkHtml(128, 'primary')}</td>
  </tr>
  <tr>
    <td colspan="2" style="padding:12px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:${RULE};font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
      <div style="${FONT}padding-top:10px;font-size:10px;font-style:italic;color:${MUTED};">${company.tagline}</div>
    </td>
  </tr>
</table>`.trim();
}

/** Executive — same DNA with phone + LinkedIn, legal footer. */
export function executiveSignatureHtml(company: CompanyInfo = defaultCompany) {
  const contacts: ContactLine[] = [
    { label: 'E', value: company.email, href: `mailto:${company.email}` },
    { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      label: 'W',
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    },
    { label: 'A', value: formatLocation(company) },
    {
      label: 'L',
      value: company.linkedin.replace(/^https?:\/\//, ''),
      href: `https://${company.linkedin.replace(/^https?:\/\//, '')}`
    }
  ].filter((line) => Boolean(line.value));

  return signatureLayoutHtml(company, {
    contacts,
    footer: `${company.mission}<br /><span style="color:${MUTED};">${company.legalName} · ${company.registration} · ${company.endorsement}</span>`,
    width: 580,
    markSize: 128
  });
}

export function wrapAsEmailDocument(body: string, title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:32px;background:#ffffff;color:${INK};">
${body}
  </body>
</html>`;
}

export const signatureTokens = { FONT, NAVY, COPPER, SLATE, MUTED, RULE, INK } as const;
