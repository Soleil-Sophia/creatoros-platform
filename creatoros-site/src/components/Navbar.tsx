import { Link, useLocation } from 'react-router-dom';
import { t } from '../i18n';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../config/checkout';

const links = [
  { href: '/', label: t.nav.home },
  { href: '/product', label: t.nav.product },
  { href: '/offers', label: t.nav.offers },
  { href: '/about', label: t.nav.about },
  { href: '/early-access', label: t.nav.earlyAccess },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(14, 15, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '40px' }}>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '4px',
                background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
              }} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>
              CreatorOS
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--text)' : 'var(--text-3)',
                    background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
              color: '#0E0F14',
              fontSize: '14px',
              fontWeight: 600,
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(255, 191, 222, 0.25)',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
