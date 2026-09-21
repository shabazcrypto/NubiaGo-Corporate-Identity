import { Logo, BrandRule } from '@/components/brand/Logo';
import { HERO } from '@/components/social/heroCatalog';
import { formats } from '@/lib/formats';
import { useCompany } from '@/lib/brand-context';

/** Photo-led LinkedIn announcement — matches cover aesthetic. */
export function LinkedInPostAlive() {
  const company = useCompany();
  const { width, height } = formats.linkedIn;

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO.handshake})`,
          backgroundSize: 'cover',
          backgroundPosition: '22% 35%'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(30,58,95,0.25) 0%, rgba(30,58,95,0.72) 48%, rgba(30,58,95,0.94) 100%)'
        }}
      />
      <div className="relative z-[1] flex h-full flex-col justify-between p-14">
        <div className="flex justify-between">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Partnership</span>
          <Logo size={22} tone="light" />
        </div>
        <div className="max-w-[58%] self-end text-right">
          <h1 className="text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Buyers meet suppliers — on one network.
          </h1>
          <BrandRule width={56} thickness={1.5} tone="gold" />
          <p className="mt-3 text-[15px] text-white/60">
            {company.positioning} · {company.website}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Square feed card with Unsplash still-life. */
export function FeedPostMarketplace() {
  const company = useCompany();
  const { width, height } = formats.square;

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO.marketplace})`,
          backgroundSize: 'cover',
          backgroundPosition: '30% center'
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '48%',
          background: 'linear-gradient(0deg, rgba(245,240,232,0.98) 0%, rgba(245,240,232,0.9) 55%, transparent 100%)'
        }}
      />
      <div className="relative z-[1] flex h-full flex-col justify-between p-14">
        <Logo size={26} tone="light" />
        <div>
          <p className="text-[14px] font-semibold uppercase tracking-[0.18em] text-brand">Marketplace</p>
          <h1 className="mt-3 max-w-[80%] text-[44px] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
            Your marketplace for business.
          </h1>
          <p className="mt-4 text-[16px] text-gray-700">{company.website}</p>
        </div>
      </div>
    </div>
  );
}
