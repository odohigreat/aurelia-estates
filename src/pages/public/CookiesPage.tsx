import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

const STORAGE = [
  {
    name: 'sb-<project-ref>-auth-token',
    where: 'Local storage',
    purpose: 'Keeps your Supabase sign-in session so access can be restored after a reload. Removed when you sign out in this browser.',
    when: 'After you sign in or confirm your email',
  },
  {
    name: 'sb-<project-ref>-auth-token-code-verifier',
    where: 'Local storage',
    purpose: 'A one-time PKCE value that lets the confirmation link you receive by email be completed securely in the browser you registered with.',
    when: 'While an email confirmation is pending',
  },
  {
    name: 'Unsent form entries',
    where: 'Page memory only',
    purpose: 'Enquiry drafts, identity review entries and contact form text while you type. Nothing is written to browser storage.',
    when: 'Cleared on reload',
  },
];

export default function CookiesPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Cookie information"
        subtitle="What this website keeps in your browser, why, and which external providers it connects to."
      />
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <p className="text-slate-light mb-12 text-lg leading-[1.8]">
          The website uses local storage for Supabase authentication sessions and email-confirmation handling. Unsaved form entries remain in browser memory. The application does not explicitly set cookies, and cookie preference controls are not currently available.
        </p>

        <h2 className="font-display text-ink text-3xl font-normal mb-5">What is stored</h2>
        <div className="overflow-x-auto rounded-xl border border-border/80 mb-12">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-ink">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Item</th>
                <th scope="col" className="px-4 py-3 font-medium">Where</th>
                <th scope="col" className="px-4 py-3 font-medium">Purpose</th>
                <th scope="col" className="px-4 py-3 font-medium">When</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70 bg-white">
              {STORAGE.map(item => (
                <tr key={item.name} className="align-top">
                  <th scope="row" className="px-4 py-4 font-mono text-xs text-ink font-normal break-all min-w-[11rem]">{item.name}</th>
                  <td className="px-4 py-4 text-slate-light whitespace-nowrap">{item.where}</td>
                  <td className="px-4 py-4 text-slate-light leading-relaxed min-w-[16rem]">{item.purpose}</td>
                  <td className="px-4 py-4 text-slate-light min-w-[9rem]">{item.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-ink text-3xl font-normal mb-4">Sessions and form entries</h2>
        <p className="text-slate-light mb-10 leading-[1.8]">
          Account sessions can be restored after a reload using browser storage. Signing out clears account access in the current browser; it does not delete your account or submitted enquiries, or sign out other devices. Identity review and unsent enquiry drafts reset on reload. Property enquiries submitted while signed in are stored in Supabase rather than browser storage.
        </p>

        <h2 className="font-display text-ink text-3xl font-normal mb-4">Analytics and external resources</h2>
        <p className="text-slate-light mb-6 leading-[1.8]">
          The website has no connected visitor analytics or tracking service. It loads fonts from Google Fonts and images from Unsplash. Hosting and resource providers may have their own logging, storage or cookie practices, which have not been verified. Those practices and any consent requirements need to be confirmed before commercial use.
        </p>
        <p className="text-slate-light mb-10 leading-[1.8]">
          You can remove everything listed above at any time by signing out and clearing this site’s data in your browser settings. The website will continue to work for browsing; you will simply need to sign in again to use the portal.
        </p>

        <div className="bg-surface border border-border/50 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-ink font-medium">Cookie preferences</h3>
            <p id="cookie-preferences-status" className="text-slate-muted text-sm">Cookie preference controls are not currently available.</p>
          </div>
          <button type="button" aria-disabled="true" aria-describedby="cookie-preferences-status" className="bg-primary text-background px-6 py-2 rounded-full font-medium text-sm self-start sm:self-auto">
            Unavailable
          </button>
        </div>
      </div>
    </div>
  );
}
