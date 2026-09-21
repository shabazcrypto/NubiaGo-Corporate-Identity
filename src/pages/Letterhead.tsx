import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { A4, A4Page, DocumentHeader, DocumentFooter, MARGIN } from '../components/documents/DocumentChrome';
import { Logo, BrandRule } from '../components/brand/Logo';
import { company } from '../data/brand';

function LetterBody({ dense = false }: {dense?: boolean;}) {
  return (
    <div className={dense ? 'pt-10' : 'pt-12'}>
      <div className="flex items-start justify-between">
        <div className="text-[10px] leading-[1.8] text-gray-700">
          <div className="font-semibold text-ink">Ms. Amara Okonkwo</div>
          <div>Director of Procurement</div>
          <div>Continental Trade Partners Ltd.</div>
          <div>14 Marina Road, Accra, Ghana</div>
        </div>
        <div className="text-right text-[10px] leading-[1.8] text-gray-700">
          <div>
            <span className="text-gray-500">Ref.</span> NG-2024-0417
          </div>
          <div>
            <span className="text-gray-500">Date</span> 12 December 2024
          </div>
        </div>
      </div>

      <h1 className="mt-9 text-[15px] font-semibold tracking-[-0.01em] text-ink">
        Partnership terms for cross-border merchant settlement
      </h1>

      <div className="mt-5 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
        <p>Dear Ms. Okonkwo,</p>
        <p>
          Thank you for the discussion on 8 December regarding settlement infrastructure for your supplier network. This
          letter confirms the scope we agreed and sets out the commercial terms for your review.
        </p>
        <p>
          NubiaGo will provide merchant onboarding, verification and settlement across the four markets identified,
          integrated with your existing procurement platform. Implementation is scheduled across twelve weeks, with the
          first market live in week five. A detailed specification and the accompanying quotation are enclosed.
        </p>
        <p>
          Our commitment is straightforward: transparent pricing, published service levels and a named point of contact
          for the duration of the engagement. Should any term require adjustment before signature, we will accommodate
          it within the timetable above.
        </p>
        <p>We look forward to working with your team.</p>
      </div>

      <div className="mt-9 text-[10.5px] leading-[1.8] text-gray-700">
        <p>Yours sincerely,</p>
        <div className="mt-8 border-t border-gray-200 pt-2">
          <div className="font-semibold text-ink">[Name Surname]</div>
          <div className="text-gray-500">[Job Title] · NubiaGo</div>
        </div>
      </div>
    </div>);

}

export function LetterheadPage() {
  return (
    <>
      <PageHeader
        code="02"
        title="Corporate Letterhead"
        folder="02_LETTERHEAD"
        description="Three A4 templates on a shared 17 mm margin and 12-column grid. Branding is confined to the header band and footer so the body area stays clean, printable and usable for international correspondence." />
      

      <GroupLabel note="For official correspondence, commercial letters, declarations and quotations">
        A4 — Full colour
      </GroupLabel>
      <AssetFrame
        title="Letterhead — A4 Full Colour"
        fileName="NubiaGo_Letterhead_A4_Full_Color"
        spec="A4 · 210 × 297 mm · 300 dpi ready"
        description="Full three-column footer carrying office, contact and company registration details. Use for first pages of formal correspondence."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="full" />}
          footer={<DocumentFooter variant="full" page="1 / 2" reference="Ref. NG-2024-0417" showPhone />}>
          
          <LetterBody />
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Optimised for everyday office printing — no large solid areas">
        A4 — Minimal / printer-friendly
      </GroupLabel>
      <AssetFrame
        title="Letterhead — A4 Minimal"
        fileName="NubiaGo_Letterhead_A4_Minimal"
        spec="A4 · 210 × 297 mm · low ink coverage"
        description="Wordmark in Black, hairline rules and a single-line footer. Reproduces cleanly on mono office printers and fax-grade scans."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="minimal" />}
          footer={<DocumentFooter variant="minimal" page="1 / 2" showPhone />}>
          
          <div className="mt-4 h-px w-full bg-gray-200" />
          <LetterBody dense />
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Documents longer than one page">Continuation page</GroupLabel>
      <AssetFrame
        title="Letterhead — Continuation Page"
        fileName="NubiaGo_Letterhead_Continuation"
        spec="A4 · 210 × 297 mm"
        description="A compact identity strip replaces the full header so the reader keeps context without losing body space. Page numbering is mandatory from page two onward."
        width={A4.width}
        height={A4.height}>
        
        <A4Page
          header={<DocumentHeader variant="continuation" documentTitle="Partnership terms · NG-2024-0417" />}
          footer={<DocumentFooter variant="minimal" page="2 / 2" />}>
          
          <div className="pt-10">
            <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">Annex A — Scope of services</h2>
            <BrandRule width={48} thickness={2} />
            <div className="mt-5 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
              <p>
                The following services form part of the engagement described in our letter of 12 December 2024. Where a
                term is defined in the master agreement, that definition applies here.
              </p>
              <ol className="ml-4 list-decimal space-y-2.5 marker:font-semibold marker:text-brand">
                <li>Merchant onboarding, identity verification and compliance screening across the four markets.</li>
                <li>Settlement in local currency with next-day value, reconciled daily against your ledger.</li>
                <li>API integration with the existing procurement platform, including sandbox and staged rollout.</li>
                <li>Named account management, quarterly service review and published availability targets.</li>
              </ol>
              <p>
                Service levels, escalation paths and commercial terms are set out in the enclosed quotation, which is
                valid for thirty days from the date of issue.
              </p>
            </div>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Standardised across every document family in this kit">Corporate footer system</GroupLabel>
      <AssetFrame
        title="Footer — Full corporate"
        fileName="NubiaGo_Footer_Full_Corporate"
        spec="A4 width · 794 × 150 px"
        description="Three-column footer for formal documents: office, contact and company registration, closing on the AshBak endorsement. No telephone — the number appears on letterheads, cards and contact pages only."
        width={A4.width}
        height={172}
        printable={false}>
        
        <div className="flex h-full flex-col justify-end" style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingBottom: 28 }}>
          <DocumentFooter variant="full" page="1 / 4" reference="Ref. NG-2024-0417" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Footer — Compact single line"
        fileName="NubiaGo_Footer_Compact"
        spec="A4 width · 794 × 90 px"
        description="For continuation pages, internal documents and multi-page annexes where the full block would crowd the content."
        width={A4.width}
        height={90}
        printable={false}>
        
        <div className="flex h-full flex-col justify-end" style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingBottom: 24 }}>
          <DocumentFooter variant="minimal" page="3 / 4" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Footer — Branded band"
        fileName="NubiaGo_Footer_Branded_Band"
        spec="A4 width · 794 × 120 px"
        description="Reversed band for covers, catalogues and proposals where the footer is part of the design rather than administrative chrome."
        width={A4.width}
        height={120}
        printable={false}>
        
        <div className="flex h-full items-end">
          <div className="flex w-full items-center justify-between bg-brand px-16 py-5">
            <Logo size={16} tone="light" />
            <div className="text-[9px] leading-[1.7] text-white/70">
              {company.endorsement} · {company.website} · {company.email}
            </div>
            <div className="text-[9px] tabular-nums text-white/70">04</div>
          </div>
        </div>
      </AssetFrame>
    </>);

}