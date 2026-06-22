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
    <div className="pb-24">
      <StaticPageHeader 
        title="Portfolio Access" 
        subtitle="Exclusive, off-market inventory across the globe's most sought-after zip codes."
      />
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <p className="text-slate-light text-xl leading-relaxed text-center max-w-3xl mx-auto mb-16">
          Aurelia Estates curates an elite selection of institutional-grade properties, available strictly to our vetted network of family offices and high-net-worth individuals.
        </p>

        <h2 className="text-3xl font-bold text-white mb-8 border-b border-border/50 pb-4">Curated Global Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {MARKETS.map((market, idx) => (
            <Card key={idx} className="bg-surface hover:border-primary/50 transition-colors group cursor-pointer">
              <CardContent className="p-6">
                <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-2">{market.country}</p>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors">{market.city}</h3>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Off-Market Assets</span>
                    <span className="text-white font-medium">{market.properties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Transacted Volume</span>
                    <span className="text-white font-medium">{market.volume}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Request Portfolio Allocation</h2>
          <p className="text-slate-light mb-8 max-w-2xl mx-auto">
            Access to specific asset addresses, legal due diligence packages, and virtual data rooms (VDRs) requires a signed NDA and verified proof of funds.
          </p>
          <a href="/login" className="inline-flex items-center justify-center h-12 px-8 font-semibold rounded-full bg-primary text-background hover:bg-primary-hover transition-colors">
            Initiate KYC Clearance
          </a>
        </div>
      </div>
    </div>
  );
}
