import { _assetIdIndex } from './assetRegistry';
import type { RegistryEntry } from './assetRegistry';

export interface AssetVersionHistory {
  assetId: string;
  versions: RegistryEntry[];
  latestVersion: number;
  latestArtifactHash: string;
}

export function getAssetVersions(assetId: string): RegistryEntry[] {
  return _assetIdIndex.get(assetId) ?? [];
}

export function getLatestVersion(assetId: string): RegistryEntry | null {
  const versions = getAssetVersions(assetId);
  return versions.length > 0 ? versions[versions.length - 1] : null;
}

export function getAssetVersionHistory(assetId: string): AssetVersionHistory | null {
  const versions = getAssetVersions(assetId);
  if (versions.length === 0) return null;

  const latest = versions[versions.length - 1];
  return {
    assetId,
    versions,
    latestVersion: latest.version,
    latestArtifactHash: latest.artifactHash,
  };
}
