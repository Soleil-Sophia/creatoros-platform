import type { AssetV1 } from '../assets';
import { hashContent } from '../hashing';
import type { InstagramAssetV1, InstagramFormat, InstagramIntent } from './instagramAsset';

export interface CreateInstagramAssetInput {
  asset: AssetV1;
  format: InstagramFormat;
  intent: InstagramIntent;
  title: string;
  hook: string;
  bodySkeleton: string;
  cta: string;
}

const registry = new Map<string, InstagramAssetV1>();

export function createInstagramAsset(input: CreateInstagramAssetInput): InstagramAssetV1 {
  const { asset, format, intent, title, hook, bodySkeleton, cta } = input;

  // artifact_hash is derived from the content core — NOT from blueprint
  // Same asset can have different artifact hashes if content changes (e.g. A/B test hook)
  const contentCore = JSON.stringify({ title, hook, bodySkeleton, cta });
  const { digest: artifactHash } = hashContent({ text: contentCore });

  const instagramAsset: InstagramAssetV1 = {
    assetId: asset.id,
    blueprintHash: asset.blueprintHash,
    artifactHash,
    runId: asset.runId,
    channel: 'instagram',
    format,
    intent,
    title,
    hook,
    bodySkeleton,
    cta,
    createdAt: new Date().toISOString(),
  };

  registry.set(artifactHash, instagramAsset);
  return instagramAsset;
}

export function getInstagramAssetByArtifactHash(
  artifactHash: string,
): InstagramAssetV1 | null {
  return registry.get(artifactHash) ?? null;
}
