import React, { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { defaultCompany as nubiaGoCompany, type CompanyInfo } from '@/data/brand';
import { defaultCompany as ashbakCompany } from '@/data/brand-ashbak';

const STORAGE_KEY = 'brand-settings';
const PROFILES_KEY = 'brand-profiles';

function downloadJsonFile(value: string, fileName: string) {
  const blob = new Blob([value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export type BrandProfile = {
  id: string;
  label: string;
  brand: string;
  company: Partial<CompanyInfo>;
  updatedAt: string;
};

function readStoredBrand(): { brand: string; company: Partial<CompanyInfo> } {
  if (typeof window === 'undefined') return { brand: 'nubiago', company: {} };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { brand: 'nubiago', company: {} };
    const parsed = JSON.parse(raw) as { brand: string; company: Partial<CompanyInfo> };
    return parsed && typeof parsed === 'object' ? parsed : { brand: 'nubiago', company: {} };
  } catch {
    return { brand: 'nubiago', company: {} };
  }
}

function readProfiles(): BrandProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BrandProfile[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProfiles(profiles: BrandProfile[]) {
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

interface BrandContextValue {
  brand: string;
  company: CompanyInfo;
  profiles: BrandProfile[];
  updateCompany: (patch: Partial<CompanyInfo>) => void;
  resetCompany: () => void;
  switchBrand: (brand: string) => void;
  saveProfile: (label: string) => BrandProfile;
  loadProfile: (id: string) => void;
  deleteProfile: (id: string) => void;
  exportProfileJson: () => void;
  importProfileJson: (json: string) => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

const brandMap: Record<string, CompanyInfo> = {
  nubiago: nubiaGoCompany,
  ashbak: ashbakCompany
};

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<{ brand: string; company: Partial<CompanyInfo> }>(() => readStoredBrand());
  const [profiles, setProfiles] = useState<BrandProfile[]>(() => readProfiles());

  const company = useMemo(() => ({ ...brandMap[stored.brand], ...stored.company }), [stored]);

  useEffect(() => {
    document.body.classList.remove('ashbak-theme', 'nubiago-theme');
    document.body.classList.add(`${stored.brand}-theme`);
  }, [stored.brand]);

  const persist = useCallback((next: { brand: string; company: Partial<CompanyInfo> }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStored(next);
  }, []);

  const updateCompany = useCallback((patch: Partial<CompanyInfo>) => {
    setStored((current) => {
      const next = { ...current, company: { ...current.company, ...patch } };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetCompany = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setStored({ brand: 'nubiago', company: {} });
  }, []);

  const switchBrand = useCallback((brand: string) => {
    persist({ brand, company: {} });
  }, [persist]);

  const saveProfile = useCallback(
    (label: string) => {
      const profile: BrandProfile = {
        id: `p_${Date.now().toString(36)}`,
        label: label.trim() || 'Untitled profile',
        brand: stored.brand,
        company: { ...stored.company },
        updatedAt: new Date().toISOString()
      };
      setProfiles((current) => {
        const next = [profile, ...current].slice(0, 24);
        writeProfiles(next);
        return next;
      });
      return profile;
    },
    [stored]
  );

  const loadProfile = useCallback(
    (id: string) => {
      const profile = readProfiles().find((p) => p.id === id);
      if (!profile) return;
      persist({ brand: profile.brand, company: { ...profile.company } });
    },
    [persist]
  );

  const deleteProfile = useCallback((id: string) => {
    setProfiles((current) => {
      const next = current.filter((p) => p.id !== id);
      writeProfiles(next);
      return next;
    });
  }, []);

  const exportProfileJson = useCallback(() => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      brand: stored.brand,
      company: company,
      overrides: stored.company
    };
    const prefix = stored.brand === 'ashbak' ? 'AshBak' : 'NubiaGo';
    downloadJsonFile(JSON.stringify(payload, null, 2), `${prefix}_Company_Profile.json`);
  }, [company, stored]);

  const importProfileJson = useCallback(
    (json: string) => {
      const parsed = JSON.parse(json) as {
        brand?: string;
        company?: Partial<CompanyInfo>;
        overrides?: Partial<CompanyInfo>;
      };
      const brand = parsed.brand === 'ashbak' ? 'ashbak' : 'nubiago';
      const overrides = parsed.overrides ?? parsed.company ?? {};
      // Prefer overrides; if full company was exported, strip defaults by only keeping editable diffs lightly:
      persist({ brand, company: overrides });
    },
    [persist]
  );

  const value = useMemo(
    () => ({
      brand: stored.brand,
      company,
      profiles,
      updateCompany,
      resetCompany,
      switchBrand,
      saveProfile,
      loadProfile,
      deleteProfile,
      exportProfileJson,
      importProfileJson
    }),
    [
      stored,
      company,
      profiles,
      updateCompany,
      resetCompany,
      switchBrand,
      saveProfile,
      loadProfile,
      deleteProfile,
      exportProfileJson,
      importProfileJson
    ]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useCompany(): CompanyInfo {
  const ctx = useContext(BrandContext);
  return ctx?.company ?? nubiaGoCompany;
}

export function useBrandSettings(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    return {
      brand: 'nubiago',
      company: nubiaGoCompany,
      profiles: [],
      updateCompany: () => undefined,
      resetCompany: () => undefined,
      switchBrand: () => undefined,
      saveProfile: () => ({
        id: '',
        label: '',
        brand: 'nubiago',
        company: {},
        updatedAt: ''
      }),
      loadProfile: () => undefined,
      deleteProfile: () => undefined,
      exportProfileJson: () => undefined,
      importProfileJson: () => undefined
    };
  }
  return ctx;
}

/** Filename prefix + wordmark string for the active brand. */
export function useBrandMeta() {
  const { brand, company } = useBrandSettings();
  const isAshBak = brand === 'ashbak';
  return {
    brand,
    company,
    isAshBak,
    prefix: isAshBak ? 'AshBak' : 'NubiaGo',
    wordmark: isAshBak ? 'ashbak' : 'nubiago'
  };
}

export { brandMap };
