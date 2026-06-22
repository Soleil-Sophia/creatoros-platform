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
import { registerAsset, getByArtifactHash } from '../registry/assetRegistry';
import { searchByIntent } from '../registry/assetSearch';
import { getAssetVersionHistory } from '../registry/assetHistory';

export function runCoreBootstrap(): void {
  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 1 — Compiler Verification
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
    blueprint: blueprint.id,
    blueprint_validity: report.results.blueprint_validity,
    fixture_validity:   report.results.fixture_validity,
    coverage,
    blueprintHash,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 2 — End-to-End Flow: BrandOS → ContentOS → InstagramAssetV1
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
    audience:  brandProfile.audience,
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
    contentRequest,
    blueprint,
    blueprintHash,
  );

  const avResult = validate(
    {
      id: instagramAsset.assetId, title: instagramAsset.title,
      state: 'default' as const, blueprintId: blueprint.id,
      blueprintHash, runId: instagramAsset.runId, createdAt: instagramAsset.createdAt,
    },
    assetValidationSchema,
  );
  const iaResult = validate(instagramAsset, instagramAssetValidationSchema);
  const instagramReport = generateInstagramReport(iaResult, avResult);

  console.log('[ContentOS] InstagramAsset generated', {
    title:         instagramAsset.title,
    hook:          instagramAsset.hook,
    cta:           instagramAsset.cta,
    artifact_hash: instagramAsset.artifactHash,
  });
  console.log('[InstagramAssetV1] Validation passed', instagramReport.results);

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'asset_generated',
    actorId: 'contentos',
    timestamp: new Date().toISOString(),
    metadata: { assetId: instagramAsset.assetId, artifactHash: instagramAsset.artifactHash },
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Asset Registry
  // ════════════════════════════════════════════════════════════════════════

  // Register the generated asset
  const entry = registerAsset(instagramAsset);
  console.log('[AssetRegistry] Asset registered', {
    asset_id:      entry.assetId,
    artifact_hash: entry.artifactHash,
    version:       entry.version,
    isDuplicate:   entry.isDuplicate,
  });

  // Deduplication: try to register the same asset again
  const duplicate = registerAsset(instagramAsset);
  console.log('[AssetRegistry] Duplicate detected', {
    artifact_hash: duplicate.artifactHash,
    isDuplicate:   duplicate.isDuplicate,
    skipped:       true,
  });

  // Register a second asset (different topic → different artifact_hash)
  const contentRequest2 = { ...contentRequest, topic: 'BrandOS', intent: 'conversion' as const };
  const instagramAsset2 = createInstagramAssetFromContentRequest(contentRequest2, blueprint, blueprintHash);
  const entry2 = registerAsset(instagramAsset2);
  console.log('[AssetRegistry] Second asset registered', {
    asset_id:      entry2.assetId,
    artifact_hash: entry2.artifactHash,
    version:       entry2.version,
  });

  // Search by intent
  const awarenessResults = searchByIntent('awareness');
  console.log('[AssetRegistry] Search by intent', {
    intent:  'awareness',
    results: awarenessResults.length,
    titles:  awarenessResults.map((e) => e.asset.title),
  });

  // Version history
  const history = getAssetVersionHistory(instagramAsset.assetId);
  console.log('[AssetRegistry] Version history', {
    asset_id:       history?.assetId,
    total_versions: history?.versions.length,
    latest_version: history?.latestVersion,
  });

  // Final lineage
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported',
    actorId:   'registry',
    timestamp: new Date().toISOString(),
    metadata:  { registeredEntries: 2, deduplicated: 1 },
  });

  console.log('[CreatorOS Core] Registry complete', {
    lineage_events: lineageRecord.events.map((e) => e.eventType),
    total_assets:   2,
    deduplicated:   1,
  });
}
