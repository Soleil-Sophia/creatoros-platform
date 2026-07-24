import { markRecommendationCanonical, markRecommendationImplemented } from './engine';
import { createImplementationRecord, listImplementationRecords, saveImplementationRecord } from './outcomes';
import { listFocusScoringResolutionEvidence } from './focusScoringResolutionEvidence';
import { saveRecommendation } from './storage';
import type { FocusScoringFollowupResolutionRecord } from './focusScoringFollowupResolution';
import type { FocusScoringResolutionVerificationRecord } from './focusScoringResolutionEvidence';
import type { ImplementationRecord } from './outcomes';
import type { PlatformRecommendation } from './types';

export interface FocusScoringResolutionImplementationPreview {
  recommendationId: string;
  resolutionId: string;
  verificationId: string;
  recommendationStatus: PlatformRecommendation['status'];
  evidenceCount: number;
  evidenceReferences: string[];
  verificationNote: string;
  canCanonicalize: boolean;
  canImplement: boolean;
  blockingReason?: string;
}

function validateLineage(
  recommendation: PlatformRecommendation,
  resolution: FocusScoringFollowupResolutionRecord,
  verification: FocusScoringResolutionVerificationRecord,
): void {
  if (resolution.recommendationId !== recommendation.id) {
    throw new Error('Resolution and recommendation do not match.');
  }
  if (verification.resolutionId !== resolution.id) {
    throw new Error('Verification and resolution do not match.');
  }
  if (resolution.status !== 'completed') {
    throw new Error('Only a completed resolution can enter implementation recording.');
  }
  if (verification.outcome !== 'verified') {
    throw new Error('Only a verified resolution can enter implementation recording.');
  }
}

export function previewFocusScoringResolutionImplementation(input: {
  recommendation: PlatformRecommendation;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
}): FocusScoringResolutionImplementationPreview {
  const evidence = listFocusScoringResolutionEvidence(input.resolution.id)
    .filter((item) => input.verification.evidenceIds.includes(item.id));
  let blockingReason: string | undefined;

  try {
    validateLineage(input.recommendation, input.resolution, input.verification);
    if (evidence.length === 0) blockingReason = 'The verification snapshot contains no available evidence records.';
    else if (listImplementationRecords().some((item) => item.recommendationId === input.recommendation.id)) {
      blockingReason = 'An implementation record already exists for this recommendation.';
    } else if (!['approved', 'canonical'].includes(input.recommendation.status)) {
      blockingReason = `Recommendation status ${input.recommendation.status} is not eligible.`;
    }
  } catch (error) {
    blockingReason = error instanceof Error ? error.message : 'Implementation lineage is invalid.';
  }

  return {
    recommendationId: input.recommendation.id,
    resolutionId: input.resolution.id,
    verificationId: input.verification.id,
    recommendationStatus: input.recommendation.status,
    evidenceCount: evidence.length,
    evidenceReferences: evidence.map((item) => item.reference),
    verificationNote: input.verification.verificationNote,
    canCanonicalize: !blockingReason && input.recommendation.status === 'approved',
    canImplement: !blockingReason && input.recommendation.status === 'canonical',
    blockingReason,
  };
}

export function canonicalizeVerifiedFocusScoringResolution(input: {
  recommendation: PlatformRecommendation;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
  actor: string;
  reason: string;
  at?: string;
}): PlatformRecommendation {
  validateLineage(input.recommendation, input.resolution, input.verification);
  if (!input.actor.trim() || !input.reason.trim()) throw new Error('Actor and canonicalization reason are required.');
  const preview = previewFocusScoringResolutionImplementation(input);
  if (!preview.canCanonicalize) throw new Error(preview.blockingReason || 'Recommendation cannot be canonicalized from this resolution.');
  const updated = markRecommendationCanonical(
    input.recommendation,
    input.actor.trim(),
    input.reason.trim(),
    input.at || new Date().toISOString(),
  );
  return saveRecommendation(updated);
}

export function recordVerifiedFocusScoringResolutionImplementation(input: {
  recommendation: PlatformRecommendation;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
  implementedBy: string;
  summary: string;
  at?: string;
}): { recommendation: PlatformRecommendation; implementation: ImplementationRecord } {
  validateLineage(input.recommendation, input.resolution, input.verification);
  if (!input.implementedBy.trim() || !input.summary.trim()) throw new Error('Implementer and implementation summary are required.');
  const preview = previewFocusScoringResolutionImplementation(input);
  if (!preview.canImplement) throw new Error(preview.blockingReason || 'Recommendation must be canonical before implementation is recorded.');

  const at = input.at || new Date().toISOString();
  const evidence = `Verified resolution ${input.resolution.id}; verification ${input.verification.id}; evidence: ${preview.evidenceReferences.join(', ')}`;
  const implementation = saveImplementationRecord(createImplementationRecord(
    input.recommendation,
    input.implementedBy.trim(),
    input.summary.trim(),
    evidence,
    at,
  ));
  const recommendation = saveRecommendation(markRecommendationImplemented(
    input.recommendation,
    input.implementedBy.trim(),
    `Implementation recorded from verified resolution ${input.resolution.id}.`,
    at,
  ));
  return { recommendation, implementation };
}
