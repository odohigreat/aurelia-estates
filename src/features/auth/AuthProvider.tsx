import { useEffect, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSupabase } from '../../lib/supabase';
import { useUIStore } from '../../hooks/useStore';
import { accountUser, subscribeAuthSession } from './authSession';
import { useLocation } from 'react-router-dom';

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const signOutRedirect = useUIStore(state => state.signOutRedirect);
  useEffect(() => {
    if (signOutRedirect && location.pathname === signOutRedirect) useUIStore.getState().clearSignOutRedirect();
  }, [location.pathname, signOutRedirect]);
  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | undefined;
    getSupabase().then(client => {
      if (!active) return;
      cleanup = subscribeAuthSession(client, session => {
        const previous = useUIStore.getState().user?.id;
        if (previous && previous !== session?.user.id) {
          void queryClient.cancelQueries({ predicate: query => query.queryKey[0] !== 'properties' });
          queryClient.removeQueries({ predicate: query => query.queryKey[0] !== 'properties' });
        }
        useUIStore.getState().setSession(session ? accountUser(session) : null);
      }, message => useUIStore.getState().setAuthError(message));
    }).catch(() => {
      if (active) useUIStore.getState().setAuthError('Account access is unavailable. Check the connection and configuration, then retry.');
    });
    return () => { active = false; cleanup?.(); };
  }, [queryClient]);
  return children;
}
