import type {
  AuthorityAnalysis,
  CalendarEntry,
  ContentAsset,
  ContentGoal,
  Platform,
  PositioningInput,
  QualityGate,
  SourcePack,
} from '../../types/authority';

const SYSTEM_INSIGHT =
  'Copilot can accelerate test creation, but sustainable quality improvement depends on the engineering system around it: review standards, CI/CD integration, and explicit business logic.';

const ANTI_PATTERN = 'Prompting statt Prozessdesign';

const AFFECTED_ZONES: AuthorityAnalysis['affectedZones'] = [
  'quality',
  'velocity',
  'developer_happiness',
];

const METRIC_LENS = [
  'Test coverage + change failure rate',
  'Time to write tests + developer confidence',
];

// Platform mapping per content goal
const GOAL_PLATFORM: Record<ContentGoal, Platform> = {
  awareness: 'LinkedIn',
  authority: 'X',
  trust: 'LinkedIn',
  education: 'TikTok',
  conversion: 'Threads',
};

const GOAL_LABEL: Record<ContentGoal, string> = {
  awareness: 'Awareness Post',
  authority: 'Authority Thread',
  trust: 'Trust Post',
  education: 'Education Short-Form Script',
  conversion: 'Conversion CTA',
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function analyzeSource(source: SourcePack, _positioning: PositioningInput): AuthorityAnalysis {
  // Deterministic analysis. In a real system this would call an LLM —
  // here we extract structure from the source body using simple heuristics
  // and overlay the fixed strategic frame defined by the engine.
  const lines = source.body
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const numberedSteps = lines.filter((l) => /^\d+\./.test(l));
  const keyPoints =
    numberedSteps.length > 0
      ? numberedSteps.slice(0, 5).map((l) => l.replace(/^\d+\.\s*/, ''))
      : [
          'Copilot accelerates test stub creation in well-typed codebases (~55% faster drafting).',
          'Raw test count and coverage % can be gamed by shallow assertions on trivial branches.',
          'Real gains in change failure rate require review checklists and CI/CD enforcement.',
          'Treating Copilot as a replacement for test design grows suite size without reducing incidents.',
          'Mutation testing on business-critical paths validates assertion strength, not coverage alone.',
        ];

  const excludedNoise = [
    'Benchmark percentages without team context',
    'Coverage % targets divorced from change failure rate',
    'Tool-as-savior framing',
    'Generic "AI productivity" claims',
  ];

  const detectedFriction = [
    'Coverage growth without incident reduction',
    'Tests asserting implementation details — refactors become expensive',
    'No shared definition of "business-critical paths"',
    'Review checklists missing for AI-generated test code',
  ];

  const contentAngles = [
    'Why test count is the wrong metric for AI-assisted engineering',
    'The 5-step pattern that turns Copilot drafts into real quality gains',
    'Coverage went up. Incidents went up too. Here is why.',
    'Prompting vs Process Design — the difference that compounds',
    'How to measure the system effect of AI tools in your engineering org',
  ];

  return {
    keyPoints,
    excludedNoise,
    systemInsight: SYSTEM_INSIGHT,
    detectedFriction,
    antiPattern: ANTI_PATTERN,
    metricLens: METRIC_LENS,
    contentAngles,
    affectedZones: AFFECTED_ZONES,
  };
}

function buildAsset(
  goal: ContentGoal,
  positioning: PositioningInput,
  analysis: AuthorityAnalysis,
  index: number,
): ContentAsset {
  const platform = GOAL_PLATFORM[goal];
  let body = '';
  let title = `${GOAL_LABEL[goal]} — ${positioning.seriesName}`;

  switch (goal) {
    case 'awareness':
      body = [
        `Most teams measure AI adoption with the wrong number.`,
        ``,
        `Test count went up. Coverage went up. Change failure rate? Also up.`,
        ``,
        `The pattern repeats across orgs adopting Copilot: ${analysis.antiPattern.toLowerCase()}.`,
        ``,
        `${analysis.systemInsight}`,
        ``,
        `If you are leading an engineering team rolling out AI tools, the question is not "how much faster do we ship tests" — it is "did the system around the tool change too?"`,
      ].join('\n');
      break;

    case 'authority':
      body = [
        `1/ Teams keep asking the wrong question about Copilot and test coverage.`,
        ``,
        `2/ The question is not: how many tests did we generate?`,
        `   The question is: did change failure rate drop?`,
        ``,
        `3/ Here is what we see across engineering orgs:`,
        ...analysis.keyPoints.slice(0, 3).map((p, i) => `   ${4 + i}/ ${p}`),
        ``,
        `7/ The anti-pattern has a name: ${analysis.antiPattern}.`,
        ``,
        `8/ ${analysis.systemInsight}`,
        ``,
        `9/ Track these together, never alone:`,
        ...analysis.metricLens.map((m) => `   • ${m}`),
        ``,
        `10/ Tools scale whatever process you already have. Weak process + AI = scaled weakness.`,
      ].join('\n');
      break;

    case 'trust':
      body = [
        `Last quarter I worked with an engineering org that 3x'd their unit test count using Copilot.`,
        ``,
        `Production incidents stayed flat. In two services, they got worse.`,
        ``,
        `The audit showed exactly what you would expect: shallow assertions, no mutation testing, no shared definition of "business-critical path."`,
        ``,
        `${analysis.systemInsight}`,
        ``,
        `The fix took 6 weeks. It was not a prompt change. It was a process change: review checklist, CI gates on critical-path mutation scores, and explicit zone ownership.`,
        ``,
        `Coverage and change failure rate now move together. That is the only test that matters.`,
      ].join('\n');
      break;

    case 'education':
      body = [
        `[HOOK 0-3s] Your team 3x'd test coverage with AI. Incidents went up. Why?`,
        ``,
        `[PROBLEM 3-15s] Coverage on its own is a vanity metric. Shallow assertions on trivial branches inflate the number without protecting business logic.`,
        ``,
        `[INSIGHT 15-35s] ${analysis.systemInsight}`,
        ``,
        `[PATTERN 35-50s] The 5-step fix:`,
        `1. Define business-critical modules`,
        `2. Engineers draft assertion intent first`,
        `3. Copilot fills scaffolding and edge cases`,
        `4. Mutation testing validates assertion strength`,
        `5. Track coverage AND change failure rate together`,
        ``,
        `[CLOSE 50-60s] Tools do not fix process. They scale it. Follow for more AI-engineering systems content.`,
      ].join('\n');
      break;

    case 'conversion':
      body = [
        `If your engineering org has rolled out Copilot or another AI coding tool in the last 6 months, here is one question worth a 30-minute conversation:`,
        ``,
        `Did your change failure rate move in the right direction?`,
        ``,
        `If the answer is "we did not measure that" — or worse, "it got slightly worse" — you are seeing ${analysis.antiPattern}.`,
        ``,
        `${analysis.systemInsight}`,
        ``,
        `I run engineering system audits for teams in exactly this situation. We map review gates, CI enforcement, and metric pairing in one focused session.`,
        ``,
        positioning.ctaGoal ? `→ ${positioning.ctaGoal}` : `→ DM me "audit" for details.`,
      ].join('\n');
      break;
  }

  return {
    id: `asset-${goal}-${index}-${Date.now()}`,
    goal,
    platform,
    title,
    body,
    cta: positioning.ctaGoal,
    wordCount: countWords(body),
  };
}

export function generateAssets(
  analysis: AuthorityAnalysis,
  positioning: PositioningInput,
): ContentAsset[] {
  return positioning.contentGoals.map((goal, index) =>
    buildAsset(goal, positioning, analysis, index),
  );
}

export function buildCalendarEntries(
  assets: ContentAsset[],
  positioning: PositioningInput,
): CalendarEntry[] {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return assets.map((asset, i) => ({
    week: positioning.calendarWeek,
    day: days[i % days.length],
    platform: asset.platform,
    goal: asset.goal,
    assetId: asset.id,
    title: asset.title,
  }));
}

export function newRunId(): string {
  return `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
