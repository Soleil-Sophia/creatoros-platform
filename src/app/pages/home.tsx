import { Navbar } from '../components/navbar';
import { Hero } from '../components/hero';
import { PlatformStatement } from '../components/platform-statement';
import { FeaturedModule } from '../components/featured-module';
import { HowItWorks } from '../components/how-it-works';
import { WhatYouCanCreate } from '../components/what-you-can-create';
import { WhyNotChat } from '../components/why-not-chat';
import { EcosystemPreview } from '../components/ecosystem-preview';
import { FinalCTA } from '../components/final-cta';
import { Footer } from '../components/footer';

export function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />
      <Hero />
      <PlatformStatement />
      <FeaturedModule />
      <HowItWorks />
      <WhatYouCanCreate />
      <WhyNotChat />
      <EcosystemPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}
