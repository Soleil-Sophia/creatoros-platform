import { listFocusExperimentObservations } from './focusExperimentMeasurement';
import { listFocusScoringExperiments } from './focusExperiments';
import { getCanonicalFocusScoringConfig, listFocusScoringRevisionRecords } from './focusScoringCanonical';
import { listFocusScoringMonitoringObservations } from './focusScoringMonitoring';
import { listRecommendations } from './storage';
import type { FocusExperimentObservation } from './focusExperimentMeasurement';
import type { FocusScoringExperiment } from './focusExperiments';
import type { FocusScoringRevisionRecord } from './focusScoringCanonical';
import type { FocusScoringMonitoringObservation } from './focusScoringMonitoring';
import type { PlatformRecommendation } from './types';

export type FocusScoringGovernanceHealth =
  | 'active_unmonitored'
  | 'monitoring_inconclusive'
  | 'maintain_recommended'
  | 'rollback_review_recommended'
  | 'rolled_back'
  | 'superseded';

export interface FocusScoringGovernanceLedgerEntry {
  revision: FocusScoringRevisionRecord;
  sourceOutcomeRecommendation: PlatformRecommendation | null;
  experiment: FocusScoringExperiment | null;
  experimentObservation: FocusExperimentObservation | null;
  monitoringObservation: FocusScoringMonitoringObservation | null;
  monitoringRecommendation: PlatformRecommendation | null;
  currentSignalAdjustment: number;
  isCurrentValue: boolean;
  health: FocusScoringGovernanceHealth;
  timeline: Array<{
    stage: string;
    label: string;
    status: 'complete' | 'pending' | 'warning';
    at?: string;
  }>;
}

function recommendedValue<T>(recommendation: PlatformRecommendation | null, path: string): T | null {
  const change = recommendation?.changes.find((item) => item.path === path);
  return (change?.recommendedValue as T | undefined) || null;
}

export function deriveFocusScoringGovernanceLedger(): FocusScoringGovernanceLedgerEntry[] {
  const recommendations = listRecommendations();
  const recommendationById = new Map(recommendations.map((item) => [item.id, item]));
  const experiments = listFocusScoringExperiments();
  const experimentById = new Map(experiments.map((item) => [item.id, item]));
  const experimentObservations = listFocusExperimentObservations();
  const monitoringObservations = listFocusScoringMonitoringObservations();
  const revisions = listFocusScoringRevisionRecords();
  const config = getCanonicalFocusScoringConfig();

  return revisions
    .filter((revision) => revision.action === 'apply')
    .map((revision) => {
      const sourceOutcomeRecommendation = recommendationById.get(revision.sourceRecommendationId) || null;
      const outcomeValue = recommendedValue<{ experimentId?: string }>(sourceOutcomeRecommendation, 'focusExperimentOutcome');
      const experiment = outcomeValue?.experimentId ? experimentById.get(outcomeValue.experimentId) || null : null;
      const experimentObservation = experiment
        ? experimentObservations.find((item) => item.experimentId === experiment.id) || null
        : null;
      const monitoringObservation = monitoringObservations.find((item) => item.revisionId === revision.id) || null;
      const monitoringRecommendation = recommendations.find((recommendation) => {
        const value = recommendedValue<{ revisionId?: string }>(recommendation, 'focusScoringMonitoringOutcome');
        return value?.revisionId === revision.id;
      }) || null;
      const rollback = revisions.find((item) => item.action === 'rollback' && item.rolledBackRevisionId === revision.id) || null;
      const currentSignalAdjustment = config.signalAdjustments[revision.signalType] || 0;
      const isCurrentValue = currentSignalAdjustment === revision.appliedAdjustment && !rollback;

      let health: FocusScoringGovernanceHealth;
      if (rollback) health = 'rolled_back';
      else if (!isCurrentValue) health = 'superseded';
      else if (!monitoringObservation) health = 'active_unmonitored';
      else if (monitoringObservation.outcome === 'review_rollback') health = 'rollback_review_recommended';
      else if (monitoringObservation.outcome === 'maintain_change') health = 'maintain_recommended';
      else health = 'monitoring_inconclusive';

      const timeline: FocusScoringGovernanceLedgerEntry['timeline'] = [
        { stage: 'experiment', label: experiment ? 'Controlled experiment completed' : 'Experiment lineage unavailable', status: experiment ? 'complete' : 'warning', at: experiment?.closedAt },
        { stage: 'observation', label: experimentObservation ? 'Experiment observation recorded' : 'Experiment observation unavailable', status: experimentObservation ? 'complete' : 'warning', at: experimentObservation?.observedAt },
        { stage: 'recommendation', label: sourceOutcomeRecommendation ? `Outcome recommendation ${sourceOutcomeRecommendation.status}` : 'Outcome recommendation unavailable', status: sourceOutcomeRecommendation ? 'complete' : 'warning', at: sourceOutcomeRecommendation?.updatedAt },
        { stage: 'apply', label: `Canonical revision ${revision.revision} applied`, status: 'complete', at: revision.createdAt },
        { stage: 'monitoring', label: monitoringObservation ? `Post-apply observation: ${monitoringObservation.outcome.replaceAll('_', ' ')}` : 'Post-apply monitoring pending', status: monitoringObservation ? 'complete' : 'pending', at: monitoringObservation?.observedAt },
        { stage: 'followup', label: rollback ? `Rolled back in revision ${rollback.revision}` : monitoringRecommendation ? `Monitoring recommendation ${monitoringRecommendation.status}` : 'Follow-up decision pending', status: rollback || monitoringRecommendation ? 'complete' : 'pending', at: rollback?.createdAt || monitoringRecommendation?.updatedAt },
      ];

      return {
        revision,
        sourceOutcomeRecommendation,
        experiment,
        experimentObservation,
        monitoringObservation,
        monitoringRecommendation,
        currentSignalAdjustment,
        isCurrentValue,
        health,
        timeline,
      };
    })
    .sort((a, b) => b.revision.revision - a.revision.revision);
}
