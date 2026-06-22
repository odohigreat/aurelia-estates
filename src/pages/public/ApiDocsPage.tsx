import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function ApiDocsPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="API Documentation" 
        subtitle="Programmatic access to our off-market inventory and predictive valuation endpoints."
      />
      <div className="max-w-5xl mx-auto px-4 mt-16 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold text-white mb-6">Integration Guide</h2>
          <ul className="space-y-4">
            <li><a href="#" className="text-primary hover:text-primary-hover font-medium block">Authentication (Bearer Token)</a></li>
            <li><a href="#" className="text-slate-muted hover:text-white transition-colors block">Portfolio Endpoints</a></li>
            <li><a href="#" className="text-slate-muted hover:text-white transition-colors block">Cap Rate Webhooks</a></li>
            <li><a href="#" className="text-slate-muted hover:text-white transition-colors block">KYC Status Check</a></li>
            <li><a href="#" className="text-slate-muted hover:text-white transition-colors block">Rate Limits</a></li>
          </ul>
        </div>
        
        <div className="lg:w-2/3 space-y-8">
          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-border/50">
            <div className="flex items-center px-4 py-3 bg-[#252526] border-b border-border/50 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-slate-muted font-mono">POST /api/v1/valuations/predict</span>
            </div>
            <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300">
              <pre>
                <code>
<span className="text-blue-400">curl</span> -X POST https://api.aurelia.com/v1/valuations/predict \<br/>
  -H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
  -H <span className="text-green-400">"Content-Type: application/json"</span> \<br/>
  -d <span className="text-yellow-300">'{'{'}"asset_id": "LDN-993", "forecast_years": 10{'}'}'</span>
                </code>
              </pre>
            </div>
          </div>

          <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-border/50">
            <div className="px-4 py-2 bg-[#252526] border-b border-border/50">
              <span className="text-xs text-slate-muted font-mono">Response (200 OK)</span>
            </div>
            <div className="p-6 overflow-x-auto text-sm font-mono text-gray-300">
              <pre>
                <code>
{`{
  "asset_id": "LDN-993",
  "location": "Mayfair, London",
  "current_valuation": 45000000,
  "currency": "GBP",
  "predictions": {
    "year_5": 58500000,
    "year_10": 72000000,
    "cap_rate_compression": "-0.45%"
  },
  "confidence_score": 0.94
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
