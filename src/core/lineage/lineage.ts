export type LineageEventType =
  | 'created'
  | 'edited'
  | 'validated'
  | 'decomposed'
  | 'exported'
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

export function createLineageRecord(
  _assetId: string,
  _sourceModule: string,
): LineageRecord {
  throw new Error('createLineageRecord: not yet implemented');
}

export function appendLineageEvent(
  _record: LineageRecord,
  _event: LineageEvent,
): LineageRecord {
  throw new Error('appendLineageEvent: not yet implemented');
}

export function getLineageChain(_assetId: string): LineageRecord[] {
  throw new Error('getLineageChain: not yet implemented');
}
