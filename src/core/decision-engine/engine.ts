import type {
  DecisionAction,
  DecisionHistoryEntry,
  DecisionRecord,
  PlatformRecommendation,
  RecommendationStatus,
} from './types';

function createHistoryEntry(
  action: DecisionHistoryEntry['action'],
  actor: string,
  reason: string | undefined,
  createdAt: string,
): DecisionHistoryEntry {
  return {
    id: crypto.randomUUID(),
    action,
    actor,
    reason,
    createdAt,
  };
}

function nextStatusFor(action: Exclude<DecisionAction, 'edit'>): RecommendationStatus {
  if (action === 'approve') return 'approved';
  if (action === 'reject') return 'rejected';
  return 'deferred';
}

export function submitRecommendation<TValue>(
  recommendation: PlatformRecommendation<TValue>,
  actor: string,
  submittedAt: string,
): PlatformRecommendation<TValue> {
  if (recommendation.status !== 'draft' && recommendation.status !== 'recommended') {
    throw new Error(`Cannot submit recommendation from status ${recommendation.status}.`);
  }

  return {
    ...recommendation,
    status: 'in_review',
    updatedAt: submittedAt,
    history: [
      ...recommendation.history,
      createHistoryEntry('submitted', actor, undefined, submittedAt),
    ],
  };
}

export function decideRecommendation<TValue>(
  recommendation: PlatformRecommendation<TValue>,
  action: Exclude<DecisionAction, 'edit'>,
  actor: string,
  reason: string,
  decidedAt: string,
  deferredUntil?: string,
): { recommendation: PlatformRecommendation<TValue>; decision: DecisionRecord } {
  if (recommendation.status !== 'in_review' && recommendation.status !== 'recommended') {
    throw new Error(`Cannot decide recommendation from status ${recommendation.status}.`);
  }

  const resultingStatus = nextStatusFor(action);
  const nextRecommendation: PlatformRecommendation<TValue> = {
    ...recommendation,
    status: resultingStatus,
    reviewedBy: actor,
    reviewedAt: decidedAt,
    decisionReason: reason,
    deferredUntil: action === 'defer' ? deferredUntil : undefined,
    updatedAt: decidedAt,
    history: [
      ...recommendation.history,
      createHistoryEntry(action, actor, reason, decidedAt),
    ],
  };

  const decision: DecisionRecord = {
    id: crypto.randomUUID(),
    recommendationId: recommendation.id,
    action,
    decidedBy: actor,
    reason,
    decidedAt,
    targetOS: recommendation.targetOS,
    resultingStatus,
  };

  return { recommendation: nextRecommendation, decision };
}

export function editRecommendation<TValue>(
  recommendation: PlatformRecommendation<TValue>,
  changes: PlatformRecommendation<TValue>['changes'],
  actor: string,
  reason: string,
  editedAt: string,
): PlatformRecommendation<TValue> {
  if (recommendation.status === 'canonical' || recommendation.status === 'implemented' || recommendation.status === 'observed') {
    throw new Error(`Cannot edit recommendation from status ${recommendation.status}.`);
  }

  return {
    ...recommendation,
    changes,
    status: 'in_review',
    updatedAt: editedAt,
    history: [
      ...recommendation.history,
      createHistoryEntry('edited', actor, reason, editedAt),
    ],
  };
}

export function markRecommendationCanonical<TValue>(
  recommendation: PlatformRecommendation<TValue>,
  actor: string,
  reason: string,
  canonicalizedAt: string,
): PlatformRecommendation<TValue> {
  if (recommendation.status !== 'approved') {
    throw new Error(`Cannot canonicalize recommendation from status ${recommendation.status}.`);
  }

  return {
    ...recommendation,
    status: 'canonical',
    updatedAt: canonicalizedAt,
    history: [
      ...recommendation.history,
      createHistoryEntry('canonicalized', actor, reason, canonicalizedAt),
    ],
  };
}
