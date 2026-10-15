import { UserCheck, Search, Key } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Create an account',
      description: 'Register and confirm your email to access the portal. Identity review remains illustrative; documents are not uploaded or verified.',
      icon: UserCheck
    },
    {
      id: '02',
      title: 'Browse properties',
      description: 'Browse four example listings, filter by property tier and compare details and illustrative cash flow.',
      icon: Search
    },
    {
      id: '03',
      title: 'Review acquisition steps',
      description: 'See example due diligence records. Document access, letters of intent and property transactions are unavailable.',
      icon: Key
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-left mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-ink tracking-tight">How to explore Aurelia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {steps.map(step => (
            <div key={step.id} className="rounded-xl border border-border/80 bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary text-xs tracking-[0.2em]">{step.id}</span>
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-medium text-ink mb-3">{step.title}</h3>
              <p className="text-sm text-slate-light leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
