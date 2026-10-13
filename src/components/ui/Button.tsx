import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-background hover:bg-primary-hover active:bg-primary/80': variant === 'primary',
            'bg-white text-gray-900 hover:bg-surface-hover border border-border': variant === 'secondary',
            'border border-border text-primary hover:bg-surface-hover': variant === 'outline',
            'hover:bg-surface-hover text-gray-700 hover:text-ink': variant === 'ghost',
            'h-8 px-3 text-xs': size === 'sm',
            'h-11 px-5 py-2 text-sm': size === 'md',
            'h-12 px-8 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
