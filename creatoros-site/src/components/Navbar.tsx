import { useState } from 'react';
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

function HamburgerIcon({ open }: { open: boolean }) {
  const bar = (transform?: string, opacity?: number) => (
    <div style={{
      width: '20px', height: '2px',
      background: 'var(--text-2)',
      borderRadius: '1px',
      transition: 'transform 0.2s ease, opacity 0.15s ease',
      transform: transform ?? 'none',
      opacity: opacity ?? 1,
      flexShrink: 0,
    }} />
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
      {bar(open ? 'rotate(45deg) translate(5px, 5px)' : undefined)}
      {bar(undefined, open ? 0 : 1)}
      {bar(open ? 'rotate(-45deg) translate(5px, -5px)' : undefined)}
    </div>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(14, 15, 20, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '40px' }}>

            <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
                  CreatorOS
                </span>
                <span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-3)', letterSpacing: '0.08em', lineHeight: 1 }}>
                  by LXST
                </span>
              </div>
            </Link>

            <nav className="nav-desktop" style={{ alignItems: 'center', gap: '4px', flex: 1 }}>
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
              className="nav-desktop"
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

            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 11, 16, 0.98)',
          backdropFilter: 'blur(24px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 20px 40px',
          overflowY: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  onClick={close}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    fontSize: '18px',
                    fontWeight: active ? 600 : 400,
                    color: active ? 'var(--text)' : 'var(--text-3)',
                    background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                color: '#0E0F14',
                fontSize: '17px',
                fontWeight: 700,
                boxShadow: '0 8px 28px rgba(255,191,222,0.3)',
              }}
            >
              Get the Kit
            </a>
          </div>
        </div>
      )}
    </>
  );
}
