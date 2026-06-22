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
      className={`flex items-center space-x-3 group ${className}`} 
      onClick={onClick}
    >
      <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-primary transition-transform duration-500 group-hover:scale-110"
        >
          {/* Outer sharp triangle */}
          <path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          {/* Inner sharp intersecting lines for an architectural feel */}
          <path d="M12 10L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M12 10l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </div>
      {!iconOnly && (
        <span className={`hidden sm:inline-block font-bold uppercase tracking-[0.2em] text-white ${isFooter ? 'text-xl' : 'text-2xl'}`}>
          Aurelia<span className="text-primary font-light ml-2 tracking-[0.1em]">Estates</span>
        </span>
      )}
    </Link>
  );
}
