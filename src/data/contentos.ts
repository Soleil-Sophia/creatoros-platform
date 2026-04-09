export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type WorkflowStep = {
  step: string;
  title: string;
  description: string;
};

export type UseCase = {
  title: string;
  description: string;
};

export type AppSection = {
  id: string;
  title: string;
  description: string;
};

export type OutputType = {
  id: string;
  label: string;
  description: string;
  icon: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const OUTPUT_TYPES: OutputType[] = [
  {
    id: 'hook-pack',
    label: 'Hook Pack',
    description: '5 attention-grabbing hooks calibrated to your offer and platform.',
    icon: 'hook',
  },
  {
    id: 'short-script',
    label: 'Short Script',
    description: 'A 60-second structured script — opening, tension, resolution, CTA.',
    icon: 'script',
  },
  {
    id: 'caption-draft',
    label: 'Caption Draft',
    description: 'Platform-native captions with clear positioning and a direct CTA.',
    icon: 'caption',
  },
  {
    id: 'content-brief',
    label: 'Content Brief',
    description: 'A structured brief defining goal, angle, key points, and format.',
    icon: 'brief',
  },
  {
    id: 'repurposing-plan',
    label: 'Repurposing Plan',
    description: 'A multi-platform plan for getting maximum reach from one core asset.',
    icon: 'repurpose',
  },
];

export const contentOSData: {
  hero: { title: string; subtitle: string };
  features: Feature[];
  workflow: WorkflowStep[];
  useCases: UseCase[];
  appSections: AppSection[];
  stats: Stat[];
  outputTypes: OutputType[];
} = {
  hero: {
    title: 'ContentOS',
    subtitle:
      'Turn your offers, ideas, and expertise into structured content assets. Hooks, scripts, captions — built around your brand voice, not generic AI output.',
  },

  features: [
    {
      title: 'Generate',
      description:
        'Turn a content goal into structured output — hooks, scripts, and captions — built around your offer and audience.',
      icon: 'generate',
    },
    {
      title: 'Brand Voice',
      description:
        'Every output reflects your configured tone, messaging, and positioning. Not generic. Not random.',
      icon: 'voice',
    },
    {
      title: 'Asset Library',
      description:
        'Store, organize, and reuse your best content assets. Build a library that compounds over time.',
      icon: 'library',
    },
    {
      title: 'Multi-Platform',
      description:
        'Structure content for LinkedIn, Instagram, X, email, and more — from a single workflow.',
      icon: 'platforms',
    },
    {
      title: 'Workflow Templates',
      description:
        'Choose a workflow: product launch, thought leadership, community building. Structure first.',
      icon: 'workflow',
    },
    {
      title: 'Content Planning',
      description:
        'Map goals to output types. Plan your cadence before you generate a single word.',
      icon: 'plan',
    },
  ],

  workflow: [
    {
      step: '01',
      title: 'Define your content goal',
      description:
        'Start with what you want to achieve: awareness, conversion, community, or authority.',
    },
    {
      step: '02',
      title: 'Select a workflow or template',
      description:
        'Choose from structured content workflows. Each is designed for a specific output type.',
    },
    {
      step: '03',
      title: 'Generate structured output',
      description:
        'ContentOS produces hooks, scripts, and captions aligned with your brand voice.',
    },
    {
      step: '04',
      title: 'Save and reuse in library',
      description:
        'Your best outputs go into the library — ready to remix, repurpose, or reference.',
    },
  ],

  useCases: [
    {
      title: 'Thought Leadership',
      description:
        'Build a consistent publishing cadence around your core expertise and positioning.',
    },
    {
      title: 'Product Launches',
      description:
        'Structure content phases around a launch: teaser, announcement, proof, follow-up.',
    },
    {
      title: 'Community Building',
      description:
        'Create content that invites conversation, builds trust, and grows your audience.',
    },
  ],

  appSections: [
    {
      id: 'overview',
      title: 'Overview',
      description: 'Your content workflow at a glance.',
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Create new content assets from your inputs.',
    },
    {
      id: 'library',
      title: 'Library',
      description: 'Browse, reuse, and organize your saved assets.',
    },
  ],

  stats: [
    { value: 'Active', label: 'Module Status' },
    { value: '5', label: 'Output Types' },
    { value: '5+', label: 'Platforms' },
    { value: 'Brand-Aware', label: 'AI Mode' },
  ],

  outputTypes: OUTPUT_TYPES,
};
