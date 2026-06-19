import { Link } from 'react-router-dom';
import { t } from '../../i18n';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../../config/checkout';

const fc = t.home.finalCta;

export function FinalCTA() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          padding: '100px 60px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, var(--bg-3) 0%, var(--bg-4) 100%)',
          border: '1px solid var(--border-2)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 32px 64px rgba(0,0,0,0.5)',
        }}>

          <div style={{
            position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(232, 234, 237, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)',
          }} />

          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: '40px',
              maxWidth: '800px', margin: '0 auto 40px'
            }}>
              {fc.headline}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/early-access" style={{
                padding: '18px 36px', borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--silver) 0%, #B4B8C7 100%)',
                color: '#08090C', fontSize: '17px', fontWeight: 700,
                boxShadow: '0 12px 40px var(--silver-glow), inset 0 1px 0 rgba(255,255,255,0.5)',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                transition: 'opacity 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                {fc.primaryCta}
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M3 9h12M9 3l6 6-6 6" stroke="#08090C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" style={{
                padding: '18px 28px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-2)', fontSize: '16px', fontWeight: 600,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                {fc.secondaryCta}
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
