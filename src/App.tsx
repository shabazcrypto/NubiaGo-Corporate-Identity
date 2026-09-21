import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { BrandSystemPage } from './pages/BrandSystem';
import { LetterheadPage } from './pages/Letterhead';
import { EmailPage } from './pages/Email';
import { PresentationPage } from './pages/Presentation';
import { CommercialPage } from './pages/Commercial';
import { BusinessCardPage } from './pages/BusinessCard';
import { DocumentCoversPage } from './pages/DocumentCovers';
import { CataloguePage } from './pages/Catalogue';
import { ReportsPage } from './pages/Reports';
import { DigitalSocialPage } from './pages/DigitalSocial';
import { AssetsPage } from './pages/Assets';

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
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
          <Route path="/digital-social" element={<DigitalSocialPage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="*" element={<Navigate to="/brand-system" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>);

}