import type { PlatformRecommendation } from './types';

export interface BrandToneRecommendationValue {
  primaryTraits: string[];
  secondaryTraits: string[];
  avoid: string[];
  summary: string;
}

export function createBrandToneRecommendation(
  value: BrandToneRecommendationValue,
  createdAt: string,
): PlatformRecommendation<BrandToneRecommendationValue> {
  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: 'Update BrandOS tone of voice',
    summary: value.summary,
    origin: 'guide',
    targetOS: 'BrandOS',
    status: 'in_review',
    priority: 'medium',
    confidence: 'medium',
    reason: 'Created from the guided Brand Tone questionnaire and submitted for explicit human review.',
    expectedImpact: 'Clearer and more consistent brand communication across future CreatorOS outputs.',
    recommendedAction: 'Review, edit if needed, then approve or reject the proposed tone profile.',
    changes: [
      {
        path: 'toneOfVoice',
        recommendedValue: value,
      },
    ],
    evidence: [
      {
        id: crypto.randomUUID(),
        type: 'questionnaire',
        source: 'CreatorOS Guide · Brand Tone Questionnaire v1',
        summary: 'Proposal generated from the user’s selected audience feeling, communication traits, and energy level.',
        strength: 'medium',
        createdAt,
      },
    ],
    createdBy: 'CreatorOS Guide',
    createdAt,
    updatedAt: createdAt,
    history: [
      {
        id: crypto.randomUUID(),
        action: 'created',
        actor: 'CreatorOS Guide',
        reason: 'Brand Tone questionnaire completed.',
        createdAt,
      },
      {
        id: crypto.randomUUID(),
        action: 'submitted',
        actor: 'CreatorOS Guide',
        reason: 'User submitted the proposal for review.',
        createdAt,
      },
    ],
  };
}
