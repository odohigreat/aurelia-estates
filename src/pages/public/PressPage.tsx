import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

const PRESS_RELEASES = [
  { date: "Oct 12, 2026", title: "Aurelia Estates Surpasses $5B in Off-Market Transacted Value", source: "The Financial Times" },
  { date: "Aug 04, 2026", title: "How Quantitative Algorithms are Eating the Luxury Real Estate Market", source: "Bloomberg" },
  { date: "May 22, 2026", title: "Aurelia Launches Institutional KYC API for Family Offices", source: "TechCrunch" },
  { date: "Jan 15, 2026", title: "The New Standard in Global Wealth Preservation", source: "Forbes" }
];

export default function PressPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Press & Media" 
        subtitle="Aurelia Estates in the global financial press."
      />
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRESS_RELEASES.map((pr, idx) => (
            <Card key={idx} className="bg-surface hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary text-sm font-bold tracking-widest uppercase">{pr.source}</span>
                  <span className="text-slate-muted text-sm">{pr.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{pr.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <p className="text-slate-muted mb-4">For all media inquiries and access to our press kit.</p>
          <a href="mailto:press@aurelia.com" className="text-primary hover:text-white font-bold text-xl transition-colors">press@aurelia.com</a>
        </div>
      </div>
    </div>
  );
}
