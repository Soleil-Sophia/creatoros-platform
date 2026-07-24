import { listAllDecisionFocusExecutionItems, listDecisionFocusDayCloses } from './focusExecution';
import { listDecisionFocusPlans } from './focusPlan';
import type { DecisionFocusDayClose, DecisionFocusExecutionItem, FocusExecutionStatus } from './focusExecution';
import type { DecisionFocusPlan } from './focusPlan';

export interface DecisionFocusHistoryItem {
  signalId: string;
  recommendationId: string;
  title: string;
  plannedOrder: number;
  recommendedOrder: number;
  originalScore: number;
  status: FocusExecutionStatus;
  alignment: 'same_rank' | 'reordered' | 'not_executed';
}

export interface DecisionFocusHistoryDay {
  date: string;
  plan: DecisionFocusPlan;
  executionItems: DecisionFocusExecutionItem[];
  close: DecisionFocusDayClose | null;
  items: DecisionFocusHistoryItem[];
  completedCount: number;
  deferredCount: number;
  executionRate: number;
  planChangedFromRecommendation: boolean;
}

export interface DecisionFocusHistorySummary {
  daysPlanned: number;
  daysClosed: number;
  totalPlannedItems: number;
  totalCompletedItems: number;
  totalDeferredItems: number;
  completionRate: number;
  reorderedPlanDays: number;
}

export function deriveDecisionFocusHistory(): DecisionFocusHistoryDay[] {
  const executions = listAllDecisionFocusExecutionItems();
  const closes = listDecisionFocusDayCloses();

  return listDecisionFocusPlans().map((plan) => {
    const dayExecutions = executions.filter((item) => item.date === plan.date);
    const close = closes.find((item) => item.date === plan.date) ?? null;
    const items = plan.items.map((planned) => {
      const execution = dayExecutions.find((item) => item.signalId === planned.signalId);
      return {
        signalId: planned.signalId,
        recommendationId: planned.recommendationId,
        title: planned.title,
        plannedOrder: planned.order,
        recommendedOrder: planned.originalRank,
        originalScore: planned.originalScore,
        status: execution?.status || 'planned',
        alignment: !execution
          ? 'not_executed'
          : planned.order === planned.originalRank
            ? 'same_rank'
            : 'reordered',
      } satisfies DecisionFocusHistoryItem;
    });
    const completedCount = items.filter((item) => item.status === 'completed').length;
    const deferredCount = items.filter((item) => item.status === 'deferred').length;

    return {
      date: plan.date,
      plan,
      executionItems: dayExecutions,
      close,
      items,
      completedCount,
      deferredCount,
      executionRate: items.length === 0 ? 0 : Math.round((completedCount / items.length) * 100),
      planChangedFromRecommendation: items.some((item) => item.plannedOrder !== item.recommendedOrder),
    } satisfies DecisionFocusHistoryDay;
  });
}

export function summarizeDecisionFocusHistory(days: DecisionFocusHistoryDay[]): DecisionFocusHistorySummary {
  const totalPlannedItems = days.reduce((sum, day) => sum + day.items.length, 0);
  const totalCompletedItems = days.reduce((sum, day) => sum + day.completedCount, 0);
  const totalDeferredItems = days.reduce((sum, day) => sum + day.deferredCount, 0);

  return {
    daysPlanned: days.length,
    daysClosed: days.filter((day) => day.close).length,
    totalPlannedItems,
    totalCompletedItems,
    totalDeferredItems,
    completionRate: totalPlannedItems === 0 ? 0 : Math.round((totalCompletedItems / totalPlannedItems) * 100),
    reorderedPlanDays: days.filter((day) => day.planChangedFromRecommendation).length,
  };
}
