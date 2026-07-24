import { useMemo, useState } from 'react';
import {
  acknowledgeDecisionAttentionSignal,
  clearDecisionAttentionState,
  deriveDecisionAttentionSignals,
  getDecisionAttentionState,
  isDecisionAttentionSignalVisible,
  listRecommendations,
  snoozeDecisionAttentionSignal,
} from '../../core/decision-engine';
import type { AttentionSeverity, AttentionSignalType, DecisionAttentionSignal } from '../../core/decision-engine';

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
  governance_monitoring: 'Governance monitoring',
  governance_inconclusive: 'Inconclusive governance evidence',
  governance_rollback_review: 'Rollback review',
};

function snoozeUntil(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

export function DecisionOSAttentionCenterPage() {
  const [filter, setFilter] = useState<'all' | AttentionSeverity>('all');
  const [showHandled, setShowHandled] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const recommendations = useMemo(() => listRecommendations(), [refreshTick]);
  const signals = useMemo(() => deriveDecisionAttentionSignals(recommendations), [recommendations]);

  const rows = signals.map((signal) => ({
    signal,
    state: getDecisionAttentionState(signal.id),
  }));

  const activeRows = rows.filter(({ signal, state }) => isDecisionAttentionSignalVisible(signal, state));
  const handledRows = rows.filter(({ signal, state }) => !isDecisionAttentionSignalVisible(signal, state));
  const sourceRows = showHandled ? handledRows : activeRows;
  const visible = filter === 'all'
    ? sourceRows
    : sourceRows.filter(({ signal }) => signal.severity === filter);

  const counts = {
    all: activeRows.length,
    critical: activeRows.filter(({ signal }) => signal.severity === 'critical').length,
    warning: activeRows.filter(({ signal }) => signal.severity === 'warning').length,
    info: activeRows.filter(({ signal }) => signal.severity === 'info').length,
    handled: handledRows.length,
  };

  const acknowledge = (signal: DecisionAttentionSignal) => {
    acknowledgeDecisionAttentionSignal(signal, 'Current User');
    setRefreshTick((value) => value + 1);
  };

  const snooze = (signal: DecisionAttentionSignal, hours: number) => {
    snoozeDecisionAttentionSignal(signal, snoozeUntil(hours), 'Current User');
    setRefreshTick((value) => value + 1);
  };

  const restore = (signal: DecisionAttentionSignal) => {
    clearDecisionAttentionState(signal.id);
    setRefreshTick((value) => value + 1);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Attention Center</div>
            <h1 style={{ fontSize: 35, margin: '10px 0 8px' }}>What needs attention now?</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 800, lineHeight: 1.65 }}>
              Derived signals from recommendations, deadlines, blockers, dependencies, review state, and scoring governance. Acknowledging or snoozing changes only this attention view — never the underlying governance record.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 11, marginBottom: 12 }}>
          {([
            ['all', 'All active', counts.all],
            ['critical', 'Critical', counts.critical],
            ['warning', 'Warnings', counts.warning],
            ['info', 'Ready / Review', counts.info],
          ] as const).map(([value, label, count]) => (
            <button key={value} type="button" onClick={() => { setShowHandled(false); setFilter(value); }} style={{ ...panelStyle, padding: 16, color: '#F4F3F8', textAlign: 'left', cursor: 'pointer', outline: !showHandled && filter === value ? '1px solid rgba(218,191,255,0.35)' : 'none' }}>
              <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              <div style={{ fontSize: 27, fontWeight: 800, marginTop: 7 }}>{count}</div>
            </button>
          ))}
          <button type="button" onClick={() => { setShowHandled(true); setFilter('all'); }} style={{ ...panelStyle, padding: 16, color: '#F4F3F8', textAlign: 'left', cursor: 'pointer', outline: showHandled ? '1px solid rgba(218,191,255,0.35)' : 'none' }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Acknowledged / Snoozed</div>
            <div style={{ fontSize: 27, fontWeight: 800, marginTop: 7 }}>{counts.handled}</div>
          </button>
        </section>

        <div style={{ color: '#777B8D', fontSize: 11, marginBottom: 16 }}>
          Acknowledged signals stay hidden until restored. Snoozed signals return automatically when their snooze period ends, provided the underlying condition still exists.
        </div>

        {visible.length === 0 ? (
          <section style={{ ...panelStyle, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>✓</div>
            <h2 style={{ margin: '0 0 8px' }}>No attention signals in this view</h2>
            <p style={{ color: '#858999', margin: 0 }}>The current decision lifecycle is clear for this filter.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {visible.map(({ signal: item, state }) => {
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
                    {state && (
                      <div style={{ color: '#777B8D', fontSize: 10.5, marginTop: 8 }}>
                        {state.disposition === 'snoozed' && state.snoozedUntil
                          ? `Snoozed until ${new Date(state.snoozedUntil).toLocaleString()}`
                          : `Acknowledged ${new Date(state.acknowledgedAt).toLocaleString()}`}
                        {' '}by {state.acknowledgedBy}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'grid', gap: 7, minWidth: 150 }}>
                    <a href={item.actionHref} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '9px 12px', fontWeight: 750, fontSize: 12, textDecoration: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}>{item.actionLabel} →</a>
                    {showHandled ? (
                      <button type="button" onClick={() => restore(item)} style={{ borderRadius: 9, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.03)', color: '#C8CBD6', padding: '8px 10px', cursor: 'pointer' }}>Restore signal</button>
                    ) : (
                      <>
                        <button type="button" onClick={() => acknowledge(item)} style={{ borderRadius: 9, border: '1px solid rgba(131,243,183,0.2)', background: 'rgba(131,243,183,0.06)', color: '#83F3B7', padding: '8px 10px', cursor: 'pointer' }}>Acknowledge</button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                          <button type="button" onClick={() => snooze(item, 24)} style={{ borderRadius: 9, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', color: '#B9BBC7', padding: '7px 8px', cursor: 'pointer' }}>1 day</button>
                          <button type="button" onClick={() => snooze(item, 7 * 24)} style={{ borderRadius: 9, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)', color: '#B9BBC7', padding: '7px 8px', cursor: 'pointer' }}>7 days</button>
                        </div>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div style={{ ...panelStyle, marginTop: 18, padding: 16, color: '#777B8D', fontSize: 11, lineHeight: 1.6 }}>
          Acknowledge and Snooze are personal attention controls, not resolution actions. A signal is truly resolved only when its underlying deadline, blocker, dependency, review condition, or scoring-governance state changes.
        </div>
      </div>
    </main>
  );
}
