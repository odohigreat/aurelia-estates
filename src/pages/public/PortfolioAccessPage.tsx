import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

const MARKETS = [
  { city: "London", country: "United Kingdom", properties: 42, volume: "$1.2B" },
  { city: "Dubai", country: "UAE", properties: 65, volume: "$2.4B" },
  { city: "New York", country: "United States", properties: 38, volume: "$1.8B" },
  { city: "Monaco", country: "Monaco", properties: 12, volume: "$950M" }
];

export default function PortfolioAccessPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader 
        title="Portfolio Access" 
        subtitle="Explore example properties and illustrative market figures."
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-10 sm:mt-14">
        <p className="text-slate-light text-base leading-[1.8] text-center max-w-2xl mx-auto mb-10">
          The regional figures below are illustrative and separate from the four portal listings. They do not represent available properties or completed transactions.
        </p>

        <h2 className="font-display text-3xl font-normal text-ink mb-8 border-b border-border/50 pb-4">Illustrative regional overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {MARKETS.map((market, idx) => (
            <Card key={idx} className="bg-white border-border group">
              <CardContent className="p-6">
                <p className="text-slate-muted text-[10px] uppercase tracking-[0.16em] font-medium mb-2">{market.country}</p>
                <h3 className="font-display text-2xl font-normal text-ink mb-6 group-hover:text-primary transition-colors">{market.city}</h3>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Example property count</span>
                    <span className="text-ink font-medium">{market.properties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Illustrative value</span>
                    <span className="text-ink font-medium">{market.volume}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-xl p-8 md:p-12 text-center">
          <h2 className="font-display text-3xl font-normal text-ink mb-4">Explore the listings</h2>
          <p className="text-slate-light mb-8 max-w-2xl mx-auto">
            Open the portal to browse example listings. Access does not include identity or proof-of-funds checks, confidentiality agreements or investment allocation.
          </p>
          <a href="/login" className="inline-flex items-center justify-center h-12 px-8 font-medium rounded-md bg-primary text-background hover:bg-primary-hover transition-colors">
            Open portal
          </a>
        </div>
      </div>
    </div>
  );
}
