import type { IntelligenceRecord } from './intelligenceStore';

// ─── Query filter ─────────────────────────────────────────────────────────────

export interface IntelligenceFilter {
  intent?:        string;
  format?:        string;
  generatorType?: 'deterministic' | 'openai';
  minScore?:      number;
  maxScore?:      number;
  grade?:         string;
  limit?:         number;
}

// ─── Pattern result ───────────────────────────────────────────────────────────

export interface IntelligencePattern {
  totalMatched:       number;
  averageScore:       number;
  averageHookScore:   number;
  averageBodyScore:   number;
  averageCtaScore:    number;
  averageFormatScore: number;
  topRecords:         IntelligenceRecord[];   // sorted by qualityScore desc
  gradeBreakdown:     Record<string, number>;
  generatorBreakdown: Record<string, number>;
  insight:            string;                 // human-readable summary sentence
}

// ─── Query engine ─────────────────────────────────────────────────────────────

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return Math.round(nums.reduce((s, n) => s + n, 0) / nums.length);
}

export function queryPatterns(
  records: IntelligenceRecord[],
  filter: IntelligenceFilter = {},
): IntelligencePattern {
  let matched = [...records];

  if (filter.intent)        matched = matched.filter((r) => r.intent        === filter.intent);
  if (filter.format)        matched = matched.filter((r) => r.format        === filter.format);
  if (filter.generatorType) matched = matched.filter((r) => r.qualityMeta.generatorType === filter.generatorType);
  if (filter.grade)         matched = matched.filter((r) => r.qualityMeta.grade         === filter.grade);
  if (filter.minScore != null) matched = matched.filter((r) => r.qualityMeta.qualityScore >= filter.minScore!);
  if (filter.maxScore != null) matched = matched.filter((r) => r.qualityMeta.qualityScore <= filter.maxScore!);

  const sorted = [...matched].sort((a, b) => b.qualityMeta.qualityScore - a.qualityMeta.qualityScore);
  const top    = filter.limit ? sorted.slice(0, filter.limit) : sorted;

  const gradeBreakdown: Record<string, number> = {};
  const generatorBreakdown: Record<string, number> = {};
  for (const r of matched) {
    gradeBreakdown[r.qualityMeta.grade]           = (gradeBreakdown[r.qualityMeta.grade]           ?? 0) + 1;
    generatorBreakdown[r.qualityMeta.generatorType] = (generatorBreakdown[r.qualityMeta.generatorType] ?? 0) + 1;
  }

  const avgScore  = avg(matched.map((r) => r.qualityMeta.qualityScore));
  const avgHook   = avg(matched.map((r) => r.qualityMeta.hookScore));
  const avgBody   = avg(matched.map((r) => r.qualityMeta.bodyScore));
  const avgCta    = avg(matched.map((r) => r.qualityMeta.ctaScore));
  const avgFormat = avg(matched.map((r) => r.qualityMeta.formatScore));

  // Insight sentence — pattern language the advisor described
  let insight = '';
  if (matched.length === 0) {
    insight = 'No records matched this filter.';
  } else {
    const topGenerator = Object.entries(generatorBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '?';
    const weakDim      = [
      { label: 'hookScore',   v: avgHook   },
      { label: 'bodyScore',   v: avgBody   },
      { label: 'ctaScore',    v: avgCta    },
      { label: 'formatScore', v: avgFormat },
    ].sort((a, b) => a.v - b.v)[0];

    insight = `${matched.length} ${filter.intent ?? 'all-intent'} assets `
      + `(${filter.format ?? 'all-format'}): avg ${avgScore}/100 `
      + `via ${topGenerator}. `
      + `Weakest dimension: ${weakDim?.label ?? '—'} (${weakDim?.v ?? 0}/100).`;
  }

  return {
    totalMatched:       matched.length,
    averageScore:       avgScore,
    averageHookScore:   avgHook,
    averageBodyScore:   avgBody,
    averageCtaScore:    avgCta,
    averageFormatScore: avgFormat,
    topRecords:         top,
    gradeBreakdown,
    generatorBreakdown,
    insight,
  };
}
