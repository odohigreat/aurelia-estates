import { KYCForm } from '../features/kyc/KYCForm';
import { DocumentVault } from '../features/kyc/DocumentVault';

export default function CompliancePage() {
  return (
    <div className="animate-fade-in space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Compliance & Legal</h1>
        <p className="text-slate-muted mt-1">Manage KYC clearance, Non-Disclosure Agreements, and Proof of Funds.</p>
      </div>

      <DocumentVault />

      <div>
        <h2 className="text-xl font-bold text-white mb-6">Secure Upload Portal</h2>
        <KYCForm />
      </div>
    </div>
  );
}
