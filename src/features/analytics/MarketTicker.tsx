import { motion } from 'framer-motion';
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
  return (
    <div className="w-full bg-surface-hover border-y border-border/50 py-2 overflow-hidden flex items-center">
      <div className="flex-shrink-0 px-4 border-r border-border/50 text-xs font-bold text-slate-muted uppercase tracking-widest z-10 bg-surface-hover">
        Live Market Data
      </div>
      <div className="flex-grow overflow-hidden relative w-full h-6">
        <motion.div 
          className="flex whitespace-nowrap absolute left-0"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {/* Duplicate array for seamless infinite scroll */}
          {[...TICKER_DATA, ...TICKER_DATA, ...TICKER_DATA].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 px-8 text-sm">
              <span className="font-bold text-white">{item.symbol}</span>
              <span className="text-slate-300">{item.price}</span>
              <span className={`flex items-center ${item.up === true ? 'text-emerald-400' : item.up === false ? 'text-rose-400' : 'text-slate-muted'}`}>
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
