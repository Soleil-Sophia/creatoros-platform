import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const eco = t.home.ecosystem;

const modules = [
  {
    name: 'BrandOS',
    tagline: 'Brand Foundations & Positioning',
    description: 'Brand foundations, positioning, and messaging clarity.',
    status: 'active',
    number: '01',
  },
  {
    name: 'ContentOS',
    tagline: 'Content Workflows & Reusable Outputs',
    description: 'Content workflows, reusable outputs, and structured production.',
    status: 'active',
    number: '02',
  },
  {
    name: 'LaunchOS',
    tagline: 'Launch Planning & Campaign Execution',
    description: 'Launch planning, campaign execution, and rollout systems.',
    status: 'planned',
    number: '03',
  },
  {
    name: 'ManagementOS',
    tagline: 'Operational Structure & Coordination',
    description: 'Operational structure, internal coordination, and system clarity.',
    status: 'planned',
    number: '04',
  },
  {
    name: 'AnalyticsOS',
    tagline: 'Performance Visibility & Decision Support',
    description: 'Performance visibility, feedback loops, and decision support.',
    status: 'planned',
    number: '05',
  },
];

const statusLabel: Record<string, string> = {
  active: 'Active',
  planned: 'Planned',
};

export function EcosystemPreview() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {eco.eyebrow}
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            maxWidth: '580px', margin: '0 auto 16px',
          }}>
            {eco.headline}
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            {eco.body}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {modules.map(({ name, tagline, description, status, number }) => {
            const isActive = status === 'active';
            return (
              <div key={name} style={{
                padding: '32px',
                borderRadius: '20px',
                background: isActive ? 'linear-gradient(135deg, var(--bg-3) 0%, var(--bg-4) 100%)' : 'var(--bg-2)',
                border: `1px solid ${isActive ? 'var(--border-2)' : 'var(--border)'}`,
                opacity: isActive ? 1 : 0.6,
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isActive ? '0 12px 32px rgba(0,0,0,0.3)' : 'none',
              }}>
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
                    color: isActive ? 'var(--silver)' : 'var(--text-3)',
                  }}>
                    {number}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    padding: '4px 10px', borderRadius: '100px',
                    background: isActive ? 'rgba(232, 234, 237, 0.1)' : 'rgba(255,255,255,0.05)',
                    border: isActive ? `1px solid rgba(232, 234, 237, 0.2)` : '1px solid rgba(255,255,255,0.08)',
                    color: isActive ? 'var(--silver)' : 'var(--text-3)',
                    textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    {statusLabel[status]}
                  </span>
                </div>

                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px', fontWeight: 800,
                  color: 'var(--text)', marginBottom: '8px',
                }}>
                  {name}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500, marginBottom: '16px' }}>
                  {tagline}
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {description}
                </p>

                {isActive ? (
                  <Link to="/modules" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--silver)', fontSize: '14px', fontWeight: 600,
                  }}>
                    Explore
                    <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : (
                  <Link to="/early-access" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    color: 'var(--text-3)', fontSize: '14px', fontWeight: 600,
                  }}>
                    Join Waitlist
                  </Link>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
