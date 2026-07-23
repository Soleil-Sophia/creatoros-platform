import { runBrandPolicyCheck } from './policyCheck';
import type {
  BrandPlaybook,
  ContentRecommendation,
  CreatorRequestContext,
  EvidenceItem,
} from './types';

const GOAL_CONFIGURATION: Record<
  CreatorRequestContext['businessGoal'],
  {
    action: string;
    expectedImpact: string;
    primaryMetric: string;
    secondaryMetric: string;
  }
> = {
  lead_generation: {
    action: 'generate qualified leads',
    expectedImpact: 'Higher qualified-response and offer-click probability than generic content.',
    primaryMetric: 'Qualified leads per content item',
    secondaryMetric: 'Offer clicks per 1,000 views',
  },
  sales: {
    action: 'convert warm attention into sales',
    expectedImpact: 'Higher purchase intent through clearer proof, objections, and offer alignment.',
    primaryMetric: 'Purchases per content item',
    secondaryMetric: 'Revenue per 1,000 views',
  },
  authority: {
    action: 'strengthen category authority',
    expectedImpact: 'Higher saves, profile visits, and trust signals from relevant audiences.',
    primaryMetric: 'Saves per 1,000 views',
    secondaryMetric: 'Profile visits per content item',
  },
  reach: {
    action: 'expand relevant top-of-funnel reach',
    expectedImpact: 'Higher qualified impressions without abandoning brand positioning.',
    primaryMetric: 'Qualified impressions per content item',
    secondaryMetric: 'Relevant follows per 1,000 views',
  },
  community: {
    action: 'deepen community participation',
    expectedImpact: 'Higher meaningful comments, shares, and repeat interaction.',
    primaryMetric: 'Meaningful comments per content item',
    secondaryMetric: 'Shares per content item',
  },
};

const FUNNEL_CONFIGURATION: Record<
  CreatorRequestContext['funnelStage'],
  { angle: string; evaluationWindowDays: number }
> = {
  awareness: { angle: 'name the problem clearly', evaluationWindowDays: 7 },
  consideration: { angle: 'show proof and explain the mechanism', evaluationWindowDays: 10 },
  conversion: { angle: 'remove objections and present the next step', evaluationWindowDays: 14 },
  retention: { angle: 'deliver advanced value and reinforce trust', evaluationWindowDays: 14 },
};

const CHANNEL_CONFIGURATION: Record<
  CreatorRequestContext['channel'],
  { captionGuidance: string; visualDirection: string[] }
> = {
  youtube: {
    captionGuidance: 'Use a clear title, concise description, and one primary CTA above the fold.',
    visualDirection: [
      'Cold open that states the audience problem',
      'Direct-to-camera explanation',
      'Specific proof or example on screen',
      'Calm CTA close',
    ],
  },
  instagram: {
    captionGuidance: 'Use one opening line, a concise story, and one preferred CTA.',
    visualDirection: [
      'Immediate hook frame',
      'Problem or contrast frame',
      'Proof frame',
      'Branded CTA frame',
    ],
  },
  tiktok: {
    captionGuidance: 'Keep the caption short, native to the platform, and focused on one action.',
    visualDirection: [
      'Pattern-break opening',
      'Fast problem clarification',
      'Concrete example or proof',
      'Loop-compatible CTA close',
    ],
  },
  linkedin: {
    captionGuidance: 'Use the first two lines as the hook, short paragraphs, and one business CTA.',
    visualDirection: [
      'Founder or operator opening',
      'Diagram, framework, or proof cutaway',
      'Concrete business implication',
      'Direct CTA close',
    ],
  },
  x: {
    captionGuidance: 'Use a concise lead post and place supporting proof in a reply chain.',
    visualDirection: ['Text-first execution with one optional evidence graphic'],
  },
};

function firstOrFallback(values: readonly string[], fallback: string): string {
  return values.find((value) => value.trim().length > 0)?.trim() ?? fallback;
}

function firstSentence(value: string): string {
  const trimmed = value.trim();
  const first = trimmed.split(/[.!?]/)[0]?.trim();
  return first || trimmed;
}

export function buildContentRecommendation(
  playbook: Readonly<BrandPlaybook>,
  context: Readonly<CreatorRequestContext>,
  intelligenceEvidence: readonly EvidenceItem[] = [],
): ContentRecommendation {
  const goal = GOAL_CONFIGURATION[context.businessGoal];
  const funnel = FUNNEL_CONFIGURATION[context.funnelStage];
  const channel = CHANNEL_CONFIGURATION[context.channel];

  const pillar = firstOrFallback(playbook.contentPillars, 'core expertise');
  const allowedClaim = firstOrFallback(playbook.allowedClaims, playbook.positioning);
  const cta = firstOrFallback(playbook.preferredCTAs, 'Learn more');
  const value = firstOrFallback(playbook.brandValues, 'Clarity and evidence');
  const audience = playbook.primaryAudience.trim() || 'the primary target audience';
  const audienceProblem = firstSentence(playbook.audienceProblem) || 'an unresolved audience problem';

  const hook = `${audience}: ${audienceProblem}.`;
  const coreMessage = `${playbook.brandName} helps ${audience} ${goal.action} through ${allowedClaim}.`;
  const captionGuidance = `${channel.captionGuidance} Anchor the message in the brand value “${value}”.`;

  const contentStructure = [
    `Open by ${funnel.angle}.`,
    `Name the audience problem precisely: “${audienceProblem}.”`,
    `Connect the problem to the content pillar “${pillar}”.`,
    `Explain the mechanism behind ${playbook.primaryOffer || 'the primary offer'}.`,
    `Support the message with the approved claim “${allowedClaim}”.`,
    `Close with the preferred CTA “${cta}”.`,
  ];

  const brandPolicyCheck = runBrandPolicyCheck(playbook, {
    hook,
    coreMessage,
    captionGuidance,
    cta,
  });

  const evidence: EvidenceItem[] = [
    {
      kind: 'brand',
      label: 'BrandOS positioning',
      detail: playbook.positioning,
    },
    {
      kind: 'brand',
      label: 'BrandOS content pillar',
      detail: pillar,
    },
    {
      kind: 'context',
      label: 'Creator request context',
      detail: `${context.channel} · ${context.formatPreference} · ${context.funnelStage} · ${context.businessGoal}`,
    },
    ...intelligenceEvidence.map((item) => ({ ...item })),
  ];

  const confidence: ContentRecommendation['confidence'] =
    brandPolicyCheck.status === 'needs_review'
      ? 'low'
      : intelligenceEvidence.length > 0
        ? 'high'
        : 'medium';

  return {
    recommendedFormat: context.formatPreference,
    targetAudience: audience,
    businessGoal: context.businessGoal,
    hook,
    coreMessage,
    contentStructure,
    visualDirection: [...channel.visualDirection],
    cta,
    captionGuidance,
    brandPolicyCheck,
    reasoning: [
      `The recommendation supports the business goal to ${goal.action}.`,
      `The ${context.funnelStage} funnel stage requires content that ${funnel.angle}.`,
      `The concept uses the BrandOS pillar “${pillar}”.`,
      `The CTA comes directly from BrandOS: “${cta}”.`,
      intelligenceEvidence.length > 0
        ? `IntelligenceOS supplied ${intelligenceEvidence.length} evidence item(s).`
        : 'No live IntelligenceOS evidence was supplied; confidence remains medium at best.',
    ],
    evidence,
    expectedImpact: goal.expectedImpact,
    confidence,
    measurementPlan: {
      primaryMetric: goal.primaryMetric,
      secondaryMetric: goal.secondaryMetric,
      targetRule: `${goal.primaryMetric} must meet or exceed the current baseline within ${funnel.evaluationWindowDays} days.`,
      evaluationWindowDays: funnel.evaluationWindowDays,
    },
  };
}
