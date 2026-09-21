export interface NavItem {
  code: string;
  label: string;
  path: string;
  folder: string;
  description: string;
}

export const navigation: NavItem[] = [
{
  code: '01',
  label: 'Brand System',
  path: '/brand-system',
  folder: '01_BRAND_SYSTEM',
  description: 'Logo usage, colour, typography, spacing and shared components.'
},
{
  code: '02',
  label: 'Letterhead',
  path: '/letterhead',
  folder: '02_LETTERHEAD',
  description: 'A4 full colour, printer-friendly and continuation-page templates.'
},
{
  code: '03',
  label: 'Email',
  path: '/email',
  folder: '03_EMAIL',
  description: 'Signatures and the modular newsletter header system.'
},
{
  code: '04',
  label: 'Presentation',
  path: '/presentation',
  folder: '04_PRESENTATION',
  description: '16:9 master template with 16 reusable slide layouts.'
},
{
  code: '05',
  label: 'Commercial Documents',
  path: '/commercial',
  folder: '05_COMMERCIAL_DOCUMENTS',
  description: 'Quotation, proforma, commercial invoice and order confirmation.'
},
{
  code: '06',
  label: 'Business Card',
  path: '/business-card',
  folder: '06_BUSINESS_CARD',
  description: '3.5 × 2 in · nine duplex sets (front + back).'
},
{
  code: '07',
  label: 'Document Covers',
  path: '/document-covers',
  folder: '07_DOCUMENT_COVERS',
  description: 'Four A4 cover layouts for profiles, catalogues and proposals.'
},
{
  code: '08',
  label: 'Catalogue',
  path: '/catalogue',
  folder: '08_CATALOGUE',
  description: 'Category cover, grid, single product, specification and comparison.'
},
{
  code: '09',
  label: 'Reports',
  path: '/reports',
  folder: '09_REPORTS',
  description: 'Cover, executive summary, data pages, charts and conclusions.'
},
{
  code: '10',
  label: 'Digital & Social',
  path: '/digital-social',
  folder: '10_DIGITAL_SOCIAL',
  description: 'LinkedIn announcement formats for B2B communication.'
},
{
  code: '11',
  label: 'Assets',
  path: '/assets',
  folder: '11_ASSETS',
  description: 'Icon system, brand patterns, QR placeholders and export notes.'
},
{
  code: '12',
  label: 'Social Covers',
  path: '/social-covers',
  folder: '12_SOCIAL_COVERS',
  description: 'Platform covers, profiles and Instagram highlights for NubiaGo.'
}];
