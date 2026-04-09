export type ModuleStatus = 'active' | 'beta' | 'coming-soon' | 'planned';
export type ModuleCategory = 'core' | 'addon';

export type CreatorOSModule = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  shortDescription: string;
  status: ModuleStatus;
  category: ModuleCategory;
  isCore: boolean;
  accent: string;
  features: string[];
  routes: {
    overview: string;
    app?: string;
  };
};

export const modules: CreatorOSModule[] = [
  {
    id: 'brandos',
    number: '01',
    name: 'Brand OS',
    shortName: 'BrandOS',
    tagline: 'Voice & Identity Foundation',
    shortDescription: 'Define brand foundations, positioning and messaging.',
    description:
      'The strategic foundation of your workflow — defines identity, voice & messaging before content, launches, and execution. Makes your brand machine-readable and workflow-ready.',
    status: 'active',
    category: 'core',
    isCore: true,
    accent: '#E7C6F3',
    features: ['Voice Parameters', 'Tone Configuration', 'Messaging Framework', 'Identity Lock'],
    routes: {
      overview: '/modules/brandos',
      app: '/modules/brandos/app',
    },
  },
  {
    id: 'contentos',
    number: '02',
    name: 'Content OS',
    shortName: 'ContentOS',
    tagline: 'Structured Content Generation',
    shortDescription: 'Plan, generate and manage content workflows.',
    description:
      'Turn your offers, ideas, and expertise into structured content assets — hooks, scripts, captions, and brand voice — ready to deploy across platforms.',
    status: 'active',
    category: 'core',
    isCore: true,
    accent: '#FFBFDE',
    features: ['Hooks & Scripts', 'Social Captions', 'Brand Voice System', 'Asset Library'],
    routes: {
      overview: '/modules/contentos',
      app: '/modules/contentos/app',
    },
  },
  {
    id: 'launchos',
    number: '03',
    name: 'Launch OS',
    shortName: 'LaunchOS',
    tagline: 'Rollout & Coordination',
    shortDescription: 'Structure launches, coordinate rollouts, and orchestrate content phases.',
    description:
      'Structure launches, coordinate rollouts, and orchestrate focused content phases across platforms with clear timing and goals.',
    status: 'coming-soon',
    category: 'core',
    isCore: true,
    accent: '#DABFFF',
    features: ['Launch Planning', 'Rollout Coordination', 'Phase Orchestration', 'Goal Tracking'],
    routes: {
      overview: '/modules/launchos',
    },
  },
  {
    id: 'managementos',
    number: '04',
    name: 'Management OS',
    shortName: 'ManagementOS',
    tagline: 'Scheduling & Execution',
    shortDescription: 'Schedule content, manage publishing queue, and execute multi-platform posting.',
    description:
      'Schedule content, manage publishing queue, and execute multi-platform posting. The operational layer between strategy and measurement.',
    status: 'coming-soon',
    category: 'core',
    isCore: true,
    accent: '#C4B5FD',
    features: ['Content Calendar', 'Publishing Queue', 'Multi-Platform Scheduling', 'Post Execution'],
    routes: {
      overview: '/modules/managementos',
    },
  },
  {
    id: 'analyticsos',
    number: '05',
    name: 'Analytics OS',
    shortName: 'AnalyticsOS',
    tagline: 'Performance Intelligence',
    shortDescription: 'Track performance across platforms and content types.',
    description:
      'Track content performance across platforms, identify top performers, and get insights on what resonates with your audience.',
    status: 'coming-soon',
    category: 'core',
    isCore: true,
    accent: '#B8A3FF',
    features: ['Cross-Platform Analytics', 'Performance Patterns', 'Engagement Insights', 'ROI Tracking'],
    routes: {
      overview: '/modules/analyticsos',
    },
  },
  {
    id: 'communityos',
    number: '06',
    name: 'Community OS',
    shortName: 'CommunityOS',
    tagline: 'Audience Relationship Management',
    shortDescription: 'Manage interactions, track relationships, and build community.',
    description:
      'Manage community interactions, track conversations, and build deeper relationships with your audience.',
    status: 'planned',
    category: 'addon',
    isCore: false,
    accent: '#E7C6F3',
    features: ['Interaction Tracking', 'Response Automation', 'Community Insights', 'Relationship Scoring'],
    routes: {
      overview: '/modules/communityos',
    },
  },
  {
    id: 'researchos',
    number: '07',
    name: 'Research OS',
    shortName: 'ResearchOS',
    tagline: 'Audience & Market Intelligence',
    shortDescription: 'Deep audience analysis, competitor research, and trend monitoring.',
    description:
      'Deep audience analysis, competitor research, and trend monitoring in one place.',
    status: 'planned',
    category: 'addon',
    isCore: false,
    accent: '#DABFFF',
    features: ['Audience Analysis', 'Competitor Research', 'Trend Monitoring', 'Insight Extraction'],
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
