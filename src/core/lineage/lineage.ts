export type LineageEventType =
  | 'created'
  | 'edited'
  | 'validated'
  | 'decomposed'
  | 'exported'
  | 'asset_generated'
  | 'launch_assigned'
  | 'published'
  | 'measured'
  | 'handoff';

export interface LineageEvent {
  eventType: LineageEventType;
  actorId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface LineageRecord {
  assetId: string;
  sourceModule: string;
  targetModule?: string;
  events: LineageEvent[];
  createdAt: string;
  updatedAt: string;
}

const store = new Map<string, LineageRecord[]>();

export function createLineageRecord(
  assetId: string,
  sourceModule: string,
): LineageRecord {
  const now = new Date().toISOString();
  const record: LineageRecord = {
    assetId,
    sourceModule,
    events: [{ eventType: 'created', actorId: 'system', timestamp: now }],
    createdAt: now,
    updatedAt: now,
  };
  const chain = store.get(assetId) ?? [];
  chain.push(record);
  store.set(assetId, chain);
  return record;
}

export function appendLineageEvent(
  record: LineageRecord,
  event: LineageEvent,
): LineageRecord {
  const updated: LineageRecord = {
    ...record,
    events: [...record.events, event],
    updatedAt: new Date().toISOString(),
  };
  const chain = store.get(record.assetId) ?? [];
  const idx = chain.findIndex((r) => r.createdAt === record.createdAt);
  if (idx >= 0) {
    chain[idx] = updated;
  } else {
    chain.push(updated);
  }
  store.set(record.assetId, chain);
  return updated;
}

export function getLineageChain(assetId: string): LineageRecord[] {
  return store.get(assetId) ?? [];
}
