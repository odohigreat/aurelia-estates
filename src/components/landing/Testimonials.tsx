import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "Property details and example financial figures are easy to review together.",
    author: "Example reader 1",
    role: "Illustrative investment perspective",
  },
  {
    quote: "The listings are straightforward to browse and compare.",
    author: "Example reader 2",
    role: "Illustrative property perspective",
  },
  {
    quote: "The collection makes it easy to explore properties in different locations.",
    author: "Example reader 3",
    role: "Illustrative browsing perspective",
  }
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-surface border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-left mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-ink tracking-tight">Illustrative perspectives</h2>
          <p className="mt-4 text-slate-muted">These quotations are fictional examples, not customer endorsements.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <blockquote className="h-full border-t border-primary/40">
                <div className="pt-7 flex flex-col h-full">
                  <p className="font-display text-2xl leading-relaxed text-gray-800 mb-8 flex-grow">"{t.quote}"</p>
                  <div>
                    <p className="text-ink text-sm font-medium">{t.author}</p>
                    <p className="text-slate-muted text-xs mt-1">{t.role}</p>
                  </div>
                </div>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
