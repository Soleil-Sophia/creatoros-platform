import { useMemo, useState } from 'react';
import {
  createFocusScoringObservationLearningRecommendation,
  hasOpenFocusScoringObservationLearningRecommendation,
  listObservationRecords,
  listRecommendations,
  saveRecommendation,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function IntelligenceScoringObservationLearningPage() {
  const [version, setVersion] = useState(0);
  const [selectedObservationId, setSelectedObservationId] = useState('');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(() => listRecommendations(), [version]);
  const observations = useMemo(() => listObservationRecords(), [version]);
  const eligible = observations.flatMap((observation) => {
    const sourceRecommendation = recommendations.find((item) => item.id === observation.recommendationId);
    if (!sourceRecommendation || sourceRecommendation.status !== 'observed') return [];
    return [{ observation, sourceRecommendation }];
  });
  const selected = eligible.find((item) => item.observation.id === selectedObservationId) || eligible[0] || null;
  const duplicateOpen = selected
    ? hasOpenFocusScoringObservationLearningRecommendation(selected.observation.id, recommendations)
    : false;

  const createLearning = () => {
    if (!selected) return;
    try {
      const recommendation = createFocusScoringObservationLearningRecommendation({
        ...selected,
        createdBy: 'Current User',
      });
      saveRecommendation(recommendation);
      setMessage('Learning recommendation submitted for human review. No scoring or governance state changed.');
      setVersion((value) => value + 1);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Learning recommendation could not be created.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IntelligenceOS · Observed Outcome Learning</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Turn observed governance outcomes into reviewable learning</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 880, lineHeight: 1.65 }}>Observed outcomes become controlled next-step proposals. IntelligenceOS does not silently modify Daily Focus scoring, reverse a revision or treat a positive result as causal proof.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/resolutions/observation" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Outcome observations</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.observation.id || ''} onChange={(event) => setSelectedObservationId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {eligible.map((item) => <option key={item.observation.id} value={item.observation.id}>{item.sourceRecommendation.title} · {item.observation.outcome}</option>)}
          </select>
          {eligible.length === 0 && <div style={{ color: '#858999' }}>No observed scoring follow-up outcomes are currently available.</div>}
        </section>

        {selected && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: selected.observation.outcome === 'negative' ? '#FF8FA3' : '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{selected.observation.outcome}</div>
          <h2 style={{ margin: '8px 0' }}>{selected.sourceRecommendation.title}</h2>
          <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.65 }}>{selected.observation.summary}</div>
          {(selected.observation.metric || selected.observation.measuredValue) && <div style={{ color: '#858999', fontSize: 11.5, marginTop: 8 }}>Metric: {selected.observation.metric || 'not specified'} · Value: {selected.observation.measuredValue || 'not specified'}</div>}
          <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Observed {new Date(selected.observation.observedAt).toLocaleString()} by {selected.observation.observedBy}</div>
          <button type="button" disabled={duplicateOpen} onClick={createLearning} style={{ marginTop: 14, borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: duplicateOpen ? 'rgba(255,255,255,0.03)' : 'rgba(218,191,255,0.09)', color: duplicateOpen ? '#777B8D' : '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: duplicateOpen ? 'not-allowed' : 'pointer' }}>{duplicateOpen ? 'Open learning recommendation already exists' : 'Submit learning recommendation'}</button>
        </section>}

        <section style={{ ...panelStyle, padding: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.7 }}>
          <strong style={{ color: '#C9C3D5' }}>Learning boundary:</strong> positive suggests maintain and monitor; neutral suggests another bounded measurement; negative suggests revision or controlled rollback review; inconclusive suggests more evidence. Every path enters the normal human review queue and changes nothing automatically.
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
      </div>
    </main>
  );
}
