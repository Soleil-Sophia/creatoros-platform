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
  _value: T,
  _schema: ValidationSchema<T>,
): ValidationResult {
  throw new Error('validate: not yet implemented');
}

export function combineResults(..._results: ValidationResult[]): ValidationResult {
  throw new Error('combineResults: not yet implemented');
}
