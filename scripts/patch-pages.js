const fs = require('fs');
const path = require('path');

const files = [
  'Commercial.tsx',
  'DocumentCovers.tsx',
  'Catalogue.tsx',
  'Reports.tsx',
  'DigitalSocial.tsx',
  'Assets.tsx',
  'Presentation.tsx',
  'Email.tsx',
  'BrandSystem.tsx'
];

for (const file of files) {
  const p = path.join('src/pages', file);
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(
    /import \{ company \} from '\.\.\/data\/brand';\n/,
    "import { useCompany } from '@/lib/brand-context';\nimport { formats } from '@/lib/formats';\n"
  );
  s = s.replace(
    /import \{ brandColors, neutralColors, semanticColors, typeScale, voiceAndTone, company, type Swatch \} from '\.\.\/data\/brand';/,
    "import { brandColors, neutralColors, semanticColors, typeScale, voiceAndTone, type Swatch } from '../data/brand';\nimport { useCompany } from '@/lib/brand-context';\nimport { formats } from '@/lib/formats';"
  );
  s = s.replace(/\n        spec="[^"]*"/g, '');
  s = s.replace(/\n        width=\{A4\.width\}\n        height=\{A4\.height\}>/g, '\n        artboard={formats.a4}>');
  s = s.replace(/\n        width=\{SLIDE\.width\}\n        height=\{SLIDE\.height\}>/g, '\n        artboard={formats.slide}>');
  s = s.replace(
    /\n        width=\{LINK\.width\}\n        height=\{LINK\.height\}\n        formats=\{\['png', 'jpg'\]\}\n        printable=\{false\}>/g,
    '\n        artboard={formats.linkedIn}>'
  );
  s = s.replace(
    /\n        width=\{SQUARE\.width\}\n        height=\{SQUARE\.height\}\n        formats=\{\['png', 'jpg'\]\}\n        printable=\{false\}>/g,
    '\n        artboard={formats.square}>'
  );
  s = s.replace(
    /\n        width=\{960\}\n        height=\{520\}\n        printable=\{false\}>/g,
    '\n        artboard={formats.iconSheet}\n        transparent>'
  );
  s = s.replace(/\n        printable=\{false\}/g, '');
  fs.writeFileSync(p, s);
  console.log('updated', file);
}
