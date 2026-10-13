import { useEffect, useId, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProperties } from '../../features/properties/useProperties';
import { findProperty } from '../../features/properties/propertyLookup';
import { PropertyEnquiryForm } from '../../features/enquiries/PropertyEnquiryForm';
import { PropertyDetailsContent } from '../../features/properties/PropertyDetailsContent';

export default function PropertyDetailsPage() {
  const { propertyId } = useParams();
  const { data, isLoading, isError, error, refetch } = useProperties();
  const property = findProperty(data, propertyId);
  const titleId = useId();
  const regionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isLoading) regionRef.current?.focus({ preventScroll: true });
  }, [propertyId, isLoading, isError]);

  return (
    <section ref={regionRef} tabIndex={-1} aria-labelledby={titleId} className="max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
      <Link to="/portfolio-access" className="inline-flex text-sm text-slate-light underline underline-offset-4 mb-4 hover:text-primary transition-colors">Return to portfolio overview</Link>
      <p className="text-xs leading-relaxed text-slate-muted mb-5 max-w-3xl">This listing, its images and financial figures are illustrative. Availability is not verified, and purchases cannot be made through this website.</p>
      {isLoading ? (
        <div role="status" aria-busy="true">
          <h1 id={titleId} className="text-2xl text-ink mb-6">Loading property…</h1>
          <div aria-hidden="true" className="rounded-2xl overflow-hidden border border-border/50">
            <div className="h-[380px] sm:h-96 bg-surface-hover animate-pulse" />
            <div className="p-5 sm:p-7 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-8"><div className="h-24 bg-surface animate-pulse rounded-xl" /><div className="h-80 bg-surface animate-pulse rounded-xl" /></div>
              <div className="h-96 bg-surface animate-pulse rounded-xl" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div role="alert">
          <h1 id={titleId} className="text-2xl text-ink">Unable to load property</h1>
          <p className="mt-3 text-slate-light">{error?.message ?? 'Please try again later.'}</p>
          <button type="button" onClick={() => void refetch()} className="text-primary mt-4">Retry loading</button>
        </div>
      ) : property ? (
        <>
        <div className="bg-white border border-border/80 rounded-2xl overflow-hidden shadow-sm">
          <PropertyDetailsContent property={property} titleId={titleId} headingLevel="h1" />
        </div>
        <PropertyEnquiryForm key={property.id} property={property} inventory={data ?? []} />
        </>
      ) : (
        <h1 id={titleId} className="text-2xl text-ink">Property not found</h1>
      )}
    </section>
  );
}
