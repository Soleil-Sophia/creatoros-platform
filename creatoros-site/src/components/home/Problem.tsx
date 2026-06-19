import { t } from '../../i18n';

const p = t.home.problem;

export function Problem() {
  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {p.eyebrow}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}>
              {p.headline}
            </h2>
          </div>

          <div style={{
             padding: '40px',
             borderRadius: '24px',
             background: 'linear-gradient(135deg, var(--bg-3) 0%, var(--bg-4) 100%)',
             border: '1px solid var(--border)',
             boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
             position: 'relative',
             overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)',
            }} />
            <p style={{
              fontSize: '18px',
              color: 'var(--text-2)',
              lineHeight: 1.8,
            }}>
              {p.body}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
