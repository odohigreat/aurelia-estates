import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video or Parallax Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2500&q=80"
          alt="Ultra Luxury Estate"
          className="w-full h-full object-cover opacity-[0.15] scale-105 animate-[slide-up_30s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      {/* Decorative Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs uppercase tracking-widest font-semibold mb-4">
              Institutional Grade Platform
            </span>
          </motion.div> */}

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl leading-[1.1]">
            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#e8c558] to-primary">Ultra-Luxury</span> <br />Real Estate Wealth
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-light max-w-3xl mx-auto font-light leading-relaxed">
            Gain exclusive access to off-market global assets. Leverage proprietary predictive valuation algorithms and seamless KYC compliance.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/login">
              <Button size="lg" className="h-14 px-10 text-lg font-semibold rounded-md shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-shadow">
                Request Exclusive Access
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold rounded-md shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-shadow">
                Sign In to Portal
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
