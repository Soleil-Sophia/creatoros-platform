import type { ContentRecommendation } from '../../../core/creator-intelligence/types';

export type CreatorRecommendationSnapshot = {
  schemaVersion: 'creator-recommendation-snapshot-v1';
  capturedAt: string;
  recommendation: ContentRecommendation;
};

export function createCreatorRecommendationSnapshot(
  recommendation: Readonly<ContentRecommendation>,
  capturedAt: string,
): CreatorRecommendationSnapshot {
  return {
    schemaVersion: 'creator-recommendation-snapshot-v1',
    capturedAt,
    recommendation: structuredCloneRecommendation(recommendation),
  };
}

function structuredCloneRecommendation(
  recommendation: Readonly<ContentRecommendation>,
): ContentRecommendation {
  return JSON.parse(JSON.stringify(recommendation)) as ContentRecommendation;
}
