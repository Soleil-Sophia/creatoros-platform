import { useMemo, useState } from 'react';
import {
  canonicalizeVerifiedFocusScoringResolution,
  getLatestFocusScoringResolutionVerification,
  listFocusScoringFollowupResolutionRecords,
  listRecommendations,
  previewFocusScoringResolutionImplementation,
  recordVerifiedFocusScoringResolutionImplementation,
} from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

export function DecisionOSVerifiedResolutionImplementationPage() {
  const [version, setVersion] = useState(0);
  const [selectedResolutionId, setSelectedResolutionId] = useState('');
  const [canonicalReason, setCanonicalReason] = useState('Accept the verified resolution outcome as the governed operational action for this approved follow-up.');
  const [implementationSummary, setImplementationSummary] = useState('The approved governance follow-up was executed, evidenced and independently verified.');
  const [message, setMessage] = useState('');

  const recommendations = useMemo(() => listRecommendations(), [version]);
  const records = useMemo(
    () => listFocusScoringFollowupResolutionRecords().filter((record) => record.status === 'completed'),
    [version],
  );
  const eligible = records.flatMap((resolution) => {
    const recommendation = recommendations.find((item) => item.id === resolution.recommendationId);
    const verification = getLatestFocusScoringResolutionVerification(resolution.id);
    if (!recommendation || !verification || verification.outcome !== 'verified') return [];
    return [{ resolution, recommendation, verification }];
  });
  const selected = eligible.find((item) => item.resolution.id === selectedResolutionId) || eligible[0] || null;
  const preview = selected ? previewFocusScoringResolutionImplementation(selected) : null;

  const refresh = (text: string) => {
    setMessage(text);
    setVersion((value) => value + 1);
  };

  const canonicalize = () => {
    if (!selected) return;
    try {
      canonicalizeVerifiedFocusScoringResolution({
        ...selected,
        actor: 'Current User',
        reason: canonicalReason,
      });
      refresh('Recommendation moved to canonical through an explicit human action. No implementation record was created yet.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Canonicalization could not be recorded.');
    }
  };

  const implement = () => {
    if (!selected) return;
    try {
      recordVerifiedFocusScoringResolutionImplementation({
        ...selected,
        implementedBy: 'Current User',
        summary: implementationSummary,
      });
      refresh('Implementation record created and recommendation marked implemented. Canonical scoring itself was not changed by this bridge.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Implementation could not be recorded.');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Verified Implementation</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>Turn verified resolution evidence into a governed implementation record</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 880, lineHeight: 1.65 }}>Verification is an evidence gate, not an automatic lifecycle transition. Canonicalization and implementation remain two explicit human actions.</p>
          </div>
          <a href="/platform/decisionos/focus/scoring/resolutions" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>← Resolution evidence</a>
        </header>

        <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
          <select value={selected?.resolution.id || ''} onChange={(event) => setSelectedResolutionId(event.target.value)} style={{ width: '100%', borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }}>
            {eligible.map((item) => <option key={item.resolution.id} value={item.resolution.id}>{item.recommendation.title} · {item.recommendation.status} · verified</option>)}
          </select>
          {eligible.length === 0 && <div style={{ color: '#858999' }}>No completed and verified scoring follow-up resolution is currently eligible.</div>}
        </section>

        {selected && preview && <>
          <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: preview.blockingReason ? '#FF8FA3' : '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{preview.blockingReason ? 'Blocked' : 'Evidence gate passed'}</div>
            <h2 style={{ margin: '8px 0' }}>{selected.recommendation.title}</h2>
            <div style={{ color: '#A7AAB8', fontSize: 12, lineHeight: 1.65 }}>Recommendation status: <strong>{preview.recommendationStatus}</strong> · Evidence snapshot: {preview.evidenceCount} record(s) · Verification: verified</div>
            <div style={{ color: '#858999', fontSize: 11.5, marginTop: 8 }}>{preview.verificationNote}</div>
            {preview.evidenceReferences.length > 0 && <div style={{ color: '#777B8D', fontSize: 11, marginTop: 8 }}>Evidence: {preview.evidenceReferences.join(' · ')}</div>}
            {preview.blockingReason && <div style={{ color: '#FF9CAF', fontSize: 12, marginTop: 10 }}>{preview.blockingReason}</div>}
          </section>

          {preview.canCanonicalize && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#FFD37A', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Gate 1 · Explicit canonicalization</div>
            <textarea value={canonicalReason} onChange={(event) => setCanonicalReason(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 82, marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={canonicalize} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(255,211,122,0.25)', background: 'rgba(255,211,122,0.07)', color: '#FFD37A', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Accept as canonical action outcome</button>
          </section>}

          {preview.canImplement && <section style={{ ...panelStyle, padding: 20, marginBottom: 18 }}>
            <div style={{ color: '#83F3B7', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>Gate 2 · Implementation record</div>
            <textarea value={implementationSummary} onChange={(event) => setImplementationSummary(event.target.value)} style={{ width: '100%', boxSizing: 'border-box', minHeight: 82, marginTop: 12, borderRadius: 10, padding: 10, background: '#15161D', color: '#F4F3F8', border: '1px solid rgba(255,255,255,0.09)' }} />
            <button type="button" onClick={implement} style={{ marginTop: 10, borderRadius: 10, border: '1px solid rgba(131,243,183,0.25)', background: 'rgba(131,243,183,0.08)', color: '#A8F7CA', padding: '10px 14px', fontWeight: 750, cursor: 'pointer' }}>Create implementation record</button>
          </section>}
        </>}

        {message && <div style={{ color: '#B9BBC7', fontSize: 11.5, marginTop: 12 }}>{message}</div>}
        <section style={{ ...panelStyle, padding: 17, marginTop: 18, color: '#858999', fontSize: 11.5, lineHeight: 1.65 }}>Only a latest verification outcome of verified passes this bridge. Partial or failed verification cannot be canonicalized or implemented here. The bridge records the follow-up lifecycle; it does not itself apply or roll back Daily Focus scoring.</section>
      </div>
    </main>
  );
}
