import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Activity, TrendingUp, MapPin } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Predictive Analytics" 
        subtitle="Proprietary 10-year market appreciation models and capitalization rate forecasts."
      />
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-surface border-border/50">
            <CardContent className="p-8">
              <Activity className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Macroeconomic Modeling</h3>
              <p className="text-slate-muted">We ingest petabytes of global financial data, interest rate forecasts, and inflation indices to predict luxury asset resilience.</p>
            </CardContent>
          </Card>
          <Card className="bg-surface border-border/50">
            <CardContent className="p-8">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Geospatial Zoning</h3>
              <p className="text-slate-muted">Our algorithms track municipal zoning changes and infrastructure developments to identify high-appreciation corridors before they become public knowledge.</p>
            </CardContent>
          </Card>
          <Card className="bg-surface border-border/50">
            <CardContent className="p-8">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Cap Rate Velocity</h3>
              <p className="text-slate-muted">Real-time tracking of rental yields and capitalization rate compression across the top 20 global wealth hubs.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-surface rounded-2xl border border-border/50 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6">Interactive Data Hub</h2>
          <div className="w-full h-64 md:h-96 bg-background rounded-xl border border-border flex items-end justify-between p-4 md:p-8 space-x-2">
            {/* Mock Chart */}
            {[20, 35, 25, 45, 60, 50, 75, 65, 85, 95].map((height, i) => (
              <div 
                key={i} 
                className="w-full bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm hover:from-primary hover:to-primary-hover transition-colors cursor-pointer relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-muted mt-6 text-center text-sm">Figure 1.0: Projected 10-Year Capital Appreciation Index for Tier-1 Assets.</p>
        </div>
      </div>
    </div>
  );
}
