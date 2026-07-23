import type { DecisionRecord, PlatformRecommendation } from './types';

const RECOMMENDATIONS_KEY = 'creatoros-decision-recommendations-v1';
const DECISIONS_KEY = 'creatoros-decision-records-v1';

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

export function listRecommendations(): PlatformRecommendation[] {
  return readArray<PlatformRecommendation>(RECOMMENDATIONS_KEY).sort((a, b) =>
    a.updatedAt < b.updatedAt ? 1 : -1,
  );
}

export function saveRecommendation<TValue>(
  recommendation: PlatformRecommendation<TValue>,
): PlatformRecommendation<TValue> {
  const current = listRecommendations();
  const next = [
    recommendation as PlatformRecommendation,
    ...current.filter((item) => item.id !== recommendation.id),
  ];
  writeArray(RECOMMENDATIONS_KEY, next);
  return recommendation;
}

export function getRecommendation(id: string): PlatformRecommendation | null {
  return listRecommendations().find((item) => item.id === id) ?? null;
}

export function saveDecisionRecord(record: DecisionRecord): DecisionRecord {
  const current = readArray<DecisionRecord>(DECISIONS_KEY);
  writeArray(DECISIONS_KEY, [record, ...current]);
  return record;
}

export function listDecisionRecords(): DecisionRecord[] {
  return readArray<DecisionRecord>(DECISIONS_KEY).sort((a, b) =>
    a.decidedAt < b.decidedAt ? 1 : -1,
  );
}
