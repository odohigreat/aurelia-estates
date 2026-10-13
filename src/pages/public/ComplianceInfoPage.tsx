import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { ShieldCheck, Lock, FileSearch } from 'lucide-react';

export default function ComplianceInfoPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Identity review preview"
        subtitle="Explore the review steps using fictional details. Identity and anti-money laundering checks are not carried out."
      />
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
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
      </div>
    </div>
  );
}
