import { useMemo, useState } from 'react';
import {
  createFocusExperimentOutcomeRecommendation,
  hasOpenFocusExperimentRecommendation,
  listFocusExperimentObservations,
  listFocusScoringExperiments,
  listRecommendations,
  saveRecommendation,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function IntelligenceFocusExperimentOutcomesPage() {
  const [version, setVersion] = useState(0);
  const [message, setMessage] = useState('');
  const experiments = useMemo(() => listFocusScoringExperiments(), [version]);
  const observations = useMemo(() => listFocusExperimentObservations(), [version]);
  const recommendations = useMemo(() => listRecommendations(), [version]);

  const eligible = experiments
    .filter((experiment) => experiment.status === 'completed')
    .map((experiment) => ({
      experiment,
      observation: observations.find((item) => item.experimentId === experiment.id) || null,
      alreadySubmitted: hasOpenFocusExperimentRecommendation(experiment.id, recommendations),
    }))
    .filter((item) => item.observation);

  const submit = (experimentId: string) => {
    const row = eligible.find((item) => item.experiment.id === experimentId);
    if (!row?.observation) return;
    try {
      saveRecommendation(createFocusExperimentOutcomeRecommendation(row.experiment, row.observation));
      setMessage('Outcome recommendation submitted for human review. No canonical score was changed.');
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
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IntelligenceOS · Experiment Outcomes</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Turn measured experiments into reviewable next steps</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 850, lineHeight: 1.65 }}>A completed experiment and its human observation may become a new Decision Engine recommendation. The recommendation preserves the measured rates, interpretation, limitations, and tested adjustment without changing canonical scoring.</p>
          </div>
          <a href="/platform/decisionos/focus/experiments/measure" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Measurement</a>
        </header>

        <section style={{ ...panelStyle, padding: 20 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Completed observed experiments</div>
          <div style={{ display: 'grid', gap: 12, marginTop: 14 }}>
            {eligible.length === 0 ? <div style={{ color: '#858999' }}>No completed experiment with an observation is available yet.</div> : eligible.map(({ experiment, observation, alreadySubmitted }) => {
              if (!observation) return null;
              const action = observation.outcome === 'supports_hypothesis'
                ? 'Consider a separate controlled-apply proposal'
                : observation.outcome === 'does_not_support'
                  ? 'Revise the hypothesis and experiment design'
                  : 'Collect more evidence before proposing a score change';
              return (
                <article key={experiment.id} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', padding: 16, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16 }}>
                  <div>
                    <div style={{ color: observation.outcome === 'supports_hypothesis' ? '#83F3B7' : observation.outcome === 'does_not_support' ? '#FF9BAE' : '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{observation.outcome.replaceAll('_', ' ')}</div>
                    <h2 style={{ margin: '7px 0 5px', fontSize: 19 }}>{experiment.title}</h2>
                    <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.55 }}>{observation.interpretation}</div>
                    <div style={{ color: '#7F8392', fontSize: 10.5, marginTop: 8 }}>Baseline completion {observation.baselineCompletionRate}% → treatment {observation.treatmentCompletionRate}% · adoption {observation.baselineAdoptionRate}% → {observation.treatmentAdoptionRate}%</div>
                    <div style={{ color: '#777B8D', fontSize: 10.5, marginTop: 5 }}>Tested adjustment: {experiment.scoreAdjustment > 0 ? '+' : ''}{experiment.scoreAdjustment} · Limitation: {observation.limitations}</div>
                    <div style={{ color: '#D3D5DE', fontSize: 11.5, marginTop: 9, fontWeight: 700 }}>{action}</div>
                  </div>
                  <button type="button" onClick={() => submit(experiment.id)} disabled={alreadySubmitted} style={{ alignSelf: 'center', borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: alreadySubmitted ? 'rgba(255,255,255,0.03)' : 'rgba(218,191,255,0.09)', color: alreadySubmitted ? '#777B8D' : '#E5D2FF', padding: '10px 13px', fontWeight: 750, cursor: 'pointer' }}>{alreadySubmitted ? 'Already in review' : 'Submit recommendation'}</button>
                </article>
              );
            })}
          </div>
        </section>

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>A supportive observation may justify reviewing a controlled apply, but it does not prove causation or authorize a permanent weight. Inconclusive and unsupported outcomes remain useful because they produce evidence-aware revision or measurement recommendations instead of silently discarding the experiment.</section>
      </div>
    </main>
  );
}
