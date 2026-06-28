import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import { createAsset } from '../assets';
import { createInstagramAsset } from '../instagram/instagramAssetFactory';
import type { ContentRequest } from './contentRequest';
import { deriveTitle, deriveHook, deriveBodySkeleton, deriveCta } from './contentHelpers';

export function createInstagramAssetFromContentRequest(
  request: ContentRequest,
  blueprint: Blueprint,
  blueprintHash: string,
): InstagramAssetV1 {
  const asset = createAsset(blueprint, blueprintHash);

  return createInstagramAsset({
    asset,
    format:       request.format,
    intent:       request.intent,
    title:        deriveTitle(request),
    hook:         deriveHook(request),
    bodySkeleton: deriveBodySkeleton(request),
    cta:          deriveCta(request.intent),
  });
}
