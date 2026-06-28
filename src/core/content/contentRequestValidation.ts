import type { ContentRequest } from './contentRequest';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const CR_001: ValidationRule<ContentRequest> = {
  id: 'CR-001',
  description: 'topic must be a non-empty string',
  validate: (req): ValidationViolation | null => {
    if (!req.topic || req.topic.trim().length === 0) {
      return { field: 'topic', message: 'CR-001: topic must be non-empty', severity: 'error' };
    }
    return null;
  },
};

export const CR_002: ValidationRule<ContentRequest> = {
  id: 'CR-002',
  description: 'intent must be a valid Instagram intent',
  validate: (req): ValidationViolation | null => {
    const valid = new Set<string>(['awareness', 'consideration', 'conversion']);
    if (!valid.has(req.intent)) {
      return {
        field: 'intent',
        message: `CR-002: intent "${req.intent}" is not valid`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const CR_003: ValidationRule<ContentRequest> = {
  id: 'CR-003',
  description: 'format must be a valid Instagram format',
  validate: (req): ValidationViolation | null => {
    const valid = new Set<string>(['reel', 'carousel', 'story']);
    if (!valid.has(req.format)) {
      return {
        field: 'format',
        message: `CR-003: format "${req.format}" is not valid`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const contentRequestValidationSchema: ValidationSchema<ContentRequest> = {
  rules: [CR_001, CR_002, CR_003],
};
