import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { t } from '../i18n';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../config/checkout';
import { useAuth } from '../contexts/AuthContext';

const links = [
  { href: '/', label: t.nav.home },
  { href: '/modules', label: t.nav.modules },
  { href: '/pricing', label: t.nav.pricing },
  { href: '/product', label: t.nav.product },
  { href: '/about', label: t.nav.about },
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
  const { isOwner, signOut } = useAuth();

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
                  background: 'linear-gradient(135deg, #F4F5F8 0%, #B4B8C7 100%)',
                  boxShadow: '0 0 8px rgba(232,234,237,0.35)',
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

            <div className="nav-desktop" style={{ alignItems: 'center', gap: '12px', flexShrink: 0 }}>
              {isOwner ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '6px 10px', borderRadius: '8px',
                    background: 'rgba(74, 222, 128, 0.08)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    fontSize: '12px', fontWeight: 600, color: '#4ADE80',
                    letterSpacing: '0.04em',
                  }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                    Owner
                  </span>
                  <button
                    type="button"
                    onClick={signOut}
                    style={{
                      padding: '6px 12px', borderRadius: '8px',
                      background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-3)', fontSize: '13px', fontWeight: 500,
                      cursor: 'pointer', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  to="/sign-in"
                  style={{
                    padding: '8px 14px', borderRadius: '8px',
                    fontSize: '13px', fontWeight: 500,
                    color: 'var(--text-3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  Sign in
                </Link>
              )}
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #D7DAE0 100%)',
                  color: '#08090C',
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 4px 16px rgba(232, 234, 237, 0.2)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                {t.nav.cta}
              </a>
            </div>

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

          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {isOwner ? (
              <button
                type="button"
                onClick={() => { signOut(); close(); }}
                style={{
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-3)', fontSize: '15px', fontWeight: 500,
                  cursor: 'pointer', textAlign: 'center',
                }}
              >
                Sign out (Owner)
              </button>
            ) : (
              <Link
                to="/sign-in"
                onClick={close}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '16px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-3)', fontSize: '15px', fontWeight: 500,
                }}
              >
                Sign in
              </Link>
            )}
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
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D7DAE0 100%)',
                color: '#08090C',
                fontSize: '17px',
                fontWeight: 700,
                boxShadow: '0 8px 28px rgba(232,234,237,0.25)',
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
