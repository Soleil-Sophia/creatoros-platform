import { useMemo, useState } from 'react';
import {
  getDecisionOperationalMetadata,
  getUnresolvedBlockingDependencies,
  isOperationallyOverdue,
  listRecommendations,
  saveDecisionOperationalMetadata,
} from '../../core/decision-engine';
import type {
  DecisionDependency,
  DecisionOperationalMetadata,
  OperationalUrgency,
  PlatformRecommendation,
} from '../../core/decision-engine';

const terminalStatuses = new Set(['rejected', 'observed']);

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

type DraftState = {
  owner: string;
  dueAt: string;
  urgency: OperationalUrgency;
  nextAction: string;
  isBlocked: boolean;
  blockerReason: string;
};

type QueueRow = {
  recommendation: PlatformRecommendation;
  metadata: DecisionOperationalMetadata | null;
  dependencyBlockers: DecisionDependency[];
};

function toDraft(metadata: DecisionOperationalMetadata | null): DraftState {
  return {
    owner: metadata?.owner || '',
    dueAt: metadata?.dueAt ? metadata.dueAt.slice(0, 10) : '',
    urgency: metadata?.urgency || 'normal',
    nextAction: metadata?.nextAction || '',
    isBlocked: metadata?.isBlocked || false,
    blockerReason: metadata?.blockerReason || '',
  };
}

function urgencyRank(urgency: OperationalUrgency): number {
  return { critical: 4, high: 3, normal: 2, low: 1 }[urgency];
}

export function DecisionOSWorkQueuePage() {
  const [refreshTick, setRefreshTick] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, DraftState>>({});
  const [filter, setFilter] = useState<'all' | 'blocked' | 'dependency' | 'overdue' | 'unassigned'>('all');

  const allRecommendations = useMemo(() => listRecommendations(), [refreshTick]);
  const recommendations = useMemo(
    () => allRecommendations.filter((item) => !terminalStatuses.has(item.status)),
    [allRecommendations],
  );
  const recommendationById = useMemo(
    () => new Map(allRecommendations.map((item) => [item.id, item])),
    [allRecommendations],
  );

  const rows = useMemo<QueueRow[]>(() => recommendations.map((recommendation) => ({
    recommendation,
    metadata: getDecisionOperationalMetadata(recommendation.id),
    dependencyBlockers: getUnresolvedBlockingDependencies(recommendation.id, allRecommendations),
  })).sort((a, b) => {
    const aBlocked = Boolean(a.metadata?.isBlocked || a.dependencyBlockers.length > 0);
    const bBlocked = Boolean(b.metadata?.isBlocked || b.dependencyBlockers.length > 0);
    if (aBlocked !== bBlocked) return aBlocked ? -1 : 1;
    const urgencyDifference = urgencyRank(b.metadata?.urgency || 'normal') - urgencyRank(a.metadata?.urgency || 'normal');
    if (urgencyDifference !== 0) return urgencyDifference;
    return a.recommendation.updatedAt < b.recommendation.updatedAt ? 1 : -1;
  }), [recommendations, allRecommendations]);

  const filteredRows = rows.filter(({ metadata, dependencyBlockers }) => {
    if (filter === 'blocked') return Boolean(metadata?.isBlocked || dependencyBlockers.length > 0);
    if (filter === 'dependency') return dependencyBlockers.length > 0;
    if (filter === 'overdue') return metadata ? isOperationallyOverdue(metadata) : false;
    if (filter === 'unassigned') return !metadata?.owner;
    return true;
  });

  const updateDraft = (recommendation: PlatformRecommendation, patch: Partial<DraftState>) => {
    setDrafts((current) => ({
      ...current,
      [recommendation.id]: {
        ...toDraft(getDecisionOperationalMetadata(recommendation.id)),
        ...current[recommendation.id],
        ...patch,
      },
    }));
  };

  const save = (recommendation: PlatformRecommendation) => {
    const draft = drafts[recommendation.id] || toDraft(getDecisionOperationalMetadata(recommendation.id));
    saveDecisionOperationalMetadata(recommendation, {
      owner: draft.owner,
      dueAt: draft.dueAt ? new Date(`${draft.dueAt}T23:59:59`).toISOString() : undefined,
      urgency: draft.urgency,
      nextAction: draft.nextAction,
      isBlocked: draft.isBlocked,
      blockerReason: draft.blockerReason,
      updatedBy: 'Current User',
    });
    setRefreshTick((value) => value + 1);
  };

  const counts = {
    total: rows.length,
    blocked: rows.filter((item) => item.metadata?.isBlocked || item.dependencyBlockers.length > 0).length,
    dependency: rows.filter((item) => item.dependencyBlockers.length > 0).length,
    overdue: rows.filter((item) => item.metadata && isOperationallyOverdue(item.metadata)).length,
    unassigned: rows.filter((item) => !item.metadata?.owner).length,
  };

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Work Queue</div>
            <h1 style={{ fontSize: 35, margin: '10px 0 8px' }}>Who owns the next step?</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 820, lineHeight: 1.65 }}>
              Manual blockers and unresolved decision dependencies are shown separately. Dependency blockers disappear automatically when all prerequisite recommendations are resolved.
            </p>
          </div>
          <a href="/platform/decisionos" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none', whiteSpace: 'nowrap' }}>← DecisionOS Overview</a>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 11, marginBottom: 18 }}>
          {([
            ['all', 'Active work', counts.total],
            ['blocked', 'All blocked', counts.blocked],
            ['dependency', 'Dependency blocked', counts.dependency],
            ['overdue', 'Overdue', counts.overdue],
            ['unassigned', 'Unassigned', counts.unassigned],
          ] as const).map(([value, label, count]) => (
            <button key={value} type="button" onClick={() => setFilter(value)} style={{ ...panelStyle, padding: 16, color: '#F4F3F8', textAlign: 'left', cursor: 'pointer', outline: filter === value ? '1px solid rgba(218,191,255,0.35)' : 'none' }}>
              <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              <div style={{ fontSize: 27, fontWeight: 800, marginTop: 7 }}>{count}</div>
            </button>
          ))}
        </section>

        {filteredRows.length === 0 ? (
          <section style={{ ...panelStyle, padding: 38, textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 8px' }}>No work items match this filter</h2>
            <p style={{ color: '#858999', margin: 0 }}>The operational queue is clear for this view.</p>
          </section>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {filteredRows.map(({ recommendation, metadata, dependencyBlockers }) => {
              const draft = drafts[recommendation.id] || toDraft(metadata);
              const overdue = metadata ? isOperationallyOverdue(metadata) : false;
              return (
                <section key={recommendation.id} style={{ ...panelStyle, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{recommendation.targetOS} · {recommendation.status}</div>
                      <h2 style={{ margin: '7px 0 5px', fontSize: 19 }}>
                        <a href={`/platform/decisionos/decision/${recommendation.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{recommendation.title}</a>
                      </h2>
                      <p style={{ color: '#AEB1BE', margin: 0, fontSize: 13, lineHeight: 1.55 }}>{recommendation.summary}</p>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: 11 }}>
                      {dependencyBlockers.length > 0 && <div style={{ color: '#DABFFF', fontWeight: 800 }}>Dependency blocked</div>}
                      {metadata?.isBlocked && <div style={{ color: '#FF8FA3', fontWeight: 800, marginTop: 4 }}>Manually blocked</div>}
                      {overdue && <div style={{ color: '#FFD37A', fontWeight: 800, marginTop: 4 }}>Overdue</div>}
                    </div>
                  </div>

                  {dependencyBlockers.length > 0 && (
                    <div style={{ marginTop: 14, borderRadius: 12, border: '1px solid rgba(218,191,255,0.18)', background: 'rgba(218,191,255,0.04)', padding: 12 }}>
                      <div style={{ color: '#DABFFF', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Waiting on prerequisites</div>
                      <div style={{ display: 'grid', gap: 7, marginTop: 8 }}>
                        {dependencyBlockers.map((dependency) => {
                          const blocker = recommendationById.get(dependency.blockerRecommendationId);
                          return (
                            <a key={dependency.id} href={`/platform/decisionos/decision/${dependency.blockerRecommendationId}`} style={{ color: '#D7D9E2', fontSize: 12, textDecoration: 'none' }}>
                              {blocker?.title || 'Missing prerequisite'} · {blocker?.status || 'unknown'}{dependency.reason ? ` — ${dependency.reason}` : ''}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 170px 150px', gap: 10, marginTop: 16 }}>
                    <input value={draft.owner} onChange={(event) => updateDraft(recommendation, { owner: event.target.value })} placeholder="Owner" style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11 }} />
                    <input type="date" value={draft.dueAt} onChange={(event) => updateDraft(recommendation, { dueAt: event.target.value })} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11 }} />
                    <select value={draft.urgency} onChange={(event) => updateDraft(recommendation, { urgency: event.target.value as OperationalUrgency })} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: '#15161D', color: '#F4F3F8', padding: 11 }}>
                      <option value="low">Low</option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <textarea value={draft.nextAction} onChange={(event) => updateDraft(recommendation, { nextAction: event.target.value })} placeholder="Next operational action" style={{ width: '100%', minHeight: 66, marginTop: 10, borderRadius: 10, border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(0,0,0,0.16)', color: '#F4F3F8', padding: 11, resize: 'vertical' }} />

                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#B9BBC7', fontSize: 12, marginTop: 10 }}>
                    <input type="checkbox" checked={draft.isBlocked} onChange={(event) => updateDraft(recommendation, { isBlocked: event.target.checked })} />
                    Add a separate manual blocker
                  </label>

                  {draft.isBlocked && (
                    <textarea value={draft.blockerReason} onChange={(event) => updateDraft(recommendation, { blockerReason: event.target.value })} placeholder="What is manually blocking progress?" style={{ width: '100%', minHeight: 58, marginTop: 9, borderRadius: 10, border: '1px solid rgba(255,143,163,0.18)', background: 'rgba(255,143,163,0.035)', color: '#F4F3F8', padding: 11, resize: 'vertical' }} />
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 12 }}>
                    <div style={{ color: '#777B8D', fontSize: 10.5 }}>
                      {metadata ? `Last updated ${new Date(metadata.updatedAt).toLocaleString()} by ${metadata.updatedBy}` : 'No operational owner or deadline assigned yet.'}
                    </div>
                    <button type="button" onClick={() => save(recommendation)} style={{ borderRadius: 10, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '9px 13px', fontWeight: 750, cursor: 'pointer' }}>Save work metadata</button>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
