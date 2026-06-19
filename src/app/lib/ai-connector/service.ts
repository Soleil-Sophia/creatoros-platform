/**
 * AI Connector — Lovable AI Integration
 *
 * Connects the ContentOS generate screen to the Supabase Edge Function
 * (`make-server-add905f8`) which calls OpenAI and returns structured
 * content: hooks, scripts, and captions.
 *
 * Configuration (environment variables):
 *   VITE_SUPABASE_FUNCTION_URL  — Base URL of the Edge Function
 *                                 e.g. https://<project>.supabase.co/functions/v1/make-server-add905f8
 *   VITE_API_KEY                — Shared API key (must match FRONTEND_API_KEY on the server)
 */

import type { GenerateContentParams, GenerateContentResult } from './types';

const FUNCTION_URL = (
  ((import.meta as Record<string, any>).env?.VITE_SUPABASE_FUNCTION_URL ?? '') as string
)
  .trim()
  .replace(/\/+$/, '');

const API_KEY = (import.meta as Record<string, any>).env?.VITE_API_KEY || '';

/**
 * Returns true when the connector is configured and calls will be attempted.
 * When false, `generateContent` will throw an informative error.
 */
export function isConnectorConfigured(): boolean {
  return API_KEY.trim().length > 0 && FUNCTION_URL.trim().length > 0;
}

/**
 * Call the Lovable AI connector to generate a content suite.
 *
 * The server receives the full Brand Profile context (if available) and uses
 * it to personalise the OpenAI prompt — producing hooks, scripts, and captions
 * that reflect the creator's voice, not generic AI filler.
 *
 * @throws Error with a user-facing message on failure.
 */
export async function generateContent(
  params: GenerateContentParams,
): Promise<GenerateContentResult> {
  if (!isConnectorConfigured()) {
    throw new Error(
      'AI connector is not configured. Set VITE_API_KEY and VITE_SUPABASE_FUNCTION_URL in your environment to enable generation.',
    );
  }

  // Build the request payload — pass Brand Profile fields through as top-level
  // keys so the edge function can inject them into the AI prompt.
  const payload: Record<string, unknown> = {
    offer: params.offer,
    audience: params.audience,
    platform: params.platform,
    goal: params.goal,
    tone: params.tone,
    outputType: params.outputType,
  };

  if (params.brandProfile) {
    // Mirror the field names the edge function expects from its KV brand profile.
    payload.voiceTone = params.brandProfile.tone;
    payload.voiceComplexity = params.brandProfile.complexity;
    payload.voiceFormality = params.brandProfile.formality;
    payload.voiceEnergy = params.brandProfile.energy;
    if (params.brandProfile.voiceLabel) {
      payload.voiceLabel = params.brandProfile.voiceLabel;
    }
  }

  let res: Response;
  try {
    res = await fetch(`${FUNCTION_URL}/content/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new Error(
      'Could not reach the AI service. Check your network connection and try again.',
    );
  }

  if (!res.ok) {
    let errorMessage = `Generation failed (HTTP ${res.status}).`;
    try {
      const body = await res.json();
      if (typeof body?.error === 'string') errorMessage = body.error;
    } catch {
      // ignore parse error
    }
    throw new Error(errorMessage);
  }

  const data = await res.json();

  return {
    hooks: Array.isArray(data.hooks) ? data.hooks : [],
    scripts: Array.isArray(data.scripts) ? data.scripts : [],
    captions: Array.isArray(data.captions) ? data.captions : [],
    brandName: typeof data.brandName === 'string' ? data.brandName : null,
  };
}
