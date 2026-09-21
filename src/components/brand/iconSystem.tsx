import React from "react";
import { PhoneIcon, MailIcon, GlobeIcon, MapPinIcon, PackageIcon, FileTextIcon, DownloadIcon, InfoIcon, UsersIcon, BadgeCheckIcon, TruckIcon, LifeBuoyIcon, LinkedinIcon, BoxIcon } from "lucide-react";
/**
 * One icon family, one weight. NubiaGo uses Lucide line icons at 1.5px stroke
 * on a 24px grid, rendered in Primary or Gray 500 only.
 */
export const NG_STROKE = 1.5;
export interface BrandIcon {
  key: string;
  label: string;
  usage: string;
  Icon: BoxIcon;
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
export function iconByKey(key: string): BoxIcon {
  return brandIcons.find((icon) => icon.key === key)?.Icon ?? InfoIcon;
}

/** A clearly-marked QR placeholder. Destinations are never invented. */
export function QrPlaceholder({
  size = 64,
  label = 'Website',
  tone = 'light'




}: {size?: number;label?: string;tone?: 'light' | 'dark';}) {
  const border = tone === 'light' ? '#E5E5E5' : 'rgba(250,250,250,0.35)';
  const fg = tone === 'light' ? '#1E3A5F' : '#FAFAFA';
  const sub = tone === 'light' ? '#737373' : 'rgba(250,250,250,0.7)';
  return <div className="inline-flex flex-col items-center" style={{
    width: size
  }}>
      <div className="flex items-center justify-center" style={{
      width: size,
      height: size,
      border: `1px dashed ${border}`
    }}>
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" aria-hidden="true">
          <g fill={fg} opacity="0.55">
            <rect x="1" y="1" width="7" height="7" fillOpacity="0" stroke={fg} strokeWidth="2" />
            <rect x="16" y="1" width="7" height="7" fillOpacity="0" stroke={fg} strokeWidth="2" />
            <rect x="1" y="16" width="7" height="7" fillOpacity="0" stroke={fg} strokeWidth="2" />
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
      <span className="mt-1 text-center uppercase" style={{
      fontSize: Math.max(5, size * 0.11),
      letterSpacing: '0.1em',
      color: sub,
      fontWeight: 500
    }}>
        QR · {label}
      </span>
    </div>;
}