import { HeroSection } from '../components/landing/HeroSection';
import { SocialProof } from '../components/landing/SocialProof';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { HowItWorks } from '../components/landing/HowItWorks';
import { Testimonials } from '../components/landing/Testimonials';
import { FAQSection } from '../components/landing/FAQSection';

export default function LandingPage() {
  return (
    <div className="bg-background text-gray-200 selection:bg-primary selection:text-background">
      <HeroSection />
      <SocialProof />
      <BentoFeatures />
      <HowItWorks />
      <Testimonials />
      <FAQSection />

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
            Ready to scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">portfolio?</span>
          </h2>
          <p className="text-xl text-slate-muted mb-12 max-w-2xl mx-auto">
            Join an exclusive network of institutional investors and family offices executing ultra-luxury transactions.
          </p>
          <a href="/login" className="inline-flex items-center justify-center h-14 px-10 text-lg font-semibold rounded-full bg-primary text-background hover:bg-primary-hover shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
            Request Exclusive Access
          </a>
        </div>
      </section>
    </div>
  );
}
