import type { BrandProfile } from './types';
import { emptyBrandProfile } from './defaultBrandProfile';

export const BRAND_PROFILE_STORAGE_KEY = 'creatoros-brand-profile-v1';

function isBrandProfileShape(value: unknown): value is BrandProfile {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.tone === 'string' &&
    typeof v.complexity === 'string' &&
    typeof v.formality === 'string' &&
    typeof v.energy === 'string'
  );
}

export function readBrandProfile(): BrandProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(BRAND_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isBrandProfileShape(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeBrandProfile(profile: BrandProfile): BrandProfile {
  const next: BrandProfile = {
    ...profile,
    voiceLabel: profile.voiceLabel ?? createVoiceLabel(profile),
    updatedAt: new Date().toISOString(),
  };
  if (typeof window === 'undefined') return next;
  try {
    window.localStorage.setItem(BRAND_PROFILE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota / serialization — swallow; caller still gets the in-memory value
  }
  return next;
}

export function clearBrandProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(BRAND_PROFILE_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Produce a short, human-friendly label for the saved brand voice.
 * Prefers the tone, falls back to formality/energy, then to "Custom Voice".
 */
export function createVoiceLabel(profile: BrandProfile): string {
  const tone = profile.tone?.trim();
  const formality = profile.formality?.trim();
  const energy = profile.energy?.trim();

  if (tone) return tone;
  if (formality && energy) return `${formality} · ${energy}`;
  if (formality) return formality;
  if (energy) return energy;
  return 'Custom Voice';
}

export function isBrandProfileMeaningful(profile: BrandProfile | null | undefined): boolean {
  if (!profile) return false;
  return Boolean(
    profile.tone.trim() ||
      profile.complexity.trim() ||
      profile.formality.trim() ||
      profile.energy.trim()
  );
}

// Re-export the empty shape so consumers can use a single import for initial state.
export { emptyBrandProfile };
