import { t } from '../../i18n';

const hw = t.home.howItWorks;

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {hw.eyebrow}
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            maxWidth: '600px', margin: '0 auto',
          }}>
            {hw.headline}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {hw.steps.map(({ number, title, body }, i) => (
            <div key={number} style={{
              padding: '40px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {i < 2 && (
                <div style={{
                  position: 'absolute', top: '50px', right: '-12px',
                  width: '24px', height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  zIndex: 1,
                }} />
              )}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: i % 2 === 0
                  ? 'linear-gradient(90deg, transparent, rgba(255,191,222,0.25), transparent)'
                  : 'linear-gradient(90deg, transparent, rgba(218,191,255,0.25), transparent)',
              }} />

              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: i % 2 === 0 ? 'rgba(255,191,222,0.1)' : 'rgba(218,191,255,0.1)',
                border: `1px solid ${i % 2 === 0 ? 'rgba(255,191,222,0.2)' : 'rgba(218,191,255,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px', fontWeight: 700,
                  color: i % 2 === 0 ? 'var(--pink)' : 'var(--lilac)',
                }}>
                  {number}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px', fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.25,
                marginBottom: '16px',
              }}>
                {title}
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
