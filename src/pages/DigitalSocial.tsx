import { GroupLabel } from '@/components/ui/PageHeader';
import { AssetFrame } from '@/components/ui/AssetFrame';
import { Logo, BrandRule } from '@/components/brand/Logo';
import { AB_STROKE, iconByKey } from '@/components/brand/iconSystem';
import { useCompany, useBrandSettings } from '@/lib/brand-context';
import { formats } from '@/lib/formats';

function PostFooter({ tone = 'dark', label }: {tone?: 'dark' | 'light';label?: string;}) {
  const company = useCompany();
  const border = tone === 'dark' ? 'border-white/15' : 'border-gray-200';
  const text = tone === 'dark' ? 'text-white/55' : 'text-gray-500';
  return (
    <div className={`flex items-center justify-between border-t pt-5 ${border}`}>
      <Logo size={18} tone={tone === 'dark' ? 'light' : 'primary'} />
      <span className={`text-[13px] ${text}`}>
        {company.endorsement} · {label ?? company.website}
      </span>
    </div>);
}

/** LinkedIn + feed post templates - LinkedIn only */
export function DigitalPostsSection() {
  const company = useCompany();
  const { brand } = useBrandSettings();
  const isAshBak = brand === 'ashbak';

  const Cert = iconByKey('certification');
  const Product = iconByKey('product');
  const Contact = iconByKey('contact');

  // Brand-specific content
  const announcementTitle = isAshBak 
    ? 'Industrial infrastructure expanded to four new markets' 
    : 'Settlement coverage extended to four new markets';
  const announcementBody = isAshBak
    ? 'Integrated commerce, payments, and logistics infrastructure is now live in Ghana, Kenya, Côte d\'Ivoire and Senegal.'
    : 'Next-day local-currency settlement is now live in Ghana, Kenya, Côte d\'Ivoire and Senegal.';
  const productTitle = isAshBak
    ? 'Reconciliation now delivered in ISO 20022'
    : 'Reconciliation now delivered in ISO 20022';
  const productBody = isAshBak
    ? 'Daily statements can be consumed directly by your treasury system — no mapping layer required.'
    : 'Daily statements can be consumed directly by your treasury system — no mapping layer required.';
  const launchTitle = isAshBak
    ? 'Industrial API v2'
    : 'Settlement API v2';
  const launchBody = isAshBak
    ? 'One endpoint for commerce, payments, and logistics across twelve markets.'
    : 'One endpoint for payout, status and reconciliation across twelve markets.';
  const newsTitle = isAshBak
    ? 'New operations office in Nairobi'
    : 'New operations office in Nairobi';
  const newsBody = isAshBak
    ? 'Thirty colleagues join the East Africa team to support industrial partners across the region in local hours.'
    : 'Thirty colleagues join the East Africa team to support merchants across the region in local hours.';
  const milestoneTitle = isAshBak
    ? '$2.4B'
    : '$240M';
  const milestoneBody = isAshBak
    ? 'in industrial infrastructure deployed across the network in 2024, at 99.95% uptime.'
    : 'settled across the network in 2024, at 99.95% uptime.';

  const partnerTitle = isAshBak
    ? 'Continental Industrial Partners joins the network'
    : 'Continental Trade Partners joins the network';
  const partnerQuote = isAshBak
    ? 'Industrial integration used to take a quarter and three vendors. It now takes a week.'
    : 'Settlement used to take a week and three phone calls. It now takes a day.';

  return (
    <>
      <GroupLabel note="1200 × 627 · 1080 × 1080">Feed & LinkedIn posts</GroupLabel>
      <div className="mb-10 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Link post', '1200 × 627 px'],
          ['Feed post', '1080 × 1080 px'],
          ['Minimum type', '28 px at export']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <AssetFrame
        title="LinkedIn — Company Announcement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_01_Company_Announcement`}
        description="Reversed field, eyebrow, one statement and a supporting line."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full flex-col justify-between bg-brand p-16">
          <div className="flex items-start justify-between">
            <BrandRule width={96} thickness={2} tone="primary" />
            <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/55">Announcement</span>
          </div>
          <div>
            <div className="text-[15px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Company news</div>
            <h1 className="mt-5 max-w-[860px] text-[52px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {announcementTitle}
            </h1>
            <p className="mt-5 max-w-[640px] text-[19px] leading-[1.6] text-white/65">
              {announcementBody}
            </p>
          </div>
          <PostFooter />
        </div>
      </AssetFrame>

      <AssetFrame
        title="LinkedIn — Product Announcement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_02_Product_Announcement`}
        description="Split layout: message on White, product image area on Light Gray."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full">
          <div className="flex w-[58%] flex-col justify-between p-16">
            <div className="flex items-center gap-3">
              <Product className="h-6 w-6 text-brand" strokeWidth={AB_STROKE} />
              <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-brand-light">
                Product update
              </span>
            </div>
            <div>
              <h1 className="max-w-[520px] text-[44px] font-bold leading-[1.12] tracking-[-0.03em] text-ink">
                {productTitle}
              </h1>
              <p className="mt-4 max-w-[460px] text-[18px] leading-[1.6] text-gray-700">
                {productBody}
              </p>
            </div>
            <PostFooter tone="light" />
          </div>
          <div className="flex w-[42%] items-center justify-center bg-brand-sand">
            <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-gray-500">Product image</span>
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed — Product Launch"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_03_Product_Launch`}
        description="Square launch card with three supporting facts at the base."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white p-20">
          <div className="flex items-start justify-between">
            <Logo size={28} />
            <span className="text-[15px] font-medium uppercase tracking-[0.16em] text-gray-500">Now live</span>
          </div>
          <div>
            <BrandRule width={96} thickness={2} />
            <div className="mt-8 text-[17px] font-semibold uppercase tracking-[0.2em] text-brand-light">
              Product launch
            </div>
            <h1 className="mt-5 text-[62px] font-bold leading-[1.06] tracking-[-0.035em] text-ink">
              {launchTitle}
            </h1>
            <p className="mt-6 max-w-[620px] text-[22px] leading-[1.55] text-gray-700">
              {launchBody}
            </p>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
              {[
                ['T+1', isAshBak ? 'Settlement' : 'Settlement'],
                ['12', 'Markets'],
                ['99.95%', 'Uptime']
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-[34px] font-bold tracking-[-0.03em] text-brand">{value}</div>
                  <div className="mt-1.5 text-[14px] font-medium uppercase tracking-[0.12em] text-gray-500">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-gray-200 pt-5 text-[13px] text-gray-500">
              {company.endorsement} · {company.website}
            </div>
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed — Company News"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_04_Company_News`}
        description="Light Gray field for softer, non-commercial updates."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-brand-sand p-20">
          <div className="flex items-start justify-between">
            <Logo size={28} />
            <span className="text-[15px] font-medium uppercase tracking-[0.16em] text-gray-500">December 2024</span>
          </div>
          <div>
            <div className="text-[17px] font-semibold uppercase tracking-[0.2em] text-brand">Company news</div>
            <h1 className="mt-5 text-[56px] font-bold leading-[1.08] tracking-[-0.035em] text-ink">
              {newsTitle}
            </h1>
            <p className="mt-6 max-w-[640px] text-[22px] leading-[1.55] text-gray-700">
              {newsBody}
            </p>
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed — Corporate Achievement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_05_Achievement`}
        description="A single figure carries the post — no confetti, no badges."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-brand p-20">
          <div className="flex items-start justify-between">
            <Logo size={28} tone="light" />
            <Cert className="h-8 w-8 text-brand-gold" strokeWidth={AB_STROKE} />
          </div>
          <div>
            <div className="text-[17px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Milestone</div>
            <div className="mt-7 text-[140px] font-bold leading-none tracking-[-0.045em] text-white">{milestoneTitle}</div>
            <p className="mt-7 max-w-[640px] text-[24px] leading-[1.5] text-white/70">
              {milestoneBody}
            </p>
          </div>
          <PostFooter />
        </div>
      </AssetFrame>

      <AssetFrame
        title="LinkedIn — Event Announcement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_06_Event`}
        description="Event details as a labelled block — date, venue and format readable without the caption."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white p-16">
          <div className="flex items-start justify-between">
            <Logo size={24} />
            <span className="text-[14px] font-medium uppercase tracking-[0.16em] text-gray-500">Event</span>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            {[
              ['Date', '28 January 2025'],
              ['Time', '10:00 – 12:00 WAT'],
              ['Format', 'In person · Nairobi'],
              ['Registration', `${company.website}/events`]
            ].map(([label, value]) => (
              <div key={label} className="min-w-0">
                <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
                <div className="mt-1 break-words text-[17px] font-medium leading-snug text-ink">{value}</div>
              </div>
            ))}
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed — Customer / Partner Announcement"
        fileName={`${isAshBak ? 'AshBak' : 'NubiaGo'}_Social_07_Partner`}
        description="Partner logo field, one line of substance, and a named quote."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white p-20">
          <div className="flex items-center gap-3">
            <Contact className="h-7 w-7 text-brand" strokeWidth={AB_STROKE} />
            <span className="text-[16px] font-semibold uppercase tracking-[0.18em] text-brand-light">
              Partnership
            </span>
          </div>
          <div>
            <div className="flex items-center gap-8">
              <Logo size={34} />
              <div className="h-10 w-px bg-gray-200" aria-hidden="true" />
              <div className="flex h-16 flex-1 items-center justify-center border border-gray-200">
                <span className="text-[13px] font-medium uppercase tracking-[0.14em] text-gray-200">Partner logo</span>
              </div>
            </div>
            <h1 className="mt-10 text-[48px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
              {partnerTitle}
            </h1>
            <blockquote className="mt-8 border-l-2 border-brand-gold pl-6 text-[21px] leading-[1.55] text-gray-700">
              "{partnerQuote}"
              <footer className="mt-3 text-[15px] text-gray-500">
                Amara Okonkwo · Director of Procurement
              </footer>
            </blockquote>
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>
    </>
  );
}