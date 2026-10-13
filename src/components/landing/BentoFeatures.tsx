import { Activity, Globe, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    title: 'Understand the figures',
    label: 'Illustrative analytics',
    description: 'Compare example valuations and capitalisation rates. The figures are illustrative, rather than live market data or investment predictions.',
    Icon: Activity,
  },
  {
    title: 'Explore international properties',
    label: 'International property browsing',
    description: 'Browse example listings in international locations and filter by property tier.',
    Icon: Globe,
  },
  {
    title: 'Preview the review process',
    label: 'Compliance preview',
    description: 'Explore the steps in an identity review using fictional details. No identity checks or approvals are carried out.',
    Icon: ShieldCheck,
  },
];

export function BentoFeatures() {
  return (
    <section className="py-12 sm:py-16 bg-surface border-y border-border/60" id="features" aria-labelledby="features-title">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="lg:self-center">
          <p className="text-xs uppercase tracking-[0.24em] text-primary mb-5">Property overview</p>
          <h2 id="features-title" className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.12] font-normal text-ink max-w-lg">A clearer way<br />to explore.</h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-light mt-6 max-w-md">Review locations, property details and example financial scenarios in one place.</p>
          <div className="mt-8 w-16 h-px bg-accent/70" aria-hidden="true" />
        </div>
        <div className="space-y-4">
          {FEATURES.map(({ title, label, description, Icon }) => (
            <div key={label} className="p-5 sm:p-6 flex items-start gap-4 bg-white rounded-xl border border-border/70 shadow-[0_4px_18px_-10px_rgba(23,38,53,0.12)] hover:border-accent/40 transition-colors duration-200">
              <Icon aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-accent mb-2">{label}</p>
                <h3 className="font-display text-2xl font-normal text-ink mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-light">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
