import type { ContentGenerator } from './contentGenerator';
import type { ContentRequest } from '../content/contentRequest';
import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import { createAsset } from '../assets';
import { createInstagramAsset } from '../instagram/instagramAssetFactory';
import { generateContent } from '../../app/lib/ai-connector/service';
import { deriveTitle, deriveHook, deriveBodySkeleton, deriveCta } from '../content/contentHelpers';

// ─── OpenAIContentGenerator ───────────────────────────────────────────────────
// Hybrid strategy (per Sprint 13 evaluation):
//   Hook + Body → AI         (currently 45/100 → target 75+)
//   Title + CTA → deterministic  (already 100/100 — don't touch)
//
// This means swapping to AI only improves the creative content;
// structural quality (CTA, format, intent mapping) remains stable.

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

    // AI-generated: hook + body (the creative fields, currently scoring 45/100)
    const hook = result.hooks[0] ?? deriveHook(request);
    const bodySkeleton = result.scripts[0] ?? result.captions[0] ?? deriveBodySkeleton(request);

    // Rule-based: title + cta (deterministic fields, already scoring 100/100)
    const title = deriveTitle(request);
    const cta   = deriveCta(request.intent);

    const asset = createAsset(blueprint, blueprintHash);
    return createInstagramAsset({
      asset,
      format:  request.format,
      intent:  request.intent,
      title,
      hook,
      bodySkeleton,
      cta,
    });
  }
}
