import type { CreatorRecommendationSnapshot } from './recommendationSnapshot';

export type BrandVoiceSnapshot = {
  voiceTone: string;
  voiceComplexity: string;
  voiceFormality: string;
  voiceEnergy: string;
  voiceLabel: string;
  updatedAt: string;
  capturedAt: string;
};

export type SavedContentAsset = {
  id: string;
  type: string;
  title: string;
  preview: string;
  platform: string;
  campaign: string;
  brandVoice: string;
  date: string;
  variants: number;
  status: string;
  source: 'generated';
  createdAt: string;
  items: string[];
  inputs: {
    offer: string;
    audience: string;
    goal: string;
    tone: string;
    outputType: string;
  };
  brandVoiceSnapshot: BrandVoiceSnapshot | null;
  creatorRecommendationSnapshot?: CreatorRecommendationSnapshot;
};
