import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUIStore } from './hooks/useStore';
import { ScrollToTop } from './components/ui/ScrollToTop';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import PortfolioAccessPage from './pages/public/PortfolioAccessPage';
import AnalyticsPage from './pages/public/AnalyticsPage';
import ComplianceInfoPage from './pages/public/ComplianceInfoPage';
import ApiDocsPage from './pages/public/ApiDocsPage';
import AboutPage from './pages/public/AboutPage';
import CareersPage from './pages/public/CareersPage';
import PressPage from './pages/public/PressPage';
import ContactPage from './pages/public/ContactPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';
import CookiesPage from './pages/public/CookiesPage';

// Dashboard Pages
import PortfolioPage from './pages/PortfolioPage';
import IntelligencePage from './pages/IntelligencePage';
import CompliancePage from './pages/CompliancePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUIStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Layout Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/portfolio-access" element={<PortfolioAccessPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/compliance-info" element={<ComplianceInfoPage />} />
            <Route path="/api-docs" element={<ApiDocsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
          </Route>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard/portfolio" replace />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="intelligence" element={<IntelligencePage />} />
            <Route path="compliance" element={<CompliancePage />} />
          </Route>
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
