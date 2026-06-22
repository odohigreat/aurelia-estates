
import { PropertyGrid } from '../features/properties/PropertyGrid';
import { MetricCard } from '../components/ui/MetricCard';
import { Wallet, Activity, Building2 } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Global Portfolio</h1>
          <p className="text-slate-muted mt-1">Curated selection of ultra-luxury assets</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          label="Total Assets Value" 
          value="$51.4M" 
          trend={{ value: 12.5, direction: 'up' }}
          icon={<Wallet className="text-primary" />}
        />
        <MetricCard 
          label="Average Cap Rate" 
          value="4.1%" 
          trend={{ value: 0.2, direction: 'up' }}
          icon={<Activity className="text-primary" />}
        />
        <MetricCard 
          label="Active Acquisitions" 
          value="2" 
          icon={<Building2 className="text-primary" />}
        />
      </div>
      <PropertyGrid />
    </div>
  );
}
