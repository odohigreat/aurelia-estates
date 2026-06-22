import * as React from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent } from '../ui/Card';

interface MetricProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ label, value, trend, icon, className }: MetricProps) {
  return (
    <Card className={cn('glass-panel overflow-hidden relative', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-muted">{label}</p>
            <p className="text-3xl font-mono tracking-tight text-white">{value}</p>
          </div>
          {icon && (
            <div className="p-2 bg-surface rounded-md border border-border">
              {icon}
            </div>
          )}
        </div>
        {trend && (
          <div className="mt-4 flex items-center space-x-2">
            <span
              className={cn('text-sm font-medium', {
                'text-emerald-400': trend.direction === 'up',
                'text-rose-400': trend.direction === 'down',
                'text-slate-muted': trend.direction === 'neutral',
              })}
            >
              {trend.direction === 'up' && '+'}
              {trend.value}%
            </span>
            <span className="text-xs text-slate-muted">vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
