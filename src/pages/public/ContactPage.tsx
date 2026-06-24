import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';

export default function ContactPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Private Contact" 
        subtitle="Direct access to our institutional relations team."
      />
      <div className="max-w-6xl mx-auto px-4 mt-16 flex flex-col lg:flex-row gap-16">
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-6">Institutional Inquiry</h2>
          <p className="text-slate-muted mb-8 text-lg">
            Our global offices operate strictly by appointment. For platform access or syndication inquiries, please submit your details below. A delegate will contact you within 24 hours.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">First Name</label>
                <Input placeholder="Jonathan" className="bg-surface border-border/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Last Name</label>
                <Input placeholder="Mercer" className="bg-surface border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Entity / Family Office Name</label>
              <Input placeholder="Oakhaven Capital" className="bg-surface border-border/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Corporate Email</label>
              <Input type="email" placeholder="j.mercer@oakhaven.com" className="bg-surface border-border/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Inquiry Type</label>
              <select className="w-full bg-surface border border-border/50 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Platform Access Request</option>
                <option>API Enterprise Integration</option>
                <option>Press / Media</option>
                <option>Other</option>
              </select>
            </div>
            <Button size="lg" className="w-full mt-4">Submit Inquiry</Button>
          </form>
        </div>

        <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-border/50 pt-16 lg:pt-0 lg:pl-16">
          <h2 className="text-2xl font-bold text-white mb-8">Global Offices</h2>
          <div className="space-y-12">
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">London (HQ)</h3>
              <p className="text-slate-muted">1 Mayfair Place<br/>London, W1J 8AJ<br/>United Kingdom</p>
              <p className="text-white mt-2">+44 (0) 20 7123 4567</p>
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">New York</h3>
              <p className="text-slate-muted">One World Trade Center<br/>Suite 8500<br/>New York, NY 10007</p>
              <p className="text-white mt-2">+1 (212) 555-0198</p>
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">Singapore</h3>
              <p className="text-slate-muted">Marina Bay Financial Centre<br/>Tower 1, Level 33<br/>Singapore 018981</p>
              <p className="text-white mt-2">+65 6123 4567</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
