import type { DecisionAttentionSignal } from './attention';

const ATTENTION_STATE_KEY = 'creatoros-decision-attention-state-v1';

export type AttentionDisposition = 'acknowledged' | 'snoozed';

export interface DecisionAttentionState {
  signalId: string;
  disposition: AttentionDisposition;
  acknowledgedBy: string;
  acknowledgedAt: string;
  snoozedUntil?: string;
  note?: string;
}

function readAll(): DecisionAttentionState[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ATTENTION_STATE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DecisionAttentionState[]) : [];
  } catch {
    return [];
  }
}

function writeAll(items: DecisionAttentionState[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ATTENTION_STATE_KEY, JSON.stringify(items));
}

export function listDecisionAttentionStates(): DecisionAttentionState[] {
  return readAll().sort((a, b) => (a.acknowledgedAt < b.acknowledgedAt ? 1 : -1));
}

export function getDecisionAttentionState(signalId: string): DecisionAttentionState | null {
  return readAll().find((item) => item.signalId === signalId) ?? null;
}

export function acknowledgeDecisionAttentionSignal(
  signal: DecisionAttentionSignal,
  acknowledgedBy: string,
  note?: string,
): DecisionAttentionState {
  const state: DecisionAttentionState = {
    signalId: signal.id,
    disposition: 'acknowledged',
    acknowledgedBy,
    acknowledgedAt: new Date().toISOString(),
    note: note?.trim() || undefined,
  };
  writeAll([state, ...readAll().filter((item) => item.signalId !== signal.id)]);
  return state;
}

export function snoozeDecisionAttentionSignal(
  signal: DecisionAttentionSignal,
  snoozedUntil: string,
  acknowledgedBy: string,
  note?: string,
): DecisionAttentionState {
  if (new Date(snoozedUntil).getTime() <= Date.now()) {
    throw new Error('Snooze time must be in the future.');
  }

  const state: DecisionAttentionState = {
    signalId: signal.id,
    disposition: 'snoozed',
    acknowledgedBy,
    acknowledgedAt: new Date().toISOString(),
    snoozedUntil,
    note: note?.trim() || undefined,
  };
  writeAll([state, ...readAll().filter((item) => item.signalId !== signal.id)]);
  return state;
}

export function clearDecisionAttentionState(signalId: string): void {
  writeAll(readAll().filter((item) => item.signalId !== signalId));
}

export function isDecisionAttentionSignalVisible(
  signal: DecisionAttentionSignal,
  state: DecisionAttentionState | null,
  now = new Date(),
): boolean {
  if (!state) return true;
  if (state.disposition === 'snoozed' && state.snoozedUntil) {
    return new Date(state.snoozedUntil).getTime() <= now.getTime();
  }
  return false;
}
