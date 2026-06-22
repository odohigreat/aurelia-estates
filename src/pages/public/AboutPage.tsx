import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

export default function AboutPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="About Aurelia" 
        subtitle="The convergence of luxury real estate and quantitative data science."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 text-lg text-slate-light leading-relaxed space-y-8">
        <p>
          Founded by veterans of quantitative finance and global luxury real estate, Aurelia Estates was built to bring institutional-grade analytical rigor to the world's most exclusive asset class. For decades, the ultra-luxury market operated on opacity and personal networks. We have digitized that trust.
        </p>
        <p>
          Our proprietary algorithms ingest petabytes of global data—from macroeconomic shifts to granular local zoning legislation—allowing our clients to acquire assets at optimal capitalization rates before market shifts occur.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Global Presence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-surface">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">London</h3>
              <p className="text-slate-muted">Headquarters & EMEA Operations</p>
              <p className="text-sm text-slate-muted mt-4">1 Mayfair Place, W1J 8AJ</p>
            </CardContent>
          </Card>
          <Card className="bg-surface">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">New York</h3>
              <p className="text-slate-muted">North American Syndication</p>
              <p className="text-sm text-slate-muted mt-4">One World Trade Center, NY 10007</p>
            </CardContent>
          </Card>
          <Card className="bg-surface">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Singapore</h3>
              <p className="text-slate-muted">APAC Compliance & Data</p>
              <p className="text-sm text-slate-muted mt-4">Marina Bay Financial Centre</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
