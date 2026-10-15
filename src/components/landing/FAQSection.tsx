import { useState, useId } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Can I purchase a property through Aurelia?",
    answer: "No. You can browse the four example listings and review their details, but the website does not process purchases or arrange escrow."
  },
  {
    question: "What does the compliance preview validate?",
    answer: "It checks that the required form details have been entered and shows an example review. It does not verify identities, documents or funds, or carry out anti-money laundering checks. Use fictional details and sample files only."
  },
  {
    question: "Are the analytics based on live market data?",
    answer: "No. Market figures are illustrative. Portfolio totals are calculated from the four listings, and cash flow uses the assumptions shown alongside each chart."
  },
  {
    question: "Is an API available for integration?",
    answer: "The API page contains proposed request and response examples. An API service is not currently available."
  },
  {
    question: "How does account access work?",
    answer: "Register with your name and email address, confirm your email, then sign in. Your session can be restored when you return in the same browser. Email confirmation does not verify investor eligibility or identity, and no confidentiality agreement is enforced."
  }
];

// Stays mounted so the CSS grid-rows transition can open and close it; inert while closed.
function FAQAnswer({ id, labelledBy, open, answer }: {
  id: string;
  labelledBy: string;
  open: boolean;
  answer: string;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={!open}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="px-1 pb-6 text-slate-light text-sm leading-relaxed">{answer}</div>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionId = useId();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-background relative border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        <div className="mb-10 lg:mb-0">
          <h2 className="font-display text-4xl sm:text-5xl font-normal text-ink tracking-tight mb-5">Frequently asked questions</h2>
          <p className="text-slate-light text-sm leading-relaxed max-w-sm">Answers about listings, financial scenarios and portal access.</p>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border-b border-border/70 bg-transparent overflow-hidden transition-colors ${openIndex === idx ? 'border-primary/50' : 'hover:border-primary/30'}`}
            >
              <button 
                type="button"
                id={`${accordionId}-button-${idx}`}
                aria-expanded={openIndex === idx}
                aria-controls={`${accordionId}-panel-${idx}`}
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between py-6 px-1 text-left focus:outline-none"
              >
                <span className="text-base font-medium text-ink">{faq.question}</span>
                <span className="ml-6 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-transparent text-primary">
                  {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <FAQAnswer
                id={`${accordionId}-panel-${idx}`}
                labelledBy={`${accordionId}-button-${idx}`}
                open={openIndex === idx}
                answer={faq.answer}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
