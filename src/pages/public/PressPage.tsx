import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

const PRESS_RELEASES = [
  { date: "12 October 2026", title: "Introducing the Aurelia property collection", source: "Example editorial" },
  { date: "4 August 2026", title: "Understanding illustrative property figures", source: "Example feature" },
  { date: "22 May 2026", title: "A guide to the identity review preview", source: "Example article" },
  { date: "15 January 2026", title: "Exploring the property portfolio", source: "Example article" }
];

export default function PressPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader
        title="Press and media"
        subtitle="The articles and dates below are illustrative. They do not represent published coverage or independent endorsements."
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
                <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors">{pr.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-slate-muted mb-4">A verified press contact and press kit are not currently available.</p>
          <span className="text-primary font-bold text-xl">press@aurelia.example · Example address only</span>
        </div>
      </div>
    </div>
  );
}
