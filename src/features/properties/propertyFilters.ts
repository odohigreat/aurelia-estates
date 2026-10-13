import type { Property } from '../../types';

export const TIERS = ['All', 'Ultra-Luxury', 'Luxury', 'Premium'] as const;
export interface PropertyFilters {
  search: string;
  tier: typeof TIERS[number];
  country: string;
  currency: string;
  minBedrooms: number;
}
export const DEFAULT_FILTERS: PropertyFilters = { search: '', tier: 'All', country: '', currency: '', minBedrooms: 0 };
export function propertyFilterChoices(properties: readonly Property[]) {
  return {
    countries: [...new Set(properties.map(p => p.location.country))].sort(),
    currencies: [...new Set(properties.map(p => p.currency))].sort(),
    bedrooms: [...new Set(properties.map(p => p.metrics.bedrooms))].sort((a, b) => a - b),
  };
}
// URL contract: q, tier, country, currency, bedrooms. Defaults are omitted.
export function parsePropertyFilters(params: URLSearchParams, properties: readonly Property[]): PropertyFilters {
  const choices = propertyFilterChoices(properties);
  const tier = params.get('tier');
  const bedrooms = params.get('bedrooms') ?? '';
  const minBedrooms = /^\d+$/.test(bedrooms) ? Number(bedrooms) : 0;
  return {
    search: params.get('q') ?? '',
    tier: TIERS.find(value => value === tier) ?? 'All',
    country: choices.countries.find(value => value === params.get('country')) ?? '',
    currency: choices.currencies.find(value => value === params.get('currency')) ?? '',
    minBedrooms: choices.bedrooms.includes(minBedrooms) ? minBedrooms : 0,
  };
}
export function serializePropertyFilters(filters: PropertyFilters, existing = new URLSearchParams()) {
  const params = new URLSearchParams(existing);
  for (const name of ['q', 'tier', 'country', 'currency', 'bedrooms']) params.delete(name);
  if (filters.search.trim()) params.set('q', filters.search);
  if (filters.tier !== 'All') params.set('tier', filters.tier);
  if (filters.country) params.set('country', filters.country);
  if (filters.currency) params.set('currency', filters.currency);
  if (filters.minBedrooms) params.set('bedrooms', String(filters.minBedrooms));
  return params;
}
export function filterProperties(properties: readonly Property[], filters: PropertyFilters): Property[] {
  const search = filters.search.trim().toLowerCase();
  return properties.filter(p =>
    (!search || [p.title, p.location.address, p.location.city, p.location.country].some(value => value.toLowerCase().includes(search))) &&
    (filters.tier === 'All' || p.tier === filters.tier) &&
    (!filters.country || p.location.country === filters.country) &&
    (!filters.currency || p.currency === filters.currency) &&
    p.metrics.bedrooms >= filters.minBedrooms,
  );
}
