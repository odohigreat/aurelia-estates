import { useState, useEffect, useRef, useId, useCallback } from 'react';
import type { ReactNode, RefObject } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useIsPresent } from 'framer-motion';
import { Logo } from './Logo';

export function PublicNavbar() {
  const location = useLocation();
  return <PublicNavbarMenu key={location.pathname} />;
}

function MobileDrawer({ drawerRef, id, children }: {
  drawerRef: RefObject<HTMLElement | null>;
  id: string;
  children: ReactNode;
}) {
  const isPresent = useIsPresent();
  return (
    <motion.nav
      ref={drawerRef}
      id={id}
      aria-label="Mobile navigation"
      aria-hidden={!isPresent}
      inert={!isPresent}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white border-l border-border shadow-lg z-40 lg:hidden flex flex-col overflow-y-auto pt-24 px-6 pb-6"
    >
      {children}
    </motion.nav>
  );
}

function PublicNavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const drawerId = useId();
  const closeMenu = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const links = () => Array.from(drawerRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? []);
    links()[0]?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      }
      if (event.key === 'Tab') {
        const items = [triggerRef.current, ...links()].filter((item): item is HTMLButtonElement | HTMLAnchorElement => item !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
          event.preventDefault();
          (event.shiftKey ? last : first)?.focus();
        }
      }
    };
    const onResize = () => { if (desktop.matches) setIsOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onResize);
    };
  }, [isOpen, closeMenu]);

  const NAV_LINKS = [
    { name: 'Properties', path: '/portfolio-access' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Compliance', path: '/compliance-info' }
  ];

  return (
    <>
      <nav aria-label="Primary navigation" className="border-b border-border/80 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="z-50">
              <Logo onClick={() => setIsOpen(false)} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex h-full items-center gap-6 xl:gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path} 
                  to={link.path} 
                  className={({ isActive }) => `relative inline-flex h-full items-center border-b-2 px-0.5 text-[13px] font-medium transition-colors hover:text-ink hover:border-accent ${isActive ? 'border-accent text-ink' : 'border-transparent text-slate-light'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link to="/signup" className="text-[13px] font-medium text-slate-light transition-colors hover:text-ink">Create account</Link>
              <Link to="/login" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-[13px] font-medium text-white transition-colors hover:bg-primary-hover">Sign in</Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button 
              ref={triggerRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls={drawerId}
              className="lg:hidden flex items-center justify-center p-2 rounded-lg hover:bg-surface-hover text-slate-muted hover:text-ink transition-colors z-50"
              onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
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
              className="fixed inset-0 bg-gray-200/70 z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Sidebar */}
            <MobileDrawer drawerRef={drawerRef} id={drawerId}>
              <div className="flex flex-col space-y-5 flex-grow">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="font-display text-2xl font-normal text-ink border-b border-border/70 pb-4 hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-4 pt-8 border-t border-border/50">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <span className="flex h-12 w-full items-center justify-start rounded-md px-4 text-lg font-medium text-gray-700 transition-colors hover:bg-surface-hover">Create account</span>
                </Link>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <span className="flex h-12 w-full items-center justify-center rounded-md bg-primary px-4 text-lg font-medium text-background transition-colors hover:bg-primary-hover">Sign in</span>
                </Link>
              </div>
            </MobileDrawer>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
