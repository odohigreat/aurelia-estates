import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { confirmAccount } from '../features/auth/authActions';
import { accountUser } from '../features/auth/authSession';
import { useUIStore } from '../hooks/useStore';

export default function AuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    const query = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.slice(1));
    const code = query.get('code');
    const flowId = query.get('sb_flow_id') ?? undefined;
    const hasError = query.has('error') || hash.has('error') || query.has('error_code') || hash.has('error_code');
    // Remove sensitive callback parameters from browser history immediately.
    window.history.replaceState(window.history.state, '', '/auth/callback');
    const request = hasError || !code
      ? Promise.reject(new Error('This confirmation link has expired or cannot be used. Request another link from the sign-in page.'))
      : confirmAccount(code, flowId);
    request.then(session => {
      if (!active) return;
      useUIStore.getState().setSession(accountUser(session));
      navigate('/dashboard/portfolio', { replace: true });
    }).catch((reason: unknown) => {
      if (!active) return;
      setError(reason instanceof Error ? reason.message : 'The confirmation could not be completed. Please sign in.');
      requestAnimationFrame(() => headingRef.current?.focus());
    });
    return () => { active = false; };
  }, [location.search, location.hash, navigate]);
  return <AuthLayout eyebrow="Email confirmation" title="Confirming your email." description="Please wait while we check your confirmation link." footer={<Link to="/login" className="underline underline-offset-4">Return to sign in</Link>}>
    {error ? <div role="alert" className="space-y-4"><h2 ref={headingRef} tabIndex={-1} className="text-xl font-medium">Confirmation unavailable</h2><p className="text-sm text-rose-700">{error}</p><Link to="/login?confirmation=required" className="underline underline-offset-4">Request another confirmation link</Link></div> : <p role="status" aria-busy="true">Checking your confirmation link…</p>}
  </AuthLayout>;
}
