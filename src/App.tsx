import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUIStore } from './hooks/useStore';
import { ScrollToTop } from './components/ui/ScrollToTop';

import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { Loader2 } from 'lucide-react';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));

// Public Pages
const PortfolioAccessPage = React.lazy(() => import('./pages/public/PortfolioAccessPage'));
const AnalyticsPage = React.lazy(() => import('./pages/public/AnalyticsPage'));
const ComplianceInfoPage = React.lazy(() => import('./pages/public/ComplianceInfoPage'));
const ApiDocsPage = React.lazy(() => import('./pages/public/ApiDocsPage'));
const AboutPage = React.lazy(() => import('./pages/public/AboutPage'));
const CareersPage = React.lazy(() => import('./pages/public/CareersPage'));
const PressPage = React.lazy(() => import('./pages/public/PressPage'));
const ContactPage = React.lazy(() => import('./pages/public/ContactPage'));
const PrivacyPage = React.lazy(() => import('./pages/public/PrivacyPage'));
const TermsPage = React.lazy(() => import('./pages/public/TermsPage'));
const CookiesPage = React.lazy(() => import('./pages/public/CookiesPage'));

// Dashboard Pages
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const IntelligencePage = React.lazy(() => import('./pages/IntelligencePage'));
const CompliancePage = React.lazy(() => import('./pages/CompliancePage'));

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

const PageLoader = () => (
  <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center">
    <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
    <p className="text-slate-muted text-sm uppercase tracking-widest font-bold">Secure Connection Established</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <React.Suspense fallback={<PageLoader />}>
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
        </React.Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
