import { Globe, Coins, MapPin, Activity } from 'lucide-react';

const HIGHLIGHTS = [
  { label: 'International listings', Icon: Globe },
  { label: 'Values by currency', Icon: Coins },
  { label: 'Shareable property details', Icon: MapPin },
  { label: 'Illustrative financial scenarios', Icon: Activity },
];

export function SocialProof() {
  return (
    <section tabIndex={0} aria-label="Property browsing features" className="feature-strip relative border-b border-border/70 bg-surface">
      <div className="overflow-hidden py-8 sm:py-10">
        <div className="feature-strip-track">
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className={`feature-strip-group ${duplicate ? 'feature-strip-copy' : ''}`}>
              {HIGHLIGHTS.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-4 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-ink">
                  <Icon aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0 text-accent" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
