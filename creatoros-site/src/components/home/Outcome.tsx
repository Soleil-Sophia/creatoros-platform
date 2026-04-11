import { t } from '../../i18n';

const o = t.home.outcome;

export function Outcome() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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

          <div>
            <p style={{
              fontSize: '19px',
              color: 'var(--text-2)',
              lineHeight: 1.8,
            }}>
              {o.body}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
