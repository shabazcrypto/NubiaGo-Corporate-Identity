import { PageHeader, GroupLabel } from '../components/ui/PageHeader';
import { AssetFrame } from '../components/ui/AssetFrame';
import { Logo, BrandRule } from '../components/brand/Logo';
import { NG_STROKE, iconByKey } from '../components/brand/iconSystem';
import { useCompany } from '@/lib/brand-context';
import { formats } from '@/lib/formats';


function PostFooter({ tone = 'dark', label }: {tone?: 'dark' | 'light';label?: string;}) {
  const company = useCompany();
  const border = tone === 'dark' ? 'border-white/15' : 'border-gray-200';
  const text = tone === 'dark' ? 'text-white/55' : 'text-gray-500';
  return (
    <div className={`flex items-center justify-between border-t pt-5 ${border}`}>
      <Logo size={18} tone={tone === 'dark' ? 'light' : 'primary'} />
      <span className={`text-[13px] ${text}`}>
        {company.endorsement} Â· {label ?? company.website}
      </span>
    </div>);

}

/** LinkedIn + feed post templates â€” composed into the unified Digital page. */
export function DigitalPostsSection() {
  const company = useCompany();

  const Cert = iconByKey('certification');
  const Product = iconByKey('product');
  const Contact = iconByKey('contact');

  return (
    <>
      <GroupLabel note="1200 Ã— 627 Â· 1080 Ã— 1080">Feed &amp; LinkedIn posts</GroupLabel>
      <div className="mb-10 grid gap-px bg-gray-200 sm:grid-cols-3">
        {[
          ['Link post', '1200 Ã— 627 px'],
          ['Feed post', '1080 Ã— 1080 px'],
          ['Minimum type', '28 px at export']
        ].map(([label, value]) => (
          <div key={label} className="bg-gray-50 px-5 py-4">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
            <div className="mt-1 text-[14px] font-medium text-ink">{value}</div>
          </div>
        ))}
      </div>

      <AssetFrame
        title="LinkedIn â€” Company Announcement"
        fileName="NubiaGo_Social_01_Company_Announcement"
        description="Reversed field, eyebrow, one statement and a supporting line."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full flex-col justify-between bg-brand p-16">
          <div className="flex items-start justify-between">
            <BrandRule width={96} thickness={2} tone="gold" />
            <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-white/55">Announcement</span>
          </div>
          <div>
            <div className="text-[15px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Company news</div>
            <h1 className="mt-5 max-w-[860px] text-[52px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              Settlement coverage extended to four new markets
            </h1>
            <p className="mt-5 max-w-[640px] text-[19px] leading-[1.6] text-white/65">
              Next-day local-currency settlement is now live in Ghana, Kenya, CÃ´te dâ€™Ivoire and Senegal.
            </p>
          </div>
          <PostFooter />
        </div>
      </AssetFrame>

      <AssetFrame
        title="LinkedIn â€” Product Announcement"
        fileName="NubiaGo_Social_02_Product_Announcement"
        description="Split layout: message on White, product image area on Warm Sand."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full">
          <div className="flex w-[58%] flex-col justify-between p-16">
            <div className="flex items-center gap-3">
              <Product className="h-6 w-6 text-brand" strokeWidth={NG_STROKE} />
              <span className="text-[14px] font-semibold uppercase tracking-[0.18em] text-brand-light">
                Product update
              </span>
            </div>
            <div>
              <h1 className="max-w-[520px] text-[44px] font-bold leading-[1.12] tracking-[-0.03em] text-ink">
                Reconciliation now delivered in ISO 20022
              </h1>
              <p className="mt-4 max-w-[460px] text-[18px] leading-[1.6] text-gray-700">
                Daily statements can be consumed directly by your treasury system â€” no mapping layer required.
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
        title="Feed â€” Product Launch"
        fileName="NubiaGo_Social_03_Product_Launch"
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
              Settlement API v2
            </h1>
            <p className="mt-6 max-w-[620px] text-[22px] leading-[1.55] text-gray-700">
              One endpoint for payout, status and reconciliation across twelve markets.
            </p>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
              {[
                ['T+1', 'Settlement'],
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
              {company.endorsement} Â· {company.website}
            </div>
          </div>
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed â€” Company News"
        fileName="NubiaGo_Social_04_Company_News"
        description="Warm Sand field for softer, non-commercial updates."
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
              New operations office in Nairobi
            </h1>
            <p className="mt-6 max-w-[640px] text-[22px] leading-[1.55] text-gray-700">
              Thirty colleagues join the East Africa team to support merchants across the region in local hours.
            </p>
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed â€” Corporate Achievement"
        fileName="NubiaGo_Social_05_Achievement"
        description="A single figure carries the post â€” no confetti, no badges."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-brand p-20">
          <div className="flex items-start justify-between">
            <Logo size={28} tone="light" />
            <Cert className="h-8 w-8 text-brand-gold" strokeWidth={NG_STROKE} />
          </div>
          <div>
            <div className="text-[17px] font-semibold uppercase tracking-[0.2em] text-brand-gold">Milestone</div>
            <div className="mt-6 text-[140px] font-bold leading-none tracking-[-0.045em] text-white">$240M</div>
            <p className="mt-7 max-w-[640px] text-[24px] leading-[1.5] text-white/70">
              settled across the network in 2024, at 99.95% uptime.
            </p>
          </div>
          <PostFooter />
        </div>
      </AssetFrame>

      <AssetFrame
        title="LinkedIn â€” Event Announcement"
        fileName="NubiaGo_Social_06_Event"
        description="Event details as a labelled block â€” date, venue and format readable without the caption."
        artboard={formats.linkedIn}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white p-16">
          <div className="flex items-start justify-between">
            <Logo size={24} />
            <span className="text-[14px] font-medium uppercase tracking-[0.16em] text-gray-500">Event</span>
          </div>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-7">
              <h1 className="text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
                Cross-border settlement in practice
              </h1>
              <p className="mt-4 text-[18px] leading-[1.6] text-gray-700">
                A working session for treasury and procurement teams operating across African markets.
              </p>
            </div>
            <div className="col-span-5 space-y-4 border-l border-gray-200 pl-10">
              {[
                ['Date', '28 January 2025'],
                ['Time', '10:00 â€“ 12:00 WAT'],
                ['Format', 'In person Â· Lagos'],
                ['Registration', `${company.website}/events`]
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">{label}</div>
                  <div className="mt-0.5 text-[17px] font-medium text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>

      <AssetFrame
        title="Feed â€” Customer / Partner Announcement"
        fileName="NubiaGo_Social_07_Partner"
        description="Partner logo field, one line of substance, and a named quote."
        artboard={formats.square}
      >
        <div className="flex h-full w-full flex-col justify-between bg-white p-20">
          <div className="flex items-center gap-3">
            <Contact className="h-7 w-7 text-brand" strokeWidth={NG_STROKE} />
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
              Continental Trade Partners joins the network
            </h1>
            <blockquote className="mt-8 border-l-2 border-brand-gold pl-6 text-[21px] leading-[1.55] text-gray-700">
              â€œSettlement used to take a week and three phone calls. It now takes a day.â€
              <footer className="mt-3 text-[15px] text-gray-500">
                Amara Okonkwo Â· Director of Procurement
              </footer>
            </blockquote>
          </div>
          <PostFooter tone="light" />
        </div>
      </AssetFrame>
    </>
  );
}

/** @deprecated Use DigitalPage at /digital — kept for Storybook. */
export function DigitalSocialPage() {
  return (
    <>
      <PageHeader
        code="10"
        title="Digital & Social Templates"
        folder="10_DIGITAL_SOCIAL"
        description="Merged into Digital & Social — this route redirects to /digital."
      />
      <DigitalPostsSection />
    </>
  );
}
