import { Compass, Eye, Landmark, LockKeyhole } from 'lucide-react';
import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { CallToAction, SectionHeading } from '../../components/ui/ContentBlocks';

const PRINCIPLES = [
  {
    Icon: Eye,
    title: 'Clarity before conviction',
    text: 'A residence should be understood before it is admired. Every listing leads with the facts that matter: location, size, tier, listed value and currency, and only then the story.',
  },
  {
    Icon: Landmark,
    title: 'Figures that show their working',
    text: 'Where we present a financial scenario, we state the assumptions beside it. Cash-flow examples explain how revenue and expenses are calculated, so nothing is mistaken for a promise or a prediction.',
  },
  {
    Icon: Compass,
    title: 'Place is the asset',
    text: 'A penthouse above Manhattan, a villa on the shore of Lake Como and a chalet in St. Moritz are not interchangeable. We present each property in the context of where it stands and how it is lived in.',
  },
  {
    Icon: LockKeyhole,
    title: 'Discretion by design',
    text: 'We ask for as little as possible. Registration needs a name, an email address and a password; optional fields that are not needed are not saved, and enquiries are kept against your own account.',
  },
];

const OFFICES = [
  { city: 'London', region: 'Illustrative European location', address: '1 Mayfair Place, W1J 8AJ' },
  { city: 'New York', region: 'Illustrative North American location', address: 'One World Trade Center, NY 10007' },
  { city: 'Singapore', region: 'Illustrative Asia-Pacific location', address: 'Marina Bay Financial Centre' },
];

export default function AboutPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="About Aurelia"
        subtitle="A considered way to discover international residences, with the detail and context that serious decisions deserve."
      />

      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="text-base text-slate-light leading-[1.9] space-y-5">
          <p className="text-[11px] uppercase tracking-[0.24em] text-accent font-medium">Our perspective</p>
          <p className="font-display text-2xl sm:text-3xl leading-snug text-ink">
            Exceptional property is rarely found in a crowded listing feed. It is found through patience, context and a clear view of the numbers.
          </p>
          <p>
            Aurelia Estates brings property browsing, listing details and illustrative financial scenarios together in one quiet, uncluttered place. Instead of endless results, the collection is deliberately small. Each residence has room to be read properly: its setting, its proportions, its listed value in its own currency, and what an illustrative five-year cash flow could look like.
          </p>
          <p>
            We built Aurelia for people who prefer to understand before they enquire. Filters are precise rather than promotional, figures are labelled for what they are, and every property has a shareable page that can be revisited, forwarded or discussed with advisers.
          </p>
        </div>
        <figure className="rounded-2xl overflow-hidden border border-border/70 shadow-[0_12px_40px_-20px_rgba(23,38,53,0.35)]">
          <EditorialImage photo="poolside" ratio={4 / 5} sizes="(min-width: 1024px) 560px, 100vw" alt="Modern white residence with floor-to-ceiling glazing beside a pool" />
          <figcaption className="px-5 py-3 text-xs text-slate-muted bg-white">Illustrative imagery from the current example collection.</figcaption>
        </figure>
      </section>

      <section aria-labelledby="principles-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="principles-title" eyebrow="What guides us" title="Four principles behind every page">
            <p>They shape how listings are written, how numbers are shown and how little we ask of the people who use Aurelia.</p>
          </SectionHeading>
          <div className="grid sm:grid-cols-2 gap-5">
            {PRINCIPLES.map(({ Icon, title, text }) => (
              <Card key={title} className="bg-white">
                <CardContent className="p-6 sm:p-8">
                  <Icon aria-hidden="true" className="w-6 h-6 text-accent mb-5" />
                  <h3 className="font-display text-2xl font-normal text-ink mb-3">{title}</h3>
                  <p className="text-sm leading-[1.8] text-slate-light">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="collection-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
        <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
          <EditorialImage photo="modern" ratio={3 / 4} sizes="(min-width: 1024px) 300px, 50vw" alt="Contemporary residence with clean lines and a pool" className="rounded-xl" />
          <EditorialImage photo="alpine" ratio={3 / 4} sizes="(min-width: 1024px) 300px, 50vw" alt="Timber chalet set against snow-covered mountains" className="rounded-xl mt-10" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading id="collection-title" eyebrow="The collection" title="Fewer residences, told in full">
            <p>
              The collection spans city, lakeside, hillside and alpine settings, priced in US dollars, euros and Swiss francs. Totals are always shown per currency; we never blend them into a single converted figure that hides exchange-rate assumptions.
            </p>
            <p>
              Each listing is grouped into one of three tiers (Premium, Luxury and Ultra-Luxury) so the collection can be narrowed quickly by search, country, currency and minimum bedrooms. Your filters live in the address bar, so a carefully narrowed view can be bookmarked or shared exactly as you left it.
            </p>
          </SectionHeading>
        </div>
      </section>

      <section aria-labelledby="scope-title" className="max-w-3xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <SectionHeading id="scope-title" eyebrow="Honest scope" title="What Aurelia is, and is not">
          <p>
            The current collection contains example listings, and its images and financial figures are illustrative. Account access uses email and password authentication with email confirmation. Property enquiries can be saved by signed-in users with confirmed email addresses.
          </p>
          <p>
            Identity checks, financial services and property transactions are not available. We would rather state that plainly than imply services that do not exist.
          </p>
        </SectionHeading>
      </section>

      <section aria-labelledby="offices-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <h2 id="offices-title" className="font-display text-3xl font-normal text-ink mb-3 text-center">Example office locations</h2>
        <p className="text-sm text-slate-muted text-center mb-8">These locations are illustrative and are not verified offices.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {OFFICES.map(office => (
            <Card key={office.city} className="bg-surface">
              <CardContent className="p-6 sm:p-8 text-left">
                <h3 className="font-display text-2xl font-normal text-ink mb-4">{office.city}</h3>
                <p className="text-slate-muted">{office.region}</p>
                <p className="text-sm text-slate-muted mt-4">{office.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CallToAction title="See the collection for yourself" to="/#residences" label="Explore properties">
        Browse each residence, compare its details and review its illustrative cash flow, with no account needed to look.
      </CallToAction>
    </div>
  );
}
