import { t } from '../../i18n';

const m = t.home.moduleSystem;

export function ModuleSystem() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {m.eyebrow}
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
            {m.headline}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            {m.subline}
          </p>
        </div>

        <div className="col-2-sm">
          {m.modules.map((mod, idx) => (
            <div
              key={mod.name}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                padding: '32px',
                borderRadius: '20px',
                background: 'linear-gradient(160deg, var(--bg-3) 0%, var(--bg-2) 100%)',
                border: '1px solid var(--border)',
                boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(232, 234, 237, 0.35) 50%, transparent)',
              }} />

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--text-3)',
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--text)',
                  letterSpacing: '-0.01em',
                }}>
                  {mod.name}
                </h3>
              </div>

              <p style={{
                fontSize: '14px',
                color: 'var(--text-2)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}>
                {mod.purpose}
              </p>

              <div style={{
                height: '1px',
                background: 'var(--border)',
                marginBottom: '20px',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--silver)',
                    marginBottom: '6px',
                  }}>
                    {m.inputsLabel}
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.55 }}>
                    {mod.inputs}
                  </p>
                </div>

                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden style={{ opacity: 0.5 }}>
                  <path d="M12 5v14M5 13l7 7 7-7" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div>
                  <span style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--silver)',
                    marginBottom: '6px',
                  }}>
                    {m.outputsLabel}
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.55 }}>
                    {mod.outputs}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
