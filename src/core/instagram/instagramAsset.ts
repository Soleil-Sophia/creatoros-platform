export type InstagramChannel = 'instagram';

// IA-010: 'post' deliberately excluded — not a primary compiler target
export type InstagramFormat = 'reel' | 'carousel' | 'story';

// IA-011: 'engagement' excluded — too vague for compiler intent gate
export type InstagramIntent = 'awareness' | 'consideration' | 'conversion';

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
}

export interface InstagramAssetValidationReport {
  results: {
    instagram_validity: 'pass' | 'fail';
    asset_validity: 'pass' | 'fail';
  };
  fails: string[];
}
