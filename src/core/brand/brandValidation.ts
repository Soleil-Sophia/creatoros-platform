import type { BrandProfile } from './brandProfile';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const BRP_001: ValidationRule<BrandProfile> = {
  id: 'BRP-001',
  description: 'brandName must be a non-empty string',
  validate: (profile): ValidationViolation | null => {
    if (!profile.brandName || profile.brandName.trim().length === 0) {
      return { field: 'brandName', message: 'BRP-001: brandName must be non-empty', severity: 'error' };
    }
    return null;
  },
};

export const BRP_002: ValidationRule<BrandProfile> = {
  id: 'BRP-002',
  description: 'voice must be a non-empty string',
  validate: (profile): ValidationViolation | null => {
    if (!profile.voice || profile.voice.trim().length === 0) {
      return { field: 'voice', message: 'BRP-002: voice must be non-empty', severity: 'error' };
    }
    return null;
  },
};

export const BRP_003: ValidationRule<BrandProfile> = {
  id: 'BRP-003',
  description: 'audience must be a non-empty string',
  validate: (profile): ValidationViolation | null => {
    if (!profile.audience || profile.audience.trim().length === 0) {
      return { field: 'audience', message: 'BRP-003: audience must be non-empty', severity: 'error' };
    }
    return null;
  },
};

export const brandProfileValidationSchema: ValidationSchema<BrandProfile> = {
  rules: [BRP_001, BRP_002, BRP_003],
};
