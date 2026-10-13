import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Footer() {
  const emailId = useId();
  return (
    <footer className="border-t border-border bg-white pt-12 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="col-span-1">
            <div className="mb-6">
              <Logo isFooter />
            </div>
            <p className="text-slate-muted text-sm leading-relaxed mb-6">
              International properties, clear details and illustrative investment insights.
            </p>
          </div>

          <div>
            <h4 className="text-ink text-xs uppercase tracking-[0.12em] font-semibold mb-5">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/portfolio-access" className="text-slate-muted hover:text-ink transition-colors text-sm">Portfolio access</Link></li>
              <li><Link to="/analytics" className="text-slate-muted hover:text-ink transition-colors text-sm">Illustrative analytics</Link></li>
              <li><Link to="/compliance-info" className="text-slate-muted hover:text-ink transition-colors text-sm">Compliance preview</Link></li>
              <li><Link to="/api-docs" className="text-slate-muted hover:text-ink transition-colors text-sm">API examples</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink text-xs uppercase tracking-[0.12em] font-semibold mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-muted hover:text-ink transition-colors text-sm">About Aurelia</Link></li>
              <li><Link to="/careers" className="text-slate-muted hover:text-ink transition-colors text-sm">Careers</Link></li>
              <li><Link to="/press" className="text-slate-muted hover:text-ink transition-colors text-sm">Press and media</Link></li>
              <li><Link to="/contact" className="text-slate-muted hover:text-ink transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-ink text-xs uppercase tracking-[0.12em] font-semibold mb-5">Explore Aurelia</h4>
            <p className="text-slate-muted text-sm mb-4">Enter an email address to open the registration page. This entry is not sent or saved.</p>
            <form 
              className="flex min-w-0"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = '/signup';
              }}
            >
              <label htmlFor={emailId} className="sr-only">Email address</label>
              <input
                id={emailId}
                type="email"
                required
                placeholder="Email address"
                className="bg-surface border border-border px-4 py-2 text-sm rounded-l-md focus:outline-none focus:border-primary text-ink w-full min-w-0"
              />
              <Button type="submit" className="rounded-l-none rounded-r-md">Continue</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <p className="text-slate-muted text-xs text-center lg:text-left">
            © {new Date().getFullYear()} Aurelia Estates. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link to="/privacy" className="text-slate-muted hover:text-ink transition-colors text-sm">Privacy information</Link>
            <Link to="/terms" className="text-slate-muted hover:text-ink transition-colors text-sm">Terms of use</Link>
            <Link to="/cookies" className="text-slate-muted hover:text-ink transition-colors text-sm">Cookie information</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
