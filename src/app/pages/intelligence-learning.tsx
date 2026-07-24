import { useMemo, useState } from 'react';
import {
  aggregateObservationPattern,
  createPatternLearningRecommendation,
  hasOpenLearningRecommendation,
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

  const patterns = useMemo(() => {
    const ids = Array.from(new Set(observations.map((item) => item.recommendationId)));
    return ids.flatMap((id) => {
      const source = recommendationById.get(id);
      if (source?.status !== 'observed') return [];
      return [{ source, pattern: aggregateObservationPattern(id, observations) }];
    });
  }, [observations, recommendationById]);

  const submitLearning = (sourceId: string) => {
    const item = patterns.find(({ source }) => source.id === sourceId);
    if (!item || hasOpenLearningRecommendation(sourceId, recommendations)) return;

    const learning = learningById[sourceId]?.trim();
    const action = actionById[sourceId]?.trim();
    if (!learning || !action) return;

    saveRecommendation(createPatternLearningRecommendation(
      item.source,
      item.pattern,
      observations,
      learning,
      action,
    ));
    setSubmittedIds((current) => [...current, sourceId]);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IntelligenceOS · Pattern Learning</div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Turn repeated evidence into one controlled proposal</h1>
          <p style={{ color: '#9296A8', margin: 0, maxWidth: 790, lineHeight: 1.65 }}>
            Observations are grouped by their source recommendation. Confidence rises only when evidence becomes repeated and directionally consistent.
          </p>
        </header>

        {patterns.length === 0 ? (
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No observed patterns ready for learning</h2>
            <p style={{ color: '#858999', margin: 0 }}>Complete an implementation and observation first.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {patterns.map(({ source, pattern }) => {
              const duplicate = hasOpenLearningRecommendation(source.id, recommendations);
              const submitted = submittedIds.includes(source.id) || duplicate;
              return (
                <section key={source.id} style={{ ...panelStyle, padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                    <div>
                      <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        {pattern.totalObservations} observations · {pattern.consistency} · {pattern.dominantOutcome}
                      </div>
                      <h2 style={{ margin: '8px 0 6px', fontSize: 20 }}>{source.title}</h2>
                      <p style={{ color: '#B9BBC7', lineHeight: 1.6, margin: 0 }}>{pattern.summary}</p>
                    </div>
                    <span style={{ color: '#DABFFF', fontSize: 11 }}>{pattern.confidence} confidence</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                    {Object.entries(pattern.outcomeCounts).map(([outcome, count]) => (
                      <span key={outcome} style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', color: '#AEB1BE', fontSize: 11 }}>
                        {outcome}: {count}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
                    <textarea value={learningById[source.id] || ''} onChange={(event) => setLearningById((current) => ({ ...current, [source.id]: event.target.value }))} placeholder="What should IntelligenceOS learn from this pattern?" style={{ minHeight: 104, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 12, resize: 'vertical' }} />
                    <textarea value={actionById[source.id] || ''} onChange={(event) => setActionById((current) => ({ ...current, [source.id]: event.target.value }))} placeholder="What controlled next action should be reviewed?" style={{ minHeight: 104, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 12, resize: 'vertical' }} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 13 }}>
                    <button type="button" disabled={submitted || !learningById[source.id]?.trim() || !actionById[source.id]?.trim()} onClick={() => submitLearning(source.id)} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: submitted ? 'default' : 'pointer', opacity: submitted ? 0.6 : 1 }}>
                      {duplicate ? 'Open learning recommendation already exists' : submitted ? 'Submitted to Review Queue' : 'Create pattern recommendation'}
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
