import * as React from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useUIStore } from '../hooks/useStore';
import { Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { registerAccount, resendConfirmation } from '../features/auth/authActions';
import { accountUser } from '../features/auth/authSession';

const signupSchema = z.object({
  firstName: z.string().trim().max(50, 'Use at most 50 characters.').min(2, 'Enter a first name with at least 2 characters.'),
  lastName: z.string().trim().max(49, 'Use at most 49 characters.').min(2, 'Enter a last name with at least 2 characters.'),
  entity: z.string().min(2, 'Enter a company or family office name with at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(8, 'Use a password with at least 8 characters.'),
});

type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const formId = React.useId();
  const [formData, setFormData] = React.useState<Partial<SignupData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof SignupData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [requestError, setRequestError] = React.useState<string | null>(null);
  const [confirmationEmail, setConfirmationEmail] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const confirmationRef = React.useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const authStatus = useUIStore(state => state.authStatus);
  React.useEffect(() => {
    if (authStatus === 'authenticated') navigate('/dashboard/portfolio', { replace: true });
  }, [authStatus, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof SignupData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const details = signupSchema.parse(formData);
      setRequestError(null); setNotice(null);
      setIsSubmitting(true);
      const session = await registerAccount(details.email, details.password, `${details.firstName} ${details.lastName}`);
      setFormData(previous => ({ ...previous, password: '' }));
      if (session) {
        useUIStore.getState().setSession(accountUser(session));
        navigate('/dashboard/portfolio', { replace: true });
      } else {
        setConfirmationEmail(details.email);
        requestAnimationFrame(() => confirmationRef.current?.focus());
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignupData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignupData] = err.message;
          }
        });
        setErrors(fieldErrors);
        const field = Object.keys(fieldErrors)[0];
        if (field) document.getElementById(`${formId}-${field}`)?.focus();
      } else {
        setRequestError(error instanceof Error ? error.message : 'Registration could not be completed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!confirmationEmail) return;
    setIsSubmitting(true); setRequestError(null); setNotice(null);
    try {
      await resendConfirmation(confirmationEmail);
      setNotice('A new confirmation link has been requested. Check your inbox and spam folder.');
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'The confirmation link could not be requested. Please try again.');
    } finally { setIsSubmitting(false); }
  };

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Create your Aurelia account."
      description="Register with your name and email address. Confirm your email to access the portal."
      footer={<p>Already have an account? <Link to="/login" className="ml-1 text-[#76633f] font-medium underline underline-offset-4 hover:text-[#242622]">Sign in</Link></p>}
    >
      {confirmationEmail ? <div className="space-y-5" aria-busy={isSubmitting}>
        <h2 ref={confirmationRef} tabIndex={-1} className="text-xl font-medium">Check your email</h2>
        <p className="text-sm text-slate-light">If registration can proceed for {confirmationEmail}, a confirmation email will be sent. Open the link in this browser to continue. Check your spam folder if it does not arrive.</p>
        <p className="text-sm text-slate-light">Your company or family office name has not been saved.</p>
        {requestError && <p role="alert" className="text-sm text-rose-700">{requestError}</p>}
        {notice && <p role="status" className="text-sm text-slate-light">{notice}</p>}
        <Button type="button" onClick={() => void handleResend()} disabled={isSubmitting}>{isSubmitting ? 'Requesting confirmation…' : 'Resend confirmation email'}</Button>
        <button type="button" className="block text-sm underline underline-offset-4" disabled={isSubmitting} onClick={() => { setConfirmationEmail(null); setRequestError(null); setNotice(null); requestAnimationFrame(() => document.getElementById(`${formId}-email`)?.focus()); }}>Edit details</button>
      </div> : <form className="space-y-4" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        {requestError && <p role="alert" className="text-sm text-rose-700">{requestError}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor={`${formId}-firstName`} className="text-sm font-medium text-[#454539]">First name</label>
            <Input
              className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
              id={`${formId}-firstName`}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? `${formId}-firstName-error` : undefined}
              name="firstName"
              type="text"
              placeholder="Jonathan"
              value={formData.firstName || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.firstName && <p id={`${formId}-firstName-error`} role="alert" className="text-sm text-rose-700">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor={`${formId}-lastName`} className="text-sm font-medium text-[#454539]">Last name</label>
            <Input
              className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
              id={`${formId}-lastName`}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? `${formId}-lastName-error` : undefined}
              name="lastName"
              type="text"
              placeholder="Mercer"
              value={formData.lastName || ''}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.lastName && <p id={`${formId}-lastName-error`} role="alert" className="text-sm text-rose-700">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-entity`} className="text-sm font-medium text-[#454539]">Company or family office name</label>
          <Input
            className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
            id={`${formId}-entity`}
            aria-invalid={Boolean(errors.entity)}
            aria-describedby={`${formId}-entity-hint${errors.entity ? ` ${formId}-entity-error` : ''}`}
            name="entity"
            type="text"
            placeholder="Company or family office"
            value={formData.entity || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <p id={`${formId}-entity-hint`} className="text-xs text-slate-muted">For this form only; this information is not sent or saved with your account.</p>
          {errors.entity && <p id={`${formId}-entity-error`} role="alert" className="text-sm text-rose-700">{errors.entity}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-email`} className="text-sm font-medium text-[#454539]">Email address</label>
          <Input
            className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
            id={`${formId}-email`}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.email && <p id={`${formId}-email-error`} role="alert" className="text-sm text-rose-700">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor={`${formId}-password`} className="text-sm font-medium text-[#454539]">Password</label>
          <Input
            className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
            id={`${formId}-password`}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? `${formId}-password-error` : undefined}
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={formData.password || ''}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.password && <p id={`${formId}-password-error`} role="alert" className="text-sm text-rose-700">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full mt-6" disabled={isSubmitting} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>}
    </AuthLayout>
  );
}
