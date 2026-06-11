import { t } from '../../i18n';

const bs = t.home.business;

export function CreatorOSBusiness() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{
          padding: '64px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--graphite) 0%, var(--bg-3) 100%)',
          border: '1px solid var(--border-2)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)',
          }} />
          
          <div style={{ maxWidth: '640px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {bs.eyebrow}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: '20px',
            }}>
              {bs.headline}
            </h2>

            <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.7 }}>
              {bs.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
