import type { RegistryEntry } from '../registry';
import type { BrandProfile } from '../brand';
import type { SavedContentAsset, BrandVoiceSnapshot } from '../../app/lib/content-library/types';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function registryEntryToLibraryAsset(
  entry: RegistryEntry,
  brandProfile?: BrandProfile,
): SavedContentAsset {
  const { asset } = entry;

  const brandVoiceSnapshot: BrandVoiceSnapshot | null = brandProfile
    ? {
        voiceTone:       brandProfile.voice,
        voiceComplexity: '',
        voiceFormality:  '',
        voiceEnergy:     '',
        voiceLabel:      brandProfile.voice,
        updatedAt:       entry.registeredAt,
        capturedAt:      entry.registeredAt,
      }
    : null;

  return {
    id:         entry.artifactHash,          // artifact_hash = content-stable id
    type:       asset.format,
    title:      asset.title,
    preview:    asset.hook,
    platform:   asset.channel,
    campaign:   asset.intent,
    brandVoice: brandProfile?.voice ?? '',
    date:       formatDate(asset.createdAt),
    variants:   1,
    status:     'draft',
    source:     'generated',
    createdAt:  asset.createdAt,
    items:      [asset.hook, asset.bodySkeleton, asset.cta],
    inputs: {
      offer:      asset.title,
      audience:   brandProfile?.audience ?? '',
      goal:       asset.intent,
      tone:       brandProfile?.voice ?? '',
      outputType: asset.format,
    },
    brandVoiceSnapshot,
  };
}
