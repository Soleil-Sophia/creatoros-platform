import { buildContentRecommendation } from './recommendationBuilder';
import type { BrandPlaybook, CreatorRequestContext } from './types';

const BASE_PLAYBOOK: BrandPlaybook = {
  schemaVersion: 'brand-playbook-v1',
  governance: 'canonical',
  revision: 1,
  brandName: 'CreatorOS',
  brandDescription: 'Brand-governed content intelligence for creator-led businesses.',
  positioning: 'evidence-based content decisions aligned with brand and business goals',
  primaryOffer: 'CreatorOS Platform',
  primaryAudience: 'creator-led service businesses',
  audienceProblem: 'They publish regularly but do not know which content action is most likely to create qualified demand.',
  brandValues: ['Clarity', 'Evidence', 'Responsible growth'],
  toneOfVoice: ['direct', 'calm', 'evidence-based', 'non-hyperbolic'],
  allowedClaims: ['evidence-based content decisions'],
  prohibitedClaims: ['guaranteed leads', 'instant success'],
  contentPillars: ['brand-governed growth'],
  preferredCTAs: ['Book a strategy call'],
};

const BASE_CONTEXT: CreatorRequestContext = {
  businessGoal: 'lead_generation',
  channel: 'instagram',
  formatPreference: 'short_form',
  funnelStage: 'consideration',
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[Creator Intelligence Self-Check] ${message}`);
  }
}

export function runCreatorIntelligenceSelfCheck(): void {
  const first = buildContentRecommendation(BASE_PLAYBOOK, BASE_CONTEXT);
  const second = buildContentRecommendation(BASE_PLAYBOOK, BASE_CONTEXT);

  assert(
    JSON.stringify(first) === JSON.stringify(second),
    'The recommendation builder must be deterministic for identical inputs.',
  );

  assert(
    first.brandPolicyCheck.status === 'passed',
    'The canonical baseline recommendation should pass BrandOS policy checks.',
  );

  assert(
    first.cta === BASE_PLAYBOOK.preferredCTAs[0],
    'The recommendation must use the preferred BrandOS CTA.',
  );

  assert(
    first.confidence === 'medium',
    'Confidence must remain medium when no IntelligenceOS evidence is supplied.',
  );

  const withEvidence = buildContentRecommendation(BASE_PLAYBOOK, BASE_CONTEXT, [
    {
      kind: 'analytics',
      label: 'Case study content signal',
      detail: 'Case study content produced the highest qualified-response rate.',
      sourceId: 'self-check-evidence-001',
    },
  ]);

  assert(
    withEvidence.confidence === 'high',
    'Valid IntelligenceOS evidence should raise confidence to high.',
  );

  const prohibitedPlaybook: BrandPlaybook = {
    ...BASE_PLAYBOOK,
    allowedClaims: ['guaranteed leads'],
    prohibitedClaims: ['guaranteed leads'],
  };

  const needsReview = buildContentRecommendation(prohibitedPlaybook, BASE_CONTEXT);

  assert(
    needsReview.brandPolicyCheck.status === 'needs_review',
    'A generated prohibited claim must produce needs_review.',
  );

  assert(
    needsReview.brandPolicyCheck.prohibitedClaimTriggers.some(
      (trigger) => trigger.claim === 'guaranteed leads',
    ),
    'The policy result must identify the exact prohibited claim.',
  );

  console.log('[Creator Intelligence] Self-check passed', {
    deterministic: true,
    baselinePolicy: first.brandPolicyCheck.status,
    evidenceConfidence: withEvidence.confidence,
    prohibitedClaimPolicy: needsReview.brandPolicyCheck.status,
  });
}
