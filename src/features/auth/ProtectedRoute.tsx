import type { ReactNode } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../hooks/useStore';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authStatus, authError, isSigningOut, signOutRedirect, signOutNotice } = useUIStore();
  const location = useLocation();
  if (authStatus === 'loading' || (isSigningOut && authStatus !== 'authenticated')) return <div role="status" aria-busy="true" className="min-h-[50vh] flex items-center justify-center text-slate-muted">{isSigningOut ? 'Signing out…' : 'Restoring your session…'}</div>;
  if (authStatus === 'error') return <div role="alert" className="max-w-lg mx-auto p-8 space-y-4">
    <p>{authError}</p>
    <button type="button" onClick={() => window.location.reload()} className="underline underline-offset-4 mr-6">Retry</button>
    <Link to="/login" className="underline underline-offset-4">Sign in</Link>
  </div>;
  if (authStatus !== 'authenticated') return <Navigate to={signOutRedirect ?? '/login'} replace state={{ from: location.pathname + location.search, authNotice: signOutNotice }} />;
  return children;
}
