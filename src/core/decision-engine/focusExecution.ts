const FOCUS_EXECUTION_KEY = 'creatoros-decision-focus-execution-v1';

export type FocusExecutionStatus = 'planned' | 'in_progress' | 'completed' | 'deferred';

export interface DecisionFocusExecutionItem {
  date: string;
  signalId: string;
  recommendationId: string;
  status: FocusExecutionStatus;
  startedAt?: string;
  completedAt?: string;
  deferredAt?: string;
  note?: string;
  updatedBy: string;
  updatedAt: string;
}

export interface DecisionFocusDayClose {
  date: string;
  summary: string;
  completedCount: number;
  deferredCount: number;
  closedBy: string;
  closedAt: string;
}

type FocusExecutionStore = {
  items: DecisionFocusExecutionItem[];
  dayCloses: DecisionFocusDayClose[];
};

function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readStore(): FocusExecutionStore {
  if (typeof window === 'undefined') return { items: [], dayCloses: [] };
  try {
    const parsed = JSON.parse(window.localStorage.getItem(FOCUS_EXECUTION_KEY) || '{}');
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      dayCloses: Array.isArray(parsed.dayCloses) ? parsed.dayCloses : [],
    };
  } catch {
    return { items: [], dayCloses: [] };
  }
}

function writeStore(store: FocusExecutionStore): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(FOCUS_EXECUTION_KEY, JSON.stringify(store));
}

export function listAllDecisionFocusExecutionItems(): DecisionFocusExecutionItem[] {
  return readStore().items.sort((a, b) => (a.date < b.date ? 1 : a.updatedAt < b.updatedAt ? 1 : -1));
}

export function listDecisionFocusDayCloses(): DecisionFocusDayClose[] {
  return readStore().dayCloses.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function listDecisionFocusExecutionItems(date = new Date()): DecisionFocusExecutionItem[] {
  const key = localDateKey(date);
  return readStore().items.filter((item) => item.date === key);
}

export function getDecisionFocusExecutionItem(signalId: string, date = new Date()): DecisionFocusExecutionItem | null {
  const key = localDateKey(date);
  return readStore().items.find((item) => item.date === key && item.signalId === signalId) ?? null;
}

export function updateDecisionFocusExecutionItem(input: {
  signalId: string;
  recommendationId: string;
  status: FocusExecutionStatus;
  updatedBy: string;
  note?: string;
  date?: Date;
}): DecisionFocusExecutionItem {
  const date = input.date || new Date();
  const key = localDateKey(date);
  const store = readStore();
  const existing = store.items.find((item) => item.date === key && item.signalId === input.signalId);
  const now = new Date().toISOString();

  const item: DecisionFocusExecutionItem = {
    date: key,
    signalId: input.signalId,
    recommendationId: input.recommendationId,
    status: input.status,
    startedAt: input.status === 'in_progress' ? existing?.startedAt || now : existing?.startedAt,
    completedAt: input.status === 'completed' ? now : undefined,
    deferredAt: input.status === 'deferred' ? now : undefined,
    note: input.note?.trim() || existing?.note,
    updatedBy: input.updatedBy,
    updatedAt: now,
  };

  writeStore({
    ...store,
    items: [item, ...store.items.filter((candidate) => !(candidate.date === key && candidate.signalId === input.signalId))],
  });
  return item;
}

export function getDecisionFocusDayClose(date = new Date()): DecisionFocusDayClose | null {
  const key = localDateKey(date);
  return readStore().dayCloses.find((item) => item.date === key) ?? null;
}

export function closeDecisionFocusDay(summary: string, closedBy: string, date = new Date()): DecisionFocusDayClose {
  const key = localDateKey(date);
  const store = readStore();
  const executions = store.items.filter((item) => item.date === key);
  const close: DecisionFocusDayClose = {
    date: key,
    summary: summary.trim(),
    completedCount: executions.filter((item) => item.status === 'completed').length,
    deferredCount: executions.filter((item) => item.status === 'deferred').length,
    closedBy,
    closedAt: new Date().toISOString(),
  };
  writeStore({ ...store, dayCloses: [close, ...store.dayCloses.filter((item) => item.date !== key)] });
  return close;
}
