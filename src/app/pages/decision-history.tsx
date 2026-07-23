import { useMemo } from 'react';
import {
  listBrandOSRevisionRecords,
  listDecisionRecords,
  listRecommendations,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
} as const;

export function DecisionHistoryPage() {
  const decisions = useMemo(() => listDecisionRecords(), []);
  const revisions = useMemo(() => listBrandOSRevisionRecords(), []);
  const recommendations = useMemo(() => listRecommendations(), []);

  const recommendationTitleById = useMemo(
    () => new Map(recommendations.map((item) => [item.id, item.title])),
    [recommendations],
  );

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Decision Engine · History
          </div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Decisions and canonical BrandOS revisions</h1>
          <p style={{ color: '#9296A8', margin: 0, maxWidth: 760, lineHeight: 1.65 }}>
            Review what was decided, why it was decided, and which approved recommendation became a canonical BrandOS revision.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 18, alignItems: 'start' }}>
          <section style={{ ...panelStyle, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19 }}>Decision records</h2>
              <span style={{ color: '#777B8D', fontSize: 12 }}>{decisions.length}</span>
            </div>

            {decisions.length === 0 ? (
              <p style={{ color: '#777B8D', margin: 0 }}>No decisions recorded yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {decisions.map((decision) => (
                  <article key={decision.id} style={{ borderRadius: 13, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                          {decision.targetOS} · {decision.action}
                        </div>
                        <div style={{ color: '#F4F3F8', fontWeight: 700, marginTop: 6 }}>
                          {recommendationTitleById.get(decision.recommendationId) || 'Recommendation'}
                        </div>
                      </div>
                      <span style={{ color: '#9DA1B0', fontSize: 11 }}>{new Date(decision.decidedAt).toLocaleString()}</span>
                    </div>
                    <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '10px 0 0' }}>{decision.reason}</p>
                    <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>
                      Decided by {decision.decidedBy} · resulting status {decision.resultingStatus}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section style={{ ...panelStyle, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 19 }}>BrandOS canonical revisions</h2>
              <span style={{ color: '#777B8D', fontSize: 12 }}>{revisions.length}</span>
            </div>

            {revisions.length === 0 ? (
              <p style={{ color: '#777B8D', margin: 0 }}>No canonical BrandOS revisions recorded yet.</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {revisions.map((revision) => (
                  <article key={revision.id} style={{ borderRadius: 13, border: '1px solid rgba(218,191,255,0.12)', background: 'rgba(218,191,255,0.035)', padding: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                          BrandOS Revision {revision.revision}
                        </div>
                        <div style={{ color: '#F4F3F8', fontWeight: 700, marginTop: 6 }}>
                          {revision.canonical.voiceLabel || revision.canonical.voiceTone}
                        </div>
                      </div>
                      <span style={{ color: '#9DA1B0', fontSize: 11 }}>{new Date(revision.appliedAt).toLocaleString()}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                      <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.025)', padding: 10 }}>
                        <div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Previous</div>
                        <div style={{ color: '#B9BBC7', fontSize: 12, marginTop: 5 }}>{revision.previous?.voiceTone || 'No previous canonical tone'}</div>
                      </div>
                      <div style={{ borderRadius: 10, background: 'rgba(255,255,255,0.025)', padding: 10 }}>
                        <div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Canonical</div>
                        <div style={{ color: '#F4F3F8', fontSize: 12, marginTop: 5 }}>{revision.canonical.voiceTone}</div>
                      </div>
                    </div>

                    <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '11px 0 0' }}>{revision.reason}</p>
                    <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>
                      Applied by {revision.appliedBy} · source recommendation {revision.recommendationId}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
