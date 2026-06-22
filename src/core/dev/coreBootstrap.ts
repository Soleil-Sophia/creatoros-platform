import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, combineResults, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';

export function runCoreBootstrap(): void {
  // ── Blueprint (with States + Fixtures) ──────────────────────────────────
  const blueprint = createBlueprint({
    slug: 'mini-kpi-card',
    version: 1,
    status: 'active',
    states: ['default', 'loading', 'empty', 'error'],
    fixtures: {
      default: { title: 'Revenue', value: 12400, unit: '€', label: 'vs last 30 days', trend: 'up' },
      loading: { title: 'Revenue', value: null, unit: '€', label: 'Loading…', trend: 'neutral' },
      empty:   { title: 'Revenue', value: 0,    unit: '€', label: 'No data yet',    trend: 'neutral' },
      error:   { title: 'Revenue', value: null, unit: '€', label: 'Failed to load', trend: 'neutral' },
    },
    fields: [
      { key: 'title', label: 'Card Title',      type: 'text',   required: true  },
      { key: 'value', label: 'KPI Value',        type: 'number', required: true  },
      { key: 'unit',  label: 'Unit',             type: 'text',   required: false },
      { key: 'label', label: 'Metric Label',     type: 'text',   required: true  },
      { key: 'trend', label: 'Trend Direction',  type: 'select', required: false },
    ],
  });
  console.log('[CreatorOS Core] Blueprint created', blueprint);

  // ── Lineage ──────────────────────────────────────────────────────────────
  let lineageRecord = createLineageRecord(blueprint.id, 'core');
  console.log('[CreatorOS Core] LineageRecord created', {
    assetId: lineageRecord.assetId,
    sourceModule: lineageRecord.sourceModule,
    events: lineageRecord.events.map((e) => e.eventType),
  });

  // ── Validate Blueprint: BV-001..BV-005 ───────────────────────────────────
  const bvResult = validate(blueprint, blueprintValidationSchema);

  // ── Validate Fixtures: FV-001..FV-002 ────────────────────────────────────
  const fvResult = validate(blueprint, fixtureValidationSchema);

  // ── Combine + Coverage ───────────────────────────────────────────────────
  const combined = combineResults(bvResult, fvResult);
  const coverage = calculateCoverage(blueprint);
  const report = generateValidationReport(combined, blueprintValidationSchema, coverage);

  if (combined.valid) {
    console.log('[CreatorOS Core] Validation passed', report);
  } else {
    console.warn('[CreatorOS Core] Validation failed', report);
  }

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'validated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { valid: combined.valid, score: combined.score, coverage },
  });

  // ── Hash ─────────────────────────────────────────────────────────────────
  const { blueprintHash, algorithm } = hashBlueprint(blueprint);
  console.log('[CreatorOS Core] Blueprint hash generated', { blueprintHash, algorithm });

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { blueprintHash, algorithm },
  });

  // ── Lineage chain ────────────────────────────────────────────────────────
  console.log('[CreatorOS Core] Lineage chain', {
    assetId: lineageRecord.assetId,
    events: lineageRecord.events.map((e) => e.eventType),
  });
}
