import { company as fallbackCompany, type CompanyInfo } from '@/data/brand';

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NAVY = '#1E3A5F';
const GOLD = '#C9A227';
const SAND = '#F5F0E8';
const INK = '#1A1A1A';
const GRAY = '#404040';
const MUTED = '#737373';

function shell(title: string, body: string, c: CompanyInfo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#FFFFFF;">
${body}
<tr><td style="padding:20px 32px;background:${NAVY};">
  <p style="margin:0;font-size:11px;line-height:1.6;color:rgba(250,250,250,0.55);font-family:Arial,Helvetica,sans-serif;">
    ${esc(c.legalName)} · ${esc(c.endorsement)}<br />
    <a href="${esc(c.websiteUrl)}" style="color:${GOLD};text-decoration:none;">${esc(c.website)}</a>
    · You received this because you work with NubiaGo.
    <a href="#" style="color:rgba(250,250,250,0.55);">Unsubscribe</a>
  </p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/** 1 — Announcement / company news */
export function htmlEmailAnnounce(c: CompanyInfo = fallbackCompany) {
  const body = `
<tr><td style="background:${NAVY};padding:28px 32px;">
  <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FAFAFA;font-family:Arial,Helvetica,sans-serif;">nubiago</p>
  <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-family:Arial,Helvetica,sans-serif;">Announcement</p>
</td></tr>
<tr><td style="padding:32px;">
  <h1 style="margin:0;font-size:26px;line-height:1.25;font-weight:700;color:${INK};font-family:Arial,Helvetica,sans-serif;">
    Settlement coverage extended to four new markets
  </h1>
  <p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:${GRAY};font-family:Arial,Helvetica,sans-serif;">
    Next-day local-currency settlement is now live in Ghana, Kenya, Côte d’Ivoire and Senegal — with reconciliation handled end to end.
  </p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
  <tr><td style="background:${NAVY};padding:12px 20px;">
    <a href="${esc(c.websiteUrl)}" style="font-size:13px;font-weight:600;color:#FAFAFA;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Read the update</a>
  </td></tr>
  </table>
</td></tr>`;
  return shell('NubiaGo — Announcement', body, c);
}

/** 2 — Event invite */
export function htmlEmailInvite(c: CompanyInfo = fallbackCompany) {
  const body = `
<tr><td style="background:${SAND};padding:28px 32px;">
  <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.04em;color:${NAVY};font-family:Arial,Helvetica,sans-serif;">nubiago</p>
  <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">Invite</p>
</td></tr>
<tr><td style="padding:32px;">
  <h1 style="margin:0;font-size:24px;line-height:1.25;font-weight:700;color:${INK};font-family:Arial,Helvetica,sans-serif;">
    Cross-border settlement in practice
  </h1>
  <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:${GRAY};font-family:Arial,Helvetica,sans-serif;">
    A working session for treasury and procurement teams operating across African markets.
  </p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;border-top:1px solid #E5E5E5;">
  ${[
    ['Date', '28 January 2025'],
    ['Time', '10:00 – 12:00 WAT'],
    ['Format', 'In person · Lagos'],
    ['Register', `${c.website}/events`]
  ]
    .map(
      ([k, v]) => `<tr>
    <td style="padding:10px 0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:${MUTED};font-family:Arial,Helvetica,sans-serif;width:100px;">${k}</td>
    <td style="padding:10px 0;font-size:14px;color:${INK};font-family:Arial,Helvetica,sans-serif;">${esc(v)}</td>
  </tr>`
    )
    .join('')}
  </table>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;">
  <tr><td style="background:${NAVY};padding:12px 20px;">
    <a href="${esc(c.websiteUrl)}/events" style="font-size:13px;font-weight:600;color:#FAFAFA;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Reserve a seat</a>
  </td></tr>
  </table>
</td></tr>`;
  return shell('NubiaGo — Event invite', body, c);
}

/** 3 — Quarterly digest */
export function htmlEmailDigest(c: CompanyInfo = fallbackCompany) {
  const items = [
    ['Markets', 'Four new corridors live with T+1 settlement.'],
    ['Platform', 'ISO 20022 reconciliation available by default.'],
    ['Network', '18,400 active merchants at 99.95% uptime.']
  ];
  const body = `
<tr><td style="background:${NAVY};padding:28px 32px;">
  <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.04em;color:#FAFAFA;font-family:Arial,Helvetica,sans-serif;">nubiago</p>
  <p style="margin:8px 0 0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};font-family:Arial,Helvetica,sans-serif;">Quarterly digest · Q4</p>
</td></tr>
<tr><td style="padding:32px;">
  <h1 style="margin:0;font-size:24px;font-weight:700;color:${INK};font-family:Arial,Helvetica,sans-serif;">What shipped this quarter</h1>
  <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:${GRAY};font-family:Arial,Helvetica,sans-serif;">
    A short briefing for partners and merchants — no noise, three facts.
  </p>
  ${items
    .map(
      ([t, b]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid #E5E5E5;">
  <tr><td style="padding-top:16px;">
    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${NAVY};font-family:Arial,Helvetica,sans-serif;">${t}</p>
    <p style="margin:6px 0 0;font-size:14px;line-height:1.65;color:${GRAY};font-family:Arial,Helvetica,sans-serif;">${b}</p>
  </td></tr>
  </table>`
    )
    .join('')}
</td></tr>`;
  return shell('NubiaGo — Quarterly digest', body, c);
}

/** 4 — Transactional receipt / statement ready */
export function htmlEmailReceipt(c: CompanyInfo = fallbackCompany) {
  const body = `
<tr><td style="background:${NAVY};padding:24px 32px;">
  <p style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.04em;color:#FAFAFA;font-family:Arial,Helvetica,sans-serif;">nubiago</p>
</td></tr>
<tr><td style="padding:32px;">
  <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">Statement ready</p>
  <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:${INK};font-family:Arial,Helvetica,sans-serif;">
    Your December statement is available
  </h1>
  <p style="margin:14px 0 0;font-size:14px;line-height:1.7;color:${GRAY};font-family:Arial,Helvetica,sans-serif;">
    Secure download expires in 7 days. If you did not request this, contact support immediately.
  </p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:${SAND};">
  <tr><td style="padding:16px 20px;">
    <p style="margin:0;font-size:12px;color:${MUTED};font-family:Arial,Helvetica,sans-serif;">Reference</p>
    <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:${INK};font-family:Arial,Helvetica,sans-serif;">STMT-2024-12-8841</p>
  </td></tr>
  </table>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
  <tr><td style="background:${NAVY};padding:12px 20px;">
    <a href="${esc(c.websiteUrl)}" style="font-size:13px;font-weight:600;color:#FAFAFA;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Download statement</a>
  </td></tr>
  </table>
</td></tr>`;
  return shell('NubiaGo — Statement ready', body, c);
}

export const htmlEmailCatalog = [
  {
    id: 'announce',
    title: 'HTML Email — Announcement',
    fileName: 'NubiaGo_Email_HTML_Announce',
    description: 'Outlook-safe table layout for company news with CTA.',
    build: htmlEmailAnnounce
  },
  {
    id: 'invite',
    title: 'HTML Email — Event Invite',
    fileName: 'NubiaGo_Email_HTML_Invite',
    description: 'Invite with labelled date / time / format block.',
    build: htmlEmailInvite
  },
  {
    id: 'digest',
    title: 'HTML Email — Quarterly Digest',
    fileName: 'NubiaGo_Email_HTML_Digest',
    description: 'Three-fact partner digest — markets, platform, network.',
    build: htmlEmailDigest
  },
  {
    id: 'receipt',
    title: 'HTML Email — Statement Ready',
    fileName: 'NubiaGo_Email_HTML_Receipt',
    description: 'Transactional notice with reference and secure download CTA.',
    build: htmlEmailReceipt
  }
] as const;

export const emailClientNotes: [string, string][] = [
  ['Outlook (Windows)', 'Use nested tables only — no flex/grid. Test with Word rendering engine.'],
  ['Outlook.com / new Outlook', 'Prefer inline styles; avoid margin on <p> collapsing oddly.'],
  ['Gmail', 'Clips large messages; keep under ~102 KB. Web fonts often stripped — Arial stack is intentional.'],
  ['Apple Mail', 'Most faithful; still inline all colours. Dark Mode may invert — keep navy headers solid.'],
  ['Mobile', '600 px max width; CTA buttons ≥ 44 px tall hit target.'],
  ['Images', 'Always set width attributes; host banners on HTTPS CDN; provide alt text.']
];
