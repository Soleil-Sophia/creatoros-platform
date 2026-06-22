import type { InstagramAssetV1 } from './instagramAsset';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const IA_001: ValidationRule<InstagramAssetV1> = {
  id: 'IA-001',
  description: 'Channel must be "instagram"',
  validate: (asset): ValidationViolation | null => {
    if (asset.channel !== 'instagram') {
      return {
        field: 'channel',
        message: `IA-001: Channel must be "instagram", got "${asset.channel}"`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_002: ValidationRule<InstagramAssetV1> = {
  id: 'IA-002',
  description: 'Format must be a recognized Instagram format',
  validate: (asset): ValidationViolation | null => {
    const valid = new Set(['reel', 'carousel', 'story', 'post']);
    if (!valid.has(asset.format)) {
      return {
        field: 'format',
        message: `IA-002: Format "${asset.format}" is not a recognized Instagram format`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_003: ValidationRule<InstagramAssetV1> = {
  id: 'IA-003',
  description: 'Hook must be a non-empty string',
  validate: (asset): ValidationViolation | null => {
    if (!asset.hook || asset.hook.trim().length === 0) {
      return {
        field: 'hook',
        message: 'IA-003: Hook must be non-empty',
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_004: ValidationRule<InstagramAssetV1> = {
  id: 'IA-004',
  description: 'Body skeleton must be a non-empty string',
  validate: (asset): ValidationViolation | null => {
    if (!asset.bodySkeleton || asset.bodySkeleton.trim().length === 0) {
      return {
        field: 'bodySkeleton',
        message: 'IA-004: Body skeleton must be non-empty',
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_005: ValidationRule<InstagramAssetV1> = {
  id: 'IA-005',
  description: 'CTA must be a non-empty string',
  validate: (asset): ValidationViolation | null => {
    if (!asset.cta || asset.cta.trim().length === 0) {
      return {
        field: 'cta',
        message: 'IA-005: CTA must be non-empty',
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_006: ValidationRule<InstagramAssetV1> = {
  id: 'IA-006',
  description: 'artifact_hash must be present and non-empty',
  validate: (asset): ValidationViolation | null => {
    if (!asset.artifactHash || asset.artifactHash.trim().length === 0) {
      return {
        field: 'artifactHash',
        message: 'IA-006: artifact_hash must be computed from content core before the asset is valid',
        severity: 'error',
      };
    }
    return null;
  },
};

export const instagramAssetValidationSchema: ValidationSchema<InstagramAssetV1> = {
  rules: [IA_001, IA_002, IA_003, IA_004, IA_005, IA_006],
};
