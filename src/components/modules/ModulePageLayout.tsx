import { Navbar } from '../../app/components/navbar';
import { Footer } from '../../app/components/footer';
import { ModuleHero } from './ModuleHero';
import { ModuleFeatureGrid } from './ModuleFeatureGrid';
import { ModuleWorkflow } from './ModuleWorkflow';
import { ModuleCTA } from './ModuleCTA';
import type { CreatorOSModule } from '../../config/modules';
import { getDisplayMeta } from '../../config/moduleDisplay';

type FeatureItem = {
  title: string;
  description: string;
  icon?: string;
};

type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

type ModulePageLayoutProps = {
  module: CreatorOSModule;

  hero?: {
    title?: string;
    subtitle?: string;
    primaryAction?: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
  };

  features?: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    items: FeatureItem[];
  };

  workflow?: {
    title?: string;
    subtitle?: string;
    steps: WorkflowStep[];
  };

  cta?: {
    title?: string;
    subtitle?: string;
    primaryAction: { label: string; href: string };
    secondaryAction?: { label: string; href: string };
  };

  children?: React.ReactNode;
};

export function ModulePageLayout({
  module,
  hero,
  features,
  workflow,
  cta,
  children,
}: ModulePageLayoutProps) {
  const { accent } = getDisplayMeta(module.id);

  return (
    <div className="min-h-screen" style={{ background: '#0E0F14' }}>
      <Navbar />

      <ModuleHero
        module={module}
        title={hero?.title}
        subtitle={hero?.subtitle}
        primaryAction={hero?.primaryAction}
        secondaryAction={hero?.secondaryAction}
      />

      {features && (
        <ModuleFeatureGrid
          sectionTitle={features.sectionTitle}
          sectionSubtitle={features.sectionSubtitle}
          items={features.items}
          accent={accent}
        />
      )}

      {workflow && (
        <ModuleWorkflow
          title={workflow.title}
          subtitle={workflow.subtitle}
          steps={workflow.steps}
          accent={accent}
        />
      )}

      {children}

      {cta && (
        <ModuleCTA
          title={cta.title}
          subtitle={cta.subtitle}
          primaryAction={cta.primaryAction}
          secondaryAction={cta.secondaryAction}
          accent={accent}
        />
      )}

      <Footer />
    </div>
  );
}
