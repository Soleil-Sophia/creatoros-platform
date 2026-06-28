import type { BrandProfile } from '../brand';
import type { InstagramFormat, InstagramIntent } from '../instagram';

export interface ContentRequest {
  brandProfile: BrandProfile;
  topic: string;
  intent: InstagramIntent;
  format: InstagramFormat;
}
