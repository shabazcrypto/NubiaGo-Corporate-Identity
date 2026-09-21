import { company } from '../data/brand';

const FONT = "font-family:Inter,Arial,Helvetica,sans-serif;";
const PRIMARY = '#1E3A5F';
const GOLD = '#C9A227';
const GRAY500 = '#737373';
const GRAY200 = '#E5E5E5';
const INK = '#1A1A1A';
const MAILTO = `mailto:${company.email}`;

const wordmark = (size: number, color: string) =>
`<span style="${FONT}font-size:${size}px;font-weight:800;letter-spacing:-0.035em;color:${color};line-height:1;">nubiago</span>`;

/** A single hairline. The identity is carried by type and space, not ornament. */
const rule = (width: number, color = PRIMARY) =>
`<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" style="border-collapse:collapse;"><tr>` +
`<td width="${width}" height="2" style="background-color:${color};font-size:0;line-height:0;">&nbsp;</td>` +
`</tr></table>`;

const link = (label: string, href: string, color = GRAY500) =>
`<a href="${href}" style="${FONT}color:${color};text-decoration:none;">${label}</a>`;

/** Standard corporate signature — the default for all employees. */
export const standardSignatureHtml = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${FONT}">
  <tr>
    <td style="padding:0 0 12px 0;">${wordmark(20, PRIMARY)}</td>
  </tr>
  <tr>
    <td style="padding:0 0 12px 0;">${rule(64)}</td>
  </tr>
  <tr>
    <td style="${FONT}font-size:14px;font-weight:600;color:${INK};padding:0 0 2px 0;">[NAME SURNAME]</td>
  </tr>
  <tr>
    <td style="${FONT}font-size:12px;color:${GRAY500};padding:0 0 12px 0;">[JOB TITLE] &middot; NubiaGo</td>
  </tr>
  <tr>
    <td style="${FONT}font-size:12px;color:${GRAY500};line-height:1.7;">
      T ${link('[Phone]', 'tel:+2340000000000')}<br />
      E ${link(company.email, MAILTO)}<br />
      W ${link(company.website, company.websiteUrl, PRIMARY)}<br />
      A [Street address], ${company.addressLine2}, ${company.country}
    </td>
  </tr>
  <tr>
    <td style="padding:12px 0 0 0;border-top:1px solid ${GRAY200};${FONT}font-size:10px;color:#A3A3A3;line-height:1.6;">
      ${company.endorsement} This message and any attachments are confidential and intended solely for the addressee.
    </td>
  </tr>
</table>`.trim();

/** Compact signature — replies and short internal threads. */
export const compactSignatureHtml = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;${FONT}">
  <tr>
    <td valign="middle" style="padding:0 14px 0 0;border-right:1px solid ${GRAY200};">
      ${wordmark(16, PRIMARY)}
    </td>
    <td valign="top" style="padding:0 0 0 14px;${FONT}font-size:12px;color:${GRAY500};line-height:1.6;">
      <span style="font-size:13px;font-weight:600;color:${INK};">[NAME SURNAME]</span><br />
      [JOB TITLE] &middot; NubiaGo<br />
      [Phone] &middot; ${link(company.email, MAILTO)} &middot; ${link(company.website, company.websiteUrl, PRIMARY)}<br />
      <span style="font-size:10px;color:#A3A3A3;">${company.endorsement}</span>
    </td>
  </tr>
</table>`.trim();

/** Executive / sales signature — external and international correspondence. */
export const executiveSignatureHtml = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="540" style="border-collapse:collapse;${FONT}width:540px;">
  <tr>
    <td style="background-color:${PRIMARY};padding:18px 20px;">
      ${wordmark(20, '#FAFAFA')}
    </td>
  </tr>
  <tr>
    <td style="padding:0;">${rule(540, GOLD)}</td>
  </tr>
  <tr>
    <td style="padding:16px 20px;border:1px solid ${GRAY200};border-top:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td valign="top" style="${FONT}padding-right:20px;">
            <div style="font-size:15px;font-weight:600;color:${INK};padding-bottom:2px;">[NAME SURNAME]</div>
            <div style="font-size:12px;color:${GRAY500};padding-bottom:12px;">[JOB TITLE]</div>
            <div style="font-size:12px;color:${GRAY500};line-height:1.8;">
              T ${link('[Phone]', 'tel:+2340000000000')}<br />
              E ${link(company.email, MAILTO)}<br />
              W ${link(company.website, company.websiteUrl, PRIMARY)}<br />
              A [Street address], ${company.addressLine2}, ${company.country}
            </div>
          </td>
          <td valign="top" width="150" style="${FONT}border-left:1px solid ${GRAY200};padding-left:20px;font-size:11px;color:${GRAY500};line-height:1.8;">
            <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:${PRIMARY};font-weight:600;padding-bottom:6px;">
              Connect
            </div>
            ${link('LinkedIn', 'https://' + company.linkedin)}<br />
            ${link('Company profile', company.websiteUrl)}<br />
            ${link('Book a meeting', company.websiteUrl)}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="${FONT}padding:10px 20px;background-color:#FAFAFA;border:1px solid ${GRAY200};border-top:0;font-size:10px;color:#A3A3A3;line-height:1.6;">
      ${company.legalName} &middot; ${company.registration} &middot; ${company.taxId}<br />
      ${company.endorsement} This message and any attachments are confidential and intended solely for the addressee.
    </td>
  </tr>
</table>`.trim();

export function wrapAsEmailDocument(body: string, title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:24px;background:#ffffff;">
${body}
  </body>
</html>`;
}