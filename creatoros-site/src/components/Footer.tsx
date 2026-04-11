import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0A0B10',
    }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '60px' }}>

          {/* Brand */}
          <div style={{ gridColumn: '1 / 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '7px',
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{
                  width: '12px', height: '12px', borderRadius: '3px',
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
                }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                CreatorOS
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '220px' }}>
              The operating infrastructure for creators who think in systems.
            </p>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Product
            </p>
            {['Creator Clarity Kit', 'ContentOS', 'Early Access'].map(label => (
              <Link key={label} to="/" style={{ display: 'block', fontSize: '14px', color: 'var(--text-3)', marginBottom: '10px', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Company
            </p>
            {[{ label: 'About', href: '/about' }, { label: 'Offers', href: '/offers' }, { label: 'Early Access', href: '/early-access' }].map(({ label, href }) => (
              <Link key={label} to={href} style={{ display: 'block', fontSize: '14px', color: 'var(--text-3)', marginBottom: '10px', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Newsletter mini */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Stay in the loop
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '16px', lineHeight: 1.6 }}>
              Early access updates and new releases.
            </p>
            <Link to="/early-access" style={{
              display: 'inline-block',
              padding: '9px 18px',
              borderRadius: '8px',
              background: 'rgba(255, 191, 222, 0.1)',
              border: '1px solid rgba(255, 191, 222, 0.2)',
              color: 'var(--pink)',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.15s',
            }}>
              Get Early Access
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
            © 2026 CreatorOS. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-3)' }}>
            Built for creators who think in systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
