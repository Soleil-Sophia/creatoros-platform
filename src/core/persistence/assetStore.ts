import type { SavedContentAsset } from '../../app/lib/content-library/types';
import { LocalStorageProvider, MemoryProvider } from './storageProvider';
import type { StorageProvider } from './storageProvider';

// Separate key — coexists with the legacy content-library-v1 array format
export const ASSET_STORE_KEY = 'creatoros-asset-store-v1';

// ─── AssetStore ───────────────────────────────────────────────────────────────
// StorageProvider-backed CRUD for SavedContentAsset.
// When Supabase arrives: swap LocalStorageProvider → SupabaseProvider.
// API stays identical.

export class AssetStore {
  constructor(private readonly provider: StorageProvider<SavedContentAsset>) {}

  get providerName(): string { return this.provider.providerName; }

  save(asset: SavedContentAsset): { asset: SavedContentAsset; persisted: boolean } {
    const persisted = this.provider.set(asset.id, asset);
    return { asset, persisted };
  }

  list(): SavedContentAsset[] {
    return this.provider
      .list()
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  delete(id: string): void {
    this.provider.delete(id);
  }

  findById(id: string): SavedContentAsset | null {
    return this.provider.get(id);
  }

  /** artifact_hash is used as id — O(1) lookup. */
  findByArtifactHash(hash: string): SavedContentAsset | null {
    return this.provider.get(hash);
  }

  has(id: string): boolean {
    return this.provider.get(id) !== null;
  }

  count(): number {
    return this.provider.list().length;
  }

  clear(): void {
    this.provider.clear();
  }
}

// ─── Default singleton — LocalStorage-backed ─────────────────────────────────
export const assetStore = new AssetStore(
  new LocalStorageProvider<SavedContentAsset>(ASSET_STORE_KEY),
);

// ─── Test helper: ephemeral MemoryProvider-backed store ──────────────────────
export function createMemoryAssetStore(): AssetStore {
  return new AssetStore(new MemoryProvider<SavedContentAsset>());
}
