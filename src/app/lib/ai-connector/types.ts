import type { BrandProfile } from '../brand-profile/types';

export type GenerateContentParams = {
  offer: string;
  audience: string;
  platform: string;
  goal: string;
  tone: string;
  outputType: string;
  brandProfile?: BrandProfile;
};

export type GenerateContentResult = {
  hooks: string[];
  scripts: string[];
  captions: string[];
  brandName: string | null;
};
