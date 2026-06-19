/**
 * Generation History
 *
 * Tracks a rolling log of content generation attempts (successes and failures)
 * in localStorage. This is separate from the Content Library — the library
 * stores saved assets the user explicitly chooses to keep, while the history
 * records every generation run so the user can review what was produced.
 *
 * Keeps the last HISTORY_LIMIT entries, oldest-first (newest at index 0 after sort).
 */

import type { GenerationHistoryEntry } from './types';

export const GENERATION_HISTORY_KEY = 'creatoros-generation-history-v1';
const HISTORY_LIMIT = 50;

function safeRead(): GenerationHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(GENERATION_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) =>
        e &&
        typeof e.id === 'string' &&
        typeof e.timestamp === 'string' &&
        typeof e.success === 'boolean',
    ) as GenerationHistoryEntry[];
  } catch {
    return [];
  }
}

function safeWrite(entries: GenerationHistoryEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GENERATION_HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // quota — ignore
  }
}

/**
 * Append a new generation run to the history.
 * Trims to the most recent HISTORY_LIMIT entries.
 */
export function addGenerationHistoryEntry(entry: GenerationHistoryEntry): void {
  const existing = safeRead();
  const next = [entry, ...existing].slice(0, HISTORY_LIMIT);
  safeWrite(next);
}

/**
 * Return all stored history entries, newest first.
 */
export function listGenerationHistory(): GenerationHistoryEntry[] {
  return safeRead().sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
}

/**
 * Clear all history entries.
 */
export function clearGenerationHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(GENERATION_HISTORY_KEY);
  } catch {
    // ignore
  }
}
