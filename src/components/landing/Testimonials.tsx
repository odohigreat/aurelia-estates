import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';

const TESTIMONIALS = [
  {
    quote: "Aurelia Estates provides unparalleled access to off-market inventory that simply isn't available anywhere else. The predictive analytics have fundamentally shifted our acquisition strategy.",
    author: "Jonathan Mercer",
    role: "Managing Director, Oakhaven Capital",
  },
  {
    quote: "The seamless integration of institutional-grade compliance and frictionless transactions makes this the definitive platform for ultra-luxury wealth preservation.",
    author: "Eleanor Vance",
    role: "Principal, Vance Family Office",
  },
  {
    quote: "Precision data, absolute discretion, and a portfolio that commands respect. Aurelia is the future of real estate syndication.",
    author: "Arthur Sterling",
    role: "CEO, Sterling Global Assets",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Voices of Authority</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card className="h-full bg-background border-border/50">
                <CardContent className="p-8 flex flex-col h-full">
                  <p className="text-slate-light italic mb-8 flex-grow">"{t.quote}"</p>
                  <div>
                    <p className="text-white font-bold">{t.author}</p>
                    <p className="text-primary text-sm">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
