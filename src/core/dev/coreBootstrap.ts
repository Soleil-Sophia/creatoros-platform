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
  console.log('[CreatorOS Core] Blueprint created', { id: blueprint.id, states: blueprint.states });

  let lineageRecord = createLineageRecord(blueprint.id, 'core');

  const bvResult = validate(blueprint, blueprintValidationSchema);
  const fvResult = validate(blueprint, fixtureValidationSchema);
  const coverage = calculateCoverage(blueprint);
  const report   = generateValidationReport(bvResult, fvResult, blueprintValidationSchema, coverage);
  console.log('[CreatorOS Core] Validation report', report);

  const { blueprintHash, algorithm } = hashBlueprint(blueprint);
  console.log('[CreatorOS Core] Blueprint hash generated', { blueprintHash, algorithm });

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'validated',
    actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { bvValid: bvResult.valid, fvValid: fvResult.valid, coverage, blueprintHash },
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 2 — End-to-End Flow: BrandOS → ContentOS → InstagramAssetV1
  // ════════════════════════════════════════════════════════════════════════

  // Sprint 7A — BrandProfile
  const brandProfile = createBrandProfile({
    brandName:   'CreatorOS',
    voice:       'Motivational & Direct',
    audience:    'Solopreneurs and independent creators',
    positioning: 'Systematic content production for creators',
  });
  const brpResult = validate(brandProfile, brandProfileValidationSchema);
  console.log('[BrandOS] Profile loaded', {
    brandName: brandProfile.brandName,
    voice:     brandProfile.voice,
    audience:  brandProfile.audience,
    valid:     brpResult.valid,
  });

  // Sprint 7B — ContentRequest
  const contentRequest = {
    brandProfile,
    topic:  'ContentOS',
    intent: 'awareness' as const,
    format: 'carousel' as const,
  };
  const crResult = validate(contentRequest, contentRequestValidationSchema);
  console.log('[ContentOS] Request created', {
    topic:  contentRequest.topic,
    intent: contentRequest.intent,
    format: contentRequest.format,
    valid:  crResult.valid,
  });

  // Sprint 7C — ContentOS → InstagramAssetV1 Adapter
  const instagramAsset = createInstagramAssetFromContentRequest(
    contentRequest,
    blueprint,
    blueprintHash,
  );
  console.log('[ContentOS] InstagramAsset generated', {
    asset_id:      instagramAsset.assetId,
    artifact_hash: instagramAsset.artifactHash,
    title:         instagramAsset.title,
    hook:          instagramAsset.hook,
    cta:           instagramAsset.cta,
  });

  // IA Validation
  const avResult = validate(
    { id: instagramAsset.assetId, title: instagramAsset.title, state: 'default', blueprintId: blueprint.id, blueprintHash, runId: instagramAsset.runId, createdAt: instagramAsset.createdAt },
    assetValidationSchema,
  );
  const iaResult = validate(instagramAsset, instagramAssetValidationSchema);
  const instagramReport = generateInstagramReport(iaResult, avResult);
  console.log('[InstagramAssetV1] Validation passed', instagramReport);

  // Lineage registration
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'asset_generated',
    actorId:   'contentos',
    timestamp: new Date().toISOString(),
    metadata: {
      assetId:       instagramAsset.assetId,
      artifactHash:  instagramAsset.artifactHash,
      channel:       instagramAsset.channel,
      format:        instagramAsset.format,
      intent:        instagramAsset.intent,
    },
  });

  console.log('[CreatorOS Core] Asset registered', {
    asset_id:      instagramAsset.assetId,
    blueprint_hash: instagramAsset.blueprintHash,
    artifact_hash:  instagramAsset.artifactHash,
    run_id:         instagramAsset.runId,
    lineage_events: lineageRecord.events.map((e) => e.eventType),
  });
}
