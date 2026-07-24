import { useMemo, useState } from 'react';
import {
  createDecisionDependency,
  deleteDecisionDependency,
  isDependencyResolved,
  listDecisionDependencies,
  listRecommendations,
  saveDecisionDependency,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSDependenciesPage() {
  const [refreshTick, setRefreshTick] = useState(0);
  const [blockerId, setBlockerId] = useState('');
  const [blockedId, setBlockedId] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const recommendations = useMemo(() => listRecommendations(), [refreshTick]);
  const dependencies = useMemo(() => listDecisionDependencies(), [refreshTick]);
  const recommendationById = useMemo(
    () => new Map(recommendations.map((item) => [item.id, item])),
    [recommendations],
  );

  const addDependency = () => {
    const blocker = recommendationById.get(blockerId);
    const blocked = recommendationById.get(blockedId);
    if (!blocker || !blocked) return;

    try {
      saveDecisionDependency(createDecisionDependency(blocker, blocked, 'Current User', reason));
      setBlockerId('');
      setBlockedId('');
      setReason('');
      setError('');
      setRefreshTick((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not create dependency.');
    }
  };

  const unresolved = dependencies.filter((item) => !isDependencyResolved(item, recommendations));
  const resolved = dependencies.filter((item) => isDependencyResolved(item, recommendations));

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Dependencies</div>
            <h1 style={{ fontSize: 35, margin: '10px 0 8px' }}>What must happen first?</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 780, lineHeight: 1.65 }}>
              Link decisions through explicit dependencies. DecisionOS prevents self-dependencies, duplicates, and circular chains.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← DecisionOS Overview</a>
        </header>

        <section style={{ ...panelStyle, padding: 22, marginBottom: 18 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 20 }}>Create dependency</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 48px 1fr', gap: 10, alignItems: 'center' }}>
            <select value={blockerId} onChange={(event) => setBlockerId(event.target.value)} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: '#15161D', color: '#F4F3F8', padding: 11 }}>
              <option value="">Select prerequisite decision</option>
              {recommendations.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.status}</option>)}
            </select>
            <div style={{ textAlign: 'center', color: '#DABFFF', fontWeight: 800 }}>→</div>
            <select value={blockedId} onChange={(event) => setBlockedId(event.target.value)} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: '#15161D', color: '#F4F3F8', padding: 11 }}>
              <option value="">Select dependent decision</option>
              {recommendations.map((item) => <option key={item.id} value={item.id}>{item.title} · {item.status}</option>)}
            </select>
          </div>
          <textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Why does the second decision depend on the first?" style={{ width: '100%', minHeight: 70, marginTop: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11, resize: 'vertical' }} />
          {error && <div style={{ color: '#FF8FA3', fontSize: 12, marginTop: 9 }}>{error}</div>}
          <button type="button" disabled={!blockerId || !blockedId} onClick={addDependency} style={{ marginTop: 11, borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '10px 14px', fontWeight: 750, cursor: 'pointer', opacity: !blockerId || !blockedId ? 0.5 : 1 }}>
            Add dependency
          </button>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
          <div style={{ ...panelStyle, padding: 18 }}><div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Unresolved links</div><div style={{ fontSize: 29, fontWeight: 800, marginTop: 7 }}>{unresolved.length}</div></div>
          <div style={{ ...panelStyle, padding: 18 }}><div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Resolved links</div><div style={{ fontSize: 29, fontWeight: 800, marginTop: 7 }}>{resolved.length}</div></div>
        </section>

        {dependencies.length === 0 ? (
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No dependencies recorded</h2>
            <p style={{ color: '#858999', margin: 0 }}>Independent decisions can continue without waiting on another lifecycle item.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {dependencies.map((dependency) => {
              const blocker = recommendationById.get(dependency.blockerRecommendationId);
              const blocked = recommendationById.get(dependency.blockedRecommendationId);
              const resolvedState = isDependencyResolved(dependency, recommendations);
              return (
                <section key={dependency.id} style={{ ...panelStyle, padding: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 56px 1fr auto', alignItems: 'center', gap: 12 }}>
                    <a href={`/platform/decisionos/decision/${dependency.blockerRecommendationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Prerequisite</div>
                      <div style={{ fontWeight: 750, marginTop: 5 }}>{blocker?.title || 'Missing recommendation'}</div>
                      <div style={{ color: '#777B8D', fontSize: 11, marginTop: 4 }}>{blocker?.status}</div>
                    </a>
                    <div style={{ textAlign: 'center', color: resolvedState ? '#83F3B7' : '#FFD37A', fontWeight: 800 }}>→</div>
                    <a href={`/platform/decisionos/decision/${dependency.blockedRecommendationId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Dependent</div>
                      <div style={{ fontWeight: 750, marginTop: 5 }}>{blocked?.title || 'Missing recommendation'}</div>
                      <div style={{ color: '#777B8D', fontSize: 11, marginTop: 4 }}>{blocked?.status}</div>
                    </a>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: resolvedState ? '#83F3B7' : '#FFD37A', fontSize: 11, fontWeight: 800 }}>{resolvedState ? 'Resolved' : 'Waiting'}</div>
                      <button type="button" onClick={() => { deleteDecisionDependency(dependency.id); setRefreshTick((value) => value + 1); }} style={{ marginTop: 8, border: 0, background: 'transparent', color: '#FF8FA3', fontSize: 11, cursor: 'pointer' }}>Remove</button>
                    </div>
                  </div>
                  {dependency.reason && <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 13, paddingTop: 11, color: '#AEB1BE', fontSize: 12 }}>{dependency.reason}</div>}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
