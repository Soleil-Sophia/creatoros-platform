import type { QualityEvaluation, QualityDimension } from './contentEvaluator';

// ─── Report types ─────────────────────────────────────────────────────────────

export interface DimensionSummary {
  dimension: string;
  averageScore: number;
  passRate: number;  // 0–1
}

export interface QualityReport {
  totalAssets:       number;
  averageScore:      number;
  gradeBreakdown:    Record<string, number>;
  topAsset:          QualityEvaluation;
  weakestAsset:      QualityEvaluation;
  weakestDimension:  DimensionSummary;
  strongestDimension: DimensionSummary;
  templateHookCount: number;
  placeholderBodyCount: number;
  findings:          string[];
  evaluations:       QualityEvaluation[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function avg(nums: number[]): number {
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

function dimensionSummary(
  evaluations: QualityEvaluation[],
  key: keyof Pick<QualityEvaluation, 'hookStrength' | 'bodyCompleteness' | 'ctaStrength' | 'formatFit'>,
  label: string,
): DimensionSummary {
  const dims = evaluations.map((e) => e[key] as QualityDimension);
  return {
    dimension:    label,
    averageScore: avg(dims.map((d) => d.score)),
    passRate:     dims.filter((d) => d.pass).length / dims.length,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function generateQualityReport(evaluations: QualityEvaluation[]): QualityReport {
  if (evaluations.length === 0) throw new Error('Cannot generate report for 0 evaluations.');

  const scores     = evaluations.map((e) => e.overallScore);
  const topAsset   = evaluations.reduce((best, e) => e.overallScore > best.overallScore ? e : best);
  const weakAsset  = evaluations.reduce((worst, e) => e.overallScore < worst.overallScore ? e : worst);

  const gradeBreakdown: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  for (const e of evaluations) gradeBreakdown[e.grade]++;

  const dimSummaries: DimensionSummary[] = [
    dimensionSummary(evaluations, 'hookStrength',     'Hook Strength'),
    dimensionSummary(evaluations, 'bodyCompleteness', 'Body Completeness'),
    dimensionSummary(evaluations, 'ctaStrength',      'CTA Strength'),
    dimensionSummary(evaluations, 'formatFit',        'Format Fit'),
  ];

  const weakestDimension   = dimSummaries.reduce((w, d) => d.averageScore < w.averageScore ? d : w);
  const strongestDimension = dimSummaries.reduce((s, d) => d.averageScore > s.averageScore ? d : s);

  // Diagnostics
  const templateHookCount = evaluations.filter((e) =>
    e.hookStrength.signals.some((s) => s.includes('template pattern')),
  ).length;

  const placeholderBodyCount = evaluations.filter((e) =>
    e.bodyCompleteness.signals.some((s) => s.includes('placeholder bracket')),
  ).length;

  // Findings — data-driven narrative
  const findings: string[] = [];

  if (templateHookCount === evaluations.length) {
    findings.push(`All ${evaluations.length} hooks follow a deterministic template — zero variety.`);
    findings.push('Hook variety requires an AI generator (OpenAIContentGenerator).');
  } else if (templateHookCount > 0) {
    findings.push(`${templateHookCount}/${evaluations.length} hooks follow a template pattern.`);
  }

  if (placeholderBodyCount === evaluations.length) {
    findings.push('All body skeletons contain placeholder brackets — not publishable as-is.');
    findings.push('Body content is the biggest gap for real creator use.');
  }

  if (weakestDimension.passRate < 0.5) {
    findings.push(`Weakest dimension: ${weakestDimension.dimension} (avg ${weakestDimension.averageScore}/100, ${Math.round(weakestDimension.passRate * 100)}% pass rate).`);
  }

  if (strongestDimension.averageScore >= 75) {
    findings.push(`Strongest dimension: ${strongestDimension.dimension} (avg ${strongestDimension.averageScore}/100) — structural quality is solid.`);
  }

  const averageScore = avg(scores);
  if (averageScore < 65) {
    findings.push(`Average score ${averageScore}/100 — DeterministicGenerator produces structurally valid but content-shallow assets.`);
    findings.push('Activating OpenAIContentGenerator expected to raise score to 75+.');
  }

  return {
    totalAssets: evaluations.length,
    averageScore,
    gradeBreakdown,
    topAsset,
    weakestAsset: weakAsset,
    weakestDimension,
    strongestDimension,
    templateHookCount,
    placeholderBodyCount,
    findings,
    evaluations,
  };
}
