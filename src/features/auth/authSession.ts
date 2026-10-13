import type { Session, SupabaseClient } from '@supabase/supabase-js';

export interface AccountUser {
  id: string;
  name: string;
  email: string;
}

export function accountUser(session: Session): AccountUser {
  const name: unknown = session.user.user_metadata?.full_name;
  return {
    id: session.user.id,
    name: typeof name === 'string' && name.trim() ? name.trim() : 'Account',
    email: session.user.email ?? '',
  };
}

// Subscribe synchronously, validate restored sessions, and ignore late results
// after logout, a newer auth event or StrictMode effect cleanup.
export function subscribeAuthSession(
  client: SupabaseClient,
  apply: (session: Session | null) => void,
  fail: (message: string) => void,
) {
  let active = true;
  let revision = 0;
  const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
    if (!active || event === 'INITIAL_SESSION') return;
    revision++;
    apply(session);
  });
  const initialRevision = revision;
  void (async () => {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    let session = data.session;
    if (session) {
      const verified = await client.auth.getUser();
      if (verified.error) throw verified.error;
      if (!verified.data.user) throw new Error('Session could not be verified.');
      session = { ...session, user: verified.data.user };
    }
    if (active && revision === initialRevision) apply(session);
  })().catch(() => {
    if (active && revision === initialRevision) fail('Your session could not be restored. Please sign in again or retry.');
  });
  return () => { active = false; subscription.unsubscribe(); };
}

export function authErrorMessage(error: unknown): string {
  const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined;
  switch (code) {
    case 'invalid_credentials': return 'The email address or password is incorrect.';
    case 'email_not_confirmed': return 'Confirm your email address before signing in. You can request another link below.';
    case 'otp_expired':
    case 'flow_state_expired':
    case 'flow_state_not_found':
    case 'bad_code_verifier': return 'This confirmation link has expired or cannot be used in this browser. Request another link and open it in the same browser.';
    case 'pkce_code_verifier_not_found': return 'This confirmation link cannot be used in this browser. Request another link and open it in the same browser used to register.';
    case 'weak_password': return 'Choose a stronger password with at least 8 characters.';
    case 'over_request_rate_limit':
    case 'over_email_send_rate_limit': return 'Too many requests. Please wait before trying again.';
    case 'signup_disabled': return 'Registration is not currently available.';
    case 'user_already_exists': return 'Unable to complete registration. Try signing in or requesting another confirmation link.';
    default: return 'Account access could not be completed. Please check your connection and try again.';
  }
}

export function safeReturnPath(value: unknown): string {
  if (typeof value === 'string' && value.startsWith('/') && !value.includes('\\')) {
    try {
      const parsed = new URL(value, 'https://aurelia.invalid');
      if (parsed.origin === 'https://aurelia.invalid' && (parsed.pathname === '/dashboard' || parsed.pathname.startsWith('/dashboard/'))) return parsed.pathname + parsed.search;
    } catch {
      return '/dashboard/portfolio';
    }
  }
  return '/dashboard/portfolio';
}
