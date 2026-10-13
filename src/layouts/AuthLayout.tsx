import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/ui/Logo';

interface AuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ eyebrow, title, description, children, footer }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1fr_1.05fr] lg:gap-8 lg:p-6">
      <div className="min-w-0 text-ink px-6 sm:px-10 lg:px-12 py-8 lg:py-6 flex flex-col">
        <Link to="/" className="inline-flex self-start items-center gap-2 text-xs text-slate-muted hover:text-ink transition-colors">
          <ArrowLeft aria-hidden="true" className="w-3.5 h-3.5" />Back to website
        </Link>
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center py-10 lg:py-8">
          <div className="flex justify-center mb-10"><Logo /></div>
          <header className="mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</p>
            <h1 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-4">{title}</h1>
            <p className="text-sm leading-relaxed text-slate-light">{description}</p>
          </header>
          {children}
          <div className="mt-7 pt-6 border-t border-border text-sm text-slate-light text-center">{footer}</div>
        </div>
        <div className="w-full max-w-md mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-muted">
          <span>Account access · Email confirmation required</span>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-ink transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      <aside className="hidden lg:flex relative sticky top-6 h-[calc(100vh-3rem)] min-h-[640px] rounded-3xl overflow-hidden flex-col justify-end p-10 xl:p-14 bg-primary">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
          srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80 1200w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80 1600w"
          sizes="50vw"
          alt=""
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#102536]/95 via-[#102536]/70 to-[#102536]/40" />
        <div className="relative max-w-lg text-white">
          <p className="text-xs uppercase tracking-[0.2em] mb-5">Aurelia Estates</p>
          <h2 className="font-display text-4xl xl:text-5xl leading-[1.15]">International properties.<br /><span className="italic">Clear details.</span></h2>
          <p className="mt-5 text-sm leading-relaxed text-white/95">Browse residences, compare details and review illustrative investment figures.</p>
          <div className="mt-8 border-t border-white/30 pt-5 text-xs">Property details · Currency-aware figures · Enquiry previews</div>
        </div>
      </aside>
    </main>
  );
}
