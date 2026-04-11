import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const fc = t.home.finalCta;

export function FinalCTA() {
  return (
    <section className="section" style={{ background: '#0A0B10' }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          padding: '100px 60px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #1A1D2A 0%, #0E0F14 60%, #141620 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          position: 'relative',
          overflow: 'hidden',
        }}>

          <div style={{
            position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: '700px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(255,191,222,0.1) 0%, rgba(218,191,255,0.05) 40%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.4) 50%, transparent)',
          }} />

          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: '24px',
            }}>
              {fc.headline}
            </h2>

            <p style={{
              fontSize: '18px', color: 'var(--text-3)', lineHeight: 1.7,
              maxWidth: '520px', margin: '0 auto 48px',
            }}>
              {fc.body}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/product" style={{
                padding: '18px 36px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14', fontSize: '17px', fontWeight: 700,
                boxShadow: '0 12px 40px rgba(255,191,222,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                transition: 'opacity 0.15s',
              }}>
                {fc.primaryCta}
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M3 9h12M9 3l6 6-6 6" stroke="#0E0F14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              <Link to="/early-access" style={{
                padding: '18px 28px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-2)', fontSize: '16px', fontWeight: 500,
                transition: 'all 0.15s',
              }}>
                {fc.secondaryCta}
              </Link>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '28px' }}>
              €127 · One-time · Instant digital download · No subscription
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
