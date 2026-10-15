import { Link } from 'react-router-dom';

// CSS rise only: text stays opaque so it paints immediately and counts for LCP.
const rise = (step: number) => ({ animationDelay: `${step * 0.2}s` });

export function HeroSection() {
  return (
    <section className="hero-section relative w-full min-h-[600px] sm:min-h-[640px] lg:min-h-[620px] flex items-center overflow-hidden bg-white border-b border-border/60">
      {/* Responsive, high-priority estate image */}
      <div className="absolute inset-0 z-0">
        <picture className="contents">
          {/* Preserve the centre crop on tall screens without transferring off-screen sides.
              Sizes follow the hero's 600 / 640 / 620px minimum heights and object-cover scaling. */}
          <source
            media="(max-width: 767px) and (max-aspect-ratio: 2/3)"
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&crop=center&w=640&h=800&q=80 640w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&crop=center&w=960&h=1200&q=80 960w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&crop=center&w=1280&h=1600&q=80 1280w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&crop=center&w=1600&h=2000&q=80 1600w"
            sizes="(min-width: 640px) max(100vw, 512px), max(100vw, 480px)"
          />
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2500&q=80"
            srcSet="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=960&q=80 960w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1280&q=80 1280w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80 1600w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80 1920w, https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2500&q=80 2500w"
            sizes="(min-width: 1024px) max(100vw, 935px), (min-width: 640px) max(100vw, 965px), max(100vw, 905px)"
            width={2500}
            height={1659}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            alt="Contemporary residence with landscaped grounds"
            className="w-full h-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 bg-[#102536]/65" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-7 text-center">
          <p style={rise(0)} className="animate-hero-rise text-white text-[10px] sm:text-xs font-medium uppercase tracking-[0.24em]">
            International residences · Property insights
          </p>

          <h1 style={rise(1)} className="animate-hero-rise font-display text-[2.75rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-normal tracking-tight text-white leading-[1.06]">
            Properties of distinction.<br /><span className="italic text-[#f5e5c6] text-[0.8em]">Details that matter.</span>
          </h1>

          <p style={rise(2)} className="animate-hero-rise text-sm sm:text-base text-white/95 max-w-lg mx-auto leading-[1.8]">
            Browse international residences, compare property details and explore illustrative financial scenarios.
          </p>

          <div style={rise(3)} className="animate-hero-rise flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-3">
            <a href="#residences" className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-white text-ink text-sm font-medium transition-colors hover:bg-[#f5e5c6]">
              Explore properties
            </a>
            <Link to="/login" className="inline-flex items-center justify-center h-12 px-8 rounded-md border border-white/60 text-white bg-transparent text-sm font-medium transition-colors hover:bg-white/10">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex absolute bottom-7 right-10 px-4 py-2 items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/95">
        <span className="w-12 h-px bg-white/60" aria-hidden="true" />
        Architecture. Location. Detail.
      </div>
    </section>
  );
}
