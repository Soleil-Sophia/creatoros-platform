import { useMemo, useState } from 'react';
import {
  completeFocusScoringReview,
  getFocusScoringReviewCadenceStatus,
  getOpenFocusScoringReviewCadence,
  listFocusScoringReviewCadenceRecords,
  listFocusScoringRevisionRecords,
  scheduleFocusScoringReview,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSScoringGovernanceReviewCadencePage() {
  const revisions = useMemo(() => listFocusScoringRevisionRecords().filter((item) => item.action === 'apply'), []);
  const [revisionId, setRevisionId] = useState(revisions[0]?.id || '');
  const [owner, setOwner] = useState('Current User');
  const [dueAt, setDueAt] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [purpose, setPurpose] = useState('Review post-apply monitoring evidence and decide whether to maintain, revise or roll back the active scoring adjustment.');
  const [completionNote, setCompletionNote] = useState('Evidence and current canonical state reviewed.');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');

  const selected = revisions.find((item) => item.id === revisionId) || null;
  const records = useMemo(() => listFocusScoringReviewCadenceRecords(), [version]);
  const openRecord = selected ? getOpenFocusScoringReviewCadence(selected.id) : null;

  const schedule = () => {
    if (!selected) return;
    try {
      scheduleFocusScoringReview({ revision: selected, owner, reviewDueAt: dueAt, reviewPurpose: purpose, createdBy: 'Current User' });
      setMessage('Governance review scheduled. No scoring state was changed.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Review could not be scheduled.');
    }
  };

  const complete = () => {
    if (!openRecord) return;
    try {
      completeFocusScoringReview(openRecord.id, 'Current User', completionNote);
      setMessage('Governance review completed. This did not maintain or roll back the scoring revision automatically.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Review could not be completed.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Governance Cadence</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Give every active scoring change a review date</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 850, lineHeight: 1.65 }}>Assign ownership and a due date for evidence review. Completing a review records that the checkpoint happened; it does not itself maintain, revise or roll back canonical scoring.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/ledger" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Governance ledger</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={revisionId} onChange={(event) => setRevisionId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {revisions.map((item) => <option key={item.id} value={item.id}>Revision {item.revision} · {item.signalType.replaceAll('_', ' ')} · {item.previousAdjustment} → {item.appliedAdjustment}</option>)}
          </select>
          {selected && <div style={{ color: '#858999', fontSize: 11, marginTop: 9 }}>Applied {new Date(selected.createdAt).toLocaleString()} by {selected.actor}</div>}
        </section>

        {selected && !openRecord && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Schedule review</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            <input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Review owner" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <input type="date" value={dueAt} onChange={(event) => setDueAt(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <textarea value={purpose} onChange={(event) => setPurpose(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 76, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={schedule} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Schedule governance review</button>
          </div>
        </section>}

        {openRecord && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: getFocusScoringReviewCadenceStatus(openRecord) === 'overdue' ? '#FF8FA3' : '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{getFocusScoringReviewCadenceStatus(openRecord).replaceAll('_', ' ')}</div>
          <h2 style={{ margin: '8px 0' }}>Review owned by {openRecord.owner}</h2>
          <div style={{ color: '#A7AAB8', fontSize: 12 }}>Due {new Date(openRecord.reviewDueAt).toLocaleDateString()} · {openRecord.reviewPurpose}</div>
          <textarea value={completionNote} onChange={(event) => setCompletionNote(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 72, marginTop: 14, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
          <button type="button" onClick={complete} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Complete review checkpoint</button>
        </section>}

        <section style={{ ...panelStyle, padding: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Review history</div>
          <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
            {records.map((record) => <div key={record.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{getFocusScoringReviewCadenceStatus(record).replaceAll('_', ' ')}</strong> · due {new Date(record.reviewDueAt).toLocaleDateString()} · owner {record.owner}{record.completedAt ? ` · completed ${new Date(record.completedAt).toLocaleDateString()} by ${record.completedBy}` : ''}</div>)}
            {records.length === 0 && <div style={{ color: '#858999' }}>No governance review cadence records yet.</div>}
          </div>
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Review cadence records are browser-local coordination metadata. Completing a checkpoint does not resolve monitoring evidence, approve a recommendation, maintain a change permanently or execute rollback.</section>
      </div>
    </main>
  );
}
