
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  return (
    <Card className="glass-panel w-full">
      <CardHeader>
        <CardTitle>Predictive Valuation Analytics (10-Year Forecast)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#80848f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#80848f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2b30" vertical={false} />
              <XAxis 
                dataKey="year" 
                stroke="#80848f" 
                tick={{ fill: '#80848f', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <YAxis 
                stroke="#80848f" 
                tick={{ fill: '#80848f', fontSize: 12 }} 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#141517', borderColor: '#2a2b30', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#d4af37' }}
                formatter={(value: any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value as number)}
              />
              <Area type="monotone" dataKey="forecast" stroke="#80848f" strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" name="Projected Value" />
              <Area type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" name="Historical Value" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
