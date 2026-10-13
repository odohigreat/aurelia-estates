import { useQuery } from '@tanstack/react-query';
import { fetchPublishedProperties, PropertyReadError } from './propertyApi';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: ({ signal }) => fetchPublishedProperties({
      url: import.meta.env.VITE_SUPABASE_URL,
      publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    }, signal),
    retry: (failureCount, error) => !(error instanceof PropertyReadError && ['configuration', 'data'].includes(error.kind)) && failureCount < 1,
    staleTime: 60000,
  });
}
