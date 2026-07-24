import { deriveDecisionAttentionSignals } from './attention';
import { getDecisionAttentionState, isDecisionAttentionSignalVisible } from './attentionState';
import { getCanonicalFocusSignalAdjustment } from './focusScoringCanonical';
import type { DecisionAttentionSignal } from './attention';
import type { PlatformRecommendation } from './types';

export interface DecisionDailyFocusItem {
  rank: number;
  recommendationId: string;
  recommendationTitle: string;
  targetOS: string;
  signal: DecisionAttentionSignal;
  score: number;
  rationale: string[];
  suggestedAction: string;
  actionHref: string;
}

const severityScore = { critical: 100, warning: 60, info: 30 } as const;
const signalScore = {
  overdue: 30,
  governance_review_overdue: 29,
  governance_rollback_review: 28,
  critical: 25,
  manual_blocker: 22,
  dependency_blocker: 20,
  governance_review_due: 19,
  governance_monitoring: 18,
  governance_inconclusive: 17,
  awaiting_review: 15,
  dependency_resolved: 10,
} as const;
const recommendationPriorityScore: Record<PlatformRecommendation['priority'], number> = { critical: 20, high: 12, medium: 6, low: 0 };

function suggestedAction(signal: DecisionAttentionSignal): string {
  switch (signal.type) {
    case 'overdue': return 'Re-plan the deadline or complete the next operational action.';
    case 'critical': return 'Confirm ownership and execute the documented next action.';
    case 'manual_blocker': return 'Remove, escalate, or explicitly re-plan the manual blocker.';
    case 'dependency_blocker': return 'Advance the unresolved prerequisite decision first.';
    case 'awaiting_review': return 'Review the recommendation and record a human decision.';
    case 'dependency_resolved': return 'Resume the newly unblocked work item.';
    case 'governance_monitoring': return 'Record before-and-after evidence for the active canonical scoring revision.';
    case 'governance_inconclusive': return 'Review the evidence limitations and define the next monitoring window.';
    case 'governance_rollback_review': return 'Review the controlled rollback recommendation and record a human decision.';
    case 'governance_review_due': return 'Complete the scheduled governance checkpoint before its due date.';
    case 'governance_review_overdue': return 'Complete the overdue governance checkpoint and document the outcome.';
  }
}

function rationaleFor(signal: DecisionAttentionSignal, recommendation: PlatformRecommendation, canonicalAdjustment: number): string[] {
  const rationale = [`${signal.severity} attention severity`, `${recommendation.priority} recommendation priority`];
  if (signal.type === 'overdue') rationale.push('the committed due date has passed');
  if (signal.type === 'critical') rationale.push('the work item is marked critically urgent');
  if (signal.type === 'manual_blocker') rationale.push('a manually recorded blocker prevents progress');
  if (signal.type === 'dependency_blocker') rationale.push('one or more prerequisite decisions remain unresolved');
  if (signal.type === 'awaiting_review') rationale.push('progress requires an explicit human decision');
  if (signal.type === 'dependency_resolved') rationale.push('prerequisites are resolved and work is actionable again');
  if (signal.type === 'governance_monitoring') rationale.push('an active canonical scoring revision has no post-apply observation');
  if (signal.type === 'governance_inconclusive') rationale.push('post-apply evidence is not sufficient for a maintain or rollback decision');
  if (signal.type === 'governance_rollback_review') rationale.push('post-apply monitoring recommends explicit rollback review');
  if (signal.type === 'governance_review_due') rationale.push('a scheduled scoring governance checkpoint is due within three days');
  if (signal.type === 'governance_review_overdue') rationale.push('a scheduled scoring governance checkpoint is overdue');
  if (canonicalAdjustment !== 0) rationale.push(`canonical ${canonicalAdjustment > 0 ? '+' : ''}${canonicalAdjustment}-point adjustment for ${signal.type.replaceAll('_', ' ')}`);
  return rationale;
}

export function deriveDecisionDailyFocus(recommendations: PlatformRecommendation[], limit = 3): DecisionDailyFocusItem[] {
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));
  const visibleSignals = deriveDecisionAttentionSignals(recommendations).filter((signal) => isDecisionAttentionSignalVisible(signal, getDecisionAttentionState(signal.id)));
  return visibleSignals
    .map((signal) => {
      const recommendation = recommendationById.get(signal.recommendationId);
      if (!recommendation) return null;
      const canonicalAdjustment = getCanonicalFocusSignalAdjustment(signal.type);
      const score = severityScore[signal.severity] + signalScore[signal.type] + recommendationPriorityScore[recommendation.priority] + canonicalAdjustment;
      return { rank: 0, recommendationId: recommendation.id, recommendationTitle: recommendation.title, targetOS: recommendation.targetOS, signal, score, rationale: rationaleFor(signal, recommendation, canonicalAdjustment), suggestedAction: suggestedAction(signal), actionHref: signal.actionHref } satisfies DecisionDailyFocusItem;
    })
    .filter((item): item is DecisionDailyFocusItem => item !== null)
    .sort((a, b) => b.score - a.score || a.recommendationTitle.localeCompare(b.recommendationTitle))
    .slice(0, Math.max(0, limit))
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
