import { deriveDecisionDailyFocus } from './dailyFocus';
import type { DecisionDailyFocusItem } from './dailyFocus';
import type { FocusLearningRecommendationValue } from './focusIntelligence';
import type { PlatformRecommendation } from './types';

const FOCUS_EXPERIMENT_KEY = 'creatoros-decision-focus-experiments-v1';

export type FocusExperimentStatus = 'draft' | 'active' | 'completed' | 'cancelled';

export interface FocusScoringExperiment {
  id: string;
  sourceRecommendationId: string;
  title: string;
  hypothesis: string;
  signalType: string;
  scoreAdjustment: number;
  successMetric: string;
  startsOn: string;
  endsOn: string;
  status: FocusExperimentStatus;
  createdBy: string;
  createdAt: string;
  activatedBy?: string;
  activatedAt?: string;
  closedBy?: string;
  closedAt?: string;
  closeNote?: string;
}

export interface ExperimentalFocusItem extends DecisionDailyFocusItem {
  baselineScore: number;
  experimentAdjustment: number;
}

function readAll(): FocusScoringExperiment[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(FOCUS_EXPERIMENT_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: FocusScoringExperiment[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(FOCUS_EXPERIMENT_KEY, JSON.stringify(items));
}

function focusLearningValue(recommendation: PlatformRecommendation): FocusLearningRecommendationValue | null {
  const change = recommendation.changes.find((item) => item.path === 'focusLearningHypothesis');
  return (change?.recommendedValue as FocusLearningRecommendationValue | undefined) || null;
}

export function listFocusScoringExperiments(): FocusScoringExperiment[] {
  return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getActiveFocusScoringExperiment(): FocusScoringExperiment | null {
  return readAll().find((item) => item.status === 'active') ?? null;
}

export function createFocusScoringExperiment(input: {
  sourceRecommendation: PlatformRecommendation;
  scoreAdjustment: number;
  successMetric: string;
  startsOn: string;
  endsOn: string;
  createdBy: string;
}): FocusScoringExperiment {
  if (input.sourceRecommendation.status !== 'approved') {
    throw new Error('A focus experiment requires an approved IntelligenceOS recommendation.');
  }
  const value = focusLearningValue(input.sourceRecommendation);
  if (!value) throw new Error('The source recommendation is not a focus-learning hypothesis.');
  if (!Number.isFinite(input.scoreAdjustment) || input.scoreAdjustment < -20 || input.scoreAdjustment > 20) {
    throw new Error('Score adjustment must be between -20 and 20.');
  }
  if (new Date(input.endsOn).getTime() <= new Date(input.startsOn).getTime()) {
    throw new Error('Experiment end must be after its start.');
  }

  const now = new Date().toISOString();
  const experiment: FocusScoringExperiment = {
    id: crypto.randomUUID(),
    sourceRecommendationId: input.sourceRecommendation.id,
    title: `Focus scoring experiment: ${value.signalType.replaceAll('_', ' ')}`,
    hypothesis: value.hypothesis,
    signalType: value.signalType,
    scoreAdjustment: input.scoreAdjustment,
    successMetric: input.successMetric.trim(),
    startsOn: input.startsOn,
    endsOn: input.endsOn,
    status: 'draft',
    createdBy: input.createdBy,
    createdAt: now,
  };
  writeAll([experiment, ...readAll()]);
  return experiment;
}

export function activateFocusScoringExperiment(id: string, actor: string): FocusScoringExperiment {
  const items = readAll();
  if (items.some((item) => item.status === 'active' && item.id !== id)) {
    throw new Error('Only one focus scoring experiment can be active at a time.');
  }
  const now = new Date().toISOString();
  const current = items.find((item) => item.id === id);
  if (!current || current.status !== 'draft') throw new Error('Only a draft experiment can be activated.');
  const updated = { ...current, status: 'active' as const, activatedBy: actor, activatedAt: now };
  writeAll(items.map((item) => item.id === id ? updated : item));
  return updated;
}

export function closeFocusScoringExperiment(
  id: string,
  status: Extract<FocusExperimentStatus, 'completed' | 'cancelled'>,
  actor: string,
  note?: string,
): FocusScoringExperiment {
  const items = readAll();
  const current = items.find((item) => item.id === id);
  if (!current || !['draft', 'active'].includes(current.status)) throw new Error('This experiment cannot be closed.');
  const updated: FocusScoringExperiment = {
    ...current,
    status,
    closedBy: actor,
    closedAt: new Date().toISOString(),
    closeNote: note?.trim() || undefined,
  };
  writeAll(items.map((item) => item.id === id ? updated : item));
  return updated;
}

export function deriveExperimentalDecisionDailyFocus(
  recommendations: PlatformRecommendation[],
  experiment: FocusScoringExperiment,
  limit = 3,
): ExperimentalFocusItem[] {
  return deriveDecisionDailyFocus(recommendations, Number.MAX_SAFE_INTEGER)
    .map((item) => {
      const adjustment = item.signal.type === experiment.signalType ? experiment.scoreAdjustment : 0;
      return {
        ...item,
        baselineScore: item.score,
        experimentAdjustment: adjustment,
        score: item.score + adjustment,
      };
    })
    .sort((a, b) => b.score - a.score || a.recommendationTitle.localeCompare(b.recommendationTitle))
    .slice(0, Math.max(0, limit))
    .map((item, index) => ({ ...item, rank: index + 1 }));
}
