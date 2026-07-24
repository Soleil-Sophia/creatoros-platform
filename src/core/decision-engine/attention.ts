import { getUnresolvedBlockingDependencies, listDecisionDependencies } from './dependencies';
import { getDecisionOperationalMetadata, isOperationallyOverdue } from './operationalMetadata';
import type { PlatformRecommendation } from './types';

export type AttentionSignalType =
  | 'critical'
  | 'overdue'
  | 'manual_blocker'
  | 'dependency_blocker'
  | 'dependency_resolved'
  | 'awaiting_review';

export type AttentionSeverity = 'info' | 'warning' | 'critical';

export interface DecisionAttentionSignal {
  id: string;
  recommendationId: string;
  type: AttentionSignalType;
  severity: AttentionSeverity;
  title: string;
  summary: string;
  actionLabel: string;
  actionHref: string;
  detectedAt: string;
}

const activeReviewStatuses = new Set(['recommended', 'in_review']);

function signal(
  recommendation: PlatformRecommendation,
  type: AttentionSignalType,
  severity: AttentionSeverity,
  title: string,
  summary: string,
  actionLabel: string,
  actionHref: string,
): DecisionAttentionSignal {
  return {
    id: `${recommendation.id}:${type}`,
    recommendationId: recommendation.id,
    type,
    severity,
    title,
    summary,
    actionLabel,
    actionHref,
    detectedAt: new Date().toISOString(),
  };
}

export function deriveDecisionAttentionSignals(
  recommendations: PlatformRecommendation[],
): DecisionAttentionSignal[] {
  const dependencies = listDecisionDependencies();
  const signals: DecisionAttentionSignal[] = [];

  for (const recommendation of recommendations) {
    const metadata = getDecisionOperationalMetadata(recommendation.id);
    const unresolved = getUnresolvedBlockingDependencies(recommendation.id, recommendations);
    const resolvedDependencies = dependencies.filter(
      (dependency) =>
        dependency.blockedRecommendationId === recommendation.id &&
        !unresolved.some((item) => item.id === dependency.id),
    );

    if (metadata?.urgency === 'critical' && !['rejected', 'observed'].includes(recommendation.status)) {
      signals.push(signal(
        recommendation,
        'critical',
        'critical',
        'Critical work item',
        metadata.nextAction || 'This recommendation is marked as critically urgent.',
        'Open work item',
        '/platform/decisionos/work',
      ));
    }

    if (metadata && isOperationallyOverdue(metadata) && !['rejected', 'observed'].includes(recommendation.status)) {
      signals.push(signal(
        recommendation,
        'overdue',
        'critical',
        'Due date missed',
        `This item was due ${new Date(metadata.dueAt!).toLocaleDateString()}.`,
        'Review deadline',
        '/platform/decisionos/work',
      ));
    }

    if (metadata?.isBlocked) {
      signals.push(signal(
        recommendation,
        'manual_blocker',
        'warning',
        'Manual blocker requires attention',
        metadata.blockerReason || 'A manual blocker is preventing progress.',
        'Open work item',
        '/platform/decisionos/work?filter=blocked',
      ));
    }

    if (unresolved.length > 0) {
      signals.push(signal(
        recommendation,
        'dependency_blocker',
        'warning',
        'Waiting on prerequisite decisions',
        `${unresolved.length} unresolved ${unresolved.length === 1 ? 'dependency is' : 'dependencies are'} blocking progress.`,
        'Inspect dependencies',
        '/platform/decisionos/dependencies',
      ));
    } else if (resolvedDependencies.length > 0 && !['implemented', 'observed', 'rejected'].includes(recommendation.status)) {
      signals.push(signal(
        recommendation,
        'dependency_resolved',
        'info',
        'Prerequisites resolved',
        'All recorded dependencies are resolved. This item can move forward.',
        'Open decision record',
        `/platform/decisionos/decision/${recommendation.id}`,
      ));
    }

    if (activeReviewStatuses.has(recommendation.status)) {
      signals.push(signal(
        recommendation,
        'awaiting_review',
        recommendation.priority === 'critical' ? 'critical' : 'info',
        'Human decision required',
        recommendation.recommendedAction,
        'Review recommendation',
        '/platform/decisions/review',
      ));
    }
  }

  const severityRank: Record<AttentionSeverity, number> = { critical: 3, warning: 2, info: 1 };
  return signals.sort((a, b) => severityRank[b.severity] - severityRank[a.severity]);
}
