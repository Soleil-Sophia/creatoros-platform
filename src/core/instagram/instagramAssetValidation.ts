import type { InstagramAssetV1, InstagramAssetValidationReport } from './instagramAsset';
import type { ValidationRule, ValidationSchema, ValidationViolation, ValidationResult } from '../validation';

// ── Existing rules ────────────────────────────────────────────────────────────

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
  description: 'Format must be reel, carousel, or story',
  validate: (asset): ValidationViolation | null => {
    const valid = new Set<string>(['reel', 'carousel', 'story']);
    if (!valid.has(asset.format)) {
      return {
        field: 'format',
        message: `IA-002: Format "${asset.format}" is not valid — must be reel, carousel, or story`,
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

// ── Sprint 6 hardening ────────────────────────────────────────────────────────

export const IA_007: ValidationRule<InstagramAssetV1> = {
  id: 'IA-007',
  description: 'Body skeleton must have non-zero length (explicit gate)',
  validate: (asset): ValidationViolation | null => {
    if (asset.bodySkeleton.length === 0) {
      return {
        field: 'bodySkeleton',
        message: 'IA-007: body_skeleton.length must be > 0',
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_008: ValidationRule<InstagramAssetV1> = {
  id: 'IA-008',
  description: 'title, hook, and cta are all required and non-empty',
  validate: (asset): ValidationViolation | null => {
    const missing: string[] = [];
    if (!asset.title || asset.title.trim().length === 0) missing.push('title');
    if (!asset.hook  || asset.hook.trim().length  === 0) missing.push('hook');
    if (!asset.cta   || asset.cta.trim().length   === 0) missing.push('cta');
    if (missing.length > 0) {
      return {
        field: missing.join(', '),
        message: `IA-008: Required content field(s) missing or empty: "${missing.join('", "')}"`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const IA_011: ValidationRule<InstagramAssetV1> = {
  id: 'IA-011',
  description: 'Intent must be awareness, consideration, or conversion',
  validate: (asset): ValidationViolation | null => {
    const valid = new Set<string>(['awareness', 'consideration', 'conversion']);
    if (!valid.has(asset.intent)) {
      return {
        field: 'intent',
        message: `IA-011: Intent "${asset.intent}" is not valid — must be awareness, consideration, or conversion`,
        severity: 'error',
      };
    }
    return null;
  },
};

// ── Schema ────────────────────────────────────────────────────────────────────

export const instagramAssetValidationSchema: ValidationSchema<InstagramAssetV1> = {
  rules: [IA_001, IA_002, IA_003, IA_004, IA_005, IA_006, IA_007, IA_008, IA_011],
};

// ── Instagram Validation Report ───────────────────────────────────────────────

export function generateInstagramReport(
  iaResult: ValidationResult,
  avResult: ValidationResult,
): InstagramAssetValidationReport {
  const fails = [
    ...iaResult.violations.map((v) => v.ruleId ?? v.field),
    ...avResult.violations.map((v) => v.ruleId ?? v.field),
  ];
  return {
    results: {
      instagram_validity: iaResult.valid ? 'pass' : 'fail',
      asset_validity:     avResult.valid  ? 'pass' : 'fail',
    },
    fails,
  };
}
