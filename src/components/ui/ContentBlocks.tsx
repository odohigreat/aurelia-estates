import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function SectionHeading({ eyebrow, title, children, align = 'left', id }: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
}) {
  return (
    <div className={cn('max-w-2xl mb-8 sm:mb-10', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="text-[11px] uppercase tracking-[0.24em] text-accent font-medium mb-4">{eyebrow}</p>}
      <h2 id={id} className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-ink">{title}</h2>
      {children && <div className="mt-4 text-base leading-[1.85] text-slate-light space-y-4">{children}</div>}
    </div>
  );
}

export function CallToAction({ title, children, to, label }: {
  title: string;
  children: ReactNode;
  to: string;
  label: string;
}) {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
      <div className="rounded-2xl bg-primary text-white px-6 py-10 sm:px-12 sm:py-14 text-center">
        <div aria-hidden="true" className="w-10 h-px bg-[#f5e5c6] mx-auto mb-6" />
        <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight">{title}</h2>
        <p className="mt-4 text-sm sm:text-base leading-[1.8] text-white/85 max-w-2xl mx-auto">{children}</p>
        <Link to={to} className="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-md bg-white text-ink text-sm font-medium transition-colors hover:bg-[#f5e5c6]">
          {label}
        </Link>
      </div>
    </section>
  );
}
