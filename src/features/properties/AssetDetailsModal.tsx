import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, ShieldCheck, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Property } from '../../types';

interface AssetDetailsModalProps {
  property: Property | null;
  onClose: () => void;
}

const generateMockCashFlow = (baseValue: number) => {
  return Array.from({ length: 5 }).map((_, i) => ({
    year: new Date().getFullYear() + i,
    revenue: Math.floor(baseValue * (0.04 + (i * 0.005))),
    opex: Math.floor(baseValue * 0.015),
  }));
};

export function AssetDetailsModal({ property, onClose }: AssetDetailsModalProps) {
  if (!property) return null;

  const cashFlowData = React.useMemo(() => generateMockCashFlow(property.price), [property.price]);

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/90 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-surface border border-border/50 rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
        >
          {/* Header Image Area */}
          <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
            <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background/80 backdrop-blur-md rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                    {property.tier}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{property.title}</h2>
                <div className="flex items-center text-slate-300 mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location.address}, {property.location.city}, {property.location.country}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-muted uppercase tracking-widest font-semibold mb-1">Acquisition Value</div>
                <div className="text-4xl text-white font-bold">{formatter.format(property.price)}</div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column: Metrics & Charts */}
            <div className="lg:col-span-2 space-y-10">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface-hover border border-border/50 p-4 rounded-xl">
                  <div className="text-slate-muted text-xs uppercase tracking-widest mb-1 flex items-center"><Activity className="w-3 h-3 mr-1"/> Cap Rate</div>
                  <div className="text-2xl text-emerald-400">{property.metrics.capRate}%</div>
                </div>
                <div className="bg-surface-hover border border-border/50 p-4 rounded-xl">
                  <div className="text-slate-muted text-xs uppercase tracking-widest mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> Forecast</div>
                  <div className="text-2xl text-primary">+{property.metrics.appreciationForecast}%</div>
                </div>
                <div className="bg-surface-hover border border-border/50 p-4 rounded-xl">
                  <div className="text-slate-muted text-xs uppercase tracking-widest mb-1 flex items-center"><Building className="w-3 h-3 mr-1"/> SQFT</div>
                  <div className="text-2xl text-gray-200">{property.metrics.sqft.toLocaleString()}</div>
                </div>
                <div className="bg-surface-hover border border-border/50 p-4 rounded-xl">
                  <div className="text-slate-muted text-xs uppercase tracking-widest mb-1 flex items-center"><DollarSign className="w-3 h-3 mr-1"/> Price/SQFT</div>
                  <div className="text-2xl text-gray-200">{formatter.format(property.price / property.metrics.sqft)}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-6">5-Year Cash Flow Projection</h3>
                <div className="h-64 w-full bg-surface-hover border border-border/50 rounded-xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2b30" vertical={false} />
                      <XAxis dataKey="year" stroke="#80848f" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                      <YAxis stroke="#80848f" tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#141517', borderColor: '#2a2b30', borderRadius: '8px' }}
                        formatter={(value: any) => formatter.format(value as number)}
                      />
                      <Area type="monotone" dataKey="revenue" name="Projected Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="opex" name="OpEx" stroke="#f43f5e" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Right Column: Due Diligence */}
            <div className="space-y-8">
              <div className="bg-surface-hover border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-primary mr-2" />
                  Due Diligence Vault
                </h3>
                
                <div className="space-y-4">
                  {[
                    { doc: "Title Deed & Zoning Analysis", status: "Verified" },
                    { doc: "Environmental Survey (Phase 1)", status: "Verified" },
                    { doc: "Tax Structuring Packet", status: "Verified" },
                    { doc: "Appraisal Model (3rd Party)", status: "Pending" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 last:pb-0">
                      <span className="text-sm text-slate-300">{item.doc}</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${item.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-8 py-3 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 rounded-lg text-sm font-bold transition-colors">
                  Request Data Room Access
                </button>
              </div>

              <div className="bg-surface-hover border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">Initiate Acquisition</h3>
                <p className="text-xs text-slate-muted mb-6">Execution is handled via partnered escrow.</p>
                <button className="w-full py-4 bg-primary text-background hover:bg-primary-hover font-bold rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all">
                  Submit Letter of Intent (LOI)
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
