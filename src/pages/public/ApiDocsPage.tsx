import type { ReactNode } from 'react';
import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

const SECTIONS = [
  { id: 'access-token', label: 'Example access token' },
  { id: 'portfolio-requests', label: 'Portfolio requests' },
  { id: 'webhooks', label: 'Webhook examples' },
  { id: 'statuses', label: 'Example statuses' },
  { id: 'limits', label: 'Request limits' },
];

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="bg-charcoal-deep rounded-xl overflow-hidden border border-border/50">
      <div className="px-4 py-2 bg-surface-hover border-b border-border/50">
        <span className="text-xs text-slate-muted font-mono">{title}</span>
      </div>
      <pre className="p-5 sm:p-6 overflow-x-auto text-sm font-mono text-gray-700"><code>{children}</code></pre>
    </div>
  );
}

function DocSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 space-y-5">
      <h2 id={`${id}-title`} className="font-display text-3xl font-normal text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="API examples"
        subtitle="Example requests and responses for a proposed API. The service is not currently available, and the keys, endpoints and limits shown are examples."
      />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 flex flex-col lg:flex-row gap-10 lg:gap-14">
        <nav aria-label="API sections" className="lg:w-1/4 lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-xs uppercase tracking-[0.2em] text-slate-muted mb-4">Proposed features</h2>
          <ul className="space-y-3">
            {SECTIONS.map(section => (
              <li key={section.id}><a href={`#${section.id}`} className="text-slate-light hover:text-primary transition-colors">{section.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="lg:w-3/4 space-y-14 text-slate-light leading-[1.8]">
          <p className="rounded-xl border border-amber-700/30 bg-amber-50 p-5 text-sm text-amber-900">
            Proposal only. No API is running, no keys are issued, and requests to the example host will not succeed. This page shows how an Aurelia integration could be designed.
          </p>

          <DocSection id="access-token" title="Example access token">
            <p>Requests would be authenticated with a bearer token issued per organisation. Tokens would be scoped to read listings or manage enquiries, and could be revoked at any time.</p>
            <CodeBlock title="POST /api/v1/valuations/predict (example)">{`curl -X POST https://api.aurelia.example/v1/valuations/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"asset_id": "LDN-993", "forecast_years": 10}'`}</CodeBlock>
            <CodeBlock title="Example response (200 OK)">{`{
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
}`}</CodeBlock>
          </DocSection>

          <DocSection id="portfolio-requests" title="Portfolio requests">
            <p>Listings would mirror the portal’s filters, so an integration sees exactly what a signed-in user sees. Values would always be returned in the listing’s own currency.</p>
            <CodeBlock title="GET /api/v1/properties (example)">{`curl "https://api.aurelia.example/v1/properties?tier=Luxury&currency=EUR&bedrooms=4" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</CodeBlock>
          </DocSection>

          <DocSection id="webhooks" title="Webhook examples">
            <p>Webhooks would notify an integration when a listing changes or an enquiry is saved. Each delivery would be signed so the receiver can confirm it came from Aurelia.</p>
            <CodeBlock title="Example event: enquiry.created">{`{
  "type": "enquiry.created",
  "created_at": "2026-10-12T09:30:00Z",
  "data": { "property_id": "prop-002", "status": "new" }
}`}</CodeBlock>
          </DocSection>

          <DocSection id="statuses" title="Example statuses">
            <ul className="space-y-2 text-sm">
              <li><code className="font-mono text-ink">200 OK</code>: the request succeeded.</li>
              <li><code className="font-mono text-ink">401 Unauthorized</code>: the token is missing, expired or revoked.</li>
              <li><code className="font-mono text-ink">403 Forbidden</code>: the token lacks the required scope.</li>
              <li><code className="font-mono text-ink">404 Not Found</code>: the property is unknown or no longer published.</li>
              <li><code className="font-mono text-ink">429 Too Many Requests</code>: the rate limit was reached; retry after the indicated delay.</li>
            </ul>
          </DocSection>

          <DocSection id="limits" title="Request limits">
            <p>A proposed default of 60 requests per minute per token, with responses paginated at 100 records, the same page size the website uses when it reads published listings.</p>
          </DocSection>
        </div>
      </div>
    </div>
  );
}
