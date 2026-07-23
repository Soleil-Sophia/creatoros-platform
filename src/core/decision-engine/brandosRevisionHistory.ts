import type { BrandProfile } from '../../app/lib/brand-profile/types';

const BRANDOS_REVISION_HISTORY_KEY = 'creatoros-brandos-revision-history-v1';

export interface BrandOSRevisionRecord {
  id: string;
  schemaVersion: 'brandos-revision-record-v1';
  revision: number;
  recommendationId: string;
  appliedAt: string;
  appliedBy: string;
  reason: string;
  previous: BrandProfile | null;
  canonical: BrandProfile;
}

function readRecords(): BrandOSRevisionRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(BRANDOS_REVISION_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BrandOSRevisionRecord[]) : [];
  } catch {
    return [];
  }
}

export function listBrandOSRevisionRecords(): BrandOSRevisionRecord[] {
  return readRecords().sort((a, b) => b.revision - a.revision);
}

export function saveBrandOSRevisionRecord(
  record: BrandOSRevisionRecord,
): BrandOSRevisionRecord {
  if (typeof window === 'undefined') return record;
  const current = readRecords();
  const next = [record, ...current.filter((item) => item.id !== record.id)];
  window.localStorage.setItem(BRANDOS_REVISION_HISTORY_KEY, JSON.stringify(next));
  return record;
}

export function createBrandOSRevisionRecord(input: {
  recommendationId: string;
  previous: BrandProfile | null;
  canonical: BrandProfile;
  appliedAt: string;
  appliedBy: string;
  reason: string;
}): BrandOSRevisionRecord {
  return {
    id: crypto.randomUUID(),
    schemaVersion: 'brandos-revision-record-v1',
    revision: input.canonical.canonicalRevision ?? 0,
    recommendationId: input.recommendationId,
    appliedAt: input.appliedAt,
    appliedBy: input.appliedBy,
    reason: input.reason,
    previous: input.previous ? JSON.parse(JSON.stringify(input.previous)) as BrandProfile : null,
    canonical: JSON.parse(JSON.stringify(input.canonical)) as BrandProfile,
  };
}
