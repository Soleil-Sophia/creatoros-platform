import { Link } from 'react-router-dom';
import { t } from '../../i18n';

const st = t.home.studio;

export function CreatorOSStudio() {
  const cards = ['Dashboard', 'Inbox', 'ContentOS', 'Brand Voice', 'Growth Scanner', 'Calendar'];

  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {st.eyebrow}
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
          </div>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 3vw, 42px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.02em', lineHeight: 1.15,
            maxWidth: '580px', margin: '0 auto 16px',
          }}>
            {st.headline}
          </h2>

          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 32px' }}>
            {st.body}
          </p>

          <Link to="/early-access" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '14px 28px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--silver) 0%, #B4B8C7 100%)',
            color: '#08090C', fontSize: '15px', fontWeight: 700,
            boxShadow: '0 8px 32px var(--silver-glow), inset 0 1px 0 rgba(255,255,255,0.6)',
            transition: 'opacity 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {st.cta}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#08090C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {cards.map(card => (
            <div key={card} style={{
              padding: '24px',
              borderRadius: '16px',
              background: 'var(--bg-3)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              color: 'var(--text-2)',
              fontSize: '15px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}>
              {card}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
