import { StaticPageHeader } from '../../components/ui/StaticPageHeader';

export default function TermsPage() {
  return (
    <div className="pb-24">
      <StaticPageHeader
        title="Terms of use"
        subtitle="The current scope of website access, listings and services."
      />
      <div className="max-w-4xl mx-auto px-4 mt-16 prose prose-invert prose-slate">
        <h2 className="text-ink text-2xl font-bold mb-4">1. Website access</h2>
        <p className="text-slate-light mb-8">
          Aurelia Estates provides account access through Supabase email and password authentication, with email confirmation. This does not establish investor eligibility or verify identity or funds. Identity review and sanctions screening are not operational; the property collection remains illustrative.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">2. Listings and financial scenarios</h2>
        <p className="text-slate-light mb-8">
          Property listings, supporting materials and financial scenarios are illustrative. They do not confirm property availability, verified market values or investment outcomes, and should not be treated as investment advice. Access does not establish a binding confidentiality agreement. Use fictional details for identity review. Enquiry previews are not sent or saved until you choose Send enquiry. Submission requires sign-in and a confirmed email address, and saves your details against the selected property. It does not reserve a property, complete a transaction or provide enquiry email delivery.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">3. Property transactions</h2>
        <p className="text-slate-light mb-8">
          The acquisition and document sections show example review steps. The website does not execute purchases, submit letters of intent, process payments or currency transfers, or arrange escrow or legal services. These sections do not establish a transaction service or contractual protection.
        </p>

        <h2 className="text-ink text-2xl font-bold mb-4">4. API examples and further review</h2>
        <p className="text-slate-light">
          The API requests, keys and limits shown are examples. An API service is not currently available. Before commercial use, the operator, applicable terms, access rules and any proposed financial services require confirmation and qualified legal review. This page describes the current website; it is not a legally reviewed agreement.
        </p>
      </div>
    </div>
  );
}
