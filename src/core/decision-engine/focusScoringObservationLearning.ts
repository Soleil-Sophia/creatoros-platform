import type { ObservationRecord } from './outcomes';
import type { PlatformRecommendation } from './types';

export type FocusScoringObservationLearningAction =
  | 'maintain_and_monitor'
  | 'measure_again'
  | 'review_revision_or_rollback'
  | 'collect_more_evidence';

export interface FocusScoringObservationLearningValue {
  sourceRecommendationId: string;
  observationId: string;
  outcome: ObservationRecord['outcome'];
  metric?: string;
  measuredValue?: string;
  observationSummary: string;
  proposedAction: FocusScoringObservationLearningAction;
}

function actionFor(outcome: ObservationRecord['outcome']): FocusScoringObservationLearningAction {
  if (outcome === 'positive') return 'maintain_and_monitor';
  if (outcome === 'negative') return 'review_revision_or_rollback';
  if (outcome === 'neutral') return 'measure_again';
  return 'collect_more_evidence';
}

export function hasOpenFocusScoringObservationLearningRecommendation(
  observationId: string,
  recommendations: PlatformRecommendation[],
): boolean {
  return recommendations.some((recommendation) =>
    !['rejected', 'observed'].includes(recommendation.status) &&
    recommendation.changes.some((change) => {
      const value = change.recommendedValue as Partial<FocusScoringObservationLearningValue> | undefined;
      return change.path === 'focusScoringObservationLearning' && value?.observationId === observationId;
    }),
  );
}

export function createFocusScoringObservationLearningRecommendation(input: {
  sourceRecommendation: PlatformRecommendation;
  observation: ObservationRecord;
  createdBy: string;
  createdAt?: string;
}): PlatformRecommendation<FocusScoringObservationLearningValue> {
  if (input.sourceRecommendation.status !== 'observed') {
    throw new Error('Only an observed recommendation can produce an IntelligenceOS learning recommendation.');
  }
  if (input.observation.recommendationId !== input.sourceRecommendation.id) {
    throw new Error('Observation and source recommendation do not match.');
  }
  if (!input.createdBy.trim()) throw new Error('Recommendation creator is required.');

  const createdAt = input.createdAt || new Date().toISOString();
  const proposedAction = actionFor(input.observation.outcome);
  const value: FocusScoringObservationLearningValue = {
    sourceRecommendationId: input.sourceRecommendation.id,
    observationId: input.observation.id,
    outcome: input.observation.outcome,
    metric: input.observation.metric,
    measuredValue: input.observation.measuredValue,
    observationSummary: input.observation.summary,
    proposedAction,
  };

  const recommendedAction = proposedAction === 'maintain_and_monitor'
    ? 'Keep the governed action in place and continue scheduled monitoring without treating the positive observation as causal proof.'
    : proposedAction === 'review_revision_or_rollback'
      ? 'Review whether the governed action should be revised or enter the controlled rollback path. Do not reverse it automatically.'
      : proposedAction === 'measure_again'
        ? 'Open another bounded observation window and define a more discriminating metric before changing the governed action.'
        : 'Collect more evidence before making a maintain, revise or rollback decision.';

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: `Learning from observed scoring outcome: ${input.observation.outcome}`,
    summary: input.observation.summary,
    origin: 'intelligenceos',
    targetOS: 'decisionos',
    status: 'in_review',
    priority: input.observation.outcome === 'negative' ? 'high' : 'medium',
    confidence: input.observation.outcome === 'positive' || input.observation.outcome === 'negative' ? 'medium' : 'low',
    reason: 'A completed and verified governance action produced a later human observation. The observation is evidence for review, not proof of causality.',
    expectedImpact: 'Convert an observed result into a controlled next-step proposal while preserving human review and the existing canonical state.',
    recommendedAction,
    changes: [{ path: 'focusScoringObservationLearning', recommendedValue: value }],
    evidence: [{
      id: crypto.randomUUID(),
      type: 'analytics',
      source: `Observation ${input.observation.id}`,
      summary: `${input.observation.outcome}: ${input.observation.summary}`,
      strength: input.observation.outcome === 'positive' || input.observation.outcome === 'negative' ? 'medium' : 'low',
      createdAt: input.observation.observedAt,
    }],
    createdBy: input.createdBy.trim(),
    createdAt,
    updatedAt: createdAt,
    history: [
      { id: crypto.randomUUID(), action: 'created', actor: input.createdBy.trim(), reason: `Created from observation ${input.observation.id}.`, createdAt },
      { id: crypto.randomUUID(), action: 'submitted', actor: input.createdBy.trim(), reason: 'Submitted for human review. No scoring or governance state changed.', createdAt },
    ],
  };
}
