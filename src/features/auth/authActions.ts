import { getSupabase } from '../../lib/supabase';
import { authErrorMessage } from './authSession';

export async function signIn(email: string, password: string) {
  const client = await getSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(authErrorMessage(error));
  if (!data.session) throw new Error('Sign-in did not establish a session. Please try again.');
  return data.session;
}

export async function registerAccount(email: string, password: string, fullName: string) {
  const client = await getSupabase();
  const { data, error } = await client.auth.signUp({
    email, password,
    options: {
      emailRedirectTo: new URL('/auth/callback', window.location.origin).href,
      data: { full_name: fullName },
    },
  });
  if (error) throw new Error(authErrorMessage(error));
  return data.session;
}

export async function resendConfirmation(email: string) {
  const client = await getSupabase();
  const { error } = await client.auth.resend({
    type: 'signup', email,
    options: { emailRedirectTo: new URL('/auth/callback', window.location.origin).href },
  });
  if (error) throw new Error(authErrorMessage(error));
}

export async function signOut() {
  const client = await getSupabase();
  const { error } = await client.auth.signOut({ scope: 'local' });
  if (error) throw new Error(authErrorMessage(error));
}

// A confirmation code is one-use; share the exchange across StrictMode mounts.
let confirmation: { code: string; flowId?: string; request: ReturnType<typeof exchangeCode> } | undefined;
async function exchangeCode(code: string, flowId?: string) {
  const client = await getSupabase();
  const { data, error } = await client.auth.exchangeCodeForSession(code, flowId ? { flowId } : undefined);
  if (error) throw new Error(authErrorMessage(error));
  if (!data.session) throw new Error('The confirmation could not establish a session. Please sign in.');
  return data.session;
}
export function confirmAccount(code: string, flowId?: string) {
  if (confirmation?.code !== code || confirmation.flowId !== flowId) {
    const request = exchangeCode(code, flowId);
    confirmation = { code, flowId, request };
    const clear = () => { if (confirmation?.request === request) confirmation = undefined; };
    // Coalesce only pending work. A used link must never replay a cached session.
    void request.then(clear, clear);
  }
  return confirmation.request;
}
