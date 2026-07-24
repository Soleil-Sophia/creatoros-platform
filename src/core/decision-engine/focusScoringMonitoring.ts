import type { FocusScoringRevisionRecord } from './focusScoringCanonical';
import type { PlatformRecommendation } from './types';

const MONITORING_KEY = 'creatoros-decision-focus-scoring-monitoring-v1';

export type FocusScoringMonitoringPhase = 'before_apply' | 'after_apply';
export type FocusScoringMonitoringOutcome = 'maintain_change' | 'review_rollback' | 'inconclusive';

export interface FocusScoringMonitoringMeasurement {
  id: string;
  revisionId: string;
  phase: FocusScoringMonitoringPhase;
  windowStart: string;
  windowEnd: string;
  plannedItems: number;
  completedItems: number;
  deferredItems: number;
  adoptedItems: number;
  note?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface FocusScoringMonitoringObservation {
  id: string;
  revisionId: string;
  outcome: FocusScoringMonitoringOutcome;
  interpretation: string;
  limitations: string;
  beforeCompletionRate: number;
  afterCompletionRate: number;
  beforeAdoptionRate: number;
  afterAdoptionRate: number;
  observedBy: string;
  observedAt: string;
}

export interface FocusScoringMonitoringRecommendationValue {
  revisionId: string;
  signalType: string;
  appliedAdjustment: number;
  previousAdjustment: number;
  monitoringObservationId: string;
  monitoringOutcome: FocusScoringMonitoringOutcome;
  beforeCompletionRate: number;
  afterCompletionRate: number;
  beforeAdoptionRate: number;
  afterAdoptionRate: number;
  interpretation: string;
  limitations: string;
  proposedAction: 'maintain_and_continue_monitoring' | 'review_controlled_rollback' | 'collect_more_evidence';
}

type Store = {
  measurements: FocusScoringMonitoringMeasurement[];
  observations: FocusScoringMonitoringObservation[];
};

function readStore(): Store {
  if (typeof window === 'undefined') return { measurements: [], observations: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MONITORING_KEY) || '{}');
    return {
      measurements: Array.isArray(parsed.measurements) ? parsed.measurements : [],
      observations: Array.isArray(parsed.observations) ? parsed.observations : [],
    };
  } catch {
    return { measurements: [], observations: [] };
  }
}

function writeStore(store: Store): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(MONITORING_KEY, JSON.stringify(store));
}

function rate(numerator: number, denominator: number): number {
  return denominator <= 0 ? 0 : Math.round((numerator / denominator) * 100);
}

export function listFocusScoringMonitoringMeasurements(revisionId?: string): FocusScoringMonitoringMeasurement[] {
  return readStore().measurements
    .filter((item) => !revisionId || item.revisionId === revisionId)
    .sort((a, b) => (a.recordedAt < b.recordedAt ? 1 : -1));
}

export function listFocusScoringMonitoringObservations(revisionId?: string): FocusScoringMonitoringObservation[] {
  return readStore().observations
    .filter((item) => !revisionId || item.revisionId === revisionId)
    .sort((a, b) => (a.observedAt < b.observedAt ? 1 : -1));
}

export function recordFocusScoringMonitoringMeasurement(input: {
  revision: FocusScoringRevisionRecord;
  phase: FocusScoringMonitoringPhase;
  windowStart: string;
  windowEnd: string;
  plannedItems: number;
  completedItems: number;
  deferredItems: number;
  adoptedItems: number;
  note?: string;
  recordedBy: string;
}): FocusScoringMonitoringMeasurement {
  if (input.revision.action !== 'apply') throw new Error('Only applied scoring revisions can be monitored.');
  if (new Date(input.windowEnd).getTime() < new Date(input.windowStart).getTime()) throw new Error('Monitoring end must not be before its start.');
  const counts = [input.plannedItems, input.completedItems, input.deferredItems, input.adoptedItems];
  if (counts.some((value) => !Number.isInteger(value) || value < 0)) throw new Error('Monitoring counts must be non-negative whole numbers.');
  if (input.completedItems + input.deferredItems > input.plannedItems) throw new Error('Completed and deferred items cannot exceed planned items.');
  if (input.adoptedItems > input.plannedItems) throw new Error('Adopted items cannot exceed planned items.');
  if (!input.recordedBy.trim()) throw new Error('Recorder identity is required.');

  const measurement: FocusScoringMonitoringMeasurement = {
    id: crypto.randomUUID(),
    revisionId: input.revision.id,
    phase: input.phase,
    windowStart: input.windowStart,
    windowEnd: input.windowEnd,
    plannedItems: input.plannedItems,
    completedItems: input.completedItems,
    deferredItems: input.deferredItems,
    adoptedItems: input.adoptedItems,
    note: input.note?.trim() || undefined,
    recordedBy: input.recordedBy.trim(),
    recordedAt: new Date().toISOString(),
  };
  const store = readStore();
  writeStore({ ...store, measurements: [measurement, ...store.measurements] });
  return measurement;
}

export function summarizeFocusScoringMonitoring(revisionId: string) {
  const rows = listFocusScoringMonitoringMeasurements(revisionId);
  const summarize = (phase: FocusScoringMonitoringPhase) => {
    const phaseRows = rows.filter((item) => item.phase === phase);
    const planned = phaseRows.reduce((sum, item) => sum + item.plannedItems, 0);
    const completed = phaseRows.reduce((sum, item) => sum + item.completedItems, 0);
    const deferred = phaseRows.reduce((sum, item) => sum + item.deferredItems, 0);
    const adopted = phaseRows.reduce((sum, item) => sum + item.adoptedItems, 0);
    return { records: phaseRows.length, planned, completed, deferred, adopted, completionRate: rate(completed, planned), adoptionRate: rate(adopted, planned) };
  };
  return { before: summarize('before_apply'), after: summarize('after_apply') };
}

export function recordFocusScoringMonitoringObservation(input: {
  revision: FocusScoringRevisionRecord;
  outcome: FocusScoringMonitoringOutcome;
  interpretation: string;
  limitations: string;
  observedBy: string;
}): FocusScoringMonitoringObservation {
  const summary = summarizeFocusScoringMonitoring(input.revision.id);
  if (summary.before.records === 0 || summary.after.records === 0) throw new Error('At least one before-apply and one after-apply measurement are required.');
  if (!input.interpretation.trim() || !input.limitations.trim() || !input.observedBy.trim()) throw new Error('Interpretation, limitations and observer are required.');

  const observation: FocusScoringMonitoringObservation = {
    id: crypto.randomUUID(),
    revisionId: input.revision.id,
    outcome: input.outcome,
    interpretation: input.interpretation.trim(),
    limitations: input.limitations.trim(),
    beforeCompletionRate: summary.before.completionRate,
    afterCompletionRate: summary.after.completionRate,
    beforeAdoptionRate: summary.before.adoptionRate,
    afterAdoptionRate: summary.after.adoptionRate,
    observedBy: input.observedBy.trim(),
    observedAt: new Date().toISOString(),
  };
  const store = readStore();
  writeStore({ ...store, observations: [observation, ...store.observations.filter((item) => item.revisionId !== input.revision.id)] });
  return observation;
}

export function hasOpenFocusScoringMonitoringRecommendation(revisionId: string, recommendations: PlatformRecommendation[]): boolean {
  return recommendations.some((recommendation) =>
    recommendation.origin === 'intelligenceos' &&
    !['rejected', 'observed'].includes(recommendation.status) &&
    recommendation.changes.some((change) => {
      const value = change.recommendedValue as Partial<FocusScoringMonitoringRecommendationValue> | undefined;
      return change.path === 'focusScoringMonitoringOutcome' && value?.revisionId === revisionId;
    }),
  );
}

export function createFocusScoringMonitoringRecommendation(
  revision: FocusScoringRevisionRecord,
  observation: FocusScoringMonitoringObservation,
  createdAt = new Date().toISOString(),
): PlatformRecommendation<FocusScoringMonitoringRecommendationValue> {
  if (revision.id !== observation.revisionId) throw new Error('Monitoring observation and revision do not match.');
  const proposedAction = observation.outcome === 'review_rollback'
    ? 'review_controlled_rollback'
    : observation.outcome === 'maintain_change'
      ? 'maintain_and_continue_monitoring'
      : 'collect_more_evidence';
  const value: FocusScoringMonitoringRecommendationValue = {
    revisionId: revision.id,
    signalType: revision.signalType,
    appliedAdjustment: revision.appliedAdjustment,
    previousAdjustment: revision.previousAdjustment,
    monitoringObservationId: observation.id,
    monitoringOutcome: observation.outcome,
    beforeCompletionRate: observation.beforeCompletionRate,
    afterCompletionRate: observation.afterCompletionRate,
    beforeAdoptionRate: observation.beforeAdoptionRate,
    afterAdoptionRate: observation.afterAdoptionRate,
    interpretation: observation.interpretation,
    limitations: observation.limitations,
    proposedAction,
  };
  const actionText = proposedAction === 'review_controlled_rollback'
    ? `Review a controlled rollback from ${revision.appliedAdjustment} to ${revision.previousAdjustment} points for ${revision.signalType.replaceAll('_', ' ')}.`
    : proposedAction === 'maintain_and_continue_monitoring'
      ? 'Maintain the current canonical adjustment and continue post-apply monitoring.'
      : 'Collect more post-apply evidence before maintaining or rolling back the scoring change.';

  return {
    id: crypto.randomUUID(),
    schemaVersion: 'platform-recommendation-v1',
    title: proposedAction === 'review_controlled_rollback' ? `Review scoring rollback: ${revision.signalType.replaceAll('_', ' ')}` : `Review post-apply scoring outcome: ${revision.signalType.replaceAll('_', ' ')}`,
    summary: observation.interpretation,
    origin: 'intelligenceos',
    targetOS: 'decisionos',
    status: 'in_review',
    priority: proposedAction === 'review_controlled_rollback' ? 'high' : 'medium',
    confidence: observation.outcome === 'inconclusive' ? 'low' : 'medium',
    reason: `IntelligenceOS converted post-apply monitoring into a reviewable recommendation. The comparison is observational and does not establish causation.`,
    expectedImpact: 'Keep canonical scoring changes accountable after apply and preserve human control over maintenance or rollback.',
    recommendedAction: actionText,
    changes: [{ path: 'focusScoringMonitoringOutcome', recommendedValue: value }],
    evidence: [{
      id: crypto.randomUUID(),
      type: 'analytics',
      source: `Focus scoring revision ${revision.revision}`,
      summary: `Before completion ${observation.beforeCompletionRate}% vs after ${observation.afterCompletionRate}%; before adoption ${observation.beforeAdoptionRate}% vs after ${observation.afterAdoptionRate}%. Limitations: ${observation.limitations}`,
      strength: observation.outcome === 'inconclusive' ? 'low' : 'medium',
      createdAt: observation.observedAt,
    }],
    createdBy: 'IntelligenceOS',
    createdAt,
    updatedAt: createdAt,
    history: [
      { id: crypto.randomUUID(), action: 'created', actor: 'IntelligenceOS', reason: `Created from post-apply monitoring observation ${observation.id}.`, createdAt },
      { id: crypto.randomUUID(), action: 'submitted', actor: 'IntelligenceOS', reason: 'Submitted for explicit human review. No rollback or scoring change was applied.', createdAt },
    ],
  };
}
