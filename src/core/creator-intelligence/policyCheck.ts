import type {
  BrandPlaybook,
  BrandPolicyCheck,
  ProhibitedClaimTrigger,
  RecommendationDraft,
} from './types';

const DEFAULT_HYPE_TERMS = [
  'guaranteed',
  'overnight',
  'instant success',
  'get rich quick',
  '10x your revenue',
  'replaces your judgment',
] as const;

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function containsPhrase(value: string, phrase: string): boolean {
  const normalizedPhrase = normalize(phrase);
  return normalizedPhrase.length > 0 && normalize(value).includes(normalizedPhrase);
}

export function runBrandPolicyCheck(
  playbook: Readonly<BrandPlaybook>,
  draft: Readonly<RecommendationDraft>,
): BrandPolicyCheck {
  const fields = [
    ['hook', draft.hook],
    ['coreMessage', draft.coreMessage],
    ['captionGuidance', draft.captionGuidance],
    ['cta', draft.cta],
  ] as const;

  const prohibitedClaimTriggers: ProhibitedClaimTrigger[] = [];

  for (const claim of playbook.prohibitedClaims) {
    for (const [field, value] of fields) {
      if (containsPhrase(value, claim)) {
        prohibitedClaimTriggers.push({ claim, foundIn: field });
      }
    }
  }

  const allowedClaimsReferenced = playbook.allowedClaims.filter((claim) =>
    fields.some(([, value]) => containsPhrase(value, claim)),
  );

  const ctaAligned = playbook.preferredCTAs.some((preferredCTA) => {
    const preferred = normalize(preferredCTA);
    const actual = normalize(draft.cta);
    return preferred.length > 0 && (preferred.includes(actual) || actual.includes(preferred));
  });

  const declaredTone = normalize(playbook.toneOfVoice.join(' '));
  const rejectsHype =
    declaredTone.includes('calm') ||
    declaredTone.includes('direct') ||
    declaredTone.includes('non-hyperbolic') ||
    declaredTone.includes('evidence');

  const hypeDetected = rejectsHype
    ? DEFAULT_HYPE_TERMS.some((term) => fields.some(([, value]) => containsPhrase(value, term)))
    : false;

  const toneAligned = !hypeDetected;
  const reasons: string[] = [];

  if (prohibitedClaimTriggers.length > 0) {
    reasons.push(
      `${prohibitedClaimTriggers.length} prohibited claim match(es) found in the recommendation.`,
    );
  }

  if (!ctaAligned) {
    reasons.push('CTA does not align with a preferred CTA from BrandOS.');
  }

  if (!toneAligned) {
    reasons.push('Recommendation contains hype language that conflicts with the declared tone.');
  }

  const status: BrandPolicyCheck['status'] =
    prohibitedClaimTriggers.length === 0 && ctaAligned && toneAligned
      ? 'passed'
      : 'needs_review';

  if (status === 'passed') {
    reasons.unshift('Recommendation aligns with BrandOS tone, CTA, and prohibited-claim rules.');
  }

  return {
    status,
    toneAligned,
    ctaAligned,
    allowedClaimsReferenced,
    prohibitedClaimTriggers,
    reasons,
  };
}
