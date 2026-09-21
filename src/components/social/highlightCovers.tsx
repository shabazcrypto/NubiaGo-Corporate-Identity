import type { LucideIcon } from 'lucide-react';
import {
  InfoIcon,
  LayoutGridIcon,
  PackageIcon,
  LayersIcon,
  TruckIcon,
  UsersIcon,
  NewspaperIcon,
  CalendarIcon,
  MailIcon,
  LifeBuoyIcon,
  HandshakeIcon,
  ShipIcon,
  ChartNoAxesCombinedIcon,
  RocketIcon
} from 'lucide-react';
import { NG_STROKE } from '@/components/brand/iconSystem';
import { formats } from '@/lib/formats';

export interface HighlightDef {
  id: string;
  label: string;
  Icon: LucideIcon;
  field: 'primary' | 'sand' | 'gold';
}

export const highlightDefs: HighlightDef[] = [
  { id: 'About', label: 'About', Icon: InfoIcon, field: 'primary' },
  { id: 'Marketplace', label: 'Marketplace', Icon: LayoutGridIcon, field: 'sand' },
  { id: 'Products', label: 'Products', Icon: PackageIcon, field: 'primary' },
  { id: 'Categories', label: 'Categories', Icon: LayersIcon, field: 'sand' },
  { id: 'Suppliers', label: 'Suppliers', Icon: TruckIcon, field: 'primary' },
  { id: 'Buyers', label: 'Buyers', Icon: UsersIcon, field: 'sand' },
  { id: 'News', label: 'News', Icon: NewspaperIcon, field: 'primary' },
  { id: 'Events', label: 'Events', Icon: CalendarIcon, field: 'sand' },
  { id: 'Contact', label: 'Contact', Icon: MailIcon, field: 'primary' },
  { id: 'Support', label: 'Support', Icon: LifeBuoyIcon, field: 'sand' },
  { id: 'Partners', label: 'Partners', Icon: HandshakeIcon, field: 'gold' },
  { id: 'Logistics', label: 'Logistics', Icon: ShipIcon, field: 'primary' },
  { id: 'Insights', label: 'Insights', Icon: ChartNoAxesCombinedIcon, field: 'sand' },
  { id: 'Launch', label: 'Launch', Icon: RocketIcon, field: 'gold' }
];

/** Instagram highlight cover — critical content in center circle (~60% of canvas). */
export function HighlightCover({ label, Icon, field }: Omit<HighlightDef, 'id'>) {
  const { width, height } = formats.highlight;
  const circle = Math.round(width * 0.6);
  const iconSize = Math.round(circle * 0.28);
  const fieldClass =
    field === 'primary' ? 'bg-brand' : field === 'gold' ? 'bg-[#1A1A1A]' : 'bg-brand-sand';
  const discClass =
    field === 'primary' ? 'bg-brand-sand' : field === 'gold' ? 'bg-brand-gold' : 'bg-white';
  const inkClass = field === 'gold' ? 'text-ink' : 'text-brand';

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center ${fieldClass}`}
      style={{ width, height }}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-full ${discClass}`}
        style={{ width: circle, height: circle }}
      >
        <Icon className={inkClass} style={{ width: iconSize, height: iconSize }} strokeWidth={NG_STROKE} />
        <span
          className={`mt-4 font-semibold uppercase tracking-[0.16em] ${inkClass}`}
          style={{ fontSize: Math.round(circle * 0.055) }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

