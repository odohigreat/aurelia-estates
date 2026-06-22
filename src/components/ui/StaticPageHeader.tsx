import { motion } from 'framer-motion';

interface StaticPageHeaderProps {
  title: string;
  subtitle: string;
}

export function StaticPageHeader({ title, subtitle }: StaticPageHeaderProps) {
  return (
    <div className="relative w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-background border-b border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{title}</h1>
        <p className="text-xl text-slate-muted font-light max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>
    </div>
  );
}
