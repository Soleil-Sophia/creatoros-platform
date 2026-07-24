import type { DecisionDailyFocusItem } from './dailyFocus';

const FOCUS_PLAN_KEY = 'creatoros-decision-focus-plan-v1';

export interface DecisionFocusPlanItem {
  recommendationId: string;
  signalId: string;
  title: string;
  plannedAction: string;
  originalRank: number;
  originalScore: number;
  order: number;
}

export interface DecisionFocusPlan {
  date: string;
  items: DecisionFocusPlanItem[];
  overrideReason?: string;
  confirmedBy: string;
  confirmedAt: string;
  updatedAt: string;
}

function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readAll(): DecisionFocusPlan[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(FOCUS_PLAN_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DecisionFocusPlan[]) : [];
  } catch {
    return [];
  }
}

function writeAll(plans: DecisionFocusPlan[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(FOCUS_PLAN_KEY, JSON.stringify(plans));
}

export function listDecisionFocusPlans(): DecisionFocusPlan[] {
  return readAll().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getDecisionFocusPlan(date = new Date()): DecisionFocusPlan | null {
  const key = localDateKey(date);
  return readAll().find((plan) => plan.date === key) ?? null;
}

export function createFocusPlanItems(items: DecisionDailyFocusItem[]): DecisionFocusPlanItem[] {
  return items.map((item, index) => ({
    recommendationId: item.recommendationId,
    signalId: item.signal.id,
    title: item.recommendationTitle,
    plannedAction: item.suggestedAction,
    originalRank: item.rank,
    originalScore: item.score,
    order: index + 1,
  }));
}

export function saveDecisionFocusPlan(
  items: DecisionFocusPlanItem[],
  confirmedBy: string,
  overrideReason?: string,
  date = new Date(),
): DecisionFocusPlan {
  const key = localDateKey(date);
  const existing = getDecisionFocusPlan(date);
  const now = new Date().toISOString();
  const normalizedItems = items.slice(0, 3).map((item, index) => ({ ...item, order: index + 1 }));

  const plan: DecisionFocusPlan = {
    date: key,
    items: normalizedItems,
    overrideReason: overrideReason?.trim() || undefined,
    confirmedBy,
    confirmedAt: existing?.confirmedAt || now,
    updatedAt: now,
  };

  writeAll([plan, ...readAll().filter((candidate) => candidate.date !== key)]);
  return plan;
}

export function clearDecisionFocusPlan(date = new Date()): void {
  const key = localDateKey(date);
  writeAll(readAll().filter((plan) => plan.date !== key));
}
