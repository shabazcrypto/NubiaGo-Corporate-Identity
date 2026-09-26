import type { ReactNode } from 'react';
import { BrandRule } from '@/components/brand/Logo';

export const BP_PAD = 44;
export const BP_INK = '#111112';
export const BP_MUTED = '#737373';
export const BP_RULE = '#E5E5E5';
export const BP_BLACK = '#000000';
export const BP_WHITE = '#FAFAFA';

export function AshBakWordmark({
  size = 18,
  tone = 'dark'
}: {
  size?: number;
  tone?: 'dark' | 'light';
}) {
  return (
    <span
      className="ab-wordmark block leading-none tracking-[-0.02em]"
      style={{
        fontSize: size,
        fontWeight: 500,
        color: tone === 'light' ? BP_WHITE : BP_BLACK
      }}
    >
      ashbak
    </span>
  );
}

export function PlanShell({
  children,
  page,
  total,
  chapter,
  dark = false
}: {
  children: ReactNode;
  page: number;
  total: number;
  chapter?: string;
  dark?: boolean;
}) {
  return (
    <div
      className="box-border flex h-full w-full flex-col"
      style={{
        padding: BP_PAD,
        background: dark ? BP_BLACK : '#FFFFFF',
        color: dark ? BP_WHITE : BP_INK
      }}
    >
      <header
        className="mb-2.5 flex shrink-0 items-start justify-between border-b pb-2"
        style={{ borderColor: dark ? 'rgba(255,255,255,0.15)' : BP_RULE }}
      >
        <AshBakWordmark size={14} tone={dark ? 'light' : 'dark'} />
        <div
          className="text-right text-[10px] font-medium uppercase tracking-[0.14em]"
          style={{ color: dark ? 'rgba(255,255,255,0.55)' : BP_MUTED }}
        >
          Master business plan
          {chapter ? (
            <>
              <br />
              {chapter}
            </>
          ) : null}
        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      <footer
        className="mt-2.5 flex shrink-0 items-end justify-between border-t pt-2 text-[10px]"
        style={{
          borderColor: dark ? 'rgba(255,255,255,0.15)' : BP_RULE,
          color: dark ? 'rgba(255,255,255,0.5)' : BP_MUTED
        }}
      >
        <span>AshBak Industries Inc. · Delaware · Confidential</span>
        <span className="tabular-nums">
          {String(page).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </footer>
    </div>
  );
}

export function Fill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex h-full min-h-0 flex-1 flex-col ${className}`}>{children}</div>;
}

/** Vertical stack — top-aligned sections that share the field. Weights force a real height split. */
export function Stack2({
  top,
  bottom,
  dark = false,
  topWeight = 1,
  bottomWeight = 1
}: {
  top: ReactNode;
  bottom: ReactNode;
  dark?: boolean;
  topWeight?: number;
  bottomWeight?: number;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className="flex min-h-0 flex-col overflow-hidden pb-2.5"
        style={{ flexGrow: topWeight, flexShrink: 1, flexBasis: 0 }}
      >
        {top}
      </div>
      <div
        className="shrink-0 border-t"
        style={{ borderColor: dark ? 'rgba(255,255,255,0.15)' : BP_RULE }}
      />
      <div
        className="flex min-h-0 flex-col overflow-hidden pt-2.5"
        style={{ flexGrow: bottomWeight, flexShrink: 1, flexBasis: 0 }}
      >
        {bottom}
      </div>
    </div>
  );
}

export function Grow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`flex min-h-0 flex-1 flex-col ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: light ? 'rgba(255,255,255,0.65)' : BP_BLACK }}
    >
      {children}
    </div>
  );
}

export function H1({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h1
      className="mt-1 shrink-0 text-[22px] font-bold leading-[1.15] tracking-[-0.03em]"
      style={{ color: light ? BP_WHITE : BP_INK }}
    >
      {children}
    </h1>
  );
}

export function H2({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <h2
      className="mt-2 shrink-0 text-[14px] font-semibold tracking-[-0.015em]"
      style={{ color: light ? BP_WHITE : BP_INK }}
    >
      {children}
    </h2>
  );
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mt-1 text-[13px] leading-[1.5] text-gray-700 ${className}`}>{children}</p>;
}

export function Small({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mt-1 text-[11.5px] leading-[1.45] text-gray-600 ${className}`}>{children}</p>;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1.5 space-y-1">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[13px] leading-[1.45] text-gray-700">
          <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-black" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Dense table — never stretch row height (avoids sparse look on short tables). */
export function DataTable({
  headers,
  rows,
  dense = false
}: {
  headers: string[];
  rows: string[][];
  dense?: boolean;
}) {
  const cell = dense ? 'px-2 py-1 text-[10.5px]' : 'px-2 py-1.5 text-[11px]';
  return (
    <div className="mt-1.5 w-full overflow-hidden border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((h) => (
              <th
                key={h}
                className={`${cell} border-b border-gray-200 text-left font-semibold uppercase tracking-[0.08em] text-gray-500`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              {row.map((cellText, j) => (
                <td
                  key={`${i}-${j}`}
                  className={`${cell} ${j === 0 ? 'font-medium text-ink' : 'tabular-nums text-gray-700'}`}
                >
                  {cellText}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-1.5 shrink-0 border-l-2 border-black bg-gray-50 px-3 py-2">
      <div className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-gray-500">{title}</div>
      <div className="mt-0.5 text-[12.5px] font-medium leading-snug text-ink">{children}</div>
    </div>
  );
}

/** Diagram / mono block — top-aligned, fills remaining height with field (not floating text). */
export function FlowBox({
  lines,
  fill = false
}: {
  lines: string[];
  fill?: boolean;
}) {
  return (
    <div
      className={`mt-1.5 border border-gray-200 bg-gray-50 px-3 py-2.5 font-mono text-[10.5px] leading-[1.55] text-gray-700 ${
        fill ? 'min-h-0 flex-1' : ''
      }`}
    >
      {lines.map((line, i) => (
        <div key={`${i}-${line}`}>{line || '\u00A0'}</div>
      ))}
    </div>
  );
}

export function MetricStrip({
  items
}: {
  items: Array<{ label: string; value: string; hint?: string }>;
}) {
  return (
    <div
      className={`mt-1.5 grid gap-px border border-gray-200 bg-gray-200 ${
        items.length === 4 ? 'grid-cols-4' : items.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-gray-50 px-2.5 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500">{item.label}</div>
          <div className="mt-0.5 text-[16px] font-bold tracking-[-0.02em] text-ink">{item.value}</div>
          {item.hint ? <div className="mt-0.5 text-[10.5px] leading-snug text-gray-500">{item.hint}</div> : null}
        </div>
      ))}
    </div>
  );
}

/** Cards — top-aligned; equal-height rows when fill without floating empty middles. */
export function PanelGrid({
  items,
  cols = 2,
  fill = false
}: {
  items: Array<{ title: string; body: string; dark?: boolean }>;
  cols?: 2 | 3;
  fill?: boolean;
}) {
  return (
    <div
      className={`mt-1.5 grid gap-2 ${cols === 3 ? 'grid-cols-3' : 'grid-cols-2'} ${
        fill ? 'min-h-0 flex-1' : ''
      }`}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={`border p-3 ${fill ? 'flex h-full flex-col' : ''} ${
            item.dark ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'
          }`}
        >
          <div
            className={`text-[8px] font-semibold uppercase tracking-[0.12em] ${
              item.dark ? 'text-white/55' : 'text-gray-500'
            }`}
          >
            {item.title}
          </div>
          <p className={`mt-1.5 text-[10.5px] leading-[1.5] ${item.dark ? 'text-white/85' : 'text-gray-700'}`}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function SectionRule() {
  return (
    <div className="mt-1.5 shrink-0">
      <BrandRule width={48} thickness={2} tone="primary" />
    </div>
  );
}

/** Full-height bordered field with top-aligned content — use to occupy leftover space. */
export function Field({
  children,
  dark = false,
  className = ''
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mt-1.5 flex min-h-0 flex-1 flex-col border p-3 ${
        dark ? 'border-white/20 bg-white/5' : 'border-gray-200 bg-gray-50'
      } ${className}`}
    >
      {children}
    </div>
  );
}
