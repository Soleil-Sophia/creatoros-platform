import { useMemo } from 'react';
import {
  isOperationallyOverdue,
  listBrandOSRevisionRecords,
  listDecisionOperationalMetadata,
  listDecisionRecords,
  listImplementationRecords,
  listObservationRecords,
  listRecommendations,
} from '../../core/decision-engine';
import type { PlatformRecommendation, RecommendationStatus } from '../../core/decision-engine';

const panelStyle = {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(255,255,255,0.025)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
} as const;

const activeReviewStatuses: RecommendationStatus[] = ['recommended', 'in_review'];

function latestByUpdatedAt(items: PlatformRecommendation[], limit = 5): PlatformRecommendation[] {
  return [...items].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, limit);
}

function MetricCard({ label, value, hint, href }: { label: string; value: number; hint: string; href: string }) {
  return (
    <a href={href} style={{ ...panelStyle, padding: 18, color: 'inherit', textDecoration: 'none', display: 'block' }}>
      <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, marginTop: 8 }}>{value}</div>
      <div style={{ color: '#A6A9B7', fontSize: 12, lineHeight: 1.5, marginTop: 6 }}>{hint}</div>
    </a>
  );
}

function WorkflowLink({ title, description, count, href }: { title: string; description: string; count?: number; href: string }) {
  return (
    <a href={href} style={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 15, color: 'inherit', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'center' }}>
      <div>
        <div style={{ fontWeight: 750 }}>{title}</div>
        <div style={{ color: '#8F93A3', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>{description}</div>
      </div>
      <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>{typeof count === 'number' ? `${count} · ` : ''}Open →</div>
    </a>
  );
}

export function DecisionOSOverviewPage() {
  const recommendations = useMemo(() => listRecommendations(), []);
  const decisions = useMemo(() => listDecisionRecords(), []);
  const revisions = useMemo(() => listBrandOSRevisionRecords(), []);
  const implementations = useMemo(() => listImplementationRecords(), []);
  const observations = useMemo(() => listObservationRecords(), []);
  const operationalMetadata = useMemo(() => listDecisionOperationalMetadata(), []);

  const reviewQueue = recommendations.filter((item) => activeReviewStatuses.includes(item.status));
  const approved = recommendations.filter((item) => item.status === 'approved');
  const canonical = recommendations.filter((item) => item.status === 'canonical');
  const implemented = recommendations.filter((item) => item.status === 'implemented');
  const observed = recommendations.filter((item) => item.status === 'observed');
  const intelligenceFollowUps = recommendations.filter((item) => item.origin === 'intelligenceos');
  const blocked = operationalMetadata.filter((item) => item.isBlocked);
  const overdue = operationalMetadata.filter((item) => isOperationallyOverdue(item));
  const recent = latestByUpdatedAt(recommendations);

  return (
    <main style={{ minHeight: '100vh', background: '#0E0F14', color: '#F4F3F8', padding: 32 }}>
      <div style={{ maxWidth: 1220, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-start', marginBottom: 28 }}>
          <div>
            <div style={{ color: '#DABFFF', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DecisionOS · Functional Overview</div>
            <h1 style={{ fontSize: 36, margin: '10px 0 8px' }}>What needs a decision, implementation, or follow-up?</h1>
            <p style={{ color: '#9296A8', margin: 0, maxWidth: 790, lineHeight: 1.65 }}>
              DecisionOS coordinates the platform-wide decision lifecycle. It does not own specialist logic and never replaces explicit human approval.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 9 }}>
            <a href="/platform/decisionos/work" style={{ borderRadius: 11, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.035)', color: '#F4F3F8', padding: '11px 14px', fontWeight: 750, textDecoration: 'none', whiteSpace: 'nowrap' }}>Open Work Queue</a>
            <a href="/platform/decisions/review" style={{ borderRadius: 11, border: '1px solid rgba(218,191,255,0.25)', background: 'rgba(218,191,255,0.09)', color: '#E5D2FF', padding: '11px 14px', fontWeight: 750, textDecoration: 'none', whiteSpace: 'nowrap' }}>Open Review Queue</a>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, marginBottom: 20 }}>
          <MetricCard label="Awaiting review" value={reviewQueue.length} hint="Recommendations requiring a human decision." href="/platform/decisions/review" />
          <MetricCard label="Blocked work" value={blocked.length} hint="Decision lifecycle items with an explicit blocker." href="/platform/decisionos/work" />
          <MetricCard label="Overdue work" value={overdue.length} hint="Assigned work items past their due date." href="/platform/decisionos/work" />
          <MetricCard label="Canonical, not implemented" value={canonical.length} hint="Approved rules that still need implementation." href="/platform/decisions/outcomes" />
          <MetricCard label="Implemented, not observed" value={implemented.length} hint="Completed changes still waiting for evidence." href="/platform/decisions/outcomes" />
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(320px, 0.75fr)', gap: 18, alignItems: 'start' }}>
          <section style={{ ...panelStyle, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <div><div style={{ color: '#858999', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Next operational surfaces</div><h2 style={{ margin: '7px 0 0', fontSize: 20 }}>Decision lifecycle</h2></div>
              <span style={{ color: '#777B8D', fontSize: 12 }}>{recommendations.length} recommendations total</span>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <WorkflowLink title="Operational Work Queue" description="Assign owners, due dates, urgency, blockers, and the next action." count={blocked.length + overdue.length} href="/platform/decisionos/work" />
              <WorkflowLink title="Review Queue" description="Approve, reject, edit, or defer open platform recommendations." count={reviewQueue.length} href="/platform/decisions/review" />
              <WorkflowLink title="Canonical Apply" description="Compare approved BrandOS changes before creating a canonical revision." count={approved.length} href="/platform/decisions/apply/brandos" />
              <WorkflowLink title="Implementation & Observation" description="Record implementation and the real-world outcome that followed." count={canonical.length + implemented.length} href="/platform/decisions/outcomes" />
              <WorkflowLink title="IntelligenceOS Learning" description="Turn observed evidence patterns into reviewable recommendations." count={observed.length} href="/platform/intelligence/learning" />
              <WorkflowLink title="Decision History" description="Trace decisions, revisions, implementations, and observations." href="/platform/decisions/history" />
            </div>
          </section>

          <section style={{ ...panelStyle, padding: 22 }}>
            <div style={{ color: '#858999', fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>System record</div>
            <h2 style={{ margin: '7px 0 15px', fontSize: 20 }}>Current evidence base</h2>
            <div style={{ display: 'grid', gap: 9, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>Decision records</span><strong style={{ color: '#F4F3F8' }}>{decisions.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>Canonical BrandOS revisions</span><strong style={{ color: '#F4F3F8' }}>{revisions.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>Implementation records</span><strong style={{ color: '#F4F3F8' }}>{implementations.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>Observation records</span><strong style={{ color: '#F4F3F8' }}>{observations.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>Operational assignments</span><strong style={{ color: '#F4F3F8' }}>{operationalMetadata.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B9BBC7' }}><span>IntelligenceOS follow-ups</span><strong style={{ color: '#F4F3F8' }}>{intelligenceFollowUps.length}</strong></div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 16, paddingTop: 14, color: '#777B8D', fontSize: 11, lineHeight: 1.55 }}>Counts are derived from the current local Decision Engine store. Server-side identity, permissions, and persistence remain future infrastructure work.</div>
          </section>
        </div>

        <section style={{ ...panelStyle, padding: 22, marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}><h2 style={{ margin: 0, fontSize: 20 }}>Recently changed recommendations</h2><a href="/platform/decisions/history" style={{ color: '#DABFFF', fontSize: 12, textDecoration: 'none' }}>Open full history →</a></div>
          {recent.length === 0 ? <p style={{ color: '#777B8D', margin: 0 }}>No recommendations recorded yet.</p> : (
            <div style={{ display: 'grid', gap: 9 }}>{recent.map((item) => (
              <article key={item.id} style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.12)', padding: 13, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div><div style={{ color: '#FFBFDE', fontSize: 10, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase' }}>{item.origin} → {item.targetOS}</div><div style={{ fontWeight: 700, marginTop: 5 }}>{item.title}</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ color: '#DABFFF', fontSize: 11, fontWeight: 800 }}>{item.status}</div><div style={{ color: '#777B8D', fontSize: 10, marginTop: 4 }}>{new Date(item.updatedAt).toLocaleString()}</div></div>
              </article>
            ))}</div>
          )}
        </section>
      </div>
    </main>
  );
}
