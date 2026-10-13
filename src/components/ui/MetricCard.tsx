import * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/Card';

interface MetricProps {
  label: string;
  value: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
  description?: string;
}

export function MetricCard({ label, value, trend, icon, className, description }: MetricProps) {
  return (
    <Card className={cn('overflow-hidden relative h-full rounded-xl', className)}>
      <CardContent className="p-5 sm:p-6 flex h-full flex-col">
        <div className="flex justify-between items-start">
          <div className="min-w-0 space-y-5 w-full">
            <p className="pr-12 text-[10px] uppercase font-semibold tracking-[0.12em] text-slate-muted leading-relaxed">{label}</p>
            <p className="text-3xl sm:text-4xl font-medium tabular-nums tracking-tight leading-tight text-ink">{value}</p>
          </div>
          {icon && (
            <div aria-hidden="true" className="absolute top-5 right-5 p-2.5 bg-surface rounded-lg text-accent [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-accent">
              {icon}
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center space-x-2">
            <span
              className={cn('text-sm font-medium', {
                'text-emerald-700': trend.direction === 'up',
                'text-rose-700': trend.direction === 'down',
                'text-slate-muted': trend.direction === 'neutral',
              })}
            >
              {trend.direction === 'up' && '+'}
              {trend.value}%
            </span>
            <span className="text-xs text-slate-muted">vs last period</span>
          </div>
        )}
        {description && <p className="mt-auto pt-5 text-xs border-t border-border/60 leading-relaxed text-slate-muted">{description}</p>}
      </CardContent>
    </Card>
  );
}
