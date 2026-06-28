import type { ContentGenerator } from './contentGenerator';
import { DeterministicContentGenerator } from './deterministicGenerator';
import { OpenAIContentGenerator } from './openaiGenerator';
import { isConnectorConfigured } from '../../app/lib/ai-connector/service';

export interface ContentGeneratorOptions {
  useAI?: boolean;
}

// ─── createContentGenerator ───────────────────────────────────────────────────
// Picks the right generator. If AI is requested but the connector is not
// configured (no VITE_API_KEY), silently falls back to Deterministic.
// This keeps the rest of the pipeline unchanged in all environments.

export function createContentGenerator(options?: ContentGeneratorOptions): ContentGenerator {
  if (options?.useAI && isConnectorConfigured()) {
    return new OpenAIContentGenerator();
  }
  return new DeterministicContentGenerator();
}

export function isAIAvailable(): boolean {
  return isConnectorConfigured();
}

export function resolveGeneratorType(options?: ContentGeneratorOptions): 'openai' | 'deterministic' {
  return options?.useAI && isConnectorConfigured() ? 'openai' : 'deterministic';
}
