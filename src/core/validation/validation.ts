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
  };
  fails: string[];
  coverage: {
    stateCoverage: number;
  };
}

export function validate<T>(
  value: T,
  schema: ValidationSchema<T>,
): ValidationResult {
  const violations: ValidationViolation[] = [];

  for (const rule of schema.rules) {
    const violation = rule.validate(value);
    if (violation !== null) {
      violations.push({ ruleId: rule.id, ...violation });
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
  result: ValidationResult,
  schema: ValidationSchema<T>,
): ValidationReport {
  const fails = result.violations.map((v) => v.ruleId ?? v.field);
  const stateCoverage =
    schema.rules.length > 0
      ? (schema.rules.length - result.violations.length) / schema.rules.length
      : 1;

  return {
    results: {
      blueprint_validity: result.valid ? 'pass' : 'fail',
    },
    fails,
    coverage: {
      stateCoverage: Math.round(stateCoverage * 100) / 100,
    },
  };
}
