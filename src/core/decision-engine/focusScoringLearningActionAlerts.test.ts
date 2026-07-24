import { describe, expect, it } from 'vitest';
import { getFocusScoringLearningActionTiming } from './focusScoringLearningActionAlerts';

describe('getFocusScoringLearningActionTiming', () => {
  const now = new Date('2026-07-24T12:00:00');

  it('treats completed and cancelled plans as closed', () => {
    expect(getFocusScoringLearningActionTiming('2026-07-20', 'completed', now)).toBe('closed');
    expect(getFocusScoringLearningActionTiming('2026-07-20', 'cancelled', now)).toBe('closed');
  });

  it('marks open plans after their target date as overdue', () => {
    expect(getFocusScoringLearningActionTiming('2026-07-23', 'planned', now)).toBe('overdue');
  });

  it('marks today and the next three days as due soon', () => {
    expect(getFocusScoringLearningActionTiming('2026-07-24', 'planned', now)).toBe('due_soon');
    expect(getFocusScoringLearningActionTiming('2026-07-27', 'in_progress', now)).toBe('due_soon');
  });

  it('keeps later open plans on track', () => {
    expect(getFocusScoringLearningActionTiming('2026-07-28', 'planned', now)).toBe('on_track');
  });
});
