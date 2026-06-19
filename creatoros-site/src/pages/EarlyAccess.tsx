import { useState } from 'react';
import { useMeta } from '../hooks/useMeta';

const perks = [
  { label: 'First access to ContentOS', description: 'Be among the first to use the full platform before public launch.' },
  { label: 'Founding member pricing', description: 'Lock in early pricing that will never be offered again after launch.' },
  { label: 'Shape what gets built', description: 'Your feedback directly influences which modules we build and when.' },
  { label: 'Early access to what comes next', description: 'Get access to new modules, platform tools, and early guides before public release.' },
];

export default function EarlyAccess() {
  useMeta('Early Access — CreatorOS', 'Join Early Access for future CreatorOS tools by LXST, new product drops, modular expansions, and early platform access.');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,191,222,0.09) 0%, rgba(218,191,255,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative' }}>
          <div className="col-2">

            {/* Left */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Early Access
                </span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                marginBottom: '24px',
              }}>
                Get in before<br />
                <span style={{
                  background: 'linear-gradient(135deg, #FFBFDE 0%, #DABFFF 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  the doors open.
                </span>
              </h1>

              <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '48px' }}>
                CreatorOS early access is for creators who want to build a content system — not just produce more content. Limited spots. Real influence over what gets built.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {perks.map(({ label, description }) => (
                  <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '7px',
                      background: 'rgba(255,191,222,0.1)',
                      border: '1px solid rgba(255,191,222,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '2px',
                    }}>
                      <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
                        <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{label}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div>
              <div className="card-pad" style={{
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
                border: '1px solid rgba(255,191,222,0.15)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.5) 50%, transparent)',
                }} />

                {!submitted ? (
                  <>
                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '26px', fontWeight: 800,
                      color: 'var(--text)', letterSpacing: '-0.02em',
                      marginBottom: '8px',
                    }}>
                      Request early access.
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-3)', marginBottom: '36px', lineHeight: 1.6 }}>
                      We'll send you a personal invite when your spot is confirmed.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                          Your name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sophie Müller"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                          style={{
                            width: '100%', padding: '14px 16px',
                            borderRadius: '10px', fontSize: '15px',
                            background: '#262A38',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text)',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="sophie@example.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          style={{
                            width: '100%', padding: '14px 16px',
                            borderRadius: '10px', fontSize: '15px',
                            background: '#262A38',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text)',
                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                          What best describes you?
                        </label>
                        <div className="select-wrapper">
                          <select>
                            <option>Content Creator</option>
                            <option>Consultant or Coach</option>
                            <option>Service Provider</option>
                            <option>Founder / Entrepreneur</option>
                            <option>Other</option>
                          </select>
                          <span className="select-chevron">
                            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                              <path d="M3 5l4 4 4-4" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%', padding: '16px',
                          borderRadius: '12px', fontSize: '16px', fontWeight: 700,
                          background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
                          color: '#0E0F14',
                          boxShadow: '0 12px 32px rgba(255,191,222,0.35)',
                          marginTop: '4px',
                          border: 'none', cursor: 'pointer',
                        }}
                      >
                        Request Access
                      </button>

                      <p style={{ fontSize: '12px', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6 }}>
                        No spam. No fluff. Just a personal invite when your spot is ready.
                      </p>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '16px',
                      background: 'rgba(255,191,222,0.1)',
                      border: '1px solid rgba(255,191,222,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}>
                      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" stroke="#FFBFDE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 800, color: 'var(--text)', marginBottom: '12px' }}>
                      You're on the list.
                    </h3>
                    <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                      Thank you, {name}. We'll send your personal invite to <span style={{ color: 'var(--pink)' }}>{email}</span> when your spot is confirmed.
                    </p>
                  </div>
                )}
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-3)', textAlign: 'center', marginTop: '20px' }}>
                We review applications personally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
