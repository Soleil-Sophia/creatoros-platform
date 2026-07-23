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

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function normalizeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function normalizePositiveInteger(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isInteger(value) && value > 0
    ? value
    : undefined;
}

function getFieldValue(profile: BrandProfile, field: RequiredBrandProfileField): string {
  return profile[field].trim();
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
    const legacy = parsed as Record<string, unknown>;
    const voiceTone = normalizeString(legacy.voiceTone ?? legacy.tone).trim();
    const voiceComplexity = normalizeString(legacy.voiceComplexity ?? legacy.complexity).trim();
    const voiceFormality = normalizeString(legacy.voiceFormality ?? legacy.formality).trim();
    const voiceEnergy = normalizeString(legacy.voiceEnergy ?? legacy.energy).trim();
    const voiceLabel = normalizeString(legacy.voiceLabel).trim() || undefined;
    let brandName = normalizeString(legacy.brandName).trim();

    if (!brandName && voiceTone && voiceComplexity && voiceFormality && voiceEnergy) {
      brandName = voiceLabel ?? voiceTone;
    }

    return {
      brandName,
      voiceTone,
      voiceComplexity,
      voiceFormality,
      voiceEnergy,
      voiceLabel,
      updatedAt: normalizeString(legacy.updatedAt) || undefined,
      canonicalRevision: normalizePositiveInteger(legacy.canonicalRevision),
      canonicalSourceRecommendationId:
        normalizeString(legacy.canonicalSourceRecommendationId) || undefined,
      canonicalApprovedAt: normalizeString(legacy.canonicalApprovedAt) || undefined,
      canonicalApprovedBy: normalizeString(legacy.canonicalApprovedBy) || undefined,
    };
  } catch {
    return null;
  }
}

export function writeBrandProfile(profile: BrandProfile): BrandProfile {
  const next: BrandProfile = {
    brandName: profile.brandName.trim(),
    voiceTone: profile.voiceTone.trim(),
    voiceComplexity: profile.voiceComplexity.trim(),
    voiceFormality: profile.voiceFormality.trim(),
    voiceEnergy: profile.voiceEnergy.trim(),
    voiceLabel: profile.voiceLabel ?? createVoiceLabel(profile),
    updatedAt: new Date().toISOString(),
    canonicalRevision: profile.canonicalRevision,
    canonicalSourceRecommendationId: profile.canonicalSourceRecommendationId,
    canonicalApprovedAt: profile.canonicalApprovedAt,
    canonicalApprovedBy: profile.canonicalApprovedBy,
  };

  if (typeof window === 'undefined') return next;
  try {
    window.localStorage.setItem(BRAND_PROFILE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // quota / serialization — caller still receives the in-memory value
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

export function createVoiceLabel(profile: BrandProfile): string {
  const tone = profile.voiceTone?.trim();
  const formality = profile.voiceFormality?.trim();
  const energy = profile.voiceEnergy?.trim();
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

export { emptyBrandProfile };
