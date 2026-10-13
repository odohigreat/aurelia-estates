import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const OPEN_ROLES = [
  { title: "Lead Quantitative Analyst", location: "London / Hybrid", type: "Full-time" },
  { title: "Head of Global Compliance (KYC/AML)", location: "Singapore", type: "Full-time" },
  { title: "Senior React Developer", location: "New York / Remote", type: "Full-time" },
  { title: "Director of Ultra-Luxury Acquisitions", location: "Dubai", type: "Full-time" }
];

export default function CareersPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Careers" 
        subtitle="There are no active vacancies at present."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 text-lg text-slate-light leading-relaxed mb-16">
        <p className="text-center">
          The roles below are illustrative examples, not current vacancies. Applications cannot be submitted through this website.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-ink mb-8 border-b border-border/50 pb-4">Example roles</h2>
        <div className="space-y-4">
          {OPEN_ROLES.map((role, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-border/50 rounded-xl hover:border-primary/50 transition-colors">
              <div>
                <h3 className="text-xl font-bold text-ink mb-2">{role.title}</h3>
                <div className="flex space-x-4 text-sm text-slate-muted">
                  <span>{role.location}</span>
                  <span>•</span>
                  <span>{role.type}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/contact">
                  <Button variant="outline">View contact page</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
