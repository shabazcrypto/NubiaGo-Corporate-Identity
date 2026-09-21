import React from 'react';
import { BrandRule } from '../brand/Logo';

interface PageHeaderProps {
  code: string;
  title: string;
  folder: string;
  description: string;
}

export function PageHeader({ code, title, folder, description }: PageHeaderProps) {
  return (
    <header className="mb-10 border-b border-gray-200 pb-7">
      <BrandRule width={72} />
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
        {code} — {folder}
      </p>
      <h1 className="mt-2 text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-ink">{title}</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-gray-700">{description}</p>
    </header>);

}

export function GroupLabel({ children, note }: {children: React.ReactNode;note?: string;}) {
  return (
    <div className="mb-6 mt-2 flex items-baseline gap-3">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">{children}</h2>
      {note ? <span className="text-[12px] text-gray-500">{note}</span> : null}
    </div>);

}