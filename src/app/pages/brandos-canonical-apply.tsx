import { useMemo, useState } from 'react';
import {
  applyApprovedBrandToneRecommendation,
  listRecommendations,
  markRecommendationCanonical,
  previewBrandToneCanonicalApply,
  saveRecommendation,
} from '../../core/decision-engine';
import type { PlatformRecommendation } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
} as const;

function ValueBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ ...panelStyle, padding: 14 }}>
      <div style={{ color: '#777B8D', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{label}</div>
      <div style={{ color: '#D9DBE4', marginTop: 6, fontSize: 13, lineHeight: 1.55 }}>{value || 'Not set'}</div>
    </div>
  );
}

export function BrandOSCanonicalApplyPage() {
  const [refreshTick, setRefreshTick] = useState(0);
  const [appliedId, setAppliedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const approvedRecommendations = useMemo(
    () => listRecommendations().filter(
      (item) => item.status === 'approved' && item.targetOS === 'BrandOS',
    ),
    [refreshTick],
  );

  const apply = (recommendation: PlatformRecommendation) => {
    try {
      const canonicalizedAt = new Date().toISOString();
      applyApprovedBrandToneRecommendation(recommendation);
      const canonical = markRecommendationCanonical(
        recommendation,
        'Current User',
        'Approved BrandOS tone proposal applied after explicit before/after review.',
        canonicalizedAt,
      );
      saveRecommendation(canonical);
      setAppliedId(recommendation.id);
      setError(null);
      setRefreshTick((value) => value + 1);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Canonical apply failed.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ marginBottom: 28 }}>
          <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Decision Engine · Canonical Apply
          </div>
          <h1 style={{ fontSize: 34, margin: '10px 0 8px' }}>Apply approved changes to BrandOS</h1>
          <p style={{ color: '#9296A8', margin: 0, maxWidth: 780, lineHeight: 1.65 }}>
            Approval and canonical application are separate. Compare the current BrandOS values with the proposed revision before applying it.
          </p>
        </header>

        {error && (
          <div style={{ ...panelStyle, padding: 14, borderColor: 'rgba(255,143,163,0.3)', color: '#FF9AAD', marginBottom: 16 }}>
            {error}
          </div>
        )}

        {approvedRecommendations.length === 0 ? (
          <section style={{ ...panelStyle, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 34, marginBottom: 12 }}>✓</div>
            <h2 style={{ margin: '0 0 8px' }}>No approved BrandOS changes waiting</h2>
            <p style={{ color: '#8B8F9E', margin: 0 }}>Approve a BrandOS recommendation in the Review Queue first.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 18 }}>
            {approvedRecommendations.map((recommendation) => {
              const preview = previewBrandToneCanonicalApply(recommendation);
              return (
                <section key={recommendation.id} style={{ ...panelStyle, padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Approved → Awaiting Canonical Apply
                      </div>
                      <h2 style={{ fontSize: 21, margin: '8px 0 7px' }}>{recommendation.title}</h2>
                      <p style={{ color: '#B9BBC7', lineHeight: 1.6, margin: 0 }}>{recommendation.summary}</p>
                    </div>
                    <span style={{ borderRadius: 999, border: '1px solid rgba(122,255,185,0.24)', padding: '6px 10px', color: '#83F3B7', fontSize: 11, fontWeight: 800 }}>
                      Revision {preview.nextRevision}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <div>
                      <div style={{ color: '#8B8F9E', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 9 }}>Current BrandOS</div>
                      <div style={{ display: 'grid', gap: 9 }}>
                        <ValueBlock label="Tone" value={preview.current?.voiceTone || ''} />
                        <ValueBlock label="Formality / secondary traits" value={preview.current?.voiceFormality || ''} />
                        <ValueBlock label="Energy" value={preview.current?.voiceEnergy || ''} />
                        <ValueBlock label="Current revision" value={String(preview.current?.canonicalRevision ?? 0)} />
                      </div>
                    </div>

                    <div>
                      <div style={{ color: '#DABFFF', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 9 }}>Proposed Canonical Revision</div>
                      <div style={{ display: 'grid', gap: 9 }}>
                        <ValueBlock label="Tone" value={preview.proposed.voiceTone} />
                        <ValueBlock label="Formality / secondary traits" value={preview.proposed.voiceFormality} />
                        <ValueBlock label="Energy" value={preview.proposed.voiceEnergy} />
                        <ValueBlock label="New revision" value={String(preview.proposed.canonicalRevision ?? preview.nextRevision)} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.14)', padding: 13, color: '#A9ADBC', fontSize: 12, lineHeight: 1.55 }}>
                    Approved by {recommendation.reviewedBy || 'Current User'} · Reason: {recommendation.decisionReason || 'No reason recorded.'}
                  </div>

                  <button
                    type="button"
                    onClick={() => apply(recommendation)}
                    style={{ marginTop: 14, borderRadius: 11, border: '1px solid rgba(122,255,185,0.28)', background: 'rgba(122,255,185,0.09)', color: '#83F3B7', padding: '11px 15px', fontWeight: 800, cursor: 'pointer' }}
                  >
                    Apply as BrandOS Canonical Revision {preview.nextRevision}
                  </button>
                </section>
              );
            })}
          </div>
        )}

        {appliedId && (
          <div style={{ ...panelStyle, marginTop: 18, padding: 16, borderColor: 'rgba(122,255,185,0.22)', color: '#83F3B7' }}>
            Canonical BrandOS revision applied and recommendation history updated.
          </div>
        )}
      </div>
    </main>
  );
}
