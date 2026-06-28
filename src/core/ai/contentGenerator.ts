import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import type { ContentRequest } from '../content/contentRequest';

// ─── ContentGenerator interface ───────────────────────────────────────────────
// The only contract the rest of the pipeline cares about:
//   ContentRequest → InstagramAssetV1
//
// Implementations swap freely:
//   DeterministicContentGenerator  (MVP, no API key)
//   OpenAIContentGenerator          (Sprint 11+, requires VITE_API_KEY)
//   Any future generator             (Anthropic, Gemini, …)

export interface ContentGenerator {
  readonly generatorType: 'deterministic' | 'openai';
  generate(
    request: ContentRequest,
    blueprint: Blueprint,
    blueprintHash: string,
  ): Promise<InstagramAssetV1>;
}
