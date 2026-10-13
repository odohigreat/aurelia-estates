import * as React from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, UploadCloud, Loader2 } from 'lucide-react';

const kycSchema = z.object({
  fullName: z.string().min(3, 'Enter a full name with at least 3 characters.'),
  passportNumber: z.string().min(6, 'Enter a fictional passport number with at least 6 characters.'),
  sourceOfFunds: z.string().min(3, 'Describe an example source of funds using at least 3 characters.'),
});

type KYCFormData = z.infer<typeof kycSchema>;

export function KYCForm() {
  const formId = React.useId();
  const navigate = useNavigate();
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
            <ShieldCheck className="w-8 h-8 text-emerald-700" />
          </div>
          <CardTitle className="text-2xl text-emerald-800">Preview complete</CardTitle>
          <CardDescription>
            The form details meet the required format. This completes the preview; your identity has not been verified and no access approval has been granted.
          </CardDescription>
          <Button className="mt-6" onClick={() => navigate('/dashboard')}>Return to dashboard</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto mt-12">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <CardTitle>Compliance preview</CardTitle>
        </div>
        <CardDescription>
          Use fictional details and sample files only. Files are not uploaded, stored or checked. The review shown here is illustrative.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor={`${formId}-fullName`} className="text-sm font-medium text-gray-700">Full name (fictional)</label>
            <Input
              id={`${formId}-fullName`}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.fullName && <p id={`${formId}-fullName-error`} role="alert" className="text-xs text-rose-700">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-passportNumber`} className="text-sm font-medium text-gray-700">Passport number (fictional)</label>
            <Input
              id={`${formId}-passportNumber`}
              aria-invalid={Boolean(errors.passportNumber)}
              aria-describedby={errors.passportNumber ? `${formId}-passportNumber-error` : undefined}
              name="passportNumber"
              placeholder="A1234567"
              value={formData.passportNumber || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.passportNumber && <p id={`${formId}-passportNumber-error`} role="alert" className="text-xs text-rose-700">{errors.passportNumber}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor={`${formId}-sourceOfFunds`} className="text-sm font-medium text-gray-700">Source of funds (fictional)</label>
            <Input
              id={`${formId}-sourceOfFunds`}
              aria-invalid={Boolean(errors.sourceOfFunds)}
              aria-describedby={errors.sourceOfFunds ? `${formId}-sourceOfFunds-error` : undefined}
              name="sourceOfFunds"
              placeholder="e.g. Asset Sale, Investment Returns"
              value={formData.sourceOfFunds || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.sourceOfFunds && <p id={`${formId}-sourceOfFunds-error`} role="alert" className="text-xs text-rose-700">{errors.sourceOfFunds}</p>}
          </div>

          <div className="pt-4 border-t border-border border-dashed">
            <div className="flex items-center justify-center w-full">
              <label htmlFor={`${formId}-document`} className="relative focus-within:ring-2 focus-within:ring-primary flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-surface hover:bg-surface-hover transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-3 text-slate-muted" />
                  <p className="mb-2 text-sm text-gray-700">
                    <span className="font-semibold text-primary">Select a sample file</span> for the preview
                  </p>
                  <p id={`${formId}-document-hint`} className="text-xs text-slate-muted">The selected file stays on your device and is not checked or uploaded.</p>
                </div>
                <input id={`${formId}-document`} type="file" aria-label="Sample identity document" aria-describedby={`${formId}-document-hint`} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" disabled={isSubmitting} />
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {status === 'uploading' ? 'Preparing preview…' : 'Showing example review…'}
              </>
            ) : (
              'Preview review'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
