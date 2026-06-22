import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Button } from '../../components/ui/Button';

const OPEN_ROLES = [
  { title: "Lead Quantitative Analyst", location: "London / Hybrid", type: "Full-Time" },
  { title: "Head of Global Compliance (KYC/AML)", location: "Singapore", type: "Full-Time" },
  { title: "Senior React Developer", location: "New York / Remote", type: "Full-Time" },
  { title: "Director of Ultra-Luxury Acquisitions", location: "Dubai", type: "Full-Time" }
];

export default function CareersPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Careers" 
        subtitle="Build the future of institutional wealth preservation."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 text-lg text-slate-light leading-relaxed mb-16">
        <p className="text-center">
          We are actively seeking elite talent in machine learning, quantitative analysis, and high-net-worth client relations. Aurelia Estates operates at the intersection of high finance and deep technology.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 border-b border-border/50 pb-4">Open Roles</h2>
        <div className="space-y-4">
          {OPEN_ROLES.map((role, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-border/50 rounded-xl hover:border-primary/50 transition-colors">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                <div className="flex space-x-4 text-sm text-slate-muted">
                  <span>{role.location}</span>
                  <span>•</span>
                  <span>{role.type}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Button variant="outline">Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
