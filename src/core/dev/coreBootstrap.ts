import { createBlueprint } from '../blueprint';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';

export function runCoreBootstrap(): void {
  // ── Task 2: Blueprint ────────────────────────────────────────────────────
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

  // ── Sprint 2C: Lineage record ────────────────────────────────────────────
  let lineageRecord = createLineageRecord(blueprint.id, 'core');
  console.log('[CreatorOS Core] LineageRecord created', {
    assetId: lineageRecord.assetId,
    sourceModule: lineageRecord.sourceModule,
    events: lineageRecord.events.map((e) => e.eventType),
  });

  // ── Task 3: Validation (2A: BV-001 → BV-005) + 2B: structured report ────
  const validationResult = validate(blueprint, blueprintValidationSchema);
  const report = generateValidationReport(validationResult, blueprintValidationSchema);

  if (validationResult.valid) {
    console.log('[CreatorOS Core] Validation passed', report);
  } else {
    console.warn('[CreatorOS Core] Validation failed', report);
  }

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'validated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { valid: validationResult.valid, score: validationResult.score },
  });

  // ── Task 4: Hash (algorithm-agnostic) ────────────────────────────────────
  const { blueprintHash, algorithm } = hashBlueprint(blueprint);
  console.log('[CreatorOS Core] Blueprint hash generated', { blueprintHash, algorithm });

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { blueprintHash, algorithm },
  });

  // ── Sprint 2C: Full event chain ──────────────────────────────────────────
  console.log('[CreatorOS Core] Lineage chain', {
    assetId: lineageRecord.assetId,
    events: lineageRecord.events.map((e) => e.eventType),
  });
}
