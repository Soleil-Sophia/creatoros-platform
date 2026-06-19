import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../config/checkout';

export default function Pricing() {
  useMeta(
    'Pricing — CreatorOS',
    'Access the CreatorOS platform. Start with the Creator Clarity Kit and expand into more modules as your needs grow.'
  );

  return (
    <div>
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Platform Access
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: '640px', margin: '0 auto 20px',
          }}>
            Start with one module. Expand as you grow.
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 16px' }}>
            CreatorOS is a modular platform — not a single subscription. Access starts with the first available module and expands as more become available.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '56px' }}>
            Full platform pricing coming as more modules launch.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '820px', margin: '0 auto', textAlign: 'left' }}>

            <div style={{
              padding: '40px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,191,222,0.2)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.5) 50%, transparent)',
              }} />
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '100px', background: 'rgba(255,191,222,0.1)', border: '1px solid rgba(255,191,222,0.2)', marginBottom: '24px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.06em' }}>Available now</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                Creator Clarity Kit
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', lineHeight: 1.6 }}>
                The first entry point into the CreatorOS platform. Defines your brand foundations and offer clarity — the layer everything else builds on.
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '48px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>
                €24
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '28px' }}>One-time · Instant access</p>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 24px', borderRadius: '12px', width: '100%', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                  color: '#0E0F14', fontSize: '15px', fontWeight: 700,
                  boxShadow: '0 8px 24px rgba(255,191,222,0.3)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Get the Kit
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2.5 7h9M8 3l4 4-4 4" stroke="#0E0F14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Notion Template', 'Workbook', 'Prompt Assist', 'Start Here Guide'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,191,222,0.5)' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '40px',
              borderRadius: '20px',
              background: 'rgba(23, 25, 35, 0.5)',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: 0.7,
            }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '24px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#6B7280' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.06em' }}>Coming soon</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
                Platform Access
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', lineHeight: 1.6 }}>
                Full access across all active CreatorOS modules — BrandOS, ContentOS, and future modules as they launch. Pricing to be confirmed.
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: 'var(--text-3)', marginBottom: '28px' }}>
                TBA
              </div>
              <Link
                to="/early-access"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px 24px', borderRadius: '12px', width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-3)', fontSize: '15px', fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                Join Early Access
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0 72px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 16px' }}>
            Questions about platform access or module roadmap?
          </p>
          <Link to="/contact" style={{ fontSize: '14px', color: 'var(--pink)', transition: 'opacity 0.15s' }}>
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
