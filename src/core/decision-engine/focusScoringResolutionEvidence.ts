import type { FocusScoringFollowupResolutionRecord } from './focusScoringFollowupResolution';

const EVIDENCE_KEY = 'creatoros-decision-focus-scoring-resolution-evidence-v1';

export type FocusScoringResolutionEvidenceType = 'monitoring_record' | 'revision_record' | 'review_record' | 'external_reference' | 'human_note';
export type FocusScoringResolutionVerificationOutcome = 'verified' | 'partially_verified' | 'not_verified';

export interface FocusScoringResolutionEvidenceRecord {
  id: string;
  resolutionId: string;
  type: FocusScoringResolutionEvidenceType;
  reference: string;
  summary: string;
  recordedBy: string;
  recordedAt: string;
}

export interface FocusScoringResolutionVerificationRecord {
  id: string;
  resolutionId: string;
  outcome: FocusScoringResolutionVerificationOutcome;
  verificationNote: string;
  verifiedBy: string;
  verifiedAt: string;
  evidenceIds: string[];
}

type Store = {
  evidence: FocusScoringResolutionEvidenceRecord[];
  verifications: FocusScoringResolutionVerificationRecord[];
};

function readStore(): Store {
  if (typeof window === 'undefined') return { evidence: [], verifications: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(EVIDENCE_KEY) || '{}');
    return {
      evidence: Array.isArray(parsed.evidence) ? parsed.evidence : [],
      verifications: Array.isArray(parsed.verifications) ? parsed.verifications : [],
    };
  } catch {
    return { evidence: [], verifications: [] };
  }
}

function writeStore(store: Store): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(EVIDENCE_KEY, JSON.stringify(store));
}

export function listFocusScoringResolutionEvidence(resolutionId?: string): FocusScoringResolutionEvidenceRecord[] {
  return readStore().evidence
    .filter((item) => !resolutionId || item.resolutionId === resolutionId)
    .sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
}

export function listFocusScoringResolutionVerifications(resolutionId?: string): FocusScoringResolutionVerificationRecord[] {
  return readStore().verifications
    .filter((item) => !resolutionId || item.resolutionId === resolutionId)
    .sort((a, b) => b.verifiedAt.localeCompare(a.verifiedAt));
}

export function getLatestFocusScoringResolutionVerification(resolutionId: string): FocusScoringResolutionVerificationRecord | null {
  return listFocusScoringResolutionVerifications(resolutionId)[0] || null;
}

export function recordFocusScoringResolutionEvidence(input: {
  resolution: FocusScoringFollowupResolutionRecord;
  type: FocusScoringResolutionEvidenceType;
  reference: string;
  summary: string;
  recordedBy: string;
}): FocusScoringResolutionEvidenceRecord {
  if (input.resolution.status === 'cancelled') throw new Error('Cancelled resolutions cannot receive completion evidence.');
  if (!input.reference.trim() || !input.summary.trim() || !input.recordedBy.trim()) {
    throw new Error('Evidence reference, summary and recorder are required.');
  }
  const evidence: FocusScoringResolutionEvidenceRecord = {
    id: crypto.randomUUID(),
    resolutionId: input.resolution.id,
    type: input.type,
    reference: input.reference.trim(),
    summary: input.summary.trim(),
    recordedBy: input.recordedBy.trim(),
    recordedAt: new Date().toISOString(),
  };
  const store = readStore();
  writeStore({ ...store, evidence: [evidence, ...store.evidence] });
  return evidence;
}

export function verifyFocusScoringResolution(input: {
  resolution: FocusScoringFollowupResolutionRecord;
  outcome: FocusScoringResolutionVerificationOutcome;
  verificationNote: string;
  verifiedBy: string;
}): FocusScoringResolutionVerificationRecord {
  if (input.resolution.status !== 'completed') throw new Error('Only a completed resolution can be verified.');
  if (!input.verificationNote.trim() || !input.verifiedBy.trim()) throw new Error('Verification note and verifier are required.');
  const evidence = listFocusScoringResolutionEvidence(input.resolution.id);
  if (evidence.length === 0) throw new Error('At least one evidence record is required before verification.');
  const verification: FocusScoringResolutionVerificationRecord = {
    id: crypto.randomUUID(),
    resolutionId: input.resolution.id,
    outcome: input.outcome,
    verificationNote: input.verificationNote.trim(),
    verifiedBy: input.verifiedBy.trim(),
    verifiedAt: new Date().toISOString(),
    evidenceIds: evidence.map((item) => item.id),
  };
  const store = readStore();
  writeStore({ ...store, verifications: [verification, ...store.verifications] });
  return verification;
}
