import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { MapPin, Building, ShieldCheck, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Property } from '../../types';

import { generateMockCashFlow } from './propertyCashFlow';

export function PropertyDetailsContent({ property, titleId, headingLevel = 'h2', headerAction }: {
  property: Property;
  titleId: string;
  headingLevel?: 'h1' | 'h2';
  headerAction?: React.ReactNode;
}) {
  const Heading = headingLevel;
  const gradientId = React.useId();
  const reducedMotion = useReducedMotion();
  const price = property.price;
  const cashFlowData = React.useMemo(() => generateMockCashFlow(price), [price]);
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 });
  const axisFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, notation: 'compact', maximumFractionDigits: 1 });
  return <>
            {/* Header Image Area */}
            <div className="relative h-[380px] sm:h-96 w-full flex-shrink-0">
              <img src={property.images[0]} alt={`Illustrative property image for ${property.title}`} width={800} height={600} decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              {headerAction}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-white/90 border border-white/30 text-ink text-[10px] font-medium uppercase tracking-[0.16em] rounded-full">
                      {property.tier}
                    </span>
                  </div>
                  <Heading id={titleId} className="text-3xl sm:text-4xl font-display font-normal text-white tracking-tight">{property.title}</Heading>
                  <div className="flex items-start text-sm leading-relaxed text-gray-300 mt-3">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    {property.location.address}, {property.location.city}, {property.location.country}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-gray-300 uppercase tracking-[0.16em] font-medium mb-2">Illustrative listing value</div>
                  <div className="text-3xl sm:text-4xl text-white font-normal tabular-nums">{formatter.format(property.price)}</div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white">

              {/* Left Column: Metrics & Charts */}
              <div className="min-w-0 lg:col-span-2 space-y-6">

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-border/80 p-4 rounded-xl shadow-[0_3px_12px_-8px_rgba(23,38,53,0.14)]">
                    <div className="text-slate-muted text-[10px] uppercase tracking-wide mb-2 flex items-center"><Activity className="w-3 h-3 mr-1"/> Cap rate</div>
                    <div className="text-2xl font-medium tabular-nums text-emerald-700">{property.metrics.capRate}%</div>
                  </div>
                  <div className="bg-white border border-border/80 p-4 rounded-xl shadow-[0_3px_12px_-8px_rgba(23,38,53,0.14)]">
                    <div className="text-slate-muted text-[10px] uppercase tracking-wide mb-2 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> Scenario</div>
                    <div className="text-2xl font-medium tabular-nums text-primary">+{property.metrics.appreciationForecast}%</div>
                  </div>
                  <div className="bg-white border border-border/80 p-4 rounded-xl shadow-[0_3px_12px_-8px_rgba(23,38,53,0.14)]">
                    <div className="text-slate-muted text-[10px] uppercase tracking-wide mb-2 flex items-center"><Building className="w-3 h-3 mr-1"/> Sq ft</div>
                    <div className="text-xl font-semibold tabular-nums text-gray-800">{property.metrics.sqft.toLocaleString()}</div>
                  </div>
                  <div className="bg-white border border-border/80 p-4 rounded-xl shadow-[0_3px_12px_-8px_rgba(23,38,53,0.14)]">
                    <div className="text-slate-muted text-[10px] uppercase tracking-wide mb-2 flex items-center"><DollarSign className="w-3 h-3 mr-1"/> Price/sq ft</div>
                    <div className="text-xl font-semibold tabular-nums text-gray-800">{formatter.format(property.price / property.metrics.sqft)}</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-normal text-ink mb-3">Illustrative five-year cash flow</h3>
                  <p className="text-xs leading-relaxed text-slate-light mb-4">This example assumes annual revenue rising from 4% to 6% of the listing value and annual expenses of 1.5%. It is not a prediction of returns.</p>
                  <div className="h-64 w-full min-w-0 bg-surface border border-border/70 rounded-xl p-3 sm:p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#047857" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#dedede" vertical={false} />
                        <XAxis dataKey="year" stroke="#666666" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis stroke="#666666" tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => axisFormatter.format(val)} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d8d8d8', borderRadius: '8px' }}
                          formatter={(value) => typeof value === 'number' && Number.isFinite(value) ? formatter.format(value) : 'Unavailable'}
                        />
                        <Area isAnimationActive={!reducedMotion} type="monotone" dataKey="revenue" name="Scenario revenue" stroke="#047857" strokeWidth={3} fillOpacity={1} fill={`url(#${gradientId})`} />
                        <Area isAnimationActive={!reducedMotion} type="monotone" dataKey="opex" name="Operating expenses" stroke="#be123c" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* Right Column: Due Diligence */}
              <div className="space-y-5">
                <div className="bg-white border border-border/80 rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-ink mb-4 flex items-center">
                    <ShieldCheck className="w-5 h-5 text-accent mr-2" />
                    Example due diligence
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-light mb-4">These document statuses are examples. Documents have not been verified and are not available to view.</p>

                  <div className="space-y-2">
                    {[
                      { doc: "Title Deed & Zoning Analysis", status: "Verified" },
                      { doc: "Environmental Survey (Phase 1)", status: "Verified" },
                      { doc: "Tax planning documents", status: "Verified" },
                      { doc: "Third-party valuation", status: "Pending" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-border/50 last:border-0 last:pb-0">
                        <span className="text-sm text-slate-700">{item.doc}</span>
                        <span className={`text-[10px] font-medium uppercase tracking-wide ${item.status === 'Verified' ? 'text-emerald-700' : 'text-amber-700'}`}>
                          Sample {item.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button type="button" aria-disabled="true" title="Document access is unavailable" className="w-full mt-5 py-3 bg-surface text-slate-light hover:bg-surface border border-border rounded-md text-sm font-medium transition-colors">
                    Documents unavailable
                  </button>
                </div>

                <div className="bg-white border border-border/80 rounded-xl p-5 shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-2">Acquisition information</h3>
                  <p className="text-xs leading-relaxed text-slate-light mb-6">Property purchases, letters of intent and escrow services are unavailable.</p>
                  <button type="button" aria-disabled="true" title="Letters of intent cannot be submitted" className="w-full py-3 bg-surface text-slate-light hover:bg-surface border border-border font-medium text-sm rounded-md transition-colors">
                    Submission unavailable
                  </button>
                </div>
              </div>

            </div>
  </>;
}
