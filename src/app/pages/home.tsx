import { Navbar } from '../components/navbar';
import { PlatformHero } from '../components/platform-hero';
import { SystemOverview } from '../components/system-overview';
import { WhyCreatorOS } from '../components/why-creatoros';
import { EcosystemPreview } from '../components/ecosystem-preview';
import { FinalCTA } from '../components/final-cta';
import { Footer } from '../components/footer';

export function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />
      <PlatformHero />
      <SystemOverview />
      <WhyCreatorOS />
      <EcosystemPreview />
      <FinalCTA />
      <Footer />
    </div>
  );
}