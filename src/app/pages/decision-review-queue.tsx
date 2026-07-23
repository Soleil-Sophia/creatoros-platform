import { useMemo, useState } from 'react';
import {
  decideRecommendation,
  listRecommendations,
  saveDecisionRecord,
  saveRecommendation,
} from '../../core/decision-engine';
import type { PlatformRecommendation } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
} as const;

export function DecisionReviewQueuePage() {
  const [refreshTick, setRefreshTick] = useState(0);
  const [reasonById, setReasonById] = useState<Record<string, string>>({});

  const allRecommendations = useMemo(() => listRecommendations(), [refreshTick]);
  const recommendations = allRecommendations.filter(
    (item) => item.status === 'in_review' || item.status === 'recommended',
  );
  const approvedBrandOSCount = allRecommendations.filter(
    (item) => item.status === 'approved' && item.targetOS === 'BrandOS',
  ).length;

  const decide = (
    recommendation: PlatformRecommendation,
    action: 'approve' | 'reject' | 'defer',
  ) => {
    const decidedAt = new Date().toISOString();
    const reason = reasonById[recommendation.id]?.trim() || `${action} via Decision Engine review queue.`;
    const deferredUntil = action === 'defer'
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

    const result = decideRecommendation(
      recommendation,
      action,
      'Current User',
      reason,
      decidedAt,
      deferredUntil,
    );

    saveRecommendation(result.recommendation);
    saveDecisionRecord(result.decision);
    setRefreshTick((value) => value + 1);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Decision Engine · Review Queue
            </div>
            <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Recommendations awaiting a human decision</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 760, lineHeight: 1.65 }}>
              Review the reason, evidence, confidence, and proposed change. Approval records the decision but does not silently overwrite canonical OS data.
            </p>
          </div>

          {approvedBrandOSCount > 0 && (
            <a
              href="/platform/decisions/apply/brandos"
              style={{ borderRadius: 11, border: '1px solid rgba(122,255,185,0.24)', background: 'rgba(122,255,185,0.07)', color: '#83F3B7', padding: '10px 13px', fontSize: 12, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              {approvedBrandOSCount} approved BrandOS change{approvedBrandOSCount === 1 ? '' : 's'} →
            </a>
          )}
        </header>

        {recommendations.length === 0 ? (
          <section style={{ ...panelStyle, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>✓</div>
            <h2 style={{ margin: '0 0 8px' }}>Review queue is clear</h2>
            <p style={{ color: '#8B8F9E', margin: 0 }}>New Guide and IntelligenceOS recommendations will appear here.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {recommendations.map((recommendation) => (
              <section key={recommendation.id} style={{ ...panelStyle, padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {recommendation.origin} → {recommendation.targetOS}
                    </div>
                    <h2 style={{ fontSize: 21, margin: '8px 0 7px' }}>{recommendation.title}</h2>
                    <p style={{ color: '#B9BBC7', lineHeight: 1.6, margin: 0 }}>{recommendation.summary}</p>
                  </div>
                  <span style={{ borderRadius: 999, border: '1px solid rgba(218,191,255,0.2)', padding: '6px 10px', color: '#DABFFF', fontSize: 11, fontWeight: 800 }}>
                    {recommendation.confidence} confidence
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 18 }}>
                  <div style={{ ...panelStyle, padding: 13 }}><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Reason</div><div style={{ color: '#D7D9E2', fontSize: 12, lineHeight: 1.5, marginTop: 5 }}>{recommendation.reason}</div></div>
                  <div style={{ ...panelStyle, padding: 13 }}><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Evidence</div><div style={{ color: '#D7D9E2', fontSize: 12, lineHeight: 1.5, marginTop: 5 }}>{recommendation.evidence[0]?.summary || 'No evidence attached.'}</div></div>
                  <div style={{ ...panelStyle, padding: 13 }}><div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase' }}>Expected impact</div><div style={{ color: '#D7D9E2', fontSize: 12, lineHeight: 1.5, marginTop: 5 }}>{recommendation.expectedImpact || 'Not specified.'}</div></div>
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase', marginBottom: 7 }}>Proposed change</div>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#D7D9E2', fontSize: 12, lineHeight: 1.55, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.16)', padding: 13 }}>
                    {JSON.stringify(recommendation.changes, null, 2)}
                  </pre>
                </div>

                <textarea
                  value={reasonById[recommendation.id] || ''}
                  onChange={(event) => setReasonById((current) => ({ ...current, [recommendation.id]: event.target.value }))}
                  placeholder="Optional decision reason"
                  style={{ width: '100%', minHeight: 74, marginTop: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.025)', color: '#F4F3F8', padding: 12, resize: 'vertical' }}
                />

                <div style={{ display: 'flex', gap: 9, marginTop: 12 }}>
                  <button type="button" onClick={() => decide(recommendation, 'approve')} style={{ borderRadius: 10, border: '1px solid rgba(122,255,185,0.25)', background: 'rgba(122,255,185,0.08)', color: '#83F3B7', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Approve</button>
                  <button type="button" onClick={() => decide(recommendation, 'defer')} style={{ borderRadius: 10, border: '1px solid rgba(255,211,122,0.24)', background: 'rgba(255,211,122,0.07)', color: '#FFD37A', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Review later</button>
                  <button type="button" onClick={() => decide(recommendation, 'reject')} style={{ borderRadius: 10, border: '1px solid rgba(255,143,163,0.25)', background: 'rgba(255,143,163,0.07)', color: '#FF8FA3', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Reject</button>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
