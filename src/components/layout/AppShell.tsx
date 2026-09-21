import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { navigation } from '../../data/navigation';
import { useCompany } from '@/lib/brand-context';
import { BrandSettingsDialog } from '@/components/layout/BrandSettings';
import { Button } from '@/components/ui/button';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const company = useCompany();

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const nav = (
    <nav aria-label="Corporate identity sections" className="flex flex-col gap-0.5">
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `group flex items-baseline gap-2.5 border-l-2 px-3 py-2 text-[13px] transition-colors duration-150 ease-out ${
              isActive
                ? 'border-brand-gold bg-white font-semibold text-ink'
                : 'border-transparent text-gray-700 hover:bg-white hover:text-brand'
            }`
          }
        >
          <span className="w-5 shrink-0 text-[10px] font-semibold tracking-[0.08em] text-gray-500">{item.code}</span>
          <span className="leading-snug">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full bg-white">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-gray-50 lg:flex print:hidden">
        <div className="border-b border-gray-200 px-5 py-6">
          <Logo size={22} />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
            Corporate Identity Kit
          </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">{nav}</div>
        <div className="border-t border-gray-200 px-5 py-4">
          <BrandSettingsDialog />
          <p className="mt-3 text-[10px] leading-relaxed text-gray-500">
            {company.endorsement}
            <br />
            {company.guidelines} · {company.copyright}
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3 lg:hidden print:hidden">
          <Logo size={19} />
          <div className="flex items-center gap-2">
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
              Sections
            </Button>
          </div>
        </div>
        {open ? <div className="border-b border-gray-200 bg-gray-50 py-3 lg:hidden print:hidden">{nav}</div> : null}

        <main className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">{children}</main>
      </div>
    </div>
  );
}
