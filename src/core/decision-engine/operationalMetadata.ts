import type { PlatformRecommendation } from './types';

const OPERATIONAL_METADATA_KEY = 'creatoros-decision-operational-metadata-v1';

export type OperationalUrgency = 'low' | 'normal' | 'high' | 'critical';

export interface DecisionOperationalMetadata {
  recommendationId: string;
  owner?: string;
  dueAt?: string;
  urgency: OperationalUrgency;
  nextAction?: string;
  isBlocked: boolean;
  blockerReason?: string;
  updatedAt: string;
  updatedBy: string;
}

function readAll(): DecisionOperationalMetadata[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(OPERATIONAL_METADATA_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DecisionOperationalMetadata[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: DecisionOperationalMetadata[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(OPERATIONAL_METADATA_KEY, JSON.stringify(items));
}

export function listDecisionOperationalMetadata(): DecisionOperationalMetadata[] {
  return readAll().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getDecisionOperationalMetadata(
  recommendationId: string,
): DecisionOperationalMetadata | null {
  return readAll().find((item) => item.recommendationId === recommendationId) ?? null;
}

export function saveDecisionOperationalMetadata(
  recommendation: PlatformRecommendation,
  input: Omit<DecisionOperationalMetadata, 'recommendationId' | 'updatedAt'>,
): DecisionOperationalMetadata {
  const updatedAt = new Date().toISOString();
  const record: DecisionOperationalMetadata = {
    recommendationId: recommendation.id,
    owner: input.owner?.trim() || undefined,
    dueAt: input.dueAt || undefined,
    urgency: input.urgency,
    nextAction: input.nextAction?.trim() || undefined,
    isBlocked: input.isBlocked,
    blockerReason: input.isBlocked ? input.blockerReason?.trim() || undefined : undefined,
    updatedAt,
    updatedBy: input.updatedBy,
  };

  const current = readAll();
  writeAll([record, ...current.filter((item) => item.recommendationId !== recommendation.id)]);
  return record;
}

export function isOperationallyOverdue(metadata: DecisionOperationalMetadata, now = new Date()): boolean {
  if (!metadata.dueAt) return false;
  return new Date(metadata.dueAt).getTime() < now.getTime();
}
