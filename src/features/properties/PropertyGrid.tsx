import * as React from 'react';
import { useProperties } from './useProperties';
import { PropertyFilter } from './PropertyFilter';
import { Card, CardContent } from '../../components/ui/Card';
import { MapPin, TrendingUp, Home } from 'lucide-react';
import type { Property } from '../../types';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_FILTERS, filterProperties, parsePropertyFilters, propertyFilterChoices, serializePropertyFilters, type PropertyFilters } from './propertyFilters';

// The modal (and Framer Motion) is only needed after a click, so it loads separately and is
// warmed during idle time to keep the first open instant.
const loadAssetDetailsModal = () => import('./AssetDetailsModal');
const AssetDetailsModal = React.lazy(() => loadAssetDetailsModal().then(module => ({ default: module.AssetDetailsModal })));

export const PropertyGrid = React.memo(() => {
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);
  const [params, setParams] = useSearchParams();
  const { data: properties, isLoading, isError, error, refetch } = useProperties();
  const filters = parsePropertyFilters(params, properties ?? []);
  const choices = propertyFilterChoices(properties ?? []);
  const filteredProperties = filterProperties(properties ?? [], filters);
  const changeFilters = (changes: Partial<PropertyFilters>, replace = false) => {
    setParams(serializePropertyFilters({ ...filters, ...changes }, params), { replace });
  };
  const resetFilters = () => setParams(serializePropertyFilters(DEFAULT_FILTERS, params));
  React.useEffect(() => {
    const warm = () => { void loadAssetDetailsModal().catch(() => undefined); };
    if (typeof window.requestIdleCallback !== 'function') {
      const timer = window.setTimeout(warm, 2000);
      return () => window.clearTimeout(timer);
    }
    const idle = window.requestIdleCallback(warm, { timeout: 4000 });
    return () => window.cancelIdleCallback(idle);
  }, []);

  return (
    <div className="space-y-6">
      <PropertyFilter filters={filters} choices={choices} onChange={changeFilters} onReset={resetFilters} />
      <p role="status" aria-live="polite" className="text-sm text-slate-muted">
        {isLoading ? 'Loading properties…' : isError ? 'Properties could not be loaded.' : `${filteredProperties.length} of ${properties?.length ?? 0} properties match`}
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-96 animate-pulse bg-surface-hover border-border" />
          ))}
        </div>
      ) : isError ? (
        <div role="alert" className="rounded-xl border border-border bg-surface p-6 text-slate-light">
          <p>{error?.message ?? 'Unable to load the property listings. Please try again.'}</p>
          <button type="button" className="mt-4 text-primary" onClick={() => void refetch()}>Retry loading</button>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-6 text-slate-light">
          <p>No properties match these filters.</p>
          <button type="button" className="mt-4 text-primary" onClick={resetFilters}>Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
          {filteredProperties.map(property => (
            <Card
              key={property.id}
              className="relative min-w-0 overflow-hidden group rounded-2xl hover:border-accent/50 hover:shadow-md transition-[border-color,box-shadow] duration-200 cursor-pointer"
            >
              <button
                type="button"
                aria-label={`View details for ${property.title}, ${property.location.city}`}
                aria-haspopup="dialog"
                className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                onClick={(event) => {
                  // Capture a consistent opener even in browsers that do not focus buttons on pointer clicks.
                  event.currentTarget.focus({ preventScroll: true });
                  setSelectedProperty(property);
                }}
              />
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={`Illustrative property image for ${property.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-medium text-primary border border-primary/20">
                  {property.tier}
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <h3 className="font-display text-2xl leading-snug font-normal text-ink">{property.title}</h3>
                <div className="flex flex-col items-start gap-2 pb-4 border-b border-border/50">
                  <div className="text-xl font-semibold tabular-nums tracking-tight text-ink">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                  </div>
                  <div className="flex items-center text-slate-muted text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location.city}, {property.location.country}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-slate-muted flex items-center"><Home className="w-3 h-3 mr-1" /> Sq ft</span>
                    <span className="text-ink font-medium tabular-nums">{property.metrics.sqft.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-slate-muted flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Cap rate</span>
                    <span className="text-emerald-700">{property.metrics.capRate}%</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-slate-muted">Scenario</span>
                    <span className="text-primary">+{property.metrics.appreciationForecast}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedProperty && (
        <React.Suspense fallback={null}>
          <AssetDetailsModal
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        </React.Suspense>
      )}
    </div>
  );
});

PropertyGrid.displayName = 'PropertyGrid';
