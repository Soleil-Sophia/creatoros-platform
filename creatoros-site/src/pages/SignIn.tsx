import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';
import { useAuth } from '../contexts/AuthContext';

export default function SignIn() {
  useMeta('Sign In — CreatorOS', 'Owner sign in for CreatorOS platform.');
  const { isOwner, signIn, signOut } = useAuth();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!code.trim()) {
      setError('Please enter your access code.');
      return;
    }
    const ok = signIn(code);
    if (ok) {
      navigate('/modules');
    } else {
      setError('Invalid access code. Try again.');
    }
  };

  return (
    <div>
      <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden', minHeight: '70vh' }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', maxWidth: '440px' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Owner Access
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.15,
            marginBottom: '14px',
          }}>
            Sign in to the platform.
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '40px' }}>
            Owner access only. Use your access code to open modules in development — including those not yet public.
          </p>

          {isOwner ? (
            <div style={{
              padding: '28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(74, 222, 128, 0.18)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.4) 50%, transparent)',
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#4ADE80', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Signed in as Owner
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7, marginBottom: '20px' }}>
                You can now access all modules — including those in development.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to="/modules" style={{
                  padding: '12px 20px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                  color: '#0E0F14', fontSize: '14px', fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}>
                  Go to Modules →
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  style={{
                    padding: '12px 20px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'var(--text-3)', fontSize: '14px', fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{
              padding: '32px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.3) 50%, transparent)',
              }} />

              <label htmlFor="access-code" style={{
                display: 'block', fontSize: '12px', fontWeight: 600,
                color: 'var(--text-3)', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginBottom: '10px',
              }}>
                Access Code
              </label>
              <input
                id="access-code"
                type="password"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Enter your owner access code"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.25)',
                  border: `1px solid ${error ? 'rgba(248, 113, 113, 0.4)' : 'rgba(255,255,255,0.1)'}`,
                  color: 'var(--text)',
                  fontSize: '15px',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(218,191,255,0.5)';
                }}
                onBlur={e => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              />
              {error && (
                <p style={{ fontSize: '13px', color: '#F87171', marginTop: '10px' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                style={{
                  marginTop: '20px',
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                  color: '#0E0F14',
                  fontSize: '15px', fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(255,191,222,0.25)',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Sign In
              </button>

              <p style={{ fontSize: '12px', color: 'var(--text-3)', lineHeight: 1.6, marginTop: '20px', textAlign: 'center' }}>
                Not the owner? Join the{' '}
                <Link to="/early-access" style={{ color: 'var(--lilac)' }}>waitlist</Link>{' '}
                to get notified when modules launch publicly.
              </p>
            </form>
          )}

        </div>
      </section>
    </div>
  );
}
