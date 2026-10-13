# Code Evidence Guide

This guide describes the current implementation. Supabase handles authentication and published property reads. Analytics projections, KYC and acquisition controls remain illustrative or unavailable. Authenticated enquiry submission uses the four permitted input columns; the owner confirmed the required defaults and RLS before activation. No commercial adoption or exclusive-authorship claim is made.

## Implementation map

| Sources | Behaviour and verification | Boundary |
|---|---|---|
| [propertyApi.ts](../../src/features/properties/propertyApi.ts), [useProperties.ts](../../src/features/properties/useProperties.ts) | Published Supabase REST reads, pagination, cancellation, Zod row mapping; one React Query inventory cache. [Tests](../../tests/propertyApi.test.cjs) cover invalid config, response errors, empty data and pagination. | No fixture fallback. Public reads are enforced by database permissions/RLS. |
| [propertyFilters.ts](../../src/features/properties/propertyFilters.ts), [PropertyGrid.tsx](../../src/features/properties/PropertyGrid.tsx) | Combined text/tier/country/currency/bedroom filters and URL history. [Tests](../../tests/propertyFilters.test.cjs) verify fixtures, AND semantics and URL handling. | Live counts depend on the published database inventory. |
| [PropertyDetailsPage.tsx](../../src/pages/public/PropertyDetailsPage.tsx), [PropertyDetailsContent.tsx](../../src/features/properties/PropertyDetailsContent.tsx) | Public property routes; reusable page/modal content; loading, error and missing-property states. [Tests](../../tests/propertyDetails.test.cjs). | No claim that listings belong to the signed-in user. |
| [portfolioSummary.ts](../../src/features/properties/portfolioSummary.ts), [propertyCashFlow.ts](../../src/features/properties/propertyCashFlow.ts) | Separate USD/EUR/CHF totals, unweighted cap-rate mean and five illustrative scenario rows. | No FX conversion or predictive valuation. Fixture totals: USD20m / EUR22m / CHF8.9m, mean4.25%. |
| [authActions.ts](../../src/features/auth/authActions.ts), [authSession.ts](../../src/features/auth/authSession.ts), [AuthProvider.tsx](../../src/features/auth/AuthProvider.tsx), [ProtectedRoute.tsx](../../src/features/auth/ProtectedRoute.tsx) | Supabase password access, signup confirmation, PKCE exchange, server-verified restoration, Zustand synchronisation, logout races and protected routes. [Tests](../../tests/auth.test.cjs). | Guided local authentication checks and owner SQL profile checks completed; cross-user isolation and production verification remain pending. Company field is not saved. |
| [supabase.ts](../../src/lib/supabase.ts) | Lazily loaded singleton SDK using public configuration; PKCE and persistent sessions. | Publishable keys are client-visible; never use a service-role/secret key here. |
| [enquirySchema.ts](../../src/features/enquiries/enquirySchema.ts), [PropertyEnquiryForm.tsx](../../src/features/enquiries/PropertyEnquiryForm.tsx) | Inventory association, trimmed validation, accessible errors/focus, preview/edit/reset, explicit sending/result states. [Validation tests](../../tests/enquiry.test.cjs). | Sending requires an authenticated user with confirmed email. Drafts are local. |
| [enquiryApi.ts](../../src/features/enquiries/enquiryApi.ts) | Revalidates the draft, checks server-returned user ID and confirmed email, inserts only four editable columns, sanitises errors; no automatic retry. [Submission tests](../../tests/enquirySubmission.test.cjs) use injected mocks. | Live INSERT is enabled, but no test record was created or live save verified. Database owns user_id/status/ID/timestamps. Saving does not send email or promise a reply. |
| [AssetDetailsModal.tsx](../../src/features/properties/AssetDetailsModal.tsx), [PublicNavbar.tsx](../../src/components/ui/PublicNavbar.tsx) | Native dialog lifecycle, focus containment/return, Escape, background scroll lock and responsive menu semantics. | Chrome checks are not accessibility certification. |
| [App.tsx](../../src/App.tsx), [HeroSection.tsx](../../src/components/landing/HeroSection.tsx), [vite.config.ts](../../vite.config.ts) | Lazy routes, responsive hero sources/reserved geometry, automatic chunk splitting, reduced-motion support. | Historical Lighthouse scores do not describe every subsequent revision. |

## Diagrams

- [Application architecture](diagrams/application-architecture.svg) · [editable source](diagrams/application-architecture.mmd)
- [Property data flow](diagrams/property-data-flow.svg) · [editable source](diagrams/property-data-flow.mmd)
- [User interaction flow](diagrams/user-interaction-flow.svg) · [editable source](diagrams/user-interaction-flow.mmd)

## Verification and reproduction

Run the lint, two TypeScript checks, 36 Node regression tests and build commands in the [README](../../README.md). Node tests and intercepted Chrome authentication responses verify application behaviour, not live database isolation. Automated browser checks use isolated temporary tooling outside the repository and create no records. Separately, the owner used the two approved temporary accounts in Arc for guided real authentication checks. Performance evidence is documented separately in [PERFORMANCE.md](PERFORMANCE.md); existing genuine reports are preserved.

Only fictional data is used in automated flows. API documentation is example content, KYC is simulated and acquisition/document actions are unavailable. Owner SQL confirmed both approved accounts have confirmed emails and matching profiles. Cross-user isolation still requires the outstanding read-only SQL results; no live enquiry test record has been created. Production callback URLs, deployed SPA routing, hosting security/privacy and asset permissions require release review.

## Real authentication verification boundary

- **Guided Arc results:** both approved accounts passed login, dashboard session restoration, logout and denial of direct dashboard access after logout. Account B also restored after closing/reopening its tab.
- **Confirmation:** B’s signup displayed “Check your email”, its email arrived, sign-in before confirmation was denied, and its confirmation callback opened the local dashboard with the correct account. A’s earlier email arrived; its original callback connection error was not individually retested.
- **Owner SQL results:** exactly one account per approved name; both `email_confirmed`, `profile_created` and `profile_name_matches` were true. This confirms matching profiles after registration, not comprehensive trigger-function security or cross-user access controls.
- **Still outstanding:** profile-read isolation SQL results; direct cross-user API/write-isolation verification; an approved live enquiry-save test; production environment/redirect settings and deployed/remote-user checks. Zero returned enquiry rows cannot demonstrate enquiry isolation when no test enquiries exist.

Real-account outcomes are owner-reported observations and SQL results, distinct from automated mocked tests. Local testing used `http://127.0.0.1:4174/auth/callback` on the computer running the application. No passwords or confirmation links were collected. No database policies were changed or enquiry records created.
