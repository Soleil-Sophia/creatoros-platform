import type { Blueprint, BlueprintState } from '../../blueprint';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const FV_001: ValidationRule<Blueprint> = {
  id: 'FV-001',
  description: 'Every fixture key must be a declared state name',
  validate: (blueprint): ValidationViolation | null => {
    const declaredStates = new Set<string>(blueprint.states);
    const invalidKeys = Object.keys(blueprint.fixtures).filter(
      (key) => !declaredStates.has(key),
    );
    if (invalidKeys.length > 0) {
      return {
        field: 'fixtures',
        message: `FV-001: Fixture key(s) "${invalidKeys.join('", "')}" are not declared in states`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const FV_002: ValidationRule<Blueprint> = {
  id: 'FV-002',
  description: 'A "default" fixture must exist and cover all required fields',
  validate: (blueprint): ValidationViolation | null => {
    const defaultFixture = blueprint.fixtures['default' as BlueprintState];
    if (!defaultFixture) {
      return {
        field: 'fixtures.default',
        message: 'FV-002: A "default" fixture is required',
        severity: 'error',
      };
    }
    const requiredFields = blueprint.fields.filter((f) => f.required).map((f) => f.key);
    const missing = requiredFields.filter((key) => !(key in defaultFixture));
    if (missing.length > 0) {
      return {
        field: 'fixtures.default',
        message: `FV-002: Default fixture is missing required field(s): "${missing.join('", "')}"`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const fixtureValidationSchema: ValidationSchema<Blueprint> = {
  rules: [FV_001, FV_002],
};
