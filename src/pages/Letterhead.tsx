import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { A4Page, DocumentHeader, DocumentFooter, MARGIN } from '../components/documents/DocumentChrome';
import { Logo, BrandRule } from '../components/brand/Logo';
import { EnvelopeDl, EnvelopeC5, WithCompliments } from '../components/documents/Stationery';
import { LetterheadMemo, LetterheadLegal, LetterheadFr } from '../components/documents/LetterheadExtras';
import { formats } from '@/lib/formats';
import { useCompany, useBrandSettings } from '@/lib/brand-context';

export function LetterBody({ dense = false }: { dense?: boolean }) {
  const company = useCompany();
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
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
            <span className="text-gray-500">Ref.</span> {isAshBak ? 'AB-' : 'NG-'}2024-0417
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
          Thank you for the discussion on 8 December regarding {isAshBak ? 'industrial infrastructure' : 'settlement infrastructure'} for your supplier network. This
          letter confirms the scope we agreed and sets out the commercial terms for your review.
        </p>
        <p>
          {company.name} will provide merchant onboarding, verification and settlement across the four markets identified,
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
          <div className="font-semibold text-ink">{company.personName}</div>
          <div className="text-gray-500">{company.jobTitle} · {company.name}</div>
        </div>
      </div>
    </div>
  );
}

export function LetterheadFullColour() {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return (
    <A4Page
      header={<DocumentHeader variant="full" />}
      footer={<DocumentFooter variant="full" page="1 / 2" reference={`Ref. ${isAshBak ? 'AB-' : 'NG-'}2024-0417`} showPhone />}
    >
      <LetterBody />
    </A4Page>
  );
}

export function LetterheadMinimal() {
  return (
    <A4Page header={<DocumentHeader variant="minimal" />} footer={<DocumentFooter variant="minimal" page="1 / 2" showPhone />}>
      <div className="mt-4 h-px w-full bg-gray-200" />
      <LetterBody dense />
    </A4Page>
  );
}

export function LetterheadContinuation() {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return (
    <A4Page
      header={<DocumentHeader variant="continuation" documentTitle={`Partnership terms · ${isAshBak ? 'AB-' : 'NG-'}2024-0417`} />}
      footer={<DocumentFooter variant="minimal" page="2 / 2" />}
    >
      <div className="pt-10">
        <h2 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">Annex A — Scope of services</h2>
        <BrandRule width={48} thickness={2} />
        <div className="mt-5 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
          <p>
            The following services form part of the engagement described in our letter of 12 December 2024. Where a term
            is defined in the master agreement, that definition applies here.
          </p>
          <ol className="ml-4 list-decimal space-y-2.5 marker:font-semibold marker:text-brand">
            <li>Merchant onboarding, identity verification and compliance screening across the four markets.</li>
            <li>Settlement in local currency with next-day value, reconciled daily against your ledger.</li>
            <li>API integration with the existing procurement platform, including sandbox and staged rollout.</li>
            <li>Named account management, quarterly service review and published availability targets.</li>
          </ol>
          <p>
            Service levels, escalation paths and commercial terms are set out in the enclosed quotation, which is valid
            for thirty days from the date of issue.
          </p>
        </div>
      </div>
    </A4Page>
  );
}

export function FooterFullCorporate() {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return (
    <div className="flex h-full flex-col justify-end" style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingBottom: 28 }}>
      <DocumentFooter variant="full" page="1 / 4" reference={`Ref. ${isAshBak ? 'AB-' : 'NG-'}2024-0417`} />
    </div>
  );
}

export function FooterCompact() {
  return (
    <div className="flex h-full flex-col justify-end" style={{ paddingLeft: MARGIN, paddingRight: MARGIN, paddingBottom: 24 }}>
      <DocumentFooter variant="minimal" page="3 / 4" />
    </div>
  );
}

export function FooterBrandedBand() {
  const company = useCompany();
  return (
    <div className="flex h-full items-end">
      <div className="flex w-full items-center justify-between bg-brand px-16 py-5">
        <Logo size={16} tone="light" />
        <div className="text-[9px] leading-[1.7] text-white/70">
          {company.endorsement} · {company.website} · {company.email}
        </div>
        <div className="text-[9px] tabular-nums text-white/70">04</div>
      </div>
    </div>
  );
}

export function LetterheadPage() {
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return (
    <>
      <PageHeader
        code="02"
        title="Corporate Letterhead"
        folder="02_LETTERHEAD"
        description="A4 letterheads on a shared 17 mm margin, plus DL / C5 envelopes and with-compliments. Branding stays in the header/footer so the body remains clean for international correspondence."
      />

      <GroupLabel note="For official correspondence, commercial letters, declarations and quotations">
        A4 — Full colour
      </GroupLabel>
      <AssetFrame
        title="Letterhead — A4 Full Colour"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_A4_Full_Color`}
        artboard={formats.a4}
        description="Full three-column footer carrying office, contact and company registration details. Use for first pages of formal correspondence."
      >
        <LetterheadFullColour />
      </AssetFrame>

      <GroupLabel note="Optimised for everyday office printing — no large solid areas">
        A4 — Minimal / printer-friendly
      </GroupLabel>
      <AssetFrame
        title="Letterhead — A4 Minimal"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_A4_Minimal`}
        artboard={formats.a4}
        description="Wordmark in Black, hairline rules and a single-line footer. Reproduces cleanly on mono office printers and fax-grade scans."
      >
        <LetterheadMinimal />
      </AssetFrame>

      <GroupLabel note="Documents longer than one page">Continuation page</GroupLabel>
      <AssetFrame
        title="Letterhead — Continuation Page"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_Continuation`}
        artboard={formats.a4}
        description="A compact identity strip replaces the full header so the reader keeps context without losing body space. Page numbering is mandatory from page two onward."
      >
        <LetterheadContinuation />
      </AssetFrame>

      <GroupLabel note="Standardised across every document family in this kit">Corporate footer system</GroupLabel>
      <AssetFrame
        title="Footer — Full corporate"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Footer_Full_Corporate`}
        artboard={formats.footerFull}
        description="Three-column footer for formal documents: office, contact and company registration, closing on the brand endorsement."
      >
        <FooterFullCorporate />
      </AssetFrame>

      <AssetFrame
        title="Footer — Compact single line"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Footer_Compact`}
        artboard={formats.footerCompact}
        description="For continuation pages, internal documents and multi-page annexes where the full block would crowd the content."
      >
        <FooterCompact />
      </AssetFrame>

      <AssetFrame
        title="Footer — Branded band"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Footer_Branded_Band`}
        artboard={formats.footerBand}
        description="Reversed band for covers, catalogues and proposals where the footer is part of the design rather than administrative chrome."
      >
        <FooterBrandedBand />
      </AssetFrame>

      <GroupLabel note="220 × 110 mm · 229 × 162 mm · A6">Stationery — envelopes & compliments</GroupLabel>
      <AssetFrame
        title="Envelope — DL"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Envelope_DL`}
        artboard={formats.envelopeDl}
        description="Standard business envelope face. Return address top-left; dashed recipient window for layout reference (not printed)."
      >
        <EnvelopeDl />
      </AssetFrame>
      <AssetFrame
        title="Envelope — C5"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Envelope_C5`}
        artboard={formats.envelopeC5}
        description="C5 face on Light Gray for proposals and board packs. Matches A4 folded once."
      >
        <EnvelopeC5 />
      </AssetFrame>
      <AssetFrame
        title="With Compliments"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_With_Compliments`}
        artboard={formats.compliments}
        description="A6 slip for samples, proposals and hand delivery. Writing space left open above the contact block."
      >
        <WithCompliments />
      </AssetFrame>

      <GroupLabel note="Internal · legal · bilingual">Extended correspondence</GroupLabel>
      <AssetFrame
        title="Letterhead — Internal Memo"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_Memo`}
        artboard={formats.a4}
        description="Meta block for From / To / Date / Ref / Classification. Internal only."
      >
        <LetterheadMemo />
      </AssetFrame>
      <AssetFrame
        title="Letterhead — Legal / Privileged"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_Legal`}
        artboard={formats.a4}
        description="Counsel correspondence — without-prejudice framing and matter reference."
      >
        <LetterheadLegal />
      </AssetFrame>
      <AssetFrame
        title="Letterhead — Français (FR)"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Letterhead_FR`}
        artboard={formats.a4}
        description="Full-colour twin with French body for West / Central Africa correspondence."
      >
        <LetterheadFr />
      </AssetFrame>
    </>
  );
}