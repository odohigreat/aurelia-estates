import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function CookiesPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Cookie Settings" 
        subtitle="Manage your localized preferences."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <p className="text-slate-light mb-12 text-lg">
          We utilize essential cookies to maintain secure sessions and encrypted KYC workflows. Our use of cookies is strictly limited to functionality and platform security.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">Essential Cookies</h2>
        <p className="text-slate-light mb-8">
          These cookies are required for the platform to function. They authenticate your session, enforce our Web Application Firewall (WAF), and maintain your state across the dashboard. They cannot be disabled.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">Analytical Cookies</h2>
        <p className="text-slate-light mb-8">
          We use anonymized, aggregated telemetry to understand how our institutional clients interact with our predictive charts. This allows us to optimize the rendering speed of complex data sets. No personally identifiable information (PII) is tracked.
        </p>

        <div className="bg-surface border border-border/50 p-6 rounded-xl mt-12 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold">Analytical Tracking</h3>
            <p className="text-slate-muted text-sm">Help us optimize platform performance.</p>
          </div>
          <button className="bg-primary text-background px-6 py-2 rounded-full font-bold text-sm">
            Opt Out
          </button>
        </div>
      </div>
    </div>
  );
}
