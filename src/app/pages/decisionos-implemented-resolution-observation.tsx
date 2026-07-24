import { useMemo, useState } from 'react';
import {
  getLatestFocusScoringResolutionVerification,
  listFocusScoringFollowupResolutionRecords,
  listImplementationRecords,
  listRecommendations,
  previewFocusScoringResolutionObservation,
  recordFocusScoringResolutionObservation,
} from '../../core/decision-engine';
import type { ObservationOutcome } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSImplementedResolutionObservationPage() {
  const [version, setVersion] = useState(0);
  const [selectedId, setSelectedId] = useState('');
  const [outcome, setOutcome] = useState<ObservationOutcome>('inconclusive');
  const [summary, setSummary] = useState('Observed outcome after the verified governance follow-up implementation.');
  const [metric, setMetric] = useState('Follow-up outcome');
  const [measuredValue, setMeasuredValue] = useState('Pending human interpretation');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(() => listRecommendations(), [version]);
  const implementations = useMemo(() => listImplementationRecords(), [version]);
  const resolutions = useMemo(() => listFocusScoringFollowupResolutionRecords(), [version]);

  const eligible = implementations.flatMap((implementation) => {
    const recommendation = recommendations.find((item) => item.id === implementation.recommendationId);
    if (!recommendation || recommendation.status !== 'implemented') return [];
    const resolution = resolutions.find((item) => item.recommendationId === recommendation.id && item.status === 'completed');
    if (!resolution) return [];
    const verification = getLatestFocusScoringResolutionVerification(resolution.id);
    if (!verification || verification.outcome !== 'verified') return [];
    return [{ recommendation, implementation, resolution, verification }];
  });

  const selected = eligible.find((item) => item.implementation.id === selectedId) || eligible[0] || null;
  const preview = selected ? previewFocusScoringResolutionObservation(selected) : null;

  const observe = () => {
    if (!selected) return;
    try {
      recordFocusScoringResolutionObservation({
        ...selected,
        observedBy: 'Current User',
        outcome,
        summary,
        metric,
        measuredValue,
      });
      setMessage('Observation recorded and recommendation explicitly marked observed. This records an outcome assessment, not proof of causality.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Observation could not be recorded.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Resolution Observation</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Observe the outcome after verified implementation</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 880, lineHeight: 1.65 }}>Implementation records what was executed. Observation records the later human assessment of what happened. Positive, neutral, negative and inconclusive outcomes remain equally valid records.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/resolutions/implementation" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Verified implementation</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.implementation.id || ''} onChange={(event) => setSelectedId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {eligible.map((item) => <option key={item.implementation.id} value={item.implementation.id}>{item.recommendation.title} · implemented {new Date(item.implementation.implementedAt).toLocaleDateString()}</option>)}
          </select>
          {eligible.length === 0 && <div style={{ color: '#858999' }}>No implemented recommendation with verified resolution lineage is currently eligible.</div>}
        </section>

        {selected && preview && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: preview.canObserve ? '#83F3B7' : '#FF8FA3', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{preview.canObserve ? 'Observation gate passed' : 'Blocked'}</div>
            <h2 style={{ margin: '8px 0' }}>{selected.recommendation.title}</h2>
            <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.65 }}>Implementation {preview.implementationId} · verified resolution {preview.resolutionId} · evidence snapshot {preview.evidenceCount} record(s)</div>
            {preview.blockingReason && <div style={{ color: '#FF9CAF', fontSize: 12, marginTop: 10 }}>{preview.blockingReason}</div>}
          </section>

          {preview.canObserve && <section style={{ ...panelStyle, padding: 20 }}>
            <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Explicit outcome observation</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
              <select value={outcome} onChange={(event) => setOutcome(event.target.value as ObservationOutcome)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
                <option value="inconclusive">Inconclusive</option>
              </select>
              <input value={metric} onChange={(event) => setMetric(event.target.value)} placeholder="Metric or observation dimension" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <input value={measuredValue} onChange={(event) => setMeasuredValue(event.target.value)} placeholder="Measured or described value" style={{ gridColumn: '1 / -1', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={summary} onChange={(event) => setSummary(event.target.value)} style={{ gridColumn: '1 / -1', minHeight: 90, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={observe} style={{ gridColumn: '2', borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: 10, fontWeight: 750, cursor: 'pointer' }}>Record observation and close lifecycle</button>
            </div>
          </section>}
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Observation is a human interpretation linked to the implementation and verified resolution lineage. It does not prove causality, statistical significance or broader business impact, and it does not alter Daily Focus scoring.</section>
      </div>
    </main>
  );
}
