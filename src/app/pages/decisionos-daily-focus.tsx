import { useMemo, useState } from 'react';
import {
  clearDecisionFocusPlan,
  closeDecisionFocusDay,
  createFocusPlanItems,
  deriveDecisionDailyFocus,
  getDecisionFocusDayClose,
  getDecisionFocusExecutionItem,
  getDecisionFocusPlan,
  listRecommendations,
  saveDecisionFocusPlan,
  updateDecisionFocusExecutionItem,
} from '../../core/decision-engine';
import type { DecisionFocusPlanItem, FocusExecutionStatus } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

const statusLabel: Record<FocusExecutionStatus, string> = {
  planned: 'Planned',
  in_progress: 'In progress',
  completed: 'Completed',
  deferred: 'Deferred',
};

export function DecisionOSDailyFocusPage() {
  const recommendations = useMemo(() => listRecommendations(), []);
  const focusItems = useMemo(() => deriveDecisionDailyFocus(recommendations, 3), [recommendations]);
  const initialPlan = useMemo(() => getDecisionFocusPlan(), []);
  const [planItems, setPlanItems] = useState<DecisionFocusPlanItem[]>(initialPlan?.items || []);
  const [overrideReason, setOverrideReason] = useState(initialPlan?.overrideReason || '');
  const [savedAt, setSavedAt] = useState(initialPlan?.updatedAt || '');
  const [executionTick, setExecutionTick] = useState(0);
  const initialClose = useMemo(() => getDecisionFocusDayClose(), []);
  const [daySummary, setDaySummary] = useState(initialClose?.summary || '');
  const [closedAt, setClosedAt] = useState(initialClose?.closedAt || '');

  const adoptRecommendation = () => {
    setPlanItems(createFocusPlanItems(focusItems));
    setOverrideReason('');
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= planItems.length) return;
    setPlanItems((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next.map((item, itemIndex) => ({ ...item, order: itemIndex + 1 }));
    });
  };

  const remove = (signalId: string) => {
    setPlanItems((current) => current.filter((item) => item.signalId !== signalId).map((item, index) => ({ ...item, order: index + 1 })));
  };

  const add = (signalId: string) => {
    if (planItems.length >= 3 || planItems.some((item) => item.signalId === signalId)) return;
    const source = createFocusPlanItems(focusItems).find((item) => item.signalId === signalId);
    if (source) setPlanItems((current) => [...current, { ...source, order: current.length + 1 }]);
  };

  const save = () => {
    const plan = saveDecisionFocusPlan(planItems, 'Current User', overrideReason);
    setPlanItems(plan.items);
    setSavedAt(plan.updatedAt);
  };

  const clear = () => {
    clearDecisionFocusPlan();
    setPlanItems([]);
    setOverrideReason('');
    setSavedAt('');
  };

  const setExecutionStatus = (item: DecisionFocusPlanItem, status: FocusExecutionStatus) => {
    updateDecisionFocusExecutionItem({
      signalId: item.signalId,
      recommendationId: item.recommendationId,
      status,
      updatedBy: 'Current User',
    });
    setExecutionTick((value) => value + 1);
  };

  const closeDay = () => {
    const close = closeDecisionFocusDay(daySummary, 'Current User');
    setClosedAt(close.closedAt);
  };

  const differsFromRecommendation = planItems.some((item, index) => focusItems[index]?.signal.id !== item.signalId) || planItems.length !== focusItems.length;
  const executionCounts = planItems.reduce((counts, item) => {
    const status = getDecisionFocusExecutionItem(item.signalId)?.status || 'planned';
    counts[status] += 1;
    return counts;
  }, { planned: 0, in_progress: 0, completed: 0, deferred: 0 } as Record<FocusExecutionStatus, number>);
  void executionTick;

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Daily Focus</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Plan the day, execute it, then close the loop</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>Recommendation, human plan, and actual execution remain separate so DecisionOS can later compare what was suggested, chosen, and really completed.</p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'center', marginBottom: 14 }}>
            <div><div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Human Focus Plan</div><h2 style={{ margin: '6px 0 0', fontSize: 21 }}>Today’s confirmed order</h2></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={adoptRecommendation} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.07)', color: '#A8F7CA', padding: '9px 12px', cursor: 'pointer' }}>Use recommended order</button>
              <button type="button" onClick={clear} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'transparent', color: '#A6A9B6', padding: '9px 12px', cursor: 'pointer' }}>Clear</button>
            </div>
          </div>

          {planItems.length === 0 ? <div style={{ borderRadius: 12, border: '1px dashed rgba(255,255,255,0.1)', padding: 22, color: '#858999', textAlign: 'center' }}>No human focus plan confirmed yet.</div> : (
            <div style={{ display: 'grid', gap: 9 }}>
              {planItems.map((item, index) => (
                <div key={item.signalId} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 13, display: 'grid', gridTemplateColumns: '38px 1fr auto', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', fontWeight: 800 }}>{index + 1}</div>
                  <div><div style={{ fontWeight: 750, fontSize: 13 }}>{item.title}</div><div style={{ color: '#9397A7', fontSize: 11, marginTop: 4 }}>{item.plannedAction}</div><div style={{ color: '#696D7E', fontSize: 10, marginTop: 4 }}>Suggested rank {item.originalRank} · score {item.originalScore}</div></div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
                    <button type="button" onClick={() => move(index, 1)} disabled={index === planItems.length - 1}>↓</button>
                    <button type="button" onClick={() => remove(item.signalId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <textarea value={overrideReason} onChange={(event) => setOverrideReason(event.target.value)} placeholder="Why are you changing the recommended order?" style={{ width: '100%', minHeight: 70, marginTop: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11, resize: 'vertical' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, alignItems: 'center', marginTop: 10 }}><div style={{ color: '#777B8D', fontSize: 10.5 }}>{savedAt ? `Saved ${new Date(savedAt).toLocaleString()}` : differsFromRecommendation ? 'Human plan differs from the current recommendation.' : 'Ready to confirm the recommended order.'}</div><button type="button" onClick={save} disabled={planItems.length === 0}>Confirm today’s plan</button></div>
        </section>

        {savedAt && (
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Execution</div>
            <h2 style={{ margin: '7px 0 5px', fontSize: 21 }}>What actually happened?</h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0 14px' }}>{(Object.keys(statusLabel) as FocusExecutionStatus[]).map((status) => <span key={status} style={{ borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)', padding: '6px 9px', fontSize: 10.5 }}>{statusLabel[status]} {executionCounts[status]}</span>)}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {planItems.map((item) => {
                const execution = getDecisionFocusExecutionItem(item.signalId);
                const status = execution?.status || 'planned';
                return <div key={item.signalId} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: 14, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}><div><div style={{ fontWeight: 750 }}>{item.title}</div><div style={{ color: '#858999', fontSize: 11, marginTop: 4 }}>Current state: {statusLabel[status]}</div></div><div style={{ display: 'flex', gap: 6 }}>{(['in_progress', 'completed', 'deferred'] as FocusExecutionStatus[]).map((nextStatus) => <button key={nextStatus} type="button" onClick={() => setExecutionStatus(item, nextStatus)} disabled={status === nextStatus}>{statusLabel[nextStatus]}</button>)}</div></div>;
              })}
            </div>
            <textarea value={daySummary} onChange={(event) => setDaySummary(event.target.value)} placeholder="What changed today? What should carry forward?" style={{ width: '100%', minHeight: 76, marginTop: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11, resize: 'vertical' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}><div style={{ color: '#777B8D', fontSize: 10.5 }}>{closedAt ? `Day closed ${new Date(closedAt).toLocaleString()}` : 'Close the day only after recording the real execution state.'}</div><button type="button" onClick={closeDay}>Close today’s focus cycle</button></div>
          </section>
        )}

        <div style={{ display: 'grid', gap: 14 }}>
          {focusItems.map((item) => {
            const included = planItems.some((planned) => planned.signalId === item.signal.id);
            return <article key={`${item.recommendationId}:${item.signal.type}`} style={{ ...panelStyle, padding: 22, display: 'grid', gridTemplateColumns: '72px 1fr auto', gap: 18, alignItems: 'start' }}><div style={{ width: 54, height: 54, borderRadius: 16, display: 'grid', placeItems: 'center', border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.08)', color: '#E5D2FF', fontSize: 22, fontWeight: 850 }}>{item.rank}</div><div><div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{item.targetOS} · {item.signal.type.replaceAll('_', ' ')} · score {item.score}</div><h2 style={{ margin: '8px 0 5px', fontSize: 20 }}>{item.recommendationTitle}</h2><p style={{ color: '#A7AAB8', margin: 0, fontSize: 13 }}>{item.signal.summary}</p></div><div style={{ display: 'grid', gap: 8 }}><button type="button" onClick={() => add(item.signal.id)} disabled={included || planItems.length >= 3}>{included ? 'In plan' : 'Add to plan'}</button><a href={item.actionHref} style={{ color: '#DABFFF', fontSize: 11, textDecoration: 'none' }}>Take next step →</a></div></article>;
          })}
        </div>

        <section style={{ ...panelStyle, padding: 18, marginTop: 18 }}><div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Governance boundary</div><p style={{ color: '#8F93A3', fontSize: 11.5, lineHeight: 1.65, margin: '8px 0 0' }}>Execution status records what happened in the focus plan. Completing a focus item does not automatically mark the underlying recommendation implemented, resolve its blocker, or change canonical governance state.</p></section>
      </div>
    </main>
  );
}
