import * as React from 'react';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useUIStore } from '../hooks/useStore';
import { Loader2, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/ui/Logo';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  entity: z.string().min(2, 'Entity / Family Office name is required'),
  email: z.string().email('Please enter a valid institutional email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [formData, setFormData] = React.useState<Partial<SignupData>>({});
  const [errors, setErrors] = React.useState<Partial<Record<keyof SignupData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const login = useUIStore((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof SignupData]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      setIsSubmitting(true);
      
      // Simulate API network delay for mock auth
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      login({
        id: 'usr-' + Math.floor(Math.random() * 1000),
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email as string,
        role: 'user'
      });
      
      navigate('/dashboard/portfolio');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof SignupData, string>> = {};
        error.issues.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SignupData] = err.message;
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8 flex flex-col items-center">
        <Logo iconOnly className="scale-[2] mb-6" />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
          Apply for Access
        </h2>
        <p className="mt-2 text-sm text-slate-muted">
          Institutional grade verification required
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in">
        <Card className="glass-panel border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-primary" />
              Application Form
            </CardTitle>
            <CardDescription>Submit details to initiate the KYC clearance process.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="Jonathan"
                    value={formData.firstName || ''}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.firstName && <p className="text-xs text-rose-400">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Mercer"
                    value={formData.lastName || ''}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.lastName && <p className="text-xs text-rose-400">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Entity / Family Office Name</label>
                <Input
                  name="entity"
                  type="text"
                  placeholder="Oakhaven Capital"
                  value={formData.entity || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.entity && <p className="text-xs text-rose-400">{errors.entity}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Corporate Email</label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="j.mercer@oakhaven.com"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={formData.password || ''}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.password && <p className="text-xs text-rose-400">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full mt-6" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing KYC...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-sm text-slate-muted">
          Already an approved client? <br/>
          <Link to="/login" className="text-primary hover:underline font-bold mt-2 inline-block">Secure Sign In</Link>
        </p>
      </div>
    </div>
  );
}
