import type { SupabaseClient } from '@supabase/supabase-js';

let clientPromise: Promise<SupabaseClient> | undefined;

export function getSupabase(): Promise<SupabaseClient> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  try {
    const parsed = new URL(url ?? '');
    if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.supabase.co') || parsed.username || parsed.password || parsed.pathname !== '/' || parsed.search || parsed.hash || !key?.startsWith('sb_publishable_')) throw new Error();
  } catch {
    return Promise.reject(new Error('Account access is not configured. Please try again later.'));
  }
  // Load the SDK separately from the application shell and create only one client.
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(url, key, {
    auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
  })).catch(() => {
    clientPromise = undefined;
    throw new Error('Account access could not be started. Please try again.');
  });
  return clientPromise;
}
