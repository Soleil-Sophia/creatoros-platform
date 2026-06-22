import type { Blueprint } from '../../blueprint';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const BV_001: ValidationRule<Blueprint> = {
  id: 'BV-001',
  description: 'Blueprint slug must be non-empty and kebab-case (lowercase letters, numbers, hyphens only)',
  validate: (blueprint): ValidationViolation | null => {
    const kebabCase = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    if (!blueprint.slug || !kebabCase.test(blueprint.slug)) {
      return {
        field: 'slug',
        message: `BV-001: Slug "${blueprint.slug}" must be kebab-case (e.g. "mini-kpi-card")`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const BV_002: ValidationRule<Blueprint> = {
  id: 'BV-002',
  description: 'Blueprint must define at least one field',
  validate: (blueprint): ValidationViolation | null => {
    if (!blueprint.fields || blueprint.fields.length === 0) {
      return {
        field: 'fields',
        message: 'BV-002: Blueprint must have at least one field defined',
        severity: 'error',
      };
    }
    return null;
  },
};

export const BV_003: ValidationRule<Blueprint> = {
  id: 'BV-003',
  description: 'Every field must have a non-empty label',
  validate: (blueprint): ValidationViolation | null => {
    const unlabelled = blueprint.fields.find(
      (f) => !f.label || f.label.trim().length === 0,
    );
    if (unlabelled) {
      return {
        field: `fields.${unlabelled.key}.label`,
        message: `BV-003: Field "${unlabelled.key}" is missing a label`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const blueprintValidationSchema: ValidationSchema<Blueprint> = {
  rules: [BV_001, BV_002, BV_003],
};
