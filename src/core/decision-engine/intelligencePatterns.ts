import type { ObservationOutcome, ObservationRecord } from './outcomes';
import type { PlatformRecommendation } from './types';

export interface ObservationPattern {
  sourceRecommendationId: string;
  observationIds: string[];
  totalObservations: number;
  outcomeCounts: Record<ObservationOutcome, number>;
  dominantOutcome: ObservationOutcome;
  confidence: PlatformRecommendation['confidence'];
  consistency: 'mixed' | 'directional' | 'consistent';
  latestObservedAt: string;
  summary: string;
}

const outcomes: ObservationOutcome[] = ['positive', 'neutral', 'negative', 'inconclusive'];

function emptyCounts(): Record<ObservationOutcome, number> {
  return { positive: 0, neutral: 0, negative: 0, inconclusive: 0 };
}

function getDominantOutcome(counts: Record<ObservationOutcome, number>): ObservationOutcome {
  return outcomes.reduce((best, outcome) => counts[outcome] > counts[best] ? outcome : best, 'inconclusive');
}

function getConsistency(total: number, dominantCount: number): ObservationPattern['consistency'] {
  const share = total === 0 ? 0 : dominantCount / total;
  if (total >= 3 && share >= 0.75) return 'consistent';
  if (share >= 0.5) return 'directional';
  return 'mixed';
}

function getConfidence(total: number, consistency: ObservationPattern['consistency']): PlatformRecommendation['confidence'] {
  if (total >= 3 && consistency === 'consistent') return 'high';
  if (total >= 2 && consistency !== 'mixed') return 'medium';
  return 'low';
}

export function aggregateObservationPattern(
  sourceRecommendationId: string,
  observations: ObservationRecord[],
): ObservationPattern {
  const matching = observations
    .filter((item) => item.recommendationId === sourceRecommendationId)
    .sort((a, b) => a.observedAt < b.observedAt ? 1 : -1);

  if (matching.length === 0) {
    throw new Error('At least one matching observation is required.');
  }

  const outcomeCounts = matching.reduce((counts, item) => {
    counts[item.outcome] += 1;
    return counts;
  }, emptyCounts());

  const dominantOutcome = getDominantOutcome(outcomeCounts);
  const consistency = getConsistency(matching.length, outcomeCounts[dominantOutcome]);
  const confidence = getConfidence(matching.length, consistency);

  return {
    sourceRecommendationId,
    observationIds: matching.map((item) => item.id),
    totalObservations: matching.length,
    outcomeCounts,
    dominantOutcome,
    confidence,
    consistency,
    latestObservedAt: matching[0].observedAt,
    summary: `${matching.length} observation${matching.length === 1 ? '' : 's'} show a ${consistency} ${dominantOutcome} pattern.`,
  };
}

export function hasOpenLearningRecommendation(
  sourceRecommendationId: string,
  recommendations: PlatformRecommendation[],
): boolean {
  return recommendations.some((recommendation) => {
    if (recommendation.origin !== 'intelligenceos') return false;
    if (['rejected', 'observed'].includes(recommendation.status)) return false;

    return recommendation.changes.some((change) => {
      if (change.path !== 'learningFollowUp' || !change.recommendedValue || typeof change.recommendedValue !== 'object') {
        return false;
      }
      return (change.recommendedValue as Record<string, unknown>).sourceRecommendationId === sourceRecommendationId;
    });
  });
}
