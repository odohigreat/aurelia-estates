import { z } from 'zod';
import type { Property } from '../../types';

export interface PropertyApiConfig {
  url?: string;
  publishableKey?: string;
}

export class PropertyReadError extends Error {
  readonly kind: 'configuration' | 'network' | 'api' | 'data';

  constructor(kind: PropertyReadError['kind'], message: string) {
    super(message);
    this.name = 'PropertyReadError';
    this.kind = kind;
  }
}

const imageUrl = z.url().refine(value => ['https:', 'http:'].includes(new URL(value).protocol));
const propertyRows = z.array(z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.enum(['USD', 'EUR', 'CHF']),
  tier: z.enum(['Ultra-Luxury', 'Luxury', 'Premium']),
  address: z.string(),
  city: z.string().min(1),
  country: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  cap_rate: z.number(),
  appreciation_forecast: z.number(),
  sqft: z.number().int().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  images: z.array(imageUrl).min(1),
  is_published: z.literal(true),
}));

const COLUMNS = 'id,title,price,currency,tier,address,city,country,latitude,longitude,cap_rate,appreciation_forecast,sqft,bedrooms,bathrooms,images,is_published';
const PAGE_SIZE = 100;

// Only GET requests with the browser-safe publishable key. No fixture fallback.
export async function fetchPublishedProperties(
  config: PropertyApiConfig,
  signal?: AbortSignal,
  request: typeof fetch = fetch,
): Promise<Property[]> {
  let base: URL;
  try {
    base = new URL(config.url ?? '');
    if (base.protocol !== 'https:' || !base.hostname.endsWith('.supabase.co') || base.username || base.password || base.search || base.hash || base.pathname !== '/') throw new Error();
    if (!config.publishableKey?.startsWith('sb_publishable_')) throw new Error();
  } catch {
    throw new PropertyReadError('configuration', 'Property listings are not configured. Please try again later.');
  }

  const properties: Property[] = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const endpoint = new URL('/rest/v1/properties', base);
    endpoint.search = new URLSearchParams({ select: COLUMNS, is_published: 'eq.true', order: 'id.asc', limit: String(PAGE_SIZE), offset: String(offset) }).toString();
    let response: Response;
    try {
      response = await request(endpoint, { method: 'GET', headers: { apikey: config.publishableKey!, Accept: 'application/json' }, signal });
    } catch (error) {
      if (signal?.aborted) throw error;
      throw new PropertyReadError('network', 'Unable to connect to the property service. Please try again.');
    }
    if (!response.ok) throw new PropertyReadError('api', 'Property listings could not be loaded. Please try again later.');
    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      throw new PropertyReadError('data', 'Property information could not be read. Please try again later.');
    }
    const parsed = propertyRows.safeParse(payload);
    if (!parsed.success) throw new PropertyReadError('data', 'Property information is incomplete or invalid. Please try again later.');
    properties.push(...parsed.data.map(row => ({
      id: row.id, title: row.title, price: row.price, currency: row.currency, tier: row.tier,
      location: { lat: row.latitude, lng: row.longitude, address: row.address, city: row.city, country: row.country },
      metrics: { capRate: row.cap_rate, appreciationForecast: row.appreciation_forecast, sqft: row.sqft, bedrooms: row.bedrooms, bathrooms: row.bathrooms },
      images: row.images,
    })));
    if (parsed.data.length < PAGE_SIZE) return properties;
  }
}
