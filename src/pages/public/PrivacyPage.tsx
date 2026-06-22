import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader 
        title="Privacy Policy" 
        subtitle="Absolute discretion and data protection."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <h2 className="text-white text-2xl font-bold mb-4">1. Information We Collect</h2>
        <p className="text-slate-light mb-8">
          Aurelia Estates processes highly sensitive institutional data. We collect entity documentation, proof of funds, passports for ultimate beneficial owners (UBOs), and digital interaction telemetry. This data is collected solely for the purposes of Anti-Money Laundering (AML) compliance and platform security.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">2. 256-Bit Encryption Protocol</h2>
        <p className="text-slate-light mb-8">
          All data at rest is secured utilizing AES-256 encryption. Data in transit is protected via TLS 1.3. We operate isolated, air-gapped databases for KYC compliance documentation to ensure absolute security against unauthorized extraction.
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">3. Data Sharing & Third Parties</h2>
        <p className="text-slate-light mb-8">
          We do not sell, rent, or lease your data. Information is shared strictly with regulatory bodies when legally required, or with trusted escrow partners during the execution of a transaction. All partners are bound by strict Non-Disclosure Agreements (NDAs).
        </p>

        <h2 className="text-white text-2xl font-bold mb-4">4. Your Data Rights</h2>
        <p className="text-slate-light">
          Under GDPR, CCPA, and PDPA regulations, you maintain the right to request full erasure of your data upon the closure of your account and the completion of the statutory 5-year AML data retention period. Please contact our Data Protection Officer at dpo@aurelia.com for requests.
        </p>
      </div>
    </div>
  );
}
