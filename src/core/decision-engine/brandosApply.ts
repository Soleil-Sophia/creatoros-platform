import { readBrandProfile, writeBrandProfile } from '../../app/lib/brand-profile/storage';
import type { BrandProfile } from '../../app/lib/brand-profile/types';
import {
  createBrandOSRevisionRecord,
  saveBrandOSRevisionRecord,
} from './brandosRevisionHistory';
import type { BrandToneRecommendationValue } from './factories';
import type { PlatformRecommendation } from './types';

export interface BrandOSCanonicalPreview {
  recommendationId: string;
  current: BrandProfile | null;
  proposed: BrandProfile;
  nextRevision: number;
}

function isBrandToneValue(value: unknown): value is BrandToneRecommendationValue {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.primaryTraits) &&
    Array.isArray(candidate.secondaryTraits) &&
    Array.isArray(candidate.avoid) &&
    typeof candidate.summary === 'string'
  );
}

function readToneValue(
  recommendation: PlatformRecommendation,
): BrandToneRecommendationValue {
  const change = recommendation.changes.find((item) => item.path === 'toneOfVoice');
  if (!change || !isBrandToneValue(change.recommendedValue)) {
    throw new Error('Recommendation does not contain a valid BrandOS tone change.');
  }
  return change.recommendedValue;
}

export function previewBrandToneCanonicalApply(
  recommendation: PlatformRecommendation,
): BrandOSCanonicalPreview {
  if (recommendation.targetOS !== 'BrandOS') {
    throw new Error('Only BrandOS recommendations can be applied to BrandOS.');
  }
  if (recommendation.status !== 'approved') {
    throw new Error('Recommendation must be approved before canonical apply.');
  }

  const current = readBrandProfile();
  const value = readToneValue(recommendation);
  const nextRevision = (current?.canonicalRevision ?? 0) + 1;
  const now = new Date().toISOString();

  const proposed: BrandProfile = {
    brandName: current?.brandName || 'Untitled Brand',
    voiceTone: value.primaryTraits.join(', '),
    voiceComplexity: current?.voiceComplexity || 'clear and accessible',
    voiceFormality: value.secondaryTraits.join(', '),
    voiceEnergy: value.summary,
    voiceLabel: value.primaryTraits.join(' · '),
    updatedAt: now,
    canonicalRevision: nextRevision,
    canonicalSourceRecommendationId: recommendation.id,
    canonicalApprovedAt: recommendation.reviewedAt ?? now,
    canonicalApprovedBy: recommendation.reviewedBy ?? 'Current User',
  };

  return {
    recommendationId: recommendation.id,
    current,
    proposed,
    nextRevision,
  };
}

export function applyApprovedBrandToneRecommendation(
  recommendation: PlatformRecommendation,
): BrandProfile {
  const preview = previewBrandToneCanonicalApply(recommendation);
  const appliedAt = new Date().toISOString();
  const canonical = writeBrandProfile({
    ...preview.proposed,
    updatedAt: appliedAt,
  });

  saveBrandOSRevisionRecord(createBrandOSRevisionRecord({
    recommendationId: recommendation.id,
    previous: preview.current,
    canonical,
    appliedAt,
    appliedBy: recommendation.reviewedBy ?? 'Current User',
    reason: recommendation.decisionReason ?? recommendation.reason,
  }));

  return canonical;
}
