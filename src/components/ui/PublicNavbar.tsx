import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Logo } from './Logo';

export function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close the sidebar whenever the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const NAV_LINKS = [
    { name: 'Platform', path: '/analytics' },
    { name: 'Acquisitions', path: '/portfolio-access' },
    { name: 'Compliance', path: '/compliance-info' },
    { name: 'Company', path: '/about' }
  ];

  return (
    <>
      <nav className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="z-50">
              <Logo onClick={() => setIsOpen(false)} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button variant="primary">Client Portal</Button>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="md:hidden flex items-center justify-center p-2 text-slate-muted hover:text-white transition-colors z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-surface border-l border-border/50 shadow-2xl z-40 md:hidden flex flex-col pt-24 px-6 pb-6"
            >
              <div className="flex flex-col space-y-6 flex-grow">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-4 pt-8 border-t border-border/50">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-lg h-12">Sign In</Button>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full justify-center text-lg h-12">Client Portal</Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
