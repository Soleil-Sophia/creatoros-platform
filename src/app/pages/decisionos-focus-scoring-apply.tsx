import { useMemo, useState } from 'react';
import {
  applyFocusScoringCanonicalRecommendation,
  getCanonicalFocusScoringConfig,
  listFocusScoringRevisionRecords,
  listRecommendations,
  previewFocusScoringCanonicalApply,
  rollbackFocusScoringRevision,
} from '../../core/decision-engine';
import type { FocusScoringApplyPreview, PlatformRecommendation } from '../../core/decision-engine';

const panel = { borderRadius: 18, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', padding: 20 } as const;

function isApprovedApply(item: PlatformRecommendation): boolean {
  return item.status === 'approved' && item.changes.some((change) => {
    if (change.path !== 'focusExperimentOutcome') return false;
    const value = change.recommendedValue as { proposedAction?: string; observationOutcome?: string } | undefined;
    return value?.proposedAction === 'consider_controlled_apply' && value.observationOutcome === 'supports_hypothesis';
  });
}

export function DecisionOSFocusScoringApplyPage() {
  const recommendations = useMemo(() => listRecommendations().filter(isApprovedApply), []);
  const [selectedId, setSelectedId] = useState(recommendations[0]?.id || '');
  const [reason, setReason] = useState('Apply the approved, measured adjustment through the controlled canonical revision process.');
  const [rollbackReason, setRollbackReason] = useState('Rollback after explicit human review of the current canonical revision.');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');
  const selected = recommendations.find((item) => item.id === selectedId) || null;
  const config = useMemo(() => getCanonicalFocusScoringConfig(), [version]);
  const revisions = useMemo(() => listFocusScoringRevisionRecords(), [version]);
  let preview: FocusScoringApplyPreview | null = null;
  if (selected) {
    try { preview = previewFocusScoringCanonicalApply(selected); } catch { preview = null; }
  }

  const apply = () => {
    if (!selected) return;
    try {
      const record = applyFocusScoringCanonicalRecommendation(selected, 'Current User', reason);
      setMessage(`Canonical revision ${record.revision} applied. Daily Focus now reads the recorded adjustment.`);
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Apply failed.');
    }
  };

  const rollback = (id: string) => {
    try {
      const record = rollbackFocusScoringRevision(id, 'Current User', rollbackReason);
      setMessage(`Rollback recorded as canonical revision ${record.revision}.`);
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Rollback failed.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>DecisionOS · Controlled Apply</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Preview, apply and roll back canonical focus scoring</h1>
            <p style={{ color: '#9296A8', maxWidth: 820, lineHeight: 1.65, margin: 0 }}>Only approved recommendations backed by a supportive experiment observation may enter this workspace. Every change creates a new append-only revision.</p>
          </div>
          <a href="/platform/intelligence/focus-experiment-outcomes" style={{ color: '#DABFFF', textDecoration: 'none', fontSize: 12 }}>← Outcomes</a>
        </header>

        <section style={{ ...panel, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Current canonical config</div>
          <div style={{ marginTop: 10, color: '#B9BBC7' }}>Revision {config.revision}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {Object.keys(config.signalAdjustments).length === 0 ? <span style={{ color: '#858999' }}>No canonical signal adjustments.</span> : Object.entries(config.signalAdjustments).map(([type, value]) => <span key={type} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '6px 9px', fontSize: 11 }}>{type.replaceAll('_', ' ')} {value > 0 ? '+' : ''}{value}</span>)}
          </div>
        </section>

        <section style={{ ...panel, marginBottom: 18 }}>
          <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Apply preview</div>
          {recommendations.length === 0 ? <p style={{ color: '#9296A8' }}>No approved supportive scoring-change recommendation is available.</p> : <>
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} style={{ width: '100%', marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>{recommendations.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select>
            {preview && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginTop: 14 }}>
              {[['Signal', preview.signalType.replaceAll('_', ' ')], ['Current', preview.currentAdjustment], ['Proposed', preview.proposedAdjustment], ['Delta', preview.delta]].map(([label, value]) => <div key={label as string} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 12 }}><div style={{ color: '#858999', fontSize: 10 }}>{label as string}</div><strong style={{ display: 'block', marginTop: 5 }}>{String(value)}</strong></div>)}
              <div style={{ gridColumn: '1 / -1', color: '#A7AAB8', fontSize: 11.5, lineHeight: 1.6 }}>Completion {preview.baselineCompletionRate}% → {preview.treatmentCompletionRate}% · Adoption {preview.baselineAdoptionRate}% → {preview.treatmentAdoptionRate}%<br />Interpretation: {preview.interpretation}<br />Limitations: {preview.limitations}</div>
            </div>}
            <textarea value={reason} onChange={(event) => setReason(event.target.value)} style={{ width: '100%', minHeight: 68, marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={apply} disabled={!preview} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Apply canonical revision</button>
          </>}
        </section>

        <section style={panel}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Revision history</div>
          <textarea value={rollbackReason} onChange={(event) => setRollbackReason(event.target.value)} style={{ width: '100%', minHeight: 58, marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {revisions.length === 0 ? <div style={{ color: '#858999' }}>No scoring revisions recorded.</div> : revisions.map((item) => {
              const isCurrent = (config.signalAdjustments[item.signalType] || 0) === item.appliedAdjustment;
              return <article key={item.id} style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 14, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12 }}><div><div style={{ color: item.action === 'rollback' ? '#FFB8C5' : '#DABFFF', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Revision {item.revision} · {item.action}</div><div style={{ marginTop: 5 }}>{item.signalType.replaceAll('_', ' ')}: {item.previousAdjustment} → {item.appliedAdjustment}</div><div style={{ color: '#858999', fontSize: 10.5, marginTop: 5 }}>{item.reason} · {item.actor}</div></div>{isCurrent && item.action === 'apply' && <button type="button" onClick={() => rollback(item.id)} style={{ alignSelf: 'center', borderRadius: 9, border: '1px solid rgba(255,184,197,0.2)', background: 'rgba(255,184,197,0.05)', color: '#FFB8C5', padding: '8px 11px', cursor: 'pointer' }}>Rollback</button>}</article>;
            })}
          </div>
        </section>
        {message && <div style={{ color: '#B9BBC7', marginTop: 12, fontSize: 11.5 }}>{message}</div>}
        <section style={{ ...panel, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Apply and rollback are browser-local governance records. They do not provide server audit, authenticated identity, multi-user locking or statistical proof. Rollback creates a new revision; it never deletes history.</section>
      </div>
    </main>
  );
}
