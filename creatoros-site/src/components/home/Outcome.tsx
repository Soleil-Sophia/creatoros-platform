import { t } from '../../i18n';

const o = t.home.outcome;

export function Outcome() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          <div style={{
             padding: '40px',
             borderRadius: '24px',
             background: 'linear-gradient(135deg, var(--bg-3) 0%, var(--bg-2) 100%)',
             border: '1px solid var(--border)',
             boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
             position: 'relative',
             overflow: 'hidden',
             order: 2
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(232, 234, 237, 0.3) 50%, transparent)',
            }} />
            <p style={{
              fontSize: '19px',
              color: 'var(--text-2)',
              lineHeight: 1.8,
            }}>
              {o.body}
            </p>
          </div>

          <div style={{ order: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {o.eyebrow}
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
              {o.headline}
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}
