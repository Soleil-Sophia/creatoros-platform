import type { BrandProfile } from './types';
import { emptyBrandProfile } from './defaultBrandProfile';

export const BRAND_PROFILE_STORAGE_KEY = 'creatoros-brand-profile-v1';

export const REQUIRED_BRAND_PROFILE_FIELDS = [
  'brandName',
  'voiceTone',
  'voiceComplexity',
  'voiceFormality',
  'voiceEnergy',
] as const;

export type BrandProfileStatus = 'not_started' | 'in_progress' | 'complete';

type RequiredBrandProfileField = (typeof REQUIRED_BRAND_PROFILE_FIELDS)[number];
type BrandProfileFieldMap = Record<RequiredBrandProfileField, string[]>;

const BRAND_PROFILE_FIELD_ALIASES: BrandProfileFieldMap = {
  brandName: ['brandName', 'brand_name'],
  voiceTone: ['voiceTone', 'tone', 'voice_tone'],
  voiceComplexity: ['voiceComplexity', 'complexity', 'voice_complexity'],
  voiceFormality: ['voiceFormality', 'formality', 'voice_formality'],
  voiceEnergy: ['voiceEnergy', 'energy', 'voice_energy'],
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function getFirstNonEmptyString(profile: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const value = profile[key];
    if (typeof value !== 'string') continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function getMigratedBrandName(
  voiceTone: string,
  voiceComplexity: string,
  voiceFormality: string,
  voiceEnergy: string,
  voiceLabel?: string
): string {
  if (voiceTone && voiceComplexity && voiceFormality && voiceEnergy) {
    return voiceLabel ?? voiceTone;
  }
  return '';
}

function getFieldValue(profile: BrandProfile, field: RequiredBrandProfileField): string {
  for (const key of BRAND_PROFILE_FIELD_ALIASES[field]) {
    const value = profile[key as keyof BrandProfile];
    if (typeof value !== 'string') continue;
    const trimmed = value.trim();
    if (trimmed) return trimmed;
  }
  return '';
}

function normalizeStoredProfile(profile: Record<string, unknown>): BrandProfile {
  const voiceTone = getFirstNonEmptyString(profile, 'voiceTone', 'tone', 'voice_tone');
  const voiceComplexity = getFirstNonEmptyString(profile, 'voiceComplexity', 'complexity', 'voice_complexity');
  const voiceFormality = getFirstNonEmptyString(profile, 'voiceFormality', 'formality', 'voice_formality');
  const voiceEnergy = getFirstNonEmptyString(profile, 'voiceEnergy', 'energy', 'voice_energy');
  const voiceLabel = getFirstNonEmptyString(profile, 'voiceLabel', 'voice_label') || undefined;
  const brandName =
    getFirstNonEmptyString(profile, 'brandName', 'brand_name') ||
    getMigratedBrandName(voiceTone, voiceComplexity, voiceFormality, voiceEnergy, voiceLabel);
  const updatedAt = getFirstNonEmptyString(profile, 'updatedAt') || undefined;

  const next: BrandProfile = {
    brandName,
    voiceTone,
    voiceComplexity,
    voiceFormality,
    voiceEnergy,
  };

  if (voiceLabel) next.voiceLabel = voiceLabel;
  if (updatedAt) next.updatedAt = updatedAt;

  return next;
}

export function getBrandProfileStatus(profile: BrandProfile | null | undefined): BrandProfileStatus {
  const filledCount = getFilledBrandProfileFieldCount(profile);

  if (filledCount === 0) return 'not_started';
  if (filledCount === REQUIRED_BRAND_PROFILE_FIELDS.length) return 'complete';
  return 'in_progress';
}

export function getFilledBrandProfileFieldCount(profile: BrandProfile | null | undefined): number {
  if (!profile) return 0;
  return REQUIRED_BRAND_PROFILE_FIELDS.filter((field) => getFieldValue(profile, field)).length;
}

export function readBrandProfile(): BrandProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(BRAND_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isPlainObject(parsed)) return null;
    return normalizeStoredProfile(parsed);
  } catch {
    return null;
  }
}

export function writeBrandProfile(profile: BrandProfile): BrandProfile {
  const normalized = normalizeStoredProfile(profile);
  const next: BrandProfile = {
    ...normalized,
    voiceLabel: profile.voiceLabel?.trim() || normalized.voiceLabel || createVoiceLabel(normalized),
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
  const tone = getFirstNonEmptyString(profile, 'voiceTone', 'tone', 'voice_tone');
  const formality = getFirstNonEmptyString(profile, 'voiceFormality', 'formality', 'voice_formality');
  const energy = getFirstNonEmptyString(profile, 'voiceEnergy', 'energy', 'voice_energy');

  if (tone) return tone;
  if (formality && energy) return `${formality} · ${energy}`;
  if (formality) return formality;
  if (energy) return energy;
  return 'Custom Voice';
}

export function isBrandProfileMeaningful(profile: BrandProfile | null | undefined): boolean {
  return getBrandProfileStatus(profile) !== 'not_started';
}

export function isBrandProfileComplete(profile: BrandProfile | null | undefined): boolean {
  return getBrandProfileStatus(profile) === 'complete';
}

// Re-export the empty shape so consumers can use a single import for initial state.
export { emptyBrandProfile };
