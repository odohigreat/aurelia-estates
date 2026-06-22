import { motion } from 'framer-motion';

const PARTNERS = [
  'Oakhaven Capital',
  'Crestview Partners',
  'Aether Holdings',
  'Vanguard Real Estate',
  'Summit Institutional',
  'Equinox Ventures'
];

export function SocialProof() {
  return (
    <section className="py-12 border-y border-border/50 bg-background overflow-hidden relative">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-muted font-semibold">
          Trusted by Top Tier Institutional Investors
        </p>
      </div>

      <div className="flex w-[200%]">
        <motion.div 
          className="flex space-x-16 px-8 items-center"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={index} 
              className="text-2xl font-bold text-slate-muted/40 hover:text-slate-muted/80 transition-colors whitespace-nowrap"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
