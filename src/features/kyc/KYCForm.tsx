import * as React from 'react';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, UploadCloud, Loader2 } from 'lucide-react';

const kycSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  passportNumber: z.string().min(6, 'Valid passport number required'),
  sourceOfFunds: z.string().min(3, 'Source of funds required'),
});

type KYCFormData = z.infer<typeof kycSchema>;

export function KYCForm() {
  const [formData, setFormData] = React.useState<Partial<KYCFormData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof KYCFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'uploading' | 'verifying' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof KYCFormData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      kycSchema.parse(formData);
      setIsSubmitting(true);
      setStatus('uploading');
      
      // Simulate async upload feedback loop
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('verifying');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus('success');
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof KYCFormData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof KYCFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <Card className="max-w-lg mx-auto mt-12 border-emerald-500/30">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <CardTitle className="text-2xl text-emerald-50">Identity Verified</CardTitle>
          <CardDescription>
            Your high-net-worth clearance has been approved. You now have full access to Ultra-Luxury tier properties.
          </CardDescription>
          <Button className="mt-6" onClick={() => setStatus('idle')}>Continue to Dashboard</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto mt-12">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <CardTitle>Identity & Compliance Verification</CardTitle>
        </div>
        <CardDescription>
          Please provide the necessary documentation to clear your account for high-value real estate acquisitions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Legal Name</label>
            <Input
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.fullName && <p className="text-xs text-rose-400">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Passport Number</label>
            <Input
              name="passportNumber"
              placeholder="A1234567"
              value={formData.passportNumber || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.passportNumber && <p className="text-xs text-rose-400">{errors.passportNumber}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Source of Funds Declaration</label>
            <Input
              name="sourceOfFunds"
              placeholder="e.g. Asset Sale, Investment Returns"
              value={formData.sourceOfFunds || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.sourceOfFunds && <p className="text-xs text-rose-400">{errors.sourceOfFunds}</p>}
          </div>

          <div className="pt-4 border-t border-border border-dashed">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-surface hover:bg-surface-hover transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-slate-muted" />
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold text-primary">Click to upload</span> identity document
                  </p>
                  <p className="text-xs text-slate-muted">PDF, PNG, JPG (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" disabled={isSubmitting} />
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {status === 'uploading' ? 'Encrypting & Uploading...' : 'Verifying Identity...'}
              </>
            ) : (
              'Submit Verification'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
