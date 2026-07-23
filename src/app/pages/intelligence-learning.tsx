import { useMemo, useState } from 'react';
import {
  createIntelligenceLearningRecommendation,
  listObservationRecords,
  listRecommendations,
  saveRecommendation,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
} as const;

export function IntelligenceLearningPage() {
  const [learningById, setLearningById] = useState<Record<string, string>>({});
  const [actionById, setActionById] = useState<Record<string, string>>({});
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  const observations = useMemo(() => listObservationRecords(), []);
  const recommendations = useMemo(() => listRecommendations(), []);
  const recommendationById = useMemo(
    () => new Map(recommendations.map((item) => [item.id, item])),
    [recommendations],
  );

  const eligible = observations.filter((observation) => {
    const source = recommendationById.get(observation.recommendationId);
    return source?.status === 'observed';
  });

  const submitLearning = (observationId: string) => {
    const observation = observations.find((item) => item.id === observationId);
    if (!observation) return;
    const source = recommendationById.get(observation.recommendationId);
    if (!source) return;

    const learning = learningById[observationId]?.trim();
    const action = actionById[observationId]?.trim();
    if (!learning || !action) return;

    const recommendation = createIntelligenceLearningRecommendation(
      observation,
      source,
      learning,
      action,
    );
    saveRecommendation(recommendation);
    setSubmittedIds((current) => [...current, observationId]);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            IntelligenceOS · Learning
          </div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Turn observations into controlled next-step proposals</h1>
          <p style={{ color: '#9296A8', margin: 0, maxWidth: 790, lineHeight: 1.65 }}>
            IntelligenceOS may interpret evidence and prepare a new recommendation. It never changes BrandOS, DesignOS, or another canonical source automatically.
          </p>
        </header>

        {eligible.length === 0 ? (
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No observed outcomes ready for learning</h2>
            <p style={{ color: '#858999', margin: 0 }}>Complete an implementation and observation first.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {eligible.map((observation) => {
              const source = recommendationById.get(observation.recommendationId)!;
              const submitted = submittedIds.includes(observation.id);
              return (
                <section key={observation.id} style={{ ...panelStyle, padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                    <div>
                      <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {observation.outcome} outcome · {source.targetOS}
                      </div>
                      <h2 style={{ margin: '8px 0 6px', fontSize: 20 }}>{source.title}</h2>
                      <p style={{ color: '#B9BBC7', lineHeight: 1.6, margin: 0 }}>{observation.summary}</p>
                    </div>
                    <span style={{ color: '#8F93A3', fontSize: 11 }}>{new Date(observation.observedAt).toLocaleString()}</span>
                  </div>

                  {(observation.metric || observation.measuredValue) && (
                    <div style={{ marginTop: 14, color: '#AEB1BE', fontSize: 12 }}>
                      {observation.metric || 'Measured result'}{observation.measuredValue ? ` · ${observation.measuredValue}` : ''}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
                    <textarea
                      value={learningById[observation.id] || ''}
                      onChange={(event) => setLearningById((current) => ({ ...current, [observation.id]: event.target.value }))}
                      placeholder="What should IntelligenceOS learn from this evidence?"
                      style={{ minHeight: 104, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 12, resize: 'vertical' }}
                    />
                    <textarea
                      value={actionById[observation.id] || ''}
                      onChange={(event) => setActionById((current) => ({ ...current, [observation.id]: event.target.value }))}
                      placeholder="What controlled next action should be reviewed?"
                      style={{ minHeight: 104, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 12, resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 13 }}>
                    <button
                      type="button"
                      disabled={submitted || !learningById[observation.id]?.trim() || !actionById[observation.id]?.trim()}
                      onClick={() => submitLearning(observation.id)}
                      style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: submitted ? 'default' : 'pointer', opacity: submitted ? 0.6 : 1 }}
                    >
                      {submitted ? 'Submitted to Review Queue' : 'Create learning recommendation'}
                    </button>
                    {submitted && <a href="/platform/decisions/review" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>Open Review Queue →</a>}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
