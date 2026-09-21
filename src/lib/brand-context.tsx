import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { defaultCompany, type CompanyInfo } from '@/data/brand';

const STORAGE_KEY = 'nubiago-brand-settings';

function readStoredCompany(): Partial<CompanyInfo> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<CompanyInfo>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

interface BrandContextValue {
  company: CompanyInfo;
  updateCompany: (patch: Partial<CompanyInfo>) => void;
  resetCompany: () => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [override, setOverride] = useState<Partial<CompanyInfo>>(() => readStoredCompany());

  const company = useMemo(() => ({ ...defaultCompany, ...override }), [override]);

  const updateCompany = useCallback((patch: Partial<CompanyInfo>) => {
    setOverride((current) => {
      const next = { ...current, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetCompany = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setOverride({});
  }, []);

  const value = useMemo(
    () => ({ company, updateCompany, resetCompany }),
    [company, updateCompany, resetCompany]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useCompany(): CompanyInfo {
  const ctx = useContext(BrandContext);
  return ctx?.company ?? defaultCompany;
}

export function useBrandSettings(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    return {
      company: defaultCompany,
      updateCompany: () => undefined,
      resetCompany: () => undefined
    };
  }
  return ctx;
}
