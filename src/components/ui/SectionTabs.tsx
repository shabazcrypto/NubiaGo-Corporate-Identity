import type { ReactNode } from 'react';

export type SectionTab = {
  id: string;
  label: string;
  count?: number;
  note?: string;
};

type SectionTabsProps = {
  tabs: SectionTab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
};

/** Horizontal platform / family tabs for dense catalog pages. */
export function SectionTabs({ tabs, active, onChange, className = '' }: SectionTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Section filters"
      className={`mb-8 flex gap-1 overflow-x-auto border-b border-gray-200 pb-px print:hidden ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`shrink-0 border-b-2 px-3 py-2.5 text-[12px] font-medium transition-colors ${
              isActive
                ? 'border-brand text-ink'
                : 'border-transparent text-gray-500 hover:text-brand'
            }`}
          >
            {tab.label}
            {typeof tab.count === 'number' ? (
              <span className="ml-1.5 tabular-nums text-gray-500">({tab.count})</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

type TabPanelProps = {
  id: string;
  active: string;
  children: ReactNode;
  note?: string;
};

export function TabPanel({ id, active, children, note }: TabPanelProps) {
  if (id !== active) return null;
  return (
    <div role="tabpanel" aria-labelledby={`tab-${id}`} className="min-w-0">
      {note ? (
        <p className="mb-6 text-[13px] leading-relaxed text-gray-700">{note}</p>
      ) : null}
      {children}
    </div>
  );
}
