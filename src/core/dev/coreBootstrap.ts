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
import { createContentGenerator, isAIAvailable, resolveGeneratorType } from '../ai/generatorFactory';
import { evaluateAsset } from '../quality/contentEvaluator';
import { generateQualityReport } from '../quality/evaluationReport';
import type { ContentRequest } from '../content/contentRequest';

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
    blueprintHash,
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

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Persistence restore + AI environment
  // ════════════════════════════════════════════════════════════════════════

  const restored = registryStore.restore();
  console.log('[Persistence] Registry restored', {
    provider: registryStore.providerName,
    restored: restored.length,
  });

  console.log('[AI Engine] Environment', {
    ai_available:     isAIAvailable(),
    active_generator: resolveGeneratorType({ useAI: true }),
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 4 — Content Quality Evaluation (Sprint 12)
  //  10 real ContentRequests × DeterministicContentGenerator
  // ════════════════════════════════════════════════════════════════════════

  const generator = createContentGenerator({ useAI: false });

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

  const assets = await Promise.all(
    requests.map((req) => generator.generate(req, blueprint, blueprintHash)),
  );

  // Register all assets
  for (const asset of assets) {
    registerAndPersist(asset);
  }

  // Evaluate all assets
  const evaluations = assets.map((asset) => evaluateAsset(asset, brandProfile));

  // Quality report
  const qualityReport = generateQualityReport(evaluations);

  console.log('[ContentQuality] Evaluation complete', {
    totalAssets:          qualityReport.totalAssets,
    averageScore:         qualityReport.averageScore,
    gradeBreakdown:       qualityReport.gradeBreakdown,
    templateHookCount:    qualityReport.templateHookCount,
    placeholderBodyCount: qualityReport.placeholderBodyCount,
  });

  console.log('[ContentQuality] Dimension scores', {
    hookStrength:     Math.round(evaluations.reduce((s, e) => s + e.hookStrength.score, 0) / evaluations.length),
    bodyCompleteness: Math.round(evaluations.reduce((s, e) => s + e.bodyCompleteness.score, 0) / evaluations.length),
    ctaStrength:      Math.round(evaluations.reduce((s, e) => s + e.ctaStrength.score, 0) / evaluations.length),
    formatFit:        Math.round(evaluations.reduce((s, e) => s + e.formatFit.score, 0) / evaluations.length),
  });

  console.log('[ContentQuality] Top / Weakest asset', {
    top:     { title: qualityReport.topAsset.title,     score: qualityReport.topAsset.overallScore,     grade: qualityReport.topAsset.grade     },
    weakest: { title: qualityReport.weakestAsset.title, score: qualityReport.weakestAsset.overallScore, grade: qualityReport.weakestAsset.grade },
  });

  console.log('[ContentQuality] Weakest vs Strongest dimension', {
    weakest:   { dimension: qualityReport.weakestDimension.dimension,   avg: qualityReport.weakestDimension.averageScore,   passRate: `${Math.round(qualityReport.weakestDimension.passRate * 100)}%`   },
    strongest: { dimension: qualityReport.strongestDimension.dimension, avg: qualityReport.strongestDimension.averageScore, passRate: `${Math.round(qualityReport.strongestDimension.passRate * 100)}%` },
  });

  console.log('[ContentQuality] Findings', qualityReport.findings);

  // Lineage
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported', actorId: 'quality-evaluator',
    timestamp: new Date().toISOString(),
    metadata: {
      totalAssets:      qualityReport.totalAssets,
      averageScore:     qualityReport.averageScore,
      weakestDimension: qualityReport.weakestDimension.dimension,
      finding:          qualityReport.findings[0] ?? '',
    },
  });

  console.log('[CreatorOS Core] Sprint 12 complete', {
    lineage_events:   lineageRecord.events.map((e) => e.eventType),
    verdict:          `DeterministicGenerator avg ${qualityReport.averageScore}/100 — AI needed for body & hook variety`,
    next:             'Sprint 13: activate OpenAIContentGenerator → target 75+',
  });
}
