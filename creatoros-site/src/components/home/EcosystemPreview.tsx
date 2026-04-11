import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const eco = t.home.ecosystem;

const modules = [
  {
    id: 'contentos',
    name: 'ContentOS',
    tagline: 'Your content production system.',
    description: 'Generate structured content assets. Save, organize, and reuse your best work.',
    status: 'active',
    accent: '#FFBFDE',
    number: '01',
  },
  {
    id: 'brandos',
    name: 'BrandOS',
    tagline: 'Your brand operating layer.',
    description: 'Define and maintain your brand voice, visual identity, and messaging framework.',
    status: 'planned',
    accent: '#DABFFF',
    number: '02',
  },
  {
    id: 'launchos',
    name: 'LaunchOS',
    tagline: 'Your offer launch system.',
    description: 'Plan, build, and execute product and offer launches with structured workflows.',
    status: 'planned',
    accent: '#B4E4FF',
    number: '03',
  },
  {
    id: 'analyticsos',
    name: 'AnalyticsOS',
    tagline: 'Your performance layer.',
    description: 'Understand what works, what converts, and where your energy should go.',
    status: 'planned',
    accent: '#BFFFDA',
    number: '04',
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {eco.eyebrow}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              {eco.headline}
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '32px' }}>
              {eco.body}
            </p>

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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {modules.map(({ name, tagline, description, status, accent, number }) => {
              const isActive = status === 'active';
              return (
                <div key={name} style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                  border: `1px solid ${isActive ? `${accent}25` : 'rgba(255,255,255,0.06)'}`,
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
        </div>
      </div>
    </section>
  );
}
