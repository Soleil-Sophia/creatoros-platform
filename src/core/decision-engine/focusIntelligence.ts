import { deriveDecisionFocusHistory } from './focusHistory';
import type { DecisionFocusHistoryItem } from './focusHistory';
import type { PlatformRecommendation } from './types';

export type FocusLearningPatternType =
  | 'frequently_promoted'
  | 'frequently_deferred'
  | 'human_reordering';

export interface FocusLearningPattern {
  id: string;
  type: FocusLearningPatternType;
  signalType: string;
  sampleSize: number;
  completedCount: number;
  deferredCount: number;
  promotedCount: number;
  reorderedCount: number;
  completionRate: number;
  confidence: PlatformRecommendation['confidence'];
  summary: string;
  evidenceDates: string[];
}

export interface FocusLearningRecommendationValue {
  patternId: string;
  patternType: FocusLearningPatternType;
  signalType: string;
  sampleSize: number;
  hypothesis: string;
  proposedExperiment: string;
  evidenceDates: string[];
}

function signalTypeFromId(signalId: string): string {
  const separator = signalId.lastIndexOf(':');
  return separator >= 0 ? signalId.slice(separator + 1) : 'unknown';
}

function confidenceFor(sampleSize: number, rate: number): PlatformRecommendation['confidence'] {
  if (sampleSize >= 6 && rate >= 0.75) return 'high';
  if (sampleSize >= 3 && rate >= 0.6) return 'medium';
  return 'low';
}

function patternFor(signalType: string, datedItems: Array<{ date: string; item: DecisionFocusHistoryItem }>): FocusLearningPattern[] {
  const sampleSize = datedItems.length;
  if (sampleSize < 3) return [];

  const completedCount = datedItems.filter(({ item }) => item.status === 'completed').length;
  const deferredCount = datedItems.filter(({ item }) => item.status === 'deferred').length;
  const promotedCount = datedItems.filter(({ item }) => item.plannedOrder < item.recommendedOrder).length;
  const reorderedCount = datedItems.filter(({ item }) => item.plannedOrder !== item.recommendedOrder).length;
  const completionRate = completedCount / sampleSize;
  const evidenceDates = [...new Set(datedItems.map(({ date }) => date))].sort();
  const patterns: FocusLearningPattern[] = [];

  if (promotedCount >= 3 && promotedCount / sampleSize >= 0.6 && completionRate >= 0.6) {
    patterns.push({
      id: `focus-pattern:${signalType}:frequently_promoted`,
      type: 'frequently_promoted',
      signalType,
      sampleSize,
      completedCount,
      deferredCount,
      promotedCount,
      reorderedCount,
      completionRate: Math.round(completionRate * 100),
      confidence: confidenceFor(sampleSize, Math.min(promotedCount / sampleSize, completionRate)),
      summary: `${signalType.replaceAll('_', ' ')} work was repeatedly promoted above its suggested rank and was completed in ${Math.round(completionRate * 100)}% of recorded cases.`,
      evidenceDates,
    });
  }

  if (deferredCount >= 3 && deferredCount / sampleSize >= 0.6) {
    patterns.push({
      id: `focus-pattern:${signalType}:frequently_deferred`,
      type: 'frequently_deferred',
      signalType,
      sampleSize,
      completedCount,
      deferredCount,
      promotedCount,
      reorderedCount,
      completionRate: Math.round(completionRate * 100),
      confidence: confidenceFor(sampleSize, deferredCount / sampleSize),
      summary: `${signalType.replaceAll('_', ' ')} work was deferred in ${Math.round((deferredCount / sampleSize) * 100)}% of recorded cases.`,
      evidenceDates,
    });
  }

  if (reorderedCount >= 3 && reorderedCount / sampleSize >= 0.75) {
    patterns.push({
      id: `focus-pattern:${signalType}:human_reordering`,
      type: 'human_reordering',
      signalType,
      sampleSize,
      completedCount,
      deferredCount,
      promotedCount,
      reorderedCount,
      completionRate: Math.round(completionRate * 100),
      confidence: confidenceFor(sampleSize, reorderedCount / sampleSize),
      summary: `${signalType.replaceAll('_', ' ')} work was moved away from its suggested rank in ${Math.round((reorderedCount / sampleSize) * 100)}% of recorded cases.`,
      evidenceDates,
    });
  }

  return patterns;
}

export function deriveFocusLearningPatterns(): FocusLearningPattern[] {
  const grouped = new Map<string, Array<{ date: string; item: DecisionFocusHistoryItem }>>();

  for (const day of deriveDecisionFocusHistory()) {
    for (const item of day.items) {
      const signalType = signalTypeFromId(item.signalId);
      const current = grouped.get(signalType) || [];
      current.push({ date: day.date, item });
      grouped.set(signalType, current);
    }
  }

  return [...grouped.entries()]
    .flatMap(([signalType, items]) => patternFor(signalType, items))
    .sort((a, b) => {
      const rank = { high: 3, medium: 2, low: 1 } as const;
      return rank[b.confidence] - rank[a.confidence] || b.sampleSize - a.sampleSize;
    });
}

export function hasOpenFocusLearningRecommendation(
  patternId: string,
  recommendations: PlatformRecommendation[],
): boolean {
  return recommendations.some((recommendation) =>
    recommendation.origin === 'intelligenceos' &&
    !['rejected', 'observed'].includes(recommendation.status) &&
    recommendation.changes.some((change) => {
      const value = change.recommendedValue as Partial<FocusLearningRecommendationValue> | undefined;
      return change.path === 'focusLearningHypothesis' && value?.patternId === patternId;
    }),
  );
}

function hypothesisFor(pattern: FocusLearningPattern): string {
  switch (pattern.type) {
    case 'frequently_promoted':
      return `The current Daily Focus scoring may underweight ${pattern.signalType.replaceAll('_', ' ')} work in the recorded operating context.`;
    case 'frequently_deferred':
      return `${pattern.signalType.replaceAll('_', ' ')} work may need better readiness, ownership, or effort context before it enters the daily top three.`;
    case 'human_reordering':
      return `The suggested position for ${pattern.signalType.replaceAll('_', ' ')} work may not reflect recurring human context that is absent from the current score.`;
  }
}

function experimentFor(pattern: FocusLearningPattern): string {
  switch (pattern.type) {
    case 'frequently_promoted':
      return `Run a time-boxed experiment that adds a small, explicit scoring bonus for ${pattern.signalType.replaceAll('_', ' ')} signals, then compare plan adoption and completion without changing canonical weights permanently.`;
    case 'frequently_deferred':
      return `Test a readiness gate or required effort estimate for ${pattern.signalType.replaceAll('_', ' ')} signals before ranking them in Daily Focus.`;
    case 'human_reordering':
      return `Collect a structured override reason when ${pattern.signalType.replaceAll('_', ' ')} items are reordered, then evaluate whether one missing context field explains the pattern.`;
  }
}

export function createFocusLearningRecommendation(
  pattern: FocusLearningPattern,
  createdAt = new Date().toISOString(),
): PlatformRecommendation<FocusLearningRecommendationValue> {
  const hypothesis = hypothesisFor(pattern);
  const proposedExperiment = experimentFor(pattern);
  const value: FocusLearningRecommendationValue = {
    patternId: pattern.id,
    patternType: pattern.type,
    signalType: pattern.signalType,
    sampleSize: pattern.sampleSize,
    hypothesis,
    proposedExperiment,
    evidenceDates: pattern.evidenceDates,
  };

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: `Focus learning hypothesis: ${pattern.signalType.replaceAll('_', ' ')}`,
    summary: pattern.summary,
    origin: 'intelligenceos',
    targetOS: 'decisionos',
    status: 'in_review',
    priority: pattern.type === 'frequently_deferred' ? 'medium' : 'low',
    confidence: pattern.confidence,
    reason: `IntelligenceOS detected a repeated descriptive pattern across ${pattern.sampleSize} focus-plan records. This is a hypothesis, not proof of causation or a validated scoring rule.`,
    expectedImpact: 'Improve future Daily Focus experiments through explicit, reviewable evidence while preserving human authority and canonical scoring controls.',
    recommendedAction: proposedExperiment,
    changes: [{ path: 'focusLearningHypothesis', recommendedValue: value }],
    evidence: pattern.evidenceDates.map((date) => ({
      id: crypto.randomUUID(),
      type: 'analytics',
      source: `DecisionOS Focus History ${date}`,
      summary: `This date contributed a ${pattern.signalType.replaceAll('_', ' ')} focus record to pattern ${pattern.id}.`,
      strength: pattern.confidence,
      createdAt: `${date}T12:00:00.000Z`,
    })),
    createdBy: 'IntelligenceOS',
    createdAt,
    updatedAt: createdAt,
    history: [
      {
        id: crypto.randomUUID(),
        action: 'created',
        actor: 'IntelligenceOS',
        reason: `Created from focus history pattern ${pattern.id}.`,
        createdAt,
      },
      {
        id: crypto.randomUUID(),
        action: 'submitted',
        actor: 'IntelligenceOS',
        reason: 'Submitted for explicit human review. No scoring weights were changed.',
        createdAt,
      },
    ],
  };
}
