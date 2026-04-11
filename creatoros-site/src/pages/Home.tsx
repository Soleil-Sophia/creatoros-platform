import { Hero } from '../components/home/Hero';
import { Problem } from '../components/home/Problem';
import { Outcome } from '../components/home/Outcome';
import { FeaturedProduct } from '../components/home/FeaturedProduct';
import { HowItWorks } from '../components/home/HowItWorks';
import { EcosystemPreview } from '../components/home/EcosystemPreview';
import { AboutSection } from '../components/home/AboutSection';
import { FinalCTA } from '../components/home/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Outcome />
      <FeaturedProduct />
      <HowItWorks />
      <EcosystemPreview />
      <AboutSection />
      <FinalCTA />
    </>
  );
}
