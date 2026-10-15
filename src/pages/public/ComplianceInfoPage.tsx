import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { ShieldCheck, Lock, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';

const REVIEW_AREAS = [
  { title: 'Identity', text: 'Confirming that a buyer is who they say they are, usually from government-issued documents and a likeness check.' },
  { title: 'Ownership structures', text: 'Prime residences are often bought through companies or trusts. A review identifies the people who ultimately own or control them.' },
  { title: 'Source of funds', text: 'Understanding where the money for a purchase comes from, and that it is consistent with the buyer’s profile.' },
  { title: 'Sanctions and screening', text: 'Checking buyers and structures against sanctions and politically exposed person lists before a transaction proceeds.' },
];

export default function ComplianceInfoPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader 
        title="Identity review preview"
        subtitle="Explore the review steps using fictional details. Identity and anti-money laundering checks are not carried out."
      />
      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <SectionHeading eyebrow="Why it matters" title="Trust is the foundation of prime property">
          <p>
            High-value residences cross borders, currencies and ownership structures. That is exactly why reputable transactions rely on careful identity and source-of-funds review: it protects buyers, sellers and the communities those homes belong to.
          </p>
          <p>
            Aurelia’s preview walks through the shape of such a review so you can see what would be asked and why. It is a demonstration only. No checks are carried out, and nothing you enter is submitted or stored.
          </p>
        </SectionHeading>
        <figure className="rounded-2xl overflow-hidden border border-border/70">
          <EditorialImage photo="alpine" ratio={4 / 3} sizes="(min-width: 1024px) 560px, 100vw" alt="Alpine chalet beneath snow-covered peaks" />
        </figure>
      </section>

      <section aria-labelledby="areas-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="areas-title" eyebrow="General information" title="What a full review typically covers">
            <p>A general overview of the areas a regulated adviser would usually examine. It is not legal or compliance advice.</p>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEW_AREAS.map((area, index) => (
              <div key={area.title} className="rounded-xl border border-border/80 bg-white p-6">
                <span className="text-primary text-xs tracking-[0.2em]">0{index + 1}</span>
                <h3 className="text-lg font-medium text-ink mt-4 mb-2">{area.title}</h3>
                <p className="text-sm leading-[1.8] text-slate-light">{area.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <h2 className="font-display text-3xl font-normal text-ink mb-10 text-center">What the preview does today</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-700" />
            </div>
            <h3 className="text-xl font-bold text-ink">Anti-money laundering checks</h3>
            <p className="text-slate-muted">Anti-money laundering and sanctions screening are not available.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-ink">File selection</h3>
            <p className="text-slate-muted">Select a sample file to explore the form. It remains on your device and is not uploaded, stored or checked by the website.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileSearch className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-ink">Company details</h3>
            <p className="text-slate-muted">Use fictional company details. Company records, trusts and beneficial owners are not verified.</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border/50 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-ink mb-8">Review steps</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { time: "Step 01", title: "Check form details", desc: "Enter fictional details. The form checks that the required information has been supplied." },
              { time: "Step 02", title: "Example review", desc: "The preview shows the review stages without submitting your details or carrying out checks." },
              { time: "Step 03", title: "Preview complete", desc: "The final screen confirms that the preview has ended. It does not verify your identity or grant financial approval." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-primary text-background font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background p-6 rounded-xl border border-border shadow">
                  <span className="text-primary font-mono text-sm mb-2 block">{step.time}</span>
                  <h4 className="text-lg font-bold text-ink mb-2">{step.title}</h4>
                  <p className="text-slate-muted text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 text-center text-sm text-slate-muted">
          Signed-in users can try the review form in the <Link to="/dashboard/compliance" className="text-primary underline underline-offset-4">compliance preview</Link>. Use fictional details only.
        </p>
      </div>
    </div>
  );
}
