import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';
import { createAsset } from '../assets';
import { assetValidationSchema } from '../assets/assetValidation';
import { instagramAssetValidationSchema, generateInstagramReport } from '../instagram/instagramAssetValidation';
import { createBrandProfile } from '../brand/brandProfile';
import { brandProfileValidationSchema } from '../brand/brandValidation';
import { contentRequestValidationSchema } from '../content/contentRequestValidation';
import { createInstagramAssetFromContentRequest } from '../content/contentAdapter';
import { registerAsset } from '../registry/assetRegistry';
import { searchByIntent } from '../registry/assetSearch';
import { syncRegistryEntryToLibrary, getLibraryStats } from '../library/libraryAdapter';

export function runCoreBootstrap(): void {
  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 1 — Compiler Verification (condensed)
  // ════════════════════════════════════════════════════════════════════════

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

  let lineageRecord = createLineageRecord(blueprint.id, 'core');
  const bvResult = validate(blueprint, blueprintValidationSchema);
  const fvResult = validate(blueprint, fixtureValidationSchema);
  const coverage = calculateCoverage(blueprint);
  const report   = generateValidationReport(bvResult, fvResult, blueprintValidationSchema, coverage);
  const { blueprintHash } = hashBlueprint(blueprint);

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'validated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { bvValid: bvResult.valid, fvValid: fvResult.valid, coverage, blueprintHash },
  });

  console.log('[CreatorOS Core] Compiler ready', {
    blueprint_validity: report.results.blueprint_validity,
    fixture_validity:   report.results.fixture_validity,
    coverage,
    blueprintHash,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 2 — E2E: BrandOS → ContentOS → InstagramAssetV1
  // ════════════════════════════════════════════════════════════════════════

  const brandProfile = createBrandProfile({
    brandName:   'CreatorOS',
    voice:       'Motivational & Direct',
    audience:    'Solopreneurs and independent creators',
    positioning: 'Systematic content production for creators',
  });
  validate(brandProfile, brandProfileValidationSchema);
  console.log('[BrandOS] Profile loaded', {
    brandName: brandProfile.brandName,
    voice:     brandProfile.voice,
  });

  const contentRequest = {
    brandProfile,
    topic:  'ContentOS',
    intent: 'awareness' as const,
    format: 'carousel'  as const,
  };
  validate(contentRequest, contentRequestValidationSchema);
  console.log('[ContentOS] Request created', {
    topic:  contentRequest.topic,
    intent: contentRequest.intent,
    format: contentRequest.format,
  });

  const instagramAsset = createInstagramAssetFromContentRequest(
    contentRequest, blueprint, blueprintHash,
  );
  const avResult = validate(
    { id: instagramAsset.assetId, title: instagramAsset.title, state: 'default' as const,
      blueprintId: blueprint.id, blueprintHash, runId: instagramAsset.runId, createdAt: instagramAsset.createdAt },
    assetValidationSchema,
  );
  const iaResult = validate(instagramAsset, instagramAssetValidationSchema);
  const instagramReport = generateInstagramReport(iaResult, avResult);

  console.log('[ContentOS] InstagramAsset generated', {
    title:         instagramAsset.title,
    hook:          instagramAsset.hook,
    artifact_hash: instagramAsset.artifactHash,
  });
  console.log('[InstagramAssetV1] Validation passed', instagramReport.results);

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Asset Registry
  // ════════════════════════════════════════════════════════════════════════

  const entry = registerAsset(instagramAsset);
  console.log('[AssetRegistry] Asset registered', {
    asset_id:      entry.assetId,
    artifact_hash: entry.artifactHash,
    version:       entry.version,
    isDuplicate:   entry.isDuplicate,
  });

  // Register a second asset (different content)
  const contentRequest2 = { ...contentRequest, topic: 'BrandOS', intent: 'conversion' as const };
  const instagramAsset2 = createInstagramAssetFromContentRequest(contentRequest2, blueprint, blueprintHash);
  const entry2 = registerAsset(instagramAsset2);

  const awarenessResults = searchByIntent('awareness');
  console.log('[AssetRegistry] Search by intent', {
    intent:  'awareness',
    results: awarenessResults.length,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 4 — Registry ↔ ContentOS Library
  // ════════════════════════════════════════════════════════════════════════

  // Sync first asset
  const sync1 = syncRegistryEntryToLibrary(entry, brandProfile);
  console.log('[Library] Synced to ContentOS Library', {
    id:          sync1.id,
    synced:      sync1.synced,
    isDuplicate: sync1.isDuplicate,
  });

  // Same asset again → duplicate guard
  const sync1Again = syncRegistryEntryToLibrary(entry, brandProfile);
  console.log('[Library] Duplicate skipped', {
    artifact_hash: sync1Again.artifactHash,
    isDuplicate:   sync1Again.isDuplicate,
  });

  // Sync second asset
  const sync2 = syncRegistryEntryToLibrary(entry2, brandProfile);
  console.log('[Library] Synced to ContentOS Library', {
    id:          sync2.id,
    synced:      sync2.synced,
    isDuplicate: sync2.isDuplicate,
  });

  const stats = getLibraryStats();
  console.log('[Library] Stats', {
    total_in_library: stats.total,
    storage_key:      stats.storageKey,
  });

  // Lineage close
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported',
    actorId:   'library',
    timestamp: new Date().toISOString(),
    metadata:  { syncedToLibrary: 2, duplicatesSkipped: 1 },
  });

  console.log('[CreatorOS Core] Loop complete', {
    lineage_events: lineageRecord.events.map((e) => e.eventType),
  });
}
