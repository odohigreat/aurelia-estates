import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "What is the minimum transaction threshold on Aurelia Estates?",
    answer: "Our platform exclusively curates institutional-grade assets. The minimum off-market transaction volume begins at $25,000,000 USD, though bespoke syndication opportunities may have lower entry thresholds for verified family offices."
  },
  {
    question: "How long does the KYC clearance process take?",
    answer: "For standard institutional entities, our automated 256-bit encrypted KYC pipeline clears preliminary checks within 2 hours. Final human review and compliance sign-off typically concludes within T+24 hours."
  },
  {
    question: "Is the predictive analytics data real-time?",
    answer: "Yes. Our models ingest petabytes of macroeconomic data, zoning legislation shifts, and yield compressions daily. Capitalization rate forecasts are recalculated dynamically, ensuring you always have the most current intelligence before acquisition."
  },
  {
    question: "Can I access the API for my proprietary dashboards?",
    answer: "Absolutely. Verified institutional accounts are granted API keys with a rate limit of 1,000 requests per minute. This allows you to pull live off-market inventory and cap rate models directly into your internal systems."
  },
  {
    question: "Are the property addresses made public?",
    answer: "Never. Absolute discretion is our core philosophy. Specific asset addresses, financial dossiers, and legal due diligence packages are only unlocked after an NDA is signed and proof of funds is verified."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background relative border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-muted text-lg max-w-2xl mx-auto">Institutional clarity on our processes, compliance, and acquisitions.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border border-border/50 rounded-xl bg-surface overflow-hidden transition-colors ${openIndex === idx ? 'border-primary/50' : 'hover:border-primary/30'}`}
            >
              <button 
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-white">{faq.question}</span>
                <span className="ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-slate-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
