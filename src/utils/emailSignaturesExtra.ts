import type { CompanyInfo } from '@/data/brand';
import { defaultCompany } from '@/data/brand';
import {
  signatureLayoutHtml,
  type ContactLine,
  formatLocation,
  displayPersonName,
  wordmarkHtml,
  linkHtml,
  signatureTokens
} from './emailSignatures';

const { FONT, NAVY, SLATE, MUTED, RULE } = signatureTokens;

function domain(company: CompanyInfo) {
  return company.website.replace(/^www\./, '').replace(/^https?:\/\//, '');
}

/** 04 — Corridor lead signature (export name kept for compat). */
export function photoSignatureHtml(company: CompanyInfo = defaultCompany) {
  return signatureLayoutHtml(company, {
    title: 'Corridor Lead · West Africa',
    contacts: [
      { label: 'E', value: company.email, href: `mailto:${company.email}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: company.mission,
    markSize: 128
  });
}

/** 05 — Legal counsel — same lockup, privilege footer. */
export function legalSignatureHtml(company: CompanyInfo = defaultCompany) {
  const legal = `legal@${domain(company)}`;
  return signatureLayoutHtml(company, {
    title: 'Legal & Compliance',
    contacts: [
      { label: 'E', value: legal, href: `mailto:${legal}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `<span style="color:${SLATE};">Privileged and confidential — for the named recipient only. ${company.legalName} · ${company.registration}</span>`,
    markSize: 128
  });
}

/** 06 — Merchant support desk. */
export function supportSignatureHtml(company: CompanyInfo = defaultCompany) {
  const support = `support@${domain(company)}`;
  return signatureLayoutHtml(company, {
    name: 'NubiaGo Support',
    title: 'Merchant Success',
    contacts: [
      { label: 'E', value: support, href: `mailto:${support}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `Mon–Fri 08:00–18:00 WAT · Case ID: [CASE-XXXX] · ${company.mission}`,
    markSize: 128
  });
}

/** 07 — Press / media. */
export function pressSignatureHtml(company: CompanyInfo = defaultCompany) {
  const press = `press@${domain(company)}`;
  return signatureLayoutHtml(company, {
    title: `${company.jobTitle} · Media Relations`,
    contacts: [
      { label: 'E', value: press, href: `mailto:${press}` },
      { label: 'W', value: `${company.website}/press`, href: `${company.websiteUrl}/press` },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `Embargo policy applies. Media kit on request. ${company.mission}`,
    markSize: 128
  });
}

/** 08 — Bilingual EN / FR for West Africa corridors. */
export function bilingualSignatureHtml(company: CompanyInfo = defaultCompany) {
  return signatureLayoutHtml(company, {
    title: `${company.jobTitle} / Fondateur &amp; PDG`,
    tagline: 'Relier l&rsquo;Afrique par le commerce et la logistique',
    contacts: [
      { label: 'E', value: company.email, href: `mailto:${company.email}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `${company.mission}<br />Construire l&rsquo;infrastructure du commerce transfrontalier pour les ménages et entreprises africains.`,
    markSize: 128
  });
}

/** 09 — Mono / fax / print — same structure, ink only. */
export function monoSignatureHtml(company: CompanyInfo = defaultCompany) {
  const ink = '#1A1A1A';
  const gray = '#525252';
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="border-collapse:collapse;${FONT}width:560px;">
  <tr>
    <td valign="top" style="padding:0 28px 0 0;">
      <div style="${FONT}font-size:18px;font-weight:700;color:${ink};letter-spacing:-0.02em;">${name}</div>
      <div style="${FONT}font-size:13px;color:${gray};padding:6px 0 14px 0;">${company.jobTitle}</div>
      <div style="${FONT}font-size:12px;line-height:1.55;color:${gray};">
        <strong style="color:${ink};">E:</strong> ${company.email}<br />
        <strong style="color:${ink};">W:</strong> ${company.website}<br />
        ${location ? `<strong style="color:${ink};">A:</strong> ${location}` : ''}
      </div>
    </td>
    <td valign="top" align="right" width="180">
      ${wordmarkHtml(128, 'black')}
      <div style="${FONT}font-size:11px;font-style:italic;color:${gray};line-height:1.45;padding-top:8px;max-width:170px;margin-left:auto;text-align:right;">
        ${company.tagline}
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:18px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:#D4D4D4;font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="${FONT}padding:12px 0 0 0;font-size:11px;color:${gray};line-height:1.55;">${company.mission}</td>
  </tr>
</table>`.trim();
}

/** 10 — Shared sales desk — named company voice, not a banner ad. */
export function teamSignatureHtml(company: CompanyInfo = defaultCompany) {
  const sales = `sales@${domain(company)}`;
  return signatureLayoutHtml(company, {
    name: 'NubiaGo Enterprise Sales',
    title: 'Enterprise Sales · Cross-border settlement',
    contacts: [
      { label: 'E', value: sales, href: `mailto:${sales}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `Response within one business day · ${company.mission}`,
    markSize: 128
  });
}

/** 11 — Out of office — preserves lockup; notice replaces contacts density. */
export function outOfOfficeSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="border-collapse:collapse;${FONT}width:560px;">
  <tr>
    <td valign="top" style="padding:0 28px 0 0;">
      <div style="${FONT}font-size:18px;font-weight:700;color:${NAVY};letter-spacing:-0.02em;">${name}</div>
      <div style="${FONT}font-size:13px;color:${SLATE};padding:6px 0 12px 0;">${company.jobTitle}</div>
      <div style="${FONT}font-size:12px;color:${SLATE};line-height:1.65;max-width:320px;">
        Away until <strong style="color:${NAVY};">[Return date]</strong> with limited access to email.
        For urgent corridor or settlement matters, contact
        <strong style="color:${NAVY};">[Covering colleague]</strong> at
        ${linkHtml('[colleague@nubiago.com]', 'mailto:colleague@nubiago.com')}.
      </div>
    </td>
    <td valign="top" align="right" width="200" style="padding:2px 0 0 0;">
      ${wordmarkHtml(128, 'primary')}
      <div style="${FONT}font-size:11px;font-style:italic;color:${MUTED};line-height:1.45;padding-top:8px;max-width:190px;margin-left:auto;text-align:right;">
        ${company.tagline}
      </div>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding:18px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td height="1" style="background-color:${RULE};font-size:0;line-height:0;">&nbsp;</td></tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="${FONT}padding:12px 0 0 0;font-size:11px;color:${MUTED};line-height:1.55;">${company.mission}</td>
  </tr>
</table>`.trim();
}

/** 12 — Director with dual affiliation. */
export function directorSignatureHtml(company: CompanyInfo = defaultCompany) {
  return signatureLayoutHtml(company, {
    title: `${company.jobTitle}<br /><span style="font-weight:400;color:${SLATE};">Director · ${company.parent}</span>`,
    contacts: [
      { label: 'E', value: company.email, href: `mailto:${company.email}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: company.website, href: company.websiteUrl },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: `${company.mission}<br />${company.legalName} · ${company.registration} · ${company.taxId}`,
    width: 580,
    markSize: 128
  });
}

/** 13 — Partner success — same lockup, partners@ inbox. */
export function partnerSignatureHtml(company: CompanyInfo = defaultCompany) {
  const partners = `partners@${domain(company)}`;
  return signatureLayoutHtml(company, {
    title: 'Partner Success · Merchant &amp; logistics channels',
    contacts: [
      { label: 'E', value: partners, href: `mailto:${partners}` },
      { label: 'T', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
      { label: 'W', value: `${company.website}/partners`, href: `${company.websiteUrl}/partners` },
      { label: 'A', value: formatLocation(company) }
    ].filter((l) => Boolean(l.value)) as ContactLine[],
    footer: company.mission,
    markSize: 128
  });
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
    description: 'Approved lockup with phone for relationship and corridor managers.',
    html: photoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance Signature',
    fileName: 'NubiaGo_Signature_Legal',
    description: 'Same hierarchy with legal@ inbox and privilege notice in the footer.',
    html: legalSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'support',
    title: 'Support Desk Signature',
    fileName: 'NubiaGo_Signature_Support',
    description: 'Merchant success voice with case ID placeholder — no decorative panels.',
    html: supportSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'press',
    title: 'Press & Media Signature',
    fileName: 'NubiaGo_Signature_Press',
    description: 'press@ inbox and embargo line under the mission rule.',
    html: pressSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'bilingual',
    title: 'Bilingual EN / FR Signature',
    fileName: 'NubiaGo_Signature_Bilingual',
    description: 'French tagline and mission for Francophone West Africa corridors.',
    html: bilingualSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'mono',
    title: 'Mono Print-Safe Signature',
    fileName: 'NubiaGo_Signature_Mono',
    description: 'Identical structure in black ink for PDF and print chains.',
    html: monoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'team',
    title: 'Enterprise Sales Signature',
    fileName: 'NubiaGo_Signature_Team',
    description: 'Shared sales@ identity with one-business-day response commitment.',
    html: teamSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'ooo',
    title: 'Out-of-Office Signature',
    fileName: 'NubiaGo_Signature_OutOfOffice',
    description: 'Leave notice inside the approved two-column lockup.',
    html: outOfOfficeSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'director',
    title: 'Director / Board Signature',
    fileName: 'NubiaGo_Signature_Director',
    description: 'Dual affiliation with AshBak Industries and full legal footer.',
    html: directorSignatureHtml,
    artboard: 'signatureExecutive'
  },
  {
    id: 'partner',
    title: 'Partner Success Signature',
    fileName: 'NubiaGo_Signature_Partner',
    description: 'partners@ inbox and /partners path — lockup unchanged.',
    html: partnerSignatureHtml,
    artboard: 'signature'
  }
];
