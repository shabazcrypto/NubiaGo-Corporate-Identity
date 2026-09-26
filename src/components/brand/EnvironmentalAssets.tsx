import { Logo, BrandRule } from '@/components/brand/Logo';
import { useCompany } from '@/lib/brand-context';

/** Corporate seal / stamp — 320×320 artboard for print overlays. */
export function CorporateSeal() {
  const company = useCompany();
  const size = 320;
  return (
    <div className="flex h-full w-full items-center justify-center bg-white" style={{ width: size, height: size }}>
      <div
        className="flex flex-col items-center justify-center rounded-full border-[3px] border-brand"
        style={{ width: 260, height: 260 }}
      >
        <div className="rounded-full border border-brand/40 px-6 py-8 text-center">
          <Logo size={22} />
          <BrandRule width={36} thickness={1.5} tone="primary" />
          <p className="mt-2 max-w-[140px] text-[8px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            {company.legalName}
          </p>
          <p className="mt-1 text-[7px] uppercase tracking-[0.12em] text-brand">Official</p>
        </div>
      </div>
    </div>
  );
}

/** Packing tape pattern tile — repeatable strip. */
export function PackingTape() {
  const w = 640;
  const h = 80;
  return (
    <div className="relative overflow-hidden bg-brand" style={{ width: w, height: h }}>
      <div className="absolute inset-0 flex items-center gap-10 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="ab-wordmark whitespace-nowrap text-[18px] text-white/35">
            ashbak
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-1 bg-white" />
      <div className="absolute inset-y-0 right-0 w-1 bg-white" />
    </div>
  );
}

export const unsplashCredits: { file: string; credit: string; url: string }[] = [
  {
    file: 'team-meeting.jpg',
    credit: 'Unsplash — collaborative meeting',
    url: 'https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-while-holding-pens-during-daytime-1600880292203-757bb62b4baf'
  },
  {
    file: 'handshake.jpg',
    credit: 'Unsplash — business handshake',
    url: 'https://unsplash.com/photos/1556761175-5973dc0f32e7'
  },
  {
    file: 'warehouse.jpg',
    credit: 'Unsplash — warehouse logistics',
    url: 'https://unsplash.com/photos/1586528116311-ad8dd3c8310d'
  },
  {
    file: 'woman-ceo.jpg',
    credit: 'Unsplash — leadership portrait',
    url: 'https://unsplash.com/photos/1573496359142-b8d87734a5a2'
  },
  {
    file: 'spices-market.jpg',
    credit: 'Unsplash — spice market',
    url: 'https://unsplash.com/photos/1596040033229-a9821ebd058d'
  },
  {
    file: 'african-market.jpg',
    credit: 'Unsplash — market commerce',
    url: 'https://unsplash.com/photos/1604719312566-8912e9227c6a'
  },
  {
    file: 'shipping.jpg',
    credit: 'Unsplash — shipping / freight',
    url: 'https://unsplash.com/photos/1566576912321-d58ddd7a6088'
  },
  {
    file: 'port-crane.jpg',
    credit: 'Unsplash — port crane',
    url: 'https://unsplash.com/photos/1578575437130-527eed3abbec'
  },
  {
    file: 'collab.jpg',
    credit: 'Unsplash — collaboration',
    url: 'https://unsplash.com/photos/1557804506-669a67965ba0'
  },
  {
    file: 'atelier.jpg',
    credit: 'Unsplash — retail / atelier',
    url: 'https://unsplash.com/photos/1441986300917-64674bd600d8'
  },
  {
    file: 'businesswoman.jpg',
    credit: 'Unsplash — professional portrait',
    url: 'https://unsplash.com/photos/1580894732444-8ecded7900cd'
  },
  {
    file: 'portrait-man.jpg',
    credit: 'Unsplash — professional portrait',
    url: 'https://unsplash.com/photos/1507003211169-0a1dd7228f2d'
  },
  {
    file: 'architect.jpg',
    credit: 'Unsplash — architecture',
    url: 'https://unsplash.com/photos/1486406146926-c627a92ad1ab'
  },
  {
    file: 'cargo-bay.jpg',
    credit: 'Unsplash — cargo / warehouse',
    url: 'https://unsplash.com/photos/1586528116311-ad8dd3c8310d'
  },
  {
    file: 'market-stall.jpg',
    credit: 'Unsplash — retail counter',
    url: 'https://unsplash.com/photos/1556742049-0cfed4f6a45d'
  }
];