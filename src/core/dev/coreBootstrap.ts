import { createBlueprint } from '../blueprint';
import { calculateCoverage } from '../blueprint/coverage';
import { validate, generateValidationReport } from '../validation';
import { blueprintValidationSchema } from '../validation/rules/blueprintRules';
import { fixtureValidationSchema } from '../validation/rules/fixtureRules';
import { hashBlueprint } from '../hashing';
import { createLineageRecord, appendLineageEvent } from '../lineage';
import { createBrandProfile } from '../brand/brandProfile';
import { brandProfileValidationSchema } from '../brand/brandValidation';
import { registryStore } from '../persistence/registryStore';
import { isAIAvailable, resolveGeneratorType } from '../ai/generatorFactory';
import { evaluateAsset } from '../quality/contentEvaluator';
import { generateQualityReport } from '../quality/evaluationReport';
import { runBenchmark } from '../benchmark/contentBenchmark';
import { generateBenchmarkReport } from '../benchmark/benchmarkReport';
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
  //  SECTION 2 — BrandOS Profile + Persistence restore
  // ════════════════════════════════════════════════════════════════════════

  const brandProfile = createBrandProfile({
    brandName:   'CreatorOS',
    voice:       'Motivational & Direct',
    audience:    'Solopreneurs and independent creators',
    positioning: 'Systematic content production for creators',
  });
  validate(brandProfile, brandProfileValidationSchema);

  const restored = registryStore.restore();
  console.log('[Persistence] Registry restored', {
    provider: registryStore.providerName,
    restored: restored.length,
  });

  // ════════════════════════════════════════════════════════════════════════
  //  SECTION 3 — Sprint 13: AI Benchmark
  //  Same 10 ContentRequests × Deterministic + OpenAI (if available)
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

  console.log('[Benchmark] Starting Sprint 13 generator comparison', {
    total_requests:    requests.length,
    ai_available:      isAIAvailable(),
    active_generator:  resolveGeneratorType({ useAI: true }),
  });

  const benchmarkRun    = await runBenchmark(requests, blueprint, blueprintHash, brandProfile);
  const benchmarkReport = generateBenchmarkReport(benchmarkRun);

  // Deterministic dimension baseline (Sprint 12 data)
  const detEvals = benchmarkRun.entries.map((e) => e.deterministicEval);
  const detAvgDim = {
    hookStrength:     Math.round(detEvals.reduce((s, e) => s + e.hookStrength.score,     0) / detEvals.length),
    bodyCompleteness: Math.round(detEvals.reduce((s, e) => s + e.bodyCompleteness.score, 0) / detEvals.length),
    ctaStrength:      Math.round(detEvals.reduce((s, e) => s + e.ctaStrength.score,      0) / detEvals.length),
    formatFit:        Math.round(detEvals.reduce((s, e) => s + e.formatFit.score,        0) / detEvals.length),
  };

  console.log('[Benchmark] Deterministic baseline', {
    avg:        benchmarkReport.deterministicAvg,
    dimensions: detAvgDim,
  });

  if (benchmarkReport.aiAvailable && benchmarkReport.openaiAvg !== null) {
    const aiEvals = benchmarkRun.entries
      .map((e) => e.openaiEval)
      .filter((e): e is NonNullable<typeof e> => e !== null);

    const aiAvgDim = {
      hookStrength:     Math.round(aiEvals.reduce((s, e) => s + e.hookStrength.score,     0) / aiEvals.length),
      bodyCompleteness: Math.round(aiEvals.reduce((s, e) => s + e.bodyCompleteness.score, 0) / aiEvals.length),
      ctaStrength:      Math.round(aiEvals.reduce((s, e) => s + e.ctaStrength.score,      0) / aiEvals.length),
      formatFit:        Math.round(aiEvals.reduce((s, e) => s + e.formatFit.score,        0) / aiEvals.length),
    };

    console.log('[Benchmark] OpenAI results', {
      avg:                 benchmarkReport.openaiAvg,
      delta_vs_baseline:  `+${benchmarkReport.overallDelta}`,
      dimensions:          aiAvgDim,
      production_candidate: benchmarkReport.productionCandidate,
    });

    console.log('[Benchmark] Per-dimension delta (OpenAI − Deterministic)', {
      hookStrength:     aiAvgDim.hookStrength     - detAvgDim.hookStrength,
      bodyCompleteness: aiAvgDim.bodyCompleteness - detAvgDim.bodyCompleteness,
      ctaStrength:      aiAvgDim.ctaStrength      - detAvgDim.ctaStrength,
      formatFit:        aiAvgDim.formatFit        - detAvgDim.formatFit,
    });

  } else {
    console.log('[Benchmark] OpenAI benchmark pending', {
      status:         'VITE_API_KEY not set',
      baseline:       `${benchmarkReport.deterministicAvg}/100`,
      target:         `${benchmarkReport.targetScore}+`,
      required_delta: `+${benchmarkReport.targetScore - benchmarkReport.deterministicAvg}`,
    });
  }

  // Architectural decision logged
  console.log('[Benchmark] Hybrid generator strategy', {
    hook_body:     'AI generator (currently 45/100 → target 75+)',
    cta_title:     'deterministic (100/100 — do not change)',
    rationale:     'CTA already optimal; variability ≠ improvement',
  });

  console.log('[Benchmark] Verdict', { verdict: benchmarkReport.verdict });

  // Full quality report (Sprint 12 dimensions re-confirmed)
  const qualityReport = generateQualityReport(detEvals.map((e) => e));
  lineageRecord = appendLineageEvent(lineageRecord, {
    eventType: 'exported', actorId: 'benchmark',
    timestamp: new Date().toISOString(),
    metadata: {
      deterministicAvg:  benchmarkReport.deterministicAvg,
      openaiAvg:         benchmarkReport.openaiAvg,
      aiAvailable:       benchmarkReport.aiAvailable,
      productionCandidate: benchmarkReport.productionCandidate,
      weakestDimension:  qualityReport.weakestDimension.dimension,
    },
  });

  console.log('[CreatorOS Core] Platform complete', {
    lineage_events:  lineageRecord.events.map((e) => e.eventType),
    domains:         ['blueprint','validation','hashing','lineage','assets','instagram','brand','content','registry','library','persistence','ai','quality','benchmark'],
  });
}
