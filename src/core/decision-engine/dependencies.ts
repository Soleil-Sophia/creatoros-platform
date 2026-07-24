import type { PlatformRecommendation } from './types';

const DEPENDENCIES_KEY = 'creatoros-decision-dependencies-v1';

export interface DecisionDependency {
  id: string;
  blockerRecommendationId: string;
  blockedRecommendationId: string;
  reason?: string;
  createdBy: string;
  createdAt: string;
}

function readAll(): DecisionDependency[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(DEPENDENCIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DecisionDependency[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: DecisionDependency[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DEPENDENCIES_KEY, JSON.stringify(items));
}

export function listDecisionDependencies(): DecisionDependency[] {
  return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getBlockingDependencies(recommendationId: string): DecisionDependency[] {
  return readAll().filter((item) => item.blockedRecommendationId === recommendationId);
}

export function getBlockedDependents(recommendationId: string): DecisionDependency[] {
  return readAll().filter((item) => item.blockerRecommendationId === recommendationId);
}

function hasPath(fromId: string, targetId: string, dependencies: DecisionDependency[]): boolean {
  const visited = new Set<string>();
  const stack = [fromId];

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (current === targetId) return true;
    if (visited.has(current)) continue;
    visited.add(current);

    dependencies
      .filter((item) => item.blockerRecommendationId === current)
      .forEach((item) => stack.push(item.blockedRecommendationId));
  }

  return false;
}

export function createDecisionDependency(
  blocker: PlatformRecommendation,
  blocked: PlatformRecommendation,
  createdBy: string,
  reason?: string,
): DecisionDependency {
  if (blocker.id === blocked.id) {
    throw new Error('A recommendation cannot depend on itself.');
  }

  const current = readAll();
  const duplicate = current.some(
    (item) =>
      item.blockerRecommendationId === blocker.id &&
      item.blockedRecommendationId === blocked.id,
  );
  if (duplicate) {
    throw new Error('This dependency already exists.');
  }

  if (hasPath(blocked.id, blocker.id, current)) {
    throw new Error('This dependency would create a cycle.');
  }

  return {
    id: crypto.randomUUID(),
    blockerRecommendationId: blocker.id,
    blockedRecommendationId: blocked.id,
    reason: reason?.trim() || undefined,
    createdBy,
    createdAt: new Date().toISOString(),
  };
}

export function saveDecisionDependency(dependency: DecisionDependency): DecisionDependency {
  writeAll([dependency, ...readAll()]);
  return dependency;
}

export function deleteDecisionDependency(id: string): void {
  writeAll(readAll().filter((item) => item.id !== id));
}

export function isDependencyResolved(
  dependency: DecisionDependency,
  recommendations: PlatformRecommendation[],
): boolean {
  const blocker = recommendations.find((item) => item.id === dependency.blockerRecommendationId);
  return blocker ? ['implemented', 'observed', 'rejected'].includes(blocker.status) : false;
}

export function getUnresolvedBlockingDependencies(
  recommendationId: string,
  recommendations: PlatformRecommendation[],
): DecisionDependency[] {
  return getBlockingDependencies(recommendationId).filter(
    (dependency) => !isDependencyResolved(dependency, recommendations),
  );
}
