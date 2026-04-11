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

export type InputFieldConfig = {
  label: string;
  placeholder: string;
  primary: boolean;
};

export type InputMeta = {
  helperDescription: string;
  showTone: boolean;
  fields: {
    offer: InputFieldConfig;
    audience: InputFieldConfig;
    platform: InputFieldConfig;
    goal: InputFieldConfig;
  };
};

export const INPUT_META: Record<string, InputMeta> = {
  'hook-pack': {
    helperDescription: '5 tested hooks built around one topic, one audience, and one angle.',
    showTone: true,
    fields: {
      offer: {
        label: 'Topic / Angle',
        placeholder: 'e.g. Why most consultants struggle to scale — it\'s a positioning problem',
        primary: true,
      },
      audience: {
        label: 'Audience',
        placeholder: 'e.g. Established consultants, coaches, agencies',
        primary: true,
      },
      platform: {
        label: 'Platform',
        placeholder: 'LinkedIn',
        primary: false,
      },
      goal: {
        label: 'Angle / Framing',
        placeholder: 'e.g. Challenge a belief they hold but shouldn\'t',
        primary: false,
      },
    },
  },
  'short-script': {
    helperDescription: 'A structured 60-second script with clear beats, flow, and CTA.',
    showTone: true,
    fields: {
      offer: {
        label: 'Topic',
        placeholder: 'e.g. Why content without positioning doesn\'t convert',
        primary: true,
      },
      audience: {
        label: 'Audience',
        placeholder: 'e.g. Creators building service-based businesses',
        primary: false,
      },
      platform: {
        label: 'Format / Platform',
        placeholder: 'e.g. YouTube Short, Instagram Reel',
        primary: true,
      },
      goal: {
        label: 'CTA',
        placeholder: 'e.g. Book a call / Follow for more / DM me',
        primary: false,
      },
    },
  },
  'caption-draft': {
    helperDescription: 'Platform-native caption options written for clarity, tone, and action.',
    showTone: true,
    fields: {
      offer: {
        label: 'Topic',
        placeholder: 'e.g. The difference between content and positioned content',
        primary: false,
      },
      audience: {
        label: 'Audience',
        placeholder: 'e.g. Coaches selling high-ticket services',
        primary: false,
      },
      platform: {
        label: 'Platform',
        placeholder: 'e.g. Instagram',
        primary: true,
      },
      goal: {
        label: 'CTA',
        placeholder: 'e.g. Save this, share with a creator who needs it',
        primary: true,
      },
    },
  },
  'content-brief': {
    helperDescription: 'A focused content brief with goal, audience, angle, structure, and CTA.',
    showTone: false,
    fields: {
      offer: {
        label: 'Angle',
        placeholder: 'e.g. Positioning is the real lever — not content volume',
        primary: true,
      },
      audience: {
        label: 'Audience',
        placeholder: 'e.g. Service providers with an audience but low inbound',
        primary: true,
      },
      platform: {
        label: 'Format',
        placeholder: 'e.g. Long-form LinkedIn post',
        primary: false,
      },
      goal: {
        label: 'Goal',
        placeholder: 'e.g. Generate inbound and build authority',
        primary: true,
      },
    },
  },
  'repurposing-plan': {
    helperDescription: 'One source asset mapped into multiple platform-specific content outputs.',
    showTone: false,
    fields: {
      offer: {
        label: 'Source Asset',
        placeholder: 'e.g. LinkedIn post — Positioning vs. Content Volume (800 words)',
        primary: true,
      },
      audience: {
        label: 'Original Format',
        placeholder: 'e.g. Long-form LinkedIn post',
        primary: true,
      },
      platform: {
        label: 'Target Platforms',
        placeholder: 'e.g. Instagram, YouTube, X, Email',
        primary: true,
      },
      goal: {
        label: 'Goal',
        placeholder: 'e.g. Maximum reach from one high-performing asset',
        primary: false,
      },
    },
  },
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
