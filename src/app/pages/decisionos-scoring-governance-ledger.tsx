import { useMemo, useState } from 'react';
import { deriveFocusScoringGovernanceLedger } from '../../core/decision-engine';
import type { FocusScoringGovernanceHealth } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

const healthLabel: Record<FocusScoringGovernanceHealth, string> = {
  active_unmonitored: 'Active · monitoring pending',
  monitoring_inconclusive: 'Active · evidence inconclusive',
  maintain_recommended: 'Active · maintain recommended',
  rollback_review_recommended: 'Active · rollback review recommended',
  rolled_back: 'Rolled back',
  superseded: 'Superseded',
};

export function DecisionOSScoringGovernanceLedgerPage() {
  const entries = useMemo(() => deriveFocusScoringGovernanceLedger(), []);
  const [filter, setFilter] = useState<'all' | 'active' | 'attention' | 'closed'>('all');
  const visible = entries.filter((entry) => {
    if (filter === 'active') return entry.isCurrentValue;
    if (filter === 'attention') return ['active_unmonitored', 'monitoring_inconclusive', 'rollback_review_recommended'].includes(entry.health);
    if (filter === 'closed') return ['rolled_back', 'superseded'].includes(entry.health);
    return true;
  });

  const active = entries.filter((entry) => entry.isCurrentValue).length;
  const attention = entries.filter((entry) => ['active_unmonitored', 'monitoring_inconclusive', 'rollback_review_recommended'].includes(entry.health)).length;
  const rolledBack = entries.filter((entry) => entry.health === 'rolled_back').length;

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Scoring Governance Ledger</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Trace every canonical scoring change from evidence to current state</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 850, lineHeight: 1.65 }}>This ledger joins experiment lineage, human observations, reviewed recommendations, canonical revisions, post-apply monitoring and rollback history. It is an overview, not a new approval or apply mechanism.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/apply" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>Controlled Apply →</a>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          {[
            ['Applied revisions', entries.length],
            ['Currently active', active],
            ['Needs attention', attention],
            ['Rolled back', rolledBack],
          ].map(([label, value]) => (
            <div key={label as string} style={{ ...panelStyle, padding: 16 }}>
              <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{label as string}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 7 }}>{value as number}</div>
            </div>
          ))}
        </section>

        <section style={{ ...panelStyle, padding: 14, marginBottom: 18, display: 'flex', gap: 8 }}>
          {(['all', 'active', 'attention', 'closed'] as const).map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} style={{ borderRadius: 999, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.09)', background: filter === item ? 'rgba(218,191,255,0.13)' : 'transparent', color: filter === item ? '#E5D2FF' : '#9296A8', cursor: 'pointer', textTransform: 'capitalize' }}>{item}</button>
          ))}
        </section>

        <section style={{ display: 'grid', gap: 14 }}>
          {visible.length === 0 ? (
            <div style={{ ...panelStyle, padding: 22, color: '#858999' }}>No scoring governance records match this view.</div>
          ) : visible.map((entry) => (
            <article key={entry.revision.id} style={{ ...panelStyle, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 18 }}>
                <div>
                  <div style={{ color: entry.health === 'rollback_review_recommended' ? '#FF9BAE' : entry.isCurrentValue ? '#83F3B7' : '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{healthLabel[entry.health]}</div>
                  <h2 style={{ margin: '7px 0 5px', fontSize: 21 }}>{entry.revision.signalType.replaceAll('_', ' ')}</h2>
                  <div style={{ color: '#A7AAB8', fontSize: 12 }}>Revision {entry.revision.revision} · {entry.revision.previousAdjustment > 0 ? '+' : ''}{entry.revision.previousAdjustment} → {entry.revision.appliedAdjustment > 0 ? '+' : ''}{entry.revision.appliedAdjustment} points</div>
                  <div style={{ color: '#777B8D', fontSize: 10.5, marginTop: 6 }}>Current signal value: {entry.currentSignalAdjustment > 0 ? '+' : ''}{entry.currentSignalAdjustment} · applied by {entry.revision.actor} · {new Date(entry.revision.createdAt).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#9296A8', fontSize: 11 }}>
                  <div>{entry.experiment ? `Experiment ${entry.experiment.status}` : 'No experiment link'}</div>
                  <div style={{ marginTop: 5 }}>{entry.sourceOutcomeRecommendation ? `Recommendation ${entry.sourceOutcomeRecommendation.status}` : 'No source recommendation'}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginTop: 18 }}>
                {entry.timeline.map((step) => (
                  <div key={step.stage} style={{ borderRadius: 11, border: `1px solid ${step.status === 'warning' ? 'rgba(255,155,174,0.2)' : step.status === 'complete' ? 'rgba(131,243,183,0.16)' : 'rgba(255,255,255,0.07)'}`, padding: 10, minHeight: 82 }}>
                    <div style={{ color: step.status === 'warning' ? '#FF9BAE' : step.status === 'complete' ? '#A8F7CA' : '#858999', fontSize: 9, fontWeight: 800, textTransform: 'uppercase' }}>{step.stage}</div>
                    <div style={{ fontSize: 10.5, color: '#B9BBC7', marginTop: 6, lineHeight: 1.4 }}>{step.label}</div>
                    {step.at && <div style={{ color: '#686C7C', fontSize: 9, marginTop: 5 }}>{new Date(step.at).toLocaleDateString()}</div>}
                  </div>
                ))}
              </div>

              {entry.monitoringObservation && (
                <div style={{ marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 13, display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12, color: '#9296A8', fontSize: 11 }}>
                  <div>Completion: {entry.monitoringObservation.beforeCompletionRate}% → {entry.monitoringObservation.afterCompletionRate}%</div>
                  <div>Adoption: {entry.monitoringObservation.beforeAdoptionRate}% → {entry.monitoringObservation.afterAdoptionRate}%</div>
                  <div>{entry.monitoringObservation.interpretation}</div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12, marginTop: 14, fontSize: 11 }}>
                <a href="/platform/decisionos/focus/scoring/monitor" style={{ color: '#DABFFF', textDecoration: 'none' }}>Monitoring workspace</a>
                <a href="/platform/decisions/review" style={{ color: '#DABFFF', textDecoration: 'none' }}>Review queue</a>
                <a href="/platform/decisionos/focus/scoring/apply" style={{ color: '#DABFFF', textDecoration: 'none' }}>Apply & rollback</a>
              </div>
            </article>
          ))}
        </section>

        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>The ledger is derived from browser-local records and does not create new governance authority. Missing lineage is shown explicitly instead of inferred. Server audit, authenticated actors, shared team state and atomic revision locking remain deferred.</section>
      </div>
    </main>
  );
}
