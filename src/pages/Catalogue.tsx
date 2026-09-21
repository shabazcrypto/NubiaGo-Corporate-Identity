import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { NG_STROKE, iconByKey, QrPlaceholder } from '../components/brand/iconSystem';
import { useCompany } from '@/lib/brand-context';
import { formats } from '@/lib/formats';
import { HERO } from '@/components/social/heroCatalog';
import {
  CatalogueToc,
  CatalogueLifestyleTextiles,
  CatalogueLifestyleAgri,
  CatalogueLifestyleLogistics,
  CatalogueSupplierStory
} from '@/components/catalogue/CatalogueExtras';

const PAD = 56;

function CatalogueSpread({
  section,
  page,
  children




}: {section: string;page: string;children: React.ReactNode;}) {
  const company = useCompany();
  return (
    <div className="flex h-full w-full flex-col bg-white" style={{ padding: PAD, paddingBottom: 32 }}>
      <header className="flex shrink-0 items-baseline justify-between border-b border-gray-200 pb-3">
        <Logo size={14} />
        <span className="text-[8.5px] font-medium uppercase tracking-[0.14em] text-gray-500">{section}</span>
      </header>
      <div className="min-h-0 flex-1 pt-7">{children}</div>
      <footer className="flex shrink-0 items-center justify-between border-t border-gray-200 pt-3 text-[8.5px] text-gray-500">
        <span>
          {company.website} · {company.email} · {company.endorsement}
        </span>
        <span className="tabular-nums">{page}</span>
      </footer>
    </div>);

}

const specRows: [string, string][] = [
['Model', 'NG-IND-4200'],
['Rated capacity', '4,200 kg'],
['Power supply', '380–415 V / 50 Hz / 3 ph'],
['Motor output', '11 kW continuous'],
['Operating temperature', '−10 °C to +55 °C'],
['Protection class', 'IP 65'],
['Dimensions (L × W × H)', '2,400 × 1,180 × 1,650 mm'],
['Net weight', '1,840 kg'],
['Certification', 'CE · ISO 9001 · SONCAP'],
['Warranty', '24 months parts and labour']];


export function CataloguePage() {
  const company = useCompany();

  const Product = iconByKey('product');
  const Spec = iconByKey('spec');
  const Cert = iconByKey('certification');
  const Ship = iconByKey('shipping');

  return (
    <>
      <PageHeader
        code="08"
        title="Product Catalogue"
        folder="08_CATALOGUE"
        description="A B2B catalogue system with TOC, photo-led category openers, supplier story, grid, specs and contact — shared running header/footer." />
      

      <GroupLabel note="Front matter">Contents</GroupLabel>
      <AssetFrame
        title="Catalogue — Contents"
        fileName="NubiaGo_Catalogue_00_Contents"
        description="Numbered sections with dotted leaders — reorder freely when categories change."
        artboard={formats.a4}
      >
        <CatalogueToc />
      </AssetFrame>

      <GroupLabel note="Opens each category section">Category covers</GroupLabel>
      <AssetFrame
        title="Catalogue — Category Cover"
        fileName="NubiaGo_Catalogue_01_Category_Cover"
        description="Reversed lower field carrying the category number and name, with the image band above."
        artboard={formats.a4}>
        
        <div className="flex h-full w-full flex-col bg-white">
          <div className="flex items-end justify-between px-14 pb-8 pt-12">
            <Logo size={20} />
            <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-gray-500">Catalogue 2025</span>
          </div>
          <div
            className="relative flex flex-1 items-end"
            style={{
              backgroundImage: `url(${HERO.warehouse})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(0deg, rgba(30,58,95,0.55) 0%, transparent 55%)' }}
            />
          </div>
          <div className="bg-brand px-14 py-12">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Category 01</div>
            <h1 className="mt-3 text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              Industrial equipment
            </h1>
            <p className="mt-3 max-w-[460px] text-[13px] leading-[1.7] text-white/65">
              1,240 verified SKUs across handling, processing and power, with published specification data for every
              line.
            </p>
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Catalogue — Textiles & Apparel"
        fileName="NubiaGo_Catalogue_Category_Textiles"
        description="Lifestyle opener — atelier photography with navy title band."
        artboard={formats.a4}
      >
        <CatalogueLifestyleTextiles />
      </AssetFrame>
      <AssetFrame
        title="Catalogue — Agri Commodities"
        fileName="NubiaGo_Catalogue_Category_Agri"
        description="Lifestyle opener — market / spices photography."
        artboard={formats.a4}
      >
        <CatalogueLifestyleAgri />
      </AssetFrame>
      <AssetFrame
        title="Catalogue — Logistics & Fulfilment"
        fileName="NubiaGo_Catalogue_Category_Logistics"
        description="Lifestyle opener — shipping photography."
        artboard={formats.a4}
      >
        <CatalogueLifestyleLogistics />
      </AssetFrame>

      <GroupLabel note="Partner narrative">Supplier story</GroupLabel>
      <AssetFrame
        title="Catalogue — Supplier Story"
        fileName="NubiaGo_Catalogue_Supplier_Story"
        description="Split photo + quote narrative for featured partners."
        artboard={formats.a4}
      >
        <CatalogueSupplierStory />
      </AssetFrame>

      <GroupLabel note="Sets context before the product pages">Product introduction</GroupLabel>
      <AssetFrame
        title="Catalogue — Product Introduction"
        fileName="NubiaGo_Catalogue_02_Introduction"
        description="Narrative column beside four capability marks, closing on the category index so buyers can jump straight to a range."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Industrial equipment · Introduction" page="03">
          <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
            Equipment sourced against a published specification
          </h1>
          <BrandRule width={72} thickness={3} />
          <div className="mt-6 grid grid-cols-12 gap-10">
            <div className="col-span-7 space-y-3.5 text-[10.5px] leading-[1.85] text-gray-700">
              <p>
                Every line in this catalogue is listed with the specification the supplier is contractually held to.
                Where a certification is claimed, the certificate is on file and available on request.
              </p>
              <p>
                Lead times assume DAP delivery to the port of entry stated in your quotation. Where a shorter lead time
                is required, stocked alternatives are marked in the product tables.
              </p>
              <p>
                Prices are quoted per unit in USD and exclude duties and local taxes unless the quotation states
                otherwise. Volume tiers begin at ten units.
              </p>
            </div>
            <div className="col-span-5 space-y-5">
              {[
              [Product, 'Verified supply', '1,240 SKUs with supplier documentation on file'],
              [Spec, 'Published specification', 'Technical data confirmed before listing'],
              [Cert, 'Certification', 'CE, ISO and SONCAP where applicable'],
              [Ship, 'Delivery', 'DAP to your port of entry, Incoterms® 2020']].
              map(([Icon, title, body], index) => {
                const Component = Icon as typeof Product;
                return (
                  <div key={index} className="flex gap-3.5 border-t border-gray-200 pt-4">
                    <Component className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={NG_STROKE} />
                    <div>
                      <div className="text-[11px] font-semibold text-ink">{title as string}</div>
                      <div className="mt-0.5 text-[9.5px] leading-[1.6] text-gray-500">{body as string}</div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
          <div className="mt-9">
            <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">In this section</div>
            <ul className="mt-3 grid grid-cols-2 gap-x-10">
              {[
              ['Material handling', '04'],
              ['Processing lines', '09'],
              ['Power & generation', '14'],
              ['Spare parts programme', '19']].
              map(([title, page]) =>
              <li key={title} className="flex items-baseline justify-between border-b border-gray-200 py-2.5">
                  <span className="text-[11px] text-ink">{title}</span>
                  <span className="text-[10px] tabular-nums text-gray-500">{page}</span>
                </li>
              )}
            </ul>
          </div>
        </CatalogueSpread>
      </AssetFrame>

      <GroupLabel note="Six products per page">Product grid</GroupLabel>
      <AssetFrame
        title="Catalogue — Product Grid"
        fileName="NubiaGo_Catalogue_03_Product_Grid"
        description="A 2 × 3 grid with shared baselines: image, model code, name, one-line description and a key figure in the same position on every card."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Industrial equipment · Material handling" page="04">
          <div className="grid h-full grid-cols-2 grid-rows-3 gap-x-8 gap-y-7">
            {[
            ['NG-IND-4200', 'Pallet handling unit', 'Electro-hydraulic, 4,200 kg rated capacity', '4,200 kg'],
            ['NG-IND-3100', 'Conveyor module', 'Modular belt, 12 m configurable length', '12 m'],
            ['NG-IND-2600', 'Stacker crane', 'Narrow-aisle, 8.5 m lift height', '8.5 m'],
            ['NG-IND-5400', 'Industrial scale', 'Platform, 3,000 kg, IP 68 load cells', '3,000 kg'],
            ['NG-IND-1800', 'Roller table', 'Gravity-fed, 1.8 m sections', '1.8 m'],
            ['NG-IND-7700', 'Lift table', 'Scissor, 2,000 kg, 1.4 m travel', '2,000 kg']].
            map(([code, name, body, figure]) =>
            <article key={code} className="flex flex-col border border-gray-200">
                <div className="flex flex-1 items-center justify-center bg-gray-50">
                  <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-gray-200">Product image</span>
                </div>
                <div className="flex flex-col px-4 py-3.5">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.12em] text-brand-light">{code}</div>
                  <h3 className="mt-1 text-[12px] font-semibold tracking-[-0.01em] text-ink">{name}</h3>
                  <p className="mt-1 text-[9px] leading-[1.6] text-gray-500">{body}</p>
                  <div className="mt-3 flex items-baseline justify-between border-t border-gray-200 pt-2">
                    <span className="text-[8px] uppercase tracking-[0.12em] text-gray-500">Capacity</span>
                    <span className="text-[11px] font-semibold tabular-nums text-brand">{figure}</span>
                  </div>
                </div>
              </article>
            )}
          </div>
        </CatalogueSpread>
      </AssetFrame>

      <GroupLabel note="One product, full detail">Single product</GroupLabel>
      <AssetFrame
        title="Catalogue — Single Product"
        fileName="NubiaGo_Catalogue_04_Single_Product"
        description="Hero image, model code, key figures and a short technical extract. Full data continues on the specification page."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Industrial equipment · NG-IND-4200" page="05">
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-7">
              <div className="flex aspect-[4/3] items-center justify-center bg-brand-sand">
                <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-gray-500">
                  Primary product image
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {['Detail 01', 'Detail 02', 'Detail 03'].map((label) =>
                <div key={label} className="flex aspect-[4/3] items-center justify-center bg-gray-50">
                    <span className="text-[8px] uppercase tracking-[0.12em] text-gray-200">{label}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-5">
              <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-light">NG-IND-4200</div>
              <h1 className="mt-2 text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
                Pallet handling unit
              </h1>
              <p className="mt-3 text-[10.5px] leading-[1.8] text-gray-700">
                Electro-hydraulic handling unit for continuous duty in warehouse and port environments. Supplied
                commissioned, with a 24-month parts and labour warranty.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-5">
                {[
                ['4,200 kg', 'Rated capacity'],
                ['11 kW', 'Motor output'],
                ['IP 65', 'Protection class'],
                ['24 mo.', 'Warranty']].
                map(([value, label]) =>
                <div key={label} className="border-t-2 border-brand pt-2.5">
                    <div className="text-[20px] font-bold tracking-[-0.02em] text-brand">{value}</div>
                    <div className="mt-0.5 text-[8.5px] font-medium uppercase tracking-[0.12em] text-gray-500">
                      {label}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-7 bg-gray-50 px-4 py-3.5">
                <div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-brand">Included</div>
                <ul className="mt-2 space-y-1 text-[9.5px] leading-[1.6] text-gray-700">
                  <li>Commissioning and operator training</li>
                  <li>Spare parts kit for first 12 months</li>
                  <li>Certification pack (CE · ISO 9001 · SONCAP)</li>
                </ul>
              </div>
              <div className="mt-6 flex items-end justify-between">
                <div>
                  <div className="text-[8.5px] uppercase tracking-[0.12em] text-gray-500">From</div>
                  <div className="text-[18px] font-bold tabular-nums text-ink">USD 18,400</div>
                  <div className="text-[8.5px] text-gray-500">per unit, DAP · volume tiers from 10</div>
                </div>
                <QrPlaceholder size={56} label="Product page" />
              </div>
            </div>
          </div>
        </CatalogueSpread>
      </AssetFrame>

      <GroupLabel note="Full technical data">Specification &amp; technical table</GroupLabel>
      <AssetFrame
        title="Catalogue — Specification Page"
        fileName="NubiaGo_Catalogue_05_Specification"
        description="Two-column technical table with zebra rows, a dimensional diagram area and the certification block beneath."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Industrial equipment · Technical data" page="06">
          <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
            NG-IND-4200 — technical specification
          </h1>
          <BrandRule width={56} thickness={3} />
          <div className="mt-6 grid grid-cols-12 gap-9">
            <div className="col-span-7">
              <table className="w-full border-collapse text-[9.5px]">
                <tbody>
                  {specRows.map(([label, value], index) =>
                  <tr key={label} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="w-[46%] border-b border-gray-200 px-3 py-2.5 font-medium text-gray-500">
                        {label}
                      </td>
                      <td className="border-b border-gray-200 px-3 py-2.5 text-ink">{value}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-span-5">
              <div className="flex aspect-square items-center justify-center border border-gray-200">
                <span className="text-[8.5px] font-medium uppercase tracking-[0.12em] text-gray-200">
                  Dimensional drawing
                </span>
              </div>
              <div className="mt-4 bg-brand-sand px-4 py-3.5">
                <div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-brand">Certification</div>
                <div className="mt-2 space-y-1 text-[9.5px] text-gray-700">
                  <div>CE conformity · file 2024/118</div>
                  <div>ISO 9001:2015 · supplier audited</div>
                  <div>SONCAP · certificate on request</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 border-t border-gray-200 pt-4 text-[9px] leading-[1.7] text-gray-500">
            Specifications are subject to change without notice. Where a value affects contractual performance, the
            figure stated in the quotation prevails.
          </div>
        </CatalogueSpread>
      </AssetFrame>

      <GroupLabel note="Ranges side by side">Comparison &amp; product family</GroupLabel>
      <AssetFrame
        title="Catalogue — Product Comparison"
        fileName="NubiaGo_Catalogue_06_Comparison"
        description="Three models compared on the same attributes, with the recommended configuration held in Warm Sand."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Industrial equipment · Comparison" page="07">
          <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
            Selecting between the 2600, 4200 and 7700
          </h1>
          <table className="mt-6 w-full border-collapse text-[9.5px]">
            <thead>
              <tr>
                <th className="w-[28%] border-b border-gray-200 px-3 py-3 text-left text-[8.5px] font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Attribute
                </th>
                <th className="border-b border-gray-200 px-3 py-3 text-left text-[11px] font-semibold text-gray-700">
                  NG-IND-2600
                </th>
                <th className="bg-brand px-3 py-3 text-left text-[11px] font-semibold text-white">NG-IND-4200</th>
                <th className="border-b border-gray-200 px-3 py-3 text-left text-[11px] font-semibold text-gray-700">
                  NG-IND-7700
                </th>
              </tr>
            </thead>
            <tbody>
              {[
              ['Rated capacity', '2,600 kg', '4,200 kg', '7,700 kg'],
              ['Motor output', '7.5 kW', '11 kW', '18.5 kW'],
              ['Protection class', 'IP 54', 'IP 65', 'IP 65'],
              ['Duty cycle', 'Intermittent', 'Continuous', 'Continuous'],
              ['Lead time', '6 weeks', '8 weeks', '12 weeks'],
              ['Typical application', 'Light warehouse', 'Warehouse & port', 'Heavy port'],
              ['Indicative price', 'USD 11,900', 'USD 18,400', 'USD 31,200']].
              map((row, index) =>
              <tr key={row[0]} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                  <td className="border-b border-gray-200 px-3 py-2.5 font-medium text-ink">{row[0]}</td>
                  <td className="border-b border-gray-200 px-3 py-2.5 text-gray-700">{row[1]}</td>
                  <td className="border-b border-gray-200 bg-brand-sand px-3 py-2.5 font-semibold text-brand">
                    {row[2]}
                  </td>
                  <td className="border-b border-gray-200 px-3 py-2.5 text-gray-700">{row[3]}</td>
                </tr>
              )}
            </tbody>
          </table>

          <h2 className="mt-9 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">Product family</h2>
          <div className="mt-4 grid grid-cols-4 gap-5">
            {['NG-IND-1800', 'NG-IND-2600', 'NG-IND-4200', 'NG-IND-7700'].map((code) =>
            <div key={code} className="border border-gray-200">
                <div className="flex aspect-[4/3] items-center justify-center bg-gray-50">
                  <span className="text-[7.5px] uppercase tracking-[0.12em] text-gray-200">Image</span>
                </div>
                <div className="px-3 py-2.5 text-[9px] font-semibold text-ink">{code}</div>
              </div>
            )}
          </div>
        </CatalogueSpread>
      </AssetFrame>

      <GroupLabel note="Closes the catalogue">Contact page</GroupLabel>
      <AssetFrame
        title="Catalogue — Contact Page"
        fileName="NubiaGo_Catalogue_07_Contact"
        description="How to order, regional contacts and QR placeholders for the full catalogue and company profile."
        artboard={formats.a4}>
        
        <CatalogueSpread section="Contact" page="24">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
                How to order
              </h1>
              <BrandRule width={72} thickness={3} />
              <div className="mt-7 grid grid-cols-3 gap-7">
                {[
                ['01', 'Send your list', 'Model codes and quantities to the address below.'],
                ['02', 'Receive a quotation', 'Indicative pricing and lead times within two business days.'],
                ['03', 'Confirm', 'Order confirmation issued on acceptance, with a delivery schedule.']].
                map(([step, title, body]) =>
                <div key={step}>
                    <div className="flex h-8 w-8 items-center justify-center bg-brand text-[11px] font-semibold text-white">
                      {step}
                    </div>
                    <div className="mt-3.5 text-[12px] font-semibold text-ink">{title}</div>
                    <p className="mt-1 text-[9.5px] leading-[1.7] text-gray-700">{body}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-7 border-t border-gray-200 pt-7">
              {[
              ['West Africa', `${company.addressLine2}, ${company.country}`, company.phone],
              ['East Africa', 'Nairobi, Kenya', '+254 (0) 000 000 000'],
              ['General enquiries', company.email, company.website]].
              map(([label, line1, line2]) =>
              <div key={label}>
                  <div className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-brand">{label}</div>
                  <div className="mt-2 text-[10px] leading-[1.7] text-gray-700">
                    <div>{line1}</div>
                    <div>{line2}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-brand px-8 py-7">
              <div className="flex items-end justify-between">
                <Logo size={20} tone="light" />
                <div className="flex gap-6">
                  <QrPlaceholder size={60} label="Full catalogue" tone="dark" />
                  <QrPlaceholder size={60} label="Company profile" tone="dark" />
                </div>
              </div>
              <div className="mt-6 border-t border-white/15 pt-3 text-[9px] text-white/60">
                {company.endorsement} · {company.website} · {company.email}
              </div>
            </div>
          </div>
        </CatalogueSpread>
      </AssetFrame>
    </>);

}