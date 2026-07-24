import { useMemo } from 'react';
import {
  deriveDecisionDailyFocus,
  listRecommendations,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSDailyFocusPage() {
  const recommendations = useMemo(() => listRecommendations(), []);
  const focusItems = useMemo(() => deriveDecisionDailyFocus(recommendations, 3), [recommendations]);

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Daily Focus</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>The three actions most worth advancing now</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>
              A transparent recommendation derived from active attention signals, urgency, recommendation priority, blockers, deadlines, and review state. DecisionOS suggests the order; a human still chooses what to do.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        {focusItems.length === 0 ? (
          <section style={{ ...panelStyle, padding: 42, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>✓</div>
            <h2 style={{ margin: '0 0 8px' }}>No active focus actions</h2>
            <p style={{ color: '#858999', margin: 0 }}>There are no currently visible attention signals requiring prioritization.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {focusItems.map((item) => (
              <article key={`${item.recommendationId}:${item.signal.type}`} style={{ ...panelStyle, padding: 22, display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 18, alignItems: 'start' }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, display: 'grid', placeItems: 'center', border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.08)', color: '#E5D2FF', fontSize: 22, fontWeight: 850 }}>
                  {item.rank}
                </div>

                <div>
                  <div style={{ color: item.signal.severity === 'critical' ? '#FF8FA3' : item.signal.severity === 'warning' ? '#FFD37A' : '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.targetOS} · {item.signal.type.replaceAll('_', ' ')} · score {item.score}
                  </div>
                  <h2 style={{ margin: '8px 0 5px', fontSize: 20 }}>{item.recommendationTitle}</h2>
                  <p style={{ color: '#A7AAB8', margin: 0, fontSize: 13, lineHeight: 1.55 }}>{item.signal.summary}</p>

                  <div style={{ marginTop: 14, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 13 }}>
                    <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Suggested next action</div>
                    <div style={{ marginTop: 6, fontSize: 13, fontWeight: 700 }}>{item.suggestedAction}</div>
                  </div>

                  <div style={{ marginTop: 13 }}>
                    <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Why this ranks here</div>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {item.rationale.map((reason) => (
                        <span key={reason} style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', color: '#B9BBC7', fontSize: 10.5, padding: '6px 9px' }}>{reason}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 9, justifyItems: 'end' }}>
                  <a href={item.actionHref} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 13px', fontWeight: 750, fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>Take next step →</a>
                  <a href={`/platform/decisionos/decision/${item.recommendationId}`} style={{ color: '#9EA2B2', fontSize: 11, textDecoration: 'none' }}>Open full record</a>
                </div>
              </article>
            ))}
          </div>
        )}

        <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scoring boundary</div>
          <p style={{ color: '#8F93A3', fontSize: 11.5, lineHeight: 1.65, margin: '8px 0 0' }}>
            Ranking is deterministic and explainable: attention severity, signal type, and recommendation priority contribute fixed points. Acknowledged or currently snoozed signals are excluded. This is operational guidance, not an autonomous decision or a change to canonical governance state.
          </p>
        </section>
      </div>
    </main>
  );
}
