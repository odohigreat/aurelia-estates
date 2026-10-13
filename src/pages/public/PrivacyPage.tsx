import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader
        title="Privacy information"
        subtitle="How this website handles information and external resources."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <h2 className="text-ink text-2xl font-bold mb-4">1. Information you enter</h2>
        <p className="text-slate-light mb-8">
          Registration sends your name, email address and password to Supabase Auth to create an account and request email confirmation. The company or family office field is not sent or saved. Identity review steps remain illustrative, and selected files are not read or uploaded. General contact enquiries are not sent or saved. Property enquiries can be previewed locally; choosing Send enquiry while signed in saves the selected property, name, email and message in Supabase, associated with your account, with a submission timestamp and enquiry status. The website does not implement enquiry email delivery. Use fictional details for identity review.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">2. Storage and security</h2>
        <p className="text-slate-light mb-8">
          Supabase Auth manages account credentials and sessions. Session tokens are kept in your browser’s local storage so access can be restored. Unsaved form drafts remain in application memory. The website does not upload or store identity documents. Hosting, service-provider safeguards and any encryption assurances require confirmation by the website operator.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">3. External resources</h2>
        <p className="text-slate-light mb-8">
          The website connects to Supabase for authentication, property listings and submitted property enquiries, and loads fonts from Google Fonts and images from Unsplash. Loading these resources shares connection information, such as your IP address, with those providers. Their logging, cookie and data practices, and those of the hosting provider, have not been verified. The website has no connected visitor analytics, regulatory reporting or escrow data-sharing service.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">4. Retention and privacy enquiries</h2>
        <p className="text-slate-light">
          Unsaved identity review and enquiry form entries reset when you reload the page. Account records, submitted property enquiries and browser sessions can persist beyond a reload. Their retention, and the retention of hosting and external provider records, require confirmation by the website operator. An account-deletion service and verified privacy contact are not currently available. Before commercial use, the operator, privacy contact, purposes of processing, applicable rights and retention arrangements require confirmation and qualified legal review. This page describes current website behaviour; it is not a legally reviewed privacy policy.
        </p>
      </div>
    </div>
  );
}
