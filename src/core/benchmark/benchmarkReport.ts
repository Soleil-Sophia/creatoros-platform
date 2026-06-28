import type { BenchmarkRun, BenchmarkEntry } from './contentBenchmark';
import type { QualityEvaluation } from '../quality/contentEvaluator';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DimensionComparison {
  dimension:     string;
  deterministic: number;
  openai:        number | null;
  delta:         number | null;
}

export interface BenchmarkReport {
  runAt:              string;
  aiAvailable:        boolean;
  totalRequests:      number;

  // Score summary
  deterministicAvg:   number;
  openaiAvg:          number | null;
  overallDelta:       number | null;

  // Verdict
  productionCandidate: boolean | null;   // true if openaiAvg >= 75
  verdict:             string;

  // Per-dimension breakdown
  dimensions:         DimensionComparison[];

  // Per-request winners
  openaiWins:         number;
  deterministicWins:  number;
  ties:               number;

  // Target
  targetScore:        number;
  remainingGap:       number | null;    // targetScore − openaiAvg

  entries:            BenchmarkEntry[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

function dimAvg(evals: QualityEvaluation[], key: keyof Pick<QualityEvaluation, 'hookStrength' | 'bodyCompleteness' | 'ctaStrength' | 'formatFit'>): number {
  return avg(evals.map((e) => (e[key] as { score: number }).score));
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function generateBenchmarkReport(run: BenchmarkRun): BenchmarkReport {
  const TARGET = 75;

  const detEvals  = run.entries.map((e) => e.deterministicEval);
  const aiEvals   = run.entries.map((e) => e.openaiEval).filter((e): e is QualityEvaluation => e !== null);

  const deterministicAvg = avg(detEvals.map((e) => e.overallScore));
  const openaiAvg        = aiEvals.length > 0 ? avg(aiEvals.map((e) => e.overallScore)) : null;
  const overallDelta     = openaiAvg !== null ? openaiAvg - deterministicAvg : null;

  const productionCandidate = openaiAvg !== null ? openaiAvg >= TARGET : null;

  const dimensions: DimensionComparison[] = [
    { dimension: 'Hook Strength',     deterministic: dimAvg(detEvals, 'hookStrength'),     openai: aiEvals.length ? dimAvg(aiEvals, 'hookStrength')     : null, delta: null },
    { dimension: 'Body Completeness', deterministic: dimAvg(detEvals, 'bodyCompleteness'), openai: aiEvals.length ? dimAvg(aiEvals, 'bodyCompleteness') : null, delta: null },
    { dimension: 'CTA Strength',      deterministic: dimAvg(detEvals, 'ctaStrength'),      openai: aiEvals.length ? dimAvg(aiEvals, 'ctaStrength')      : null, delta: null },
    { dimension: 'Format Fit',        deterministic: dimAvg(detEvals, 'formatFit'),        openai: aiEvals.length ? dimAvg(aiEvals, 'formatFit')        : null, delta: null },
  ];

  // Fill deltas
  for (const d of dimensions) {
    d.delta = d.openai !== null ? d.openai - d.deterministic : null;
  }

  const openaiWins        = run.entries.filter((e) => e.winner === 'openai').length;
  const deterministicWins = run.entries.filter((e) => e.winner === 'deterministic').length;
  const ties              = run.entries.filter((e) => e.winner === 'tie').length;
  const remainingGap      = openaiAvg !== null ? Math.max(0, TARGET - openaiAvg) : null;

  // Verdict
  let verdict: string;
  if (!run.aiAvailable) {
    verdict = `Baseline established: ${deterministicAvg}/100. Set VITE_API_KEY to run AI benchmark. Target: ${TARGET}+.`;
  } else if (productionCandidate) {
    verdict = `OpenAI avg ${openaiAvg}/100 ≥ ${TARGET} — Production Candidate. Delta: +${overallDelta} vs Deterministic.`;
  } else {
    verdict = `OpenAI avg ${openaiAvg}/100 < ${TARGET} — Not yet Production Candidate. Gap: ${remainingGap}. Improve prompt layer.`;
  }

  return {
    runAt:              run.runAt,
    aiAvailable:        run.aiAvailable,
    totalRequests:      run.totalRequests,
    deterministicAvg,
    openaiAvg,
    overallDelta,
    productionCandidate,
    verdict,
    dimensions,
    openaiWins,
    deterministicWins,
    ties,
    targetScore:        TARGET,
    remainingGap,
    entries:            run.entries,
  };
}
