import type { ContentGenerator } from './contentGenerator';
import type { ContentRequest } from '../content/contentRequest';
import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import { createAsset } from '../assets';
import { createInstagramAsset } from '../instagram/instagramAssetFactory';
import { generateContent } from '../../app/lib/ai-connector/service';

function deriveCta(intent: ContentRequest['intent']): string {
  switch (intent) {
    case 'awareness':     return 'Save this for later →';
    case 'consideration': return 'Learn more in the link →';
    case 'conversion':    return 'Get started today →';
  }
}

// ─── OpenAIContentGenerator ───────────────────────────────────────────────────
// Calls the Supabase AI function (via VITE_API_KEY).
// Maps GenerateContentResult → InstagramAssetV1 using the same factory
// that the deterministic generator uses — contract is identical.

export class OpenAIContentGenerator implements ContentGenerator {
  readonly generatorType = 'openai' as const;

  async generate(
    request: ContentRequest,
    blueprint: Blueprint,
    blueprintHash: string,
  ): Promise<InstagramAssetV1> {
    const result = await generateContent({
      offer:       request.topic,
      audience:    request.brandProfile.audience,
      platform:    'instagram',
      goal:        request.intent,
      tone:        request.brandProfile.voice,
      outputType:  request.format,
      brandProfile: {
        brandName:       request.brandProfile.brandName,
        voiceTone:       request.brandProfile.voice,
        voiceComplexity: '',
        voiceFormality:  '',
        voiceEnergy:     '',
      },
    });

    // Graceful fallback: if AI returns empty arrays, use template values
    const hook = result.hooks[0]
      ?? `Most ${request.brandProfile.audience} don't know this about ${request.topic}.`;
    const bodySkeleton = result.scripts[0]
      ?? result.captions[0]
      ?? `[${request.topic}]: The system for ${request.brandProfile.audience}.`;
    const title = `${request.topic} — ${request.brandProfile.brandName}`;

    const asset = createAsset(blueprint, blueprintHash);
    return createInstagramAsset({
      asset,
      format:       request.format,
      intent:       request.intent,
      title,
      hook,
      bodySkeleton,
      cta:          deriveCta(request.intent),
    });
  }
}
