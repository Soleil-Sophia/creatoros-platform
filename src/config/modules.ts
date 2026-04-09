export type CreatorOSModule = {
  id: string;
  name: string;
  status: 'active' | 'planned' | 'beta';
  category: 'core' | 'addon';
  shortDescription: string;
  description: string;
  isCore: boolean;
  routes: {
    overview: string;
    app?: string;
  };
};

export const modules: CreatorOSModule[] = [
  {
    id: 'contentos',
    name: 'ContentOS',
    status: 'active',
    category: 'core',
    isCore: true,
    shortDescription: 'Plan, generate and manage content workflows.',
    description:
      'Turn your offers, ideas, and expertise into structured content assets — hooks, scripts, captions, and brand voice — ready to deploy across platforms.',
    routes: {
      overview: '/modules/contentos',
      app: '/modules/contentos/app',
    },
  },
  {
    id: 'brandos',
    name: 'BrandOS',
    status: 'active',
    category: 'core',
    isCore: true,
    shortDescription: 'Define brand foundations, positioning and messaging.',
    description:
      'The strategic foundation of your workflow — defines identity, voice and messaging before content, launches, and execution.',
    routes: {
      overview: '/modules/brandos',
      app: '/modules/brandos/app',
    },
  },
  {
    id: 'launchos',
    name: 'LaunchOS',
    status: 'planned',
    category: 'core',
    isCore: true,
    shortDescription: 'Structure launches, coordinate rollouts, and orchestrate content phases.',
    description:
      'Structure launches, coordinate rollouts, and orchestrate focused content phases across platforms with clear timing and goals.',
    routes: {
      overview: '/modules/launchos',
    },
  },
  {
    id: 'managementos',
    name: 'ManagementOS',
    status: 'planned',
    category: 'core',
    isCore: true,
    shortDescription: 'Schedule content, manage publishing queue, and execute multi-platform posting.',
    description:
      'Schedule content, manage publishing queue, and execute multi-platform posting. The operational layer between strategy and measurement.',
    routes: {
      overview: '/modules/managementos',
    },
  },
  {
    id: 'analyticsos',
    name: 'AnalyticsOS',
    status: 'planned',
    category: 'core',
    isCore: true,
    shortDescription: 'Track performance across platforms and content types.',
    description:
      'Track content performance across platforms, identify top performers, and get insights on what resonates with your audience.',
    routes: {
      overview: '/modules/analyticsos',
    },
  },
  {
    id: 'communityos',
    name: 'CommunityOS',
    status: 'planned',
    category: 'addon',
    isCore: false,
    shortDescription: 'Manage interactions, track relationships, and build community.',
    description:
      'Manage community interactions, track conversations, and build deeper relationships with your audience.',
    routes: {
      overview: '/modules/communityos',
    },
  },
  {
    id: 'researchos',
    name: 'ResearchOS',
    status: 'planned',
    category: 'addon',
    isCore: false,
    shortDescription: 'Deep audience analysis, competitor research, and trend monitoring.',
    description:
      'Deep audience analysis, competitor research, and trend monitoring in one place.',
    routes: {
      overview: '/modules/researchos',
    },
  },
];

export const coreModules = modules.filter((m) => m.category === 'core');
export const addonModules = modules.filter((m) => m.category === 'addon');
export const activeModules = modules.filter((m) => m.status === 'active');

export function getModule(id: string): CreatorOSModule | undefined {
  return modules.find((m) => m.id === id);
}
