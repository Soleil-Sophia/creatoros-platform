/**
 * Brand Profile Service
 *
 * Single import point for anything that needs to read or write the Brand
 * Profile (BrandOS setup, ContentOS generation, Dashboard, etc.).
 *
 * Consumers should import from here rather than from `storage` directly so
 * that the underlying persistence layer can be swapped without touching every
 * call-site.
 */

export type { BrandProfile } from './types';

export {
  BRAND_PROFILE_STORAGE_KEY,
  readBrandProfile,
  writeBrandProfile,
  clearBrandProfile,
  createVoiceLabel,
  isBrandProfileMeaningful,
  emptyBrandProfile,
} from './storage';
