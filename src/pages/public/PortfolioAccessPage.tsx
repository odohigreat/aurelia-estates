import { BarChart3, Link2, MailCheck, MessageSquareText, SlidersHorizontal, UserPlus, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';

const MARKETS = [
  { city: "London", country: "United Kingdom", properties: 42, volume: "$1.2B" },
  { city: "Dubai", country: "UAE", properties: 65, volume: "$2.4B" },
  { city: "New York", country: "United States", properties: 38, volume: "$1.8B" },
  { city: "Monaco", country: "Monaco", properties: 12, volume: "$950M" }
];

const INCLUDED = [
  { Icon: SlidersHorizontal, title: 'Precise filters', text: 'Combine search with tier, country, currency and minimum bedrooms. Every filter narrows the same collection; nothing is promoted or hidden.' },
  { Icon: Link2, title: 'Shareable selections', text: 'Your filters are kept in the page address, so a narrowed view can be bookmarked, reloaded or sent to an adviser exactly as you left it.' },
  { Icon: BarChart3, title: 'Figures per currency', text: 'Listed values are totalled separately in USD, EUR and CHF, with a simple average cap rate. No exchange-rate conversion is applied.' },
  { Icon: MessageSquareText, title: 'Saved enquiries', text: 'Preview an enquiry for any residence, then save it to your account once you are signed in with a confirmed email address.' },
];

const STEPS = [
  { Icon: UserPlus, title: 'Create an account', text: 'Register with your name, email address and a password of at least eight characters.' },
  { Icon: MailCheck, title: 'Confirm your email', text: 'Open the confirmation link in the same browser you registered with. It can be requested again if it expires.' },
  { Icon: LogIn, title: 'Open the portal', text: 'Sign in to browse and filter the collection. Your session is restored when you return in the same browser.' },
];

export default function PortfolioAccessPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Portfolio Access"
        subtitle="A private view of the collection, with precise filters, per-currency figures and a saved record of your enquiries."
      />

      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <SectionHeading eyebrow="The portal" title="Everything you need to compare, in one view">
          <p>
            The public site lets anyone browse each residence. The portal is where the collection becomes a working tool: narrow it down, compare listed values without blending currencies, open any property in a focused view and keep a record of the enquiries you send.
          </p>
          <p>
            Access does not include identity or proof-of-funds checks, confidentiality agreements or investment allocation, and the listings remain illustrative.
          </p>
        </SectionHeading>
        <figure className="rounded-2xl overflow-hidden border border-border/70">
          <EditorialImage photo="estate" ratio={4 / 3} sizes="(min-width: 1024px) 560px, 100vw" alt="Contemporary residence with landscaped grounds" />
        </figure>
      </section>

      <section aria-labelledby="included-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="included-title" eyebrow="What is included" title="Built for careful comparison" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INCLUDED.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border/80 bg-white p-6">
                <Icon aria-hidden="true" className="w-6 h-6 text-accent mb-5" />
                <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
                <p className="text-sm leading-[1.8] text-slate-light">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <SectionHeading id="steps-title" eyebrow="Getting started" title="Three steps to the portal" />
        <ol className="grid md:grid-cols-3 gap-5">
          {STEPS.map(({ Icon, title, text }, index) => (
            <li key={title} className="rounded-xl border border-border/80 bg-white p-6">
              <div className="flex items-center justify-between mb-5">
                <span className="text-primary text-xs tracking-[0.2em]">0{index + 1}</span>
                <Icon aria-hidden="true" className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
              <p className="text-sm leading-[1.8] text-slate-light">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <h2 className="font-display text-3xl font-normal text-ink mb-3 border-b border-border/50 pb-4">Illustrative regional overview</h2>
        <p className="text-slate-light text-sm leading-[1.8] max-w-2xl mb-8">
          The regional figures below are illustrative and separate from the portal listings. They do not represent available properties or completed transactions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {MARKETS.map((market, idx) => (
            <Card key={idx} className="bg-white border-border group">
              <CardContent className="p-6">
                <p className="text-slate-muted text-[10px] uppercase tracking-[0.16em] font-medium mb-2">{market.country}</p>
                <h3 className="font-display text-2xl font-normal text-ink mb-6 group-hover:text-primary transition-colors">{market.city}</h3>
                <div className="space-y-2 border-t border-border/50 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Example property count</span>
                    <span className="text-ink font-medium">{market.properties}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-muted">Illustrative value</span>
                    <span className="text-ink font-medium">{market.volume}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <EditorialImage photo="alpine" ratio={21 / 9} sizes="(min-width: 1152px) 1152px, 100vw" alt="" className="absolute inset-0 h-full" />
          <div className="absolute inset-0 bg-[#102536]/75" />
          <div className="relative p-8 md:p-12 text-center text-white">
            <h2 className="font-display text-3xl sm:text-4xl font-normal mb-4">Explore the listings</h2>
            <p className="text-white/85 mb-8 max-w-2xl mx-auto leading-[1.8]">
              Create an account or sign in to browse the full collection with filters and saved enquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login" className="inline-flex items-center justify-center h-12 px-8 font-medium rounded-md bg-white text-ink transition-colors hover:bg-[#f5e5c6]">Open portal</Link>
              <Link to="/signup" className="inline-flex items-center justify-center h-12 px-8 font-medium rounded-md border border-white/60 text-white transition-colors hover:bg-white/10">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
