import type { Blueprint, BlueprintState } from '../../blueprint';
import type { ValidationRule, ValidationSchema, ValidationViolation } from '../validation';

export const FV_001: ValidationRule<Blueprint> = {
  id: 'FV-001',
  description: 'Blueprint must define at least one fixture',
  validate: (blueprint): ValidationViolation | null => {
    if (!blueprint.fixtures || Object.keys(blueprint.fixtures).length === 0) {
      return {
        field: 'fixtures',
        message: 'FV-001: Blueprint must define at least one fixture',
        severity: 'error',
      };
    }
    return null;
  },
};

export const FV_002: ValidationRule<Blueprint> = {
  id: 'FV-002',
  description: 'Every fixture key must correspond to a declared state',
  validate: (blueprint): ValidationViolation | null => {
    const declaredStates = new Set<string>(blueprint.states);
    const invalidKeys = Object.keys(blueprint.fixtures).filter(
      (key) => !declaredStates.has(key),
    );
    if (invalidKeys.length > 0) {
      return {
        field: 'fixtures',
        message: `FV-002: Fixture key(s) "${invalidKeys.join('", "')}" are not declared in states`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const FV_003: ValidationRule<Blueprint> = {
  id: 'FV-003',
  description: 'Fixture props must only use field keys defined in the blueprint',
  validate: (blueprint): ValidationViolation | null => {
    const definedKeys = new Set(blueprint.fields.map((f) => f.key));
    for (const [state, fixture] of Object.entries(blueprint.fixtures)) {
      if (!fixture) continue;
      const unknownProps = Object.keys(fixture).filter((k) => !definedKeys.has(k));
      if (unknownProps.length > 0) {
        return {
          field: `fixtures.${state}`,
          message: `FV-003: Fixture "${state}" contains unknown prop(s): "${unknownProps.join('", "')}"`,
          severity: 'error',
        };
      }
    }
    return null;
  },
};

export const FV_004: ValidationRule<Blueprint> = {
  id: 'FV-004',
  description: 'The "default" fixture must cover all required fields with non-null values',
  validate: (blueprint): ValidationViolation | null => {
    const defaultFixture = blueprint.fixtures['default' as BlueprintState];
    if (!defaultFixture) {
      return {
        field: 'fixtures.default',
        message: 'FV-004: A "default" fixture is required',
        severity: 'error',
      };
    }
    const requiredFields = blueprint.fields.filter((f) => f.required).map((f) => f.key);
    const missing = requiredFields.filter(
      (key) => !(key in defaultFixture) || defaultFixture[key] == null,
    );
    if (missing.length > 0) {
      return {
        field: 'fixtures.default',
        message: `FV-004: Default fixture is missing required field(s): "${missing.join('", "')}"`,
        severity: 'error',
      };
    }
    return null;
  },
};

export const FV_004A: ValidationRule<Blueprint> = {
  id: 'FV-004A',
  description: 'No fixture may use "state" as an explicit data prop (reserved key)',
  validate: (blueprint): ValidationViolation | null => {
    for (const [stateName, fixture] of Object.entries(blueprint.fixtures)) {
      if (fixture && 'state' in fixture) {
        return {
          field: `fixtures.${stateName}`,
          message: `FV-004A: Fixture "${stateName}" uses reserved key "state" as a data prop`,
          severity: 'error',
        };
      }
    }
    return null;
  },
};

export const fixtureValidationSchema: ValidationSchema<Blueprint> = {
  rules: [FV_001, FV_002, FV_003, FV_004, FV_004A],
};
