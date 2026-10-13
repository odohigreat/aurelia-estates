import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useReducedMotion } from 'framer-motion';

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
  const reducedMotion = useReducedMotion();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card className="w-full min-w-0">
        <CardHeader className="border-b border-border/70 mb-6">
          <CardTitle className="text-lg text-ink">Illustrative acquisition index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={volumeData}>
                <PolarGrid stroke="#e7edf2" />
                <PolarAngleAxis dataKey="region" tick={{ fill: '#666666', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar isAnimationActive={!reducedMotion} name="Volume index" dataKey="volume" stroke="#8b7042" fill="#8b7042" fillOpacity={0.16} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d8d8d8', borderRadius: '12px', color: '#172635', boxShadow: '0 8px 24px rgba(23,38,53,0.1)' }}
                  itemStyle={{ color: '#8b7042' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full min-w-0">
        <CardHeader className="border-b border-border/70 mb-6">
          <CardTitle className="text-lg text-ink">Illustrative capitalisation rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={capRateData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7edf2" vertical={false} />
                <XAxis dataKey="quarter" stroke="#666666" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#666666" tick={{fontSize: 12}} axisLine={false} tickLine={false} domain={[3.5, 6]} tickFormatter={(val) => `${val}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#d8d8d8', borderRadius: '12px', color: '#172635', boxShadow: '0 8px 24px rgba(23,38,53,0.1)' }}
                />
                <Line isAnimationActive={!reducedMotion} type="monotone" dataKey="London" stroke="#8b7042" strokeWidth={2} dot={{r: 4}} />
                <Line isAnimationActive={!reducedMotion} type="monotone" dataKey="Dubai" stroke="#17354b" strokeWidth={2} dot={{r: 4}} />
                <Line isAnimationActive={!reducedMotion} type="monotone" dataKey="NY" stroke="#879aaa" strokeWidth={2} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-[#8b7042] mr-2"/> London</div>
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-[#17354b] mr-2"/> Dubai</div>
            <div className="flex items-center text-xs text-slate-muted"><div className="w-3 h-3 rounded-full bg-[#879aaa] mr-2"/> New York</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
