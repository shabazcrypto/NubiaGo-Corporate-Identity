export interface Swatch {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  onDark?: boolean;
}

export const brandColors: Swatch[] = [
  { name: 'Primary', hex: '#1E3A5F', rgb: '30, 58, 95', cmyk: '68 / 39 / 0 / 63' },
  { name: 'Primary Light', hex: '#2D5A8A', rgb: '45, 90, 138', cmyk: '67 / 35 / 0 / 46' },
  { name: 'Warm Sand', hex: '#F5F0E8', rgb: '245, 240, 232', cmyk: '0 / 2 / 5 / 4', onDark: true },
  { name: 'Gold', hex: '#C9A227', rgb: '201, 162, 39', cmyk: '0 / 19 / 81 / 21', onDark: true }
];

export const neutralColors: Swatch[] = [
  { name: 'Black', hex: '#1A1A1A', rgb: '26, 26, 26', cmyk: '0 / 0 / 0 / 90' },
  { name: 'Gray 700', hex: '#404040', rgb: '64, 64, 64', cmyk: '0 / 0 / 0 / 75' },
  { name: 'Gray 500', hex: '#737373', rgb: '115, 115, 115', cmyk: '0 / 0 / 0 / 55' },
  { name: 'Gray 200', hex: '#E5E5E5', rgb: '229, 229, 229', cmyk: '0 / 0 / 0 / 10', onDark: true },
  { name: 'White', hex: '#FAFAFA', rgb: '250, 250, 250', cmyk: '0 / 0 / 0 / 2', onDark: true }
];

export const semanticColors: Swatch[] = [
  { name: 'Success', hex: '#22C55E', rgb: '34, 197, 94', cmyk: '83 / 0 / 52 / 23' },
  { name: 'Warning', hex: '#F59E0B', rgb: '245, 158, 11', cmyk: '0 / 36 / 96 / 4' },
  { name: 'Error', hex: '#EF4444', rgb: '239, 68, 68', cmyk: '0 / 72 / 72 / 6' },
  { name: 'Info', hex: '#3B82F6', rgb: '59, 130, 246', cmyk: '76 / 47 / 0 / 4' }
];

export const typeScale = [
  { label: 'Display', size: '48px', weight: 700, tracking: '-0.03em', usage: 'Covers, slide titles, hero statements' },
  { label: 'Heading 1', size: '36px', weight: 700, tracking: '-0.02em', usage: 'Document titles, section openers' },
  { label: 'Heading 2', size: '30px', weight: 600, tracking: '-0.015em', usage: 'Slide headings, chapter titles' },
  { label: 'Heading 3', size: '20px', weight: 600, tracking: '-0.01em', usage: 'Sub-sections, card titles' },
  { label: 'Body', size: '16px', weight: 400, tracking: '0', usage: 'Running text, letters, proposals' },
  { label: 'Small', size: '14px', weight: 400, tracking: '0', usage: 'Tables, captions, secondary text' },
  { label: 'Caption', size: '11px', weight: 500, tracking: '0.08em', usage: 'Labels, footers, page numbers (uppercase)' }
];

export const voiceAndTone = [
  { title: 'Professional', body: 'Precise, clear, meaningful language' },
  { title: 'Approachable', body: 'Warm, welcoming, accessible' },
  { title: 'Trustworthy', body: 'Honest, transparent, reliable' },
  { title: 'Empowering', body: 'Inspiring action, creating possibilities' }
];

/**
 * Contact and registration details are NOT defined in the supplied brand
 * guidelines. Everything in square brackets is a clearly-marked placeholder to
 * be replaced with the company's real records before production use.
 */
export interface CompanyInfo {
  name: string;
  legalName: string;
  parent: string;
  endorsement: string;
  endorsementShort: string;
  positioning: string;
  descriptor: string;
  website: string;
  websiteUrl: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  registration: string;
  taxId: string;
  linkedin: string;
  copyright: string;
  guidelines: string;
  personName: string;
  jobTitle: string;
}

export const defaultCompany: CompanyInfo = {
  name: 'NubiaGo',
  legalName: 'NubiaGo Commerce Ltd.',
  parent: 'AshBak Industries',
  endorsement: 'NubiaGo is a brand of AshBak Industries.',
  endorsementShort: 'A brand of AshBak Industries',
  positioning: 'Infrastructure for African commerce',
  descriptor: 'A trusted, modern platform connecting buyers and sellers across the continent.',
  website: 'nubiago.com',
  websiteUrl: 'https://nubiago.com',
  email: 'support@nubiago.com',
  phone: '+234 (0) 000 000 0000',
  addressLine1: '[Street address]',
  addressLine2: 'Victoria Island, Lagos',
  country: 'Nigeria',
  registration: 'Reg. No. [company number]',
  taxId: 'VAT / TIN [tax number]',
  linkedin: 'linkedin.com/company/nubiago',
  copyright: '© 2026 NubiaGo. All rights reserved.',
  guidelines: 'Brand Guidelines v1.0',
  personName: '[Name Surname]',
  jobTitle: '[Job Title]'
};

/** Fallback for non-React modules. Prefer `useCompany()` in components. */
export const company = defaultCompany;

export const editableCompanyFields: Array<{
  key: keyof CompanyInfo;
  label: string;
}> = [
  { key: 'personName', label: 'Name' },
  { key: 'jobTitle', label: 'Job title' },
  { key: 'legalName', label: 'Legal name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'website', label: 'Website' },
  { key: 'websiteUrl', label: 'Website URL' },
  { key: 'addressLine1', label: 'Street address' },
  { key: 'addressLine2', label: 'City / area' },
  { key: 'country', label: 'Country' },
  { key: 'registration', label: 'Registration' },
  { key: 'taxId', label: 'Tax ID' },
  { key: 'linkedin', label: 'LinkedIn' }
];
