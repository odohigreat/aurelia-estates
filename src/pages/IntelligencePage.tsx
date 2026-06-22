import * as React from 'react';
const ValuationDashboard = React.lazy(() => import('../features/analytics/ValuationDashboard'));

export default function IntelligencePage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Market Intelligence</h1>
        <p className="text-slate-muted mt-1">Proprietary valuation models and forecasts</p>
      </div>
      <React.Suspense fallback={<div className="h-[500px] w-full bg-surface animate-pulse rounded-xl" />}>
        <ValuationDashboard />
      </React.Suspense>
    </div>
  );
}
