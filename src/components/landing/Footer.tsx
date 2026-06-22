import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Logo isFooter />
            </div>
            <p className="text-slate-muted text-sm leading-relaxed mb-6">
              The premier SaaS platform for ultra-luxury real estate acquisition and predictive intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/portfolio-access" className="text-slate-muted hover:text-white transition-colors text-sm">Portfolio Access</Link></li>
              <li><Link to="/analytics" className="text-slate-muted hover:text-white transition-colors text-sm">Predictive Analytics</Link></li>
              <li><Link to="/compliance-info" className="text-slate-muted hover:text-white transition-colors text-sm">Compliance KYC</Link></li>
              <li><Link to="/api-docs" className="text-slate-muted hover:text-white transition-colors text-sm">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-muted hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/careers" className="text-slate-muted hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/press" className="text-slate-muted hover:text-white transition-colors text-sm">Press & Media</Link></li>
              <li><Link to="/contact" className="text-slate-muted hover:text-white transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Request Access</h4>
            <p className="text-slate-muted text-sm mb-4">Strictly for qualified institutional and high-net-worth individuals.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Institutional Email"
                className="bg-surface border border-border px-4 py-2 text-sm rounded-l-md focus:outline-none focus:border-primary text-white w-full"
              />
              <Button className="rounded-l-none rounded-r-md">Submit</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-muted text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Aurelia Estates. All rights reserved. Strictly confidential.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-slate-muted hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-muted hover:text-white transition-colors text-sm">Terms of Service</Link>
            <Link to="/cookies" className="text-slate-muted hover:text-white transition-colors text-sm">Cookie Settings</Link>
          </div>
        </div>
      </div>

      {/* Massive Aesthetic Brand Text */}
      <div className="w-full flex items-center justify-center mt-6 overflow-hidden select-none pointer-events-none">
        <span className="text-[20vw] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/20 to-background">
          AURELIA
        </span>
      </div>
    </footer>
  );
}
