import type { RegistryEntry } from '../registry';
import type { BrandProfile } from '../brand';
import {
  saveAsset,
  listSavedAssets,
  CONTENT_LIBRARY_STORAGE_KEY,
} from '../../app/lib/content-library/storage';
import { registryEntryToLibraryAsset } from './libraryMapper';

export interface LibrarySyncResult {
  synced: boolean;
  isDuplicate: boolean;
  artifactHash: string;
  id: string;
}

export function isAlreadyInLibrary(artifactHash: string): boolean {
  return listSavedAssets().some((a) => a.id === artifactHash);
}

export function syncRegistryEntryToLibrary(
  entry: RegistryEntry,
  brandProfile?: BrandProfile,
): LibrarySyncResult {
  const artifactHash = entry.artifactHash;

  if (isAlreadyInLibrary(artifactHash)) {
    return { synced: false, isDuplicate: true, artifactHash, id: artifactHash };
  }

  const libraryAsset = registryEntryToLibraryAsset(entry, brandProfile);
  const { persisted } = saveAsset(libraryAsset);

  return { synced: persisted, isDuplicate: false, artifactHash, id: libraryAsset.id };
}

export function getLibraryStats(): { total: number; storageKey: string } {
  return {
    total:      listSavedAssets().length,
    storageKey: CONTENT_LIBRARY_STORAGE_KEY,
  };
}
