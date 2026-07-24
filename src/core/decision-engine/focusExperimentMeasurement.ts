import type { FocusScoringExperiment } from './focusExperiments';

const MEASUREMENT_KEY = 'creatoros-decision-focus-experiment-measurements-v1';

export type FocusExperimentMeasurementPhase = 'baseline' | 'treatment';
export type FocusExperimentObservationOutcome = 'supports_hypothesis' | 'does_not_support' | 'inconclusive';

export interface FocusExperimentMeasurement {
  id: string;
  experimentId: string;
  phase: FocusExperimentMeasurementPhase;
  windowStart: string;
  windowEnd: string;
  plannedItems: number;
  experimentalItemsAdopted: number;
  completedItems: number;
  deferredItems: number;
  note?: string;
  recordedBy: string;
  recordedAt: string;
}

export interface FocusExperimentObservation {
  id: string;
  experimentId: string;
  outcome: FocusExperimentObservationOutcome;
  interpretation: string;
  limitations: string;
  baselineCompletionRate: number;
  treatmentCompletionRate: number;
  baselineAdoptionRate: number;
  treatmentAdoptionRate: number;
  observedBy: string;
  observedAt: string;
}

type Store = {
  measurements: FocusExperimentMeasurement[];
  observations: FocusExperimentObservation[];
};

function readStore(): Store {
  if (typeof window === 'undefined') return { measurements: [], observations: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(MEASUREMENT_KEY) || '{}');
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
  window.localStorage.setItem(MEASUREMENT_KEY, JSON.stringify(store));
}

function rate(numerator: number, denominator: number): number {
  return denominator <= 0 ? 0 : Math.round((numerator / denominator) * 100);
}

export function listFocusExperimentMeasurements(experimentId?: string): FocusExperimentMeasurement[] {
  return readStore().measurements
    .filter((item) => !experimentId || item.experimentId === experimentId)
    .sort((a, b) => (a.recordedAt < b.recordedAt ? 1 : -1));
}

export function listFocusExperimentObservations(experimentId?: string): FocusExperimentObservation[] {
  return readStore().observations
    .filter((item) => !experimentId || item.experimentId === experimentId)
    .sort((a, b) => (a.observedAt < b.observedAt ? 1 : -1));
}

export function recordFocusExperimentMeasurement(input: {
  experiment: FocusScoringExperiment;
  phase: FocusExperimentMeasurementPhase;
  windowStart: string;
  windowEnd: string;
  plannedItems: number;
  experimentalItemsAdopted: number;
  completedItems: number;
  deferredItems: number;
  note?: string;
  recordedBy: string;
}): FocusExperimentMeasurement {
  if (input.experiment.status === 'draft') throw new Error('Activate the experiment before recording measurements.');
  if (new Date(input.windowEnd).getTime() < new Date(input.windowStart).getTime()) throw new Error('Measurement end must not be before its start.');

  const counts = [input.plannedItems, input.experimentalItemsAdopted, input.completedItems, input.deferredItems];
  if (counts.some((value) => !Number.isInteger(value) || value < 0)) throw new Error('Measurement counts must be non-negative whole numbers.');
  if (input.experimentalItemsAdopted > input.plannedItems) throw new Error('Adopted experimental items cannot exceed planned items.');
  if (input.completedItems + input.deferredItems > input.plannedItems) throw new Error('Completed and deferred items cannot exceed planned items.');

  const measurement: FocusExperimentMeasurement = {
    id: crypto.randomUUID(),
    experimentId: input.experiment.id,
    phase: input.phase,
    windowStart: input.windowStart,
    windowEnd: input.windowEnd,
    plannedItems: input.plannedItems,
    experimentalItemsAdopted: input.experimentalItemsAdopted,
    completedItems: input.completedItems,
    deferredItems: input.deferredItems,
    note: input.note?.trim() || undefined,
    recordedBy: input.recordedBy,
    recordedAt: new Date().toISOString(),
  };

  const store = readStore();
  writeStore({ ...store, measurements: [measurement, ...store.measurements] });
  return measurement;
}

export function summarizeFocusExperimentMeasurements(experimentId: string) {
  const measurements = listFocusExperimentMeasurements(experimentId);
  const summarize = (phase: FocusExperimentMeasurementPhase) => {
    const rows = measurements.filter((item) => item.phase === phase);
    const planned = rows.reduce((sum, item) => sum + item.plannedItems, 0);
    const adopted = rows.reduce((sum, item) => sum + item.experimentalItemsAdopted, 0);
    const completed = rows.reduce((sum, item) => sum + item.completedItems, 0);
    const deferred = rows.reduce((sum, item) => sum + item.deferredItems, 0);
    return { records: rows.length, planned, adopted, completed, deferred, adoptionRate: rate(adopted, planned), completionRate: rate(completed, planned) };
  };
  return { baseline: summarize('baseline'), treatment: summarize('treatment') };
}

export function recordFocusExperimentObservation(input: {
  experiment: FocusScoringExperiment;
  outcome: FocusExperimentObservationOutcome;
  interpretation: string;
  limitations: string;
  observedBy: string;
}): FocusExperimentObservation {
  if (input.experiment.status !== 'completed') throw new Error('Complete the experiment before recording its observation.');
  const summary = summarizeFocusExperimentMeasurements(input.experiment.id);
  if (summary.baseline.records === 0 || summary.treatment.records === 0) {
    throw new Error('At least one baseline and one treatment measurement are required.');
  }
  if (!input.interpretation.trim() || !input.limitations.trim()) {
    throw new Error('Interpretation and limitations are required.');
  }

  const observation: FocusExperimentObservation = {
    id: crypto.randomUUID(),
    experimentId: input.experiment.id,
    outcome: input.outcome,
    interpretation: input.interpretation.trim(),
    limitations: input.limitations.trim(),
    baselineCompletionRate: summary.baseline.completionRate,
    treatmentCompletionRate: summary.treatment.completionRate,
    baselineAdoptionRate: summary.baseline.adoptionRate,
    treatmentAdoptionRate: summary.treatment.adoptionRate,
    observedBy: input.observedBy,
    observedAt: new Date().toISOString(),
  };

  const store = readStore();
  writeStore({ ...store, observations: [observation, ...store.observations.filter((item) => item.experimentId !== input.experiment.id)] });
  return observation;
}
