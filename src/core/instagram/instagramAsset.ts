export type InstagramChannel = 'instagram';

// IA-010: 'post' deliberately excluded — not a primary compiler target
export type InstagramFormat = 'reel' | 'carousel' | 'story';

// IA-011: 'engagement' excluded — too vague for compiler intent gate
export type InstagramIntent = 'awareness' | 'consideration' | 'conversion';

// ── Quality meta — attached by the Intelligence Layer after evaluation ────────
// Optional so assets generated before Sprint 14 remain valid without migration.
export interface AssetQualityMeta {
  qualityScore:    number;   // overall weighted score 0–100
  hookScore:       number;   // hookStrength dimension
  bodyScore:       number;   // bodyCompleteness dimension
  ctaScore:        number;   // ctaStrength dimension
  formatScore:     number;   // formatFit dimension
  grade:           string;   // A / B / C / D / F
  generatorType:   'deterministic' | 'openai';
  evaluatedAt:     string;   // ISO timestamp
  benchmarkVersion: number;  // increment when scoring rules change
}

export interface InstagramAssetV1 {
  // ── Identity ──────────────────────────────────────────────────────────────
  assetId: string;       // semantic — from parent AssetV1, stable
  blueprintHash: string; // which blueprint spec produced this
  artifactHash: string;  // hash of title+hook+bodySkeleton+cta — changes with content
  runId: string;         // unique per pipeline execution

  // ── Channel ───────────────────────────────────────────────────────────────
  channel: InstagramChannel;
  format: InstagramFormat;
  intent: InstagramIntent;

  // ── Content Core ──────────────────────────────────────────────────────────
  title: string;
  hook: string;
  bodySkeleton: string;
  cta: string;

  createdAt: string;

  // ── Intelligence (Sprint 14) — optional, attached post-generation ─────────
  qualityMeta?: AssetQualityMeta;
}

export interface InstagramAssetValidationReport {
  results: {
    instagram_validity: 'pass' | 'fail';
    asset_validity: 'pass' | 'fail';
  };
  fails: string[];
}
