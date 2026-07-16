// ─── BrandOS Extended Profile (Sprint 16) ────────────────────────────────────
// Sibling shape to the v1 BrandProfile. v1 stays the canonical contract for
// the Dashboard, Core, and ContentOS — this extended shape adds Identity,
// Audience and Visual phases on top, persisted under its own storage key.
// Writes are mirrored into v1 (brandName + voice*) for backwards compat.

export type BrandIdentity = {
  mission: string;
  vision: string;
  positioning: string;
};

export type BrandAudience = {
  audience: string;
  painPoints: string;
  desiredOutcome: string;
  transformation: string;
};

export type BrandVoiceExtended = {
  writingStyle: string;
  doList: string;     // newline-separated list (do)
  dontList: string;   // newline-separated list (don't)
  tone: string;
  complexity: string;
  formality: string;
  energy: string;
};

export type BrandVisual = {
  colorPrimary: string;
  colorAccent: string;
  colorBackground: string;
  typographyHeading: string;
  typographyBody: string;
  mood: string;
};

export type BrandProfileExtended = {
  brandName: string;
  identity: BrandIdentity;
  audience: BrandAudience;
  voice: BrandVoiceExtended;
  visual: BrandVisual;
  updatedAt?: string;
};

export const emptyBrandProfileExtended: BrandProfileExtended = {
  brandName: '',
  identity: { mission: '', vision: '', positioning: '' },
  audience: { audience: '', painPoints: '', desiredOutcome: '', transformation: '' },
  voice: {
    writingStyle: '',
    doList: '',
    dontList: '',
    tone: '',
    complexity: '',
    formality: '',
    energy: '',
  },
  visual: {
    colorPrimary: '#E7C6F3',
    colorAccent: '#FFBFDE',
    colorBackground: '#0E0F14',
    typographyHeading: '',
    typographyBody: '',
    mood: '',
  },
};
