import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PropertyFilter } from './PropertyFilter';
import { Card, CardContent } from '../../components/ui/Card';
import { MapPin, TrendingUp, Home } from 'lucide-react';
import { DUMMY_PROPERTIES } from './dummyData';
import { AssetDetailsModal } from './AssetDetailsModal';
import type { Property } from '../../types';

// Simulated API fetch
const fetchProperties = async (): Promise<Property[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(DUMMY_PROPERTIES), 800);
  });
};

export const PropertyGrid = React.memo(() => {
  const [activeTier, setActiveTier] = React.useState('All');
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);

  const { data: properties, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
    staleTime: 60000,
  });

  const handleTierChange = React.useCallback((tier: string) => {
    setActiveTier(tier);
  }, []);

  const filteredProperties = React.useMemo(() => {
    if (!properties) return [];
    if (activeTier === 'All') return properties;
    return properties.filter(p => p.tier === activeTier);
  }, [properties, activeTier]);

  return (
    <div className="space-y-6">
      <PropertyFilter activeTier={activeTier} onTierChange={handleTierChange} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="h-96 animate-pulse bg-surface-hover border-border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
          {filteredProperties.map(property => (
            <Card
              key={property.id}
              className="overflow-hidden group hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedProperty(property)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary border border-primary/20">
                  {property.tier}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg">{property.title}</h3>
                </div>
              </div>
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border/50">
                  <div className="text-xl text-white">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                  </div>
                  <div className="flex items-center text-slate-muted text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location.city}, {property.location.country}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col space-y-1">
                    <span className="text-slate-muted flex items-center"><Home className="w-3 h-3 mr-1" /> Sqft</span>
                    <span className="text-gray-200">{property.metrics.sqft.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-slate-muted flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Cap Rate</span>
                    <span className="text-emerald-400">{property.metrics.capRate}%</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-slate-muted">Forecast</span>
                    <span className="text-primary">+{property.metrics.appreciationForecast}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedProperty && (
        <AssetDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
});

PropertyGrid.displayName = 'PropertyGrid';
