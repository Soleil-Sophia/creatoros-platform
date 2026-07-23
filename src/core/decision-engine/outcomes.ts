import type { DecisionTargetOS, PlatformRecommendation } from './types';

const IMPLEMENTATION_RECORDS_KEY = 'creatoros-decision-implementation-records-v1';
const OBSERVATION_RECORDS_KEY = 'creatoros-decision-observation-records-v1';

export interface ImplementationRecord {
  id: string;
  recommendationId: string;
  targetOS: DecisionTargetOS;
  implementedBy: string;
  implementedAt: string;
  summary: string;
  evidence?: string;
}

export type ObservationOutcome = 'positive' | 'neutral' | 'negative' | 'inconclusive';

export interface ObservationRecord {
  id: string;
  recommendationId: string;
  targetOS: DecisionTargetOS;
  observedBy: string;
  observedAt: string;
  outcome: ObservationOutcome;
  summary: string;
  metric?: string;
  measuredValue?: string;
}

function readArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, values: T[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(values));
}

export function createImplementationRecord(
  recommendation: PlatformRecommendation,
  implementedBy: string,
  summary: string,
  evidence?: string,
  implementedAt = new Date().toISOString(),
): ImplementationRecord {
  if (recommendation.status !== 'canonical') {
    throw new Error('Only canonical recommendations can be marked implemented.');
  }

  return {
    id: crypto.randomUUID(),
    recommendationId: recommendation.id,
    targetOS: recommendation.targetOS,
    implementedBy,
    implementedAt,
    summary,
    evidence,
  };
}

export function saveImplementationRecord(record: ImplementationRecord): ImplementationRecord {
  const current = readArray<ImplementationRecord>(IMPLEMENTATION_RECORDS_KEY);
  writeArray(IMPLEMENTATION_RECORDS_KEY, [record, ...current]);
  return record;
}

export function listImplementationRecords(): ImplementationRecord[] {
  return readArray<ImplementationRecord>(IMPLEMENTATION_RECORDS_KEY).sort((a, b) =>
    a.implementedAt < b.implementedAt ? 1 : -1,
  );
}

export function createObservationRecord(
  recommendation: PlatformRecommendation,
  observedBy: string,
  outcome: ObservationOutcome,
  summary: string,
  metric?: string,
  measuredValue?: string,
  observedAt = new Date().toISOString(),
): ObservationRecord {
  if (recommendation.status !== 'implemented') {
    throw new Error('Only implemented recommendations can be observed.');
  }

  return {
    id: crypto.randomUUID(),
    recommendationId: recommendation.id,
    targetOS: recommendation.targetOS,
    observedBy,
    observedAt,
    outcome,
    summary,
    metric,
    measuredValue,
  };
}

export function saveObservationRecord(record: ObservationRecord): ObservationRecord {
  const current = readArray<ObservationRecord>(OBSERVATION_RECORDS_KEY);
  writeArray(OBSERVATION_RECORDS_KEY, [record, ...current]);
  return record;
}

export function listObservationRecords(): ObservationRecord[] {
  return readArray<ObservationRecord>(OBSERVATION_RECORDS_KEY).sort((a, b) =>
    a.observedAt < b.observedAt ? 1 : -1,
  );
}
