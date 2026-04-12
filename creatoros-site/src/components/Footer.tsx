import { Link } from 'react-router-dom';
import { SUPPORT_EMAIL } from '../config/site';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/offers', label: 'Offers' },
  { href: '/about', label: 'About' },
  { href: '/early-access', label: 'Early Access' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

const linkStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--text-3)',
  transition: 'color 0.15s',
};

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: '#0A0B10',
    }}>
      <div className="container" style={{ padding: '60px 24px 40px' }}>

        {/* Main row */}
        <div className="footer-grid" style={{ marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
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
                CreatorOS{' '}
                <span style={{ fontWeight: 400, fontSize: '12px', color: 'var(--text-3)', letterSpacing: '0.04em' }}>by LXST</span>
              </span>
            </Link>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '240px' }}>
              Clarity-first tools for creators and solo brands.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              style={{
                display: 'inline-block', marginTop: '14px',
                fontSize: '12px', color: 'var(--text-3)',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
            >
              {SUPPORT_EMAIL}
            </a>
          </div>

          {/* Nav links */}
          <nav className="footer-nav" style={{ display: 'flex', alignItems: 'flex-start' }}>
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} CreatorOS. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {legalLinks.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                style={{ fontSize: '12px', color: 'var(--text-3)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
