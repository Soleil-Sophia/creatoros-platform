import type { BrandProfile } from '../../app/lib/brand-profile/types';
import type {
  BrandPlaybook,
  BusinessGoal,
  CreatorChannel,
  CreatorFormat,
  CreatorRequestContext,
  FunnelStage,
} from './types';

export interface LegacyCreatorInputs {
  offer: string;
  audience: string;
  goal: string;
  tone: string;
  platform: string;
  outputType: string;
}

const CHANNEL_MAP: Record<string, CreatorChannel> = {
  instagram: 'instagram',
  tiktok: 'tiktok',
  linkedin: 'linkedin',
  youtube: 'youtube',
  x: 'x',
  twitter: 'x',
};

const FORMAT_MAP: Record<string, CreatorFormat> = {
  'hook-pack': 'short_form',
  'short-script': 'short_form',
  'caption-draft': 'text_post',
  'content-brief': 'long_form',
  'repurposing-plan': 'carousel',
};

function inferGoal(goal: string): BusinessGoal {
  const normalized = goal.trim().toLowerCase();
  if (normalized.includes('sale') || normalized.includes('revenue')) return 'sales';
  if (normalized.includes('reach') || normalized.includes('awareness')) return 'reach';
  if (normalized.includes('community') || normalized.includes('engagement')) return 'community';
  if (normalized.includes('authority') || normalized.includes('trust')) return 'authority';
  return 'lead_generation';
}

function inferFunnelStage(goal: BusinessGoal): FunnelStage {
  if (goal === 'reach') return 'awareness';
  if (goal === 'authority' || goal === 'community') return 'consideration';
  return 'conversion';
}

function compact(values: string[]): string[] {
  return values.map((value) => value.trim()).filter(Boolean);
}

export function adaptBrandProfileToPlaybook(
  profile: BrandProfile | null,
  inputs: LegacyCreatorInputs,
): BrandPlaybook {
  const brandName = profile?.brandName?.trim() || 'Untitled Brand';
  const audience = inputs.audience.trim() || 'the primary target audience';
  const offer = inputs.offer.trim() || 'the primary offer';
  const tone = compact([
    profile?.voiceTone ?? '',
    profile?.voiceComplexity ?? '',
    profile?.voiceFormality ?? '',
    profile?.voiceEnergy ?? '',
    inputs.tone,
  ]);

  return {
    schemaVersion: 'brand-playbook-v1',
    governance: 'canonical',
    revision: 1,
    updatedAt: profile?.updatedAt,
    brandName,
    brandDescription: `${brandName} communicates through a governed CreatorOS Brand Playbook.`,
    positioning: `${offer} for ${audience}`,
    primaryOffer: offer,
    primaryAudience: audience,
    audienceProblem: inputs.goal.trim() || `${audience} need a clearer next content action.`,
    brandValues: ['Clarity', 'Relevance', 'Responsible growth'],
    toneOfVoice: tone.length > 0 ? tone : ['clear', 'direct', 'helpful'],
    allowedClaims: [`${offer} supports ${audience}`],
    prohibitedClaims: ['guaranteed results', 'instant success', 'overnight growth'],
    contentPillars: [offer],
    preferredCTAs: ['Learn more'],
  };
}

export function adaptLegacyInputsToRequestContext(
  inputs: LegacyCreatorInputs,
): CreatorRequestContext {
  const businessGoal = inferGoal(inputs.goal);
  const normalizedPlatform = inputs.platform.trim().toLowerCase();

  return {
    businessGoal,
    channel: CHANNEL_MAP[normalizedPlatform] ?? 'linkedin',
    formatPreference: FORMAT_MAP[inputs.outputType] ?? 'short_form',
    funnelStage: inferFunnelStage(businessGoal),
  };
}
