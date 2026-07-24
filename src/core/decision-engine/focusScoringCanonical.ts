import type { FocusExperimentRecommendationValue } from './focusExperimentRecommendations';
import type { PlatformRecommendation } from './types';

const CONFIG_KEY = 'creatoros-decision-focus-scoring-canonical-v1';
const REVISIONS_KEY = 'creatoros-decision-focus-scoring-revisions-v1';

export interface CanonicalFocusScoringConfig {
  signalAdjustments: Record<string, number>;
  revision: number;
  updatedAt?: string;
  updatedBy?: string;
}

export interface FocusScoringRevisionRecord {
  id: string;
  revision: number;
  sourceRecommendationId: string;
  signalType: string;
  previousAdjustment: number;
  appliedAdjustment: number;
  action: 'apply' | 'rollback';
  reason: string;
  actor: string;
  createdAt: string;
  rolledBackRevisionId?: string;
}

export interface FocusScoringApplyPreview {
  sourceRecommendationId: string;
  signalType: string;
  currentAdjustment: number;
  proposedAdjustment: number;
  delta: number;
  nextRevision: number;
  observationOutcome: FocusExperimentRecommendationValue['observationOutcome'];
  baselineCompletionRate: number;
  treatmentCompletionRate: number;
  baselineAdoptionRate: number;
  treatmentAdoptionRate: number;
  interpretation: string;
  limitations: string;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getCanonicalFocusScoringConfig(): CanonicalFocusScoringConfig {
  const stored = readJson<Partial<CanonicalFocusScoringConfig>>(CONFIG_KEY, {});
  return {
    signalAdjustments: stored.signalAdjustments && typeof stored.signalAdjustments === 'object' ? stored.signalAdjustments : {},
    revision: Number.isInteger(stored.revision) ? stored.revision as number : 0,
    updatedAt: stored.updatedAt,
    updatedBy: stored.updatedBy,
  };
}

export function getCanonicalFocusSignalAdjustment(signalType: string): number {
  return getCanonicalFocusScoringConfig().signalAdjustments[signalType] || 0;
}

export function listFocusScoringRevisionRecords(): FocusScoringRevisionRecord[] {
  const rows = readJson<FocusScoringRevisionRecord[]>(REVISIONS_KEY, []);
  return Array.isArray(rows) ? rows.sort((a, b) => b.revision - a.revision) : [];
}

function outcomeValue(recommendation: PlatformRecommendation): FocusExperimentRecommendationValue | null {
  const change = recommendation.changes.find((item) => item.path === 'focusExperimentOutcome');
  return (change?.recommendedValue as FocusExperimentRecommendationValue | undefined) || null;
}

export function previewFocusScoringCanonicalApply(recommendation: PlatformRecommendation): FocusScoringApplyPreview {
  if (recommendation.status !== 'approved') throw new Error('Only an approved recommendation can be previewed for canonical apply.');
  const value = outcomeValue(recommendation);
  if (!value || value.proposedAction !== 'consider_controlled_apply') {
    throw new Error('This recommendation does not propose a controlled scoring apply.');
  }
  if (value.observationOutcome !== 'supports_hypothesis') {
    throw new Error('Only a supportive experiment observation can enter controlled apply.');
  }
  if (!Number.isFinite(value.testedAdjustment) || value.testedAdjustment < -20 || value.testedAdjustment > 20) {
    throw new Error('The proposed adjustment is outside the allowed range.');
  }

  const config = getCanonicalFocusScoringConfig();
  const currentAdjustment = config.signalAdjustments[value.signalType] || 0;
  return {
    sourceRecommendationId: recommendation.id,
    signalType: value.signalType,
    currentAdjustment,
    proposedAdjustment: value.testedAdjustment,
    delta: value.testedAdjustment - currentAdjustment,
    nextRevision: config.revision + 1,
    observationOutcome: value.observationOutcome,
    baselineCompletionRate: value.baselineCompletionRate,
    treatmentCompletionRate: value.treatmentCompletionRate,
    baselineAdoptionRate: value.baselineAdoptionRate,
    treatmentAdoptionRate: value.treatmentAdoptionRate,
    interpretation: value.interpretation,
    limitations: value.limitations,
  };
}

export function applyFocusScoringCanonicalRecommendation(
  recommendation: PlatformRecommendation,
  actor: string,
  reason: string,
): FocusScoringRevisionRecord {
  if (!actor.trim() || !reason.trim()) throw new Error('Actor and apply reason are required.');
  const preview = previewFocusScoringCanonicalApply(recommendation);
  const config = getCanonicalFocusScoringConfig();
  const now = new Date().toISOString();
  const record: FocusScoringRevisionRecord = {
    id: crypto.randomUUID(),
    revision: preview.nextRevision,
    sourceRecommendationId: recommendation.id,
    signalType: preview.signalType,
    previousAdjustment: preview.currentAdjustment,
    appliedAdjustment: preview.proposedAdjustment,
    action: 'apply',
    reason: reason.trim(),
    actor: actor.trim(),
    createdAt: now,
  };

  writeJson(CONFIG_KEY, {
    signalAdjustments: { ...config.signalAdjustments, [preview.signalType]: preview.proposedAdjustment },
    revision: record.revision,
    updatedAt: now,
    updatedBy: actor.trim(),
  } satisfies CanonicalFocusScoringConfig);
  writeJson(REVISIONS_KEY, [record, ...listFocusScoringRevisionRecords()]);
  return record;
}

export function rollbackFocusScoringRevision(
  revisionId: string,
  actor: string,
  reason: string,
): FocusScoringRevisionRecord {
  if (!actor.trim() || !reason.trim()) throw new Error('Actor and rollback reason are required.');
  const target = listFocusScoringRevisionRecords().find((item) => item.id === revisionId);
  if (!target) throw new Error('Revision record not found.');
  const config = getCanonicalFocusScoringConfig();
  const currentAdjustment = config.signalAdjustments[target.signalType] || 0;
  if (currentAdjustment !== target.appliedAdjustment) {
    throw new Error('This revision is not the current value for its signal type and cannot be rolled back directly.');
  }

  const now = new Date().toISOString();
  const record: FocusScoringRevisionRecord = {
    id: crypto.randomUUID(),
    revision: config.revision + 1,
    sourceRecommendationId: target.sourceRecommendationId,
    signalType: target.signalType,
    previousAdjustment: currentAdjustment,
    appliedAdjustment: target.previousAdjustment,
    action: 'rollback',
    reason: reason.trim(),
    actor: actor.trim(),
    createdAt: now,
    rolledBackRevisionId: target.id,
  };

  writeJson(CONFIG_KEY, {
    signalAdjustments: { ...config.signalAdjustments, [target.signalType]: target.previousAdjustment },
    revision: record.revision,
    updatedAt: now,
    updatedBy: actor.trim(),
  } satisfies CanonicalFocusScoringConfig);
  writeJson(REVISIONS_KEY, [record, ...listFocusScoringRevisionRecords()]);
  return record;
}
