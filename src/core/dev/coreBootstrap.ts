import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';
import { createAsset } from '../assets';
import { assetValidationSchema } from '../assets/assetValidation';

export function runCoreBootstrap(): void {
  // ── Blueprint ────────────────────────────────────────────────────────────
  const blueprint = createBlueprint({
    slug: 'mini-kpi-card',
    version: 1,
    status: 'active',
    states: ['default', 'loading', 'empty', 'error'],
    fixtures: {
      default: { title: 'Revenue', value: 12400, unit: '€', label: 'vs last 30 days', trend: 'up' },
      loading: { title: 'Revenue', unit: '€', label: 'Loading…', trend: 'neutral' },
      empty:   { title: 'Revenue', value: 0,    unit: '€', label: 'No data yet',    trend: 'neutral' },
      error:   { title: 'Revenue', unit: '€', label: 'Failed to load', trend: 'neutral' },
    },
    fields: [
      { key: 'title', label: 'Card Title',     type: 'text',   required: true  },
      { key: 'value', label: 'KPI Value',       type: 'number', required: true  },
      { key: 'unit',  label: 'Unit',            type: 'text',   required: false },
      { key: 'label', label: 'Metric Label',    type: 'text',   required: true  },
      { key: 'trend', label: 'Trend Direction', type: 'select', required: false },
    ],
  });
  console.log('[CreatorOS Core] Blueprint created', {
    id: blueprint.id,
    slug: blueprint.slug,
    states: blueprint.states,
  });

  // ── Lineage ──────────────────────────────────────────────────────────────
  let lineageRecord = createLineageRecord(blueprint.id, 'core');
  console.log('[CreatorOS Core] LineageRecord created', {
    assetId: lineageRecord.assetId,
    sourceModule: lineageRecord.sourceModule,
  });

  // ── Blueprint Validation: BV-001..BV-008 ─────────────────────────────────
  const bvResult = validate(blueprint, blueprintValidationSchema);

  // ── Fixture Validation: FV-001..FV-004A ──────────────────────────────────
  const fvResult = validate(blueprint, fixtureValidationSchema);
  if (fvResult.valid) {
    console.log('[CreatorOS Core] Fixture validation passed', {
      rules: fixtureValidationSchema.rules.map((r) => r.id),
    });
  } else {
    console.warn('[CreatorOS Core] Fixture validation failed', fvResult.violations);
  }

  // ── Coverage ─────────────────────────────────────────────────────────────
  const coverage = calculateCoverage(blueprint);
  console.log('[CreatorOS Core] Coverage calculated', coverage);

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'validated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: {
      bvValid: bvResult.valid,
      fvValid: fvResult.valid,
      coverage,
    },
  });

  // ── Validation Report ─────────────────────────────────────────────────────
  const report = generateValidationReport(bvResult, fvResult, blueprintValidationSchema, coverage);
  console.log('[CreatorOS Core] Validation report generated', report);

  // ── Hash ──────────────────────────────────────────────────────────────────
  const { blueprintHash, algorithm } = hashBlueprint(blueprint);
  console.log('[CreatorOS Core] Blueprint hash generated', { blueprintHash, algorithm });

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { blueprintHash, algorithm },
  });

  // ── Lineage Chain ─────────────────────────────────────────────────────────
  console.log('[CreatorOS Core] Lineage chain', {
    assetId: lineageRecord.assetId,
    events: lineageRecord.events.map((e) => e.eventType),
  });

  // ── Asset (Sprint 4) ──────────────────────────────────────────────────────
  const asset = createAsset(blueprint, blueprintHash);
  const avResult = validate(asset, assetValidationSchema);

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'asset_generated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { assetId: asset.id, state: asset.state, valid: avResult.valid },
  });

  console.log('[CreatorOS Core] Asset created', {
    id: asset.id,
    title: asset.title,
    state: asset.state,
    blueprintHash: asset.blueprintHash,
    valid: avResult.valid,
  });
}
