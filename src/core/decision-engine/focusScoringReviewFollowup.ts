import type { FocusScoringRevisionRecord } from './focusScoringCanonical';
import type { FocusScoringReviewCadenceRecord } from './focusScoringReviewCadence';
import type { PlatformRecommendation } from './types';

export type FocusScoringReviewFollowupOutcome = 'maintain_and_monitor' | 'collect_more_evidence' | 'review_rollback';

export interface FocusScoringReviewFollowupValue {
  reviewRecordId: string;
  revisionId: string;
  signalType: string;
  previousAdjustment: number;
  appliedAdjustment: number;
  outcome: FocusScoringReviewFollowupOutcome;
  reviewPurpose: string;
  completionNote: string;
  proposedAction: 'continue_monitoring' | 'open_new_measurement_window' | 'review_controlled_rollback';
}

export function hasOpenFocusScoringReviewFollowup(
  reviewRecordId: string,
  recommendations: PlatformRecommendation[],
): boolean {
  return recommendations.some((recommendation) =>
    !['rejected', 'observed'].includes(recommendation.status) &&
    recommendation.changes.some((change) => {
      const value = change.recommendedValue as Partial<FocusScoringReviewFollowupValue> | undefined;
      return change.path === 'focusScoringReviewFollowup' && value?.reviewRecordId === reviewRecordId;
    }),
  );
}

export function createFocusScoringReviewFollowupRecommendation(input: {
  review: FocusScoringReviewCadenceRecord;
  revision: FocusScoringRevisionRecord;
  outcome: FocusScoringReviewFollowupOutcome;
  createdBy: string;
  createdAt?: string;
}): PlatformRecommendation<FocusScoringReviewFollowupValue> {
  if (!input.review.completedAt || !input.review.completionNote) throw new Error('The governance checkpoint must be completed first.');
  if (input.review.revisionId !== input.revision.id) throw new Error('Review and scoring revision do not match.');
  if (!input.createdBy.trim()) throw new Error('Recommendation creator is required.');

  const createdAt = input.createdAt || new Date().toISOString();
  const proposedAction = input.outcome === 'review_rollback'
    ? 'review_controlled_rollback'
    : input.outcome === 'collect_more_evidence'
      ? 'open_new_measurement_window'
      : 'continue_monitoring';
  const value: FocusScoringReviewFollowupValue = {
    reviewRecordId: input.review.id,
    revisionId: input.revision.id,
    signalType: input.revision.signalType,
    previousAdjustment: input.revision.previousAdjustment,
    appliedAdjustment: input.revision.appliedAdjustment,
    outcome: input.outcome,
    reviewPurpose: input.review.reviewPurpose,
    completionNote: input.review.completionNote,
    proposedAction,
  };
  const label = input.revision.signalType.replaceAll('_', ' ');
  const recommendedAction = proposedAction === 'review_controlled_rollback'
    ? `Review the controlled rollback path from ${input.revision.appliedAdjustment} to ${input.revision.previousAdjustment} points for ${label}.`
    : proposedAction === 'open_new_measurement_window'
      ? `Open a new monitoring window for ${label} before making a maintain or rollback decision.`
      : `Maintain the current ${input.revision.appliedAdjustment}-point adjustment for ${label} while continuing scheduled monitoring.`;

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: `Review governance follow-up: ${label}`,
    summary: input.review.completionNote,
    origin: 'decisionos',
    targetOS: 'decisionos',
    status: 'in_review',
    priority: input.outcome === 'review_rollback' ? 'high' : 'medium',
    confidence: input.outcome === 'collect_more_evidence' ? 'low' : 'medium',
    reason: 'A completed governance checkpoint produced an explicit follow-up proposal. The checkpoint itself did not change canonical scoring.',
    expectedImpact: 'Convert scheduled governance review into a traceable human decision without silently maintaining or rolling back a scoring revision.',
    recommendedAction,
    changes: [{ path: 'focusScoringReviewFollowup', recommendedValue: value }],
    evidence: [{
      id: crypto.randomUUID(),
      type: 'human_feedback',
      source: `Governance review ${input.review.id}`,
      summary: `Purpose: ${input.review.reviewPurpose}. Completion note: ${input.review.completionNote}`,
      strength: 'medium',
      createdAt: input.review.completedAt,
    }],
    createdBy: input.createdBy.trim(),
    createdAt,
    updatedAt: createdAt,
    history: [
      { id: crypto.randomUUID(), action: 'created', actor: input.createdBy.trim(), reason: `Created from completed scoring governance review ${input.review.id}.`, createdAt },
      { id: crypto.randomUUID(), action: 'submitted', actor: input.createdBy.trim(), reason: 'Submitted for explicit human review. No canonical scoring state changed.', createdAt },
    ],
  };
}
