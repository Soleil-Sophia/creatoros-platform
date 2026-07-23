import type { ContentRecommendation } from '../../../core/creator-intelligence/types';
import { createCreatorRecommendationSnapshot } from './recommendationSnapshot';
import type { SavedContentAsset } from './types';

export const CONTENT_LIBRARY_STORAGE_KEY = 'creatoros-content-library-v1';

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function isContentRecommendation(value: unknown): value is ContentRecommendation {
  if (!isRecord(value)) return false;
  return (
    typeof value.hook === 'string' &&
    typeof value.coreMessage === 'string' &&
    typeof value.cta === 'string' &&
    typeof value.confidence === 'string' &&
    Array.isArray(value.contentStructure) &&
    Array.isArray(value.reasoning) &&
    isRecord(value.brandPolicyCheck) &&
    isRecord(value.measurementPlan)
  );
}

function readRecommendationFromNavigationState(): ContentRecommendation | null {
  if (typeof window === 'undefined') return null;

  const state = window.history.state;
  if (!isRecord(state)) return null;

  const routerState = isRecord(state.usr) ? state.usr : state;
  const reuseAsset = isRecord(routerState.reuseAsset) ? routerState.reuseAsset : null;
  const recommendation = reuseAsset?.creatorRecommendation;

  return isContentRecommendation(recommendation) ? recommendation : null;
}

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

function safeWrite(assets: SavedContentAsset[]): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(CONTENT_LIBRARY_STORAGE_KEY, JSON.stringify(assets));
    return true;
  } catch {
    // quota or serialization error — reported to the caller, not swallowed.
    // Existing callers that ignore this return value keep their prior
    // behavior unchanged (they never see this signal).
    return false;
  }
}

export function listSavedAssets(): SavedContentAsset[] {
  return safeRead().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveAsset(asset: SavedContentAsset): { asset: SavedContentAsset; persisted: boolean } {
  const recommendation = readRecommendationFromNavigationState();
  const assetWithContext: SavedContentAsset = recommendation && !asset.creatorRecommendationSnapshot
    ? {
        ...asset,
        creatorRecommendationSnapshot: createCreatorRecommendationSnapshot(
          recommendation,
          asset.createdAt || new Date().toISOString(),
        ),
      }
    : asset;

  const all = safeRead();
  all.unshift(assetWithContext);
  const persisted = safeWrite(all);
  return { asset: assetWithContext, persisted };
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
