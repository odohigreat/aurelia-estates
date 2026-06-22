import * as React from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useUIStore } from '../hooks/useStore';
import { Building2, Loader2, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid institutional email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [formData, setFormData] = React.useState<Partial<LoginData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof LoginData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const login = useUIStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof LoginData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate API network delay for mock auth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      login({
        id: 'usr-123',
        name: 'H.N.W. Client',
        email: formData.email as string,
        role: 'user'
      });
      
      navigate('/dashboard/portfolio');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof LoginData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof LoginData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blurred background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link to="/" className="inline-flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Building2 className="text-background w-7 h-7" />
          </div>
        </Link>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
          Secure Portal Access
        </h2>
        <p className="mt-2 text-sm text-slate-muted">
          Institutional grade encryption
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in">
        <Card className="glass-panel border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
              Sign In
            </CardTitle>
            <CardDescription>Enter your credentials to access your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@aurelia.com"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <a href="#" className="text-xs font-medium text-primary hover:text-primary-hover">
                    Forgot password?
                  </a>
                </div>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.password && <p className="text-xs text-rose-400">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Secure Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-xs text-slate-muted">
          By signing in, you agree to our strict <a href="#" className="text-primary hover:underline">Confidentiality Agreement</a>.
        </p>
      </div>
    </div>
  );
}
