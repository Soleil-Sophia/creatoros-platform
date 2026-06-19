import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';

const phases = [
  {
    label: 'Phase 1 — Foundation',
    status: 'active',
    accent: '#E7C6F3',
    items: [
      { name: 'Creator Clarity Kit', note: 'Live — available now', done: true },
      { name: 'BrandOS', note: 'Brand foundations & positioning module', done: true },
      { name: 'ContentOS', note: 'Content workflows & structured outputs', done: true },
    ],
  },
  {
    label: 'Phase 2 — Execution Layer',
    status: 'planned',
    accent: '#DABFFF',
    items: [
      { name: 'LaunchOS', note: 'Launch planning & campaign execution', done: false },
      { name: 'ManagementOS', note: 'Operational structure & coordination', done: false },
    ],
  },
  {
    label: 'Phase 3 — Intelligence Layer',
    status: 'planned',
    accent: '#B8A3FF',
    items: [
      { name: 'AnalyticsOS', note: 'Performance visibility & decision support', done: false },
      { name: 'Platform Access', note: 'Full cross-module platform access & pricing', done: false },
    ],
  },
];

const statusMeta: Record<string, string> = {
  active: 'In Progress',
  planned: 'Planned',
};

export default function Roadmap() {
  useMeta(
    'Roadmap — CreatorOS',
    'See what is being built inside the CreatorOS platform — active modules, upcoming launches, and the phased development plan.'
  );

  return (
    <div>
      <section style={{ padding: '100px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-160px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Platform Roadmap
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 58px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: '640px', marginBottom: '20px',
          }}>
            What is being built, and when.
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '520px', marginBottom: '64px' }}>
            CreatorOS is being built in phases. Each phase adds a new layer of the platform — from brand and content foundations to execution, operations, and analytics.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '680px' }}>
            {phases.map(({ label, status, accent, items }) => {
              const isActive = status === 'active';
              return (
                <div key={label} style={{
                  padding: '32px',
                  borderRadius: '18px',
                  background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                  border: `1px solid ${isActive ? `${accent}28` : 'rgba(255,255,255,0.06)'}`,
                  position: 'relative', overflow: 'hidden',
                  opacity: isActive ? 1 : 0.7,
                }}>
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                      background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
                    }} />
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>
                      {label}
                    </h2>
                    <span style={{
                      fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '100px',
                      background: isActive ? `${accent}14` : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isActive ? `${accent}25` : 'rgba(255,255,255,0.08)'}`,
                      color: isActive ? accent : 'var(--text-3)',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: isActive ? '#4ADE80' : '#6B7280' }} />
                      {statusMeta[status]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {items.map(({ name, note, done }) => (
                      <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '1px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: done ? `${accent}18` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${done ? `${accent}35` : 'rgba(255,255,255,0.08)'}`,
                        }}>
                          {done ? (
                            <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                              <path d="M2 5l2 2 4-4" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: done ? 'var(--text)' : 'var(--text-2)', marginBottom: '2px' }}>
                            {name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-3)' }}>{note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/early-access" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14', fontSize: '14px', fontWeight: 700,
            }}>
              Join Early Access
            </Link>
            <Link to="/modules" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-3)', fontSize: '14px', fontWeight: 500,
            }}>
              View all modules
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
