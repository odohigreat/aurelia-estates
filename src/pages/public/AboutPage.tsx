import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';

export default function AboutPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader 
        title="About Aurelia" 
        subtitle="International property browsing and illustrative investment insights."
      />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 mt-10 sm:mt-14 text-base text-slate-light leading-[1.9] space-y-5">
        <p>
          Aurelia Estates brings property browsing, listing details and illustrative financial scenarios together in one place.
        </p>
        <p>
          The current collection contains example listings. Account access uses email and password authentication. Identity checks, financial services and property transactions are not available.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <h2 className="font-display text-3xl font-normal text-ink mb-8 text-center">Example office locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="bg-surface">
            <CardContent className="p-6 sm:p-8 text-left">
              <h3 className="font-display text-2xl font-normal text-ink mb-4">London</h3>
              <p className="text-slate-muted">Illustrative European location</p>
              <p className="text-sm text-slate-muted mt-4">1 Mayfair Place, W1J 8AJ</p>
            </CardContent>
          </Card>
          <Card className="bg-surface">
            <CardContent className="p-6 sm:p-8 text-left">
              <h3 className="font-display text-2xl font-normal text-ink mb-4">New York</h3>
              <p className="text-slate-muted">Illustrative North American location</p>
              <p className="text-sm text-slate-muted mt-4">One World Trade Center, NY 10007</p>
            </CardContent>
          </Card>
          <Card className="bg-surface">
            <CardContent className="p-6 sm:p-8 text-left">
              <h3 className="font-display text-2xl font-normal text-ink mb-4">Singapore</h3>
              <p className="text-slate-muted">Illustrative Asia-Pacific location</p>
              <p className="text-sm text-slate-muted mt-4">Marina Bay Financial Centre</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
