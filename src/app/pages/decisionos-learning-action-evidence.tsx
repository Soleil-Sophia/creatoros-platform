import { useMemo, useState } from 'react';
import {
  getLatestFocusScoringLearningActionVerification,
  listFocusScoringLearningActionEvidence,
  listFocusScoringLearningActionPlans,
  listFocusScoringLearningActionVerifications,
  previewFocusScoringLearningActionVerification,
  recordFocusScoringLearningActionEvidence,
  verifyFocusScoringLearningActionPlan,
} from '../../core/decision-engine';
import type {
  FocusScoringLearningActionEvidenceType,
  FocusScoringLearningActionVerificationOutcome,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSLearningActionEvidencePage() {
  const [version, setVersion] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [evidenceType, setEvidenceType] = useState<FocusScoringLearningActionEvidenceType>('monitoring_record');
  const [reference, setReference] = useState('');
  const [summary, setSummary] = useState('The governed action produced a traceable record that can be reviewed against the plan evidence criteria.');
  const [verificationOutcome, setVerificationOutcome] = useState<FocusScoringLearningActionVerificationOutcome>('verified');
  const [verificationNote, setVerificationNote] = useState('The available evidence supports the documented action-plan completion within the stated scope and limitations.');
  const [message, setMessage] = useState('');

  const plans = useMemo(
    () => listFocusScoringLearningActionPlans().filter((plan) => plan.status === 'in_progress' || plan.status === 'completed'),
    [version],
  );
  const selected = plans.find((plan) => plan.id === selectedPlanId) || plans[0] || null;
  const evidence = useMemo(
    () => selected ? listFocusScoringLearningActionEvidence(selected.id) : [],
    [selected?.id, version],
  );
  const verifications = useMemo(
    () => selected ? listFocusScoringLearningActionVerifications(selected.id) : [],
    [selected?.id, version],
  );
  const latestVerification = selected ? getLatestFocusScoringLearningActionVerification(selected.id) : null;
  const preview = selected ? previewFocusScoringLearningActionVerification({
    actionPlan: selected,
    evidence,
    evidenceIds: evidence.map((record) => record.id),
  }) : null;

  const refresh = (text: string) => {
    setMessage(text);
    setVersion((current) => current + 1);
  };

  const addEvidence = () => {
    if (!selected) return;
    try {
      recordFocusScoringLearningActionEvidence({
        actionPlan: selected,
        type: evidenceType,
        reference,
        summary,
        recordedBy: 'Current User',
      });
      setReference('');
      refresh('Evidence record added. The action plan and recommendation lifecycle were not changed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Evidence could not be recorded.');
    }
  };

  const verify = () => {
    if (!selected) return;
    try {
      verifyFocusScoringLearningActionPlan({
        actionPlan: selected,
        outcome: verificationOutcome,
        evidenceIds: evidence.map((record) => record.id),
        verificationNote,
        verifiedBy: 'Current User',
      });
      refresh('Verification record created from the current evidence snapshot. No scoring or recommendation status changed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Action plan could not be verified.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Learning Action Evidence</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Separate action-plan completion from verified evidence</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 900, lineHeight: 1.65 }}>Evidence can be gathered while work is in progress. Verification becomes available only after completion and preserves the exact evidence IDs used in that human assessment.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/learning-actions" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Action plans</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.id || ''} onChange={(event) => setSelectedPlanId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.proposedAction.replaceAll('_', ' ')} · {plan.status.replaceAll('_', ' ')} · {plan.owner}</option>)}
          </select>
          {plans.length === 0 && <div style={{ color: '#858999' }}>No in-progress or completed learning action plan is available.</div>}
        </section>

        {selected && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: selected.status === 'completed' ? '#83F3B7' : '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{selected.status.replaceAll('_', ' ')}</div>
            <h2 style={{ margin: '8px 0' }}>{selected.proposedAction.replaceAll('_', ' ')}</h2>
            <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.65 }}>{selected.objective}</div>
            <div style={{ color: '#858999', fontSize: 11.5, marginTop: 8 }}>Evidence criteria: {selected.evidenceCriteria}</div>
            <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Owner {selected.owner} · target {new Date(`${selected.targetDate}T00:00:00`).toLocaleDateString()} · plan {selected.id}</div>
          </section>

          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Evidence record</div>
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 10, marginTop: 12 }}>
              <select value={evidenceType} onChange={(event) => setEvidenceType(event.target.value as FocusScoringLearningActionEvidenceType)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="monitoring_record">Monitoring record</option>
                <option value="experiment_record">Experiment record</option>
                <option value="governance_review">Governance review</option>
                <option value="revision_record">Revision record</option>
                <option value="external_reference">External reference</option>
                <option value="human_note">Human note</option>
              </select>
              <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Record ID, route, URL or stable reference" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={addEvidence} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Record evidence</button>
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: preview?.canVerify ? '#83F3B7' : '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{preview?.canVerify ? 'Verification gate passed' : 'Verification pending'}</div>
            <h2 style={{ margin: '8px 0' }}>Human verification</h2>
            <div style={{ color: '#A7AAB8', fontSize: 12 }}>Current evidence snapshot: {evidence.length} record(s). Latest outcome: {latestVerification?.outcome.replaceAll('_', ' ') || 'not verified yet'}.</div>
            {preview?.blockingReason && <div style={{ color: '#FF9CAF', fontSize: 11.5, marginTop: 8 }}>{preview.blockingReason}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 10, marginTop: 12 }}>
              <select value={verificationOutcome} onChange={(event) => setVerificationOutcome(event.target.value as FocusScoringLearningActionVerificationOutcome)} disabled={!preview?.canVerify} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="verified">Verified</option>
                <option value="partially_verified">Partially verified</option>
                <option value="not_verified">Not verified</option>
              </select>
              <textarea value={verificationNote} onChange={(event) => setVerificationNote(event.target.value)} disabled={!preview?.canVerify} style={{ minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" disabled={!preview?.canVerify} onClick={verify} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: preview?.canVerify ? 'rgba(131,243,183,0.08)' : 'rgba(255,255,255,0.03)', color: preview?.canVerify ? '#A8F7CA' : '#777B8D', padding: 10, fontWeight: 750, cursor: preview?.canVerify ? 'pointer' : 'not-allowed' }}>Create verification snapshot</button>
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Evidence & verification history</div>
            <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
              {evidence.map((record) => <div key={record.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{record.type.replaceAll('_', ' ')}</strong> · {record.reference}<br />{record.summary}<br /><span style={{ color: '#777B8D' }}>Recorded {new Date(record.recordedAt).toLocaleString()} by {record.recordedBy}</span></div>)}
              {verifications.map((record) => <div key={record.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: record.outcome === 'verified' ? '#A8F7CA' : record.outcome === 'not_verified' ? '#FF9CAF' : '#FFD37A' }}>{record.outcome.replaceAll('_', ' ')}</strong> · evidence snapshot {record.evidenceIds.length}<br />{record.verificationNote}<br /><span style={{ color: '#777B8D' }}>Verified {new Date(record.verifiedAt).toLocaleString()} by {record.verifiedBy}</span></div>)}
              {evidence.length === 0 && verifications.length === 0 && <div style={{ color: '#858999' }}>No evidence or verification records yet.</div>}
            </div>
          </section>
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.7 }}>Verification confirms only how well the selected evidence supports the documented plan completion. It does not prove causality, business impact, correct scoring, or successful rollback, and it does not advance any recommendation status.</section>
      </div>
    </main>
  );
}
