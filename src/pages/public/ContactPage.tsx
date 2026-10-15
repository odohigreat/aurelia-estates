import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, KeyRound, Newspaper, ShieldQuestion } from 'lucide-react';
import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';

const ROUTES = [
  {
    Icon: Building2,
    title: 'A specific property',
    text: 'Open the property’s page and use its enquiry form. Signed-in users with a confirmed email address can save the enquiry to their account.',
    link: { to: '/#residences', label: 'Browse properties' },
  },
  {
    Icon: KeyRound,
    title: 'Account and portal access',
    text: 'Create an account, confirm your email, then sign in. If a confirmation link has expired, request another from the sign-in page.',
    link: { to: '/login', label: 'Go to sign in' },
  },
  {
    Icon: ShieldQuestion,
    title: 'Privacy and your information',
    text: 'Read how registration details, sessions and enquiries are handled, and which external providers the website connects to.',
    link: { to: '/privacy', label: 'Privacy information' },
  },
  {
    Icon: Newspaper,
    title: 'Press and media',
    text: 'Background on Aurelia Estates, the visual identity and how the mark and colours are used.',
    link: { to: '/press', label: 'Press and media' },
  },
];

const OFFICES = [
  { city: 'London', lines: ['1 Mayfair Place', 'London, W1J 8AJ', 'United Kingdom'], phone: '+44 (0) 20 7123 4567' },
  { city: 'New York', lines: ['One World Trade Center', 'Suite 8500', 'New York, NY 10007'], phone: '+1 (212) 555-0198' },
  { city: 'Singapore', lines: ['Marina Bay Financial Centre', 'Tower 1, Level 33', 'Singapore 018981'], phone: '+65 6123 4567' },
];

export default function ContactPage() {
  const formId = useId();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Contact"
        subtitle="Find the right place for your question. General enquiry delivery is not currently available, but property enquiries can be saved from each listing."
      />

      <section aria-labelledby="help-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <SectionHeading id="help-title" eyebrow="How can we help" title="Choose the channel that fits">
          <p>Most questions are answered fastest where the information already lives. These are the routes that work today.</p>
        </SectionHeading>
        <div className="grid sm:grid-cols-2 gap-5">
          {ROUTES.map(({ Icon, title, text, link }) => (
            <div key={title} className="rounded-xl border border-border/80 bg-white p-6 sm:p-7 flex flex-col">
              <Icon aria-hidden="true" className="w-6 h-6 text-accent mb-5" />
              <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
              <p className="text-sm leading-[1.8] text-slate-light flex-grow">{text}</p>
              <Link to={link.to} className="mt-5 text-sm font-medium text-primary underline underline-offset-4 self-start">{link.label}</Link>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="lg:w-1/2">
          <h2 className="font-display text-3xl font-normal text-ink mb-4">General enquiries</h2>
          <p className="text-slate-light mb-8 leading-[1.8]">
            This form is a preview. Use fictional details only; enquiries are not sent or saved. The button below returns you to the homepage.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              <select id={`${formId}-inquiry`} className="w-full h-11 bg-surface border border-border/50 rounded-md px-3 py-2 text-ink focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Portal access</option>
                <option>API integration</option>
                <option>Press and media</option>
                <option>Other</option>
              </select>
            </div>
            <Button size="lg" className="w-full mt-4">Return to homepage</Button>
          </form>
        </div>

        <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-border/50 pt-12 lg:pt-0 lg:pl-16">
          <figure className="rounded-2xl overflow-hidden border border-border/70 mb-10">
            <EditorialImage photo="estate" ratio={16 / 9} sizes="(min-width: 1024px) 480px, 100vw" alt="Contemporary residence with landscaped grounds" />
          </figure>
          <h2 className="font-display text-2xl font-normal text-ink mb-3">Example office locations</h2>
          <p className="text-slate-muted mb-8 text-sm leading-relaxed">The addresses and telephone numbers below are illustrative. They are not verified offices or contact channels.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
            {OFFICES.map(office => (
              <div key={office.city}>
                <h3 className="text-primary font-medium text-lg mb-2">{office.city} (sample)</h3>
                <p className="text-slate-muted text-sm leading-relaxed">{office.lines.map(line => <span key={line} className="block">{line}</span>)}</p>
                <p className="text-ink text-sm mt-2">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
