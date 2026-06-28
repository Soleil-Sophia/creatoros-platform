import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';
import { createBrandProfile } from '../brand/brandProfile';
import { brandProfileValidationSchema } from '../brand/brandValidation';
import { registryStore, registerAndPersist } from '../persistence/registryStore';
import { isAIAvailable, resolveGeneratorType, createContentGenerator } from '../ai/generatorFactory';
import { generateQualityReport } from '../quality/evaluationReport';
import { runBenchmark } from '../benchmark/contentBenchmark';
import { generateBenchmarkReport } from '../benchmark/benchmarkReport';
import { evaluateAndTag } from '../intelligence/assetTagger';
import { intelligenceStore } from '../intelligence/intelligenceStore';
import { queryPatterns } from '../intelligence/intelligenceQuery';
import type { ContentRequest } from '../content/contentRequest';

export async function runCoreBootstrap(): Promise<void> {
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
    eventType: 'validated', actorId: 'system',
    timestamp: new Date().toISOString(),
    metadata: { bvValid: bvResult.valid, fvValid: fvResult.valid, coverage, blueprintHash },
  });

  console.log('[CreatorOS Core] Compiler ready', {
    blueprint_validity: report.results.blueprint_validity,
    fixture_validity:   report.results.fixture_validity,
    blueprintHash,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 2 — BrandOS + Persistence restore
  // ════════════════════════════════════════════════════════════════════════

  const brandProfile = createBrandProfile({
    brandName:   'CreatorOS',
    voice:       'Motivational & Direct',
    audience:    'Solopreneurs and independent creators',
    positioning: 'Systematic content production for creators',
  });
  validate(brandProfile, brandProfileValidationSchema);

  const restoredRegistry = registryStore.restore();
  const restoredIntelligence = intelligenceStore.restore();

  console.log('[Persistence] Stores restored', {
    registry:     restoredRegistry.length,
    intelligence: restoredIntelligence.length,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Generate 10 assets (deterministic)
  // ════════════════════════════════════════════════════════════════════════

  const requests: ContentRequest[] = [
    { brandProfile, topic: 'ContentOS',          intent: 'awareness',     format: 'carousel' },
    { brandProfile, topic: 'BrandOS',             intent: 'conversion',    format: 'reel'     },
    { brandProfile, topic: 'Consistency',         intent: 'consideration', format: 'story'    },
    { brandProfile, topic: 'AI Tools',            intent: 'awareness',     format: 'carousel' },
    { brandProfile, topic: 'Content Strategy',    intent: 'consideration', format: 'carousel' },
    { brandProfile, topic: 'CreatorOS',           intent: 'conversion',    format: 'reel'     },
    { brandProfile, topic: 'Brand Voice',         intent: 'awareness',     format: 'carousel' },
    { brandProfile, topic: 'Solopreneur Systems', intent: 'awareness',     format: 'story'    },
    { brandProfile, topic: 'Content Batching',    intent: 'consideration', format: 'carousel' },
    { brandProfile, topic: 'Social Media ROI',    intent: 'conversion',    format: 'reel'     },
  ];

  const generator = createContentGenerator({ useAI: false });
  const rawAssets = await Promise.all(
    requests.map((req) => generator.generate(req, blueprint, blueprintHash)),
  );

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 4 — Sprint 14: Content Intelligence Layer
  //  Tag every asset with quality scores, persist to IntelligenceStore
  // ════════════════════════════════════════════════════════════════════════

  // evaluateAndTag(): evaluation runs, scores attach to asset.qualityMeta
  const taggedAssets = rawAssets.map((asset) =>
    evaluateAndTag(asset, brandProfile, 'deterministic'),
  );

  // Register in the asset registry (existing pipeline)
  for (const asset of taggedAssets) {
    registerAndPersist(asset);
  }

  // Push all tagged assets into the intelligence store (new Sprint 14 store)
  intelligenceStore.pushAll(taggedAssets);

  console.log('[Intelligence] Assets tagged + persisted', {
    tagged:           taggedAssets.length,
    intelligence_total: intelligenceStore.size,
    sample_asset: {
      title:        taggedAssets[0].title,
      qualityScore: taggedAssets[0].qualityMeta?.qualityScore,
      hookScore:    taggedAssets[0].qualityMeta?.hookScore,
      bodyScore:    taggedAssets[0].qualityMeta?.bodyScore,
      ctaScore:     taggedAssets[0].qualityMeta?.ctaScore,
      grade:        taggedAssets[0].qualityMeta?.grade,
      generatorType: taggedAssets[0].qualityMeta?.generatorType,
    },
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 5 — Intelligence Queries (pattern analysis)
  //  This is what "CreatorOS gets smarter with 1000 assets" looks like
  // ════════════════════════════════════════════════════════════════════════

  const allRecords = intelligenceStore.all();

  // Query 1: All awareness assets
  const awarenessPattern = queryPatterns(allRecords, { intent: 'awareness' });
  // Query 2: All carousel assets
  const carouselPattern  = queryPatterns(allRecords, { format: 'carousel' });
  // Query 3: Best performing assets (score ≥ 60) — the threshold will move up as AI lands
  const topPattern       = queryPatterns(allRecords, { minScore: 60, limit: 3 });
  // Query 4: Conversion intent — where CTAs matter most
  const conversionPattern = queryPatterns(allRecords, { intent: 'conversion' });

  console.log('[Intelligence] Pattern queries', {
    awareness_assets:    { matched: awarenessPattern.totalMatched,   avg: awarenessPattern.averageScore,   insight: awarenessPattern.insight   },
    carousel_assets:     { matched: carouselPattern.totalMatched,    avg: carouselPattern.averageScore,    insight: carouselPattern.insight    },
    top_performers:      { matched: topPattern.totalMatched,         avg: topPattern.averageScore,         titles:  topPattern.topRecords.map((r) => r.topic) },
    conversion_assets:   { matched: conversionPattern.totalMatched,  avg: conversionPattern.averageScore,  insight: conversionPattern.insight  },
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 6 — Benchmark (Sprint 13 infrastructure, still pending AI)
  // ════════════════════════════════════════════════════════════════════════

  console.log('[Benchmark] Generator state', {
    ai_available:     isAIAvailable(),
    active_generator: resolveGeneratorType({ useAI: true }),
  });

  const benchmarkRun    = await runBenchmark(requests, blueprint, blueprintHash, brandProfile);
  const benchmarkReport = generateBenchmarkReport(benchmarkRun);

  const detEvals = benchmarkRun.entries.map((e) => e.deterministicEval);
  const qualityReport = generateQualityReport(detEvals);

  console.log('[Benchmark] Baseline + verdict', {
    deterministicAvg: benchmarkReport.deterministicAvg,
    openaiAvg:        benchmarkReport.openaiAvg ?? 'pending',
    verdict:          benchmarkReport.verdict,
  });

  // Lineage
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported', actorId: 'intelligence-layer',
    timestamp: new Date().toISOString(),
    metadata: {
      taggedAssets:     taggedAssets.length,
      intelligenceSize: intelligenceStore.size,
      deterministicAvg: benchmarkReport.deterministicAvg,
      openaiAvg:        benchmarkReport.openaiAvg,
      weakestDimension: qualityReport.weakestDimension.dimension,
    },
  });

  console.log('[CreatorOS Core] Sprint 14 complete', {
    lineage_events: lineageRecord.events.map((e) => e.eventType),
    domains:        15,
    pipeline:       'generate → evaluateAndTag → registerAndPersist → intelligenceStore → queryPatterns',
    question:       'Does CreatorOS get smarter with 1000 assets? Answer: yes — intelligenceStore accumulates.',
  });
}
