import { useMemo, useState } from 'react';
import {
  closeFocusScoringFollowupResolution,
  getLatestFocusScoringResolutionVerification,
  getOpenFocusScoringFollowupResolution,
  listFocusScoringFollowupResolutionRecords,
  listFocusScoringResolutionEvidence,
  listRecommendations,
  recordFocusScoringResolutionEvidence,
  startFocusScoringFollowupResolution,
  verifyFocusScoringResolution,
} from '../../core/decision-engine';
import type {
  FocusScoringResolutionEvidenceType,
  FocusScoringResolutionVerificationOutcome,
  FocusScoringReviewFollowupValue,
  PlatformRecommendation,
} from '../../core/decision-engine';

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
  const [resolutionId, setResolutionId] = useState('');
  const [executionPlan, setExecutionPlan] = useState('Execute the approved next step in its governed workspace and preserve evidence of the result.');
  const [resolutionNote, setResolutionNote] = useState('The governed next step was completed and its result was reviewed.');
  const [evidenceType, setEvidenceType] = useState<FocusScoringResolutionEvidenceType>('human_note');
  const [evidenceReference, setEvidenceReference] = useState('Governed workspace record');
  const [evidenceSummary, setEvidenceSummary] = useState('Evidence showing what action was performed and what state resulted.');
  const [verificationOutcome, setVerificationOutcome] = useState<FocusScoringResolutionVerificationOutcome>('verified');
  const [verificationNote, setVerificationNote] = useState('Evidence was reviewed against the approved execution plan.');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(
    () => listRecommendations().filter((item) => item.status === 'approved' && followupValue(item)),
    [version],
  );
  const selected = recommendations.find((item) => item.id === selectedId) || recommendations[0] || null;
  const value = selected ? followupValue(selected) : null;
  const openRecord = selected ? getOpenFocusScoringFollowupResolution(selected.id) : null;
  const records = useMemo(() => listFocusScoringFollowupResolutionRecords(), [version]);
  const resolution = records.find((item) => item.id === resolutionId) || records[0] || null;
  const evidence = resolution ? listFocusScoringResolutionEvidence(resolution.id) : [];
  const verification = resolution ? getLatestFocusScoringResolutionVerification(resolution.id) : null;

  const refresh = (text: string) => {
    setMessage(text);
    setVersion((current) => current + 1);
  };

  const start = () => {
    if (!selected) return;
    try {
      const created = startFocusScoringFollowupResolution({ recommendation: selected, executionPlan, startedBy: 'Current User' });
      setResolutionId(created.id);
      refresh('Resolution started. No canonical scoring state changed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Resolution could not be started.');
    }
  };

  const close = (outcome: 'completed' | 'cancelled') => {
    if (!openRecord) return;
    try {
      const closed = closeFocusScoringFollowupResolution({ recordId: openRecord.id, outcome, resolutionNote, completedBy: 'Current User' });
      setResolutionId(closed.id);
      refresh(outcome === 'completed'
        ? 'Resolution completed as coordination closure. Add evidence and verification before treating it as verified completion.'
        : 'Resolution cancelled with an explicit record.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Resolution could not be closed.');
    }
  };

  const addEvidence = () => {
    if (!resolution) return;
    try {
      recordFocusScoringResolutionEvidence({ resolution, type: evidenceType, reference: evidenceReference, summary: evidenceSummary, recordedBy: 'Current User' });
      refresh('Evidence added. This does not verify the resolution by itself.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Evidence could not be recorded.');
    }
  };

  const verify = () => {
    if (!resolution) return;
    try {
      verifyFocusScoringResolution({ resolution, outcome: verificationOutcome, verificationNote, verifiedBy: 'Current User' });
      refresh('Verification recorded. Canonical scoring and recommendation status remain unchanged.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Resolution could not be verified.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Follow-up Resolution</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Execute, evidence and verify governance follow-ups</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 880, lineHeight: 1.65 }}>Completion records coordination closure. Evidence records what happened. Verification records whether the evidence supports the claimed result. None of these steps silently changes canonical scoring.</p>
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

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Evidence & verification</div>
          <select value={resolution?.id || ''} onChange={(event) => setResolutionId(event.target.value)} style={{ width: '100%', marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {records.map((item) => <option key={item.id} value={item.id}>{item.status.replaceAll('_', ' ')} · {item.proposedAction.replaceAll('_', ' ')} · {new Date(item.startedAt).toLocaleDateString()}</option>)}
          </select>
          {resolution && <>
            <div style={{ color: '#A7AAB8', fontSize: 12, marginTop: 10 }}>Evidence records: {evidence.length} · Verification: {verification?.outcome.replaceAll('_', ' ') || 'not recorded'}</div>
            {resolution.status !== 'cancelled' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <select value={evidenceType} onChange={(event) => setEvidenceType(event.target.value as FocusScoringResolutionEvidenceType)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="monitoring_record">Monitoring record</option><option value="revision_record">Revision record</option><option value="review_record">Review record</option><option value="external_reference">External reference</option><option value="human_note">Human note</option>
              </select>
              <input value={evidenceReference} onChange={(event) => setEvidenceReference(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={evidenceSummary} onChange={(event) => setEvidenceSummary(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 72, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={addEvidence} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(255,211,122,0.25)', background: 'rgba(255,211,122,0.07)', color: '#FFD37A', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Add evidence</button>
            </div>}
            {resolution.status === 'completed' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginTop: 14 }}>
              <select value={verificationOutcome} onChange={(event) => setVerificationOutcome(event.target.value as FocusScoringResolutionVerificationOutcome)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="verified">Verified</option><option value="partially_verified">Partially verified</option><option value="not_verified">Not verified</option>
              </select>
              <textarea value={verificationNote} onChange={(event) => setVerificationNote(event.target.value)} style={{ minHeight: 72, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={verify} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Record verification</button>
            </div>}
          </>}
        </section>

        <section style={{ ...panelStyle, padding: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Resolution history</div>
          <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
            {records.map((record) => {
              const latest = getLatestFocusScoringResolutionVerification(record.id);
              return <div key={record.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{record.status.replaceAll('_', ' ')}</strong> · {record.proposedAction.replaceAll('_', ' ')} · evidence {listFocusScoringResolutionEvidence(record.id).length} · verification {latest?.outcome.replaceAll('_', ' ') || 'pending'}</div>;
            })}
            {records.length === 0 && <div style={{ color: '#858999' }}>No follow-up resolution records yet.</div>}
          </div>
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Evidence and verification are browser-local governance metadata. Verification confirms only that the recorded evidence supports the stated resolution outcome; it does not prove causality, mutate canonical scoring or change recommendation lifecycle status.</section>
      </div>
    </main>
  );
}
