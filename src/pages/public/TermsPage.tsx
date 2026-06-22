import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function TermsPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Terms of Service" 
        subtitle="Legal frameworks for platform usage."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <h2 className="text-white text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
        <p className="text-slate-light mb-8">
          By accessing the Aurelia Estates proprietary network, you agree to these institutional Terms of Service. Access is strictly granted to verified High-Net-Worth Individuals (HNWIs), Family Offices, and Institutional Funds. Any attempt to bypass KYC workflows will result in permanent IP and entity blacklisting.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">2. Confidentiality & Non-Disclosure</h2>
        <p className="text-slate-light mb-8">
          All inventory listed on Aurelia Estates is strictly off-market. Users agree to a binding Non-Disclosure Agreement (NDA). Sharing property addresses, predictive capitalization models, or financial packets with unverified third parties constitutes a material breach of contract.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">3. Transaction Execution</h2>
        <p className="text-slate-light mb-8">
          Aurelia Estates acts as the technology facilitator. Final execution of acquisitions is handled by our partnered global law firms and escrow services. Aurelia is not liable for fluctuations in currency exchange rates during international transfers.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">4. API Usage Limits</h2>
        <p className="text-slate-light">
          Institutional clients utilizing our API agree to a rate limit of 1,000 requests per minute. Automated scraping or reverse-engineering of the predictive valuation models is strictly prohibited and monitored dynamically.
        </p>
      </div>
    </div>
  );
}
