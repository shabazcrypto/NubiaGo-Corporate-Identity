import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { navigation } from '../../data/navigation';
import { useCompany, useBrandSettings } from '@/lib/brand-context';
import { BrandSettingsDialog } from '@/components/layout/BrandSettings';
import { Button } from '@/components/ui/button';

function BrandSwitcher({ className = '' }: { className?: string }) {
  const { brand } = useBrandSettings();
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500">Active brand</span>
      <select
        value={brand}
        aria-label="Active brand"
        onChange={(e) => {
          const newBrand = e.target.value;
          localStorage.setItem('brand-settings', JSON.stringify({ brand: newBrand, company: {} }));
          window.location.reload();
        }}
        className="w-full border border-gray-200 bg-white px-2.5 py-2 text-[13px] text-ink outline-none transition-colors focus:border-brand"
      >
        <option value="nubiago">NubiaGo</option>
        <option value="ashbak">AshBak</option>
      </select>
    </label>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const company = useCompany();
  const { brand } = useBrandSettings();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navItems =
    brand === 'ashbak' ? navigation : navigation.filter((item) => item.path !== '/business-plan');
  const current = navItems.find((item) => item.path === location.pathname) ?? navItems[0];
  const sectionIndex = navItems.findIndex((item) => item.path === location.pathname) + 1;

  const nav = (
    <nav aria-label="Corporate identity sections" className="flex flex-col gap-0.5 px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `group flex items-baseline gap-2.5 border-l-2 px-3 py-2.5 text-[13px] transition-colors duration-150 ease-out ${
              isActive
                ? 'border-brand-gold bg-white font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]'
                : 'border-transparent text-gray-700 hover:bg-white/80 hover:text-brand'
            }`
          }
        >
          <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.08em] text-gray-500 tabular-nums">
            {item.code}
          </span>
          <span className="leading-snug">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full bg-white">
      <a
        href="#kit-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-[13px] focus:text-ink focus:ring-2 focus:ring-brand"
      >
        Skip to content
      </a>

      <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col border-r border-gray-200 print:hidden lg:flex"
        style={{ background: 'var(--kit-rail)' }}
      >
        <div className="border-b border-gray-200 px-5 py-6">
          <Logo size={22} />
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
              Identity system
            </p>
            <span className="border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              v1.0
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-gray-500">
            {navItems.length} sections · export-ready artboards
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-3">{nav}</div>
        <div className="space-y-3 border-t border-gray-200 px-5 py-4">
          <BrandSwitcher />
          <BrandSettingsDialog />
          <p className="text-[10px] leading-relaxed text-gray-500">
            {company.endorsement}
            <br />
            {company.guidelines} · {company.copyright}
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col" style={{ background: 'var(--kit-stage)' }}>
        <div className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-3 lg:hidden print:hidden">
          <Logo size={19} />
          <div className="flex min-w-0 shrink-0 items-center gap-1.5">
            <select
              value={brand}
              aria-label="Active brand"
              onChange={(e) => {
                localStorage.setItem(
                  'brand-settings',
                  JSON.stringify({ brand: e.target.value, company: {} })
                );
                window.location.reload();
              }}
              className="max-w-[110px] border border-gray-200 bg-white px-2 py-1.5 text-[12px] text-ink outline-none"
            >
              <option value="nubiago">NubiaGo</option>
              <option value="ashbak">AshBak</option>
            </select>
            <BrandSettingsDialog />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? 'Close sections menu' : 'Open sections menu'}
            >
              {open ? <XIcon strokeWidth={1.5} /> : <MenuIcon strokeWidth={1.5} />}
              <span className="hidden sm:inline">Sections</span>
            </Button>
          </div>
        </div>

        {open ? (
          <div className="border-b border-gray-200 py-3 lg:hidden print:hidden" style={{ background: 'var(--kit-rail)' }}>
            {nav}
          </div>
        ) : null}

        <div className="sticky top-0 z-10 hidden border-b border-gray-200 bg-white/95 px-8 py-2.5 backdrop-blur-sm print:hidden lg:block lg:px-12">
          <div className="mx-auto flex max-w-[1220px] items-center justify-between gap-4">
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-500 tabular-nums">
                {String(sectionIndex).padStart(2, '0')} / {String(navItems.length).padStart(2, '0')}
              </span>
              <span className="truncate text-[13px] font-medium text-ink">{current?.label}</span>
              <span className="hidden text-[11px] text-gray-500 xl:inline">{current?.folder}</span>
            </div>
            <p className="shrink-0 text-[11px] text-gray-500">
              {company.name} · {company.guidelines}
            </p>
          </div>
        </div>

        <main
          id="kit-main"
          className="mx-auto w-full max-w-[1220px] px-5 py-10 sm:px-8 lg:px-12 lg:py-12"
        >
          <div className="border border-gray-200 bg-white px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
