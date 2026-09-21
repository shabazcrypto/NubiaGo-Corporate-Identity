import React, { useState } from 'react';
import { CopyIcon, CheckIcon, FileCode2Icon, ArrowRightIcon } from 'lucide-react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { NG_STROKE, iconByKey } from '../components/brand/iconSystem';
import { company } from '../data/brand';
import { copyText, downloadText } from '../utils/exportAsset';
import {
  standardSignatureHtml,
  compactSignatureHtml,
  executiveSignatureHtml,
  wrapAsEmailDocument } from
'../utils/emailSignatures';

const buttonBase =
'inline-flex items-center gap-1.5 border border-gray-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-gray-700 transition-colors duration-150 ease-out hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1';

function HtmlActions({ html, fileName }: {html: string;fileName: string;}) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        className={buttonBase}
        onClick={async () => {
          await copyText(html);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}>
        
        {copied ?
        <CheckIcon className="h-3.5 w-3.5 text-state-success" strokeWidth={2} /> :

        <CopyIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
        }
        Copy HTML
      </button>
      <button
        type="button"
        className={buttonBase}
        onClick={() => downloadText(wrapAsEmailDocument(html, fileName), `${fileName}.html`, 'text/html')}>
        
        <FileCode2Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
        HTML
      </button>
    </>);

}

function SignaturePreview({ html }: {html: string;}) {
  return (
    <div className="h-full w-full bg-white p-8">
      <div className="mb-6 border-b border-gray-200 pb-4 text-[11px] leading-relaxed text-gray-500">
        <span className="text-gray-700">Re: Partnership terms — settlement across four markets</span>
        <br />
        …look forward to your comments on the enclosed quotation.
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>);

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
  const MailIcon = iconByKey('email');
  const GlobeIcon = iconByKey('website');

  return (
    <>
      <PageHeader
        code="03"
        title="Email System"
        folder="03_EMAIL"
        description="Signatures built as nested tables with inline styles only — no background images, web fonts or flex layout — so they survive Outlook, Gmail and Apple Mail. Each one copies straight into the client as HTML." />
      

      <GroupLabel note="Table-based HTML · Inter with Arial fallback">Signatures</GroupLabel>

      <AssetFrame
        title="Standard Corporate Signature"
        fileName="NubiaGo_Signature_Standard"
        spec="HTML · ~360 px wide"
        description="The default for all staff. Stacked layout survives narrow mobile clients; placeholders in square brackets are replaced per person."
        width={720}
        height={420}
        actions={<HtmlActions html={standardSignatureHtml} fileName="NubiaGo_Signature_Standard" />}>
        
        <SignaturePreview html={standardSignatureHtml} />
      </AssetFrame>

      <AssetFrame
        title="Compact Signature"
        fileName="NubiaGo_Signature_Compact"
        spec="HTML · ~420 px wide"
        description="For replies and internal threads. One rule of Gold separates the mark from the details, keeping three lines of chrome at most."
        width={720}
        height={260}
        actions={<HtmlActions html={compactSignatureHtml} fileName="NubiaGo_Signature_Compact" />}>
        
        <SignaturePreview html={compactSignatureHtml} />
      </AssetFrame>

      <AssetFrame
        title="Executive / Sales Signature"
        fileName="NubiaGo_Signature_Executive"
        spec="HTML · 540 px wide"
        description="For executives, sales and business development writing to international customers. Adds the reversed brand band, a connect column and the legal line."
        width={720}
        height={520}
        actions={<HtmlActions html={executiveSignatureHtml} fileName="NubiaGo_Signature_Executive" />}>
        
        <SignaturePreview html={executiveSignatureHtml} />
      </AssetFrame>

      <div className="mb-14 border-l-2 border-brand-gold bg-gray-50 px-5 py-4 text-[13px] leading-relaxed text-gray-700">
        <strong className="font-semibold text-ink">Implementation.</strong> Copy the HTML and paste it into the
        signature editor, or import the downloaded <code className="text-[12px]">.html</code> file. Never paste a
        screenshot of a signature — it breaks selectable contact details and accessibility.
      </div>

      <GroupLabel note="Modular blocks · 600 px email column">Newsletter template</GroupLabel>
      <AssetFrame
        title="Email / Newsletter Master"
        fileName="NubiaGo_Newsletter_Master"
        spec="Email · 600 px column"
        description="Header, title area, image area, content blocks, CTA and footer as independent modules. Blocks can be reordered or removed without breaking the grid."
        width={NEWSLETTER_WIDTH}
        height={1180}>
        
        <div style={{ width: NEWSLETTER_WIDTH }} className="bg-white">
          <NewsletterBlock label="Header">
            <div className="flex items-center justify-between bg-brand px-10 py-6">
              <Logo size={20} tone="light" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/60">
                Quarterly update · Q4 2024
              </span>
            </div>
            <BrandRule width="100%" thickness={2} tone="gold" />
          </NewsletterBlock>

          <NewsletterBlock label="Title">
            <div className="px-10 pb-7 pt-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-light">
                Company news
              </div>
              <h1 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
                Settlement coverage extended to four new markets
              </h1>
              <p className="mt-3 text-[13px] leading-[1.7] text-gray-700">
                Merchants can now receive next-day local-currency settlement across Ghana, Kenya, Côte d’Ivoire and
                Senegal, with reconciliation handled end to end.
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
              }].
              map((item) =>
              <div key={item.title}>
                  <div className="h-0.5 w-8 bg-brand-gold" />
                  <h2 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">{item.title}</h2>
                  <p className="mt-1.5 text-[12.5px] leading-[1.7] text-gray-700">{item.body}</p>
                </div>
              )}
            </div>
            <div className="mx-10 h-px bg-gray-200" />
            <div className="grid grid-cols-3 gap-6 px-10 py-8">
              {[
              ['18,400', 'Active merchants'],
              ['4', 'New markets'],
              ['99.95%', 'Settlement uptime']].
              map(([value, label]) =>
              <div key={label}>
                  <div className="text-[22px] font-bold tracking-[-0.02em] text-brand">{value}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-500">{label}</div>
                </div>
              )}
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
                <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} />
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
                  <GlobeIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} />
                  {company.website}
                </span>
                <span className="flex items-center gap-1.5">
                  <MailIcon className="h-3.5 w-3.5" strokeWidth={NG_STROKE} />
                  {company.email}
                </span>
              </div>
              <div className="mt-5 border-t border-white/15 pt-4 text-[10px] leading-[1.7] text-white/50">
                {company.legalName} · {company.addressLine1}, {company.addressLine2}, {company.country}
                <br />
                You are receiving this because you work with NubiaGo. Unsubscribe · Manage preferences
              </div>
            </div>
          </NewsletterBlock>
        </div>
      </AssetFrame>
    </>);

}