
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useReducedMotion } from 'framer-motion';

const data = [
  { year: '2020', value: 12000000, forecast: 12000000 },
  { year: '2021', value: 12800000, forecast: 12500000 },
  { year: '2022', value: 14200000, forecast: 13200000 },
  { year: '2023', value: 15100000, forecast: 14000000 },
  { year: '2024', value: 15500000, forecast: 15000000 },
  { year: '2025', value: null, forecast: 16500000 },
  { year: '2026', value: null, forecast: 17800000 },
  { year: '2027', value: null, forecast: 19500000 },
];

export default function ValuationDashboard() {
  const reducedMotion = useReducedMotion();
  return (
    <Card className="w-full min-w-0">
      <CardHeader className="border-b border-border/70">
        <CardTitle className="text-lg sm:text-xl">Illustrative valuation scenario ({data[0].year}–{data[data.length - 1].year})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b7042" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#8b7042" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#879aaa" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#879aaa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7edf2" vertical={false} />
              <XAxis
                dataKey="year"
                stroke="#666666"
                tick={{ fill: '#666666', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="#666666"
                tick={{ fill: '#666666', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d8d8d8', borderRadius: '12px', color: '#172635', boxShadow: '0 8px 24px rgba(23,38,53,0.1)' }}
                itemStyle={{ color: '#8b7042' }}
                formatter={(value) => typeof value === 'number' && Number.isFinite(value)
                  ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
                  : 'Unavailable'}
              />
              <Area isAnimationActive={!reducedMotion} type="monotone" dataKey="forecast" stroke="#879aaa" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" name="Scenario value" />
              <Area isAnimationActive={!reducedMotion} type="monotone" dataKey="value" stroke="#8b7042" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Example value" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
