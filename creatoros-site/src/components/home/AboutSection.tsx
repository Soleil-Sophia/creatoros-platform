import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const ab = t.home.about;

export function AboutSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{
          padding: '80px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
          border: '1px solid rgba(255,255,255,0.07)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.4) 50%, transparent)',
          }} />
          <div style={{
            position: 'absolute', top: '-100px', right: '-100px',
            width: '400px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(218,191,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', position: 'relative' }}>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {ab.eyebrow}
                </span>
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 42px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.15,
                marginBottom: '32px',
              }}>
                {ab.headline}
              </h2>

              <Link to="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 22px', borderRadius: '10px',
                background: 'rgba(218,191,255,0.08)',
                border: '1px solid rgba(218,191,255,0.2)',
                color: 'var(--lilac)', fontSize: '14px', fontWeight: 600,
                transition: 'all 0.15s',
              }}>
                Read the story
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div>
              <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.8 }}>
                {ab.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
