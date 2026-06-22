
import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export function PublicNavbar() {
  return (
    <nav className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <Building2 className="text-background w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              AURELIA <span className="text-primary font-normal">ESTATES</span>
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <a href="#portfolio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#intelligence" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Wealth Management</a>
            <a href="#company" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Company</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button variant="primary">Client Portal</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
