import type { ContentRequest } from './contentRequest';

// ─── Deterministic content derivation helpers ─────────────────────────────────
// Exported so both DeterministicContentGenerator and OpenAIContentGenerator
// can share the same rule-based logic for fields that already score 100/100.
// CTA, title, and format mapping stay deterministic — never hand them to an LLM.

export function deriveTitle(req: ContentRequest): string {
  return `${req.topic} — ${req.brandProfile.brandName}`;
}

export function deriveHook(req: ContentRequest): string {
  switch (req.intent) {
    case 'awareness':
      return `Most ${req.brandProfile.audience} don't know this about ${req.topic}.`;
    case 'consideration':
      return `Here's why ${req.topic} changes everything for ${req.brandProfile.audience}.`;
    case 'conversion':
      return `If you're serious about ${req.topic}, this is for you.`;
  }
}

export function deriveBodySkeleton(req: ContentRequest): string {
  const { topic, brandProfile } = req;
  return `[${topic}]: The system that helps ${brandProfile.audience} go from scattered → strategic. Voice: ${brandProfile.voice}.`;
}

export function deriveCta(intent: ContentRequest['intent']): string {
  switch (intent) {
    case 'awareness':     return 'Save this for later →';
    case 'consideration': return 'Learn more in the link →';
    case 'conversion':    return 'Get started today →';
  }
}
