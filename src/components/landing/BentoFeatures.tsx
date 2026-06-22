import { motion, type Variants } from 'framer-motion';
import { ShieldCheck, Activity, Globe, MapPin, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function BentoFeatures() {
  const scrollVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="py-24 bg-surface relative" id="features">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Institutional Intelligence</h2>
          <p className="text-slate-light mt-4 text-xl max-w-2xl mx-auto font-light">A bespoke ecosystem built for high-net-worth acquisitions and frictionless transactions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* Box 1: Large Analytics */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariant}
            className="md:col-span-2 md:row-span-2"
          >
            <Card className="h-full overflow-hidden group hover:border-primary/50 transition-colors bg-gradient-to-br from-surface to-background">
              <CardContent className="p-10 h-full flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Activity className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Predictive Analytics</h3>
                <p className="text-slate-muted text-lg max-w-md">
                  Utilize our proprietary 10-year market appreciation models. We analyze macroeconomic data, local zoning shifts, and cap rate velocity.
                </p>
                <div className="mt-auto relative h-32 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  {/* Abstract Chart Representation */}
                  <div className="flex items-end h-full w-full space-x-2 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                    {[30, 45, 25, 60, 40, 75, 55, 90].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Box 2: Global Portfolio */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariant}
            className="md:col-span-1 md:row-span-1"
          >
            <Card className="h-full overflow-hidden group hover:border-primary/50 transition-colors">
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <Globe className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Global Access</h3>
                <p className="text-slate-muted text-sm">
                  Exclusive off-market inventory across London, New York, Dubai, and Monaco.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Box 3: Compliance */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollVariant}
            className="md:col-span-1 md:row-span-1"
          >
            <Card className="h-full overflow-hidden group hover:border-emerald-500/50 transition-colors relative">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 h-full flex flex-col justify-center">
                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Instant KYC</h3>
                <p className="text-slate-muted text-sm">
                  Encrypted compliance workflows clearing you for institutional transactions instantly.
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
