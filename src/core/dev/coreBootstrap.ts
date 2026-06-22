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
import { createInstagramAssetFromContentRequest } from '../content/contentAdapter';
import { searchByIntent } from '../registry/assetSearch';
import { syncRegistryEntryToLibrary } from '../library/libraryAdapter';
import {
  registryStore,
  registerAndPersist,
  createMemoryRegistryStore,
} from '../persistence/registryStore';
import {
  assetStore,
  createMemoryAssetStore,
  ASSET_STORE_KEY,
} from '../persistence/assetStore';
import { registryEntryToLibraryAsset } from '../library/libraryMapper';

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
  //  SECTION 2 — E2E: BrandOS → ContentOS → InstagramAssetV1
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

  const instagramAsset = createInstagramAssetFromContentRequest(contentRequest, blueprint, blueprintHash);
  const avResult = validate(
    { id: instagramAsset.assetId, title: instagramAsset.title, state: 'default' as const,
      blueprintId: blueprint.id, blueprintHash, runId: instagramAsset.runId, createdAt: instagramAsset.createdAt },
    assetValidationSchema,
  );
  const iaResult = validate(instagramAsset, instagramAssetValidationSchema);
  const instagramReport = generateInstagramReport(iaResult, avResult);

  console.log('[ContentOS] InstagramAsset generated', {
    title: instagramAsset.title,
    hook:  instagramAsset.hook,
    artifact_hash: instagramAsset.artifactHash,
  });
  console.log('[InstagramAssetV1] Validation passed', instagramReport.results);

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Registry (in-memory, Sprint 8)
  // ════════════════════════════════════════════════════════════════════════

  const contentRequest2 = { ...contentRequest, topic: 'BrandOS', intent: 'conversion' as const };
  const instagramAsset2 = createInstagramAssetFromContentRequest(contentRequest2, blueprint, blueprintHash);

  const awarenessHits = searchByIntent('awareness');
  console.log('[AssetRegistry] Search by intent', { intent: 'awareness', results: awarenessHits.length });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 4 — Library Sync (Sprint 9)
  // ════════════════════════════════════════════════════════════════════════

  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'asset_generated', actorId: 'contentos',
    timestamp: new Date().toISOString(),
    metadata: { assetId: instagramAsset.assetId, artifactHash: instagramAsset.artifactHash },
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 5 — Persistence Abstraction (Sprint 10)
  // ════════════════════════════════════════════════════════════════════════

  // 5a — Restore the Registry from localStorage (survives page reloads)
  const restored = registryStore.restore();
  console.log('[Persistence] Registry restored', {
    provider:  registryStore.providerName,
    restored:  restored.length,
    storage_key: 'creatoros-asset-registry-v1',
  });

  // 5b — Register + persist atomically
  const entry1 = registerAndPersist(instagramAsset);
  console.log('[Persistence] registerAndPersist()', {
    artifact_hash: entry1.artifactHash,
    isDuplicate:   entry1.isDuplicate,
    persisted:     !entry1.isDuplicate,
  });

  const entry2 = registerAndPersist(instagramAsset2);

  // Duplicate guard: same asset again → skipped
  const duplicate = registerAndPersist(instagramAsset);
  console.log('[Persistence] Duplicate guard', {
    artifact_hash: duplicate.artifactHash,
    isDuplicate:   duplicate.isDuplicate,
  });

  // 5c — AssetStore: StorageProvider-backed CRUD
  const libraryAsset1 = registryEntryToLibraryAsset(entry1, brandProfile);
  const libraryAsset2 = registryEntryToLibraryAsset(entry2, brandProfile);

  assetStore.save(libraryAsset1);
  assetStore.save(libraryAsset2);
  assetStore.save(libraryAsset1); // idempotent: same key → overwrites, no duplicate

  console.log('[Persistence] AssetStore', {
    provider:    assetStore.providerName,
    total:       assetStore.count(),
    storage_key: ASSET_STORE_KEY,
  });

  // 5d — Provider swap: MemoryProvider (zero I/O, deterministic)
  const memRegistryStore = createMemoryRegistryStore();
  const memEntry = memRegistryStore.findByArtifactHash(entry1.artifactHash);

  const memAssetStore = createMemoryAssetStore();
  memAssetStore.save(libraryAsset1);
  memAssetStore.save(libraryAsset2);

  console.log('[Persistence] Provider swap → MemoryProvider', {
    registry_provider: memRegistryStore.providerName,
    asset_provider:    memAssetStore.providerName,
    mem_asset_count:   memAssetStore.count(),
    mem_entry_found:   memEntry !== null,   // true once localStorage has data
  });

  // 5e — Sync to legacy ContentOS Library (backward-compatible)
  syncRegistryEntryToLibrary(entry1, brandProfile);
  syncRegistryEntryToLibrary(entry2, brandProfile);

  // Lineage close
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported', actorId: 'persistence',
    timestamp: new Date().toISOString(),
    metadata: { registryPersisted: 2, assetStoreSaved: 2 },
  });

  console.log('[CreatorOS Core] Loop complete', {
    lineage_events: lineageRecord.events.map((e) => e.eventType),
    persistence:    'LocalStorage → Supabase-ready',
  });
}
