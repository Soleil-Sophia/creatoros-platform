import { markRecommendationObserved } from './engine';
import { createObservationRecord, listObservationRecords, saveObservationRecord } from './outcomes';
import { listFocusScoringResolutionEvidence } from './focusScoringResolutionEvidence';
import { saveRecommendation } from './storage';
import type { FocusScoringFollowupResolutionRecord } from './focusScoringFollowupResolution';
import type { FocusScoringResolutionVerificationRecord } from './focusScoringResolutionEvidence';
import type { ImplementationRecord, ObservationOutcome, ObservationRecord } from './outcomes';
import type { PlatformRecommendation } from './types';

export interface FocusScoringResolutionObservationPreview {
  recommendationId: string;
  implementationId: string;
  resolutionId: string;
  verificationId: string;
  evidenceCount: number;
  recommendationStatus: PlatformRecommendation['status'];
  canObserve: boolean;
  blockingReason?: string;
}

function validateLineage(input: {
  recommendation: PlatformRecommendation;
  implementation: ImplementationRecord;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
}): void {
  if (input.recommendation.status !== 'implemented') {
    throw new Error('Only an implemented recommendation can receive an outcome observation.');
  }
  if (input.implementation.recommendationId !== input.recommendation.id) {
    throw new Error('Implementation record and recommendation do not match.');
  }
  if (input.resolution.recommendationId !== input.recommendation.id) {
    throw new Error('Resolution and recommendation do not match.');
  }
  if (input.resolution.status !== 'completed') {
    throw new Error('The linked resolution must be completed.');
  }
  if (input.verification.resolutionId !== input.resolution.id || input.verification.outcome !== 'verified') {
    throw new Error('A verified resolution outcome is required.');
  }
}

export function previewFocusScoringResolutionObservation(input: {
  recommendation: PlatformRecommendation;
  implementation: ImplementationRecord;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
}): FocusScoringResolutionObservationPreview {
  let blockingReason: string | undefined;
  const evidence = listFocusScoringResolutionEvidence(input.resolution.id)
    .filter((item) => input.verification.evidenceIds.includes(item.id));

  try {
    validateLineage(input);
    if (evidence.length === 0) {
      blockingReason = 'The verification snapshot no longer contains an available evidence record.';
    } else if (listObservationRecords().some((item) => item.recommendationId === input.recommendation.id)) {
      blockingReason = 'An observation record already exists for this recommendation.';
    }
  } catch (error) {
    blockingReason = error instanceof Error ? error.message : 'Observation lineage is invalid.';
  }

  return {
    recommendationId: input.recommendation.id,
    implementationId: input.implementation.id,
    resolutionId: input.resolution.id,
    verificationId: input.verification.id,
    evidenceCount: evidence.length,
    recommendationStatus: input.recommendation.status,
    canObserve: !blockingReason,
    blockingReason,
  };
}

export function recordFocusScoringResolutionObservation(input: {
  recommendation: PlatformRecommendation;
  implementation: ImplementationRecord;
  resolution: FocusScoringFollowupResolutionRecord;
  verification: FocusScoringResolutionVerificationRecord;
  observedBy: string;
  outcome: ObservationOutcome;
  summary: string;
  metric?: string;
  measuredValue?: string;
  at?: string;
}): { recommendation: PlatformRecommendation; observation: ObservationRecord } {
  validateLineage(input);
  if (!input.observedBy.trim() || !input.summary.trim()) {
    throw new Error('Observer and outcome summary are required.');
  }
  const preview = previewFocusScoringResolutionObservation(input);
  if (!preview.canObserve) throw new Error(preview.blockingReason || 'This implementation cannot be observed.');

  const at = input.at || new Date().toISOString();
  const lineage = `Implementation ${input.implementation.id}; verified resolution ${input.resolution.id}; verification ${input.verification.id}.`;
  const observation = saveObservationRecord(createObservationRecord(
    input.recommendation,
    input.observedBy.trim(),
    input.outcome,
    `${input.summary.trim()} ${lineage}`,
    input.metric?.trim() || undefined,
    input.measuredValue?.trim() || undefined,
    at,
  ));
  const recommendation = saveRecommendation(markRecommendationObserved(
    input.recommendation,
    input.observedBy.trim(),
    `Outcome observation ${observation.id} recorded from verified resolution implementation ${input.implementation.id}.`,
    at,
  ));
  return { recommendation, observation };
}
