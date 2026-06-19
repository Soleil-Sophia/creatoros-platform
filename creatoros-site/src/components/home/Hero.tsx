import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const h = t.home.hero;

export function Hero() {
  return (
    <section style={{ padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(232, 234, 237, 0.08) 0%, rgba(232, 234, 237, 0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', borderRadius: '100px',
          background: 'rgba(232, 234, 237, 0.05)',
          border: '1px solid rgba(232, 234, 237, 0.1)',
          marginBottom: '24px',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--silver)' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--silver)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {h.eyebrow}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(44px, 7vw, 80px)',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          maxWidth: '840px',
          margin: '0 auto 28px',
        }}>
          {h.headline}
        </h1>

        <p style={{
          fontSize: 'clamp(17px, 2vw, 21px)',
          color: 'var(--text-2)',
          lineHeight: 1.7,
          maxWidth: '580px',
          margin: '0 auto 48px',
        }}>
          {h.subheadline}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/early-access" style={{
            padding: '16px 32px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--silver) 0%, #B4B8C7 100%)',
            color: '#08090C', fontSize: '16px', fontWeight: 700,
            boxShadow: '0 8px 32px var(--silver-glow), inset 0 1px 0 rgba(255,255,255,0.6)',
            transition: 'opacity 0.15s, transform 0.15s',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {h.primaryCta}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#08090C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/modules" style={{
            padding: '16px 24px', borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-2)', fontSize: '15px', fontWeight: 500,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'var(--text)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.color = 'var(--text-2)';
          }}
          >
            {h.secondaryCta}
          </Link>
        </div>

        <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.04em' }}>
            {h.trust}
          </p>
        </div>
      </div>
    </section>
  );
}
