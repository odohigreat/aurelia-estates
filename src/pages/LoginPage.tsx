import * as React from 'react';
import { z } from 'zod';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUIStore } from '../hooks/useStore';
import { Loader2 } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AuthLayout } from '../layouts/AuthLayout';
import { signIn, resendConfirmation } from '../features/auth/authActions';
import { accountUser, safeReturnPath } from '../features/auth/authSession';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const formId = React.useId();
  const [formData, setFormData] = React.useState<Partial<LoginData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof LoginData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const authStatus = useUIStore(state => state.authStatus);
  const [requestError, setRequestError] = React.useState<string | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);
  const [isResending, setIsResending] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const destination = safeReturnPath(location.state?.from);
  React.useEffect(() => {
    if (authStatus === 'authenticated') navigate(destination, { replace: true });
  }, [authStatus, destination, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError(null);
    setNotice(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof LoginData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const details = loginSchema.parse(formData);
      setRequestError(null);
      setNotice(null);
      setIsSubmitting(true);
      const session = await signIn(details.email, details.password);
      useUIStore.getState().setSession(accountUser(session));
      navigate(destination, { replace: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LoginData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginData] = err.message;
          }
        });
        setErrors(fieldErrors);
        const field = Object.keys(fieldErrors)[0];
        if (field) document.getElementById(`${formId}-${field}`)?.focus();
      } else {
        setRequestError(error instanceof Error ? error.message : 'Sign-in could not be completed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    const email = loginSchema.shape.email.safeParse(formData.email);
    if (!email.success) {
      setErrors(previous => ({ ...previous, email: 'Enter a valid email address to request a confirmation link.' }));
      document.getElementById(`${formId}-email`)?.focus();
      return;
    }
    setIsResending(true); setRequestError(null); setNotice(null);
    try {
      await resendConfirmation(email.data);
      setNotice('If confirmation is needed for this address, a new link has been requested. Check your inbox and spam folder, and open the link in this browser.');
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'The confirmation link could not be requested. Please try again.');
    } finally { setIsResending(false); }
  };

  return (
    <AuthLayout
      eyebrow="Portfolio access"
      title="Welcome to Aurelia."
      description="Sign in with your confirmed email address and password to access your account."
      footer={<p>First visit? <Link to="/signup" className="ml-1 text-[#76633f] font-medium underline underline-offset-4 hover:text-[#242622]">Create an account</Link></p>}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting || isResending}>
        {requestError && <p role="alert" className="text-sm text-rose-700">{requestError}</p>}
        {!requestError && typeof location.state?.authNotice === 'string' && <p role="alert" className="text-sm text-slate-light">{location.state.authNotice}</p>}
        {notice && <p role="status" className="text-sm text-slate-light">{notice}</p>}
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
            disabled={isSubmitting || isResending}
          />
          {errors.email && <p id={`${formId}-email-error`} role="alert" className="text-sm text-rose-700">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={`${formId}-password`} className="text-sm font-medium text-[#454539]">Password</label>
            <Link to="/contact" className="text-xs font-medium text-[#76633f] hover:text-[#242622]">
              Contact
            </Link>
          </div>
          <Input
            className="h-12 bg-white/70 border-[#8d877b] text-[#242622] placeholder:text-[#77776e] focus-visible:border-[#76633f] focus-visible:ring-[#76633f]"
            id={`${formId}-password`}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? `${formId}-password-error` : undefined}
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={formData.password || ''}
            onChange={handleChange}
            disabled={isSubmitting || isResending}
          />
          {errors.password && <p id={`${formId}-password-error`} role="alert" className="text-sm text-rose-700">{errors.password}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || isResending} size="lg">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Opening portal…
            </>
          ) : (
            'Open portal'
          )}
        </Button>
        <button type="button" onClick={() => void handleResend()} disabled={isSubmitting || isResending} className="text-sm underline underline-offset-4 disabled:opacity-50">
          {isResending ? 'Requesting confirmation…' : 'Resend confirmation email'}
        </button>
      </form>
    </AuthLayout>
  );
}
