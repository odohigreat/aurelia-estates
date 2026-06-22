import { motion } from 'framer-motion';
import { UserCheck, Search, Key } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      id: '01',
      title: 'Institutional KYC Verification',
      description: 'Upload your proof of funds and identity securely. Our 256-bit encrypted flow approves High-Net-Worth profiles within 24 hours.',
      icon: UserCheck
    },
    {
      id: '02',
      title: 'Proprietary Asset Discovery',
      description: 'Once cleared, access our restricted portfolio. Filter by predictive cap rates, geospatial zoning, and multi-year appreciation forecasts.',
      icon: Search
    },
    {
      id: '03',
      title: 'Frictionless Acquisition',
      description: 'Execute acquisitions digitally through our escrow network. Track portfolio performance and compounding wealth in real-time.',
      icon: Key
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">The Acquisition Lifecycle</h2>
        </div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col md:flex-row items-center justify-between relative ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'} mb-8 md:mb-0 pl-24 md:pl-0 relative`}>
                    <div className="md:hidden absolute left-0 top-0 w-20 h-20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background font-bold text-xl">
                        {step.id}
                      </div>
                    </div>
                    <span className="text-primary font-mono text-sm tracking-widest uppercase hidden md:block mb-2">Step {step.id}</span>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-slate-muted leading-relaxed">{step.description}</p>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-surface border-4 border-background flex items-center justify-center shadow-[0_0_0_2px_rgba(42,43,48,1)] z-10 hidden md:flex">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="w-full md:w-5/12 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
