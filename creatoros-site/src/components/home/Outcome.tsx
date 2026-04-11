const outcomes = [
  {
    icon: '◈',
    title: 'Clear positioning',
    body: 'Your content reflects a sharp, differentiated position — every piece reinforces what only you can say.',
    accent: '#FFBFDE',
  },
  {
    icon: '◉',
    title: 'Consistent output',
    body: 'A system that lets you produce structured content on demand — not just when you\'re inspired.',
    accent: '#DABFFF',
  },
  {
    icon: '◎',
    title: 'A compounding library',
    body: 'Every asset you create becomes reusable. Your library grows. Your effort compounds.',
    accent: '#FFBFDE',
  },
  {
    icon: '●',
    title: 'Higher conversion',
    body: 'Positioned content converts. When your messaging is clear, the right people respond.',
    accent: '#DABFFF',
  },
];

export function Outcome() {
  return (
    <section className="section">
      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

          {/* Left — heading */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                The Outcome
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(30px, 3.5vw, 48px)',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}>
              What changes when you have a real content system.
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '40px', maxWidth: '460px' }}>
              A system doesn't just help you create more. It helps you create better — with clarity, direction, and an output that actually converts.
            </p>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '12px 20px',
              borderRadius: '10px',
              background: 'rgba(255,191,222,0.07)',
              border: '1px solid rgba(255,191,222,0.15)',
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FFBFDE' }} />
              <span style={{ fontSize: '13px', color: 'var(--text-2)', fontWeight: 500 }}>
                This is what ContentOS is built to deliver.
              </span>
            </div>
          </div>

          {/* Right — outcome cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {outcomes.map(({ icon, title, body, accent }) => (
              <div key={title} style={{
                padding: '28px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontSize: '22px', color: accent, marginBottom: '16px',
                  lineHeight: 1,
                }}>
                  {icon}
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px', fontWeight: 700,
                  color: 'var(--text)', marginBottom: '10px',
                }}>
                  {title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
