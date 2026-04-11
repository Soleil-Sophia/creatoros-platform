import { t } from '../../i18n';

const p = t.home.problem;

export function Problem() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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

          <div>
            <p style={{
              fontSize: '20px',
              fontWeight: 600,
              color: 'var(--text)',
              lineHeight: 1.6,
              marginBottom: '20px',
            }}>
              {p.hook}
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-3)',
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
