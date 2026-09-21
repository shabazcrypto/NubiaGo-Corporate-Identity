import fs from 'fs';

const files = [
  'src/App.tsx',
  'src/index.tsx',
  'src/components/brand/Logo.tsx',
  'src/components/documents/CommercialParts.tsx',
  'src/components/presentation/slidesCore.tsx',
  'src/components/presentation/slidesData.tsx',
  'src/pages/Assets.tsx',
  'src/pages/BrandSystem.tsx',
  'src/pages/BusinessCard.tsx',
  'src/pages/Catalogue.tsx',
  'src/pages/Commercial.tsx',
  'src/pages/DigitalSocial.tsx',
  'src/pages/DocumentCovers.tsx',
  'src/pages/Letterhead.tsx',
  'src/pages/Presentation.tsx',
  'src/pages/Reports.tsx'
];

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  s = s.replace(/^import React from ['"]react['"];\r?\n/m, '');
  s = s.replace(/^import \{ formats \} from ['"]@\/lib\/formats['"];\r?\n/m, (match) =>
    file.includes('BrandSystem') ? '' : match
  );
  s = s.replace(/^import \{ A4 \} from ['"].*DocumentChrome['"];\r?\n/m, '');
  s = s.replace(/^import \{ SLIDE \} from ['"].*SlideChrome['"];\r?\n/m, '');
  s = s.replace(/import \{ A4, /g, 'import { ');
  s = s.replace(/^const LINK = \{ width: 1200, height: 627 \};\r?\n/m, '');
  s = s.replace(/^const SQUARE = \{ width: 1080, height: 1080 \};\r?\n/m, '');
  fs.writeFileSync(file, s);
  console.log('cleaned', file);
}
