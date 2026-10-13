import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Activity, TrendingUp, MapPin } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader 
        title="Illustrative analytics"
        subtitle="Example valuations and capitalisation rates. These figures are not live market data or predictions."
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-10 sm:mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          <Card className="bg-white border-border">
            <CardContent className="p-6">
              <Activity className="w-5 h-5 text-primary mb-5" />
              <h3 className="font-display text-2xl font-normal text-ink mb-2">Valuation examples</h3>
              <p className="text-sm leading-relaxed text-slate-light">Compare illustrative property values over time. The figures do not reflect current market conditions.</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-border">
            <CardContent className="p-6">
              <MapPin className="w-5 h-5 text-primary mb-5" />
              <h3 className="font-display text-2xl font-normal text-ink mb-2">Property locations</h3>
              <p className="text-sm leading-relaxed text-slate-light">View the locations of the example listings. Maps and planning information are not available.</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-border">
            <CardContent className="p-6">
              <TrendingUp className="w-5 h-5 text-primary mb-5" />
              <h3 className="font-display text-2xl font-normal text-ink mb-2">Capitalisation rates</h3>
              <p className="text-sm leading-relaxed text-slate-light">Compare example regional rates. These figures are not verified rental yields or market indicators.</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-surface rounded-xl border border-border p-5 sm:p-8 md:p-10">
          <h2 className="font-display text-3xl font-normal text-ink mb-6">Illustrative index</h2>
          <div className="w-full h-64 md:h-96 bg-background rounded-xl border border-border flex items-end justify-between p-4 md:p-8 space-x-2">
            {/* Mock Chart */}
            {[20, 35, 25, 45, 60, 50, 75, 65, 85, 95].map((height, i) => (
              <div 
                key={i} 
                className="w-full bg-primary/65 rounded-t-sm hover:bg-primary transition-colors relative group"
                style={{ height: `${height}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface text-ink text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}%
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-light mt-6 text-left text-xs leading-relaxed">Ten example index values. These figures do not represent a measured period.</p>
        </div>
      </div>
    </div>
  );
}
