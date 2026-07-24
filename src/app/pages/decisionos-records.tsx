import { useMemo, useState } from 'react';
import { listRecommendations } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSRecordsPage() {
  const [query, setQuery] = useState('');
  const recommendations = useMemo(() => listRecommendations(), []);
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = recommendations.filter((item) => {
    if (!normalizedQuery) return true;
    return [item.title, item.summary, item.status, item.origin, item.targetOS]
      .some((value) => value.toLowerCase().includes(normalizedQuery));
  });

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 22, alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Records</div>
            <h1 style={{ fontSize: 35, margin: '10px 0 8px' }}>Complete decision records</h1>
            <p style={{ color: '#9296A8', lineHeight: 1.65, margin: 0, maxWidth: 760 }}>
              Open any recommendation to inspect its evidence, human decision, canonical revision, implementation, observations, learning follow-ups, and operational coordination.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', textDecoration: 'none', fontSize: 12, whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search title, status, origin, or target OS"
          style={{ width: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 12, marginBottom: 16 }}
        />

        {filtered.length === 0 ? (
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No matching records</h2>
            <p style={{ color: '#858999', margin: 0 }}>Try another search or create a recommendation first.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 11 }}>
            {filtered.map((item) => (
              <a key={item.id} href={`/platform/decisionos/decision/${item.id}`} style={{ ...panelStyle, padding: 17, color: '#F4F3F8', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.origin} → {item.targetOS}</div>
                  <div style={{ fontWeight: 750, marginTop: 6 }}>{item.title}</div>
                  <div style={{ color: '#9DA1B0', fontSize: 12, lineHeight: 1.5, marginTop: 5 }}>{item.summary}</div>
                </div>
                <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <div style={{ color: '#DABFFF', fontSize: 11, fontWeight: 800 }}>{item.status}</div>
                  <div style={{ color: '#777B8D', fontSize: 10, marginTop: 5 }}>{new Date(item.updatedAt).toLocaleString()}</div>
                  <div style={{ color: '#DABFFF', fontSize: 11, marginTop: 8 }}>Open record →</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
