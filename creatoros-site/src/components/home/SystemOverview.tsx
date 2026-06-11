import { t } from '../../i18n';

const so = t.home.systemOverview;

export function SystemOverview() {
  const workflow = ['BrandOS', 'ContentOS', 'LaunchOS', 'ManagementOS', 'AnalyticsOS'];

  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {so.eyebrow}
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
            maxWidth: '640px',
            margin: '0 auto 16px',
          }}>
            {so.headline}
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto' }}>
            {so.explain}
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '32px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--bg-3) 0%, var(--bg-4) 100%)',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            position: 'relative',
            width: '100%'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 50%, transparent)',
            }} />
            
            {workflow.map((m, idx) => (
              <div key={m} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'var(--bg-2)',
                  border: '1px solid var(--border-2)',
                  color: 'var(--text)',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)'
                }}>
                  {m}
                </div>
                {idx < workflow.length - 1 && (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
