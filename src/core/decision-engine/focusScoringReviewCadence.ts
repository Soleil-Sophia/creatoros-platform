import type { FocusScoringRevisionRecord } from './focusScoringCanonical';

const REVIEW_CADENCE_KEY = 'creatoros-decision-focus-scoring-review-cadence-v1';

export type FocusScoringReviewCadenceStatus = 'scheduled' | 'due_soon' | 'overdue' | 'completed';

export interface FocusScoringReviewCadenceRecord {
  id: string;
  revisionId: string;
  owner: string;
  reviewDueAt: string;
  reviewPurpose: string;
  createdAt: string;
  createdBy: string;
  completedAt?: string;
  completedBy?: string;
  completionNote?: string;
}

function readRecords(): FocusScoringReviewCadenceRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(REVIEW_CADENCE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeRecords(records: FocusScoringReviewCadenceRecord[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REVIEW_CADENCE_KEY, JSON.stringify(records));
}

export function listFocusScoringReviewCadenceRecords(revisionId?: string): FocusScoringReviewCadenceRecord[] {
  return readRecords()
    .filter((record) => !revisionId || record.revisionId === revisionId)
    .sort((a, b) => a.reviewDueAt.localeCompare(b.reviewDueAt));
}

export function getOpenFocusScoringReviewCadence(revisionId: string): FocusScoringReviewCadenceRecord | null {
  return listFocusScoringReviewCadenceRecords(revisionId).find((record) => !record.completedAt) || null;
}

export function getFocusScoringReviewCadenceStatus(
  record: FocusScoringReviewCadenceRecord,
  now = new Date(),
): FocusScoringReviewCadenceStatus {
  if (record.completedAt) return 'completed';
  const due = new Date(record.reviewDueAt).getTime();
  const current = now.getTime();
  if (due < current) return 'overdue';
  if (due - current <= 3 * 24 * 60 * 60 * 1000) return 'due_soon';
  return 'scheduled';
}

export function scheduleFocusScoringReview(input: {
  revision: FocusScoringRevisionRecord;
  owner: string;
  reviewDueAt: string;
  reviewPurpose: string;
  createdBy: string;
}): FocusScoringReviewCadenceRecord {
  if (input.revision.action !== 'apply') throw new Error('Only applied scoring revisions can receive a governance review cadence.');
  if (!input.owner.trim() || !input.reviewPurpose.trim() || !input.createdBy.trim()) throw new Error('Owner, purpose and creator are required.');
  const due = new Date(input.reviewDueAt);
  if (Number.isNaN(due.getTime())) throw new Error('A valid review due date is required.');
  if (getOpenFocusScoringReviewCadence(input.revision.id)) throw new Error('This revision already has an open governance review.');

  const record: FocusScoringReviewCadenceRecord = {
    id: crypto.randomUUID(),
    revisionId: input.revision.id,
    owner: input.owner.trim(),
    reviewDueAt: due.toISOString(),
    reviewPurpose: input.reviewPurpose.trim(),
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy.trim(),
  };
  writeRecords([record, ...readRecords()]);
  return record;
}

export function completeFocusScoringReview(
  recordId: string,
  completedBy: string,
  completionNote: string,
): FocusScoringReviewCadenceRecord {
  if (!completedBy.trim() || !completionNote.trim()) throw new Error('Reviewer and completion note are required.');
  const records = readRecords();
  const current = records.find((record) => record.id === recordId);
  if (!current) throw new Error('Governance review record not found.');
  if (current.completedAt) throw new Error('This governance review is already completed.');
  const completed: FocusScoringReviewCadenceRecord = {
    ...current,
    completedAt: new Date().toISOString(),
    completedBy: completedBy.trim(),
    completionNote: completionNote.trim(),
  };
  writeRecords(records.map((record) => record.id === recordId ? completed : record));
  return completed;
}
