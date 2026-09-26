import { useEffect, useRef, useState } from 'react';
import { DownloadIcon, Loader2Icon } from 'lucide-react';
import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { LazyMount } from '../components/ui/LazyMount';
import { Button } from '@/components/ui/button';
import {
  CoverSlide,
  SectionDividerSlide,
  CompanyIntroSlide,
  AboutSlide,
  KeyNumbersSlide,
  ProductCategoriesSlide,
  ComparisonSlide,
  SpecificationSlide,
  ImageTextSlide
} from '../components/presentation/slidesCore';
import {
  TwoColumnSlide,
  ThreeColumnSlide,
  ProcessSlide,
  TimelineSlide,
  ChartSlide,
  PartnerLogosSlide,
  QuoteSlide,
  ContactSlide
} from '../components/presentation/slidesData';
import {
  AgendaSlide,
  ProblemOpportunitySlide,
  SolutionOverviewSlide,
  MarketMapSlide,
  CaseStudySlide,
  RiskComplianceSlide,
  TeamOrgSlide,
  RoadmapSlide,
  PricingMatrixSlide,
  NextStepsSlide
} from '../components/presentation/slidesEnterprise';
import { formats } from '@/lib/formats';
import { useBrandSettings } from '@/lib/brand-context';
import { exportDeckPdf, exportSlidesPngZip } from '@/utils/exportAsset';

interface SlideEntry {
  title: string;
  fileName: string;
  description: string;
  render: () => JSX.Element;
}

function getSlides(brand: string): SlideEntry[] {
  const isAshBak = brand === 'ashbak';
  const prefix = isAshBak ? 'AshBak' : 'NubiaGo';

  return [
    {
      title: '01 — Cover / Title',
      fileName: `${prefix}_Slide_01_Cover`,
      description:
        'Reversed Primary field, wordmark top-left, positioning statement as the headline, client line at the base.',
      render: () => <CoverSlide />
    },
    {
      title: '02 — Section Divider',
      fileName: `${prefix}_Slide_02_Section_Divider`,
      description: 'Reversed slide with Gold section number. Resets attention between chapters without repeating the cover.',
      render: () => <SectionDividerSlide />
    },
    {
      title: '03 — Company Introduction',
      fileName: `${prefix}_Slide_03_Company_Introduction`,
      description: '7/5 split: narrative on the left, a Light Gray panel carrying positioning and tone on the right.',
      render: () => <CompanyIntroSlide />
    },
    {
      title: '04 — About ' + (isAshBak ? 'AshBak Industries' : 'NubiaGo'),
      fileName: `${prefix}_Slide_04_About`,
      description: 'Four capability columns on a hairline grid, each with one icon and a shared baseline footer line.',
      render: () => <AboutSlide />
    },
    {
      title: '05 — Company Facts / Key Numbers',
      fileName: `${prefix}_Slide_05_Key_Numbers`,
      description: 'Four headline figures over a secondary row of company facts, separated by a rule.',
      render: () => <KeyNumbersSlide />
    },
    {
      title: '06 — Products / Categories',
      fileName: `${prefix}_Slide_06_Product_Categories`,
      description: 'Six equal cards with image areas above a caption row. Category names and SKU counts stay aligned.',
      render: () => <ProductCategoriesSlide />
    },
    {
      title: '07 — Product Comparison',
      fileName: `${prefix}_Slide_07_Comparison`,
      description: 'Comparison table with the brand column highlighted in Light Gray and a Primary header cell.',
      render: () => <ComparisonSlide />
    },
    {
      title: '08 — Product Specification / Technical Data',
      fileName: `${prefix}_Slide_08_Specification`,
      description: 'Product image beside a two-column technical table with zebra rows for scanning.',
      render: () => <SpecificationSlide />
    },
    {
      title: '09 — Image + Text',
      fileName: `${prefix}_Slide_09_Image_Text`,
      description: 'Full-bleed half-slide image against a text column. Footer is repeated inside the text half.',
      render: () => <ImageTextSlide />
    },
    {
      title: '10 — Two-Column Content',
      fileName: `${prefix}_Slide_10_Two_Column`,
      description: 'Balanced comparison of two lists under matching headings, with Gold bullet marks.',
      render: () => <TwoColumnSlide />
    },
    {
      title: '11 — Three-Column Content',
      fileName: `${prefix}_Slide_11_Three_Column`,
      description: 'Three tiers with the recommended option reversed in Primary. Footer lines share a baseline.',
      render: () => <ThreeColumnSlide />
    },
    {
      title: '12 — Process / Workflow',
      fileName: `${prefix}_Slide_12_Process`,
      description: 'Four numbered stages on a connecting rule — for sequential content that a card grid would flatten.',
      render: () => <ProcessSlide />
    },
    {
      title: '13 — Timeline',
      fileName: `${prefix}_Slide_13_Timeline`,
      description: 'Year-led rows on hairline separators; the current year is marked with a Gold square.',
      render: () => <TimelineSlide />
    },
    {
      title: '14 — Chart / Data Visualisation',
      fileName: `${prefix}_Slide_14_Chart`,
      description: 'Bar chart in Primary Light with the latest period in Gold, plus a commentary column and source line.',
      render: () => <ChartSlide />
    },
    {
      title: '15 — Customer / Partner Logos',
      fileName: `${prefix}_Slide_15_Partner_Logos`,
      description: 'Ten evenly weighted logo cells on a hairline grid. Placeholders are replaced with cleared partner marks.',
      render: () => <PartnerLogosSlide />
    },
    {
      title: '16 — Quote / Key Statement',
      fileName: `${prefix}_Slide_16_Quote`,
      description: 'A single reversed statement at Display scale with attribution below a rule.',
      render: () => <QuoteSlide />
    },
    {
      title: '17 — Contact / Closing',
      fileName: `${prefix}_Slide_17_Contact`,
      description: 'Closing ask, full contact block with icons, QR placeholder and the legal line.',
      render: () => <ContactSlide />
    },
    {
      title: '18 — Meeting Agenda',
      fileName: `${prefix}_Slide_18_Agenda`,
      description: 'Timed steering-committee agenda with owners — for board and programme reviews.',
      render: () => <AgendaSlide />
    },
    {
      title: '19 — Problem & Opportunity',
      fileName: `${prefix}_Slide_19_Problem_Opportunity`,
      description: `Split frame contrasting the infrastructure gap with the ${isAshBak ? 'AshBak' : 'NubiaGo'} opportunity.`,
      render: () => <ProblemOpportunitySlide />
    },
    {
      title: '20 — Solution Overview',
      fileName: `${prefix}_Slide_20_Solution`,
      description: 'Three-layer architecture: commerce, payments and logistics.',
      render: () => <SolutionOverviewSlide />
    },
    {
      title: '21 — Market Coverage Map',
      fileName: `${prefix}_Slide_21_Markets`,
      description: 'Live, pilot and roadmap corridors with map placeholder.',
      render: () => <MarketMapSlide />
    },
    {
      title: '22 — Case Study',
      fileName: `${prefix}_Slide_22_Case_Study`,
      description: 'Customer outcome narrative with headline KPIs and quote panel.',
      render: () => <CaseStudySlide />
    },
    {
      title: '23 — Risk & Compliance',
      fileName: `${prefix}_Slide_23_Risk_Compliance`,
      description: 'Control matrix for KYC, sanctions, settlement, data and continuity.',
      render: () => <RiskComplianceSlide />
    },
    {
      title: '24 — Leadership Team',
      fileName: `${prefix}_Slide_24_Team`,
      description: 'Engagement leadership with portrait placeholders.',
      render: () => <TeamOrgSlide />
    },
    {
      title: '25 — Implementation Roadmap',
      fileName: `${prefix}_Slide_25_Roadmap`,
      description: 'Twelve-week delivery phases from discover to scale.',
      render: () => <RoadmapSlide />
    },
    {
      title: '26 — Pricing Matrix',
      fileName: `${prefix}_Slide_26_Pricing`,
      description: 'Enterprise commercial matrix across Standard, Growth and Enterprise.',
      render: () => <PricingMatrixSlide />
    },
    {
      title: '27 — Next Steps',
      fileName: `${prefix}_Slide_27_Next_Steps`,
      description: 'Decision closing with numbered actions, contact and QR.',
      render: () => <NextStepsSlide />
    }
  ];
}

export const slides: SlideEntry[] = getSlides('nubiago');

export function PresentationPage() {
  const { brand } = useBrandSettings();
  const slides = getSlides(brand);
  const deckHostRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [deckBusy, setDeckBusy] = useState(false);
  const [deckProgress, setDeckProgress] = useState<string | null>(null);
  const [deckError, setDeckError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const prefix = brand === 'ashbak' ? 'AshBak' : 'NubiaGo';

  const toggleSelected = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(slides.map((_, i) => i)));
  const clearSelection = () => setSelected(new Set());

  const downloadDeck = async () => {
    const host = deckHostRef.current;
    if (!host) return;
    setDeckBusy(true);
    setDeckError(null);
    setDeckProgress('Preparing…');
    try {
      const nodes = Array.from(host.querySelectorAll('[data-deck-slide]')) as HTMLElement[];
      const indices =
        selected.size > 0 ? [...selected].sort((a, b) => a - b) : nodes.map((_, i) => i);
      const subset = indices.map((i) => nodes[i]).filter(Boolean);
      await exportDeckPdf(
        subset,
        selected.size > 0 ? `${prefix}_Presentation_Selected` : `${prefix}_Presentation_Deck`,
        formats.slide,
        (done, total) => setDeckProgress(`PDF ${done} / ${total}`)
      );
      setDeckProgress(null);
    } catch (err) {
      setDeckError(err instanceof Error ? err.message : 'Deck export failed');
      setDeckProgress(null);
    } finally {
      setDeckBusy(false);
    }
  };

  const downloadSelectedZip = async () => {
    const host = deckHostRef.current;
    if (!host || selected.size === 0) return;
    setDeckBusy(true);
    setDeckError(null);
    setDeckProgress('Preparing…');
    try {
      const nodes = Array.from(host.querySelectorAll('[data-deck-slide]')) as HTMLElement[];
      const indices = [...selected].sort((a, b) => a - b);
      const items = indices.map((i) => ({
        node: nodes[i],
        fileName: slides[i]?.fileName ?? `${prefix}_Slide_${String(i + 1).padStart(2, '0')}`
      }));
      await exportSlidesPngZip(
        items,
        `${prefix}_Presentation_Selected_PNG`,
        formats.slide,
        (done, total) => setDeckProgress(`PNG ${done} / ${total}`)
      );
      setDeckProgress(null);
    } catch (err) {
      setDeckError(err instanceof Error ? err.message : 'PNG zip failed');
      setDeckProgress(null);
    } finally {
      setDeckBusy(false);
    }
  };

  const scrollToSlide = (index: number) => {
    const el = document.getElementById(`slide-${index}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSlide(index);
  };

  useEffect(() => {
    const nodes = slides
      .map((_, i) => document.getElementById(`slide-${i}`))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const idx = Number((visible.target as HTMLElement).dataset.slideIndex);
        if (!Number.isNaN(idx)) setActiveSlide(idx);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [brand, slides.length]);

  useEffect(() => {
    const btn = railRef.current?.querySelector(`[data-rail-index="${activeSlide}"]`) as HTMLElement | null;
    btn?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [activeSlide]);

  return (
    <>
      <PageHeader
        code="04"
        title="Corporate Presentation Template"
        folder="04_PRESENTATION"
        description="A 1280 × 720 master with 27 reusable layouts on one grid: 64 px margins, a fixed heading block, and a footer carrying the wordmark, domain and slide number on every content slide."
        specs={['16:9 · 1280 × 720', '27 layouts', 'Thumbnail rail']}
      />

      <div className="mb-12 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Artboard', '1280 × 720 px · 16:9'],
          ['Margins', '64 px on all sides'],
          ['Heading block', 'Eyebrow 12 px · Title 34 px · Lead 15 px']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3 border border-gray-200 bg-gray-50 px-5 py-4 print:hidden">
        <Button type="button" onClick={downloadDeck} disabled={deckBusy}>
          {deckBusy ? <Loader2Icon className="animate-spin" strokeWidth={1.5} /> : <DownloadIcon strokeWidth={1.5} />}
          {deckBusy && deckProgress ? deckProgress : selected.size > 0 ? `PDF selected (${selected.size})` : 'Download deck PDF'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={downloadSelectedZip}
          disabled={deckBusy || selected.size === 0}
        >
          <DownloadIcon strokeWidth={1.5} />
          PNG ZIP ({selected.size || 0})
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={selectAll} disabled={deckBusy}>
          Select all
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={clearSelection} disabled={deckBusy || selected.size === 0}>
          Clear
        </Button>
        <p className="text-[13px] text-gray-700">
          Tick slides in the rail for a subset. PDF uses selection when set; otherwise all 27. PNG ZIP requires a
          selection.
        </p>
        {deckError ? <p className="w-full text-[12px] text-state-error">{deckError}</p> : null}
      </div>

      <div
        ref={deckHostRef}
        aria-hidden
        className="pointer-events-none fixed left-[-10000px] top-0 opacity-0"
        style={{ width: formats.slide.width }}
      >
        {slides.map((slide) => (
          <div
            key={`deck-${slide.fileName}`}
            data-deck-slide
            style={{ width: formats.slide.width, height: formats.slide.height, overflow: 'hidden' }}
          >
            {slide.render()}
          </div>
        ))}
      </div>

      <GroupLabel note="PNG per slide · deck PDF above">Slide layouts</GroupLabel>

      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
        <aside
          ref={railRef}
          className="mb-6 max-h-[40vh] overflow-y-auto border border-gray-200 bg-gray-50 p-2 print:hidden lg:sticky lg:top-24 lg:mb-0 lg:max-h-[calc(100vh-8rem)]"
          aria-label="Slide thumbnail rail"
        >
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            Deck · {slides.length}
          </p>
          <nav className="flex flex-col gap-0.5">
            {slides.map((slide, index) => {
              const num = String(index + 1).padStart(2, '0');
              const short = slide.title.replace(/^\d+\s*—\s*/, '');
              const active = index === activeSlide;
              const checked = selected.has(index);
              return (
                <div
                  key={slide.fileName}
                  className={`flex items-start gap-1.5 px-1 py-1 ${
                    active ? 'bg-white ring-1 ring-gray-200' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-2 shrink-0"
                    checked={checked}
                    aria-label={`Select slide ${num}`}
                    onChange={() => toggleSelected(index)}
                  />
                  <button
                    type="button"
                    data-rail-index={index}
                    onClick={() => scrollToSlide(index)}
                    className={`flex min-w-0 flex-1 items-start gap-2 px-1 py-1 text-left text-[11px] transition-colors ${
                      active ? 'font-semibold text-ink' : 'text-gray-700 hover:text-brand'
                    }`}
                  >
                    <span className="w-5 shrink-0 tabular-nums text-gray-500">{num}</span>
                    <span className="leading-snug">{short}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          {slides.map((slide, index) => (
            <div
              key={slide.fileName}
              id={`slide-${index}`}
              data-slide-index={index}
              className="scroll-mt-28"
            >
              <LazyMount minHeight={420}>
                <AssetFrame
                  title={slide.title}
                  fileName={slide.fileName}
                  description={slide.description}
                  artboard={formats.slide}
                >
                  {slide.render()}
                </AssetFrame>
              </LazyMount>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
