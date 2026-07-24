import { deriveFocusScoringGovernanceLedger } from './focusScoringGovernanceLedger';
import { getFocusScoringReviewCadenceStatus, getOpenFocusScoringReviewCadence } from './focusScoringReviewCadence';
import type { DecisionAttentionSignal } from './attention';
import type { PlatformRecommendation } from './types';

export function deriveFocusScoringReviewCadenceSignals(recommendations: PlatformRecommendation[]): DecisionAttentionSignal[] {
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));
  const signals: DecisionAttentionSignal[] = [];
  for (const entry of deriveFocusScoringGovernanceLedger()) {
    if (!entry.isCurrentValue || ['rolled_back', 'superseded'].includes(entry.health)) continue;
    const recommendation = recommendationById.get(entry.revision.sourceRecommendationId);
    if (!recommendation) continue;
    const review = getOpenFocusScoringReviewCadence(entry.revision.id);
    if (!review) continue;
    const status = getFocusScoringReviewCadenceStatus(review);
    if (status !== 'due_soon' && status !== 'overdue') continue;
    signals.push({
      id: `${recommendation.id}:governance_review_${status}:${review.id}`,
      recommendationId: recommendation.id,
      type: status === 'overdue' ? 'governance_rollback_review' : 'governance_monitoring',
      severity: status === 'overdue' ? 'critical' : 'warning',
      title: status === 'overdue' ? 'Scoring governance review is overdue' : 'Scoring governance review is due soon',
      summary: `Revision ${entry.revision.revision} for ${entry.revision.signalType.replaceAll('_', ' ')} is assigned to ${review.owner} and due ${new Date(review.reviewDueAt).toLocaleDateString()}. Completing the checkpoint does not itself maintain or roll back the scoring change.`,
      actionLabel: 'Open review cadence',
      actionHref: '/platform/decisionos/focus/scoring/reviews',
      detectedAt: review.createdAt,
    });
  }
  return signals;
}
