import { motion } from 'framer-motion';

interface StaticPageHeaderProps {
  title: string;
  subtitle: string;
}

export function StaticPageHeader({ title, subtitle }: StaticPageHeaderProps) {
  return (
    <div className="relative w-full py-12 sm:py-16 md:py-20 flex flex-col items-center justify-center overflow-hidden bg-[#fafaf8] border-b border-border/70">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 text-center space-y-4"
      >
        <div aria-hidden="true" className="w-10 h-px bg-accent mx-auto mb-6" />
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">{title}</h1>
        <p className="text-sm sm:text-base leading-[1.8] text-slate-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>
    </div>
  );
}
