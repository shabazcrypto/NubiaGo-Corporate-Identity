import type { LucideIcon } from 'lucide-react';
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  MapPinIcon,
  PackageIcon,
  FileTextIcon,
  DownloadIcon,
  InfoIcon,
  UsersIcon,
  BadgeCheckIcon,
  TruckIcon,
  LifeBuoyIcon,
  LinkedinIcon
} from 'lucide-react';

/**
 * One icon family, one weight. AshBak uses Lucide line icons at 1.5px stroke
 * on a 24px grid, rendered in Primary (#000000) or Gray 500 (#F4F3F9) only.
 */
export const AB_STROKE = 1.5;
export interface BrandIcon {
  key: string;
  label: string;
  usage: string;
  Icon: LucideIcon;
}
export const brandIcons: BrandIcon[] = [{
  key: 'phone',
  label: 'Phone',
  usage: 'Contact blocks, signatures',
  Icon: PhoneIcon
}, {
  key: 'email',
  label: 'Email',
  usage: 'Contact blocks, signatures',
  Icon: MailIcon
}, {
  key: 'website',
  label: 'Website',
  usage: 'Footers, cards',
  Icon: GlobeIcon
}, {
  key: 'location',
  label: 'Location',
  usage: 'Addresses, offices',
  Icon: MapPinIcon
}, {
  key: 'product',
  label: 'Product',
  usage: 'Catalogue, category pages',
  Icon: PackageIcon
}, {
  key: 'spec',
  label: 'Specification',
  usage: 'Technical data tables',
  Icon: FileTextIcon
}, {
  key: 'download',
  label: 'Download',
  usage: 'Digital CTAs, newsletters',
  Icon: DownloadIcon
}, {
  key: 'info',
  label: 'Information',
  usage: 'Notes, disclaimers',
  Icon: InfoIcon
}, {
  key: 'contact',
  label: 'Contact',
  usage: 'Sales contacts, teams',
  Icon: UsersIcon
}, {
  key: 'certification',
  label: 'Certification',
  usage: 'Compliance, quality',
  Icon: BadgeCheckIcon
}, {
  key: 'shipping',
  label: 'Shipping',
  usage: 'Delivery terms, logistics',
  Icon: TruckIcon
}, {
  key: 'support',
  label: 'Support',
  usage: 'Service, after-sales',
  Icon: LifeBuoyIcon
}, {
  key: 'linkedin',
  label: 'LinkedIn',
  usage: 'Social, signatures',
  Icon: LinkedinIcon
}];
export function iconByKey(key: string): LucideIcon {
  return brandIcons.find((icon) => icon.key === key)?.Icon ?? InfoIcon;
}

/** A clearly-marked QR placeholder. Destinations are never invented. */
export function QrPlaceholder({
  size = 64,
  label = 'Website',
  tone = 'light',
  framed = false
}: {
  size?: number;
  label?: string;
  tone?: 'light' | 'dark';
  /** Solid border plate (business card reverse). */
  framed?: boolean;
}) {
  const border = framed
    ? tone === 'light'
      ? '#000000'
      : '#000000'
    : tone === 'light'
      ? '#E5E5E5'
      : 'rgba(255,255,255,0.35)';
  const fg = tone === 'light' ? '#000000' : '#FFFFFF';
  const sub = tone === 'light' ? '#737373' : 'rgba(255,255,255,0.7)';
  const showLabel = Boolean(label && label.trim());
  return (
    <div className="inline-flex flex-col items-center" style={{ width: size }}>
      <div
        className="flex items-center justify-center"
        style={{
          width: size,
          height: size,
          border: framed ? `1.5px solid ${border}` : `1px dashed ${border}`,
          borderRadius: framed ? 2 : 0,
          background: framed ? '#FFFFFF' : undefined
        }}
      >
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" aria-hidden="true">
          <g fill={framed ? '#000000' : fg} opacity="0.55">
            <rect x="1" y="1" width="7" height="7" fillOpacity="0" stroke={framed ? '#000000' : fg} strokeWidth="2" />
            <rect x="16" y="1" width="7" height="7" fillOpacity="0" stroke={framed ? '#000000' : fg} strokeWidth="2" />
            <rect x="1" y="16" width="7" height="7" fillOpacity="0" stroke={framed ? '#000000' : fg} strokeWidth="2" />
            <rect x="11" y="1" width="2" height="2" />
            <rect x="11" y="5" width="2" height="2" />
            <rect x="11" y="9" width="2" height="2" />
            <rect x="15" y="11" width="2" height="2" />
            <rect x="19" y="11" width="2" height="2" />
            <rect x="11" y="15" width="2" height="2" />
            <rect x="15" y="15" width="2" height="2" />
            <rect x="19" y="19" width="2" height="2" />
            <rect x="15" y="19" width="2" height="2" />
            <rect x="11" y="19" width="2" height="2" />
            <rect x="1" y="11" width="2" height="2" />
            <rect x="5" y="11" width="2" height="2" />
          </g>
        </svg>
      </div>
      {showLabel ? (
        <span
          className="mt-1 text-center uppercase"
          style={{
            fontSize: Math.max(5, size * 0.11),
            letterSpacing: '0.1em',
            color: sub,
            fontWeight: 500
          }}
        >
          QR · {label}
        </span>
      ) : null}
    </div>
  );
}