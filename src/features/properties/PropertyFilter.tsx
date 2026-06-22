import * as React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface FilterProps {
  activeTier: string;
  onTierChange: (tier: string) => void;
}

export const PropertyFilter = React.memo(({ activeTier, onTierChange }: FilterProps) => {
  const tiers = ['All', 'Ultra-Luxury', 'Luxury', 'Premium'];

  return (
    <Card className="mb-8 glass-panel">
      <CardContent className="p-4 flex flex-wrap gap-4 items-center">
        <span className="text-sm font-medium text-slate-muted">Filter by Tier:</span>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {tiers.map((tier) => (
            <Button
              key={tier}
              variant={activeTier === tier ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onTierChange(tier)}
              className="rounded-full"
            >
              {tier}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

PropertyFilter.displayName = 'PropertyFilter';
