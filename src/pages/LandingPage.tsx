import { SelectedResidences } from '../components/landing/SelectedResidences';
import { HeroSection } from '../components/landing/HeroSection';
import { SocialProof } from '../components/landing/SocialProof';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FAQSection } from '../components/landing/FAQSection';

export default function LandingPage() {
  return (
    <div className="bg-background text-gray-800 selection:bg-primary selection:text-background">
      <HeroSection />
      <SocialProof />
      <SelectedResidences />
      <BentoFeatures />
      <HowItWorks />
      <FAQSection />

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 bg-surface border-t border-border/60 relative flex items-center justify-center">

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-ink tracking-tight mb-6">
            Ready to explore the <span className="text-primary">portfolio?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-light mb-6 max-w-2xl mx-auto">
            Browse the example listings, compare property details and review the financial scenarios.
          </p>
          <a href="/login" className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium rounded-lg bg-primary text-background hover:bg-primary-hover transition-colors">
            Open portal
          </a>
        </div>
      </section>
    </div>
  );
}
