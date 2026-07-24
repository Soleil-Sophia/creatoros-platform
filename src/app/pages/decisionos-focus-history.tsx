import { useMemo } from 'react';
import { deriveDecisionFocusHistory, summarizeDecisionFocusHistory } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSFocusHistoryPage() {
  const days = useMemo(() => deriveDecisionFocusHistory(), []);
  const summary = useMemo(() => summarizeDecisionFocusHistory(days), [days]);

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Focus History</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Recommendation, plan, and execution over time</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>Compare what DecisionOS recommended, what a human confirmed, and what was actually completed or deferred. This is descriptive evidence, not an automatic judgment of decision quality.</p>
          </div>
          <a href="/platform/decisionos/focus" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Daily Focus</a>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 11, marginBottom: 18 }}>
          {[
            ['Planned days', summary.daysPlanned],
            ['Closed days', summary.daysClosed],
            ['Completed', summary.totalCompletedItems],
            ['Deferred', summary.totalDeferredItems],
            ['Completion rate', `${summary.completionRate}%`],
          ].map(([label, value]) => <div key={label} style={{ ...panelStyle, padding: 16 }}><div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div><div style={{ fontSize: 26, fontWeight: 850, marginTop: 7 }}>{value}</div></div>)}
        </section>

        {days.length === 0 ? (
          <section style={{ ...panelStyle, padding: 42, textAlign: 'center' }}><h2 style={{ margin: '0 0 8px' }}>No historical focus plans yet</h2><p style={{ color: '#858999', margin: 0 }}>Confirm and execute a Daily Focus plan to create the first comparison day.</p></section>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {days.map((day) => (
              <article key={day.date} style={{ ...panelStyle, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start' }}>
                  <div><div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{day.date}</div><h2 style={{ margin: '7px 0 4px', fontSize: 21 }}>{day.executionRate}% of planned focus completed</h2><div style={{ color: '#858999', fontSize: 11 }}>{day.planChangedFromRecommendation ? 'Human order differed from the recommendation.' : 'Human order matched the recommendation.'}</div></div>
                  <div style={{ textAlign: 'right', color: '#AEB1BE', fontSize: 11 }}>{day.completedCount} completed · {day.deferredCount} deferred<br />{day.close ? 'Day closed' : 'No daily close recorded'}</div>
                </div>

                <div style={{ display: 'grid', gap: 8, marginTop: 15 }}>
                  {day.items.map((item) => (
                    <div key={item.signalId} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 13, display: 'grid', gridTemplateColumns: '64px 1fr auto', gap: 12, alignItems: 'center' }}>
                      <div style={{ color: '#E5D2FF', fontWeight: 800 }}>#{item.plannedOrder}</div>
                      <div><div style={{ fontWeight: 750, fontSize: 13 }}>{item.title}</div><div style={{ color: '#777B8D', fontSize: 10.5, marginTop: 4 }}>Recommended rank {item.recommendedOrder} · score {item.originalScore}</div></div>
                      <div style={{ color: item.status === 'completed' ? '#83F3B7' : item.status === 'deferred' ? '#FFD37A' : '#AEB1BE', fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>{item.status.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {day.plan.overrideReason && <div style={{ marginTop: 12, color: '#A7AAB8', fontSize: 11.5 }}><strong>Human override reason:</strong> {day.plan.overrideReason}</div>}
                {day.close && <div style={{ marginTop: 10, color: '#A7AAB8', fontSize: 11.5 }}><strong>Daily close:</strong> {day.close.summary}</div>}
              </article>
            ))}
          </div>
        )}

        <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}><div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Interpretation boundary</div><p style={{ color: '#8F93A3', fontSize: 11.5, lineHeight: 1.65, margin: '8px 0 0' }}>Completion does not prove that the original recommendation was strategically correct. Reordering does not prove that the human plan was better. This screen exposes comparable evidence so later IntelligenceOS analysis can form reviewable hypotheses.</p></section>
      </div>
    </main>
  );
}
