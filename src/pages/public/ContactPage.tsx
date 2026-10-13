import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Button } from '../../components/ui/Button';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';

export default function ContactPage() {
  const formId = useId();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Contact"
        subtitle="Enquiry delivery is not currently available."
      />
      <div className="max-w-6xl mx-auto px-4 mt-16 flex flex-col lg:flex-row gap-16">
        
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-bold text-ink mb-6">General enquiries</h2>
          <p className="text-slate-muted mb-8 text-lg">
            This form is a preview. Use fictional details only; enquiries are not sent or saved. The button below returns you to the homepage.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor={`${formId}-firstName`} className="text-sm font-medium text-slate-700">First name</label>
                <Input id={`${formId}-firstName`} placeholder="Jonathan" className="bg-surface border-border/50" />
              </div>
              <div className="space-y-2">
                <label htmlFor={`${formId}-lastName`} className="text-sm font-medium text-slate-700">Last name</label>
                <Input id={`${formId}-lastName`} placeholder="Mercer" className="bg-surface border-border/50" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor={`${formId}-entity`} className="text-sm font-medium text-slate-700">Company or family office name</label>
              <Input id={`${formId}-entity`} placeholder="Company or family office" className="bg-surface border-border/50" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${formId}-email`} className="text-sm font-medium text-slate-700">Email address</label>
              <Input id={`${formId}-email`} type="email" placeholder="sample@example.com" className="bg-surface border-border/50" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${formId}-inquiry`} className="text-sm font-medium text-slate-700">Enquiry type</label>
              <select id={`${formId}-inquiry`} className="w-full bg-surface border border-border/50 rounded-md px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Portal access</option>
                <option>API integration</option>
                <option>Press and media</option>
                <option>Other</option>
              </select>
            </div>
            <Button size="lg" className="w-full mt-4">Return to homepage</Button>
          </form>
        </div>

        <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-border/50 pt-16 lg:pt-0 lg:pl-16">
          <h2 className="text-2xl font-bold text-ink mb-8">Example office locations</h2>
          <p className="text-slate-muted mb-8">The addresses and telephone numbers below are illustrative. They are not verified offices or contact channels.</p>
          <div className="space-y-12">
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">London (sample)</h3>
              <p className="text-slate-muted">1 Mayfair Place<br/>London, W1J 8AJ<br/>United Kingdom</p>
              <p className="text-ink mt-2">+44 (0) 20 7123 4567</p>
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">New York</h3>
              <p className="text-slate-muted">One World Trade Center<br/>Suite 8500<br/>New York, NY 10007</p>
              <p className="text-ink mt-2">+1 (212) 555-0198</p>
            </div>
            <div>
              <h3 className="text-primary font-bold text-lg mb-2">Singapore</h3>
              <p className="text-slate-muted">Marina Bay Financial Centre<br/>Tower 1, Level 33<br/>Singapore 018981</p>
              <p className="text-ink mt-2">+65 6123 4567</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
