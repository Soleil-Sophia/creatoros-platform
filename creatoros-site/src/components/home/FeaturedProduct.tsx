import { t } from '../../i18n';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../../config/checkout';

const fp = t.home.featuredProduct;

export function FeaturedProduct() {
  return (
    <section className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">

        <div style={{
          padding: '64px',
          borderRadius: '24px',
          background: 'var(--bg-3)',
          border: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(232, 234, 237, 0.3)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--silver)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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

            <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '32px' }}>
              {fp.subline}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '32px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '42px', fontWeight: 800,
                color: 'var(--text)', letterSpacing: '-0.02em',
              }}>
                {fp.price}
              </span>
              <span style={{ fontSize: '14px', color: 'var(--text-3)' }}>one-time access</span>
            </div>

            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text)', fontSize: '15px', fontWeight: 600,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
            >
              {fp.cta}
            </a>
          </div>

          <div style={{
            height: '100%',
            minHeight: '300px',
            borderRadius: '16px',
            background: 'var(--bg-4)',
            border: '1px solid var(--border-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
               position: 'absolute',
               inset: 0,
               background: 'radial-gradient(circle at center, rgba(232, 234, 237, 0.1) 0%, transparent 60%)',
            }} />
            <div style={{
               fontFamily: 'var(--font-heading)',
               fontSize: '24px',
               fontWeight: 800,
               color: 'var(--silver)',
               letterSpacing: '-0.02em',
               zIndex: 1
            }}>
               Creator Clarity Kit
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
