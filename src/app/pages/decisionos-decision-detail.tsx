import { useMemo } from 'react';
import { useParams } from 'react-router';
import {
  getDecisionOperationalMetadata,
  getRecommendation,
  isOperationallyOverdue,
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
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

interface TimelineEntry {
  id: string;
  timestamp: string;
  label: string;
  actor?: string;
  summary?: string;
  kind: 'recommendation' | 'decision' | 'canonical' | 'implementation' | 'observation' | 'learning';
}

function extractSourceRecommendationId(recommendation: ReturnType<typeof listRecommendations>[number]): string | null {
  for (const change of recommendation.changes) {
    if (change.path !== 'learningFollowUp' || !change.recommendedValue || typeof change.recommendedValue !== 'object') continue;
    const source = (change.recommendedValue as Record<string, unknown>).sourceRecommendationId;
    if (typeof source === 'string') return source;
  }
  return null;
}

function formatTimestamp(value: string): string {
  return new Date(value).toLocaleString();
}

export function DecisionOSDecisionDetailPage() {
  const { recommendationId } = useParams();
  const recommendation = useMemo(
    () => recommendationId ? getRecommendation(recommendationId) : null,
    [recommendationId],
  );

  const allRecommendations = useMemo(() => listRecommendations(), []);
  const decisionRecords = useMemo(
    () => listDecisionRecords().filter((item) => item.recommendationId === recommendationId),
    [recommendationId],
  );
  const revisions = useMemo(
    () => listBrandOSRevisionRecords().filter((item) => item.recommendationId === recommendationId),
    [recommendationId],
  );
  const implementations = useMemo(
    () => listImplementationRecords().filter((item) => item.recommendationId === recommendationId),
    [recommendationId],
  );
  const observations = useMemo(
    () => listObservationRecords().filter((item) => item.recommendationId === recommendationId),
    [recommendationId],
  );
  const learningFollowUps = useMemo(
    () => allRecommendations.filter((item) => extractSourceRecommendationId(item) === recommendationId),
    [allRecommendations, recommendationId],
  );
  const operationalMetadata = useMemo(
    () => recommendationId ? getDecisionOperationalMetadata(recommendationId) : null,
    [recommendationId],
  );

  const timeline = useMemo<TimelineEntry[]>(() => {
    if (!recommendation) return [];
    const entries: TimelineEntry[] = recommendation.history.map((item) => ({
      id: item.id,
      timestamp: item.createdAt,
      label: item.action,
      actor: item.actor,
      summary: item.reason,
      kind: 'recommendation',
    }));

    decisionRecords.forEach((item) => entries.push({
      id: item.id,
      timestamp: item.decidedAt,
      label: `Decision: ${item.action}`,
      actor: item.decidedBy,
      summary: item.reason,
      kind: 'decision',
    }));
    revisions.forEach((item) => entries.push({
      id: item.id,
      timestamp: item.appliedAt,
      label: `BrandOS canonical revision ${item.revision}`,
      actor: item.appliedBy,
      summary: item.reason,
      kind: 'canonical',
    }));
    implementations.forEach((item) => entries.push({
      id: item.id,
      timestamp: item.implementedAt,
      label: 'Implemented',
      actor: item.implementedBy,
      summary: item.summary,
      kind: 'implementation',
    }));
    observations.forEach((item) => entries.push({
      id: item.id,
      timestamp: item.observedAt,
      label: `Observed: ${item.outcome}`,
      actor: item.observedBy,
      summary: item.summary,
      kind: 'observation',
    }));
    learningFollowUps.forEach((item) => entries.push({
      id: item.id,
      timestamp: item.createdAt,
      label: 'IntelligenceOS follow-up created',
      actor: item.createdBy,
      summary: item.summary,
      kind: 'learning',
    }));

    return entries.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
  }, [recommendation, decisionRecords, revisions, implementations, observations, learningFollowUps]);

  if (!recommendation) {
    return (
      <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', textDecoration: 'none', fontSize: 12 }}>← DecisionOS</a>
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center', marginTop: 22 }}>
            <h1 style={{ margin: '0 0 8px' }}>Decision record not found</h1>
            <p style={{ color: '#858999', margin: 0 }}>The recommendation may not exist in this browser-local Decision Engine store.</p>
          </section>
        </div>
      </main>
    );
  }

  const overdue = operationalMetadata ? isOperationallyOverdue(operationalMetadata) : false;

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <a href="/platform/decisionos/work" style={{ color: '#DABFFF', textDecoration: 'none', fontSize: 12 }}>← DecisionOS Work Queue</a>
          <div style={{ color: '#FFBFDE', fontSize: 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', marginTop: 18 }}>
            {recommendation.origin} → {recommendation.targetOS}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 22, alignItems: 'flex-start', marginTop: 7 }}>
            <div>
              <h1 style={{ fontSize: 35, margin: '0 0 8px' }}>{recommendation.title}</h1>
              <p style={{ color: '#B9BBC7', lineHeight: 1.65, margin: 0, maxWidth: 830 }}>{recommendation.summary}</p>
            </div>
            <span style={{ borderRadius: 999, border: '1px solid rgba(218,191,255,0.25)', color: '#DABFFF', padding: '7px 11px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' }}>
              {recommendation.status}
            </span>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 11, marginBottom: 18 }}>
          {[
            ['Confidence', recommendation.confidence],
            ['Priority', recommendation.priority],
            ['Owner', operationalMetadata?.owner || 'Unassigned'],
            ['Due', operationalMetadata?.dueAt ? new Date(operationalMetadata.dueAt).toLocaleDateString() : 'No deadline'],
          ].map(([label, value]) => (
            <div key={label} style={{ ...panelStyle, padding: 16 }}>
              <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 750, marginTop: 7 }}>{value}</div>
            </div>
          ))}
        </section>

        {(operationalMetadata?.isBlocked || overdue) && (
          <section style={{ ...panelStyle, borderColor: 'rgba(255,143,163,0.18)', background: 'rgba(255,143,163,0.035)', padding: 16, marginBottom: 18 }}>
            <div style={{ color: '#FF8FA3', fontWeight: 800 }}>{operationalMetadata?.isBlocked ? 'Blocked' : 'Overdue'}</div>
            <div style={{ color: '#B9BBC7', marginTop: 6, fontSize: 13 }}>{operationalMetadata?.blockerReason || 'This work item passed its due date.'}</div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(330px, 0.85fr)', gap: 18, alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 18 }}>
            <section style={{ ...panelStyle, padding: 22 }}>
              <h2 style={{ margin: '0 0 15px', fontSize: 20 }}>Recommendation record</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                <div><div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Reason</div><p style={{ color: '#D5D7E0', lineHeight: 1.6, margin: '6px 0 0' }}>{recommendation.reason}</p></div>
                <div><div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Recommended action</div><p style={{ color: '#D5D7E0', lineHeight: 1.6, margin: '6px 0 0' }}>{recommendation.recommendedAction}</p></div>
                <div><div style={{ color: '#858999', fontSize: 10, textTransform: 'uppercase' }}>Expected impact</div><p style={{ color: '#D5D7E0', lineHeight: 1.6, margin: '6px 0 0' }}>{recommendation.expectedImpact || 'Not specified.'}</p></div>
              </div>
            </section>

            <section style={{ ...panelStyle, padding: 22 }}>
              <h2 style={{ margin: '0 0 15px', fontSize: 20 }}>Evidence and proposed changes</h2>
              <div style={{ display: 'grid', gap: 10 }}>
                {recommendation.evidence.map((item) => (
                  <article key={item.id} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', padding: 13, background: 'rgba(0,0,0,0.12)' }}>
                    <div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }}>{item.type} · {item.strength}</div>
                    <div style={{ fontWeight: 700, marginTop: 6 }}>{item.source}</div>
                    <p style={{ color: '#AEB1BE', lineHeight: 1.55, margin: '7px 0 0', fontSize: 13 }}>{item.summary}</p>
                  </article>
                ))}
              </div>
              <pre style={{ whiteSpace: 'pre-wrap', margin: '14px 0 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.16)', padding: 13, color: '#D7D9E2', fontSize: 12, lineHeight: 1.55 }}>
                {JSON.stringify(recommendation.changes, null, 2)}
              </pre>
            </section>

            <section style={{ ...panelStyle, padding: 22 }}>
              <h2 style={{ margin: '0 0 15px', fontSize: 20 }}>Lifecycle timeline</h2>
              <div style={{ display: 'grid', gap: 0 }}>
                {timeline.map((item, index) => (
                  <article key={`${item.kind}-${item.id}`} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 9, height: 9, borderRadius: 999, background: '#DABFFF', marginTop: 5 }} />
                      {index < timeline.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 46, background: 'rgba(218,191,255,0.18)' }} />}
                    </div>
                    <div style={{ paddingBottom: index < timeline.length - 1 ? 16 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14 }}>
                        <strong>{item.label}</strong>
                        <span style={{ color: '#777B8D', fontSize: 10 }}>{formatTimestamp(item.timestamp)}</span>
                      </div>
                      {item.actor && <div style={{ color: '#8F93A3', fontSize: 11, marginTop: 4 }}>By {item.actor}</div>}
                      {item.summary && <p style={{ color: '#B9BBC7', lineHeight: 1.5, fontSize: 12, margin: '6px 0 0' }}>{item.summary}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside style={{ display: 'grid', gap: 18 }}>
            <section style={{ ...panelStyle, padding: 22 }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 19 }}>Operational coordination</h2>
              <div style={{ display: 'grid', gap: 11, fontSize: 13 }}>
                <div><span style={{ color: '#858999' }}>Owner</span><div style={{ marginTop: 4 }}>{operationalMetadata?.owner || 'Unassigned'}</div></div>
                <div><span style={{ color: '#858999' }}>Urgency</span><div style={{ marginTop: 4 }}>{operationalMetadata?.urgency || 'Normal'}</div></div>
                <div><span style={{ color: '#858999' }}>Next action</span><div style={{ marginTop: 4, lineHeight: 1.5 }}>{operationalMetadata?.nextAction || 'Not defined'}</div></div>
                <div><span style={{ color: '#858999' }}>Last coordination update</span><div style={{ marginTop: 4 }}>{operationalMetadata ? `${formatTimestamp(operationalMetadata.updatedAt)} by ${operationalMetadata.updatedBy}` : 'No metadata yet'}</div></div>
              </div>
              <a href="/platform/decisionos/work" style={{ display: 'block', marginTop: 16, color: '#DABFFF', textDecoration: 'none', fontSize: 12 }}>Edit in Work Queue →</a>
            </section>

            <section style={{ ...panelStyle, padding: 22 }}>
              <h2 style={{ margin: '0 0 14px', fontSize: 19 }}>Linked records</h2>
              <div style={{ display: 'grid', gap: 9, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#AEB1BE' }}>Decisions</span><strong>{decisionRecords.length}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#AEB1BE' }}>Canonical revisions</span><strong>{revisions.length}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#AEB1BE' }}>Implementations</span><strong>{implementations.length}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#AEB1BE' }}>Observations</span><strong>{observations.length}</strong></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#AEB1BE' }}>Learning follow-ups</span><strong>{learningFollowUps.length}</strong></div>
              </div>
            </section>

            {learningFollowUps.length > 0 && (
              <section style={{ ...panelStyle, padding: 22 }}>
                <h2 style={{ margin: '0 0 12px', fontSize: 19 }}>IntelligenceOS follow-ups</h2>
                <div style={{ display: 'grid', gap: 9 }}>
                  {learningFollowUps.map((item) => (
                    <a key={item.id} href={`/platform/decisionos/decision/${item.id}`} style={{ borderRadius: 11, border: '1px solid rgba(255,255,255,0.07)', padding: 11, color: '#F4F3F8', textDecoration: 'none' }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{item.title}</div>
                      <div style={{ color: '#8F93A3', fontSize: 11, marginTop: 4 }}>{item.status}</div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
