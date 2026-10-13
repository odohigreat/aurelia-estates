
import { PropertyGrid } from '../features/properties/PropertyGrid';
import { MetricCard } from '../components/ui/MetricCard';
import { Wallet, Activity, Building2 } from 'lucide-react';
import { useProperties } from '../features/properties/useProperties';
import { summarizeProperties } from '../features/properties/portfolioSummary';

export default function PortfolioPage() {
  const { data: properties, isLoading, isError } = useProperties();
  const summary = summarizeProperties(properties ?? []);
  const pendingValue = isLoading ? 'Loading…' : isError ? 'Unavailable' : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 pb-6 border-b border-border/80">
        <div className="max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium mb-3">Listing overview</p>
          <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-ink tracking-tight">Property collection</h1>
          <p className="text-sm leading-relaxed text-slate-light mt-3">Published listings, not assets owned by you. These figures describe the illustrative collection, not personal holdings or completed purchases.</p>
        </div>
        <span className="self-start sm:self-center inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-2 text-xs font-medium text-ink whitespace-nowrap"><Building2 aria-hidden="true" className="w-3.5 h-3.5 text-accent" />Listed inventory</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          label="Listed value by currency"
          value={pendingValue ?? (summary.count ? Object.entries(summary.valueByCurrency).map(([currency, value]) => (
            <span key={currency} className="block text-lg sm:text-xl leading-relaxed">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(value)}
            </span>
          )) : 'No listed properties')}
          icon={<Wallet className="text-primary" />}
          description="Separate currency totals; no exchange-rate conversion."
        />
        <MetricCard 
          label="Average listed cap rate"
          value={pendingValue ?? (summary.meanCapRate === null ? 'Unavailable' : `${summary.meanCapRate.toFixed(2)}%`)}
          icon={<Activity className="text-primary" />}
          description="Simple average across all published listings."
        />
        <MetricCard 
          label="Listed properties"
          value={pendingValue ?? summary.count}
          icon={<Building2 className="text-primary" />}
          description="Available to browse; not a count of owned assets."
        />
      </div>
      <section aria-labelledby="browse-listings-title">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <h2 id="browse-listings-title" className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">Browse listings</h2>
          <p className="text-xs text-slate-muted">Filter the collection and review individual properties.</p>
        </div>
        <PropertyGrid />
      </section>
    </div>
  );
}
