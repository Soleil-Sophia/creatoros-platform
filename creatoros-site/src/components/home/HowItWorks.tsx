const steps = [
  {
    number: '01',
    title: 'Define your foundation.',
    body: 'Start with clarity. Use the Creator Clarity Kit to define your offer, identify your exact audience, and establish your positioning before you produce anything.',
    detail: 'Positioning → Audience → Angle',
  },
  {
    number: '02',
    title: 'Build your system.',
    body: 'Map your content strategy to output types. Know what you\'re making, why you\'re making it, and what it should achieve — before you open a blank document.',
    detail: 'Content Brief → Output Type → Format',
  },
  {
    number: '03',
    title: 'Generate and ship.',
    body: 'Use ContentOS to generate structured content assets — hooks, scripts, captions, plans — that reflect your positioning. Save, reuse, and compound over time.',
    detail: 'Create → Save → Reuse → Scale',
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container">

        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              How It Works
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            marginBottom: '20px',
          }}>
            From chaos to system<br />in three steps.
          </h2>

          <p style={{ fontSize: '17px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            The CreatorOS method starts with foundation, builds a system, and then generates output that scales.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {steps.map(({ number, title, body, detail }, i) => (
            <div key={number} style={{
              padding: '40px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Connecting line */}
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
                fontSize: '20px', fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.25,
                marginBottom: '16px',
              }}>
                {title}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '24px' }}>
                {body}
              </p>

              <div style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'inline-block',
              }}>
                <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
