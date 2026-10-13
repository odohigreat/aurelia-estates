import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TICKER_DATA = [
  { symbol: 'LND-PRM', price: '£3,450/sqft', change: '+2.4%', up: true },
  { symbol: 'NY-PH', price: '$4,100/sqft', change: '-0.8%', up: false },
  { symbol: 'DXB-VIL', price: 'AED 8,200/sqft', change: '+5.1%', up: true },
  { symbol: 'MCO-APT', price: '€65,000/sqm', change: '0.0%', up: null },
  { symbol: 'SGP-GDB', price: 'S$4,800/sqft', change: '+1.2%', up: true },
  { symbol: 'LDN-MAY', price: '£4,200/sqft', change: '+1.8%', up: true },
];

export function MarketTicker() {
  const reducedMotion = useReducedMotion();
  return (
    <div className={`w-full bg-surface-hover border-y border-border/50 py-2 overflow-hidden flex items-center ${reducedMotion ? 'flex-col gap-3' : ''}`}>
      <div className="flex-shrink-0 px-4 border-r border-border/50 text-xs font-bold text-slate-muted uppercase tracking-widest z-10 bg-surface-hover">
        Illustrative market figures
      </div>
      <div className={reducedMotion ? 'w-full' : 'flex-grow overflow-hidden relative w-full h-6'}>
        <motion.div 
          className={reducedMotion ? 'flex flex-wrap justify-center gap-y-3' : 'flex whitespace-nowrap absolute left-0'}
          animate={{ x: reducedMotion ? 0 : [0, -1000] }}
          transition={reducedMotion ? { duration: 0 } : { repeat: Infinity, ease: 'linear', duration: 20 }}
        >
          {/* Duplicate array for seamless infinite scroll */}
          {(reducedMotion ? TICKER_DATA : [...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA]).map((item, idx) => (
            <div key={idx} aria-hidden={idx >= TICKER_DATA.length} className={`flex items-center px-8 text-sm ${reducedMotion ? 'flex-wrap gap-x-3' : 'space-x-3'}`}>
              <span className="font-bold text-ink">{item.symbol}</span>
              <span className="text-slate-700">{item.price}</span>
              <span className={`flex items-center ${item.up === true ? 'text-emerald-700' : item.up === false ? 'text-rose-700' : 'text-slate-muted'}`}>
                {item.up === true ? <TrendingUp className="w-3 h-3 mr-1" /> : item.up === false ? <TrendingDown className="w-3 h-3 mr-1" /> : <Minus className="w-3 h-3 mr-1" />}
                {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
