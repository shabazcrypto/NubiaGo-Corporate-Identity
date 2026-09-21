import { Logo, BrandRule } from '@/components/brand/Logo';
import { formats } from '@/lib/formats';
import { HERO } from '@/components/social/heroCatalog';
import { useCompany } from '@/lib/brand-context';

/** 600×200 announcement banner for ESP headers. */
export function EmailBannerAnnounce() {
  const { width, height } = formats.emailBanner;
  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO.africanMarket})`,
          backgroundSize: 'cover',
          backgroundPosition: '35% center'
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(30,58,95,0.92) 0%, rgba(30,58,95,0.75) 55%, rgba(30,58,95,0.35) 100%)'
        }}
      />
      <div className="relative z-[1] flex h-full flex-col justify-between p-6">
        <Logo size={16} tone="light" />
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-gold">Announcement</p>
          <p className="mt-1 text-[18px] font-semibold tracking-[-0.02em] text-white">
            Four new settlement markets live
          </p>
        </div>
      </div>
    </div>
  );
}

/** 600×200 invite / event banner. */
export function EmailBannerInvite() {
  const company = useCompany();
  const { width, height } = formats.emailBanner;
  return (
    <div className="flex flex-col justify-between bg-brand-sand" style={{ width, height, padding: 24 }}>
      <div className="flex items-start justify-between">
        <Logo size={16} />
        <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-gray-500">Invite</span>
      </div>
      <div>
        <BrandRule width={40} thickness={1.5} tone="gold" />
        <p className="mt-2 text-[17px] font-semibold tracking-[-0.02em] text-ink">
          Cross-border settlement in practice
        </p>
        <p className="mt-1 text-[11px] text-gray-700">28 Jan · Lagos · {company.website}/events</p>
      </div>
    </div>
  );
}

/** 600×200 transactional / system notice. */
export function EmailBannerSystem() {
  const { width, height } = formats.emailBanner;
  return (
    <div className="flex items-center justify-between bg-brand px-6" style={{ width, height }}>
      <div>
        <Logo size={16} tone="light" />
        <p className="mt-3 text-[15px] font-semibold text-white">Your statement is ready</p>
        <p className="mt-1 text-[11px] text-white/55">Secure download · expires in 7 days</p>
      </div>
      <BrandRule width={48} thickness={1.5} tone="gold" />
    </div>
  );
}
