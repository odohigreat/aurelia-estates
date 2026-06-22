import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { ShieldCheck, Lock, FileSearch } from 'lucide-react';

export default function ComplianceInfoPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Compliance & KYC" 
        subtitle="Frictionless, 256-bit encrypted onboarding for institutional acquisitions."
      />
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Automated AML</h3>
            <p className="text-slate-muted">Real-time anti-money laundering cross-checks against global interpol and financial sanction databases.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">256-Bit Encryption</h3>
            <p className="text-slate-muted">All identity documents and proof of funds are secured using military-grade encryption in isolated servers.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center">
              <FileSearch className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Entity Verification</h3>
            <p className="text-slate-muted">Seamless corporate structuring checks for trusts, LLCs, and offshore family office holding companies.</p>
          </div>
        </div>

        <div className="bg-surface rounded-2xl border border-border/50 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-8">The Clearance Timeline</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {[
              { time: "T+0 Hours", title: "Document Submission", desc: "Upload passport, corporate documents, and proof of funds via our secure portal." },
              { time: "T+2 Hours", title: "Algorithmic Verification", desc: "Our systems run deep checks across global financial networks to verify asset liquidity." },
              { time: "T+24 Hours", title: "Human Final Review", desc: "A dedicated compliance officer conducts a final review before unlocking institutional access." }
            ].map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface bg-primary text-background font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {idx + 1}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-background p-6 rounded-xl border border-border shadow">
                  <span className="text-primary font-mono text-sm mb-2 block">{step.time}</span>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
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
