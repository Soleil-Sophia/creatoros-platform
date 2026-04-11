const problems = [
  {
    number: '01',
    title: 'You\'re creating constantly but not converting.',
    body: 'High output, low return. The work is real but the positioning isn\'t clear enough to turn attention into action.',
  },
  {
    number: '02',
    title: 'Your content doesn\'t reflect your real expertise.',
    body: 'What you produce doesn\'t match what you know. The gap between your depth and your output signals chaos — not authority.',
  },
  {
    number: '03',
    title: 'There\'s no system. Just execution.',
    body: 'Every piece of content starts from zero. No framework, no reuse, no compounding. You\'re busy, not building.',
  },
];

export function Problem() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">

        {/* Section label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          marginBottom: '20px',
        }}>
          <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            The Problem
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: '20px',
          maxWidth: '680px',
        }}>
          The real problem isn't output.<br />
          It's foundation.
        </h2>

        <p style={{ fontSize: '17px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '72px' }}>
          Most creators don't have a content problem. They have a positioning, clarity, and system problem. More content won't fix that.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {problems.map(({ number, title, body }) => (
            <div key={number} style={{
              padding: '36px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.2), transparent)',
              }} />
              <div style={{
                fontSize: '13px', fontWeight: 700, color: 'rgba(255,191,222,0.4)',
                letterSpacing: '0.08em', marginBottom: '20px',
                fontFamily: 'var(--font-heading)',
              }}>
                {number}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px', fontWeight: 700,
                color: 'var(--text)', lineHeight: 1.3, marginBottom: '14px',
              }}>
                {title}
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
