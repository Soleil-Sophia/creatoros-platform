import { useMemo, useState } from 'react';
import {
  deriveDecisionAttentionSignals,
  listRecommendations,
} from '../../core/decision-engine';
import type { AttentionSeverity, AttentionSignalType } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

const severityLabel: Record<AttentionSeverity, string> = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Ready / Review',
};

const typeLabel: Record<AttentionSignalType, string> = {
  critical: 'Critical urgency',
  overdue: 'Overdue',
  manual_blocker: 'Manual blocker',
  dependency_blocker: 'Dependency blocker',
  dependency_resolved: 'Dependency resolved',
  awaiting_review: 'Awaiting review',
};

export function DecisionOSAttentionCenterPage() {
  const [filter, setFilter] = useState<'all' | AttentionSeverity>('all');
  const recommendations = useMemo(() => listRecommendations(), []);
  const signals = useMemo(() => deriveDecisionAttentionSignals(recommendations), [recommendations]);
  const visible = filter === 'all' ? signals : signals.filter((item) => item.severity === filter);

  const counts = {
    all: signals.length,
    critical: signals.filter((item) => item.severity === 'critical').length,
    warning: signals.filter((item) => item.severity === 'warning').length,
    info: signals.filter((item) => item.severity === 'info').length,
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Attention Center</div>
            <h1 style={{ fontSize: 35, margin: '10px 0 8px' }}>What needs attention now?</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 800, lineHeight: 1.65 }}>
              Derived signals from recommendations, deadlines, manual blockers, dependencies, and review state. This view prioritizes action without creating or rewriting governance records.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 11, marginBottom: 18 }}>
          {([
            ['all', 'All signals', counts.all],
            ['critical', 'Critical', counts.critical],
            ['warning', 'Warnings', counts.warning],
            ['info', 'Ready / Review', counts.info],
          ] as const).map(([value, label, count]) => (
            <button key={value} type="button" onClick={() => setFilter(value)} style={{ ...panelStyle, padding: 16, color: '#F4F3F8', textAlign: 'left', cursor: 'pointer', outline: filter === value ? '1px solid rgba(218,191,255,0.35)' : 'none' }}>
              <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              <div style={{ fontSize: 27, fontWeight: 800, marginTop: 7 }}>{count}</div>
            </button>
          ))}
        </section>

        {visible.length === 0 ? (
          <section style={{ ...panelStyle, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>✓</div>
            <h2 style={{ margin: '0 0 8px' }}>No attention signals in this view</h2>
            <p style={{ color: '#858999', margin: 0 }}>The current decision lifecycle is clear for this filter.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {visible.map((item) => {
              const recommendation = recommendations.find((candidate) => candidate.id === item.recommendationId);
              return (
                <article key={item.id} style={{ ...panelStyle, padding: 19, display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: item.severity === 'critical' ? '#FF8FA3' : item.severity === 'warning' ? '#FFD37A' : '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{severityLabel[item.severity]}</span>
                      <span style={{ color: '#777B8D', fontSize: 10 }}>·</span>
                      <span style={{ color: '#B5B8C5', fontSize: 10 }}>{typeLabel[item.type]}</span>
                      {recommendation && <span style={{ color: '#777B8D', fontSize: 10 }}>· {recommendation.targetOS} · {recommendation.status}</span>}
                    </div>
                    <h2 style={{ margin: '8px 0 5px', fontSize: 18 }}>{item.title}</h2>
                    {recommendation && <div style={{ color: '#F4F3F8', fontSize: 13, fontWeight: 700, marginBottom: 5 }}>{recommendation.title}</div>}
                    <p style={{ color: '#A7AAB8', margin: 0, fontSize: 12.5, lineHeight: 1.55 }}>{item.summary}</p>
                  </div>
                  <a href={item.actionHref} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 13px', fontWeight: 750, fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>{item.actionLabel} →</a>
                </article>
              );
            })}
          </div>
        )}

        <div style={{ ...panelStyle, marginTop: 18, padding: 16, color: '#777B8D', fontSize: 11, lineHeight: 1.6 }}>
          Attention signals are calculated from the current browser-local Decision Engine state. They are not notifications, immutable records, or autonomous decisions. Server-side alerts and delivery remain future infrastructure work.
        </div>
      </div>
    </main>
  );
}
