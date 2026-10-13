import type { Property } from '../../types';

// Lookup uses the shared inventory; missing or malformed identifiers never fall back to another asset.
export function findProperty(properties: readonly Property[] | undefined, id: string | undefined): Property | undefined {
  if (!id || !/^prop-\d{3}$/.test(id)) return undefined;
  return properties?.find(property => property.id === id);
}
