import type { FocusScoringReviewFollowupValue } from './focusScoringReviewFollowup';
import type { PlatformRecommendation } from './types';

const RESOLUTION_KEY = 'creatoros-decision-focus-scoring-followup-resolutions-v1';

export type FocusScoringFollowupResolutionStatus = 'in_progress' | 'completed' | 'cancelled';

export interface FocusScoringFollowupResolutionRecord {
  id: string;
  recommendationId: string;
  reviewRecordId: string;
  revisionId: string;
  proposedAction: FocusScoringReviewFollowupValue['proposedAction'];
  targetHref: string;
  executionPlan: string;
  status: FocusScoringFollowupResolutionStatus;
  startedBy: string;
  startedAt: string;
  completedBy?: string;
  completedAt?: string;
  resolutionNote?: string;
}

function readRecords(): FocusScoringFollowupResolutionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(RESOLUTION_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecords(records: FocusScoringFollowupResolutionRecord[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(RESOLUTION_KEY, JSON.stringify(records));
}

function followupValue(recommendation: PlatformRecommendation): FocusScoringReviewFollowupValue | null {
  const change = recommendation.changes.find((item) => item.path === 'focusScoringReviewFollowup');
  return (change?.recommendedValue as FocusScoringReviewFollowupValue | undefined) || null;
}

function targetHref(action: FocusScoringReviewFollowupValue['proposedAction']): string {
  if (action === 'review_controlled_rollback') return '/platform/decisionos/focus/scoring/apply';
  if (action === 'open_new_measurement_window') return '/platform/decisionos/focus/scoring/monitor';
  return '/platform/decisionos/focus/scoring/reviews';
}

export function listFocusScoringFollowupResolutionRecords(
  recommendationId?: string,
): FocusScoringFollowupResolutionRecord[] {
  return readRecords()
    .filter((record) => !recommendationId || record.recommendationId === recommendationId)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export function getOpenFocusScoringFollowupResolution(
  recommendationId: string,
): FocusScoringFollowupResolutionRecord | null {
  return listFocusScoringFollowupResolutionRecords(recommendationId)
    .find((record) => record.status === 'in_progress') || null;
}

export function startFocusScoringFollowupResolution(input: {
  recommendation: PlatformRecommendation;
  executionPlan: string;
  startedBy: string;
}): FocusScoringFollowupResolutionRecord {
  if (input.recommendation.status !== 'approved') {
    throw new Error('Only an approved follow-up recommendation can enter resolution execution.');
  }
  const value = followupValue(input.recommendation);
  if (!value) throw new Error('The recommendation is not a scoring review follow-up.');
  if (!input.executionPlan.trim() || !input.startedBy.trim()) {
    throw new Error('Execution plan and responsible actor are required.');
  }
  if (getOpenFocusScoringFollowupResolution(input.recommendation.id)) {
    throw new Error('This follow-up recommendation already has an open resolution.');
  }

  const record: FocusScoringFollowupResolutionRecord = {
    id: crypto.randomUUID(),
    recommendationId: input.recommendation.id,
    reviewRecordId: value.reviewRecordId,
    revisionId: value.revisionId,
    proposedAction: value.proposedAction,
    targetHref: targetHref(value.proposedAction),
    executionPlan: input.executionPlan.trim(),
    status: 'in_progress',
    startedBy: input.startedBy.trim(),
    startedAt: new Date().toISOString(),
  };
  writeRecords([record, ...readRecords()]);
  return record;
}

export function closeFocusScoringFollowupResolution(input: {
  recordId: string;
  outcome: 'completed' | 'cancelled';
  resolutionNote: string;
  completedBy: string;
}): FocusScoringFollowupResolutionRecord {
  if (!input.resolutionNote.trim() || !input.completedBy.trim()) {
    throw new Error('Resolution note and responsible actor are required.');
  }
  const records = readRecords();
  const current = records.find((record) => record.id === input.recordId);
  if (!current) throw new Error('Resolution record not found.');
  if (current.status !== 'in_progress') throw new Error('Only an in-progress resolution can be closed.');

  const closed: FocusScoringFollowupResolutionRecord = {
    ...current,
    status: input.outcome,
    resolutionNote: input.resolutionNote.trim(),
    completedBy: input.completedBy.trim(),
    completedAt: new Date().toISOString(),
  };
  writeRecords(records.map((record) => record.id === current.id ? closed : record));
  return closed;
}
