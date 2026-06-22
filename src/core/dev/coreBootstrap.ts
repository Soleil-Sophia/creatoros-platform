import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';
import { assetValidationSchema } from '../assets/assetValidation';
import { instagramAssetValidationSchema, generateInstagramReport } from '../instagram/instagramAssetValidation';
import { createBrandProfile } from '../brand/brandProfile';
import { brandProfileValidationSchema } from '../brand/brandValidation';
import { contentRequestValidationSchema } from '../content/contentRequestValidation';
import { registryStore, registerAndPersist } from '../persistence/registryStore';
import { assetStore, ASSET_STORE_KEY } from '../persistence/assetStore';
import { registryEntryToLibraryAsset } from '../library/libraryMapper';
import {
  createContentGenerator,
  isAIAvailable,
  resolveGeneratorType,
} from '../ai/generatorFactory';

export async function runCoreBootstrap(): Promise<void> {
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
    eventType: 'validated', actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { bvValid: bvResult.valid, fvValid: fvResult.valid, coverage, blueprintHash },
  });

  console.log('[CreatorOS Core] Compiler ready', {
    blueprint_validity: report.results.blueprint_validity,
    fixture_validity:   report.results.fixture_validity,
    coverage, blueprintHash,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 2 — BrandOS Profile
  // ════════════════════════════════════════════════════════════════════════

  const brandProfile = createBrandProfile({
    brandName:   'CreatorOS',
    voice:       'Motivational & Direct',
    audience:    'Solopreneurs and independent creators',
    positioning: 'Systematic content production for creators',
  });
  validate(brandProfile, brandProfileValidationSchema);
  console.log('[BrandOS] Profile loaded', { brandName: brandProfile.brandName, voice: brandProfile.voice });

  const contentRequest = {
    brandProfile,
    topic:  'ContentOS',
    intent: 'awareness' as const,
    format: 'carousel'  as const,
  };
  validate(contentRequest, contentRequestValidationSchema);

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Persistence: Restore + Registry
  // ════════════════════════════════════════════════════════════════════════

  const restored = registryStore.restore();
  console.log('[Persistence] Registry restored', {
    provider: registryStore.providerName,
    restored: restored.length,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 4 — AI Engine (Sprint 11)
  // ════════════════════════════════════════════════════════════════════════

  // 4a — Environment status
  console.log('[AI Engine] Environment', {
    ai_available:     isAIAvailable(),
    active_generator: resolveGeneratorType({ useAI: true }),
  });

  // 4b — DeterministicContentGenerator (always works, no API key)
  const deterministicGen = createContentGenerator({ useAI: false });
  const deterministicAsset = await deterministicGen.generate(contentRequest, blueprint, blueprintHash);

  const avResult = validate(
    { id: deterministicAsset.assetId, title: deterministicAsset.title,
      state: 'default' as const, blueprintId: blueprint.id,
      blueprintHash, runId: deterministicAsset.runId, createdAt: deterministicAsset.createdAt },
    assetValidationSchema,
  );
  const iaResult = validate(deterministicAsset, instagramAssetValidationSchema);
  const instagramReport = generateInstagramReport(iaResult, avResult);

  console.log('[AI Engine] DeterministicContentGenerator', {
    generatorType: deterministicGen.generatorType,
    title:         deterministicAsset.title,
    hook:          deterministicAsset.hook,
    validation:    instagramReport.results,
  });

  // 4c — Factory with useAI: true → resolves based on environment
  const autoGen = createContentGenerator({ useAI: true });
  const autoAsset = await autoGen.generate(contentRequest, blueprint, blueprintHash);

  console.log('[AI Engine] Factory (useAI: true)', {
    resolved_generator: autoGen.generatorType,
    ai_configured:      isAIAvailable(),
    title:              autoAsset.title,
    contract_identical: autoAsset.artifactHash === deterministicAsset.artifactHash,
  });

  // 4d — Second request: different intent (conversion)
  const contentRequest2 = { ...contentRequest, topic: 'BrandOS', intent: 'conversion' as const };
  const conversionGen = createContentGenerator({ useAI: false });
  const conversionAsset = await conversionGen.generate(contentRequest2, blueprint, blueprintHash);

  console.log('[AI Engine] Conversion intent asset', {
    generatorType: conversionGen.generatorType,
    title:         conversionAsset.title,
    hook:          conversionAsset.hook,
    cta:           conversionAsset.cta,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 5 — Registry + Persistence + Library (full loop)
  // ════════════════════════════════════════════════════════════════════════

  const entry1 = registerAndPersist(deterministicAsset);
  const entry2 = registerAndPersist(conversionAsset);

  const libraryAsset1 = registryEntryToLibraryAsset(entry1, brandProfile);
  const libraryAsset2 = registryEntryToLibraryAsset(entry2, brandProfile);
  assetStore.save(libraryAsset1);
  assetStore.save(libraryAsset2);

  console.log('[Full Loop] Registry + Persistence + Library', {
    registered:       2,
    asset_store_total: assetStore.count(),
    asset_store_key:   ASSET_STORE_KEY,
  });

  // Lineage
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'asset_generated', actorId: autoGen.generatorType,
    timestamp: new Date().toISOString(),
    metadata: { assetId: autoAsset.assetId, generator: autoGen.generatorType },
  });
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported', actorId: 'persistence',
    timestamp: new Date().toISOString(),
    metadata: { registryPersisted: 2, assetStoreSaved: 2 },
  });

  console.log('[CreatorOS Core] Platform complete', {
    lineage_events: lineageRecord.events.map((e) => e.eventType),
    generator_contract: 'ContentRequest → InstagramAssetV1 (provider-agnostic)',
    next: 'set VITE_API_KEY to activate OpenAIContentGenerator',
  });
}
