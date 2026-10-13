import { KYCForm } from '../features/kyc/KYCForm';
import { DocumentVault } from '../features/kyc/DocumentVault';

export default function CompliancePage() {
  return (
    <div className="animate-fade-in space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-ink tracking-tight">Compliance preview</h1>
        <p className="text-slate-muted mt-1">Review example document records and explore the identity review steps. No checks or approvals are carried out.</p>
      </div>

      <DocumentVault />

      <div>
        <h2 className="text-xl font-bold text-ink mb-6">Review form</h2>
        <KYCForm />
      </div>
    </div>
  );
}
