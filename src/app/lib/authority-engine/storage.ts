import type { AuthorityRun } from '../../types/authority';

export const STORAGE_KEY = 'creatoros-authority-runs';

function safeRead(): AuthorityRun[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as AuthorityRun[];
  } catch {
    return [];
  }
}

function safeWrite(runs: AuthorityRun[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  } catch {
    // quota or serialization error — swallow; UI will reflect state on next load
  }
}

export function listRuns(): AuthorityRun[] {
  return safeRead().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function saveRun(run: AuthorityRun): AuthorityRun {
  const all = safeRead();
  const next: AuthorityRun = { ...run, updatedAt: new Date().toISOString() };
  const idx = all.findIndex((r) => r.id === run.id);
  if (idx >= 0) all[idx] = next;
  else all.unshift(next);
  safeWrite(all);
  return next;
}

export function deleteRun(id: string): void {
  const all = safeRead().filter((r) => r.id !== id);
  safeWrite(all);
}

export function getRun(id: string): AuthorityRun | undefined {
  return safeRead().find((r) => r.id === id);
}
