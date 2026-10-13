import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Property } from '../../types';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useMutation } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useUIStore } from '../../hooks/useStore';
import { submitPropertyEnquiry } from './enquiryApi';
import { createEnquirySchema, type PropertyEnquiry } from './enquirySchema';

type Field = 'fullName' | 'email' | 'message';
const EMPTY = { fullName: '', email: '', message: '' };

// The page keys this local form by property ID so drafts never cross property contexts.
export function PropertyEnquiryForm({ property, inventory }: { property: Property; inventory: readonly Property[] }) {
  const id = useId();
  const user = useUIStore(state => state.user);
  const authStatus = useUIStore(state => state.authStatus);
  const resultRef = useRef<HTMLParagraphElement>(null);
  const submission = useMutation({
    mutationFn: (enquiry: PropertyEnquiry) => {
      if (!user) throw new Error('Sign in before sending your enquiry.');
      return submitPropertyEnquiry(enquiry, inventory, user.id);
    },
    retry: false,
    onSettled: () => requestAnimationFrame(() => resultRef.current?.focus()),
  });
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof PropertyEnquiry, string>>>({});
  const [preview, setPreview] = useState<PropertyEnquiry | null>(null);
  const focusForm = () => requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus());
  const reset = () => { submission.reset(); setValues(EMPTY); setErrors({}); setPreview(null); focusForm(); };
  const change = (field: Field, value: string) => {
    setValues(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = createEnquirySchema(inventory).safeParse({ ...values, propertyId: property.id });
    if (!result.success) {
      const next: Partial<Record<keyof PropertyEnquiry, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof PropertyEnquiry;
        next[field] ??= issue.message;
      }
      setErrors(next);
      const first = (['fullName', 'email', 'message'] as const).find(field => next[field]);
      if (first) document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setErrors({}); setPreview(result.data);
    requestAnimationFrame(() => previewRef.current?.focus());
  };
  return (
    <section aria-labelledby={`${id}-title`} className="mt-6 bg-white border border-border/80 rounded-2xl p-5 sm:p-7 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-8 shadow-[0_6px_24px_-12px_rgba(23,38,53,0.15)]">
      <div className="mb-6 lg:mb-0 lg:border-r lg:border-border/70 lg:pr-7">
        <h2 id={`${id}-title`} className="font-display text-2xl sm:text-3xl font-normal text-ink mb-3">Property enquiry</h2>
        <p className="text-sm font-medium text-ink mb-3">{property.title} · {property.id}</p>
        <p className="text-sm text-slate-muted mb-6">Review your details before sending. Preview only — nothing has been sent or saved. Sign in to submit your enquiry. Sending saves your enquiry. It does not send an email or guarantee a response.</p>
      </div>
      <div className="min-w-0">
        {preview ? (
          <div>
            <h3 ref={previewRef} tabIndex={-1} className="text-xl font-medium text-ink mb-4">Review enquiry</h3>
            <dl className="space-y-4 rounded-xl border border-border/70 bg-surface p-5 text-slate-light break-words">
              <div><dt className="text-slate-muted">Selected property</dt><dd>{property.title} · {preview.propertyId}</dd></div>
              <div><dt className="text-slate-muted">Name</dt><dd className="font-medium text-ink">{preview.fullName}</dd></div>
              <div><dt className="text-slate-muted">Email</dt><dd className="font-medium text-ink">{preview.email}</dd></div>
              <div><dt className="text-slate-muted">Enquiry message</dt><dd className="whitespace-pre-wrap">{preview.message}</dd></div>
            </dl>
            {submission.isSuccess ? (
              <p ref={resultRef} tabIndex={-1} role="status" className="mt-5 text-sm text-emerald-800">Your enquiry has been saved. No email has been sent.</p>
            ) : submission.isError ? (
              <p ref={resultRef} tabIndex={-1} role="alert" className="mt-5 text-sm text-rose-700">{submission.error.message}</p>
            ) : null}
            <div className="flex flex-wrap gap-3 mt-6" aria-busy={submission.isPending}>
              {!submission.isSuccess && (authStatus === 'authenticated' && user ? (
                <Button disabled={submission.isPending} onClick={() => submission.mutate(preview)}>{submission.isPending ? 'Sending enquiry…' : 'Send enquiry'}</Button>
              ) : authStatus === 'loading' ? <p role="status">Checking account access…</p> : <Link to="/login" className="inline-flex items-center rounded-md border border-border px-5 py-2 text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2">Sign in to send enquiry</Link>)}
              <Button disabled={submission.isPending || submission.isSuccess} onClick={() => { submission.reset(); setPreview(null); focusForm(); }}>Edit enquiry</Button>
              <Button disabled={submission.isPending} variant="ghost" onClick={reset}>Clear enquiry</Button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(['fullName', 'email', 'message'] as const).map(field => {
              const label = { fullName: 'Full name', email: 'Email address', message: 'Enquiry message' }[field];
              const shared = { id: `${id}-${field}`, name: field, value: values[field], 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined, required: true, maxLength: field === 'message' ? 2000 : field === 'email' ? 254 : 100 };
              return <div key={field} className={`space-y-2 ${field === 'message' ? 'sm:col-span-2' : ''}`}>
                <label htmlFor={shared.id} className="text-sm font-medium text-slate-light">{label}</label>
                {field === 'message' ? <textarea {...shared} rows={5} onChange={e => change(field, e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-3 text-base sm:text-sm text-gray-800 focus-visible:ring-1 focus-visible:ring-primary" /> : <Input {...shared} type={field === 'email' ? 'email' : 'text'} autoComplete="off" onChange={e => change(field, e.target.value)} />}
                {errors[field] && <p id={`${id}-${field}-error`} role="alert" className="text-sm text-rose-700">{errors[field]}</p>}
              </div>;
            })}
            {errors.propertyId && <p role="alert" className="text-rose-700 sm:col-span-2">{errors.propertyId}</p>}
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <Button type="submit">Preview enquiry</Button>
              <Button type="button" variant="ghost" onClick={reset}>Clear enquiry</Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
