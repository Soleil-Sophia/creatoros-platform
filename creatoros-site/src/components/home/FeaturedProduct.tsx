import { Link } from 'react-router-dom';

const includes = [
  { label: 'Positioning Workbook', description: '40 guided pages to define your offer, angle, and audience with precision.' },
  { label: 'Audience Clarity Framework', description: 'A structured framework to identify exactly who you\'re creating for — and who you\'re not.' },
  { label: 'Content System Blueprint', description: 'Build your personal content operating system from scratch, step by step.' },
  { label: 'Brand Voice Guide', description: 'Define your tone, style, and non-negotiables so your content is unmistakably yours.' },
  { label: '30-Day Content Roadmap', description: 'A structured first month of content with daily prompts, formats, and output goals.' },
];

export function FeaturedProduct() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left — product visual */}
          <div style={{ position: 'relative' }}>
            {/* Glow */}
            <div style={{
              position: 'absolute', inset: '-40px',
              background: 'radial-gradient(ellipse at center, rgba(255,191,222,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Product card */}
            <div style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,191,222,0.15)',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top gradient line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.5) 50%, transparent)',
              }} />

              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '100px',
                background: 'rgba(255,191,222,0.1)',
                border: '1px solid rgba(255,191,222,0.2)',
                marginBottom: '32px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFBFDE' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.06em' }}>
                  Available Now
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '12px',
              }}>
                Creator Clarity Kit
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '36px', fontWeight: 800,
                color: 'var(--text)', letterSpacing: '-0.02em',
                lineHeight: 1.15, marginBottom: '16px',
              }}>
                Your content<br />foundation.
              </h3>

              <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '40px' }}>
                A structured digital kit to build clarity around your offer, audience, and content direction — before you produce a single piece.
              </p>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '42px', fontWeight: 800,
                  color: 'var(--text)', letterSpacing: '-0.02em',
                }}>
                  €127
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-3)' }}>one-time · digital download</span>
              </div>

              <Link to="/product" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', padding: '16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14', fontSize: '16px', fontWeight: 700,
                boxShadow: '0 12px 32px rgba(255,191,222,0.3)',
                transition: 'opacity 0.15s',
              }}>
                Get the Kit
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — what's inside */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Featured Product
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: '16px',
            }}>
              Start with clarity,<br />not content.
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '40px' }}>
              The Creator Clarity Kit gives you the foundational tools to define your positioning, identify your exact audience, and build a system that makes every piece of content intentional.
            </p>

            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
              What's inside
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {includes.map(({ label, description }) => (
                <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '6px',
                    background: 'rgba(255,191,222,0.1)',
                    border: '1px solid rgba(255,191,222,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '2px',
                  }}>
                    <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                      <path d="M2 5l2 2 4-4" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
