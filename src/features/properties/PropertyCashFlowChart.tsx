import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateMockCashFlow } from './propertyCashFlow';

export default function PropertyCashFlowChart({ price, currency }: { price: number; currency: string }) {
  const gradientId = React.useId();
  const reducedMotion = useReducedMotion();
  const cashFlowData = React.useMemo(() => generateMockCashFlow(price), [price]);
  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 });
  const axisFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency, notation: 'compact', maximumFractionDigits: 1 });
  return (
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
  );
}
