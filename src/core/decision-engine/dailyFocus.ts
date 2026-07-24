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

const severityScore = {
  critical: 100,
  warning: 60,
  info: 30,
} as const;

const signalScore = {
  overdue: 30,
  critical: 25,
  manual_blocker: 22,
  dependency_blocker: 20,
  awaiting_review: 15,
  dependency_resolved: 10,
} as const;

const recommendationPriorityScore: Record<PlatformRecommendation['priority'], number> = {
  critical: 20,
  high: 12,
  medium: 6,
  low: 0,
};

function suggestedAction(signal: DecisionAttentionSignal): string {
  switch (signal.type) {
    case 'overdue':
      return 'Re-plan the deadline or complete the next operational action.';
    case 'critical':
      return 'Confirm ownership and execute the documented next action.';
    case 'manual_blocker':
      return 'Remove, escalate, or explicitly re-plan the manual blocker.';
    case 'dependency_blocker':
      return 'Advance the unresolved prerequisite decision first.';
    case 'awaiting_review':
      return 'Review the recommendation and record a human decision.';
    case 'dependency_resolved':
      return 'Resume the newly unblocked work item.';
  }
}

function rationaleFor(
  signal: DecisionAttentionSignal,
  recommendation: PlatformRecommendation,
  canonicalAdjustment: number,
): string[] {
  const rationale = [
    `${signal.severity} attention severity`,
    `${recommendation.priority} recommendation priority`,
  ];

  if (signal.type === 'overdue') rationale.push('the committed due date has passed');
  if (signal.type === 'critical') rationale.push('the work item is marked critically urgent');
  if (signal.type === 'manual_blocker') rationale.push('a manually recorded blocker prevents progress');
  if (signal.type === 'dependency_blocker') rationale.push('one or more prerequisite decisions remain unresolved');
  if (signal.type === 'awaiting_review') rationale.push('progress requires an explicit human decision');
  if (signal.type === 'dependency_resolved') rationale.push('prerequisites are resolved and work is actionable again');
  if (canonicalAdjustment !== 0) {
    rationale.push(`canonical ${canonicalAdjustment > 0 ? '+' : ''}${canonicalAdjustment}-point adjustment for ${signal.type.replaceAll('_', ' ')}`);
  }

  return rationale;
}

export function deriveDecisionDailyFocus(
  recommendations: PlatformRecommendation[],
  limit = 3,
): DecisionDailyFocusItem[] {
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));
  const visibleSignals = deriveDecisionAttentionSignals(recommendations).filter((signal) =>
    isDecisionAttentionSignalVisible(signal, getDecisionAttentionState(signal.id)),
  );

  return visibleSignals
    .map((signal) => {
      const recommendation = recommendationById.get(signal.recommendationId);
      if (!recommendation) return null;
      const canonicalAdjustment = getCanonicalFocusSignalAdjustment(signal.type);
      const score =
        severityScore[signal.severity] +
        signalScore[signal.type] +
        recommendationPriorityScore[recommendation.priority] +
        canonicalAdjustment;

      return {
        rank: 0,
        recommendationId: recommendation.id,
        recommendationTitle: recommendation.title,
        targetOS: recommendation.targetOS,
        signal,
        score,
        rationale: rationaleFor(signal, recommendation, canonicalAdjustment),
        suggestedAction: suggestedAction(signal),
        actionHref: signal.actionHref,
      } satisfies DecisionDailyFocusItem;
    })
    .filter((item): item is DecisionDailyFocusItem => item !== null)
    .sort((a, b) => b.score - a.score || a.recommendationTitle.localeCompare(b.recommendationTitle))
    .slice(0, Math.max(0, limit))
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
