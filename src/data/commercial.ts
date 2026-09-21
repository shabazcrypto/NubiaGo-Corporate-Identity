export interface LineItem {
  code: string;
  description: string;
  detail: string;
  qty: string;
  unit: string;
  unitPrice: string;
  total: string;
}

export const quotationItems: LineItem[] = [
{
  code: 'NG-SET-100',
  description: 'Settlement API integration',
  detail: 'Four markets · sandbox, staged rollout, production support',
  qty: '1',
  unit: 'project',
  unitPrice: '12,400.00',
  total: '12,400.00'
},
{
  code: 'NG-ONB-020',
  description: 'Merchant onboarding & verification',
  detail: 'Identity, sanctions and document screening per merchant',
  qty: '250',
  unit: 'merchant',
  unitPrice: '35.00',
  total: '8,750.00'
},
{
  code: 'NG-REC-010',
  description: 'Automated reconciliation',
  detail: 'Daily statement, ISO 20022 and CSV delivery',
  qty: '12',
  unit: 'month',
  unitPrice: '300.00',
  total: '3,600.00'
},
{
  code: 'NG-SUP-030',
  description: 'Premium support retainer',
  detail: '24/5 coverage with named account manager',
  qty: '12',
  unit: 'month',
  unitPrice: '450.00',
  total: '5,400.00'
}];


export const totals = {
  subtotal: '30,150.00',
  discount: '1,507.50',
  taxLabel: 'VAT 7.5%',
  tax: '2,148.19',
  grand: '30,790.69',
  currency: 'USD'
};

export const customer = {
  company: 'Continental Trade Partners Ltd.',
  attention: 'Ms. Amara Okonkwo · Director of Procurement',
  address: '14 Marina Road, Accra',
  country: 'Ghana',
  taxId: 'TIN C0012345678'
};

export const terms = [
['Payment terms', '30 days net from invoice date'],
['Delivery terms', 'DAP Accra (Incoterms® 2020)'],
['Lead time', '12 weeks from signature; first market live week 5'],
['Currency', 'All amounts in USD unless stated otherwise'],
['Validity', '30 days from the date of issue'],
['Warranty', '12 months on integration defects']];


export const bankDetails = [
['Beneficiary', 'NubiaGo Commerce Ltd.'],
['Bank', '[Bank name], Lagos'],
['Account / IBAN', '[Account number]'],
['SWIFT / BIC', '[SWIFT code]']];