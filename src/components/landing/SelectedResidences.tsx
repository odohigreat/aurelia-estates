import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useProperties } from '../../features/properties/useProperties';

// Resize only the known image CDN. Other listing-image URLs remain unchanged.
function responsiveListingImage(source: string) {
  try {
    const original = new URL(source);
    if (original.protocol !== 'https:' || original.hostname !== 'images.unsplash.com') return {};
    const variant = (width: number) => {
      const url = new URL(original);
      url.searchParams.set('w', String(width));
      url.searchParams.set('h', String(Math.round(width * 3 / 4)));
      url.searchParams.set('fit', 'crop');
      if (!url.searchParams.has('crop')) url.searchParams.set('crop', 'center');
      return url.href;
    };
    return {
      src: variant(800),
      srcSet: [320, 640, 960, 1280, 1600].map(width => `${variant(width)} ${width}w`).join(', '),
      sizes: '(min-width: 1280px) 576px, (min-width: 1024px) calc((100vw - 128px) / 2), (min-width: 768px) calc((100vw - 88px) / 2), (min-width: 640px) calc(100vw - 64px), calc(100vw - 48px)',
    };
  } catch {
    return {};
  }
}

// Reuse the published inventory query without importing dashboard charts.
export function SelectedResidences() {
  const { data: properties, isLoading, isError, error, refetch } = useProperties();
  return (
    <section id="residences" aria-labelledby="residences-title" className="scroll-mt-24 bg-white text-[#242622] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#706650] mb-4">The Aurelia collection</p>
            <h2 id="residences-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight">Selected properties.</h2>
          </div>
          <p className="text-sm leading-relaxed text-[#62635c] max-w-sm">Browse residences across international locations. Listing information, images and financial scenarios are illustrative.</p>
        </div>
        {isLoading ? <div role="status" aria-busy="true">
          <p className="text-sm text-slate-muted mb-6">Loading properties…</p>
          <div aria-hidden="true" className="grid grid-cols-1 md:grid-cols-2 gap-8">{[1, 2, 3, 4].map(id => <div key={id} className="space-y-5"><div className="aspect-[4/3] sm:aspect-[16/11] bg-surface-hover animate-pulse" /><div className="h-36 bg-surface animate-pulse" /></div>)}</div>
        </div> : isError ? <div role="alert" className="rounded-xl border border-border p-6">
          <p>{error?.message ?? 'Property listings could not be loaded.'}</p>
          <button type="button" onClick={() => void refetch()} className="mt-4 text-primary underline underline-offset-4">Retry loading</button>
        </div> : properties?.length === 0 ? <p role="status" className="text-slate-muted">No properties are currently published.</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {properties?.map((property, index) => (
            <Link key={property.id} to={`/properties/${property.id}`} className="group block min-w-0 rounded-2xl overflow-hidden border border-border/80 bg-white shadow-[0_6px_24px_-12px_rgba(23,38,53,0.15)] hover:shadow-[0_12px_32px_-12px_rgba(23,38,53,0.2)] transition-shadow duration-200" aria-label={`Explore ${property.title}, ${property.location.city}`}>
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-surface-hover">
                <img src={property.images[0]} {...responsiveListingImage(property.images[0])} alt={`Illustrative property image for ${property.title}`} loading="lazy" decoding="async" width={800} height={600} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/95 text-[#454539] text-[10px] uppercase tracking-[0.16em]">{property.tier}</span>
                <span aria-hidden="true" className="absolute bottom-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#242622]"><ArrowUpRight className="w-5 h-5" /></span>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.16em] text-[#62635c] mb-3">
                  <span>{property.location.city}, {property.location.country}</span>
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal mb-3 group-hover:text-accent transition-colors">{property.title}</h3>
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 text-sm text-slate-light border-t border-border/70 pt-4">
                  <span>{property.metrics.bedrooms} bedrooms · {property.metrics.sqft.toLocaleString()} sq ft</span>
                  <span className="tabular-nums font-semibold text-ink">Listed value · {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
