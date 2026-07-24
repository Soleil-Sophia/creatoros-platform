import { useMemo, useState } from 'react';
import {
  listFocusExperimentMeasurements,
  listFocusExperimentObservations,
  listFocusScoringExperiments,
  recordFocusExperimentMeasurement,
  recordFocusExperimentObservation,
  summarizeFocusExperimentMeasurements,
} from '../../core/decision-engine';
import type {
  FocusExperimentMeasurementPhase,
  FocusExperimentObservationOutcome,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSFocusExperimentMeasurementPage() {
  const experiments = useMemo(() => listFocusScoringExperiments(), []);
  const [experimentId, setExperimentId] = useState(experiments[0]?.id || '');
  const experiment = experiments.find((item) => item.id === experimentId) || null;
  const [phase, setPhase] = useState<FocusExperimentMeasurementPhase>('baseline');
  const [windowStart, setWindowStart] = useState(new Date().toISOString().slice(0, 10));
  const [windowEnd, setWindowEnd] = useState(new Date().toISOString().slice(0, 10));
  const [planned, setPlanned] = useState(0);
  const [adopted, setAdopted] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [deferred, setDeferred] = useState(0);
  const [note, setNote] = useState('');
  const [outcome, setOutcome] = useState<FocusExperimentObservationOutcome>('inconclusive');
  const [interpretation, setInterpretation] = useState('');
  const [limitations, setLimitations] = useState('Small browser-local sample; no randomized control group.');
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');

  const measurements = useMemo(() => experiment ? listFocusExperimentMeasurements(experiment.id) : [], [experiment, version]);
  const observations = useMemo(() => experiment ? listFocusExperimentObservations(experiment.id) : [], [experiment, version]);
  const summary = useMemo(() => experiment ? summarizeFocusExperimentMeasurements(experiment.id) : null, [experiment, version]);

  const recordMeasurement = () => {
    if (!experiment) return;
    try {
      recordFocusExperimentMeasurement({
        experiment,
        phase,
        windowStart,
        windowEnd,
        plannedItems: planned,
        experimentalItemsAdopted: adopted,
        completedItems: completed,
        deferredItems: deferred,
        note,
        recordedBy: 'Current User',
      });
      setMessage(`${phase} measurement recorded.`);
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Measurement could not be recorded.');
    }
  };

  const recordObservation = () => {
    if (!experiment) return;
    try {
      recordFocusExperimentObservation({ experiment, outcome, interpretation, limitations, observedBy: 'Current User' });
      setMessage('Experiment observation recorded. No scoring rule was adopted automatically.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Observation could not be recorded.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Experiment Measurement</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Measure before deciding what the experiment means</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 850, lineHeight: 1.65 }}>Record comparable baseline and treatment windows, then document a human interpretation and its limitations. A favorable result does not automatically promote an experimental weight into canonical scoring.</p>
          </div>
          <a href="/platform/decisionos/focus/experiments" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Experiments</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Selected experiment</div>
          {experiments.length === 0 ? <p style={{ color: '#9296A8' }}>No focus experiments exist yet.</p> : (
            <select value={experimentId} onChange={(event) => setExperimentId(event.target.value)} style={{ width: '100%', marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
              {experiments.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.status}</option>)}
            </select>
          )}
          {experiment && <div style={{ color: '#858999', fontSize: 11, marginTop: 10 }}>{experiment.signalType.replaceAll('_', ' ')} · {experiment.scoreAdjustment > 0 ? '+' : ''}{experiment.scoreAdjustment} points · metric: {experiment.successMetric}</div>}
        </section>

        {experiment && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Record measurement window</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              <select value={phase} onChange={(event) => setPhase(event.target.value as FocusExperimentMeasurementPhase)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}><option value="baseline">Baseline</option><option value="treatment">Treatment</option></select>
              <input type="date" value={windowStart} onChange={(event) => setWindowStart(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <input type="date" value={windowEnd} onChange={(event) => setWindowEnd(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={recordMeasurement} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', fontWeight: 750, cursor: 'pointer' }}>Record measurement</button>
              {[['Planned', planned, setPlanned], ['Experimental items adopted', adopted, setAdopted], ['Completed', completed, setCompleted], ['Deferred', deferred, setDeferred]].map(([label, value, setter]) => (
                <label key={label as string} style={{ color: '#9296A8', fontSize: 10.5 }}>{label as string}<input type="number" min={0} value={value as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} style={{ width: '100%', marginTop: 5, borderRadius: 9, padding: 9, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} /></label>
              ))}
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Context or data-quality note" style={{ gridColumn: '1 / -1', minHeight: 64, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            </div>
          </section>

          {summary && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Baseline vs treatment</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
              {[['Baseline', summary.baseline], ['Treatment', summary.treatment]].map(([label, data]) => {
                const row = data as typeof summary.baseline;
                return <div key={label as string} style={{ borderRadius: 13, border: '1px solid rgba(255,255,255,0.07)', padding: 14 }}><strong>{label as string}</strong><div style={{ color: '#A7AAB8', fontSize: 12, marginTop: 8 }}>Records {row.records} · Planned {row.planned} · Adopted {row.adopted} · Completed {row.completed} · Deferred {row.deferred}</div><div style={{ color: '#DABFFF', marginTop: 8 }}>Adoption {row.adoptionRate}% · Completion {row.completionRate}%</div></div>;
              })}
            </div>
          </section>}

          <section style={{ ...panelStyle, padding: 20 }}>
            <div style={{ color: '#FFB8C5', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Human observation</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              <select value={outcome} onChange={(event) => setOutcome(event.target.value as FocusExperimentObservationOutcome)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}><option value="supports_hypothesis">Supports hypothesis</option><option value="does_not_support">Does not support</option><option value="inconclusive">Inconclusive</option></select>
              <textarea value={interpretation} onChange={(event) => setInterpretation(event.target.value)} placeholder="What do the measurements suggest?" style={{ minHeight: 78, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={limitations} onChange={(event) => setLimitations(event.target.value)} placeholder="What limits this conclusion?" style={{ minHeight: 68, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={recordObservation} disabled={experiment.status !== 'completed'} style={{ justifySelf: 'end', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Record observation</button>
            </div>
            {experiment.status !== 'completed' && <div style={{ color: '#858999', fontSize: 10.5, marginTop: 8 }}>The experiment must be completed before its observation can be recorded.</div>}
          </section>

          <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Evidence records</div>
            <div style={{ color: '#A7AAB8', fontSize: 11.5, marginTop: 8 }}>{measurements.length} measurement record(s) · {observations.length} observation record(s)</div>
          </section>
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>This workspace stores descriptive browser-local evidence. It does not claim statistical significance, establish causation, modify canonical weights, or create a governed implementation record. Permanent adoption requires a separate reviewed recommendation and controlled canonical update.</section>
      </div>
    </main>
  );
}
