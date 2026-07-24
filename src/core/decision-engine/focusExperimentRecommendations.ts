import type { FocusExperimentObservation } from './focusExperimentMeasurement';
import type { FocusScoringExperiment } from './focusExperiments';
import type { PlatformRecommendation } from './types';

export interface FocusExperimentRecommendationValue {
  experimentId: string;
  sourceRecommendationId: string;
  sourceObservationId: string;
  signalType: string;
  testedAdjustment: number;
  observationOutcome: FocusExperimentObservation['outcome'];
  baselineCompletionRate: number;
  treatmentCompletionRate: number;
  baselineAdoptionRate: number;
  treatmentAdoptionRate: number;
  proposedAction: 'consider_controlled_apply' | 'revise_and_retest' | 'collect_more_evidence';
  interpretation: string;
  limitations: string;
}

function actionFor(outcome: FocusExperimentObservation['outcome']): FocusExperimentRecommendationValue['proposedAction'] {
  if (outcome === 'supports_hypothesis') return 'consider_controlled_apply';
  if (outcome === 'does_not_support') return 'revise_and_retest';
  return 'collect_more_evidence';
}

function titleFor(experiment: FocusScoringExperiment, observation: FocusExperimentObservation): string {
  if (observation.outcome === 'supports_hypothesis') return `Review scoring change: ${experiment.signalType.replaceAll('_', ' ')}`;
  if (observation.outcome === 'does_not_support') return `Revise focus hypothesis: ${experiment.signalType.replaceAll('_', ' ')}`;
  return `Collect more focus evidence: ${experiment.signalType.replaceAll('_', ' ')}`;
}

export function hasOpenFocusExperimentRecommendation(
  experimentId: string,
  recommendations: PlatformRecommendation[],
): boolean {
  return recommendations.some((recommendation) =>
    recommendation.origin === 'intelligenceos' &&
    !['rejected', 'observed'].includes(recommendation.status) &&
    recommendation.changes.some((change) => {
      const value = change.recommendedValue as Partial<FocusExperimentRecommendationValue> | undefined;
      return change.path === 'focusExperimentOutcome' && value?.experimentId === experimentId;
    }),
  );
}

export function createFocusExperimentOutcomeRecommendation(
  experiment: FocusScoringExperiment,
  observation: FocusExperimentObservation,
  createdAt = new Date().toISOString(),
): PlatformRecommendation<FocusExperimentRecommendationValue> {
  if (experiment.status !== 'completed') throw new Error('Only a completed experiment can produce an outcome recommendation.');
  if (observation.experimentId !== experiment.id) throw new Error('Observation and experiment do not match.');

  const proposedAction = actionFor(observation.outcome);
  const value: FocusExperimentRecommendationValue = {
    experimentId: experiment.id,
    sourceRecommendationId: experiment.sourceRecommendationId,
    sourceObservationId: observation.id,
    signalType: experiment.signalType,
    testedAdjustment: experiment.scoreAdjustment,
    observationOutcome: observation.outcome,
    baselineCompletionRate: observation.baselineCompletionRate,
    treatmentCompletionRate: observation.treatmentCompletionRate,
    baselineAdoptionRate: observation.baselineAdoptionRate,
    treatmentAdoptionRate: observation.treatmentAdoptionRate,
    proposedAction,
    interpretation: observation.interpretation,
    limitations: observation.limitations,
  };

  const actionText = proposedAction === 'consider_controlled_apply'
    ? `Review whether the tested ${experiment.scoreAdjustment > 0 ? '+' : ''}${experiment.scoreAdjustment}-point adjustment should enter a separate controlled canonical-apply proposal.`
    : proposedAction === 'revise_and_retest'
      ? 'Revise the hypothesis or experiment design before testing another scoring adjustment.'
      : 'Collect a larger or better-controlled evidence sample before proposing a scoring change.';

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: titleFor(experiment, observation),
    summary: observation.interpretation,
    origin: 'intelligenceos',
    targetOS: 'decisionos',
    status: 'in_review',
    priority: observation.outcome === 'supports_hypothesis' ? 'medium' : 'low',
    confidence: observation.outcome === 'inconclusive' ? 'low' : 'medium',
    reason: `IntelligenceOS converted a completed focus experiment observation into a reviewable next step. Outcome: ${observation.outcome.replaceAll('_', ' ')}. The result remains observational and does not establish causation.`,
    expectedImpact: 'Turn experiment evidence into an explicit human decision without silently changing canonical Daily Focus scoring.',
    recommendedAction: actionText,
    changes: [{ path: 'focusExperimentOutcome', recommendedValue: value }],
    evidence: [
      {
        id: crypto.randomUUID(),
        type: 'analytics',
        source: `Focus experiment ${experiment.id}`,
        summary: `Baseline completion ${observation.baselineCompletionRate}% vs treatment ${observation.treatmentCompletionRate}%; baseline adoption ${observation.baselineAdoptionRate}% vs treatment ${observation.treatmentAdoptionRate}%. Interpretation: ${observation.interpretation} Limitations: ${observation.limitations}`,
        strength: observation.outcome === 'inconclusive' ? 'low' : 'medium',
        createdAt: observation.observedAt,
      },
    ],
    createdBy: 'IntelligenceOS',
    createdAt,
    updatedAt: createdAt,
    history: [
      { id: crypto.randomUUID(), action: 'created', actor: 'IntelligenceOS', reason: `Created from focus experiment observation ${observation.id}.`, createdAt },
      { id: crypto.randomUUID(), action: 'submitted', actor: 'IntelligenceOS', reason: 'Submitted for explicit human review. No canonical score was changed.', createdAt },
    ],
  };
}
