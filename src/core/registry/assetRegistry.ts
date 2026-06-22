import type { InstagramAssetV1 } from '../instagram';

export interface RegistryEntry {
  assetId: string;       // semantic identity — stable
  artifactHash: string;  // content fingerprint — changes with content
  blueprintHash: string; // spec fingerprint — changes with blueprint
  runId: string;
  version: number;       // increments per assetId across registrations
  registeredAt: string;
  isDuplicate: boolean;  // true if this artifactHash was already registered
  asset: InstagramAssetV1;
}

// Keyed by artifactHash for O(1) deduplication
const byArtifactHash = new Map<string, RegistryEntry>();

// Keyed by assetId for history (multiple versions)
const byAssetId = new Map<string, RegistryEntry[]>();

export function registerAsset(asset: InstagramAssetV1): RegistryEntry {
  // Deduplication: same content → same artifact_hash → skip
  const existing = byArtifactHash.get(asset.artifactHash);
  if (existing) {
    return { ...existing, isDuplicate: true };
  }

  // Version: how many versions of this assetId already exist
  const history = byAssetId.get(asset.assetId) ?? [];
  const version = history.length + 1;

  const entry: RegistryEntry = {
    assetId:       asset.assetId,
    artifactHash:  asset.artifactHash,
    blueprintHash: asset.blueprintHash,
    runId:         asset.runId,
    version,
    registeredAt:  new Date().toISOString(),
    isDuplicate:   false,
    asset,
  };

  byArtifactHash.set(asset.artifactHash, entry);
  byAssetId.set(asset.assetId, [...history, entry]);

  return entry;
}

export function getByArtifactHash(hash: string): RegistryEntry | null {
  return byArtifactHash.get(hash) ?? null;
}

export function getAllAssets(): RegistryEntry[] {
  return Array.from(byArtifactHash.values());
}

export function clearRegistry(): void {
  byArtifactHash.clear();
  byAssetId.clear();
}

export { byAssetId as _assetIdIndex };
