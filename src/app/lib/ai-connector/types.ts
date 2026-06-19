export type GenerateContentParams = {
  offer: string;
  audience: string;
  platform: string;
  goal: string;
  tone: string;
  outputType: string;
  /** Optional Brand Profile snapshot injected into the AI prompt. */
  brandProfile?: {
    tone: string;
    complexity: string;
    formality: string;
    energy: string;
    voiceLabel?: string;
  };
};

export type GenerateContentResult = {
  hooks: string[];
  scripts: string[];
  captions: string[];
  /** Brand name carried from the server-side brand profile, if available. */
  brandName: string | null;
};

export type GenerationHistoryEntry = {
  id: string;
  timestamp: string;
  inputs: GenerateContentParams;
  itemCount: number;
  success: boolean;
};
