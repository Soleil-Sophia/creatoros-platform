import { useMemo, useState } from 'react';
import {
  closeFocusScoringLearningActionPlan,
  createFocusScoringLearningActionPlan,
  getFocusScoringObservationLearningValue,
  getOpenFocusScoringLearningActionPlan,
  listFocusScoringLearningActionPlans,
  listRecommendations,
  startFocusScoringLearningActionPlan,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

const defaultTargetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export function DecisionOSScoringLearningActionPlansPage() {
  const [version, setVersion] = useState(0);
  const [selectedRecommendationId, setSelectedRecommendationId] = useState('');
  const [objective, setObjective] = useState('Execute the approved learning path in the correct governed workspace without changing scoring authority.');
  const [evidenceCriteria, setEvidenceCriteria] = useState('Record the action taken, the resulting state and the evidence required for a later human review.');
  const [owner, setOwner] = useState('Current User');
  const [targetDate, setTargetDate] = useState(defaultTargetDate);
  const [closureNote, setClosureNote] = useState('The planned action was completed in its governed workspace and the result was documented.');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(
    () => listRecommendations().filter((item) => item.status === 'approved' && getFocusScoringObservationLearningValue(item)),
    [version],
  );
  const plans = useMemo(() => listFocusScoringLearningActionPlans(), [version]);
  const selected = recommendations.find((item) => item.id === selectedRecommendationId) || recommendations[0] || null;
  const value = selected ? getFocusScoringObservationLearningValue(selected) : null;
  const openPlan = selected ? getOpenFocusScoringLearningActionPlan(selected.id) : null;

  const refresh = (text: string) => {
    setMessage(text);
    setVersion((current) => current + 1);
  };

  const createPlan = () => {
    if (!selected) return;
    try {
      createFocusScoringLearningActionPlan({
        recommendation: selected,
        objective,
        evidenceCriteria,
        owner,
        targetDate,
        createdBy: 'Current User',
      });
      refresh('Action plan created as planned. No experiment, monitoring action or scoring change was started.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Action plan could not be created.');
    }
  };

  const startPlan = () => {
    if (!openPlan) return;
    try {
      startFocusScoringLearningActionPlan({ recordId: openPlan.id, startedBy: 'Current User' });
      refresh('Action plan started. Execution remains inside the linked governed workspace.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Action plan could not be started.');
    }
  };

  const closePlan = (outcome: 'completed' | 'cancelled') => {
    if (!openPlan) return;
    try {
      closeFocusScoringLearningActionPlan({
        recordId: openPlan.id,
        outcome,
        closureNote,
        closedBy: 'Current User',
      });
      refresh(outcome === 'completed'
        ? 'Action plan completed with an explicit record. The learning recommendation lifecycle was not advanced automatically.'
        : 'Action plan cancelled with an explicit reason record.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Action plan could not be closed.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Learning Action Plans</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Turn approved learning into a responsible next action</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 900, lineHeight: 1.65 }}>Approval permits planning. Starting the plan records execution intent. The actual measurement, monitoring, review or rollback work remains inside its existing governed workspace.</p>
          </div>
          <div style={{ display: 'grid', gap: 8, textAlign: 'right' }}>
            <a href="/platform/decisionos/focus/scoring/learning-actions/evidence" style={{ color: '#E5D2FF', fontSize: 12, textDecoration: 'none' }}>Evidence & verification →</a>
            <a href="/platform/intelligence/focus-scoring-observations" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← IntelligenceOS learning</a>
          </div>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.id || ''} onChange={(event) => setSelectedRecommendationId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {recommendations.map((item) => <option key={item.id} value={item.id}>{item.title} · approved</option>)}
          </select>
          {recommendations.length === 0 && <div style={{ color: '#858999' }}>No approved observed-outcome learning recommendations are currently available.</div>}
        </section>

        {selected && value && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: value.outcome === 'negative' ? '#FF8FA3' : '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{value.outcome} · {value.proposedAction.replaceAll('_', ' ')}</div>
          <h2 style={{ margin: '8px 0' }}>{selected.title}</h2>
          <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.65 }}>{selected.recommendedAction}</div>
          <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Observation {value.observationId} · source recommendation {value.sourceRecommendationId}</div>

          {!openPlan ? <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            <textarea value={objective} onChange={(event) => setObjective(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <textarea value={evidenceCriteria} onChange={(event) => setEvidenceCriteria(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <input value={owner} onChange={(event) => setOwner(event.target.value)} placeholder="Owner" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={createPlan} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Create controlled action plan</button>
          </div> : <div style={{ marginTop: 16 }}>
            <div style={{ padding: 14, borderRadius: 12, background: 'rgba(218,191,255,0.06)', color: '#C9C3D5', fontSize: 12, lineHeight: 1.7 }}>
              <strong style={{ color: '#F4F3F8' }}>{openPlan.status.replaceAll('_', ' ')}</strong> · owner {openPlan.owner} · target {new Date(openPlan.targetDate).toLocaleDateString()}<br />
              Objective: {openPlan.objective}<br />
              Evidence criteria: {openPlan.evidenceCriteria}
            </div>
            {openPlan.status === 'planned' && <button type="button" onClick={startPlan} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Start action plan</button>}
            {openPlan.status === 'in_progress' && <>
              <a href={openPlan.targetHref} style={{ display: 'inline-block', marginTop: 10, color: '#E5D2FF', textDecoration: 'none' }}>Open governed action workspace →</a>
              <textarea value={closureNote} onChange={(event) => setClosureNote(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 76, marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <button type="button" onClick={() => closePlan('completed')} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Complete with record</button>
                <button type="button" onClick={() => closePlan('cancelled')} style={{ borderRadius: 10, border: '1px solid rgba(255,143,163,0.22)', background: 'rgba(255,143,163,0.06)', color: '#FF9CAF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Cancel with record</button>
              </div>
            </>}
          </div>}
        </section>}

        <section style={{ ...panelStyle, padding: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Action plan history</div>
          <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
            {plans.map((plan) => <div key={plan.id} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong style={{ color: '#F4F3F8' }}>{plan.status.replaceAll('_', ' ')}</strong> · {plan.proposedAction.replaceAll('_', ' ')} · owner {plan.owner} · target {new Date(plan.targetDate).toLocaleDateString()}{plan.closedAt ? ` · closed ${new Date(plan.closedAt).toLocaleDateString()} by ${plan.closedBy}` : ''}</div>)}
            {plans.length === 0 && <div style={{ color: '#858999' }}>No controlled learning action plans yet.</div>}
          </div>
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.7 }}>Action plans are browser-local coordination records. Planning, starting or completing one does not modify Daily Focus scoring, execute rollback, create measurements, canonicalize the learning recommendation or mark it implemented.</section>
      </div>
    </main>
  );
}
