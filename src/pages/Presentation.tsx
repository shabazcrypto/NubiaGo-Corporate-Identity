import React from 'react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { SLIDE } from '../components/presentation/SlideChrome';
import {
  CoverSlide,
  SectionDividerSlide,
  CompanyIntroSlide,
  AboutSlide,
  KeyNumbersSlide,
  ProductCategoriesSlide,
  ComparisonSlide,
  SpecificationSlide,
  ImageTextSlide } from
'../components/presentation/slidesCore';
import {
  TwoColumnSlide,
  ThreeColumnSlide,
  ProcessSlide,
  TimelineSlide,
  ChartSlide,
  PartnerLogosSlide,
  QuoteSlide,
  ContactSlide } from
'../components/presentation/slidesData';

interface SlideEntry {
  title: string;
  fileName: string;
  description: string;
  render: () => JSX.Element;
}

const slides: SlideEntry[] = [
{
  title: '01 — Cover / Title',
  fileName: 'NubiaGo_Slide_01_Cover',
  description: 'Reversed Primary field, wordmark top-left, positioning statement as the headline, client line at the base.',
  render: () => <CoverSlide />
},
{
  title: '02 — Section Divider',
  fileName: 'NubiaGo_Slide_02_Section_Divider',
  description: 'Reversed slide with Gold section number. Resets attention between chapters without repeating the cover.',
  render: () => <SectionDividerSlide />
},
{
  title: '03 — Company Introduction',
  fileName: 'NubiaGo_Slide_03_Company_Introduction',
  description: '7/5 split: narrative on the left, a Warm Sand panel carrying positioning and tone on the right.',
  render: () => <CompanyIntroSlide />
},
{
  title: '04 — About NubiaGo',
  fileName: 'NubiaGo_Slide_04_About',
  description: 'Four capability columns on a hairline grid, each with one icon and a shared baseline footer line.',
  render: () => <AboutSlide />
},
{
  title: '05 — Company Facts / Key Numbers',
  fileName: 'NubiaGo_Slide_05_Key_Numbers',
  description: 'Four headline figures over a secondary row of company facts, separated by a rule.',
  render: () => <KeyNumbersSlide />
},
{
  title: '06 — Products / Categories',
  fileName: 'NubiaGo_Slide_06_Product_Categories',
  description: 'Six equal cards with image areas above a caption row. Category names and SKU counts stay aligned.',
  render: () => <ProductCategoriesSlide />
},
{
  title: '07 — Product Comparison',
  fileName: 'NubiaGo_Slide_07_Comparison',
  description: 'Comparison table with the NubiaGo column highlighted in Warm Sand and a Primary header cell.',
  render: () => <ComparisonSlide />
},
{
  title: '08 — Product Specification / Technical Data',
  fileName: 'NubiaGo_Slide_08_Specification',
  description: 'Product image beside a two-column technical table with zebra rows for scanning.',
  render: () => <SpecificationSlide />
},
{
  title: '09 — Image + Text',
  fileName: 'NubiaGo_Slide_09_Image_Text',
  description: 'Full-bleed half-slide image against a text column. Footer is repeated inside the text half.',
  render: () => <ImageTextSlide />
},
{
  title: '10 — Two-Column Content',
  fileName: 'NubiaGo_Slide_10_Two_Column',
  description: 'Balanced comparison of two lists under matching headings, with Gold bullet marks.',
  render: () => <TwoColumnSlide />
},
{
  title: '11 — Three-Column Content',
  fileName: 'NubiaGo_Slide_11_Three_Column',
  description: 'Three tiers with the recommended option reversed in Primary. Footer lines share a baseline.',
  render: () => <ThreeColumnSlide />
},
{
  title: '12 — Process / Workflow',
  fileName: 'NubiaGo_Slide_12_Process',
  description: 'Four numbered stages on a connecting rule — for sequential content that a card grid would flatten.',
  render: () => <ProcessSlide />
},
{
  title: '13 — Timeline',
  fileName: 'NubiaGo_Slide_13_Timeline',
  description: 'Year-led rows on hairline separators; the current year is marked with a Gold square.',
  render: () => <TimelineSlide />
},
{
  title: '14 — Chart / Data Visualisation',
  fileName: 'NubiaGo_Slide_14_Chart',
  description: 'Bar chart in Primary Light with the latest period in Gold, plus a commentary column and source line.',
  render: () => <ChartSlide />
},
{
  title: '15 — Customer / Partner Logos',
  fileName: 'NubiaGo_Slide_15_Partner_Logos',
  description: 'Ten evenly weighted logo cells on a hairline grid. Placeholders are replaced with cleared partner marks.',
  render: () => <PartnerLogosSlide />
},
{
  title: '16 — Quote / Key Statement',
  fileName: 'NubiaGo_Slide_16_Quote',
  description: 'A single reversed statement at Display scale with attribution below a rule.',
  render: () => <QuoteSlide />
},
{
  title: '17 — Contact / Closing',
  fileName: 'NubiaGo_Slide_17_Contact',
  description: 'Closing ask, full contact block with icons, QR placeholder and the legal line.',
  render: () => <ContactSlide />
}];


export function PresentationPage() {
  return (
    <>
      <PageHeader
        code="04"
        title="Corporate Presentation Template"
        folder="04_PRESENTATION"
        description="A 1280 × 720 master with 17 reusable layouts on one grid: 64 px margins, a fixed heading block, and a footer carrying the wordmark, domain and slide number on every content slide." />
      

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
        ['Artboard', '1280 × 720 px · 16:9'],
        ['Margins', '64 px on all sides'],
        ['Heading block', 'Eyebrow 12 px · Title 34 px · Lead 15 px']].
        map(([label, value]) =>
        <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        )}
      </div>

      <GroupLabel note="Export each slide as PNG, or print the deck to PDF">Slide layouts</GroupLabel>

      {slides.map((slide) =>
      <AssetFrame
        key={slide.fileName}
        title={slide.title}
        fileName={slide.fileName}
        spec="Slide · 1280 × 720 px"
        description={slide.description}
        width={SLIDE.width}
        height={SLIDE.height}>
        
          {slide.render()}
        </AssetFrame>
      )}
    </>);

}