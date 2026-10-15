import { useQuery } from '@tanstack/react-query';
import type { PropertyReadError } from './propertyApi';

// The API module (and Zod with it) starts downloading as soon as a page that lists properties
// loads, in parallel with rendering, instead of blocking that page's first paint.
let propertyApi: Promise<typeof import('./propertyApi')> | undefined;
const loadPropertyApi = () => (propertyApi ??= import('./propertyApi').catch(error => {
  propertyApi = undefined;
  throw error;
}));
void loadPropertyApi().catch(() => undefined);

// Checked by name so this module does not need the class (and Zod) up front.
const isPermanentReadError = (error: unknown) => error instanceof Error && error.name === 'PropertyReadError' && ['configuration', 'data'].includes((error as PropertyReadError).kind);

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async ({ signal }) => (await loadPropertyApi()).fetchPublishedProperties({
      url: import.meta.env.VITE_SUPABASE_URL,
      publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    }, signal),
    retry: (failureCount, error) => !isPermanentReadError(error) && failureCount < 1,
    staleTime: 60000,
  });
}
