import { ModulePageLayout } from '../../components/modules/ModulePageLayout';
import { getModule } from '../../config/modules';
import { contentOSData } from '../../data/contentos';

const module = getModule('contentos')!;

export function ContentOSPage() {
  return (
    <ModulePageLayout
      module={module}
      hero={{
        title: contentOSData.hero.title,
        subtitle: contentOSData.hero.subtitle,
        primaryAction: { label: 'Open ContentOS', href: '/modules/contentos/app' },
        secondaryAction: { label: 'View all modules', href: '/modules' },
      }}
      features={{
        sectionTitle: 'Everything you need to create consistently',
        sectionSubtitle: 'From content planning to structured outputs — built around your brand voice.',
        items: contentOSData.features,
      }}
      workflow={{
        title: 'From goal to ready content',
        subtitle: 'Define your input — ContentOS structures your output into ready-to-ship formats.',
        steps: contentOSData.workflow,
      }}
      cta={{
        title: 'Ready to build content that ships?',
        subtitle: 'Stop treating AI like a chat. Use it like a production system built around your offer.',
        primaryAction: { label: 'Open ContentOS', href: '/modules/contentos/app' },
        secondaryAction: { label: 'View all modules', href: '/modules' },
      }}
    />
  );
}
