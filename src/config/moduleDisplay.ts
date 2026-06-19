export type ModuleDisplayMeta = {
  number: string;
  tagline: string;
  accent: string;
  features: string[];
};

export const moduleDisplay: Record<string, ModuleDisplayMeta> = {
  contentos: {
    number: '01',
    tagline: 'Structured Content Generation',
    accent: '#FFBFDE',
    features: ['Hooks & Scripts', 'Social Captions', 'Brand Voice System', 'Asset Library'],
  },
  brandos: {
    number: '02',
    tagline: 'Voice & Identity Foundation',
    accent: '#E7C6F3',
    features: ['Voice Parameters', 'Tone Configuration', 'Messaging Framework', 'Identity Lock'],
  },
  launchos: {
    number: '03',
    tagline: 'Rollout & Coordination',
    accent: '#DABFFF',
    features: ['Launch Planning', 'Rollout Coordination', 'Phase Orchestration', 'Goal Tracking'],
  },
  managementos: {
    number: '04',
    tagline: 'Scheduling & Execution',
    accent: '#C4B5FD',
    features: ['Content Calendar', 'Publishing Queue', 'Multi-Platform Scheduling', 'Post Execution'],
  },
  analyticsos: {
    number: '05',
    tagline: 'Performance Intelligence',
    accent: '#B8A3FF',
    features: ['Cross-Platform Analytics', 'Performance Patterns', 'Engagement Insights', 'ROI Tracking'],
  },
  communityos: {
    number: '06',
    tagline: 'Audience Relationship Management',
    accent: '#E7C6F3',
    features: ['Interaction Tracking', 'Response Automation', 'Community Insights', 'Relationship Scoring'],
  },
  researchos: {
    number: '07',
    tagline: 'Audience & Market Intelligence',
    accent: '#DABFFF',
    features: ['Audience Analysis', 'Competitor Research', 'Trend Monitoring', 'Insight Extraction'],
  },
};

export const DEFAULT_ACCENT = '#DABFFF';

export function getDisplayMeta(id: string): ModuleDisplayMeta {
  return (
    moduleDisplay[id] ?? {
      number: '??',
      tagline: '',
      accent: DEFAULT_ACCENT,
      features: [],
    }
  );
}
