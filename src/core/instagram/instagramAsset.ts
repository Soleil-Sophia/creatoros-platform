export type InstagramChannel = 'instagram';
export type InstagramFormat = 'reel' | 'carousel' | 'story' | 'post';
export type InstagramIntent = 'awareness' | 'education' | 'conversion' | 'engagement';

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
