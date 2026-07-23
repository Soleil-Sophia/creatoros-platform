import { useMemo, useState } from 'react';
import {
  createImplementationRecord,
  createObservationRecord,
  listRecommendations,
  markRecommendationImplemented,
  markRecommendationObserved,
  saveImplementationRecord,
  saveObservationRecord,
  saveRecommendation,
} from '../../core/decision-engine';
import type { ObservationOutcome, PlatformRecommendation } from '../../core/decision-engine';

const panel = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOutcomesPage() {
  const [refreshTick, setRefreshTick] = useState(0);
  const [implementationSummary, setImplementationSummary] = useState<Record<string, string>>({});
  const [observationSummary, setObservationSummary] = useState<Record<string, string>>({});
  const [outcomeById, setOutcomeById] = useState<Record<string, ObservationOutcome>>({});

  const recommendations = useMemo(
    () => listRecommendations().filter((item) => item.status === 'canonical' || item.status === 'implemented'),
    [refreshTick],
  );

  const markImplemented = (recommendation: PlatformRecommendation) => {
    const summary = implementationSummary[recommendation.id]?.trim();
    if (!summary) return;
    const implementedAt = new Date().toISOString();
    saveImplementationRecord(createImplementationRecord(recommendation, 'Current User', summary, undefined, implementedAt));
    saveRecommendation(markRecommendationImplemented(recommendation, 'Current User', summary, implementedAt));
    setRefreshTick((value) => value + 1);
  };

  const markObserved = (recommendation: PlatformRecommendation) => {
    const summary = observationSummary[recommendation.id]?.trim();
    if (!summary) return;
    const outcome = outcomeById[recommendation.id] ?? 'inconclusive';
    const observedAt = new Date().toISOString();
    saveObservationRecord(createObservationRecord(recommendation, 'Current User', outcome, summary, undefined, undefined, observedAt));
    saveRecommendation(markRecommendationObserved(recommendation, 'Current User', summary, observedAt));
    setRefreshTick((value) => value + 1);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Decision Engine · Outcomes
          </div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Track implementation and real-world outcome</h1>
          <p style={{ color: '#9296A8', maxWidth: 760, lineHeight: 1.65, margin: 0 }}>
            A canonical decision is not automatically implemented, and an implementation is not automatically successful. Record both steps separately.
          </p>
        </header>

        {recommendations.length === 0 ? (
          <section style={{ ...panel, padding: 40, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No open outcome tracking</h2>
            <p style={{ color: '#8B8F9E', margin: 0 }}>Canonical or implemented recommendations will appear here.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {recommendations.map((recommendation) => (
              <section key={recommendation.id} style={{ ...panel, padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>
                      {recommendation.targetOS} · {recommendation.status}
                    </div>
                    <h2 style={{ margin: '8px 0 6px', fontSize: 21 }}>{recommendation.title}</h2>
                    <p style={{ color: '#B9BBC7', lineHeight: 1.55, margin: 0 }}>{recommendation.summary}</p>
                  </div>
                </div>

                {recommendation.status === 'canonical' ? (
                  <div style={{ marginTop: 18 }}>
                    <label style={{ display: 'block', color: '#A9ADBC', fontSize: 12, marginBottom: 7 }}>What was implemented?</label>
                    <textarea
                      value={implementationSummary[recommendation.id] || ''}
                      onChange={(event) => setImplementationSummary((current) => ({ ...current, [recommendation.id]: event.target.value }))}
                      placeholder="Describe the concrete implementation."
                      style={{ width: '100%', minHeight: 90, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)', color: '#F4F3F8', padding: 12 }}
                    />
                    <button type="button" onClick={() => markImplemented(recommendation)} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(122,255,185,0.25)', background: 'rgba(122,255,185,0.08)', color: '#83F3B7', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>
                      Mark implemented
                    </button>
                  </div>
                ) : (
                  <div style={{ marginTop: 18 }}>
                    <label style={{ display: 'block', color: '#A9ADBC', fontSize: 12, marginBottom: 7 }}>What happened after implementation?</label>
                    <select
                      value={outcomeById[recommendation.id] || 'inconclusive'}
                      onChange={(event) => setOutcomeById((current) => ({ ...current, [recommendation.id]: event.target.value as ObservationOutcome }))}
                      style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: '#15161D', color: '#F4F3F8', padding: '10px 12px', marginBottom: 10 }}
                    >
                      <option value="positive">Positive</option>
                      <option value="neutral">Neutral</option>
                      <option value="negative">Negative</option>
                      <option value="inconclusive">Inconclusive</option>
                    </select>
                    <textarea
                      value={observationSummary[recommendation.id] || ''}
                      onChange={(event) => setObservationSummary((current) => ({ ...current, [recommendation.id]: event.target.value }))}
                      placeholder="Describe the evidence or observed outcome."
                      style={{ width: '100%', minHeight: 90, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)', color: '#F4F3F8', padding: 12 }}
                    />
                    <button type="button" onClick={() => markObserved(recommendation)} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.08)', color: '#DABFFF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>
                      Record observation
                    </button>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
