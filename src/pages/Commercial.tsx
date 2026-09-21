import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { A4, A4Page, DocumentFooter } from '../components/documents/DocumentChrome';
import {
  DocumentTypeHeader,
  PartyBlocks,
  LineItemsTable,
  TotalsBlock,
  TermsGrid,
  SignatureRow } from
'../components/documents/CommercialParts';
import { QrPlaceholder } from '../components/brand/iconSystem';
import { company } from '../data/brand';
import { quotationItems, totals, customer, terms, bankDetails } from '../data/commercial';

const customerLines = [customer.company, customer.attention, customer.address, customer.country, customer.taxId];
const salesLines = ['[Name Surname]', '[Job Title]', company.phone, company.email];

export function CommercialPage() {
  return (
    <>
      <PageHeader
        code="05"
        title="Commercial Documents"
        folder="05_COMMERCIAL_DOCUMENTS"
        description="One document engine — header, party blocks, line-item table, totals and terms — restated as quotation, proforma, commercial invoice and order confirmation. Figures are tabular and right-aligned so totals can be checked at a glance." />
      

      <GroupLabel note="For international B2B customers">Quotation — standard</GroupLabel>
      <AssetFrame
        title="Quotation — Clean Standard"
        fileName="NubiaGo_Quotation_Standard"
        spec="A4 · 210 × 297 mm"
        description="The everyday version: light header, full line-item detail, terms grid and signature row. Lowest ink coverage of the commercial family."
        width={A4.width}
        height={A4.height}>
        
        <A4Page footer={<DocumentFooter variant="minimal" page="1 / 2" />}>
          <DocumentTypeHeader
            type="Quotation"
            reference="No. QT-2024-0417"
            meta={[
            ['Date of issue', '12 December 2024'],
            ['Valid until', '11 January 2025'],
            ['Currency', totals.currency],
            ['Prepared by', '[Name Surname]']]
            } />
          
          <PartyBlocks
            left={{ label: 'Quotation for', lines: customerLines }}
            right={{ label: 'Your contact at NubiaGo', lines: salesLines }} />
          
          <LineItemsTable items={quotationItems} currency={totals.currency} />
          <TotalsBlock
            rows={[
            ['Subtotal', totals.subtotal],
            ['Volume discount', `− ${totals.discount}`],
            [totals.taxLabel, totals.tax]]
            }
            grandLabel="Total due"
            grand={totals.grand}
            currency={totals.currency} />
          
          <TermsGrid items={terms as [string, string][]} />
          <SignatureRow />
        </A4Page>
      </AssetFrame>

      <GroupLabel note="For tenders, key accounts and first proposals">Quotation — premium sales</GroupLabel>
      <AssetFrame
        title="Quotation — Premium Sales"
        fileName="NubiaGo_Quotation_Premium"
        spec="A4 · 210 × 297 mm"
        description="Reversed header band, a summary statement above the table and bank details in the closing block. Same structure and figures as the standard version."
        width={A4.width}
        height={A4.height}>
        
        <A4Page footer={<DocumentFooter variant="full" page="1 / 3" reference="QT-2024-0417" />}>
          <DocumentTypeHeader
            tone="dark"
            type="Quotation"
            reference="No. QT-2024-0417"
            meta={[
            ['Date of issue', '12 December 2024'],
            ['Valid until', '11 January 2025'],
            ['Currency', totals.currency],
            ['Prepared by', '[Name Surname]']]
            } />
          
          <div className="mt-7 border-l-2 border-brand-gold pl-5">
            <h1 className="text-[16px] font-semibold tracking-[-0.015em] text-ink">
              Cross-border settlement across four markets
            </h1>
            <p className="mt-1.5 max-w-[520px] text-[10px] leading-[1.75] text-gray-700">
              Covering integration, merchant verification, daily reconciliation and premium support for the twelve
              months from go-live.
            </p>
          </div>
          <PartyBlocks
            left={{ label: 'Quotation for', lines: customerLines }}
            right={{ label: 'Your contact at NubiaGo', lines: salesLines }} />
          
          <LineItemsTable items={quotationItems} currency={totals.currency} />
          <TotalsBlock
            rows={[
            ['Subtotal', totals.subtotal],
            ['Volume discount', `− ${totals.discount}`],
            [totals.taxLabel, totals.tax]]
            }
            grandLabel="Total due"
            grand={totals.grand}
            currency={totals.currency} />
          
          <div className="mt-7 grid grid-cols-12 gap-8">
            <div className="col-span-8">
              <TermsGrid items={terms.slice(0, 4) as [string, string][]} />
            </div>
            <div className="col-span-4 bg-brand-sand px-5 py-4">
              <div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-brand">Payment details</div>
              <div className="mt-2 space-y-1 text-[9px] leading-[1.6] text-gray-700">
                {bankDetails.map(([label, value]) =>
                <div key={label} className="flex justify-between gap-3">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-right font-medium text-ink">{value}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-end justify-between">
            <SignatureRow />
            <div className="ml-10 shrink-0">
              <QrPlaceholder size={64} label="Accept online" />
            </div>
          </div>
        </A4Page>
      </AssetFrame>

      <GroupLabel note="Adaptable to proforma, commercial invoice and order confirmation">Invoice family</GroupLabel>

      <AssetFrame
        title="Commercial Invoice"
        fileName="NubiaGo_Commercial_Invoice"
        spec="A4 · 210 × 297 mm"
        description="Customs-ready layout: consignee and notify party, HS-style code column, declaration statement and signature. Clarity is prioritised over decoration throughout."
        width={A4.width}
        height={A4.height}>
        
        <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
          <DocumentTypeHeader
            type="Commercial Invoice"
            reference="No. INV-2024-0913"
            meta={[
            ['Invoice date', '18 December 2024'],
            ['Due date', '17 January 2025'],
            ['Order ref.', 'PO-CTP-88140'],
            ['Currency', totals.currency]]
            } />
          
          <PartyBlocks
            left={{ label: 'Bill to', lines: customerLines }}
            right={{
              label: 'Ship to / notify party',
              lines: [customer.company, 'Warehouse 4, Tema Industrial Area', 'Accra, Ghana', 'Attn. [Contact name]']
            }} />
          
          <LineItemsTable items={quotationItems} currency={totals.currency} />
          <TotalsBlock
            rows={[
            ['Subtotal', totals.subtotal],
            ['Volume discount', `− ${totals.discount}`],
            [totals.taxLabel, totals.tax]]
            }
            grandLabel="Amount payable"
            grand={totals.grand}
            currency={totals.currency} />
          
          <TermsGrid
            items={[
            ['Payment terms', '30 days net from invoice date'],
            ['Incoterms® 2020', 'DAP Accra'],
            ['Country of origin', 'Nigeria'],
            ['Reason for export', 'Sale of services'],
            ['Bank', '[Bank name] · [SWIFT code]'],
            ['Account / IBAN', '[Account number]']]
            }
            columns={3} />
          
          <p className="mt-6 border-t border-gray-200 pt-3 text-[9px] leading-[1.7] text-gray-500">
            We certify that the information on this invoice is true and correct and that the contents of this
            consignment are as stated above.
          </p>
          <SignatureRow left="Authorised signature · NubiaGo" right="Company stamp" />
        </A4Page>
      </AssetFrame>

      <AssetFrame
        title="Proforma Invoice"
        fileName="NubiaGo_Proforma_Invoice"
        spec="A4 · 210 × 297 mm"
        description="Same engine, marked as proforma for advance payment and import licensing. A status band states explicitly that it is not a tax invoice."
        width={A4.width}
        height={A4.height}>
        
        <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
          <DocumentTypeHeader
            type="Proforma Invoice"
            reference="No. PI-2024-0412"
            meta={[
            ['Date of issue', '12 December 2024'],
            ['Valid until', '11 January 2025'],
            ['Payment', '100% in advance'],
            ['Currency', totals.currency]]
            } />
          
          <div className="mt-6 flex items-center gap-3 border-l-2 border-state-warning bg-gray-50 px-4 py-2.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-state-warning">Proforma</span>
            <span className="text-[9.5px] text-gray-700">
              This document is issued for payment and customs purposes only. It is not a tax invoice.
            </span>
          </div>
          <PartyBlocks
            left={{ label: 'Issued to', lines: customerLines }}
            right={{ label: 'Your contact at NubiaGo', lines: salesLines }} />
          
          <LineItemsTable items={quotationItems.slice(0, 3)} currency={totals.currency} />
          <TotalsBlock
            rows={[
            ['Subtotal', '24,750.00'],
            [totals.taxLabel, '1,856.25']]
            }
            grandLabel="Advance payable"
            grand="26,606.25"
            currency={totals.currency}
            emphasis="sand" />
          
          <TermsGrid
            items={[
            ['Payment', '100% in advance by bank transfer'],
            ['Delivery terms', 'DAP Accra (Incoterms® 2020)'],
            ['Bank', '[Bank name] · [SWIFT code]'],
            ['Account / IBAN', '[Account number]']]
            } />
          
          <SignatureRow left="For NubiaGo" right="Customer confirmation" />
        </A4Page>
      </AssetFrame>

      <AssetFrame
        title="Order Confirmation"
        fileName="NubiaGo_Order_Confirmation"
        spec="A4 · 210 × 297 mm"
        description="Confirms an accepted order: status band in Success, confirmed delivery schedule table and no payment request."
        width={A4.width}
        height={A4.height}>
        
        <A4Page footer={<DocumentFooter variant="minimal" page="1 / 1" />}>
          <DocumentTypeHeader
            type="Order Confirmation"
            reference="No. OC-2024-0488"
            meta={[
            ['Confirmed on', '19 December 2024'],
            ['Customer order', 'PO-CTP-88140'],
            ['Quotation ref.', 'QT-2024-0417'],
            ['Currency', totals.currency]]
            } />
          
          <div className="mt-6 flex items-center gap-3 border-l-2 border-state-success bg-gray-50 px-4 py-2.5">
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-state-success">Confirmed</span>
            <span className="text-[9.5px] text-gray-700">
              Your order has been accepted. No action is required until the first invoice is issued.
            </span>
          </div>
          <PartyBlocks
            left={{ label: 'Customer', lines: customerLines }}
            right={{ label: 'Account manager', lines: salesLines }} />
          
          <LineItemsTable items={quotationItems} currency={totals.currency} />
          <div className="mt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Delivery schedule</h2>
            <table className="mt-3 w-full border-collapse text-[9.5px]">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                  <th className="py-2 font-semibold uppercase tracking-[0.08em]">Milestone</th>
                  <th className="py-2 font-semibold uppercase tracking-[0.08em]">Scope</th>
                  <th className="py-2 text-right font-semibold uppercase tracking-[0.08em]">Target date</th>
                </tr>
              </thead>
              <tbody>
                {[
                ['Kick-off', 'Scope confirmation and sandbox access', '06 January 2025'],
                ['Integration complete', 'API build and test transactions signed off', '03 February 2025'],
                ['First market live', 'Ghana corridor in production', '10 February 2025'],
                ['Full rollout', 'All four markets settling', '24 March 2025']].
                map((row, index) =>
                <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="border-b border-gray-200 px-0 py-2.5 font-semibold text-ink">{row[0]}</td>
                    <td className="border-b border-gray-200 py-2.5 text-gray-700">{row[1]}</td>
                    <td className="border-b border-gray-200 py-2.5 text-right tabular-nums text-ink">{row[2]}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <TermsGrid
            items={[
            ['Payment terms', '30 days net, invoiced per milestone'],
            ['Delivery terms', 'DAP Accra (Incoterms® 2020)']]
            } />
          
        </A4Page>
      </AssetFrame>
    </>);

}