import type {
  FocusScoringObservationLearningAction,
  FocusScoringObservationLearningValue,
} from './focusScoringObservationLearning';
import type { PlatformRecommendation } from './types';

const ACTION_PLAN_KEY = 'creatoros-decision-focus-scoring-learning-action-plans-v1';

export type FocusScoringLearningActionPlanStatus =
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface FocusScoringLearningActionPlanRecord {
  id: string;
  recommendationId: string;
  sourceRecommendationId: string;
  observationId: string;
  proposedAction: FocusScoringObservationLearningAction;
  targetHref: string;
  objective: string;
  evidenceCriteria: string;
  owner: string;
  targetDate: string;
  status: FocusScoringLearningActionPlanStatus;
  createdBy: string;
  createdAt: string;
  startedBy?: string;
  startedAt?: string;
  closedBy?: string;
  closedAt?: string;
  closureNote?: string;
}

function readRecords(): FocusScoringLearningActionPlanRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ACTION_PLAN_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecords(records: FocusScoringLearningActionPlanRecord[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ACTION_PLAN_KEY, JSON.stringify(records));
}

export function getFocusScoringObservationLearningValue(
  recommendation: PlatformRecommendation,
): FocusScoringObservationLearningValue | null {
  const change = recommendation.changes.find((item) => item.path === 'focusScoringObservationLearning');
  return (change?.recommendedValue as FocusScoringObservationLearningValue | undefined) || null;
}

function targetHref(action: FocusScoringObservationLearningAction): string {
  if (action === 'review_revision_or_rollback') return '/platform/decisionos/focus/scoring/apply';
  if (action === 'measure_again') return '/platform/decisionos/focus/scoring/monitor';
  if (action === 'collect_more_evidence') return '/platform/decisionos/focus/scoring/resolutions';
  return '/platform/decisionos/focus/scoring/reviews';
}

export function listFocusScoringLearningActionPlans(
  recommendationId?: string,
): FocusScoringLearningActionPlanRecord[] {
  return readRecords()
    .filter((record) => !recommendationId || record.recommendationId === recommendationId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getOpenFocusScoringLearningActionPlan(
  recommendationId: string,
): FocusScoringLearningActionPlanRecord | null {
  return listFocusScoringLearningActionPlans(recommendationId)
    .find((record) => record.status === 'planned' || record.status === 'in_progress') || null;
}

export function createFocusScoringLearningActionPlan(input: {
  recommendation: PlatformRecommendation;
  objective: string;
  evidenceCriteria: string;
  owner: string;
  targetDate: string;
  createdBy: string;
  createdAt?: string;
}): FocusScoringLearningActionPlanRecord {
  if (input.recommendation.status !== 'approved') {
    throw new Error('Only an approved scoring learning recommendation can create an action plan.');
  }
  const value = getFocusScoringObservationLearningValue(input.recommendation);
  if (!value) throw new Error('The recommendation is not an observed scoring outcome learning recommendation.');
  if (!input.objective.trim() || !input.evidenceCriteria.trim() || !input.owner.trim() || !input.createdBy.trim()) {
    throw new Error('Objective, evidence criteria, owner and plan creator are required.');
  }
  if (!input.targetDate || Number.isNaN(Date.parse(input.targetDate))) {
    throw new Error('A valid target date is required.');
  }
  if (getOpenFocusScoringLearningActionPlan(input.recommendation.id)) {
    throw new Error('This learning recommendation already has an open action plan.');
  }

  const record: FocusScoringLearningActionPlanRecord = {
    id: crypto.randomUUID(),
    recommendationId: input.recommendation.id,
    sourceRecommendationId: value.sourceRecommendationId,
    observationId: value.observationId,
    proposedAction: value.proposedAction,
    targetHref: targetHref(value.proposedAction),
    objective: input.objective.trim(),
    evidenceCriteria: input.evidenceCriteria.trim(),
    owner: input.owner.trim(),
    targetDate: input.targetDate,
    status: 'planned',
    createdBy: input.createdBy.trim(),
    createdAt: input.createdAt || new Date().toISOString(),
  };

  writeRecords([record, ...readRecords()]);
  return record;
}

export function startFocusScoringLearningActionPlan(input: {
  recordId: string;
  startedBy: string;
  startedAt?: string;
}): FocusScoringLearningActionPlanRecord {
  if (!input.startedBy.trim()) throw new Error('The person starting the action plan is required.');
  const records = readRecords();
  const current = records.find((record) => record.id === input.recordId);
  if (!current) throw new Error('Learning action plan not found.');
  if (current.status !== 'planned') throw new Error('Only a planned action can be started.');

  const updated: FocusScoringLearningActionPlanRecord = {
    ...current,
    status: 'in_progress',
    startedBy: input.startedBy.trim(),
    startedAt: input.startedAt || new Date().toISOString(),
  };
  writeRecords(records.map((record) => record.id === current.id ? updated : record));
  return updated;
}

export function closeFocusScoringLearningActionPlan(input: {
  recordId: string;
  outcome: 'completed' | 'cancelled';
  closureNote: string;
  closedBy: string;
  closedAt?: string;
}): FocusScoringLearningActionPlanRecord {
  if (!input.closureNote.trim() || !input.closedBy.trim()) {
    throw new Error('Closure note and responsible actor are required.');
  }
  const records = readRecords();
  const current = records.find((record) => record.id === input.recordId);
  if (!current) throw new Error('Learning action plan not found.');
  if (current.status !== 'in_progress') throw new Error('Only an in-progress action plan can be closed.');

  const updated: FocusScoringLearningActionPlanRecord = {
    ...current,
    status: input.outcome,
    closureNote: input.closureNote.trim(),
    closedBy: input.closedBy.trim(),
    closedAt: input.closedAt || new Date().toISOString(),
  };
  writeRecords(records.map((record) => record.id === current.id ? updated : record));
  return updated;
}
