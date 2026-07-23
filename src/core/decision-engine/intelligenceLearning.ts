import type { ObservationRecord } from './outcomes';
import type { PlatformRecommendation } from './types';

export interface IntelligenceLearningValue {
  sourceRecommendationId: string;
  sourceObservationId: string;
  observedOutcome: ObservationRecord['outcome'];
  learningSummary: string;
  proposedNextAction: string;
  measurementHint?: string;
}

function confidenceFor(outcome: ObservationRecord['outcome']): PlatformRecommendation['confidence'] {
  if (outcome === 'positive' || outcome === 'negative') return 'medium';
  return 'low';
}

function priorityFor(outcome: ObservationRecord['outcome']): PlatformRecommendation['priority'] {
  if (outcome === 'negative') return 'high';
  if (outcome === 'positive') return 'medium';
  return 'low';
}

export function createIntelligenceLearningRecommendation(
  observation: ObservationRecord,
  sourceRecommendation: PlatformRecommendation,
  learningSummary: string,
  proposedNextAction: string,
  createdAt = new Date().toISOString(),
): PlatformRecommendation<IntelligenceLearningValue> {
  if (sourceRecommendation.status !== 'observed') {
    throw new Error('IntelligenceOS learning recommendations require an observed source recommendation.');
  }
  if (observation.recommendationId !== sourceRecommendation.id) {
    throw new Error('Observation and source recommendation do not match.');
  }

  const value: IntelligenceLearningValue = {
    sourceRecommendationId: sourceRecommendation.id,
    sourceObservationId: observation.id,
    observedOutcome: observation.outcome,
    learningSummary,
    proposedNextAction,
    measurementHint: observation.metric
      ? `Continue measuring ${observation.metric}${observation.measuredValue ? `; latest value: ${observation.measuredValue}` : ''}.`
      : undefined,
  };

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: `Learning follow-up: ${sourceRecommendation.title}`,
    summary: learningSummary,
    origin: 'intelligenceos',
    targetOS: sourceRecommendation.targetOS,
    status: 'in_review',
    priority: priorityFor(observation.outcome),
    confidence: confidenceFor(observation.outcome),
    reason: `IntelligenceOS created this proposal from an observed ${observation.outcome} outcome. Human review is required before any next action.`,
    expectedImpact: 'Turn measured product evidence into a controlled, reviewable next action without changing canonical rules automatically.',
    recommendedAction: proposedNextAction,
    changes: [
      {
        path: 'learningFollowUp',
        recommendedValue: value,
      },
    ],
    evidence: [
      {
        id: crypto.randomUUID(),
        type: 'analytics',
        source: `Observation ${observation.id}`,
        summary: [
          observation.summary,
          observation.metric ? `Metric: ${observation.metric}.` : '',
          observation.measuredValue ? `Measured value: ${observation.measuredValue}.` : '',
        ].filter(Boolean).join(' '),
        strength: confidenceFor(observation.outcome),
        createdAt: observation.observedAt,
      },
    ],
    createdBy: 'IntelligenceOS',
    createdAt,
    updatedAt: createdAt,
    history: [
      {
        id: crypto.randomUUID(),
        action: 'created',
        actor: 'IntelligenceOS',
        reason: `Created from observation ${observation.id}.`,
        createdAt,
      },
      {
        id: crypto.randomUUID(),
        action: 'submitted',
        actor: 'IntelligenceOS',
        reason: 'Submitted for explicit human review.',
        createdAt,
      },
    ],
  };
}
