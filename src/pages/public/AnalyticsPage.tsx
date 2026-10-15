import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';
import { Activity, Coins, LineChart, MapPin, Ruler, TrendingUp } from 'lucide-react';

const MEASURES = [
  {
    Icon: Activity,
    title: 'Capitalisation rate',
    text: 'The cap rate shown on each listing is an example annual yield, expressed as a percentage of listed value. The portfolio figure is a simple average across all listings: every property counts equally, whatever its price.',
  },
  {
    Icon: TrendingUp,
    title: 'Scenario appreciation',
    text: 'The “Scenario” percentage is an illustrative appreciation assumption for that residence. It is a way to compare listings side by side, not a forecast of future value.',
  },
  {
    Icon: Ruler,
    title: 'Price per square foot',
    text: 'Listed value divided by interior square footage, shown in the listing’s own currency. It helps compare a compact penthouse with a large estate on a like-for-like basis.',
  },
  {
    Icon: Coins,
    title: 'Totals by currency',
    text: 'Listed values are added up separately for US dollars, euros and Swiss francs. We never convert them into a single figure, because any exchange rate would be an assumption hidden inside the total.',
  },
];

export default function AnalyticsPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Illustrative analytics"
        subtitle="How Aurelia presents valuations, yields and cash flow, and exactly what each figure does and does not mean. These figures are not live market data or predictions."
      />

      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <SectionHeading eyebrow="Our approach" title="Numbers you can read in a sentence">
          <p>
            Prime property is often presented with impressive but unexplained figures. Aurelia takes the opposite view: every number on a listing has a short, plain definition, and every chart states the assumptions it was drawn from.
          </p>
          <p>
            That makes the figures useful for comparison and conversation with advisers, and makes it clear that they are illustrations, not valuations, guarantees or investment advice.
          </p>
        </SectionHeading>
        <figure className="rounded-2xl overflow-hidden border border-border/70">
          <EditorialImage photo="poolside" ratio={4 / 3} sizes="(min-width: 1024px) 560px, 100vw" alt="Modern residence with a long pool and open terrace" />
        </figure>
      </section>

      <section aria-labelledby="measures-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="measures-title" eyebrow="Definitions" title="What each figure means" />
          <div className="grid sm:grid-cols-2 gap-5">
            {MEASURES.map(({ Icon, title, text }) => (
              <Card key={title} className="bg-white">
                <CardContent className="p-6 sm:p-8">
                  <Icon aria-hidden="true" className="w-6 h-6 text-accent mb-5" />
                  <h3 className="font-display text-2xl font-normal text-ink mb-3">{title}</h3>
                  <p className="text-sm leading-[1.8] text-slate-light">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="cashflow-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
        <SectionHeading id="cashflow-title" eyebrow="Method" title="The five-year cash-flow example">
          <p>
            Each property page includes a five-year chart that starts in the current calendar year. It uses two deliberately simple rules, applied to the listed value:
          </p>
        </SectionHeading>
        <div className="space-y-4">
          <div className="rounded-xl border border-border/80 bg-white p-6">
            <div className="flex items-center gap-3 mb-3"><LineChart aria-hidden="true" className="w-5 h-5 text-emerald-700" /><h3 className="text-lg font-medium text-ink">Scenario revenue</h3></div>
            <p className="text-sm leading-[1.8] text-slate-light">Starts at 4% of listed value in year one and rises by half a percentage point each year, reaching 6% in year five.</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-white p-6">
            <div className="flex items-center gap-3 mb-3"><LineChart aria-hidden="true" className="w-5 h-5 text-rose-700" /><h3 className="text-lg font-medium text-ink">Operating expenses</h3></div>
            <p className="text-sm leading-[1.8] text-slate-light">A flat 1.5% of listed value every year. Figures are rounded down to whole currency units.</p>
          </div>
          <p className="text-xs leading-relaxed text-slate-muted">These rules do not use the listing’s cap rate, local rents, taxes, financing or any economic model. They exist to show the shape of a cash flow, not to predict one.</p>
        </div>
      </section>

      <section aria-labelledby="index-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <div className="bg-surface rounded-xl border border-border p-5 sm:p-8 md:p-10">
          <h2 id="index-title" className="font-display text-3xl font-normal text-ink mb-6">Illustrative index</h2>
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
      </section>

      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-white border-border">
          <CardContent className="p-6">
            <MapPin className="w-5 h-5 text-primary mb-5" />
            <h3 className="font-display text-2xl font-normal text-ink mb-2">Property locations</h3>
            <p className="text-sm leading-relaxed text-slate-light">Each listing shows its address, city and country. Maps and planning information are not available.</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border">
          <CardContent className="p-6">
            <Activity className="w-5 h-5 text-primary mb-5" />
            <h3 className="font-display text-2xl font-normal text-ink mb-2">Valuation examples</h3>
            <p className="text-sm leading-relaxed text-slate-light">Compare illustrative property values over time in the portal. The figures do not reflect current market conditions.</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-border">
          <CardContent className="p-6">
            <TrendingUp className="w-5 h-5 text-primary mb-5" />
            <h3 className="font-display text-2xl font-normal text-ink mb-2">Regional rates</h3>
            <p className="text-sm leading-relaxed text-slate-light">Compare example regional rates. These figures are not verified rental yields or market indicators.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
