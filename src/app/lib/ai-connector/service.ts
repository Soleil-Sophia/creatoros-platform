import type { GenerateContentParams, GenerateContentResult } from './types';

const FUNCTION_URL =
  (import.meta as Record<string, any>).env?.VITE_SUPABASE_FUNCTION_URL ||
  'https://ylulrtnvohxpriyucyqw.supabase.co/functions/v1/make-server-add905f8';

const API_KEY = (import.meta as Record<string, any>).env?.VITE_API_KEY || '';

export function isConnectorConfigured(): boolean {
  return API_KEY.trim().length > 0;
}

function fallbackErrorMessage(status: number): string {
  switch (status) {
    case 401:
    case 403:
      return 'Authentication failed. Check your VITE_API_KEY configuration and try again.';
    case 429:
      return 'The AI service is busy right now. Please wait a moment and try again.';
    default:
      return status >= 500
        ? 'The AI service is temporarily unavailable. Please try again.'
        : 'Generation failed. Please review your inputs and try again.';
  }
}

export async function generateContent(
  params: GenerateContentParams,
): Promise<GenerateContentResult> {
  if (!isConnectorConfigured()) {
    throw new Error(
      'AI connector is not configured. Set VITE_API_KEY in your environment to enable generation.',
    );
  }

  const payload: Record<string, unknown> = {
    offer: params.offer,
    audience: params.audience,
    platform: params.platform,
    goal: params.goal,
    tone: params.tone,
    outputType: params.outputType,
  };

  if (params.brandProfile) {
    payload.brandName = params.brandProfile.brandName;
    payload.voiceTone = params.brandProfile.voiceTone;
    payload.voiceComplexity = params.brandProfile.voiceComplexity;
    payload.voiceFormality = params.brandProfile.voiceFormality;
    payload.voiceEnergy = params.brandProfile.voiceEnergy;
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
  } catch {
    throw new Error(
      'Could not reach the AI service. Check your network connection and try again.',
    );
  }

  if (!res.ok) {
    let errorMessage = fallbackErrorMessage(res.status);
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
