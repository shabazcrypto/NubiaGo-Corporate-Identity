import type { CompanyInfo } from '@/data/brand';
import { defaultCompany } from '@/data/brand';
import {
  formatLocation,
  displayPersonName,
  wordmarkHtml,
  linkHtml,
  signatureTokens
} from './emailSignatures';

const { FONT, NAVY, COPPER, GOLD, SAND, SLATE, MUTED, RULE, INK } = signatureTokens;

function domain(company: CompanyInfo) {
  return company.website.replace(/^www\./, '').replace(/^https?:\/\//, '');
}

/**
 * Corridor Lead — navy left rail + stacked contacts as plain links (no copper labels).
 * Relationship-manager voice for field correspondence.
 */
export function photoSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const rows = [
    ['Email', linkHtml(company.email, `mailto:${company.email}`, SLATE)],
    ['Phone', linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, SLATE)],
    ['Web', linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, SLATE)],
    location ? ['Base', location] : null
  ].filter(Boolean) as [string, string][];

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="border-collapse:collapse;${FONT}width:520px;max-width:100%;">
  <tr>
    <td width="6" style="background-color:${NAVY};font-size:0;line-height:0;width:6px;">&nbsp;</td>
    <td style="padding:0 0 0 18px;">
      <div style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${GOLD};">Corridor · West Africa</div>
      <div style="${FONT}font-size:17px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;padding-top:6px;">${name}</div>
      <div style="${FONT}font-size:12px;color:${SLATE};padding:4px 0 12px 0;">Corridor Lead</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        ${rows
          .map(
            ([k, v]) => `<tr>
          <td valign="top" style="${FONT}padding:0 14px 4px 0;font-size:10px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${MUTED};white-space:nowrap;">${k}</td>
          <td valign="top" style="${FONT}padding:0 0 4px 0;font-size:12px;color:${SLATE};">${v}</td>
        </tr>`
          )
          .join('')}
      </table>
      <div style="padding-top:14px;">${wordmarkHtml(96, 'primary', 'left')}</div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Legal — formal centred-left stack with privilege sand banner (no side wordmark column).
 */
export function legalSignatureHtml(company: CompanyInfo = defaultCompany) {
  const legal = `legal@${domain(company)}`;
  const name = displayPersonName(company.personName);

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="500" style="border-collapse:collapse;${FONT}width:500px;max-width:100%;">
  <tr>
    <td style="padding:0 0 12px 0;">
      ${wordmarkHtml(100, 'primary', 'left')}
    </td>
  </tr>
  <tr>
    <td>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:${INK};font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="${FONT}padding:14px 0 0 0;">
      <div style="font-size:16px;font-weight:700;color:${INK};letter-spacing:-0.02em;">${name}</div>
      <div style="font-size:12px;color:${SLATE};padding:4px 0 10px 0;">Legal &amp; Compliance</div>
      <div style="font-size:12px;line-height:1.65;color:${SLATE};">
        ${linkHtml(legal, `mailto:${legal}`, INK)}
        &nbsp;·&nbsp;
        ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, INK)}
        &nbsp;·&nbsp;
        ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, INK)}
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background-color:${SAND};">
        <tr>
          <td style="${FONT}padding:10px 14px;font-size:10px;line-height:1.55;color:${SLATE};">
            <strong style="color:${NAVY};">Privileged &amp; confidential</strong> — for the named recipient only.
            ${company.legalName} · ${company.registration}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Support desk — sand panel with navy header band (ticket / case voice).
 */
export function supportSignatureHtml(company: CompanyInfo = defaultCompany) {
  const support = `support@${domain(company)}`;

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="border-collapse:collapse;${FONT}width:480px;max-width:100%;">
  <tr>
    <td style="background-color:${NAVY};padding:12px 18px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">${wordmarkHtml(88, '#FAFAFA', 'left')}</td>
          <td valign="middle" align="right" style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};">
            Merchant Success
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color:${SAND};padding:16px 18px;">
      <div style="${FONT}font-size:15px;font-weight:700;color:${NAVY};">NubiaGo Support</div>
      <div style="${FONT}font-size:11px;color:${SLATE};padding:4px 0 12px 0;">Mon–Fri 08:00–18:00 WAT · Case ID: [CASE-XXXX]</div>
      <div style="${FONT}font-size:12px;line-height:1.7;color:${SLATE};">
        ${linkHtml(support, `mailto:${support}`, NAVY)}
        &nbsp;&nbsp;·&nbsp;&nbsp;
        ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, NAVY)}
        &nbsp;&nbsp;·&nbsp;&nbsp;
        ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, NAVY)}
      </div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Press — wordmark left, identity right (inverted from master lockup).
 */
export function pressSignatureHtml(company: CompanyInfo = defaultCompany) {
  const press = `press@${domain(company)}`;
  const name = displayPersonName(company.personName);

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="540" style="border-collapse:collapse;${FONT}width:540px;max-width:100%;">
  <tr>
    <td valign="top" width="150" style="padding:0 24px 0 0;">
      ${wordmarkHtml(120, 'primary', 'left')}
      <div style="${FONT}font-size:10px;font-style:italic;color:${MUTED};padding-top:8px;line-height:1.45;">Media relations</div>
    </td>
    <td valign="top" width="1" style="background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="top" style="padding:0 0 0 20px;">
      <div style="${FONT}font-size:16px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;">${name}</div>
      <div style="${FONT}font-size:12px;color:${SLATE};padding:4px 0 12px 0;">${company.jobTitle} · Media Relations</div>
      <div style="${FONT}font-size:12px;line-height:1.65;color:${SLATE};">
        ${linkHtml(press, `mailto:${press}`, COPPER)}<br />
        ${linkHtml(`${company.website}/press`, `${company.websiteUrl}/press`, SLATE)}<br />
        ${formatLocation(company)}
      </div>
      <div style="${FONT}font-size:10px;color:${MUTED};padding-top:12px;line-height:1.5;">
        Embargo policy applies. Media kit on request.
      </div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Bilingual EN / FR — split columns under a shared name header.
 */
export function bilingualSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="border-collapse:collapse;${FONT}width:560px;max-width:100%;">
  <tr>
    <td colspan="3" style="padding:0 0 12px 0;">
      <div style="${FONT}font-size:17px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;">${name}</div>
      <div style="${FONT}font-size:12px;color:${SLATE};padding-top:4px;">
        ${company.jobTitle}
        <span style="color:${MUTED};">&nbsp;/&nbsp;</span>
        Fondateur &amp; PDG
      </div>
    </td>
  </tr>
  <tr>
    <td valign="top" width="48%" style="padding:0 16px 0 0;">
      <div style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};padding-bottom:8px;">English</div>
      <div style="${FONT}font-size:11px;font-style:italic;color:${SLATE};line-height:1.5;padding-bottom:10px;">${company.tagline}</div>
      <div style="${FONT}font-size:11px;color:${MUTED};line-height:1.55;">${company.mission}</div>
    </td>
    <td width="1" style="background-color:${RULE};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="top" width="48%" style="padding:0 0 0 16px;">
      <div style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};padding-bottom:8px;">Français</div>
      <div style="${FONT}font-size:11px;font-style:italic;color:${SLATE};line-height:1.5;padding-bottom:10px;">Relier l&rsquo;Afrique par le commerce et la logistique</div>
      <div style="${FONT}font-size:11px;color:${MUTED};line-height:1.55;">Construire l&rsquo;infrastructure du commerce transfrontalier pour les ménages et entreprises africains.</div>
    </td>
  </tr>
  <tr>
    <td colspan="3" style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">${wordmarkHtml(90, 'primary', 'left')}</td>
          <td valign="middle" align="right" style="${FONT}font-size:11px;color:${SLATE};">
            ${linkHtml(company.email, `mailto:${company.email}`, SLATE)}
            &nbsp;·&nbsp;
            ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, SLATE)}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Mono print-safe — single-column typewriter stack, black ink only.
 */
export function monoSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const ink = '#1A1A1A';
  const gray = '#525252';

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="420" style="border-collapse:collapse;${FONT}width:420px;max-width:100%;">
  <tr>
    <td>
      ${wordmarkHtml(100, 'black', 'left')}
      <div style="${FONT}font-size:15px;font-weight:700;color:${ink};letter-spacing:0.02em;padding-top:14px;text-transform:uppercase;">${name}</div>
      <div style="${FONT}font-size:11px;color:${gray};padding:4px 0 12px 0;letter-spacing:0.04em;">${company.jobTitle}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="48" style="border-collapse:collapse;">
        <tr><td height="2" style="background-color:${ink};font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
      <div style="${FONT}font-size:11px;line-height:1.75;color:${gray};padding-top:12px;">
        ${company.email}<br />
        ${company.website}<br />
        ${location || ''}
      </div>
      <div style="${FONT}font-size:10px;color:${gray};padding-top:14px;line-height:1.55;">${company.mission}</div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Enterprise sales — full-width navy band identity (shared desk, not a personal lockup).
 */
export function teamSignatureHtml(company: CompanyInfo = defaultCompany) {
  const sales = `sales@${domain(company)}`;

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="border-collapse:collapse;${FONT}width:520px;max-width:100%;">
  <tr>
    <td style="background-color:${NAVY};padding:20px 22px;">
      ${wordmarkHtml(112, '#FAFAFA', 'left')}
      <div style="${FONT}font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:${GOLD};padding-top:10px;">Enterprise Sales</div>
      <div style="${FONT}font-size:16px;font-weight:700;color:#FAFAFA;padding-top:4px;">NubiaGo Enterprise Sales</div>
      <div style="${FONT}font-size:12px;color:rgba(250,250,250,0.65);padding-top:4px;">Cross-border settlement</div>
    </td>
  </tr>
  <tr>
    <td style="border:1px solid ${RULE};border-top:0;padding:14px 22px;">
      <div style="${FONT}font-size:12px;line-height:1.7;color:${SLATE};">
        ${linkHtml(sales, `mailto:${sales}`, NAVY)}
        &nbsp;&nbsp;·&nbsp;&nbsp;
        ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, NAVY)}
        &nbsp;&nbsp;·&nbsp;&nbsp;
        ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, NAVY)}
      </div>
      <div style="${FONT}font-size:10px;color:${MUTED};padding-top:8px;">Response within one business day</div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Out of office — notice-first sand callout, then minimal identity row.
 */
export function outOfOfficeSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" style="border-collapse:collapse;${FONT}width:520px;max-width:100%;">
  <tr>
    <td style="background-color:${SAND};border-left:4px solid ${GOLD};padding:14px 18px;">
      <div style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${NAVY};">Out of office</div>
      <div style="${FONT}font-size:13px;color:${SLATE};line-height:1.65;padding-top:8px;">
        Away until <strong style="color:${NAVY};">[Return date]</strong> with limited access to email.
        For urgent corridor or settlement matters, contact
        <strong style="color:${NAVY};">[Covering colleague]</strong> at
        ${linkHtml('[colleague@nubiago.com]', 'mailto:colleague@nubiago.com', COPPER)}.
      </div>
    </td>
  </tr>
  <tr>
    <td style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">
            <div style="${FONT}font-size:14px;font-weight:700;color:${NAVY};">${name}</div>
            <div style="${FONT}font-size:11px;color:${SLATE};padding-top:2px;">${company.jobTitle}</div>
          </td>
          <td valign="middle" align="right">${wordmarkHtml(88, 'primary', 'right')}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Director / board — vertical cascade with parent affiliation and dual rules.
 */
export function directorSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="border-collapse:collapse;${FONT}width:480px;max-width:100%;">
  <tr>
    <td align="left">
      ${wordmarkHtml(108, 'primary', 'left')}
    </td>
  </tr>
  <tr>
    <td style="padding:14px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td width="40" height="2" style="background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
          <td height="2" style="background-color:${RULE};font-size:0;line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="${FONT}padding:14px 0 0 0;">
      <div style="font-size:18px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;">${name}</div>
      <div style="font-size:12px;color:${SLATE};padding-top:6px;">${company.jobTitle}</div>
      <div style="font-size:11px;color:${MUTED};padding-top:2px;">Director · ${company.parent}</div>
    </td>
  </tr>
  <tr>
    <td style="${FONT}padding:14px 0 0 0;font-size:12px;line-height:1.75;color:${SLATE};">
      ${linkHtml(company.email, `mailto:${company.email}`, NAVY)}<br />
      ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, NAVY)}<br />
      ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, NAVY)}
      ${location ? `<br />${location}` : ''}
    </td>
  </tr>
  <tr>
    <td style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:${RULE};font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
      <div style="${FONT}padding-top:10px;font-size:10px;color:${MUTED};line-height:1.55;">
        ${company.legalName} · ${company.registration} · ${company.taxId}
      </div>
    </td>
  </tr>
</table>`.trim();
}

/**
 * Partner success — horizontal three-cell: mark | name | contact stack.
 */
export function partnerSignatureHtml(company: CompanyInfo = defaultCompany) {
  const partners = `partners@${domain(company)}`;

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="border-collapse:collapse;${FONT}width:560px;max-width:100%;">
  <tr>
    <td valign="middle" width="120" style="padding:0 16px 0 0;">
      ${wordmarkHtml(108, 'primary', 'left')}
    </td>
    <td valign="middle" width="1" style="background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="middle" style="padding:0 18px;">
      <div style="${FONT}font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};">Partners</div>
      <div style="${FONT}font-size:14px;font-weight:700;color:${NAVY};padding-top:4px;">Partner Success</div>
      <div style="${FONT}font-size:11px;color:${SLATE};padding-top:2px;">Merchant &amp; logistics channels</div>
    </td>
    <td valign="middle" style="${FONT}font-size:12px;line-height:1.7;color:${SLATE};white-space:nowrap;">
      ${linkHtml(partners, `mailto:${partners}`, COPPER)}<br />
      ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, SLATE)}<br />
      ${linkHtml(`${company.website}/partners`, `${company.websiteUrl}/partners`, SLATE)}
    </td>
  </tr>
</table>`.trim();
}

export const enterpriseSignatureCatalog: Array<{
  id: string;
  title: string;
  fileName: string;
  description: string;
  html: (company?: CompanyInfo) => string;
  artboard: 'signature' | 'signatureCompact' | 'signatureExecutive';
}> = [
  {
    id: 'corridor',
    title: 'Corridor Lead Signature',
    fileName: 'NubiaGo_Signature_Corridor',
    description: 'Navy left rail · labelled field rows · mark under contacts — for relationship managers.',
    html: photoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance Signature',
    fileName: 'NubiaGo_Signature_Legal',
    description: 'Stacked formal layout with sand privilege banner — not the two-column lockup.',
    html: legalSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'support',
    title: 'Support Desk Signature',
    fileName: 'NubiaGo_Signature_Support',
    description: 'Navy header band + sand panel — shared desk voice with case ID placeholder.',
    html: supportSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'press',
    title: 'Press & Media Signature',
    fileName: 'NubiaGo_Signature_Press',
    description: 'Inverted lockup: wordmark left, gold divider, identity and press@ on the right.',
    html: pressSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'bilingual',
    title: 'Bilingual EN / FR Signature',
    fileName: 'NubiaGo_Signature_Bilingual',
    description: 'Shared name header with EN | FR mission columns for Francophone corridors.',
    html: bilingualSignatureHtml,
    artboard: 'signatureExecutive'
  },
  {
    id: 'mono',
    title: 'Mono Print-Safe Signature',
    fileName: 'NubiaGo_Signature_Mono',
    description: 'Single-column black-ink stack for PDF and print — no copper, no navy fill.',
    html: monoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'team',
    title: 'Enterprise Sales Signature',
    fileName: 'NubiaGo_Signature_Team',
    description: 'Full navy identity band with white wordmark — shared sales@ desk, not a personal lockup.',
    html: teamSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'ooo',
    title: 'Out-of-Office Signature',
    fileName: 'NubiaGo_Signature_OutOfOffice',
    description: 'Notice-first sand callout, then a minimal name + mark row underneath.',
    html: outOfOfficeSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'director',
    title: 'Director / Board Signature',
    fileName: 'NubiaGo_Signature_Director',
    description: 'Vertical cascade with gold/rule accent and dual affiliation under the name.',
    html: directorSignatureHtml,
    artboard: 'signatureExecutive'
  },
  {
    id: 'partner',
    title: 'Partner Success Signature',
    fileName: 'NubiaGo_Signature_Partner',
    description: 'Three-cell horizontal: mark · role · contact stack with gold divider.',
    html: partnerSignatureHtml,
    artboard: 'signatureCompact'
  }
];
