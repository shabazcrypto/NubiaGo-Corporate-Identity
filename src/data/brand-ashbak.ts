export interface Swatch {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  onDark?: boolean;
}

export const brandColors: Swatch[] = [
  { name: 'Primary', hex: '#000000', rgb: '0, 0, 0', cmyk: '0 / 0 / 0 / 100' },
  { name: 'Secondary', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0 / 0 / 0 / 0' },
  { name: 'Dark Gray', hex: '#111112', rgb: '17, 17, 18', cmyk: '0 / 0 / 0 / 90' },
  { name: 'Light Gray', hex: '#F4F3F9', rgb: '244, 243, 249', cmyk: '0 / 0 / 0 / 2', onDark: true }
];

export const iconColors: Swatch[] = [
  { name: 'Icon Primary', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0 / 0 / 0 / 0', onDark: true },
  { name: 'Icon Secondary', hex: '#111112', rgb: '17, 17, 18', cmyk: '0 / 0 / 0 / 90', onDark: true },
  { name: 'Icon Light', hex: '#F4F3F9', rgb: '244, 243, 249', cmyk: '0 / 0 / 0 / 2', onDark: true }
];

export const neutralColors: Swatch[] = [
  { name: 'Black', hex: '#000000', rgb: '0, 0, 0', cmyk: '0 / 0 / 0 / 100' },
  { name: 'White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0 / 0 / 0 / 0' },
  { name: 'Gray 700', hex: '#111112', rgb: '17, 17, 18', cmyk: '0 / 0 / 0 / 90' },
  { name: 'Gray 500', hex: '#F4F3F9', rgb: '244, 243, 249', cmyk: '0 / 0 / 0 / 2', onDark: true }
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

export interface CompanyInfo {
  name: string;
  legalName: string;
  parent: string;
  endorsement: string;
  endorsementShort: string;
  positioning: string;
  descriptor: string;
  tagline: string;
  mission: string;
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
  name: 'AshBak Industries',
  legalName: 'AshBak Industries Inc.',
  parent: 'AshBak Industries',
  endorsement: 'AshBak Industries is the industrial backbone of Africa.',
  endorsementShort: 'The Industrial Backbone of Africa',
  positioning: 'The Industrial Backbone of Africa',
  descriptor: 'Integrated infrastructure for commerce, payments, and logistics across African markets',
  tagline: 'Building the Industrial Backbone of Africa',
  mission: 'Providing integrated infrastructure for commerce, payments, and logistics across African markets',
  website: 'ashbakindustries.com',
  websiteUrl: 'https://www.ashbakindustries.com',
  email: 'hello@ashbakindustries.com',
  phone: '+254 (0) 000 000 0000',
  addressLine1: '',
  addressLine2: 'Nairobi',
  country: 'Kenya',
  registration: 'Reg. No. [company number]',
  taxId: 'VAT / TIN [tax number]',
  linkedin: 'linkedin.com/company/ashbak',
  copyright: '© 2026 AshBak Industries. All rights reserved.',
  guidelines: 'Brand Guidelines v1.0',
  personName: 'AshBak Industries',
  jobTitle: 'Industrial Infrastructure Provider'
};

export const editableCompanyFields: Array<{
  key: keyof CompanyInfo;
  label: string;
}> = [
  { key: 'personName', label: 'Name' },
  { key: 'jobTitle', label: 'Job title' },
  { key: 'legalName', label: 'Legal name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'mission', label: 'Mission line' },
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

export const company = defaultCompany;