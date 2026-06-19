import { t } from '../../i18n';

const w = t.home.workflow;

export function CreatorOSWorkflow() {
  return (
    <section className="section" style={{ background: 'var(--bg-2)', position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '900px',
          background: 'radial-gradient(ellipse, rgba(232, 234, 237, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {w.eyebrow}
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
          </div>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            maxWidth: '720px',
            margin: '0 auto 16px',
          }}>
            {w.headline}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
            {w.subline}
          </p>
        </div>

        <div className="col-4">
          {w.steps.map((step, idx) => (
            <div
              key={step.module}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding: '28px 24px',
                borderRadius: '20px',
                background: 'linear-gradient(160deg, var(--bg-3) 0%, var(--bg-2) 100%)',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                overflow: 'hidden',
                minHeight: '100%',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(232, 234, 237, 0.35) 50%, transparent)',
              }} />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border-2)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--silver)',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                {idx < w.steps.length - 1 && (
                  <svg className="flow-arrow" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.01em',
                marginBottom: '8px',
              }}>
                {step.verb}
              </h3>

              <span style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'rgba(232, 234, 237, 0.06)',
                border: '1px solid rgba(232, 234, 237, 0.18)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--silver)',
                letterSpacing: '0.02em',
                marginBottom: '16px',
              }}>
                {step.module}
              </span>

              <p style={{
                fontSize: '14px',
                color: 'var(--text-2)',
                lineHeight: 1.65,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
