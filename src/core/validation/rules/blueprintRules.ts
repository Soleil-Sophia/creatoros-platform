import type { Blueprint } from '../../blueprint';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const BV_001: ValidationRule<Blueprint> = {
  id: 'BV-001',
  description: 'Blueprint slug must be non-empty and kebab-case',
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

export const BV_004: ValidationRule<Blueprint> = {
  id: 'BV-004',
  description: 'All required fields must have a valid key format and recognized type',
  validate: (blueprint): ValidationViolation | null => {
    const validKey = /^[a-z][a-z0-9_-]*$/;
    const validTypes = new Set(['text', 'multiline', 'select', 'date', 'number']);
    const invalid = blueprint.fields
      .filter((f) => f.required)
      .find((f) => !validKey.test(f.key) || !validTypes.has(f.type));
    if (invalid) {
      return {
        field: `fields.${invalid.key}`,
        message: `BV-004: Required field "${invalid.key}" has invalid key format or unrecognized type "${invalid.type}"`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const BV_005: ValidationRule<Blueprint> = {
  id: 'BV-005',
  description: 'No two fields may share the same key (state consistency)',
  validate: (blueprint): ValidationViolation | null => {
    const seen = new Set<string>();
    for (const field of blueprint.fields) {
      if (seen.has(field.key)) {
        return {
          field: `fields.${field.key}`,
          message: `BV-005: Duplicate field key "${field.key}" — each field key must be unique`,
          severity: 'error',
        };
      }
      seen.add(field.key);
    }
    return null;
  },
};

export const BV_006: ValidationRule<Blueprint> = {
  id: 'BV-006',
  description: 'Blueprint must declare at least one state',
  validate: (blueprint): ValidationViolation | null => {
    if (!blueprint.states || blueprint.states.length === 0) {
      return {
        field: 'states',
        message: 'BV-006: Blueprint must declare at least one state',
        severity: 'error',
      };
    }
    return null;
  },
};

export const BV_007: ValidationRule<Blueprint> = {
  id: 'BV-007',
  description: 'Blueprint states must be unique — no duplicates allowed',
  validate: (blueprint): ValidationViolation | null => {
    const seen = new Set<string>();
    for (const state of blueprint.states) {
      if (seen.has(state)) {
        return {
          field: 'states',
          message: `BV-007: Duplicate state "${state}" — each state must be unique`,
          severity: 'error',
        };
      }
      seen.add(state);
    }
    return null;
  },
};

export const BV_008: ValidationRule<Blueprint> = {
  id: 'BV-008',
  description: 'All state names must be non-empty strings',
  validate: (blueprint): ValidationViolation | null => {
    const invalid = blueprint.states.find(
      (s) => typeof s !== 'string' || s.trim().length === 0,
    );
    if (invalid !== undefined) {
      return {
        field: 'states',
        message: `BV-008: State name "${String(invalid)}" is empty or invalid`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const blueprintValidationSchema: ValidationSchema<Blueprint> = {
  rules: [BV_001, BV_002, BV_003, BV_004, BV_005, BV_006, BV_007, BV_008],
};
