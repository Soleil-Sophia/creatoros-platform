import { listFocusScoringLearningActionPlans } from './focusScoringLearningActionPlan';
import type { DecisionAttentionSignal } from './attention';
import type { PlatformRecommendation } from './types';

export type FocusScoringLearningActionTiming = 'on_track' | 'due_soon' | 'overdue' | 'closed';

function startOfDay(value: Date): number {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
}

export function getFocusScoringLearningActionTiming(
  targetDate: string,
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled',
  now = new Date(),
): FocusScoringLearningActionTiming {
  if (status === 'completed' || status === 'cancelled') return 'closed';
  const target = new Date(`${targetDate}T00:00:00`);
  if (Number.isNaN(target.getTime())) return 'on_track';
  const daysUntil = Math.ceil((startOfDay(target) - startOfDay(now)) / 86_400_000);
  if (daysUntil < 0) return 'overdue';
  if (daysUntil <= 3) return 'due_soon';
  return 'on_track';
}

export function deriveFocusScoringLearningActionPlanSignals(
  recommendations: PlatformRecommendation[],
  now = new Date(),
): DecisionAttentionSignal[] {
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));
  return listFocusScoringLearningActionPlans().flatMap((plan) => {
    const recommendation = recommendationById.get(plan.recommendationId);
    if (!recommendation) return [];
    const timing = getFocusScoringLearningActionTiming(plan.targetDate, plan.status, now);
    if (timing !== 'due_soon' && timing !== 'overdue') return [];

    return [{
      id: `${recommendation.id}:learning_action_${timing}:${plan.id}`,
      recommendationId: recommendation.id,
      type: timing === 'overdue' ? 'learning_action_overdue' : 'learning_action_due_soon',
      severity: timing === 'overdue' ? 'critical' : 'warning',
      title: timing === 'overdue' ? 'Learning action plan is overdue' : 'Learning action plan is due soon',
      summary: `${plan.proposedAction.replaceAll('_', ' ')} is ${plan.status.replaceAll('_', ' ')} under ${plan.owner} and due ${new Date(`${plan.targetDate}T00:00:00`).toLocaleDateString()}. The alert does not execute the planned action or alter scoring.`,
      actionLabel: 'Open action plan',
      actionHref: '/platform/decisionos/focus/scoring/learning-actions',
      detectedAt: plan.createdAt,
    } satisfies DecisionAttentionSignal];
  });
}
