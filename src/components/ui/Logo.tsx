import { Link } from 'react-router-dom';

interface LogoProps {
  onClick?: () => void;
  className?: string;
  isFooter?: boolean;
  to?: string;
  iconOnly?: boolean;
}

export function Logo({ onClick, className = "", isFooter = false, to = "/", iconOnly = false }: LogoProps) {
  return (
    <Link 
      to={to} 
      aria-label="Aurelia Estates home"
      className={`flex items-center space-x-3 group ${className}`} 
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden">
        <svg 
          aria-hidden="true"
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-accent transition-transform duration-500 group-hover:scale-110"
        >
          {/* Outer sharp triangle */}
          <path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          {/* Inner sharp intersecting lines for an architectural feel */}
          <path d="M12 10L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M12 10l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>
      {!iconOnly && (
        <span className="flex flex-col text-ink">
          <span className={`font-display uppercase tracking-[0.14em] leading-none ${isFooter ? 'text-3xl' : 'text-2xl'}`}>Aurelia</span>
          <span className="text-[9px] uppercase text-accent tracking-[0.38em] mt-1.5">Estates</span>
        </span>
      )}
    </Link>
  );
}
