import * as React from 'react';
import { MarketTicker } from '../features/analytics/MarketTicker';
import { MacroCharts } from '../features/analytics/MacroCharts';
const ValuationDashboard = React.lazy(() => import('../features/analytics/ValuationDashboard'));

export default function IntelligencePage() {
  return (
    <div className="animate-fade-in space-y-8 pb-12">
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <MarketTicker />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Market Intelligence</h1>
        <p className="text-slate-muted mt-1">Proprietary valuation models and forecasts</p>
      </div>
      
      <React.Suspense fallback={<div className="h-[400px] w-full bg-surface animate-pulse rounded-xl" />}>
        <ValuationDashboard />
      </React.Suspense>

      <MacroCharts />
    </div>
  );
}
