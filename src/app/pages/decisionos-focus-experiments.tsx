import { useMemo, useState } from 'react';
import {
  activateFocusScoringExperiment,
  closeFocusScoringExperiment,
  createFocusScoringExperiment,
  deriveDecisionDailyFocus,
  deriveExperimentalDecisionDailyFocus,
  listFocusScoringExperiments,
  listRecommendations,
} from '../../core/decision-engine';
import type { FocusScoringExperiment, PlatformRecommendation } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

function isApprovedFocusLearning(item: PlatformRecommendation): boolean {
  return item.status === 'approved' && item.changes.some((change) => change.path === 'focusLearningHypothesis');
}

export function DecisionOSFocusExperimentsPage() {
  const recommendations = useMemo(() => listRecommendations(), []);
  const approved = useMemo(() => recommendations.filter(isApprovedFocusLearning), [recommendations]);
  const [experiments, setExperiments] = useState(() => listFocusScoringExperiments());
  const [sourceId, setSourceId] = useState(approved[0]?.id || '');
  const [adjustment, setAdjustment] = useState(5);
  const [metric, setMetric] = useState('Completion rate and human plan adoption compared with the baseline ranking.');
  const [startsOn, setStartsOn] = useState(new Date().toISOString().slice(0, 10));
  const [endsOn, setEndsOn] = useState(new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10));
  const [message, setMessage] = useState('');

  const active = experiments.find((item) => item.status === 'active') || null;
  const baseline = useMemo(() => deriveDecisionDailyFocus(recommendations, 3), [recommendations]);
  const experimental = useMemo(
    () => active ? deriveExperimentalDecisionDailyFocus(recommendations, active, 3) : [],
    [recommendations, active],
  );

  const refresh = () => setExperiments(listFocusScoringExperiments());

  const create = () => {
    const sourceRecommendation = recommendations.find((item) => item.id === sourceId);
    if (!sourceRecommendation) return;
    try {
      createFocusScoringExperiment({
        sourceRecommendation,
        scoreAdjustment: adjustment,
        successMetric: metric,
        startsOn,
        endsOn,
        createdBy: 'Current User',
      });
      setMessage('Draft experiment created. It has not changed Daily Focus.');
      refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Experiment could not be created.');
    }
  };

  const activate = (id: string) => {
    try {
      activateFocusScoringExperiment(id, 'Current User');
      setMessage('Experiment activated in the controlled comparison workspace.');
      refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Experiment could not be activated.');
    }
  };

  const close = (experiment: FocusScoringExperiment, status: 'completed' | 'cancelled') => {
    closeFocusScoringExperiment(experiment.id, status, 'Current User');
    setMessage(status === 'completed' ? 'Experiment closed as completed.' : 'Experiment cancelled.');
    refresh();
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Focus Experiments</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Test a scoring hypothesis without rewriting the baseline</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>
              An approved IntelligenceOS hypothesis may become a time-boxed scoring experiment. Baseline and experimental ranking remain visible side by side. Activation does not permanently change canonical Daily Focus weights.
            </p>
          </div>
          <a href="/platform/intelligence/focus-learning" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← Focus Learning</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Create controlled experiment</div>
          {approved.length === 0 ? (
            <p style={{ color: '#9296A8', marginBottom: 0 }}>No approved Focus Learning recommendation is available. A hypothesis must pass human review before an experiment can be drafted.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.7fr 1fr 1fr', gap: 10, marginTop: 14 }}>
              <select value={sourceId} onChange={(event) => setSourceId(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
                {approved.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
              </select>
              <input type="number" min={-20} max={20} value={adjustment} onChange={(event) => setAdjustment(Number(event.target.value))} aria-label="Score adjustment" style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <input type="date" value={startsOn} onChange={(event) => setStartsOn(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <input type="date" value={endsOn} onChange={(event) => setEndsOn(event.target.value)} style={{ borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <textarea value={metric} onChange={(event) => setMetric(event.target.value)} style={{ gridColumn: '1 / 4', minHeight: 68, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
              <button type="button" onClick={create} style={{ borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', fontWeight: 750, cursor: 'pointer' }}>Create draft</button>
            </div>
          )}
          {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 10 }}>{message}</div>}
        </section>

        {active && (
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active experiment</div>
            <h2 style={{ margin: '7px 0 5px' }}>{active.title}</h2>
            <p style={{ color: '#A7AAB8', margin: '0 0 14px' }}>{active.hypothesis}</p>
            <div style={{ color: '#8F93A3', fontSize: 11 }}>Adjustment: {active.scoreAdjustment > 0 ? '+' : ''}{active.scoreAdjustment} points for {active.signalType.replaceAll('_', ' ')} · {active.startsOn} → {active.endsOn}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
              {[['Baseline ranking', baseline], ['Experimental ranking', experimental]].map(([label, items]) => (
                <div key={label as string} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', padding: 14 }}>
                  <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{label as string}</div>
                  <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
                    {(items as Array<{ rank: number; recommendationTitle: string; score: number; experimentAdjustment?: number }>).map((item) => (
                      <div key={`${label}-${item.recommendationTitle}`} style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 8, alignItems: 'center' }}>
                        <strong>{item.rank}</strong><span style={{ fontSize: 12 }}>{item.recommendationTitle}</span><span style={{ color: '#9296A8', fontSize: 10.5 }}>{item.score}{item.experimentAdjustment ? ` (${item.experimentAdjustment > 0 ? '+' : ''}${item.experimentAdjustment})` : ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button type="button" onClick={() => close(active, 'completed')} style={{ borderRadius: 9, border: '1px solid rgba(131,243,183,0.22)', background: 'rgba(131,243,183,0.07)', color: '#A8F7CA', padding: '8px 11px', cursor: 'pointer' }}>Complete experiment</button>
              <button type="button" onClick={() => close(active, 'cancelled')} style={{ borderRadius: 9, border: '1px solid rgba(255,143,163,0.18)', background: 'rgba(255,143,163,0.04)', color: '#FF9BAE', padding: '8px 11px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </section>
        )}

        <section style={{ ...panelStyle, padding: 20 }}>
          <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Experiment records</div>
          <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
            {experiments.length === 0 ? <div style={{ color: '#858999' }}>No experiments recorded.</div> : experiments.map((item) => (
              <article key={item.id} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: 14, display: 'grid', gridTemplateColumns: '1fr auto', gap: 14 }}>
                <div>
                  <div style={{ color: item.status === 'active' ? '#FFD37A' : '#9296A8', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{item.status}</div>
                  <div style={{ fontWeight: 750, marginTop: 5 }}>{item.title}</div>
                  <div style={{ color: '#9296A8', fontSize: 11, marginTop: 5 }}>{item.scoreAdjustment > 0 ? '+' : ''}{item.scoreAdjustment} points · {item.startsOn} → {item.endsOn}</div>
                  <div style={{ color: '#777B8D', fontSize: 10.5, marginTop: 5 }}>Success metric: {item.successMetric}</div>
                </div>
                {item.status === 'draft' && <button type="button" onClick={() => activate(item.id)} disabled={Boolean(active)} style={{ alignSelf: 'center', borderRadius: 9, border: '1px solid rgba(218,191,255,0.24)', background: 'rgba(218,191,255,0.08)', color: '#E5D2FF', padding: '9px 12px', cursor: 'pointer' }}>Activate</button>}
              </article>
            ))}
          </div>
        </section>

        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>
          Experiments are browser-local controlled records. Activation enables comparison only; it does not rewrite canonical scoring weights, approve the source recommendation, create an implementation record, or prove that the tested adjustment caused an outcome.
        </section>
      </div>
    </main>
  );
}
