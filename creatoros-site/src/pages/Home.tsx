import { useMeta } from '../hooks/useMeta';
import { Hero } from '../components/home/Hero';
import { Problem } from '../components/home/Problem';
import { Outcome } from '../components/home/Outcome';
import { SystemOverview } from '../components/home/SystemOverview';
import { EcosystemPreview } from '../components/home/EcosystemPreview';
import { CreatorOSStudio } from '../components/home/CreatorOSStudio';
import { CreatorOSBusiness } from '../components/home/CreatorOSBusiness';
import { FeaturedProduct } from '../components/home/FeaturedProduct';
import { FinalCTA } from '../components/home/FinalCTA';

export default function Home() {
  useMeta(
    'CreatorOS — Turn idea chaos into a clear, sellable offer',
    'CreatorOS by LXST helps creators and solo brands turn scattered thinking into clear direction, stronger positioning, and structured momentum.'
  );
  return (
    <>
      <Hero />
      <Problem />
      <Outcome />
      <SystemOverview />
      <EcosystemPreview />
      <CreatorOSStudio />
      <CreatorOSBusiness />
      <FeaturedProduct />
      <FinalCTA />
    </>
  );
}
