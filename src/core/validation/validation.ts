export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationViolation {
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

export function validate<T>(
  value: T,
  schema: ValidationSchema<T>,
): ValidationResult {
  const violations: ValidationViolation[] = [];

  for (const rule of schema.rules) {
    const violation = rule.validate(value);
    if (violation !== null) {
      violations.push(violation);
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
