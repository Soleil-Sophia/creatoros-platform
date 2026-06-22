import { createBlueprint } from '../blueprint';
import { validate } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { hashBlueprint } from '../hashing';

export function runCoreBootstrap(): void {
  const blueprint = createBlueprint({
    slug: 'mini-kpi-card',
    version: 1,
    status: 'active',
    fields: [
      { key: 'title', label: 'Card Title', type: 'text', required: true },
      { key: 'value', label: 'KPI Value', type: 'number', required: true },
      { key: 'unit', label: 'Unit', type: 'text', required: false },
      { key: 'label', label: 'Metric Label', type: 'text', required: true },
      { key: 'trend', label: 'Trend Direction', type: 'select', required: false },
    ],
  });
  console.log('[CreatorOS Core] Blueprint created', blueprint);

  const validationResult = validate(blueprint, blueprintValidationSchema);
  if (validationResult.valid) {
    console.log('[CreatorOS Core] Validation passed', {
      score: `${validationResult.score}/5`,
      rules: ['BV-001', 'BV-002', 'BV-003'],
    });
  } else {
    console.warn('[CreatorOS Core] Validation failed', validationResult.violations);
  }

  const { blueprintHash } = hashBlueprint(blueprint);
  console.log('[CreatorOS Core] Blueprint hash generated', { blueprintHash });
}
