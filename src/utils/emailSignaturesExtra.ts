import type { CompanyInfo } from '@/data/brand';
import { defaultCompany } from '@/data/brand';
import {
  formatLocation,
  displayPersonName,
  wordmarkHtml,
  linkHtml,
  sigPalette,
  sigName,
  sigTitle,
  sigRule,
  sigFooter,
  sigContactStack,
  sigShell,
  FONT
} from './emailSignatures';

function domain(company: CompanyInfo) {
  return company.website.replace(/^www\./, '').replace(/^https?:\/\//, '');
}

/**
 * Corridor Lead — Layout #2: Primary rail + labelled contact stack.
 */
export function photoSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const lines = [
    { label: 'Email', value: company.email, href: `mailto:${company.email}` },
    { label: 'Phone', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      label: 'Web',
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    },
    ...(location ? [{ label: 'Base', value: location }] : [])
  ];

  return sigShell(
    520,
    `
  <tr>
    <td width="3" style="background-color:${p.accent};font-size:0;line-height:0;width:3px;">&nbsp;</td>
    <td style="padding:0 0 0 16px;">
      ${sigName(name, p.ink, 17)}
      ${sigTitle('Corridor Lead', p.contact)}
      <div style="padding-top:12px;">
        ${sigContactStack(lines, { label: p.muted, value: p.contact }, 'labelled')}
      </div>
      <div style="padding-top:16px;">${wordmarkHtml(96, p.markTone, 'left', company)}</div>
    </td>
  </tr>`
  );
}

/**
 * Legal — Layout #4: mark · rule · name · title · contacts · privilege line.
 */
export function legalSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const legal = `legal@${domain(company)}`;
  const name = displayPersonName(company.personName);
  const lines = [
    { value: legal, href: `mailto:${legal}` },
    { value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    }
  ];

  return sigShell(
    500,
    `
  <tr>
    <td style="padding:0 0 12px 0;">${wordmarkHtml(100, p.markTone, 'left', company)}</td>
  </tr>
  <tr>
    <td>${sigRule(p.rule)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;">
      ${sigName(name, p.ink, 16)}
      ${sigTitle('Legal &amp; Compliance', p.contact)}
      <div style="padding-top:12px;">
        ${sigContactStack(lines, { label: p.muted, value: p.contact }, 'plain')}
      </div>
      <div style="padding-top:16px;">
        ${sigFooter(
          `Privileged &amp; confidential — for the named recipient only. ${company.legalName} · ${company.registration}`,
          p.muted
        )}
      </div>
    </td>
  </tr>`
  );
}

/**
 * Support desk — Layout #8: thin Primary top rule · desk identity · contacts.
 */
export function supportSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const support = `support@${domain(company)}`;
  const lines = [
    { value: support, href: `mailto:${support}` },
    { value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    }
  ];

  return sigShell(
    480,
    `
  <tr>
    <td>${sigRule(p.accent, 2)}</td>
  </tr>
  <tr>
    <td style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">${wordmarkHtml(88, p.markTone, 'left', company)}</td>
          <td valign="middle" align="right" style="${FONT}font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${p.muted};">
            Support
          </td>
        </tr>
      </table>
      <div style="padding-top:12px;">
        ${sigName(`${company.name} Support`, p.ink, 15)}
        ${sigTitle('Mon–Fri 08:00–18:00 WAT · Case ID: [CASE-XXXX]', p.contact)}
      </div>
      <div style="padding-top:12px;">
        ${sigContactStack(lines, { label: p.muted, value: p.ink }, 'plain')}
      </div>
    </td>
  </tr>`
  );
}

/**
 * Press — Layout #5: mark left · vertical rule · identity right.
 */
export function pressSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const press = `press@${domain(company)}`;
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);

  return sigShell(
    540,
    `
  <tr>
    <td valign="top" width="140" style="padding:0 20px 0 0;">
      ${wordmarkHtml(112, p.markTone, 'left', company)}
      <div style="${FONT}font-size:11px;color:${p.muted};padding-top:8px;line-height:1.45;">Media relations</div>
    </td>
    <td valign="top" width="1" style="background-color:${p.rule};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="top" style="padding:0 0 0 20px;">
      ${sigName(name, p.ink, 16)}
      ${sigTitle(`${company.jobTitle} · Media Relations`, p.contact)}
      <div style="${FONT}font-size:12px;line-height:1.7;color:${p.contact};padding-top:12px;">
        ${linkHtml(press, `mailto:${press}`, p.ink)}<br />
        ${linkHtml(`${company.website}/press`, `${company.websiteUrl}/press`, p.contact)}
        ${location ? `<br />${location}` : ''}
      </div>
      <div style="padding-top:12px;">
        ${sigFooter('Embargo policy applies. Media kit on request.', p.muted)}
      </div>
    </td>
  </tr>`
  );
}

/**
 * Bilingual EN / FR — Layout #10: shared name · two mission columns · contacts.
 */
export function bilingualSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);

  return sigShell(
    560,
    `
  <tr>
    <td colspan="3" style="padding:0 0 12px 0;">
      ${sigName(name, p.ink, 17)}
      ${sigTitle(`${company.jobTitle} / Fondateur &amp; PDG`, p.contact)}
    </td>
  </tr>
  <tr>
    <td valign="top" width="48%" style="padding:0 16px 0 0;">
      <div style="${FONT}font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${p.muted};padding-bottom:8px;">EN</div>
      <div style="${FONT}font-size:12px;color:${p.contact};line-height:1.55;">${company.mission}</div>
    </td>
    <td width="1" style="background-color:${p.rule};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="top" width="48%" style="padding:0 0 0 16px;">
      <div style="${FONT}font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${p.muted};padding-bottom:8px;">FR</div>
      <div style="${FONT}font-size:12px;color:${p.contact};line-height:1.55;">Construire l&rsquo;infrastructure du commerce transfrontalier pour les ménages et entreprises africains.</div>
    </td>
  </tr>
  <tr>
    <td colspan="3" style="padding:16px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">${wordmarkHtml(90, p.markTone, 'left', company)}</td>
          <td valign="middle" align="right" style="${FONT}font-size:12px;color:${p.contact};">
            ${linkHtml(company.email, `mailto:${company.email}`, p.contact)}
            &nbsp;·&nbsp;
            ${linkHtml(company.website.replace(/^https?:\/\//, ''), company.websiteUrl, p.contact)}
          </td>
        </tr>
      </table>
    </td>
  </tr>`
  );
}

/**
 * Mono print-safe — Layout #4: black-ink stack only.
 */
export function monoSignatureHtml(company: CompanyInfo = defaultCompany) {
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const ink = '#1A1A1A';
  const gray = '#525252';

  return sigShell(
    420,
    `
  <tr>
    <td>
      ${wordmarkHtml(100, 'black', 'left', company)}
      <div style="padding-top:12px;">${sigName(name, ink, 15)}</div>
      ${sigTitle(company.jobTitle, gray)}
      <div style="padding-top:12px;">${sigRule(ink, 2)}</div>
      <div style="${FONT}font-size:12px;line-height:1.75;color:${gray};padding-top:12px;">
        ${company.email}<br />
        ${company.website}
        ${location ? `<br />${location}` : ''}
      </div>
      <div style="padding-top:12px;">${sigFooter(company.mission, gray)}</div>
    </td>
  </tr>`
  );
}

/**
 * Enterprise sales — Layout #8: narrow Primary strip + white field (single accent).
 */
export function teamSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const sales = `sales@${domain(company)}`;
  const lines = [
    { value: sales, href: `mailto:${sales}` },
    { value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    }
  ];

  return sigShell(
    520,
    `
  <tr>
    <td style="background-color:${p.accent};padding:12px 20px;">
      ${wordmarkHtml(100, p.markOnAccent, 'left', company)}
    </td>
  </tr>
  <tr>
    <td style="padding:16px 20px 0 20px;">
      ${sigName(`${company.name} Enterprise Sales`, p.ink, 15)}
      ${sigTitle('Shared desk · response within one business day', p.contact)}
      <div style="padding-top:12px;">
        ${sigContactStack(lines, { label: p.muted, value: p.ink }, 'plain')}
      </div>
      <div style="padding:16px 0 0 0;">${sigRule(p.rule)}</div>
    </td>
  </tr>`
  );
}

/**
 * Out of office — Layout #9: notice · rule · mini identity.
 */
export function outOfOfficeSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);
  const coverEmail = `colleague@${domain(company)}`;

  return sigShell(
    520,
    `
  <tr>
    <td style="padding:0 0 12px 0;">
      <div style="${FONT}font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${p.muted};">Out of office</div>
      <div style="${FONT}font-size:12px;color:${p.contact};line-height:1.65;padding-top:8px;">
        Away until <strong style="color:${p.ink};font-weight:600;">[Return date]</strong> with limited access to email.
        For urgent matters, contact
        <strong style="color:${p.ink};font-weight:600;">[Covering colleague]</strong>
        (${linkHtml(coverEmail, `mailto:${coverEmail}`, p.ink)}).
      </div>
    </td>
  </tr>
  <tr>
    <td>${sigRule(p.rule)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="middle">
            ${sigName(name, p.ink, 14)}
            ${sigTitle(company.jobTitle, p.contact)}
          </td>
          <td valign="middle" align="right">${wordmarkHtml(88, p.markTone, 'right', company)}</td>
        </tr>
      </table>
    </td>
  </tr>`
  );
}

/**
 * Director — Layout #7 variant: cascade · dual affiliation · contacts · legal.
 */
export function directorSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const name = displayPersonName(company.personName);
  const location = formatLocation(company);
  const lines = [
    { value: company.email, href: `mailto:${company.email}` },
    { value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    {
      value: company.website.replace(/^https?:\/\//, ''),
      href: company.websiteUrl
    },
    ...(location ? [{ value: location }] : [])
  ];

  return sigShell(
    480,
    `
  <tr>
    <td>${wordmarkHtml(100, p.markTone, 'left', company)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;">${sigRule(p.accent, 2)}</td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;">
      ${sigName(name, p.ink, 17)}
      ${sigTitle(company.jobTitle, p.contact)}
      <div style="${FONT}font-size:11px;color:${p.muted};padding-top:2px;">Director · ${company.parent}</div>
      <div style="padding-top:12px;">
        ${sigContactStack(lines, { label: p.muted, value: p.contact }, 'plain')}
      </div>
      <div style="padding-top:16px;">${sigRule(p.rule)}</div>
      <div style="padding-top:12px;">
        ${sigFooter(`${company.legalName} · ${company.registration} · ${company.taxId}`, p.muted)}
      </div>
    </td>
  </tr>`
  );
}

/**
 * Partner — Layout #6: three cells mark | role | contacts.
 */
export function partnerSignatureHtml(company: CompanyInfo = defaultCompany) {
  const p = sigPalette(company);
  const partners = `partners@${domain(company)}`;

  return sigShell(
    560,
    `
  <tr>
    <td valign="middle" width="120" style="padding:0 16px 0 0;">
      ${wordmarkHtml(100, p.markTone, 'left', company)}
    </td>
    <td valign="middle" width="1" style="background-color:${p.rule};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="middle" style="padding:0 16px;">
      <div style="${FONT}font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${p.muted};">Partners</div>
      <div style="padding-top:4px;">${sigName('Partner Success', p.ink, 14)}</div>
      ${sigTitle('Merchant &amp; logistics channels', p.contact)}
    </td>
    <td valign="middle" width="1" style="background-color:${p.rule};font-size:0;line-height:0;">&nbsp;</td>
    <td valign="middle" style="${FONT}padding:0 0 0 16px;font-size:12px;line-height:1.7;color:${p.contact};white-space:nowrap;">
      ${linkHtml(partners, `mailto:${partners}`, p.ink)}<br />
      ${linkHtml(company.phone, `tel:${company.phone.replace(/\s/g, '')}`, p.contact)}<br />
      ${linkHtml(`${company.website}/partners`, `${company.websiteUrl}/partners`, p.contact)}
    </td>
  </tr>`
  );
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
    fileName: 'Signature_Corridor',
    description: 'Primary left rail · labelled contacts · mark under stack — relationship managers.',
    html: photoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'legal',
    title: 'Legal & Compliance Signature',
    fileName: 'Signature_Legal',
    description: 'Single-column formal stack with muted privilege line — no filled banners.',
    html: legalSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'support',
    title: 'Support Desk Signature',
    fileName: 'Signature_Support',
    description: 'Thin Primary rule · shared desk identity · case ID placeholder.',
    html: supportSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'press',
    title: 'Press & Media Signature',
    fileName: 'Signature_Press',
    description: 'Mark left · hairline · identity and press@ on the right.',
    html: pressSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'bilingual',
    title: 'Bilingual EN / FR Signature',
    fileName: 'Signature_Bilingual',
    description: 'Shared name · EN | FR mission columns · one contact row.',
    html: bilingualSignatureHtml,
    artboard: 'signatureExecutive'
  },
  {
    id: 'mono',
    title: 'Mono Print-Safe Signature',
    fileName: 'Signature_Mono',
    description: 'Black-ink single column for PDF and print — no colour fills.',
    html: monoSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'team',
    title: 'Enterprise Sales Signature',
    fileName: 'Signature_Team',
    description: 'Narrow Primary mark strip · white desk field · sales@ contacts.',
    html: teamSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'ooo',
    title: 'Out-of-Office Signature',
    fileName: 'Signature_OutOfOffice',
    description: 'Notice first · hairline · minimal name and mark row.',
    html: outOfOfficeSignatureHtml,
    artboard: 'signature'
  },
  {
    id: 'director',
    title: 'Director / Board Signature',
    fileName: 'Signature_Director',
    description: 'Cascade with dual affiliation · contacts · legal footer.',
    html: directorSignatureHtml,
    artboard: 'signatureExecutive'
  },
  {
    id: 'partner',
    title: 'Partner Success Signature',
    fileName: 'Signature_Partner',
    description: 'Three-cell horizontal: mark · role · contacts with hairline dividers.',
    html: partnerSignatureHtml,
    artboard: 'signatureCompact'
  }
];
