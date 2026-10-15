import { Feather, Globe2, Scale, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StaticPageHeader } from '../../components/ui/StaticPageHeader';
import { EditorialImage } from '../../components/ui/EditorialImage';
import { SectionHeading } from '../../components/ui/ContentBlocks';

const VALUES = [
  { Icon: Feather, title: 'Craft over volume', text: 'We would rather present four residences beautifully than four hundred carelessly. The same applies to code, copy and analysis.' },
  { Icon: Scale, title: 'Precision with numbers', text: 'Every figure we publish should be explainable in a sentence. If an assumption cannot be stated plainly, it does not belong on the page.' },
  { Icon: Globe2, title: 'An international eye', text: 'The collection spans continents and currencies, and so do the people it is built for. We design for that from the start, never as an afterthought.' },
  { Icon: Sparkles, title: 'Quiet confidence', text: 'Good service in prime property is calm and discreet. We avoid hype, urgency tactics and exaggerated claims.' },
];

const ROLES = [
  { title: 'Lead Quantitative Analyst', location: 'London / Hybrid', type: 'Full-time', summary: 'Would shape how scenarios, cap rates and currency-separated totals are modelled and explained, with a focus on transparent assumptions.' },
  { title: 'Head of Global Compliance (KYC/AML)', location: 'Singapore', type: 'Full-time', summary: 'Would design a genuine identity and source-of-funds review process to replace today’s illustrative preview.' },
  { title: 'Senior React Developer', location: 'New York / Remote', type: 'Full-time', summary: 'Would build fast, accessible interfaces in React and TypeScript, from URL-driven filters to keyboard-friendly dialogs.' },
  { title: 'Director of Ultra-Luxury Acquisitions', location: 'Dubai', type: 'Full-time', summary: 'Would source and present residences of distinction, ensuring every listing is accurate, well documented and properly verified.' },
];

export default function CareersPage() {
  return (
    <div className="pb-16 sm:pb-20">
      <StaticPageHeader
        title="Careers"
        subtitle="There are no active vacancies at present. This page explains how we work and the kind of people we hope to work with."
      />

      <section className="max-w-6xl mx-auto px-6 sm:px-8 mt-12 sm:mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <figure className="rounded-2xl overflow-hidden border border-border/70 order-2 lg:order-1">
          <EditorialImage photo="modern" ratio={4 / 3} sizes="(min-width: 1024px) 560px, 100vw" alt="Light-filled contemporary residence with an open terrace" />
        </figure>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow="Working at Aurelia" title="Small team, high standards">
            <p>
              Aurelia sits where property, finance and technology meet. The work asks for an unusual mix: an appreciation of architecture and place, comfort with numbers, and the patience to build software that feels effortless.
            </p>
            <p>
              We value people who explain rather than impress, who check their figures twice, and who treat the privacy of the people we serve as a responsibility rather than a feature.
            </p>
          </SectionHeading>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-surface border-y border-border/60 mt-16 sm:mt-20 py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <SectionHeading id="values-title" eyebrow="What we look for" title="The values we hire for" align="center" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-border/80 bg-white p-6">
                <Icon aria-hidden="true" className="w-6 h-6 text-accent mb-5" />
                <h3 className="text-lg font-medium text-ink mb-2">{title}</h3>
                <p className="text-sm leading-[1.8] text-slate-light">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="max-w-4xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
        <SectionHeading id="roles-title" eyebrow="Illustrative" title="Example roles">
          <p>The roles below are illustrative examples, not current vacancies. Applications cannot be submitted through this website.</p>
        </SectionHeading>
        <div className="space-y-4">
          {ROLES.map(role => (
            <article key={role.title} className="p-6 bg-white border border-border/80 rounded-xl">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-medium text-ink mb-2">{role.title}</h3>
                  <p className="flex flex-wrap gap-x-3 text-sm text-slate-muted"><span>{role.location}</span><span aria-hidden="true">•</span><span>{role.type}</span><span aria-hidden="true">•</span><span>Example only</span></p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-[1.8] text-slate-light">{role.summary}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-muted">
          Interested in Aurelia’s approach? The <Link to="/contact" className="text-primary underline underline-offset-4">contact page</Link> explains which enquiry channels are currently available.
        </p>
      </section>
    </div>
  );
}
