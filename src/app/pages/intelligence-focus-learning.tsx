import { useMemo, useState } from 'react';
import {
  createFocusLearningRecommendation,
  deriveFocusLearningPatterns,
  hasOpenFocusLearningRecommendation,
  listRecommendations,
  saveRecommendation,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function IntelligenceFocusLearningPage() {
  const [revision, setRevision] = useState(0);
  const recommendations = useMemo(() => listRecommendations(), [revision]);
  const patterns = useMemo(() => deriveFocusLearningPatterns(), [revision]);

  const submit = (patternId: string) => {
    const pattern = patterns.find((item) => item.id === patternId);
    if (!pattern || hasOpenFocusLearningRecommendation(pattern.id, recommendations)) return;
    saveRecommendation(createFocusLearningRecommendation(pattern));
    setRevision((value) => value + 1);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IntelligenceOS · Focus Learning</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Review repeated planning and execution patterns</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>
              IntelligenceOS turns repeated Focus History patterns into reviewable hypotheses. It does not infer causation, change scoring weights, or apply experiments automatically.
            </p>
          </div>
          <a href="/platform/decisionos/focus/history" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Focus History</a>
        </header>

        {patterns.length === 0 ? (
          <section style={{ ...panelStyle, padding: 42, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>◎</div>
            <h2 style={{ margin: '0 0 8px' }}>Not enough repeated evidence yet</h2>
            <p style={{ color: '#858999', margin: 0 }}>Patterns require at least three comparable focus records and a consistent directional signal.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {patterns.map((pattern) => {
              const exists = hasOpenFocusLearningRecommendation(pattern.id, recommendations);
              return (
                <article key={pattern.id} style={{ ...panelStyle, padding: 22, display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'start' }}>
                  <div>
                    <div style={{ color: pattern.confidence === 'high' ? '#83F3B7' : pattern.confidence === 'medium' ? '#FFD37A' : '#A7AAB8', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {pattern.type.replaceAll('_', ' ')} · {pattern.confidence} confidence · {pattern.sampleSize} records
                    </div>
                    <h2 style={{ margin: '8px 0 6px', fontSize: 20 }}>{pattern.signalType.replaceAll('_', ' ')}</h2>
                    <p style={{ color: '#A7AAB8', margin: 0, fontSize: 13, lineHeight: 1.6 }}>{pattern.summary}</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 13 }}>
                      <span style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', color: '#B9BBC7', fontSize: 10.5 }}>{pattern.completedCount} completed</span>
                      <span style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', color: '#B9BBC7', fontSize: 10.5 }}>{pattern.deferredCount} deferred</span>
                      <span style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', color: '#B9BBC7', fontSize: 10.5 }}>{pattern.promotedCount} promoted</span>
                      <span style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', color: '#B9BBC7', fontSize: 10.5 }}>{pattern.completionRate}% completion</span>
                    </div>
                    <div style={{ color: '#747889', fontSize: 10.5, marginTop: 11 }}>Evidence dates: {pattern.evidenceDates.join(', ')}</div>
                  </div>
                  <button type="button" disabled={exists} onClick={() => submit(pattern.id)} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: exists ? 'rgba(255,255,255,0.025)' : 'rgba(218,191,255,0.09)', color: exists ? '#777B8D' : '#E5D2FF', padding: '10px 13px', fontWeight: 750, cursor: exists ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                    {exists ? 'Already in review' : 'Submit hypothesis →'}
                  </button>
                </article>
              );
            })}
          </div>
        )}

        <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Learning boundary</div>
          <p style={{ color: '#8F93A3', fontSize: 11.5, lineHeight: 1.65, margin: '8px 0 0' }}>
            These patterns are descriptive and browser-local. A submitted hypothesis enters the normal Decision Engine review queue. No Daily Focus score, canonical rule, blocker, dependency, implementation, or observation is changed automatically.
          </p>
        </section>
      </div>
    </main>
  );
}
