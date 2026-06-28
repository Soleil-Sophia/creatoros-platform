import type { InstagramAssetV1, AssetQualityMeta } from '../instagram/instagramAsset';
import type { BrandProfile } from '../brand';
import { evaluateAsset } from '../quality/contentEvaluator';

// ─── Current scoring rule version ─────────────────────────────────────────────
// Increment this any time evaluation rules change so historical records stay
// comparable (same version = same ruleset).
export const BENCHMARK_VERSION = 1;

// ─── evaluateAndTag ───────────────────────────────────────────────────────────
// Runs the quality evaluator on an asset and attaches the scores directly onto
// the asset as `qualityMeta`. Returns the enriched asset — the original is not
// mutated.
//
// Usage:
//   const tagged = evaluateAndTag(asset, brandProfile, 'deterministic');
//   tagged.qualityMeta.qualityScore // → 61

export function evaluateAndTag(
  asset: InstagramAssetV1,
  brandProfile: BrandProfile,
  generatorType: 'deterministic' | 'openai',
): InstagramAssetV1 {
  const evaluation = evaluateAsset(asset, brandProfile);

  const meta: AssetQualityMeta = {
    qualityScore:     evaluation.overallScore,
    hookScore:        evaluation.hookStrength.score,
    bodyScore:        evaluation.bodyCompleteness.score,
    ctaScore:         evaluation.ctaStrength.score,
    formatScore:      evaluation.formatFit.score,
    grade:            evaluation.grade,
    generatorType,
    evaluatedAt:      new Date().toISOString(),
    benchmarkVersion: BENCHMARK_VERSION,
  };

  return { ...asset, qualityMeta: meta };
}
