import { useMemo, useState } from 'react';
import {
  getLatestFocusScoringLearningActionVerification,
  listFocusScoringLearningActionEvidence,
  listFocusScoringLearningActionPlans,
  listFocusScoringLearningActionVerifications,
  previewFocusScoringLearningActionVerification,
  recordFocusScoringLearningActionEvidence,
  verifyFocusScoringLearningActionPlan,
  type FocusScoringLearningActionEvidenceType,
  type FocusScoringLearningActionVerificationOutcome,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSScoringLearningActionEvidencePage() {
  const [version, setVersion] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState('');
  const [type, setType] = useState<FocusScoringLearningActionEvidenceType>('human_note');
  const [reference, setReference] = useState('Governed workspace record');
  const [summary, setSummary] = useState('The approved learning action was executed and its resulting state was documented.');
  const [outcome, setOutcome] = useState<FocusScoringLearningActionVerificationOutcome>('verified');
  const [verificationNote, setVerificationNote] = useState('The selected evidence supports the claimed completion result.');
  const [message, setMessage] = useState('');

  const plans = useMemo(() => listFocusScoringLearningActionPlans(), [version]);
  const selected = plans.find((item) => item.id === selectedPlanId) || plans[0] || null;
  const evidence = useMemo(() => selected ? listFocusScoringLearningActionEvidence(selected.id) : [], [selected?.id, version]);
  const verifications = useMemo(() => selected ? listFocusScoringLearningActionVerifications(selected.id) : [], [selected?.id, version]);
  const latest = selected ? getLatestFocusScoringLearningActionVerification(selected.id) : null;
  const evidenceIds = evidence.map((item) => item.id);
  const preview = selected ? previewFocusScoringLearningActionVerification({ actionPlan: selected, evidence, evidenceIds }) : null;

  const refresh = (text: string) => {
    setMessage(text);
    setVersion((current) => current + 1);
  };

  const addEvidence = () => {
    if (!selected) return;
    try {
      recordFocusScoringLearningActionEvidence({
        actionPlan: selected,
        type,
        reference,
        summary,
        recordedBy: 'Current User',
      });
      refresh('Evidence recorded. The action plan has not been verified automatically.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Evidence could not be recorded.');
    }
  };

  const verify = () => {
    if (!selected) return;
    try {
      verifyFocusScoringLearningActionPlan({
        actionPlan: selected,
        outcome,
        evidenceIds,
        verificationNote,
        verifiedBy: 'Current User',
      });
      refresh('Verification recorded with an immutable evidence snapshot. No scoring or recommendation lifecycle state changed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Verification could not be recorded.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Learning Action Evidence</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Verify what actually happened</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 900, lineHeight: 1.65 }}>Completion, evidence and verification remain separate records. Verification confirms only that the selected evidence supports the claimed action-plan result.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/learning-actions" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Learning action plans</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.id || ''} onChange={(event) => setSelectedPlanId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.status.replaceAll('_', ' ')} · {plan.proposedAction.replaceAll('_', ' ')} · {plan.id.slice(0, 8)}</option>)}
          </select>
          {plans.length === 0 && <div style={{ color: '#858999' }}>No learning action plans exist yet.</div>}
        </section>

        {selected && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Selected plan</div>
            <h2 style={{ margin: '8px 0' }}>{selected.proposedAction.replaceAll('_', ' ')}</h2>
            <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.7 }}>Status: <strong style={{ color: '#F4F3F8' }}>{selected.status.replaceAll('_', ' ')}</strong><br />Objective: {selected.objective}<br />Evidence criteria: {selected.evidenceCriteria}</div>
            <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Latest verification: {latest ? `${latest.outcome.replaceAll('_', ' ')} · ${new Date(latest.verifiedAt).toLocaleString()}` : 'none'}</div>
          </section>

          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Record evidence</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <select value={type} onChange={(event) => setType(event.target.value as FocusScoringLearningActionEvidenceType)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                {['monitoring_record','experiment_record','governance_review','revision_record','external_reference','human_note'].map((value) => <option key={value} value={value}>{value.replaceAll('_', ' ')}</option>)}
              </select>
              <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Evidence reference" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 76, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={addEvidence} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Record evidence</button>
            </div>
            <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
              {evidence.map((item) => <div key={item.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 9, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{item.type.replaceAll('_', ' ')}</strong> · {item.reference}<br />{item.summary}</div>)}
              {evidence.length === 0 && <div style={{ color: '#858999', fontSize: 11.5 }}>No evidence recorded.</div>}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 20 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Human verification</div>
            <div style={{ color: preview?.canVerify ? '#83F3B7' : '#FF9CAF', fontSize: 11.5, marginTop: 8 }}>{preview?.canVerify ? `${preview.selectedEvidenceCount} evidence records ready for snapshot.` : preview?.blockingReason}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <select value={outcome} onChange={(event) => setOutcome(event.target.value as FocusScoringLearningActionVerificationOutcome)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="verified">verified</option><option value="partially_verified">partially verified</option><option value="not_verified">not verified</option>
              </select>
              <div style={{ color: '#777B8D', fontSize: 11, alignSelf: 'center' }}>All current evidence records are included in the snapshot.</div>
              <textarea value={verificationNote} onChange={(event) => setVerificationNote(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 76, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={verify} disabled={!preview?.canVerify} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: 10, fontWeight: 750, cursor: preview?.canVerify ? 'pointer' : 'not-allowed', opacity: preview?.canVerify ? 1 : 0.45 }}>Record verification</button>
            </div>
            <div style={{ display: 'grid', gap: 8, marginTop: 14 }}>
              {verifications.map((item) => <div key={item.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 9, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{item.outcome.replaceAll('_', ' ')}</strong> · evidence snapshot {item.evidenceIds.length} · {new Date(item.verifiedAt).toLocaleString()}<br />{item.verificationNote}</div>)}
            </div>
          </section>
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.7 }}>Verification does not change scoring, execute rollback, prove causality, create business impact or advance the learning recommendation lifecycle. Records remain browser-local.</section>
      </div>
    </main>
  );
}
