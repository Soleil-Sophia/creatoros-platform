import type { LaunchPlan, LaunchPlanItem } from './types';

export const LAUNCHOS_STORAGE_KEY = 'creatoros-launchos-plans-v1';

// ─── Truthful write results ───────────────────────────────────────────────
// Platform adaptation (not present in source): the source's safeWrite/
// saveLaunchPlan/deleteLaunchPlan swallow localStorage write failures
// (quota exceeded, serialization errors) and unconditionally report success
// -- saveLaunchPlan always returns the plan as if it had been persisted,
// with no way for a caller to detect a failed write. Low-level writes stay
// non-throwing here (still internally try/catch), but now report a real,
// truthful outcome instead of an unconditional one.

export interface LaunchPlanWriteResult {
  plan: LaunchPlan | null;
  persisted: boolean;
}

export interface LaunchPlanDeleteResult {
  deleted: boolean;
  persisted: boolean;
}

function isLaunchPlan(v: unknown): v is LaunchPlan {
  if (!v || typeof v !== 'object') return false;
  const p = v as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.campaignName === 'string' &&
    typeof p.goal === 'string' &&
    typeof p.targetDate === 'string' &&
    typeof p.frequency === 'string' &&
    Array.isArray(p.assetIds) &&
    Array.isArray(p.items)
  );
}

function safeRead(): LaunchPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LAUNCHOS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLaunchPlan);
  } catch {
    return [];
  }
}

/** Returns true if the write completed, false if it could not be completed. */
function safeWrite(plans: LaunchPlan[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(LAUNCHOS_STORAGE_KEY, JSON.stringify(plans));
    return true;
  } catch {
    // quota / serialization error -- reported to the caller, not swallowed
    return false;
  }
}

export function listLaunchPlans(): LaunchPlan[] {
  return safeRead().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getLaunchPlan(id: string): LaunchPlan | null {
  return safeRead().find((p) => p.id === id) ?? null;
}

export function saveLaunchPlan(plan: LaunchPlan): LaunchPlanWriteResult {
  const all = safeRead();
  const idx = all.findIndex((p) => p.id === plan.id);
  const next = { ...plan, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  const persisted = safeWrite(all);
  return { plan: next, persisted };
}

export function deleteLaunchPlan(id: string): LaunchPlanDeleteResult {
  const all = safeRead();
  const exists = all.some((p) => p.id === id);
  if (!exists) return { deleted: false, persisted: true };
  const persisted = safeWrite(all.filter((p) => p.id !== id));
  return { deleted: true, persisted };
}

export function updateItem(planId: string, itemId: string, patch: Partial<LaunchPlanItem>): LaunchPlanWriteResult {
  const plan = getLaunchPlan(planId);
  if (!plan) return { plan: null, persisted: false };
  const items = plan.items.map((it) => (it.id === itemId ? { ...it, ...patch } : it));
  return saveLaunchPlan({ ...plan, items });
}

export function reorderItems(planId: string, orderedIds: string[]): LaunchPlanWriteResult {
  const plan = getLaunchPlan(planId);
  if (!plan) return { plan: null, persisted: false };
  const byId = new Map(plan.items.map((it) => [it.id, it]));
  const items = orderedIds.map((id) => byId.get(id)).filter(Boolean) as LaunchPlanItem[];
  return saveLaunchPlan({ ...plan, items });
}
