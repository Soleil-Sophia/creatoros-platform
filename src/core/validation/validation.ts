export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationViolation {
  ruleId?: string;
  field: string;
  message: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  valid: boolean;
  score: number;
  violations: ValidationViolation[];
  validatedAt: string;
}

export interface ValidationRule<T> {
  id: string;
  description: string;
  validate: (value: T) => ValidationViolation | null;
}

export interface ValidationSchema<T> {
  rules: ValidationRule<T>[];
}

export interface ValidationReport {
  results: {
    blueprint_validity: 'pass' | 'fail';
    fixture_validity: 'pass' | 'fail';
  };
  fails: string[];
  coverage: {
    stateCoverage: number;
    requiredPropCoverage: number;
  };
}

export function validate<T>(
  value: T,
  schema: ValidationSchema<T>,
): ValidationResult {
  const violations: ValidationViolation[] = [];

  for (const rule of schema.rules) {
    try {
      const violation = rule.validate(value);
      if (violation !== null) {
        violations.push({ ruleId: rule.id, ...violation });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      violations.push({
        ruleId: rule.id,
        field: 'validation',
        message: `${rule.id}: Rule execution failed - ${message}`,
        severity: 'error',
      });
    }
  }

  const passed = schema.rules.length - violations.length;
  const rawScore = schema.rules.length > 0 ? (passed / schema.rules.length) * 5 : 5;

  return {
    valid: violations.length === 0,
    score: Math.round(rawScore * 10) / 10,
    violations,
    validatedAt: new Date().toISOString(),
  };
}

export function combineResults(...results: ValidationResult[]): ValidationResult {
  if (results.length === 0) {
    return { valid: true, score: 5, violations: [], validatedAt: new Date().toISOString() };
  }

  const allViolations = results.flatMap((r) => r.violations);
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;

  return {
    valid: allViolations.length === 0,
    score: Math.round(avgScore * 10) / 10,
    violations: allViolations,
    validatedAt: new Date().toISOString(),
  };
}

export function generateValidationReport<T>(
  bvResult: ValidationResult,
  fvResult: ValidationResult,
  _schema: ValidationSchema<T>,
  coverage?: { stateCoverage?: number; requiredPropCoverage?: number },
): ValidationReport {
  const allFails = [
    ...bvResult.violations.map((v) => v.ruleId ?? v.field),
    ...fvResult.violations.map((v) => v.ruleId ?? v.field),
  ];

  return {
    results: {
      blueprint_validity: bvResult.valid ? 'pass' : 'fail',
      fixture_validity: fvResult.valid ? 'pass' : 'fail',
    },
    fails: allFails,
    coverage: {
      stateCoverage: coverage?.stateCoverage ?? 1,
      requiredPropCoverage: coverage?.requiredPropCoverage ?? 1,
    },
  };
}
