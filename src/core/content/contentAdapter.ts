import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import { createAsset } from '../assets';
import { createInstagramAsset } from '../instagram/instagramAssetFactory';
import type { ContentRequest } from './contentRequest';

function deriveTitle(req: ContentRequest): string {
  return `${req.topic} — ${req.brandProfile.brandName}`;
}

function deriveHook(req: ContentRequest): string {
  switch (req.intent) {
    case 'awareness':
      return `Most ${req.brandProfile.audience} don't know this about ${req.topic}.`;
    case 'consideration':
      return `Here's why ${req.topic} changes everything for ${req.brandProfile.audience}.`;
    case 'conversion':
      return `If you're serious about ${req.topic}, this is for you.`;
  }
}

function deriveBodySkeleton(req: ContentRequest): string {
  const { topic, brandProfile } = req;
  return `[${topic}]: The system that helps ${brandProfile.audience} go from scattered → strategic. Voice: ${brandProfile.voice}.`;
}

function deriveCta(intent: ContentRequest['intent']): string {
  switch (intent) {
    case 'awareness':     return 'Save this for later →';
    case 'consideration': return 'Learn more in the link →';
    case 'conversion':    return 'Get started today →';
  }
}

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
