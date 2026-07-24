import { useMemo, useState } from 'react';
import {
  closeFocusScoringFollowupResolution,
  getOpenFocusScoringFollowupResolution,
  listFocusScoringFollowupResolutionRecords,
  listRecommendations,
  startFocusScoringFollowupResolution,
} from '../../core/decision-engine';
import type { FocusScoringReviewFollowupValue, PlatformRecommendation } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

function followupValue(recommendation: PlatformRecommendation): FocusScoringReviewFollowupValue | null {
  const change = recommendation.changes.find((item) => item.path === 'focusScoringReviewFollowup');
  return (change?.recommendedValue as FocusScoringReviewFollowupValue | undefined) || null;
}

export function DecisionOSScoringFollowupResolutionsPage() {
  const [version, setVersion] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const [executionPlan, setExecutionPlan] = useState('Execute the approved next step in its governed workspace and preserve evidence of the result.');
  const [resolutionNote, setResolutionNote] = useState('The governed next step was completed and its result was reviewed.');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(
    () => listRecommendations().filter((item) => item.status === 'approved' && followupValue(item)),
    [version],
  );
  const selected = recommendations.find((item) => item.id === selectedId) || recommendations[0] || null;
  const value = selected ? followupValue(selected) : null;
  const openRecord = selected ? getOpenFocusScoringFollowupResolution(selected.id) : null;
  const records = useMemo(() => listFocusScoringFollowupResolutionRecords(), [version]);

  const start = () => {
    if (!selected) return;
    try {
      startFocusScoringFollowupResolution({ recommendation: selected, executionPlan, startedBy: 'Current User' });
      setMessage('Resolution started. No canonical scoring state changed.');
      setVersion((current) => current + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Resolution could not be started.');
    }
  };

  const close = (outcome: 'completed' | 'cancelled') => {
    if (!openRecord) return;
    try {
      closeFocusScoringFollowupResolution({ recordId: openRecord.id, outcome, resolutionNote, completedBy: 'Current User' });
      setMessage(outcome === 'completed'
        ? 'Resolution completed. This record does not itself mark the recommendation implemented or change canonical scoring.'
        : 'Resolution cancelled with an explicit record.');
      setVersion((current) => current + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Resolution could not be closed.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Follow-up Resolution</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Track approved governance follow-ups through execution</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 860, lineHeight: 1.65 }}>An approval authorizes a next step, not a hidden scoring mutation. This workspace records execution intent and closure while actual monitoring, maintain or rollback actions remain in their governed workspaces.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/reviews" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Governance reviews</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.id || ''} onChange={(event) => setSelectedId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {recommendations.map((item) => <option key={item.id} value={item.id}>{item.title} · approved</option>)}
          </select>
          {recommendations.length === 0 && <div style={{ color: '#858999' }}>No approved scoring-review follow-up recommendations are available.</div>}
        </section>

        {selected && value && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Approved follow-up</div>
          <h2 style={{ margin: '8px 0' }}>{selected.title}</h2>
          <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.6 }}>{selected.recommendedAction}</div>
          <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Action: {value.proposedAction.replaceAll('_', ' ')} · revision {value.revisionId}</div>

          {!openRecord ? <>
            <textarea value={executionPlan} onChange={(event) => setExecutionPlan(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 78, marginTop: 14, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={start} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Start governed resolution</button>
          </> : <>
            <div style={{ marginTop: 14, padding: 13, borderRadius: 12, background: 'rgba(218,191,255,0.06)', color: '#C9C3D5', fontSize: 12, lineHeight: 1.6 }}>In progress since {new Date(openRecord.startedAt).toLocaleString()} by {openRecord.startedBy}.<br />Plan: {openRecord.executionPlan}</div>
            <a href={openRecord.targetHref} style={{ display: 'inline-block', marginTop: 10, color: '#E5D2FF', textDecoration: 'none' }}>Open governed action workspace →</a>
            <textarea value={resolutionNote} onChange={(event) => setResolutionNote(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 78, marginTop: 14, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button type="button" onClick={() => close('completed')} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Complete resolution</button>
              <button type="button" onClick={() => close('cancelled')} style={{ borderRadius: 10, border: '1px solid rgba(255,143,163,0.22)', background: 'rgba(255,143,163,0.06)', color: '#FF9CAF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Cancel with record</button>
            </div>
          </>}
        </section>}

        <section style={{ ...panelStyle, padding: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Resolution history</div>
          <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
            {records.map((record) => <div key={record.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{record.status.replaceAll('_', ' ')}</strong> · {record.proposedAction.replaceAll('_', ' ')} · started {new Date(record.startedAt).toLocaleDateString()} by {record.startedBy}{record.completedAt ? ` · closed ${new Date(record.completedAt).toLocaleDateString()} by ${record.completedBy}` : ''}</div>)}
            {records.length === 0 && <div style={{ color: '#858999' }}>No follow-up resolution records yet.</div>}
          </div>
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Resolution records are browser-local coordination metadata. Completing a resolution does not automatically mark a recommendation implemented, maintain a score, create monitoring evidence or execute rollback.</section>
      </div>
    </main>
  );
}
