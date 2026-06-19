export type BrandProfile = {
  brandName: string;
  voiceTone: string;
  voiceComplexity: string;
  voiceFormality: string;
  voiceEnergy: string;
  voiceLabel?: string;
  updatedAt?: string;
};

/**
 * Three-state readiness for the BrandOS module.
 *
 * - `not_started`  – no voice fields have been filled in yet
 * - `in_progress`  – at least one field is filled but not all four
 * - `complete`     – all four voice fields (tone, complexity, formality, energy) are non-empty
 */
export type BrandOSReadinessStatus = 'not_started' | 'in_progress' | 'complete';
