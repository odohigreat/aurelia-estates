import * as React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TIERS, type PropertyFilters, type propertyFilterChoices } from './propertyFilters';

interface FilterProps {
  filters: PropertyFilters;
  choices: ReturnType<typeof propertyFilterChoices>;
  onChange: (changes: Partial<PropertyFilters>, replace?: boolean) => void;
  onReset: () => void;
}
export const PropertyFilter = React.memo(({ filters, choices, onChange, onReset }: FilterProps) => {
  const id = React.useId();
  const selectClass = 'h-11 w-full rounded-lg border border-border bg-white px-3 py-2 text-base sm:text-sm text-ink';
  return (
    <Card className="rounded-2xl border-border/80">
      <CardContent className="p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label htmlFor={`${id}-search`} className="text-xs font-medium tracking-wide text-slate-light">Search properties</label>
            <Input id={`${id}-search`} type="search" placeholder="Name or location" value={filters.search} onChange={e => onChange({ search: e.target.value }, true)} />
          </div>
          <div className="space-y-2">
            <label htmlFor={`${id}-country`} className="text-xs font-medium tracking-wide text-slate-light">Country</label>
            <select id={`${id}-country`} className={selectClass} value={filters.country} onChange={e => onChange({ country: e.target.value })}>
              <option value="">All countries</option>{choices.countries.map(country => <option key={country}>{country}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor={`${id}-currency`} className="text-xs font-medium tracking-wide text-slate-light">Currency</label>
            <select id={`${id}-currency`} className={selectClass} value={filters.currency} onChange={e => onChange({ currency: e.target.value })}>
              <option value="">All currencies</option>{choices.currencies.map(currency => <option key={currency}>{currency}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor={`${id}-bedrooms`} className="text-xs font-medium tracking-wide text-slate-light">Minimum bedrooms</label>
            <select id={`${id}-bedrooms`} className={selectClass} value={filters.minBedrooms} onChange={e => onChange({ minBedrooms: Number(e.target.value) })}>
              <option value={0}>Any bedrooms</option>{choices.bedrooms.map(number => <option key={number} value={number}>{number}+</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 items-center border-t border-border/60 pt-4">
          <span className="text-sm font-medium text-slate-muted">Property tier:</span>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Property tier">
            {TIERS.map(tier => <Button key={tier} aria-pressed={filters.tier === tier} variant={filters.tier === tier ? 'primary' : 'ghost'} size="sm" onClick={() => onChange({ tier })} className="rounded-full">{tier}</Button>)}
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>Clear filters</Button>
        </div>
      </CardContent>
    </Card>
  );
});
PropertyFilter.displayName = 'PropertyFilter';
