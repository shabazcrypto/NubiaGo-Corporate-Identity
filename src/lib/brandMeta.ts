/** Non-React helpers for brand-aware filenames and labels. */

export type BrandId = 'nubiago' | 'ashbak';

export function brandPrefix(brand: string): 'NubiaGo' | 'AshBak' {
  return brand === 'ashbak' ? 'AshBak' : 'NubiaGo';
}

export function brandWordmark(brand: string): 'nubiago' | 'ashbak' {
  return brand === 'ashbak' ? 'ashbak' : 'nubiago';
}

/** Active brand from localStorage — safe outside React (export / pack handlers). */
export function readStoredBrand(): BrandId {
  if (typeof window === 'undefined') return 'nubiago';
  try {
    const raw = window.localStorage.getItem('brand-settings');
    if (!raw) return 'nubiago';
    const parsed = JSON.parse(raw) as { brand?: string };
    return parsed.brand === 'ashbak' ? 'ashbak' : 'nubiago';
  } catch {
    return 'nubiago';
  }
}

/** Replace a hardcoded NubiaGo_ / AshBak_ filename stem with the active prefix. */
export function withBrandPrefix(fileName: string, brand: string): string {
  const prefix = brandPrefix(brand);
  return fileName.replace(/^(NubiaGo|AshBak)_/, `${prefix}_`).replace(/NubiaGo/g, prefix).replace(/AshBak/g, prefix);
}
