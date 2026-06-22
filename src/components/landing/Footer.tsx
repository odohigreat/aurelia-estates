import { Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="text-primary w-6 h-6" />
              <span className="text-xl font-bold tracking-tight text-white">
                AURELIA <span className="text-primary font-normal">ESTATES</span>
              </span>
            </div>
            <p className="text-slate-muted text-sm leading-relaxed mb-6">
              The premier SaaS platform for ultra-luxury real estate acquisition and predictive intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Portfolio Access</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Predictive Analytics</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Compliance KYC</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">API Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Press & Media</a></li>
              <li><a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Contact</a></li>
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
            <a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-muted hover:text-white transition-colors text-sm">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
