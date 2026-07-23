export type BrandProfile = {
  brandName: string;
  voiceTone: string;
  voiceComplexity: string;
  voiceFormality: string;
  voiceEnergy: string;
  voiceLabel?: string;
  updatedAt?: string;

  /**
   * Canonical governance metadata. Optional for backward compatibility with
   * legacy Brand Profile v1 records.
   */
  canonicalRevision?: number;
  canonicalSourceRecommendationId?: string;
  canonicalApprovedAt?: string;
  canonicalApprovedBy?: string;
};
