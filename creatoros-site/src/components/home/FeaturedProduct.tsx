import { Link } from 'react-router-dom';
import { t } from '../../i18n';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../../config/checkout';

const fp = t.home.featuredProduct;
const PRICE = fp.price;

const includes = [
  { label: 'Notion Template', description: 'Structure your thinking and turn ideas into decisions — a clean workspace built for the clarity process.' },
  { label: 'Workbook', description: 'Define your offer, audience, and angle without fluff. Guided exercises that force useful output.' },
  { label: 'Prompt Assist', description: 'Guided prompts for clearer, sharper thinking. Not AI filler — structured questions that cut to the real answer.' },
  { label: 'Start Here Guide', description: 'A simple path so you don\'t stall or overbuild. Tells you exactly where to begin and what to skip.' },
];

export function FeaturedProduct() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">

        <div className="col-2" style={{ alignItems: 'center' }}>

          {/* Left — product visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: '-40px',
              background: 'radial-gradient(ellipse at center, rgba(255,191,222,0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,191,222,0.15)',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.5) 50%, transparent)',
              }} />

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

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '42px', fontWeight: 800,
                  color: 'var(--text)', letterSpacing: '-0.02em',
                }}>
                  {PRICE}
                </span>
                <span style={{ fontSize: '14px', color: 'var(--text-3)' }}>one-time · instant access</span>
              </div>

              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', padding: '16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14', fontSize: '16px', fontWeight: 700,
                boxShadow: '0 12px 32px rgba(255,191,222,0.3)',
                transition: 'opacity 0.15s',
              }}>
                {t.nav.cta}
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — what's inside */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {fp.eyebrow}
              </span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.15,
              marginBottom: '16px',
            }}>
              {fp.headline}
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '40px' }}>
              {fp.body}
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

            <div style={{ marginTop: '32px' }}>
              <Link to="/product" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 22px', borderRadius: '10px',
                background: 'rgba(255,191,222,0.08)',
                border: '1px solid rgba(255,191,222,0.2)',
                color: 'var(--pink)', fontSize: '14px', fontWeight: 600,
                transition: 'all 0.15s',
              }}>
                {fp.cta}
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
