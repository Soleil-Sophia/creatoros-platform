import type { FocusScoringLearningActionPlanRecord } from './focusScoringLearningActionPlan';

const EVIDENCE_KEY = 'creatoros-decision-focus-scoring-learning-action-evidence-v1';
const VERIFICATION_KEY = 'creatoros-decision-focus-scoring-learning-action-verifications-v1';

export type FocusScoringLearningActionEvidenceType =
  | 'monitoring_record'
  | 'experiment_record'
  | 'governance_review'
  | 'revision_record'
  | 'external_reference'
  | 'human_note';

export type FocusScoringLearningActionVerificationOutcome =
  | 'verified'
  | 'partially_verified'
  | 'not_verified';

export interface FocusScoringLearningActionEvidenceRecord {
  id: string;
  actionPlanId: string;
  type: FocusScoringLearningActionEvidenceType;
  reference: string;
  summary: string;
  recordedBy: string;
  recordedAt: string;
}

export interface FocusScoringLearningActionVerificationRecord {
  id: string;
  actionPlanId: string;
  outcome: FocusScoringLearningActionVerificationOutcome;
  evidenceIds: string[];
  verificationNote: string;
  verifiedBy: string;
  verifiedAt: string;
}

export interface FocusScoringLearningActionVerificationPreview {
  actionPlanId: string;
  actionPlanStatus: FocusScoringLearningActionPlanRecord['status'];
  availableEvidenceCount: number;
  selectedEvidenceCount: number;
  canVerify: boolean;
  blockingReason?: string;
}

function readJson<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function listFocusScoringLearningActionEvidence(
  actionPlanId?: string,
): FocusScoringLearningActionEvidenceRecord[] {
  return readJson<FocusScoringLearningActionEvidenceRecord>(EVIDENCE_KEY)
    .filter((record) => !actionPlanId || record.actionPlanId === actionPlanId)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}

export function listFocusScoringLearningActionVerifications(
  actionPlanId?: string,
): FocusScoringLearningActionVerificationRecord[] {
  return readJson<FocusScoringLearningActionVerificationRecord>(VERIFICATION_KEY)
    .filter((record) => !actionPlanId || record.actionPlanId === actionPlanId)
    .sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt));
}

export function getLatestFocusScoringLearningActionVerification(
  actionPlanId: string,
): FocusScoringLearningActionVerificationRecord | null {
  return listFocusScoringLearningActionVerifications(actionPlanId)[0] || null;
}

export function recordFocusScoringLearningActionEvidence(input: {
  actionPlan: FocusScoringLearningActionPlanRecord;
  type: FocusScoringLearningActionEvidenceType;
  reference: string;
  summary: string;
  recordedBy: string;
  recordedAt?: string;
}): FocusScoringLearningActionEvidenceRecord {
  if (!['in_progress', 'completed'].includes(input.actionPlan.status)) {
    throw new Error('Evidence can only be recorded for an in-progress or completed action plan.');
  }
  if (!input.reference.trim() || !input.summary.trim() || !input.recordedBy.trim()) {
    throw new Error('Evidence reference, summary and recorder are required.');
  }

  const record: FocusScoringLearningActionEvidenceRecord = {
    id: crypto.randomUUID(),
    actionPlanId: input.actionPlan.id,
    type: input.type,
    reference: input.reference.trim(),
    summary: input.summary.trim(),
    recordedBy: input.recordedBy.trim(),
    recordedAt: input.recordedAt || new Date().toISOString(),
  };
  writeJson(EVIDENCE_KEY, [record, ...readJson<FocusScoringLearningActionEvidenceRecord>(EVIDENCE_KEY)]);
  return record;
}

export function previewFocusScoringLearningActionVerification(input: {
  actionPlan: FocusScoringLearningActionPlanRecord;
  evidence: FocusScoringLearningActionEvidenceRecord[];
  evidenceIds: string[];
}): FocusScoringLearningActionVerificationPreview {
  const available = input.evidence.filter((record) => record.actionPlanId === input.actionPlan.id);
  const selected = available.filter((record) => input.evidenceIds.includes(record.id));
  let blockingReason: string | undefined;

  if (input.actionPlan.status !== 'completed') {
    blockingReason = 'Only a completed action plan can be verified.';
  } else if (selected.length === 0) {
    blockingReason = 'At least one evidence record must be included in the verification snapshot.';
  } else if (selected.length !== new Set(input.evidenceIds).size) {
    blockingReason = 'One or more selected evidence records are unavailable or belong to another action plan.';
  }

  return {
    actionPlanId: input.actionPlan.id,
    actionPlanStatus: input.actionPlan.status,
    availableEvidenceCount: available.length,
    selectedEvidenceCount: selected.length,
    canVerify: !blockingReason,
    blockingReason,
  };
}

export function verifyFocusScoringLearningActionPlan(input: {
  actionPlan: FocusScoringLearningActionPlanRecord;
  outcome: FocusScoringLearningActionVerificationOutcome;
  evidenceIds: string[];
  verificationNote: string;
  verifiedBy: string;
  verifiedAt?: string;
}): FocusScoringLearningActionVerificationRecord {
  if (!input.verificationNote.trim() || !input.verifiedBy.trim()) {
    throw new Error('Verification note and verifier are required.');
  }
  const evidence = listFocusScoringLearningActionEvidence(input.actionPlan.id);
  const preview = previewFocusScoringLearningActionVerification({
    actionPlan: input.actionPlan,
    evidence,
    evidenceIds: input.evidenceIds,
  });
  if (!preview.canVerify) throw new Error(preview.blockingReason || 'Action plan verification is blocked.');

  const record: FocusScoringLearningActionVerificationRecord = {
    id: crypto.randomUUID(),
    actionPlanId: input.actionPlan.id,
    outcome: input.outcome,
    evidenceIds: [...new Set(input.evidenceIds)],
    verificationNote: input.verificationNote.trim(),
    verifiedBy: input.verifiedBy.trim(),
    verifiedAt: input.verifiedAt || new Date().toISOString(),
  };
  writeJson(VERIFICATION_KEY, [record, ...readJson<FocusScoringLearningActionVerificationRecord>(VERIFICATION_KEY)]);
  return record;
}
