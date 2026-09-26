import { Component, Suspense, lazy, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BrandProvider } from '@/lib/brand-context';
import { AppShell } from './components/layout/AppShell';

const BrandSystemPage = lazy(() =>
  import('./pages/BrandSystem').then((m) => ({ default: m.BrandSystemPage }))
);
const LetterheadPage = lazy(() =>
  import('./pages/Letterhead').then((m) => ({ default: m.LetterheadPage }))
);
const EmailPage = lazy(() =>
  import('./pages/Email').then((m) => ({ default: m.EmailPage }))
);
const PresentationPage = lazy(() =>
  import('./pages/Presentation').then((m) => ({ default: m.PresentationPage }))
);
const CommercialPage = lazy(() =>
  import('./pages/Commercial').then((m) => ({ default: m.CommercialPage }))
);
const BusinessCardPage = lazy(() =>
  import('./pages/BusinessCard').then((m) => ({ default: m.BusinessCardPage }))
);
const DocumentCoversPage = lazy(() =>
  import('./pages/DocumentCovers').then((m) => ({ default: m.DocumentCoversPage }))
);
const CataloguePage = lazy(() =>
  import('./pages/Catalogue').then((m) => ({ default: m.CataloguePage }))
);
const ReportsPage = lazy(() =>
  import('./pages/Reports').then((m) => ({ default: m.ReportsPage }))
);
const DigitalPage = lazy(() =>
  import('./pages/Digital').then((m) => ({ default: m.DigitalPage }))
);
const AssetsPage = lazy(() =>
  import('./pages/Assets').then((m) => ({ default: m.AssetsPage }))
);
const BusinessPlanPage = lazy(() =>
  import('./pages/BusinessPlan').then((m) => ({ default: m.BusinessPlanPage }))
);

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-2 px-6 text-center">
      <div className="h-1 w-16 animate-pulse bg-brand" />
      <p className="text-[14px] font-medium text-gray-700">Loading section…</p>
    </div>
  );
}

class SectionErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="mx-auto max-w-lg border border-state-error/30 bg-gray-50 px-6 py-8">
          <h2 className="text-[16px] font-semibold text-ink">This section failed to render</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-gray-700">{this.state.error.message}</p>
          <button
            type="button"
            className="mt-4 border border-gray-200 bg-white px-3 py-2 text-[12px] font-medium text-ink"
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined;
  return (
    <BrandProvider>
      <BrowserRouter basename={basename}>
        <AppShell>
          <SectionErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Navigate to="/brand-system" replace />} />
              <Route path="/brand-system" element={<BrandSystemPage />} />
              <Route path="/letterhead" element={<LetterheadPage />} />
              <Route path="/email" element={<EmailPage />} />
              <Route path="/presentation" element={<PresentationPage />} />
              <Route path="/commercial" element={<CommercialPage />} />
              <Route path="/business-card" element={<BusinessCardPage />} />
              <Route path="/document-covers" element={<DocumentCoversPage />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/digital" element={<DigitalPage />} />
              <Route path="/digital-social" element={<Navigate to="/digital" replace />} />
              <Route path="/social-covers" element={<Navigate to="/digital" replace />} />
              <Route path="/assets" element={<AssetsPage />} />
              <Route path="/business-plan" element={<BusinessPlanPage />} />
              <Route path="*" element={<Navigate to="/brand-system" replace />} />
            </Routes>
          </Suspense>
          </SectionErrorBoundary>
        </AppShell>
      </BrowserRouter>
    </BrandProvider>
  );
}
