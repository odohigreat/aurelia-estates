import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function CookiesPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader
        title="Cookie information"
        subtitle="Information about browser storage and external providers."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <p className="text-slate-light mb-12 text-lg">
          The website uses local storage for Supabase authentication sessions and email-confirmation handling. Unsaved form entries remain in browser memory. The application does not explicitly set cookies, and cookie preference controls are not currently available.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">Sessions and form entries</h2>
        <p className="text-slate-light mb-8">
          Account sessions can be restored after a reload using browser storage. Signing out clears account access in the current browser; it does not delete your account or submitted enquiries, or sign out other devices. Identity review and unsent enquiry drafts reset on reload. Property enquiries submitted while signed in are stored in Supabase rather than browser storage.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">Analytics and external resources</h2>
        <p className="text-slate-light mb-8">
          The website has no connected visitor analytics or tracking service. It loads fonts from Google Fonts and images from Unsplash. Hosting and resource providers may have their own logging, storage or cookie practices, which have not been verified. Those practices and any consent requirements need to be confirmed before commercial use.
        </p>

        <div className="bg-surface border border-border/50 p-6 rounded-xl mt-12 flex items-center justify-between">
          <div>
            <h3 className="text-ink font-bold">Cookie preferences</h3>
            <p id="cookie-preferences-status" className="text-slate-muted text-sm">Cookie preference controls are not currently available.</p>
          </div>
          <button type="button" aria-disabled="true" aria-describedby="cookie-preferences-status" className="bg-primary text-background px-6 py-2 rounded-full font-bold text-sm">
            Unavailable
          </button>
        </div>
      </div>
    </div>
  );
}
