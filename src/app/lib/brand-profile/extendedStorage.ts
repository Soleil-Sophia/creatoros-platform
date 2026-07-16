import type { BrandProfileExtended } from './extendedTypes';
import { emptyBrandProfileExtended } from './extendedTypes';
import { writeBrandProfile, createVoiceLabel } from './storage';

export const BRAND_PROFILE_EXTENDED_STORAGE_KEY = 'creatoros-brand-profile-extended-v1';

function isObj(v: unknown): v is Record<string, unknown> {
  return Boolean(v && typeof v === 'object' && !Array.isArray(v));
}
function str(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

export function readBrandProfileExtended(): BrandProfileExtended | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(BRAND_PROFILE_EXTENDED_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (!isObj(p)) return null;
    const id = isObj(p.identity) ? p.identity : {};
    const au = isObj(p.audience) ? p.audience : {};
    const vo = isObj(p.voice) ? p.voice : {};
    const vi = isObj(p.visual) ? p.visual : {};
    return {
      brandName: str(p.brandName),
      identity: {
        mission: str(id.mission),
        vision: str(id.vision),
        positioning: str(id.positioning),
      },
      audience: {
        audience: str(au.audience),
        painPoints: str(au.painPoints),
        desiredOutcome: str(au.desiredOutcome),
        transformation: str(au.transformation),
      },
      voice: {
        writingStyle: str(vo.writingStyle),
        doList: str(vo.doList),
        dontList: str(vo.dontList),
        tone: str(vo.tone),
        complexity: str(vo.complexity),
        formality: str(vo.formality),
        energy: str(vo.energy),
      },
      visual: {
        colorPrimary: str(vi.colorPrimary) || emptyBrandProfileExtended.visual.colorPrimary,
        colorAccent: str(vi.colorAccent) || emptyBrandProfileExtended.visual.colorAccent,
        colorBackground:
          str(vi.colorBackground) || emptyBrandProfileExtended.visual.colorBackground,
        typographyHeading: str(vi.typographyHeading),
        typographyBody: str(vi.typographyBody),
        mood: str(vi.mood),
      },
      updatedAt: str(p.updatedAt) || undefined,
    };
  } catch {
    return null;
  }
}

export function writeBrandProfileExtended(p: BrandProfileExtended): BrandProfileExtended {
  const next: BrandProfileExtended = { ...p, updatedAt: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(BRAND_PROFILE_EXTENDED_STORAGE_KEY, JSON.stringify(next));
    } catch { /* quota — swallow */ }
  }

  // ─── Mirror into v1 BrandProfile (backwards compat) ────────────────────────
  // Dashboard, Core bootstrap, and ContentOS read the v1 shape. Keep them in sync.
  const v1 = {
    brandName: next.brandName.trim(),
    voiceTone: next.voice.tone.trim(),
    voiceComplexity: next.voice.complexity.trim(),
    voiceFormality: next.voice.formality.trim(),
    voiceEnergy: next.voice.energy.trim(),
  };
  writeBrandProfile({ ...v1, voiceLabel: createVoiceLabel(v1) });

  return next;
}

// ─── Phase completion (drives the progress rail) ─────────────────────────────

export type PhaseId = 'identity' | 'audience' | 'voice' | 'visual' | 'output';

export function isPhaseComplete(p: BrandProfileExtended, phase: PhaseId): boolean {
  switch (phase) {
    case 'identity':
      return Boolean(
        p.brandName.trim() &&
        p.identity.mission.trim() &&
        p.identity.vision.trim() &&
        p.identity.positioning.trim(),
      );
    case 'audience':
      return Boolean(
        p.audience.audience.trim() &&
        p.audience.painPoints.trim() &&
        p.audience.desiredOutcome.trim() &&
        p.audience.transformation.trim(),
      );
    case 'voice':
      return Boolean(
        p.voice.tone.trim() &&
        p.voice.complexity.trim() &&
        p.voice.formality.trim() &&
        p.voice.energy.trim() &&
        p.voice.writingStyle.trim(),
      );
    case 'visual':
      return Boolean(
        p.visual.colorPrimary.trim() &&
        p.visual.typographyHeading.trim() &&
        p.visual.typographyBody.trim() &&
        p.visual.mood.trim(),
      );
    case 'output':
      return (
        isPhaseComplete(p, 'identity') &&
        isPhaseComplete(p, 'audience') &&
        isPhaseComplete(p, 'voice') &&
        isPhaseComplete(p, 'visual')
      );
  }
}

export function completionPercent(p: BrandProfileExtended): number {
  const phases: PhaseId[] = ['identity', 'audience', 'voice', 'visual'];
  const done = phases.filter((ph) => isPhaseComplete(p, ph)).length;
  return Math.round((done / phases.length) * 100);
}

// ─── AI-Ready Brand Profile (export shape) ──────────────────────────────────
// What downstream modules receive when BrandOS hands off.

export function buildAIReadyBrandProfile(p: BrandProfileExtended) {
  return {
    schema: 'creatoros.brandprofile.v1',
    brand: {
      name: p.brandName.trim(),
      mission: p.identity.mission.trim(),
      vision: p.identity.vision.trim(),
      positioning: p.identity.positioning.trim(),
    },
    audience: {
      description: p.audience.audience.trim(),
      painPoints: p.audience.painPoints.trim(),
      desiredOutcome: p.audience.desiredOutcome.trim(),
      transformation: p.audience.transformation.trim(),
    },
    voice: {
      tone: p.voice.tone.trim(),
      complexity: p.voice.complexity.trim(),
      formality: p.voice.formality.trim(),
      energy: p.voice.energy.trim(),
      writingStyle: p.voice.writingStyle.trim(),
      do: p.voice.doList.split('\n').map((s) => s.trim()).filter(Boolean),
      dont: p.voice.dontList.split('\n').map((s) => s.trim()).filter(Boolean),
    },
    visual: {
      colors: {
        primary: p.visual.colorPrimary,
        accent: p.visual.colorAccent,
        background: p.visual.colorBackground,
      },
      typography: {
        heading: p.visual.typographyHeading.trim(),
        body: p.visual.typographyBody.trim(),
      },
      mood: p.visual.mood.trim(),
    },
    meta: {
      generatedAt: new Date().toISOString(),
      sourceUpdatedAt: p.updatedAt ?? null,
    },
  };
}
