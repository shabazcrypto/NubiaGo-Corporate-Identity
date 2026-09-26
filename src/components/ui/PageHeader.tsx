import React from 'react';
import { BrandRule } from '../brand/Logo';

interface PageHeaderProps {
  code: string;
  title: string;
  folder: string;
  description: string;
  /** Optional production notes shown as chips under the title. */
  specs?: string[];
}

export function PageHeader({ code, title, folder, description, specs }: PageHeaderProps) {
  const chips = specs ?? ['Export PNG / PDF / SVG', 'sRGB · print CMYK notes', 'Artboard-locked'];

  return (
    <header className="mb-12 border-b border-gray-200 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BrandRule width={72} />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
          Section {code}
        </p>
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {code} — {folder}
      </p>
      <h1 className="mt-2.5 max-w-4xl text-[clamp(28px,4vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-ink">
        {title}
      </h1>
      <p className="mt-3.5 max-w-3xl text-[15px] leading-relaxed text-gray-700">{description}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li
            key={chip}
            className="border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-gray-700"
          >
            {chip}
          </li>
        ))}
      </ul>
    </header>
  );
}

export function GroupLabel({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-6 mt-4">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-gray-200 pb-2">
        <h2 className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          {children}
        </h2>
        {note ? <span className="min-w-0 text-[12px] leading-snug text-gray-500">{note}</span> : null}
      </div>
    </div>
  );
}
