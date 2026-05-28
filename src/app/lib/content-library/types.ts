export type BrandVoiceSnapshot = {
  tone: string;
  complexity: string;
  formality: string;
  energy: string;
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
};
