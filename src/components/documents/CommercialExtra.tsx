import type { JSX } from 'react';
import { A4Page, DocumentFooter } from '@/components/documents/DocumentChrome';
import {
  DocumentTypeHeader,
  PartyBlocks,
  LineItemsTable,
  TotalsBlock,
  TermsGrid,
  SignatureRow
} from '@/components/documents/CommercialParts';
import { useCompany } from '@/lib/brand-context';
import { quotationItems, totals, customer, terms, bankDetails } from '@/data/commercial';

const customerLines = [customer.company, customer.attention, customer.address, customer.country, customer.taxId];

function useSalesLines() {
  const company = useCompany();
  return { company, salesLines: [company.personName, company.jobTitle, company.phone, company.email] };
}

/** Credit note — negative totals emphasis. */
export function CreditNoteDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Credit Note"
        reference="No. CN-2024-0128"
        meta={[
          ['Date of issue', '20 December 2024'],
          ['Invoice ref.', 'INV-2024-0913'],
          ['Reason', 'Volume adjustment'],
          ['Currency', totals.currency]
        ]}
      />
      <div className="mt-6 flex items-center gap-3 border-l-2 border-brand bg-gray-50 px-4 py-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">Credit</span>
        <span className="text-[9.5px] text-gray-700">
          This credit note reduces the amount payable on the referenced invoice. Apply against outstanding balance.
        </span>
      </div>
      <PartyBlocks
        left={{ label: 'Credit to', lines: customerLines }}
        right={{ label: 'Issued by', lines: salesLines }}
      />
      <LineItemsTable items={quotationItems.slice(0, 2)} currency={totals.currency} />
      <TotalsBlock
        rows={[
          ['Gross credit', '21,150.00'],
          [totals.taxLabel, '1,586.25']
        ]}
        grandLabel="Total credit"
        grand="− 22,736.25"
        currency={totals.currency}
        emphasis="sand"
      />
      <TermsGrid
        items={[
          ['Applies to', 'INV-2024-0913'],
          ['Settlement', 'Offset against next remittance'],
          ['Bank', bankDetails[1][1]],
          ['Currency', totals.currency]
        ]}
      />
      <SignatureRow left={`Authorised · ${company.name}`} right="Acknowledged by customer" />
    </A4Page>
  );
}

/** Debit note. */
export function DebitNoteDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Debit Note"
        reference="No. DN-2024-0042"
        meta={[
          ['Date of issue', '21 December 2024'],
          ['Invoice ref.', 'INV-2024-0913'],
          ['Reason', 'Additional scope'],
          ['Currency', totals.currency]
        ]}
      />
      <div className="mt-6 flex items-center gap-3 border-l-2 border-brand bg-gray-50 px-4 py-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">Debit</span>
        <span className="text-[9.5px] text-gray-700">
          This debit note increases the amount payable for additional scope on the referenced invoice. Settle with next remittance.
        </span>
      </div>
      <PartyBlocks
        left={{ label: 'Debit to', lines: customerLines }}
        right={{ label: `Your contact at ${company.name}`, lines: salesLines }}
      />
      <LineItemsTable items={quotationItems.slice(2, 4)} currency={totals.currency} />
      <TotalsBlock
        rows={[
          ['Subtotal', '9,000.00'],
          [totals.taxLabel, '675.00']
        ]}
        grandLabel="Amount debited"
        grand="9,675.00"
        currency={totals.currency}
      />
      <TermsGrid
        items={[
          ['Payment terms', '30 days net from debit note date'],
          ['Related invoice', 'INV-2024-0913'],
          ['Bank', '[Bank name] · [SWIFT code]'],
          ['Account / IBAN', '[Account number]']
        ]}
      />
      <SignatureRow />
    </A4Page>
  );
}

/** Delivery / packing list — qty focus, no money totals. */
export function DeliveryNoteDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Delivery Note"
        reference="No. DN-DL-2024-0881"
        meta={[
          ['Despatch date', '22 December 2024'],
          ['Order ref.', 'PO-CTP-88140'],
          ['Carrier', '[Carrier name]'],
          ['Waybill', '[AWB / tracking]']
        ]}
      />
      <PartyBlocks
        left={{
          label: 'Deliver to',
          lines: [customer.company, 'Warehouse 4, Tema Industrial Area', 'Accra, Ghana', 'Attn. [Contact name]']
        }}
        right={{ label: 'Ship from / contact', lines: salesLines }}
      />
      <table className="mt-8 w-full border-collapse text-[9.5px]">
        <thead>
          <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
            <th className="w-[14%] px-3 py-2.5 font-medium">Code</th>
            <th className="px-3 py-2.5 font-medium">Description</th>
            <th className="w-[12%] px-3 py-2.5 text-right font-medium">Ordered</th>
            <th className="w-[12%] px-3 py-2.5 text-right font-medium">Shipped</th>
            <th className="w-[12%] px-3 py-2.5 font-medium">Unit</th>
            <th className="w-[14%] px-3 py-2.5 font-medium">Package</th>
          </tr>
        </thead>
        <tbody>
          {quotationItems.map((item, index) => (
            <tr key={item.code} className={index % 2 === 1 ? 'bg-gray-50' : undefined}>
              <td className="border-b border-gray-200 px-3 py-3 align-top font-medium tabular-nums text-gray-500">
                {item.code}
              </td>
              <td className="border-b border-gray-200 px-3 py-3 align-top">
                <div className="text-[10.5px] font-semibold text-ink">{item.description}</div>
                <div className="mt-0.5 text-[9px] text-gray-500">{item.detail}</div>
              </td>
              <td className="border-b border-gray-200 px-3 py-3 text-right align-top tabular-nums text-gray-700">
                {item.qty}
              </td>
              <td className="border-b border-gray-200 px-3 py-3 text-right align-top font-semibold tabular-nums text-ink">
                {item.qty}
              </td>
              <td className="border-b border-gray-200 px-3 py-3 align-top text-gray-700">{item.unit}</td>
              <td className="border-b border-gray-200 px-3 py-3 align-top text-gray-700">
                Carton {index + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 grid grid-cols-4 gap-6 border-t border-gray-200 pt-4 text-[9.5px]">
        {[
          ['Total lines', String(quotationItems.length)],
          ['Total packages', '4'],
          ['Incoterms® 2020', 'DAP Accra'],
          ['Received in good order', '☐ Yes · ☐ No']
        ].map(([label, value]) => (
          <div key={label}>
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>
      <SignatureRow left={`Despatched by · ${company.name}`} right="Received by" />
    </A4Page>
  );
}

/** Purchase order — brand as buyer. */
export function PurchaseOrderDoc(): JSX.Element {
  const company = useCompany();
  const buyerAddress = [company.addressLine1, company.addressLine2]
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p))
    .join(', ');
  const buyerLines = [company.legalName, buyerAddress, company.country, company.taxId].filter(
    (p): p is string => Boolean(p)
  );
  const vendorLines = [
    'Lagos Fibre Systems Ltd.',
    'Attn. Procurement Desk',
    '42 Adeola Odeku Street, Victoria Island',
    'Lagos, Nigeria',
    'TIN [Vendor tax ID]'
  ];
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Purchase Order"
        reference="No. PO-NG-2024-2201"
        meta={[
          ['Order date', '18 December 2024'],
          ['Required by', '15 January 2025'],
          ['Buyer contact', company.personName],
          ['Currency', totals.currency]
        ]}
      />
      <PartyBlocks
        left={{ label: 'Vendor / supplier', lines: vendorLines }}
        right={{ label: `Bill to / ship to — ${company.name}`, lines: buyerLines }}
      />
      <LineItemsTable items={quotationItems.slice(0, 3)} currency={totals.currency} />
      <TotalsBlock
        rows={[
          ['Subtotal', '24,750.00'],
          [totals.taxLabel, '1,856.25']
        ]}
        grandLabel="Order total"
        grand="26,606.25"
        currency={totals.currency}
      />
      <TermsGrid
        items={[
          ['Payment terms', '30 days net from delivery'],
          ['Delivery terms', 'DAP Lagos (Incoterms® 2020)'],
          ['PO validity', '30 days from order date'],
          ['Reference on invoice', 'PO-NG-2024-2201']
        ]}
      />
      <SignatureRow left={`Authorised buyer · ${company.name}`} right="Vendor acknowledgement" />
    </A4Page>
  );
}

/** Statement of account — opening / closing balance. */
export function StatementOfAccountDoc(): JSX.Element {
  const { salesLines } = useSalesLines();
  const rows: [string, string, string, string][] = [
    ['01 Dec 2024', 'Opening balance', '', '12,400.00'],
    ['05 Dec 2024', 'INV-2024-0881', '8,750.00', '21,150.00'],
    ['12 Dec 2024', 'Payment received · REF-4412', '− 12,400.00', '8,750.00'],
    ['18 Dec 2024', 'INV-2024-0913', '30,790.69', '39,540.69'],
    ['20 Dec 2024', 'CN-2024-0128', '− 22,736.25', '16,804.44']
  ];
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Statement of Account"
        reference="No. SA-2024-12"
        meta={[
          ['Period', '01–31 December 2024'],
          ['Account', 'CTP-88140'],
          ['Currency', totals.currency],
          ['As at', '31 December 2024']
        ]}
      />
      <PartyBlocks
        left={{ label: 'Account holder', lines: customerLines }}
        right={{ label: 'Account manager', lines: salesLines }}
      />
      <table className="mt-8 w-full border-collapse text-[9.5px]">
        <thead>
          <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
            <th className="w-[18%] px-3 py-2.5 font-medium">Date</th>
            <th className="px-3 py-2.5 font-medium">Description</th>
            <th className="w-[18%] px-3 py-2.5 text-right font-medium">Amount</th>
            <th className="w-[18%] px-3 py-2.5 text-right font-medium">Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`} className={index % 2 === 1 ? 'bg-gray-50' : undefined}>
              <td className="border-b border-gray-200 px-3 py-2.5 tabular-nums text-gray-500">{row[0]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 text-ink">{row[1]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">
                {row[2] || '—'}
              </td>
              <td className="border-b border-gray-200 px-3 py-2.5 text-right font-semibold tabular-nums text-ink">
                {row[3]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 grid grid-cols-3 gap-0 border border-gray-200 bg-brand-sand text-[10px]">
        {[
          ['Opening balance', `${totals.currency} 12,400.00`],
          ['Movements (net)', `${totals.currency} 4,404.44`],
          ['Closing balance', `${totals.currency} 16,804.44`]
        ].map(([label, value], index) => (
          <div
            key={label}
            className={`px-5 py-4 ${index < 2 ? 'border-r border-gray-200' : ''}`}
          >
            <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-bold tabular-nums text-ink">{value}</div>
          </div>
        ))}
      </div>
      <TermsGrid
        items={[
          ['Payment due', 'Within 14 days of statement date'],
          ['Queries', 'accounts@nubiago.com within 7 days']
        ]}
      />
    </A4Page>
  );
}

/** Payment receipt / acknowledgement. */
export function PaymentReceiptDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Payment Receipt"
        reference="No. RCP-2024-4412"
        meta={[
          ['Receipt date', '12 December 2024'],
          ['Payment method', 'Bank transfer'],
          ['Currency', totals.currency],
          ['Status', 'Cleared']
        ]}
      />
      <div className="mt-6 flex items-center gap-3 border-l-2 border-state-success bg-gray-50 px-4 py-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-state-success">Received</span>
        <span className="text-[9.5px] text-gray-700">
          Payment acknowledged. This receipt does not replace a tax invoice.
        </span>
      </div>
      <PartyBlocks
        left={{ label: 'Received from', lines: customerLines }}
        right={{ label: 'Received by', lines: [company.legalName, ...salesLines.slice(0, 2)] }}
      />
      <div className="mt-8 border border-gray-200">
        <div className="border-b border-gray-200 bg-brand-sand px-5 py-5">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Cleared amount</div>
          <div className="mt-1 text-[22px] font-bold tabular-nums tracking-[-0.02em] text-ink">
            {totals.currency} 12,400.00
          </div>
        </div>
        <div className="grid grid-cols-2 gap-0 border-b border-gray-200 text-[10px]">
          {[
            ['Applied to', 'INV-2024-0881'],
            ['Payer reference', 'CTP-PAY-4412'],
            ['Payment method', 'Bank transfer'],
            ['Value date', '12 December 2024']
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`px-5 py-4 ${index % 2 === 0 ? 'border-r border-gray-200' : ''} ${index < 2 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
              <div className="mt-1 font-semibold text-ink">{value}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 px-5 py-4">
          <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Beneficiary account</div>
          <div className="mt-2 space-y-1 text-[9px] leading-[1.6] text-gray-700">
            {bankDetails.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-3">
                <span className="text-gray-500">{label}</span>
                <span className="text-right font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SignatureRow left={`For ${company.name} · Accounts`} right="Customer copy" />
    </A4Page>
  );
}

/** SLA summary — metrics table. */
export function SlaSummaryDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  const metrics: [string, string, string, string][] = [
    ['Platform availability', '99.90%', '99.95%', 'Met'],
    ['Settlement cut-off adherence', '98.00%', '99.10%', 'Met'],
    ['Support first response (P1)', '≤ 30 min', '18 min', 'Met'],
    ['Support resolution (P1)', '≤ 4 hrs', '3.2 hrs', 'Met'],
    ['Reconciliation delivery', 'By 09:00 WAT', '08:42 WAT', 'Met'],
    ['Change lead time', '10 business days', '12 days', 'Miss']
  ];
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="SLA Summary"
        reference="No. SLA-2024-Q4"
        meta={[
          ['Period', 'Q4 2024'],
          ['Agreement', 'MSA-2024-0417'],
          ['Customer', customer.company],
          ['Review date', '08 January 2025']
        ]}
      />
      <PartyBlocks
        left={{ label: 'Customer', lines: customerLines }}
        right={{ label: 'Service owner', lines: salesLines }}
      />
      <table className="mt-8 w-full border-collapse text-[9.5px]">
        <thead>
          <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
            <th className="px-3 py-2.5 font-medium">Metric</th>
            <th className="w-[16%] px-3 py-2.5 font-medium">Target</th>
            <th className="w-[16%] px-3 py-2.5 font-medium">Actual</th>
            <th className="w-[12%] px-3 py-2.5 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((row, index) => (
            <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : undefined}>
              <td className="border-b border-gray-200 px-3 py-2.5 font-semibold text-ink">{row[0]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 tabular-nums text-gray-700">{row[1]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 tabular-nums text-ink">{row[2]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 font-semibold uppercase tracking-[0.08em] text-[8.5px] text-ink">
                {row[3]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TermsGrid
        items={[
          ['Service credits', 'Applied per Schedule B where Miss persists two consecutive months'],
          ['Next review', 'Q1 2025 · joint operations call'],
          ['Escalation', salesLines[0] ?? '[Name]'],
          ['Document class', 'Customer confidential']
        ]}
      />
      <SignatureRow left={`${company.name} service owner`} right="Customer acceptance" />
    </A4Page>
  );
}

/** Change order / contract amendment. */
export function ChangeOrderDoc(): JSX.Element {
  const { company, salesLines } = useSalesLines();
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Change Order"
        reference="No. CO-2024-0017"
        meta={[
          ['Effective date', '06 January 2025'],
          ['Agreement', 'MSA-2024-0417'],
          ['SOW', 'SOW-A-01'],
          ['Currency', totals.currency]
        ]}
      />
      <div className="mt-6 border-l-2 border-brand-gold bg-brand-sand px-4 py-2.5">
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">Amendment</span>
        <p className="mt-1 text-[9.5px] leading-[1.7] text-gray-700">
          This change order amends Schedule A only. All other terms of the master agreement remain in force.
        </p>
      </div>
      <PartyBlocks
        left={{ label: 'Customer', lines: customerLines }}
        right={{ label: `${company.name} contact`, lines: salesLines }}
      />
      <LineItemsTable items={quotationItems.slice(1, 3)} currency={totals.currency} />
      <TotalsBlock
        rows={[
          ['Previous SOW value', '30,790.69'],
          ['Net change', '+ 12,350.00'],
          [totals.taxLabel, '926.25']
        ]}
        grandLabel="Revised contract value"
        grand="44,066.94"
        currency={totals.currency}
        emphasis="sand"
      />
      <TermsGrid
        items={[
          ['Scope change', 'Add automated reconciliation for two additional corridors'],
          ['Schedule impact', '+ 3 weeks to full rollout'],
          ['Payment', 'Invoiced with next milestone'],
          ...(terms.slice(0, 1) as [string, string][])
        ]}
      />
      <SignatureRow left={`For ${company.name}`} right="Authorised customer signatory" />
    </A4Page>
  );
}

/** Remittance advice. */
export function RemittanceAdviceDoc(): JSX.Element {
  const company = useCompany();
  const remittanceRows: [string, string, string, string][] = [
    ['INV-2024-0881', '05 Dec 2024', '8,750.00', '8,750.00'],
    ['INV-2024-0913', '18 Dec 2024', '30,790.69', '8,250.00'],
    ['CN-2024-0128', '20 Dec 2024', '− 22,736.25', '0.00']
  ];
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Remittance Advice"
        reference="No. RA-2024-0901"
        meta={[
          ['Payment date', '28 December 2024'],
          ['Payer', customer.company],
          ['Method', 'Bank transfer'],
          ['Currency', totals.currency]
        ]}
      />
      <PartyBlocks
        left={{ label: 'Payer', lines: customerLines }}
        right={{
          label: 'Payee',
          lines: [
            company.legalName,
            ...[company.addressLine1, company.addressLine2]
              .map((p) => p?.trim())
              .filter((p): p is string => Boolean(p)),
            company.country
          ]
        }}
      />
      <table className="mt-8 w-full border-collapse text-[9.5px]">
        <thead>
          <tr className="border-b-2 border-brand text-left text-[8px] uppercase tracking-[0.12em] text-gray-500">
            <th className="px-3 py-2.5 font-medium">Document</th>
            <th className="w-[18%] px-3 py-2.5 font-medium">Date</th>
            <th className="w-[18%] px-3 py-2.5 text-right font-medium">Invoice amount</th>
            <th className="w-[18%] px-3 py-2.5 text-right font-medium">Amount paid</th>
          </tr>
        </thead>
        <tbody>
          {remittanceRows.map((row) => (
            <tr key={row[0]}>
              <td className="border-b border-gray-200 px-3 py-2.5 font-semibold text-ink">{row[0]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 tabular-nums text-gray-700">{row[1]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 text-right tabular-nums text-gray-700">{row[2]}</td>
              <td className="border-b border-gray-200 px-3 py-2.5 text-right font-semibold tabular-nums text-ink">
                {row[3]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TotalsBlock
        rows={[['Documents settled', '3']]}
        grandLabel="Total remitted"
        grand="17,000.00"
        currency={totals.currency}
      />
      <div className="mt-7 bg-brand-sand px-5 py-4">
        <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Payment details</div>
        <div className="mt-2 space-y-1 text-[9px] leading-[1.6] text-gray-700">
          {bankDetails.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <span className="text-gray-500">{label}</span>
              <span className="text-right font-medium text-ink">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <SignatureRow left="Prepared by payer" right={`For ${company.name} accounts`} />
    </A4Page>
  );
}

/** Trade credit application — labeled field rows. */
export function CreditApplicationDoc(): JSX.Element {
  const company = useCompany();
  const fields: [string, string][] = [
    ['Legal company name', customer.company],
    ['Trading name (if different)', ''],
    ['Registered address', customer.address],
    ['Country of incorporation', customer.country],
    ['Tax / VAT ID', customer.taxId],
    ['Company registration no.', ''],
    ['Years in operation', ''],
    ['Annual turnover (approx.)', ''],
    ['Requested credit limit', `${totals.currency} `],
    ['Preferred payment terms', '30 days net'],
    ['Bank name & branch', ''],
    ['Account / IBAN', ''],
    ['Trade reference 1', ''],
    ['Trade reference 2', ''],
    ['Primary contact name', customer.attention],
    ['Contact email / phone', '']
  ];
  return (
    <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
      <DocumentTypeHeader
        type="Credit Application"
        reference="No. CA-2024-0330"
        meta={[
          ['Date', '10 December 2024'],
          ['Submitted to', company.legalName],
          ['Currency', totals.currency],
          ['Status', 'For review']
        ]}
      />
      <p className="mt-6 max-w-[560px] text-[10px] leading-[1.7] text-gray-700">
        Complete all fields. Incomplete applications will be returned. Credit decisions are subject to
        verification and {company.name} credit policy.
      </p>
      <div className="mt-6 border-t border-gray-200">
        {fields.map(([label, value]) => (
          <div key={label} className="grid grid-cols-12 gap-4 border-b border-gray-200 py-4">
            <div className="col-span-4 flex items-center text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              {label}
            </div>
            <div className="col-span-8 min-h-[28px] text-[10.5px] leading-[28px] text-ink">{value || '\u00a0'}</div>
          </div>
        ))}
      </div>
      <TermsGrid
        items={[
          ['Declaration', 'I confirm the information is true and complete'],
          ['Data use', 'Used solely for credit assessment'],
          ['Contact', company.email],
          ['Processing time', '5–10 business days']
        ]}
      />
      <SignatureRow left="Applicant authorised signatory" right={`${company.name} credit approval`} />
    </A4Page>
  );
}

export const enterpriseCommercialDocs: Array<{
  title: string;
  fileName: string;
  description: string;
  group: string;
  render: () => JSX.Element;
}> = [
  {
    title: 'Credit Note',
    fileName: 'NubiaGo_Credit_Note',
    description: 'Credit note with sand-emphasised negative total against a referenced invoice.',
    group: 'Adjustments',
    render: () => <CreditNoteDoc />
  },
  {
    title: 'Debit Note',
    fileName: 'NubiaGo_Debit_Note',
    description: 'Debit note for additional scope billed against an existing commercial relationship.',
    group: 'Adjustments',
    render: () => <DebitNoteDoc />
  },
  {
    title: 'Delivery Note',
    fileName: 'NubiaGo_Delivery_Note',
    description: 'Packing list with ordered vs shipped quantities — no monetary totals.',
    group: 'Fulfilment',
    render: () => <DeliveryNoteDoc />
  },
  {
    title: 'Purchase Order',
    fileName: 'NubiaGo_Purchase_Order',
    description: 'Outbound PO with the brand as buyer and vendor party block.',
    group: 'Procurement',
    render: () => <PurchaseOrderDoc />
  },
  {
    title: 'Statement of Account',
    fileName: 'NubiaGo_Statement_Of_Account',
    description: 'Period statement with running balance and opening / closing summary band.',
    group: 'Accounts',
    render: () => <StatementOfAccountDoc />
  },
  {
    title: 'Payment Receipt',
    fileName: 'NubiaGo_Payment_Receipt',
    description: 'Cleared-payment acknowledgement with beneficiary bank details.',
    group: 'Accounts',
    render: () => <PaymentReceiptDoc />
  },
  {
    title: 'SLA Summary',
    fileName: 'NubiaGo_SLA_Summary',
    description: 'Service-level metrics table with target, actual and Met / Miss status.',
    group: 'Operations',
    render: () => <SlaSummaryDoc />
  },
  {
    title: 'Change Order',
    fileName: 'NubiaGo_Change_Order',
    description: 'Contract amendment restating revised SOW value and scope impact.',
    group: 'Legal',
    render: () => <ChangeOrderDoc />
  },
  {
    title: 'Remittance Advice',
    fileName: 'NubiaGo_Remittance_Advice',
    description: 'Payer remittance listing documents settled and total remitted.',
    group: 'Accounts',
    render: () => <RemittanceAdviceDoc />
  },
  {
    title: 'Credit Application',
    fileName: 'NubiaGo_Credit_Application',
    description: 'Trade credit application form as labeled rows for underwriting review.',
    group: 'Credit',
    render: () => <CreditApplicationDoc />
  }
];
