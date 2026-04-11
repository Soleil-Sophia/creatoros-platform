import { Link } from 'react-router-dom';

const includes = [
  {
    number: '01',
    title: 'Positioning Workbook',
    pages: '40 pages',
    description: 'A guided workbook that walks you through defining your offer with precision. What you do, who it\'s for, why you\'re the right person to deliver it, and how to communicate it clearly. Exercises, frameworks, and blank space to think.',
    outcomes: ['A clear, written positioning statement', 'Your differentiated angle', 'Your offer in one sentence'],
  },
  {
    number: '02',
    title: 'Audience Clarity Framework',
    pages: '1 framework + worksheet',
    description: 'A structured process to identify your ideal audience beyond surface-level demographics. Go deeper — motivations, language, worldview, awareness stage. Know who you\'re talking to, and more importantly, who you\'re not.',
    outcomes: ['1 primary audience profile', 'Language patterns and pain vocabulary', 'Awareness stage mapping'],
  },
  {
    number: '03',
    title: 'Content System Blueprint',
    pages: 'Template + guide',
    description: 'Build your personal content operating system from scratch. This blueprint gives you the structural layer: content pillars, output types, cadence planning, and a reuse strategy that compounds over time.',
    outcomes: ['3-5 content pillars defined', 'Output type selection', 'Weekly content architecture'],
  },
  {
    number: '04',
    title: 'Brand Voice Guide',
    pages: 'Template + examples',
    description: 'Define your tone, style, and non-negotiables so your content is unmistakably yours. Covers writing voice, word choices, what you avoid, and examples of your voice done right versus wrong.',
    outcomes: ['Tone definition (3 descriptors)', 'Voice do\'s and don\'ts', 'Before/after content examples'],
  },
  {
    number: '05',
    title: '30-Day Content Roadmap',
    pages: '30-day calendar + prompts',
    description: 'A structured first month of content with daily prompts, formats, and output goals. Not random ideas — a deliberate sequence that builds your presence, tests your positioning, and fills your library.',
    outcomes: ['30 content prompts mapped to your pillars', 'Output type variety built in', 'Metrics to track per week'],
  },
];

export default function Product() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,191,222,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Creator Clarity Kit
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '24px', maxWidth: '740px',
          }}>
            Your content foundation,<br />
            <span style={{
              background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              built to last.
            </span>
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '580px', marginBottom: '48px' }}>
            A structured digital kit that gives you the clarity, positioning, and content system every creator needs — before they produce a single piece.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '48px', fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>€127</div>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '4px' }}>One-time · Digital download</p>
            </div>
            <a href="#get" style={{
              padding: '18px 36px', borderRadius: '14px',
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14', fontSize: '17px', fontWeight: 700,
              boxShadow: '0 12px 40px rgba(255,191,222,0.35)',
              display: 'inline-flex', alignItems: 'center', gap: '10px',
            }}>
              Get the Kit
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                <path d="M3 9h12M9 3l6 6-6 6" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section style={{ padding: '80px 0 120px', background: '#0A0B10' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', marginBottom: '60px',
          }}>
            What's inside the kit.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {includes.map(({ number, title, pages, description, outcomes }) => (
              <div key={number} style={{
                padding: '44px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr',
                gap: '40px', alignItems: 'start',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.2), transparent)',
                }} />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,191,222,0.5)', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
                    {number}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                    {title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>{pages}</span>
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.75 }}>{description}</p>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
                    You'll have
                  </p>
                  {outcomes.map(o => (
                    <div key={o} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '5px',
                        background: 'rgba(255,191,222,0.1)',
                        border: '1px solid rgba(255,191,222,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '2px',
                      }}>
                        <svg width="8" height="8" fill="none" viewBox="0 0 8 8">
                          <path d="M1.5 4l2 2 3-3" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.5 }}>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get CTA */}
      <section id="get" style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Get the Creator Clarity Kit.
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-3)', marginBottom: '40px' }}>€127 · One-time purchase · Instant digital download</p>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '18px 40px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
            color: '#0E0F14', fontSize: '18px', fontWeight: 700,
            boxShadow: '0 16px 48px rgba(255,191,222,0.4)',
          }}>
            Buy Now — €127
          </a>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '20px' }}>
            No subscription. No upsell. Just the kit.
          </p>
        </div>
      </section>
    </div>
  );
}
