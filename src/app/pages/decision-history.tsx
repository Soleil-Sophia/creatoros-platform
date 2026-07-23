import { useMemo } from 'react';
import {
  listBrandOSRevisionRecords,
  listDecisionRecords,
  listImplementationRecords,
  listObservationRecords,
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
  const implementations = useMemo(() => listImplementationRecords(), []);
  const observations = useMemo(() => listObservationRecords(), []);
  const recommendations = useMemo(() => listRecommendations(), []);
  const titleById = useMemo(() => new Map(recommendations.map((item) => [item.id, item.title])), [recommendations]);

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Decision Engine · History</div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Decision lifecycle history</h1>
          <p style={{ color: '#9296A8', margin: 0, maxWidth: 760, lineHeight: 1.65 }}>See what was decided, made canonical, implemented, and later observed.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18, alignItems: 'start' }}>
          <section style={{ ...panelStyle, padding: 22 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>Decision records · {decisions.length}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {decisions.length === 0 && <p style={{ color: '#777B8D', margin: 0 }}>No decisions recorded yet.</p>}
              {decisions.map((decision) => (
                <article key={decision.id} style={{ borderRadius: 13, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 14 }}>
                  <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{decision.targetOS} · {decision.action}</div>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{titleById.get(decision.recommendationId) || 'Recommendation'}</div>
                  <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '10px 0 0' }}>{decision.reason}</p>
                  <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>{decision.decidedBy} · {new Date(decision.decidedAt).toLocaleString()}</div>
                </article>
              ))}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 22 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>BrandOS revisions · {revisions.length}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {revisions.length === 0 && <p style={{ color: '#777B8D', margin: 0 }}>No canonical BrandOS revisions yet.</p>}
              {revisions.map((revision) => (
                <article key={revision.id} style={{ borderRadius: 13, border: '1px solid rgba(218,191,255,0.12)', background: 'rgba(218,191,255,0.035)', padding: 14 }}>
                  <div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>BrandOS Revision {revision.revision}</div>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{revision.canonical.voiceLabel || revision.canonical.voiceTone}</div>
                  <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '10px 0 0' }}>{revision.reason}</p>
                  <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>{revision.appliedBy} · {new Date(revision.appliedAt).toLocaleString()}</div>
                </article>
              ))}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 22 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>Implementations · {implementations.length}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {implementations.length === 0 && <p style={{ color: '#777B8D', margin: 0 }}>No implementations recorded yet.</p>}
              {implementations.map((record) => (
                <article key={record.id} style={{ borderRadius: 13, border: '1px solid rgba(122,255,185,0.12)', background: 'rgba(122,255,185,0.035)', padding: 14 }}>
                  <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{record.targetOS} · Implemented</div>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{titleById.get(record.recommendationId) || 'Recommendation'}</div>
                  <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '10px 0 0' }}>{record.summary}</p>
                  <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>{record.implementedBy} · {new Date(record.implementedAt).toLocaleString()}</div>
                </article>
              ))}
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 22 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>Observations · {observations.length}</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {observations.length === 0 && <p style={{ color: '#777B8D', margin: 0 }}>No observations recorded yet.</p>}
              {observations.map((record) => (
                <article key={record.id} style={{ borderRadius: 13, border: '1px solid rgba(255,211,122,0.12)', background: 'rgba(255,211,122,0.035)', padding: 14 }}>
                  <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{record.targetOS} · {record.outcome}</div>
                  <div style={{ fontWeight: 700, marginTop: 6 }}>{titleById.get(record.recommendationId) || 'Recommendation'}</div>
                  <p style={{ color: '#B9BBC7', fontSize: 13, lineHeight: 1.55, margin: '10px 0 0' }}>{record.summary}</p>
                  <div style={{ color: '#777B8D', fontSize: 11, marginTop: 9 }}>{record.observedBy} · {new Date(record.observedAt).toLocaleString()}</div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
