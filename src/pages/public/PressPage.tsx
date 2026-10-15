import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { EditorialImage, type EditorialPhoto } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';

const ARTICLES: { date: string; title: string; source: string; excerpt: string; photo: EditorialPhoto; alt: string }[] = [
  {
    date: '12 October 2026',
    title: 'Introducing the Aurelia property collection',
    source: 'Example editorial',
    excerpt: 'How a deliberately small collection, from a Manhattan penthouse to a St. Moritz chalet, lets each residence be read in full.',
    photo: 'estate',
    alt: 'Contemporary residence with landscaped grounds',
  },
  {
    date: '4 August 2026',
    title: 'Understanding illustrative property figures',
    source: 'Example feature',
    excerpt: 'Why Aurelia shows totals per currency, explains its cash-flow assumptions and never presents a scenario as a forecast.',
    photo: 'modern',
    alt: 'Modern residence with floor-to-ceiling glazing',
  },
  {
    date: '22 May 2026',
    title: 'A guide to the identity review preview',
    source: 'Example article',
    excerpt: 'A walk through the review steps a prime-property buyer can expect, and what the current preview does not do.',
    photo: 'alpine',
    alt: 'Alpine chalet surrounded by snow',
  },
  {
    date: '15 January 2026',
    title: 'Exploring the property portfolio',
    source: 'Example article',
    excerpt: 'Search, filter and share: how URL-backed filters make a narrowed selection easy to bookmark or send to an adviser.',
    photo: 'poolside',
    alt: 'Modern white residence with glazed walls and a pool',
  },
];

const PALETTE = [
  { name: 'Ink', value: '#172635', use: 'Headlines and body text', light: false },
  { name: 'Navy', value: '#1b2938', use: 'Primary controls', light: false },
  { name: 'Aurelia gold', value: '#8b7042', use: 'Accents and the mark', light: false },
  { name: 'Champagne', value: '#f5e5c6', use: 'Highlights on dark imagery', light: true },
  { name: 'Surface', value: '#f7f8fa', use: 'Quiet section backgrounds', light: true },
];

function Mark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L2 22h20L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path d="M12 10L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      <path d="M12 10l6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function Wordmark({ dark }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <Mark className="w-12 h-12 text-accent" />
      <span className={`flex flex-col ${dark ? 'text-white' : 'text-ink'}`}>
        <span className="font-display uppercase tracking-[0.14em] leading-none text-3xl">Aurelia</span>
        <span className={`text-[10px] uppercase tracking-[0.38em] mt-2 ${dark ? 'text-[#f5e5c6]' : 'text-accent'}`}>Estates</span>
      </span>
    </div>
  );
}

export default function PressPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Press and media"
        subtitle="Background on Aurelia Estates, its visual identity and example coverage. The articles and dates below are illustrative and do not represent published coverage or independent endorsements."
      />

      <section aria-labelledby="brief-title" className="max-w-3xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <SectionHeading id="brief-title" eyebrow="In brief" title="About Aurelia Estates">
          <p>
            Aurelia Estates is an online collection of international residences, presented with the detail and context that considered decisions require. Each property has its own shareable page with its setting, proportions, listed value in its own currency and an illustrative five-year cash flow whose assumptions are stated beside the chart.
          </p>
          <p>
            Visitors can browse the collection freely. Registered users with confirmed email addresses can filter the full collection in the portal and save property enquiries to their account. Aurelia does not currently provide identity verification, financial services or property transactions.
          </p>
        </SectionHeading>
      </section>

      <section aria-labelledby="coverage-title" className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16">
        <SectionHeading id="coverage-title" eyebrow="Illustrative" title="Example coverage" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map(article => (
            <article key={article.title} className="rounded-2xl overflow-hidden border border-border/80 bg-white">
              <EditorialImage photo={article.photo} ratio={16 / 9} sizes="(min-width: 768px) 560px, 100vw" alt={article.alt} />
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-3 text-xs">
                  <span className="text-accent font-medium tracking-[0.16em] uppercase">{article.source}</span>
                  <span className="text-slate-muted">{article.date}</span>
                </div>
                <h3 className="font-display text-2xl font-normal text-ink">{article.title}</h3>
                <p className="mt-3 text-sm leading-[1.8] text-slate-light">{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="identity-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="identity-title" eyebrow="Visual identity" title="The Aurelia mark, colour and type">
            <p>
              The mark is an architectural triangle, a roofline and a compass point in one. Its intersecting inner lines suggest structure and a measured approach. It is always drawn in Aurelia gold with a square line end, and is never filled, outlined or rotated.
            </p>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-border/80 bg-white p-10 flex items-center justify-center min-h-[180px]"><Wordmark /></div>
            <div className="rounded-2xl bg-primary p-10 flex items-center justify-center min-h-[180px]"><Wordmark dark /></div>
          </div>

          <h3 className="mt-12 mb-5 text-lg font-medium text-ink">Colour palette</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PALETTE.map(colour => (
              <li key={colour.name} className="rounded-xl overflow-hidden border border-border/80 bg-white">
                <div className={`h-20 ${colour.light ? 'border-b border-border/80' : ''}`} style={{ backgroundColor: colour.value }} />
                <div className="p-4">
                  <p className="text-sm font-medium text-ink">{colour.name}</p>
                  <p className="text-xs font-mono text-slate-muted mt-1">{colour.value}</p>
                  <p className="text-xs text-slate-light mt-2 leading-relaxed">{colour.use}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 mb-5 text-lg font-medium text-ink">Typography</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border border-border/80 bg-white p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-muted mb-4">Display · Georgia</p>
              <p className="font-display text-4xl text-ink leading-tight">Properties of distinction.</p>
              <p className="mt-4 text-sm text-slate-light leading-relaxed">A classic serif for headlines and property names, set in regular weight with generous space.</p>
            </div>
            <div className="rounded-xl border border-border/80 bg-white p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-muted mb-4">Text · Stack Sans Notch</p>
              <p className="text-2xl text-ink leading-snug">Details that matter.</p>
              <p className="mt-4 text-sm text-slate-light leading-relaxed">A clean sans-serif for interface text, figures and captions, with small uppercase labels widely spaced.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 sm:px-8 mt-14 sm:mt-16 text-center">
        <p className="text-slate-muted mb-3">A verified press contact and downloadable press kit are not currently available.</p>
        <p className="text-primary font-medium text-lg">press@aurelia.example · Example address only</p>
      </section>
    </div>
  );
}
