import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const eco = t.home.ecosystem;

const modules = [
  {
    name: 'BrandOS',
    tagline: 'Brand Foundations & Positioning',
    description: 'Brand foundations, positioning, and messaging clarity.',
    status: 'active',
    accent: '#E7C6F3',
    number: '01',
  },
  {
    name: 'ContentOS',
    tagline: 'Content Workflows & Reusable Outputs',
    description: 'Content workflows, reusable outputs, and structured production.',
    status: 'active',
    accent: '#FFBFDE',
    number: '02',
  },
  {
    name: 'LaunchOS',
    tagline: 'Launch Planning & Campaign Execution',
    description: 'Launch planning, campaign execution, and rollout systems.',
    status: 'planned',
    accent: '#DABFFF',
    number: '03',
  },
  {
    name: 'ManagementOS',
    tagline: 'Operational Structure & Coordination',
    description: 'Operational structure, internal coordination, and system clarity.',
    status: 'planned',
    accent: '#C4B5FD',
    number: '04',
  },
  {
    name: 'AnalyticsOS',
    tagline: 'Performance Visibility & Decision Support',
    description: 'Performance visibility, feedback loops, and decision support.',
    status: 'planned',
    accent: '#B8A3FF',
    number: '05',
  },
];

const statusLabel: Record<string, string> = {
  active: 'Active',
  planned: 'In Development',
  beta: 'Beta',
};

export function EcosystemPreview() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {eco.eyebrow}
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {modules.map(({ name, tagline, description, status, accent, number }) => {
            const isActive = status === 'active';
            return (
              <div key={name} style={{
                padding: '28px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: `1px solid ${isActive ? `${accent}28` : 'rgba(255,255,255,0.06)'}`,
                opacity: isActive ? 1 : 0.7,
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {isActive && (
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                    background: `linear-gradient(90deg, transparent, ${accent}50, transparent)`,
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                    color: isActive ? accent : 'var(--text-3)',
                  }}>
                    {number}
                  </span>
                  <span style={{
                    fontSize: '11px', fontWeight: 600,
                    padding: '3px 8px', borderRadius: '100px',
                    background: isActive ? `${accent}14` : 'rgba(255,255,255,0.05)',
                    border: isActive ? `1px solid ${accent}25` : '1px solid rgba(255,255,255,0.08)',
                    color: isActive ? accent : 'var(--text-3)',
                  }}>
                    {statusLabel[status]}
                  </span>
                </div>

                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px', fontWeight: 700,
                  color: 'var(--text)', marginBottom: '6px',
                }}>
                  {name}
                </h4>
                <p style={{ fontSize: '12px', color: accent, fontWeight: 500, marginBottom: '12px' }}>
                  {tagline}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>
                  {description}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/early-access" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 22px', borderRadius: '10px',
            background: 'rgba(255,191,222,0.08)',
            border: '1px solid rgba(255,191,222,0.2)',
            color: 'var(--pink)', fontSize: '14px', fontWeight: 600,
            transition: 'all 0.15s',
          }}>
            Join early access
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
