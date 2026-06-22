import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const volumeData = [
  { region: 'London', volume: 120 },
  { region: 'Dubai', volume: 98 },
  { region: 'New York', volume: 86 },
  { region: 'Monaco', volume: 99 },
  { region: 'Singapore', volume: 85 },
  { region: 'Tokyo', volume: 65 },
];

const capRateData = [
  { quarter: 'Q1', London: 4.2, Dubai: 5.5, NY: 4.8 },
  { quarter: 'Q2', London: 4.3, Dubai: 5.3, NY: 4.9 },
  { quarter: 'Q3', London: 4.1, Dubai: 5.1, NY: 4.7 },
  { quarter: 'Q4', London: 4.0, Dubai: 5.0, NY: 4.6 },
  { quarter: 'Q1 (Est)', London: 3.9, Dubai: 4.8, NY: 4.5 },
];

export function MacroCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="glass-panel w-full">
        <CardHeader>
          <CardTitle className="text-lg text-white">Acquisition Volume Index (Ultra-Luxury)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={volumeData}>
                <PolarGrid stroke="#2a2b30" />
                <PolarAngleAxis dataKey="region" tick={{ fill: '#80848f', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Volume Index" dataKey="volume" stroke="#d4af37" fill="#d4af37" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141517', borderColor: '#2a2b30', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#d4af37' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-panel w-full">
        <CardHeader>
          <CardTitle className="text-lg text-white">Global Cap Rate Velocity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={capRateData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2b30" vertical={false} />
                <XAxis dataKey="quarter" stroke="#80848f" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#80848f" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[3.5, 6]} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141517', borderColor: '#2a2b30', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="London" stroke="#d4af37" strokeWidth={2} dot={{r: 4}} />
                <Line type="monotone" dataKey="Dubai" stroke="#10b981" strokeWidth={2} dot={{r: 4}} />
                <Line type="monotone" dataKey="NY" stroke="#3b82f6" strokeWidth={2} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-[#d4af37] mr-2"/> London</div>
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"/> Dubai</div>
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-blue-500 mr-2"/> New York</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
