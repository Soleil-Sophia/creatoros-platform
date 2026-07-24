import { useMemo, useState } from 'react';
import {
  createFocusScoringMonitoringRecommendation,
  hasOpenFocusScoringMonitoringRecommendation,
  listFocusScoringMonitoringMeasurements,
  listFocusScoringMonitoringObservations,
  listFocusScoringRevisionRecords,
  listRecommendations,
  recordFocusScoringMonitoringMeasurement,
  recordFocusScoringMonitoringObservation,
  saveRecommendation,
  summarizeFocusScoringMonitoring,
} from '../../core/decision-engine';
import type { FocusScoringMonitoringOutcome, FocusScoringMonitoringPhase } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSFocusScoringMonitoringPage() {
  const revisions = useMemo(() => listFocusScoringRevisionRecords().filter((item) => item.action === 'apply'), []);
  const [revisionId, setRevisionId] = useState(revisions[0]?.id || '');
  const revision = revisions.find((item) => item.id === revisionId) || null;
  const [phase, setPhase] = useState<FocusScoringMonitoringPhase>('before_apply');
  const [windowStart, setWindowStart] = useState(new Date().toISOString().slice(0, 10));
  const [windowEnd, setWindowEnd] = useState(new Date().toISOString().slice(0, 10));
  const [planned, setPlanned] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [deferred, setDeferred] = useState(0);
  const [adopted, setAdopted] = useState(0);
  const [note, setNote] = useState('');
  const [outcome, setOutcome] = useState<FocusScoringMonitoringOutcome>('inconclusive');
  const [interpretation, setInterpretation] = useState('');
  const [limitations, setLimitations] = useState('Browser-local sample; no randomized control and other operating conditions may have changed.');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');

  const measurements = useMemo(() => revision ? listFocusScoringMonitoringMeasurements(revision.id) : [], [revision, version]);
  const observations = useMemo(() => revision ? listFocusScoringMonitoringObservations(revision.id) : [], [revision, version]);
  const summary = useMemo(() => revision ? summarizeFocusScoringMonitoring(revision.id) : null, [revision, version]);
  const recommendations = useMemo(() => listRecommendations(), [version]);
  const observation = observations[0] || null;
  const hasOpen = revision ? hasOpenFocusScoringMonitoringRecommendation(revision.id, recommendations) : false;

  const recordMeasurement = () => {
    if (!revision) return;
    try {
      recordFocusScoringMonitoringMeasurement({
        revision,
        phase,
        windowStart,
        windowEnd,
        plannedItems: planned,
        completedItems: completed,
        deferredItems: deferred,
        adoptedItems: adopted,
        note,
        recordedBy: 'Current User',
      });
      setMessage(`${phase.replaceAll('_', ' ')} measurement recorded.`);
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Measurement could not be recorded.');
    }
  };

  const recordObservation = () => {
    if (!revision) return;
    try {
      recordFocusScoringMonitoringObservation({ revision, outcome, interpretation, limitations, observedBy: 'Current User' });
      setMessage('Post-apply observation recorded. No scoring change or rollback was applied.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Observation could not be recorded.');
    }
  };

  const createRecommendation = () => {
    if (!revision || !observation) return;
    try {
      if (hasOpenFocusScoringMonitoringRecommendation(revision.id, listRecommendations())) throw new Error('An open monitoring recommendation already exists for this revision.');
      saveRecommendation(createFocusScoringMonitoringRecommendation(revision, observation));
      setMessage('IntelligenceOS monitoring recommendation submitted for human review.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Recommendation could not be created.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Post-Apply Monitoring</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Keep canonical scoring changes accountable after apply</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 850, lineHeight: 1.65 }}>Compare before-apply and after-apply operating windows, document a human observation, and route any maintain-or-rollback proposal through the normal review queue.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/apply" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Scoring Apply</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Applied revision</div>
          {revisions.length === 0 ? <p style={{ color: '#9296A8' }}>No applied scoring revision exists yet.</p> : (
            <select value={revisionId} onChange={(event) => setRevisionId(event.target.value)} style={{ width: '100%', marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
              {revisions.map((item) => <option key={item.id} value={item.id}>Revision {item.revision} · {item.signalType.replaceAll('_', ' ')} · {item.previousAdjustment} → {item.appliedAdjustment}</option>)}
            </select>
          )}
          {revision && <div style={{ color: '#858999', fontSize: 11, marginTop: 10 }}>Applied by {revision.actor} on {new Date(revision.createdAt).toLocaleString()} · reason: {revision.reason}</div>}
        </section>

        {revision && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Record monitoring window</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              <select value={phase} onChange={(event) => setPhase(event.target.value as FocusScoringMonitoringPhase)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}><option value="before_apply">Before apply</option><option value="after_apply">After apply</option></select>
              <input type="date" value={windowStart} onChange={(event) => setWindowStart(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <input type="date" value={windowEnd} onChange={(event) => setWindowEnd(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={recordMeasurement} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', fontWeight: 750, cursor: 'pointer' }}>Record window</button>
              {[['Planned', planned, setPlanned], ['Adopted', adopted, setAdopted], ['Completed', completed, setCompleted], ['Deferred', deferred, setDeferred]].map(([label, value, setter]) => (
                <label key={label as string} style={{ color: '#9296A8', fontSize: 10.5 }}>{label as string}<input type="number" min={0} value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} style={{ width: '100%', marginTop: 5, borderRadius: 9, padding: 9, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} /></label>
              ))}
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Operating context or data-quality note" style={{ gridColumn: '1 / -1', minHeight: 64, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            </div>
          </section>

          {summary && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Before vs after apply</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
              {[['Before apply', summary.before], ['After apply', summary.after]].map(([label, data]) => {
                const row = data as typeof summary.before;
                return <div key={label as string} style={{ borderRadius: 13, border: '1px solid rgba(255,255,255,0.07)', padding: 14 }}><strong>{label as string}</strong><div style={{ color: '#A7AAB8', fontSize: 12, marginTop: 8 }}>Records {row.records} · Planned {row.planned} · Adopted {row.adopted} · Completed {row.completed} · Deferred {row.deferred}</div><div style={{ color: '#DABFFF', marginTop: 8 }}>Adoption {row.adoptionRate}% · Completion {row.completionRate}%</div></div>;
              })}
            </div>
          </section>}

          <section style={{ ...panelStyle, padding: 20 }}>
            <div style={{ color: '#FFB8C5', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Human post-apply observation</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              <select value={outcome} onChange={(event) => setOutcome(event.target.value as FocusScoringMonitoringOutcome)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}><option value="maintain_change">Maintain change</option><option value="review_rollback">Review rollback</option><option value="inconclusive">Inconclusive</option></select>
              <textarea value={interpretation} onChange={(event) => setInterpretation(event.target.value)} placeholder="What does the post-apply comparison suggest?" style={{ minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={limitations} onChange={(event) => setLimitations(event.target.value)} style={{ minHeight: 68, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" onClick={recordObservation} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Record observation</button>
                <button type="button" onClick={createRecommendation} disabled={!observation || hasOpen} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>{hasOpen ? 'Recommendation open' : 'Submit to review'}</button>
              </div>
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}><div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Evidence records</div><div style={{ color: '#A7AAB8', fontSize: 11.5, marginTop: 8 }}>{measurements.length} monitoring measurement(s) · {observations.length} observation record(s)</div></section>
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Monitoring is descriptive browser-local evidence. A worse after-apply result does not trigger rollback automatically, and a better result does not prove causation. Maintenance or rollback remains a separate human-reviewed decision.</section>
      </div>
    </main>
  );
}
