import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const h = t.home.hero;

export function Hero() {
  return (
    <section style={{ padding: '120px 0 100px', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '900px', height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(255, 191, 222, 0.07) 0%, rgba(218, 191, 255, 0.04) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>

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
          <Link to="/product" style={{
            padding: '16px 32px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
            color: '#0E0F14', fontSize: '16px', fontWeight: 700,
            boxShadow: '0 8px 32px rgba(255, 191, 222, 0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            transition: 'opacity 0.15s',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
          }}>
            {h.primaryCta}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link to="/offers" style={{
            padding: '16px 32px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--text)', fontSize: '16px', fontWeight: 500,
            transition: 'all 0.15s',
          }}>
            {h.secondaryCta}
          </Link>
        </div>

        <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <div style={{ display: 'flex' }}>
            {['#FFBFDE', '#DABFFF', '#B4B8C7', '#8B8F9E'].map((c, i) => (
              <div key={i} style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: `linear-gradient(135deg, ${c}40, ${c}20)`,
                border: '2px solid #0E0F14',
                marginLeft: i > 0 ? '-8px' : '0',
              }} />
            ))}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginLeft: '8px' }}>
            Join early access — <span style={{ color: 'var(--text-2)' }}>limited spots available</span>
          </p>
        </div>
      </div>
    </section>
  );
}
