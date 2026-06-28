import type { InstagramAssetV1 } from '../instagram';
import { registerAsset, loadRegistryEntries } from '../registry/assetRegistry';
import type { RegistryEntry } from '../registry/assetRegistry';
import { LocalStorageProvider, MemoryProvider } from './storageProvider';
import type { StorageProvider } from './storageProvider';

export const REGISTRY_STORAGE_KEY = 'creatoros-asset-registry-v1';

// ─── RegistryStore ────────────────────────────────────────────────────────────
// Thin persistence wrapper around the in-memory Registry.
// Keyed by artifactHash (unique content fingerprint).

export class RegistryStore {
  constructor(private readonly provider: StorageProvider<RegistryEntry>) {}

  get providerName(): string { return this.provider.providerName; }

  /** Persist an already-registered entry. */
  save(entry: RegistryEntry): void {
    if (!entry.isDuplicate) {
      this.provider.set(entry.artifactHash, entry);
    }
  }

  /** Load all persisted entries and restore the in-memory Registry. */
  restore(): RegistryEntry[] {
    const entries = this.provider.list();
    loadRegistryEntries(entries);
    return entries;
  }

  list(): RegistryEntry[] {
    return this.provider.list();
  }

  findByArtifactHash(hash: string): RegistryEntry | null {
    return this.provider.get(hash);
  }

  clear(): void {
    this.provider.clear();
  }
}

// ─── Default singleton — LocalStorage-backed ─────────────────────────────────
export const registryStore = new RegistryStore(
  new LocalStorageProvider<RegistryEntry>(REGISTRY_STORAGE_KEY),
);

// ─── High-level helper: register in memory AND persist ───────────────────────
export function registerAndPersist(
  asset: InstagramAssetV1,
  store: RegistryStore = registryStore,
): RegistryEntry {
  const existing = store.findByArtifactHash(asset.artifactHash);
  if (existing) return { ...existing, isDuplicate: true };

  const entry = registerAsset(asset);
  store.save(entry);
  return entry;
}

// ─── Test helper: ephemeral MemoryProvider-backed store ──────────────────────
export function createMemoryRegistryStore(): RegistryStore {
  return new RegistryStore(new MemoryProvider<RegistryEntry>());
}
