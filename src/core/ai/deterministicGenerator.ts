import type { ContentGenerator } from './contentGenerator';
import type { ContentRequest } from '../content/contentRequest';
import type { Blueprint } from '../blueprint';
import type { InstagramAssetV1 } from '../instagram';
import { createInstagramAssetFromContentRequest } from '../content/contentAdapter';

// ─── DeterministicContentGenerator ───────────────────────────────────────────
// Zero I/O, zero API keys. Template-based output — identical output for
// identical input. Used for MVP, tests, and offline mode.

export class DeterministicContentGenerator implements ContentGenerator {
  readonly generatorType = 'deterministic' as const;

  async generate(
    request: ContentRequest,
    blueprint: Blueprint,
    blueprintHash: string,
  ): Promise<InstagramAssetV1> {
    return createInstagramAssetFromContentRequest(request, blueprint, blueprintHash);
  }
}
