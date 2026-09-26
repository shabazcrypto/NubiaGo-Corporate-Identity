import React, { useState } from 'react';
import { CopyIcon, CheckIcon, FileCode2Icon, ArrowRightIcon } from 'lucide-react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Button } from '@/components/ui/button';
import { Logo, BrandRule } from '../components/brand/Logo';
import { AB_STROKE, iconByKey } from '../components/brand/iconSystem';
import { useCompany, useBrandSettings } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { copyText, downloadText } from '../utils/exportAsset';
import {
  standardSignatureHtml,
  compactSignatureHtml,
  executiveSignatureHtml,
  wrapAsEmailDocument } from
'../utils/emailSignatures';
import { enterpriseSignatureCatalog } from '../utils/emailSignaturesExtra';
import { EmailBannerAnnounce, EmailBannerInvite, EmailBannerSystem } from '../components/email/EmailBanners';
import { htmlEmailCatalog, emailClientNotes } from '@/utils/htmlEmails';
import { ClientPreview } from '@/components/email/ClientPreview';

function HtmlActions({
  html,
  fileName,
  fullDocument = false
}: {
  html: string;
  fileName: string;
  /** When true, html is already a complete document — download as-is. */
  fullDocument?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={async () => {
          await copyText(html);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? (
          <CheckIcon className="text-state-success" strokeWidth={2} />
        ) : (
          <CopyIcon strokeWidth={1.5} />
        )}
        Copy HTML
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          downloadText(
            fullDocument ? html : wrapAsEmailDocument(html, fileName),
            `${fileName}.html`,
            'text/html'
          )
        }
      >
        <FileCode2Icon strokeWidth={1.5} />
        HTML
      </Button>
    </>
  );
}

function SignaturePreview({ html }: { html: string }) {
  return (
    <ClientPreview>
      <div className="box-border flex h-full w-full flex-col overflow-auto bg-white p-5 sm:p-6">
        <div className="mb-4 shrink-0 border-b border-gray-200 pb-3 text-[11px] leading-relaxed text-gray-500">
          <span className="font-medium text-gray-700">
            Re: Partnership terms — settlement across four markets
          </span>
          <br />
          …look forward to your comments on the enclosed quotation.
        </div>
        <div className="min-w-0" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </ClientPreview>
  );
}

const NEWSLETTER_WIDTH = 600;

function NewsletterBlock({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <div className="relative">
      <span className="absolute -left-[54px] top-0 hidden text-[8px] font-semibold uppercase tracking-[0.12em] text-gray-200">
        {label}
      </span>
      {children}
    </div>);
}

export function EmailPage() {
  const company = useCompany();
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  const prefix = isAshBak ? 'AshBak' : 'NubiaGo';

  const standardHtml = standardSignatureHtml(company);
  const compactHtml = compactSignatureHtml(company);
  const executiveHtml = executiveSignatureHtml(company);

  const MailIcon = iconByKey('email');
  const GlobeIcon = iconByKey('website');

  return (
    <>
      <PageHeader
        code="03"
        title="Email System"
        folder="03_EMAIL"
        description="Thirteen Outlook-safe HTML signatures on one restrained palette — Primary accent only, Arial stack, nested tables. Standard is the approved master; each role keeps a distinct layout."
        specs={['Client preview · Gmail / Outlook / Apple', 'HTML copy-paste', '≤560 px width']}
      />

      <GroupLabel note="Toggle Gmail · Outlook · Apple Mail chrome on each preview">
        Core signatures
      </GroupLabel>

      <AssetFrame
        title="Standard Corporate Signature"
        fileName={`${prefix}_Signature_Standard`}
        description="Two-column master — name, title and labelled contacts left; wordmark right; hairline; mission footer."
        artboard={formats.signature}
        htmlOnly
        actions={<HtmlActions html={standardHtml} fileName={`${prefix}_Signature_Standard`} />}
      >
        <SignaturePreview html={standardHtml} />
      </AssetFrame>

      <AssetFrame
        title="Compact Signature"
        fileName={`${prefix}_Signature_Compact`}
        description="Reply layout — mark beside name, 2px Primary rail, middot contact line. For mobile-heavy threads."
        artboard={formats.signatureCompact}
        htmlOnly
        actions={<HtmlActions html={compactHtml} fileName={`${prefix}_Signature_Compact`} />}
      >
        <SignaturePreview html={compactHtml} />
      </AssetFrame>

      <AssetFrame
        title="Executive / Sales Signature"
        fileName={`${prefix}_Signature_Executive`}
        description="Primary left rail · stacked identity · wordmark · link row · legal footer. No role eyebrow."
        artboard={formats.signatureExecutive}
        htmlOnly
        actions={<HtmlActions html={executiveHtml} fileName={`${prefix}_Signature_Executive`} />}
      >
        <SignaturePreview html={executiveHtml} />
      </AssetFrame>

      <GroupLabel note="Structurally distinct layouts — rail, desk band, cascade, bilingual split">Role variants</GroupLabel>
      {enterpriseSignatureCatalog.map((entry) => {
        const html = entry.html(company);
        const fileName = `${prefix}_${entry.fileName}`;
        return (
          <AssetFrame
            key={entry.id}
            title={entry.title}
            fileName={fileName}
            description={entry.description}
            artboard={formats[entry.artboard]}
            htmlOnly
            actions={<HtmlActions html={html} fileName={fileName} />}
          >
            <SignaturePreview html={html} />
          </AssetFrame>
        );
      })}

      <div className="mb-14 border-l-2 border-brand-gold bg-gray-50 px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Implementation.</strong> Copy the HTML and paste it into the
        signature editor, or import the downloaded <code className="text-[12px]">.html</code> file. Wordmarks are
        Outlook-safe text (Arial stack) — never paste a screenshot of a signature.
      </div>
      <GroupLabel note="Modular blocks · 600 px email column">Newsletter template</GroupLabel>
      <AssetFrame
        title="Email / Newsletter Master"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Newsletter_Master`}
        description="Header, title area, image area, content blocks, CTA and footer as independent modules. Blocks can be reordered or removed without breaking the grid."
        artboard={formats.newsletter}>
        
        <div style={{ width: NEWSLETTER_WIDTH }} className="bg-white">
          <NewsletterBlock label="Header">
            <div className="flex items-center justify-between bg-brand px-10 py-6">
              <Logo size={20} tone="light" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/60">
                Quarterly update · Q4 2024
              </span>
            </div>
            <BrandRule width="100%" thickness={2} tone="secondary" />
          </NewsletterBlock>

          <NewsletterBlock label="Title">
            <div className="px-10 pb-7 pt-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-light">
                Company news
              </div>
              <h1 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
                {isAshBak ? 'Industrial infrastructure expanded to four new markets' : 'Settlement coverage extended to four new markets'}
              </h1>
              <p className="mt-3 text-[13px] leading-[1.7] text-gray-700">
                {isAshBak ? 'Integrated commerce, payments, and logistics infrastructure is now live in Ghana, Kenya, Côte d\'Ivoire and Senegal.' : 'Next-day local-currency settlement is now live in Ghana, Kenya, Côte d\'Ivoire and Senegal, with reconciliation handled end to end.'}
              </p>
            </div>
          </NewsletterBlock>

          <NewsletterBlock label="Image">
            <div className="flex h-[220px] items-center justify-center bg-brand-sand px-10">
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500">
                Image area · 600 × 220 px
              </span>
            </div>
          </NewsletterBlock>

          <NewsletterBlock label="Content">
            <div className="grid grid-cols-2 gap-8 px-10 py-9">
              {[
                {
                  title: 'Next-day settlement',
                  body: 'Local-currency payouts clear the following business day, reconciled against your ledger automatically.'
                },
                {
                  title: 'Verified merchants',
                  body: 'Identity and compliance screening completed before a merchant is able to transact on the network.'
                }
              ].map((item) => (
                <div key={item.title}>
                  <div className="h-0.5 w-8 bg-brand-gold" />
                  <h2 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">{item.title}</h2>
                  <p className="mt-1.5 text-[12.5px] leading-[1.7] text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="mx-10 h-px bg-gray-200" />
            <div className="grid grid-cols-3 gap-6 px-10 py-8">
              {[
                ['18,400', 'Active merchants'],
                ['4', 'New markets'],
                ['99.95%', 'Settlement uptime']
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-[22px] font-bold tracking-[-0.02em] text-brand">{value}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </NewsletterBlock>

          <NewsletterBlock label="CTA">
            <div className="mx-10 mb-9 flex items-center justify-between bg-gray-50 px-7 py-6">
              <div>
                <div className="text-[14px] font-semibold text-ink">Read the market coverage note</div>
                <div className="mt-1 text-[12px] text-gray-500">Eight pages · PDF</div>
              </div>
              <span className="inline-flex items-center gap-2 bg-brand px-5 py-2.5 text-[12px] font-semibold text-white">
                Download
                <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={AB_STROKE} />
              </span>
            </div>
          </NewsletterBlock>

          <NewsletterBlock label="Footer">
            <div className="bg-brand px-10 py-8">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <Logo size={16} tone="light" />
                <span className="text-[10px] uppercase tracking-[0.12em] text-white/55">{company.endorsement}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/70">
                <span className="flex items-center gap-1.5">
                  <GlobeIcon className="h-3.5 w-3.5" strokeWidth={AB_STROKE} />
                  {company.website}
                </span>
                <span className="flex items-center gap-1.5">
                  <MailIcon className="h-3.5 w-3.5" strokeWidth={AB_STROKE} />
                  {company.email}
                </span>
              </div>
              <div className="mt-5 border-t border-white/15 pt-4 text-[10px] leading-[1.7] text-white/50">
                {company.legalName} · {company.addressLine1}, {company.addressLine2}, {company.country}
                <br />
                You are receiving this because you work with {company.name}. Unsubscribe · Manage preferences
              </div>
            </div>
          </NewsletterBlock>
        </div>
      </AssetFrame>
      <GroupLabel note="600 × 200 · ESP header strips">Email banners</GroupLabel>
      <AssetFrame
        title="Email Banner — Announcement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Email_Banner_Announce`}
        description="Photo-led 600×200 strip for campaign headers in any ESP."
        artboard={formats.emailBanner}
      >
        <EmailBannerAnnounce />
      </AssetFrame>
      <AssetFrame
        title="Email Banner — Invite"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Email_Banner_Invite`}
        description="Light Gray invite strip with date and registration path."
        artboard={formats.emailBanner}
      >
        <EmailBannerInvite />
      </AssetFrame>
      <AssetFrame
        title="Email Banner — System"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Email_Banner_System`}
        description="Transactional notice strip for statements and secure downloads."
        artboard={formats.emailBanner}
      >
        <EmailBannerSystem />
      </AssetFrame>

      <GroupLabel note="Full messages · nested tables · Arial stack · Outlook-safe">
        HTML email templates
      </GroupLabel>
      {htmlEmailCatalog.map((entry) => {
        const html = entry.build(company);
        const fileName = `${prefix}_${entry.fileName}`;
        return (
          <AssetFrame
            key={entry.id}
            title={entry.title}
            fileName={fileName}
            description={entry.description}
            artboard={formats.newsletter}
            htmlOnly
            actions={<HtmlActions html={html} fileName={fileName} fullDocument />}
          >
            <div className="h-full w-full overflow-auto bg-[#F5F5F5]">
              <iframe
                title={entry.title}
                srcDoc={html}
                className="h-[720px] w-full border-0 bg-white"
                sandbox=""
              />
            </div>
          </AssetFrame>
        );
      })}

      <GroupLabel note="ESP QA before send">Client notes</GroupLabel>
      <div className="mb-14 overflow-hidden border border-gray-200">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="border-b-2 border-brand bg-gray-50 text-left text-[10px] uppercase tracking-[0.12em] text-gray-500">
              <th className="px-4 py-2.5 font-medium">Client</th>
              <th className="px-4 py-2.5 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {emailClientNotes.map(([client, note]) => (
              <tr key={client} className="border-b border-gray-200">
                <td className="whitespace-nowrap px-4 py-2.5 font-medium text-ink">{client}</td>
                <td className="px-4 py-2.5 text-gray-700">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}