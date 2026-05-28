import type { SavedContentAsset } from './types';

export const CONTENT_LIBRARY_STORAGE_KEY = 'creatoros-content-library-v1';

function isSavedContentAsset(value: unknown): value is SavedContentAsset {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === 'string' &&
    typeof v.type === 'string' &&
    typeof v.title === 'string' &&
    typeof v.preview === 'string' &&
    typeof v.platform === 'string' &&
    typeof v.campaign === 'string' &&
    typeof v.brandVoice === 'string' &&
    typeof v.date === 'string' &&
    typeof v.variants === 'number' &&
    typeof v.status === 'string' &&
    v.source === 'generated' &&
    typeof v.createdAt === 'string' &&
    Array.isArray(v.items) &&
    typeof v.inputs === 'object'
  );
}

function safeRead(): SavedContentAsset[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CONTENT_LIBRARY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedContentAsset);
  } catch {
    return [];
  }
}

function safeWrite(assets: SavedContentAsset[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONTENT_LIBRARY_STORAGE_KEY, JSON.stringify(assets));
  } catch {
    // quota or serialization error — swallow; UI will reflect state on next load
  }
}

export function listSavedAssets(): SavedContentAsset[] {
  return safeRead().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveAsset(asset: SavedContentAsset): SavedContentAsset {
  const all = safeRead();
  all.unshift(asset);
  safeWrite(all);
  return asset;
}

export function deleteSavedAsset(id: string): void {
  const all = safeRead().filter((a) => a.id !== id);
  safeWrite(all);
}

export function clearLibrary(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONTENT_LIBRARY_STORAGE_KEY);
  } catch {
    // ignore
  }
}
