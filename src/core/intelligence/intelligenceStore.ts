import type { InstagramAssetV1, AssetQualityMeta } from '../instagram/instagramAsset';

// ─── Storage key ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'creatoros-intelligence-v1';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IntelligenceRecord {
  assetId:       string;
  title:         string;
  topic:         string;   // derived from title (first segment before " — ")
  intent:        string;
  format:        string;
  qualityMeta:   AssetQualityMeta;
  savedAt:       string;   // ISO timestamp when this record was persisted
}

// ─── IntelligenceStore ────────────────────────────────────────────────────────
// Persists quality records independently of the asset registry.
// This is the data source for all future intelligence queries and pattern analysis.
//
// Design: append-only per session, full restore on boot.
// When OpenAI lands: records accumulate across generators, enabling comparison.

class IntelligenceStore {
  private records: IntelligenceRecord[] = [];

  get size(): number { return this.records.length; }

  push(asset: InstagramAssetV1): void {
    if (!asset.qualityMeta) return;

    const record: IntelligenceRecord = {
      assetId:     asset.assetId,
      title:       asset.title,
      topic:       asset.title.split(' — ')[0] ?? asset.title,
      intent:      asset.intent,
      format:      asset.format,
      qualityMeta: asset.qualityMeta,
      savedAt:     new Date().toISOString(),
    };

    this.records.push(record);
    this._persist();
  }

  pushAll(assets: InstagramAssetV1[]): void {
    for (const asset of assets) this.push(asset);
  }

  all(): IntelligenceRecord[] {
    return [...this.records];
  }

  restore(): IntelligenceRecord[] {
    try {
      const raw = typeof localStorage !== 'undefined'
        ? localStorage.getItem(STORAGE_KEY)
        : null;
      if (!raw) return [];
      const parsed = JSON.parse(raw) as IntelligenceRecord[];
      this.records = parsed;
      return parsed;
    } catch {
      return [];
    }
  }

  clear(): void {
    this.records = [];
    try {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
    } catch { /* */ }
  }

  private _persist(): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.records));
      }
    } catch { /* */ }
  }
}

export const intelligenceStore = new IntelligenceStore();
