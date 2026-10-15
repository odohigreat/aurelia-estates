import * as React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserCircle, LogOut, Building2, ChartNoAxesCombined, ShieldCheck, ArrowUpLeft } from 'lucide-react';
import { useUIStore } from '../hooks/useStore';
import { Logo } from '../components/ui/Logo';
import { signOut } from '../features/auth/authActions';
import { useQueryClient } from '@tanstack/react-query';
import { MotionConfig } from 'framer-motion';

export default function DashboardLayout() {
  const location = useLocation();
  const { user, isSigningOut, setSigningOut } = useUIStore();
  const queryClient = useQueryClient();
  const [logoutError, setLogoutError] = React.useState<string | null>(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const profileId = React.useId();
  const profileRef = React.useRef<HTMLDivElement>(null);
  const profileButtonRef = React.useRef<HTMLButtonElement>(null);
  const logoutButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!profileOpen) return;
    logoutButtonRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setProfileOpen(false);
        profileButtonRef.current?.focus({ preventScroll: true });
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [profileOpen]);

  const getActiveTab = () => {
    if (location.pathname.includes('intelligence')) return 'intelligence';
    if (location.pathname.includes('compliance')) return 'compliance';
    return 'portfolio';
  };

  const activeTab = getActiveTab();

  const handleLogout = async () => {
    setSigningOut(true); setLogoutError(null);
    try {
      await signOut();
      await queryClient.cancelQueries({ predicate: query => query.queryKey[0] !== 'properties' });
      queryClient.removeQueries({ predicate: query => query.queryKey[0] !== 'properties' });
      useUIStore.getState().finishSignOut();
    } catch (error) {
      if (!useUIStore.getState().user) {
        useUIStore.getState().finishSignOut('You have been signed out on this browser, but the server could not confirm the request.');
        return;
      }
      setLogoutError(error instanceof Error ? error.message : 'Sign-out could not be completed. Please try again.');
    } finally {
      setSigningOut(false);
    }
  };

  // Framer Motion is only used inside the dashboard, so its reduced-motion config lives here.
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-surface text-gray-800">
      <nav className="border-b border-border/80 bg-white sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 py-4">
            <Logo to="/dashboard/portfolio" />
            <p className="hidden md:block text-xs font-medium uppercase tracking-[0.16em] text-slate-muted">Property workspace</p>
            <div ref={profileRef} className="flex items-center space-x-4 relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setProfileOpen(false);
              }}
            >
              <button
                ref={profileButtonRef}
                type="button"
                aria-label="Account options"
                aria-expanded={profileOpen}
                aria-controls={profileId}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:bg-surface-hover p-2 rounded-lg border border-border/70 transition-colors"
              >
                <UserCircle className="w-6 h-6 text-slate-muted" />
                <span className="text-sm font-medium hidden sm:block max-w-[180px] truncate">{user?.name || 'Account'}</span>
              </button>

              {profileOpen && (
                <div id={profileId} className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-sm bg-white border border-border/70 py-1 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border/50">
                    <p className="text-sm font-medium text-ink truncate">{user?.name}</p>
                    <p className="text-xs text-slate-muted truncate">{user?.email}</p>
                  </div>
                  <button
                    ref={logoutButtonRef}
                    type="button"
                    onClick={handleLogout}
                    disabled={isSigningOut}
                    className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-surface-hover flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isSigningOut ? 'Signing out…' : 'Sign out'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto lg:grid lg:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="bg-white border-b lg:border-b-0 lg:border-r border-border/80 lg:sticky lg:top-[81px] lg:self-start lg:min-h-[calc(100vh-81px)]">
          <p className="hidden lg:block px-9 pt-8 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Workspace</p>
            <nav aria-label="Dashboard navigation" className="flex lg:flex-col gap-1.5 overflow-x-auto p-3 lg:p-5">
              <Link
                to="/dashboard/portfolio"
                aria-current={activeTab === 'portfolio' ? 'page' : undefined}
                className={`flex items-center gap-2 lg:gap-2.5 px-2 sm:px-3 lg:px-4 py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'portfolio' ? 'bg-primary text-white shadow-sm' : 'text-gray-700 hover:text-ink hover:bg-surface-hover'}`}
              >
                <Building2 aria-hidden="true" className="h-4 w-4 shrink-0" />Listings
              </Link>
              <Link
                to="/dashboard/intelligence"
                aria-current={activeTab === 'intelligence' ? 'page' : undefined}
                className={`flex items-center gap-2 lg:gap-2.5 px-2 sm:px-3 lg:px-4 py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'intelligence' ? 'bg-primary text-white shadow-sm' : 'text-gray-700 hover:text-ink hover:bg-surface-hover'}`}
              >
                <ChartNoAxesCombined aria-hidden="true" className="h-4 w-4 shrink-0" />Analytics
              </Link>
              <Link
                to="/dashboard/compliance"
                aria-current={activeTab === 'compliance' ? 'page' : undefined}
                className={`flex items-center gap-2 lg:gap-2.5 px-2 sm:px-3 lg:px-4 py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'compliance' ? 'bg-primary text-white shadow-sm' : 'text-gray-700 hover:text-ink hover:bg-surface-hover'}`}
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />Compliance
              </Link>
            </nav>

          <div className="hidden lg:block mx-5 mt-5 pt-5 border-t border-border/70">
            <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 text-xs text-slate-muted hover:text-ink transition-colors"><ArrowUpLeft aria-hidden="true" className="w-3.5 h-3.5" />Back to website</Link>
          </div>
        </aside>
      <main className="min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {logoutError && <p role="alert" className="mb-6 text-sm text-rose-700">{logoutError}</p>}
        <React.Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>
          <Outlet />
        </React.Suspense>
      </main>
      </div>
    </div>
    </MotionConfig>
  );
}
