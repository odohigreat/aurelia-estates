import { create } from 'zustand';

import type { AccountUser } from '../features/auth/authSession';

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  // Auth state
  isAuthenticated: boolean;
  authStatus: 'loading' | 'authenticated' | 'anonymous' | 'error';
  authError: string | null;
  isSigningOut: boolean;
  setSigningOut: (pending: boolean) => void;
  signOutRedirect: '/' | '/login' | null;
  signOutNotice: string | null;
  finishSignOut: (notice?: string) => void;
  clearSignOutRedirect: () => void;
  user: AccountUser | null;
  setSession: (user: AccountUser | null) => void;
  setAuthError: (message: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  
  // Auth defaults
  isAuthenticated: false,
  authStatus: 'loading',
  authError: null,
  isSigningOut: false,
  setSigningOut: (pending) => set({ isSigningOut: pending }),
  signOutRedirect: null,
  signOutNotice: null,
  finishSignOut: (notice) => set({ isAuthenticated: false, user: null, authStatus: 'anonymous', authError: null, isSigningOut: false, signOutRedirect: notice ? '/login' : '/', signOutNotice: notice ?? null }),
  clearSignOutRedirect: () => set({ signOutRedirect: null, signOutNotice: null }),
  user: null,
  setSession: (user) => set({ isAuthenticated: Boolean(user), authStatus: user ? 'authenticated' : 'anonymous', authError: null, user, ...(user ? { signOutRedirect: null, signOutNotice: null } : {}) }),
  setAuthError: (message) => set({ isAuthenticated: false, authStatus: 'error', authError: message, user: null }),
}));
