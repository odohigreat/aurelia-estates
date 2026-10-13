import * as React from 'react';
import { MarketTicker } from '../features/analytics/MarketTicker';
import { MacroCharts } from '../features/analytics/MacroCharts';
const ValuationDashboard = React.lazy(() => import('../features/analytics/ValuationDashboard'));

export default function IntelligencePage() {
  return (
    <div className="animate-fade-in space-y-6 pb-8">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <MarketTicker />
      </div>
      <div className="pb-6 border-b border-border/80">
        <h1 className="font-sans text-3xl sm:text-4xl font-semibold text-ink tracking-tight">Market overview</h1>
        <p className="text-sm leading-relaxed text-slate-light mt-3">Example valuations and regional comparisons. These figures are illustrative, rather than live market data or investment predictions.</p>
      </div>
      
      <React.Suspense fallback={<div className="h-[400px] w-full bg-surface animate-pulse rounded-xl" />}>
        <ValuationDashboard />
      </React.Suspense>

      <MacroCharts />
    </div>
  );
}
