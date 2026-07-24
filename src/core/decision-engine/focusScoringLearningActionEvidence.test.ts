import { describe, expect, it } from 'vitest';
import { previewFocusScoringLearningActionVerification } from './focusScoringLearningActionEvidence';
import type { FocusScoringLearningActionPlanRecord } from './focusScoringLearningActionPlan';
import type { FocusScoringLearningActionEvidenceRecord } from './focusScoringLearningActionEvidence';

const plan = {
  id: 'plan-1',
  recommendationId: 'recommendation-1',
  sourceRecommendationId: 'source-1',
  observationId: 'observation-1',
  proposedAction: 'measure_again',
  targetHref: '/platform/decisionos/focus/scoring/monitor',
  objective: 'Measure again.',
  evidenceCriteria: 'A monitoring record exists.',
  owner: 'Owner',
  targetDate: '2026-07-30',
  status: 'completed',
  createdBy: 'Creator',
  createdAt: '2026-07-24T10:00:00.000Z',
  closedBy: 'Closer',
  closedAt: '2026-07-25T10:00:00.000Z',
  closureNote: 'Completed.',
} satisfies FocusScoringLearningActionPlanRecord;

const evidence = [{
  id: 'evidence-1',
  actionPlanId: plan.id,
  type: 'monitoring_record',
  reference: 'monitoring-1',
  summary: 'Monitoring record created.',
  recordedBy: 'Recorder',
  recordedAt: '2026-07-25T09:00:00.000Z',
}] satisfies FocusScoringLearningActionEvidenceRecord[];

describe('previewFocusScoringLearningActionVerification', () => {
  it('allows a completed plan with available selected evidence', () => {
    expect(previewFocusScoringLearningActionVerification({ actionPlan: plan, evidence, evidenceIds: ['evidence-1'] }).canVerify).toBe(true);
  });

  it('blocks verification without evidence', () => {
    const preview = previewFocusScoringLearningActionVerification({ actionPlan: plan, evidence, evidenceIds: [] });
    expect(preview.canVerify).toBe(false);
    expect(preview.blockingReason).toContain('At least one evidence record');
  });

  it('blocks verification before completion', () => {
    const preview = previewFocusScoringLearningActionVerification({
      actionPlan: { ...plan, status: 'in_progress' },
      evidence,
      evidenceIds: ['evidence-1'],
    });
    expect(preview.canVerify).toBe(false);
    expect(preview.blockingReason).toContain('completed action plan');
  });

  it('blocks unavailable or cross-plan evidence ids', () => {
    const preview = previewFocusScoringLearningActionVerification({ actionPlan: plan, evidence, evidenceIds: ['evidence-1', 'missing'] });
    expect(preview.canVerify).toBe(false);
    expect(preview.blockingReason).toContain('unavailable');
  });
});
