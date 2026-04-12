import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';
import { CREATOR_CLARITY_KIT_CHECKOUT_URL as CHECKOUT_URL } from '../config/checkout';

const PRICE = '€24';

const kitItems = [
  {
    number: '01',
    title: 'Notion Template',
    description: 'Structure your thinking and turn ideas into decisions — a clean workspace built for the clarity process.',
  },
  {
    number: '02',
    title: 'Workbook',
    description: 'Define your offer, audience, and angle without fluff. Guided exercises that force useful output.',
  },
  {
    number: '03',
    title: 'Prompt Assist',
    description: 'Guided prompts for clearer, sharper thinking. Not AI filler — structured questions that cut to the real answer.',
  },
  {
    number: '04',
    title: 'Start Here Guide',
    description: 'A simple path so you don\'t stall or overbuild. Tells you exactly where to begin and what to skip.',
  },
];

const steps = [
  { number: '01', title: 'Clarify', body: 'Choose the direction worth building first.' },
  { number: '02', title: 'Structure', body: 'Turn loose thoughts into a clear offer and message.' },
  { number: '03', title: 'Move', body: 'Make the next decisions fast and build with focus.' },
];

const faqs = [
  {
    q: 'Is this a course?',
    a: 'No. It\'s a focused kit (template + guide + prompts) designed to create clarity fast.',
  },
  {
    q: 'Do I need Notion?',
    a: 'The Notion template is part of the kit. If you don\'t use Notion yet, you can still use the workbook and prompts — but Notion gives you the best experience.',
  },
  {
    q: 'Is this for beginners or advanced creators?',
    a: 'Both — as long as the problem is too many ideas and no clear offer.',
  },
  {
    q: 'Will this build my whole business for me?',
    a: 'No. It helps you choose the right first direction and offer — the part most people skip.',
  },
  {
    q: 'How much is it?',
    a: `The Creator Clarity Kit is ${PRICE} and includes instant access to the full kit.`,
  },
  {
    q: 'Is this a subscription?',
    a: 'No. It\'s a one-time purchase.',
  },
  {
    q: 'How do I get it after buying?',
    a: 'You get instant access after checkout.',
  },
  {
    q: 'What if I\'m not ready yet?',
    a: 'Join Early Access to hear about future CreatorOS drops and updates.',
  },
];

function Eyebrow({ label, color = 'var(--pink)' }: { label: string; color?: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
      <div style={{ width: '24px', height: '1px', background: color === 'var(--pink)' ? 'rgba(255,191,222,0.5)' : 'rgba(218,191,255,0.5)' }} />
      <span style={{ fontSize: '12px', fontWeight: 600, color, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
        {label}
      </span>
    </div>
  );
}

function PrimaryButton({ href, children, large }: { href: string; children: React.ReactNode; large?: boolean }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: '10px',
      padding: large ? '18px 40px' : '16px 32px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #FFBFDE 0%, #E7C6F3 100%)',
      color: '#0E0F14',
      fontSize: large ? '17px' : '16px',
      fontWeight: 700,
      boxShadow: '0 12px 40px rgba(255,191,222,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
      transition: 'opacity 0.15s',
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
    >
      {children}
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="#0E0F14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function SecondaryButton({ to }: { to: string }) {
  return (
    <Link to={to} style={{
      color: 'var(--text-3)', fontSize: '14px', fontWeight: 400,
      textDecoration: 'underline',
      textDecorationColor: 'rgba(255,255,255,0.15)',
      textUnderlineOffset: '3px',
      transition: 'color 0.15s',
    }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'}
    >
      Join Early Access
    </Link>
  );
}

function Divider() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 50%, transparent)',
      margin: '0',
    }} />
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 0',
        gap: '24px',
      }}>
        <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.4 }}>{q}</p>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(45deg)' : 'none',
        }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
            <path d="M6 2v8M2 6h8" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      {open && (
        <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.75, paddingBottom: '24px' }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Product() {
  useMeta(
    'Creator Clarity Kit — €24 | CreatorOS',
    'A clarity-first starter kit by LXST to help creators and solo brands turn too many ideas into one clear, testable offer. Instant access after checkout.',
    '/og/og-product-creator-clarity-kit.png'
  );
  return (
    <div>

      {/* ── 1. Hero ────────────────────────────────────── */}
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(255,191,222,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <Eyebrow label="Creator Clarity Kit" />

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '24px', maxWidth: '720px',
          }}>
            Turn too many ideas into one clear, testable offer.
          </h1>

          <p style={{ fontSize: '19px', color: 'var(--text-2)', lineHeight: 1.7, maxWidth: '560px', marginBottom: '16px' }}>
            A clarity-first starter system that turns scattered thinking into a clear direction — so you can build one offer that actually makes sense.
          </p>

          <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.6, maxWidth: '480px', marginBottom: '48px' }}>
            Built for creators and solo brands who are tired of vague advice and messy starts.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '52px', fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1,
              }}>
                {PRICE}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '6px' }}>One-time · Instant access</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PrimaryButton href={CHECKOUT_URL} large>Get the Kit</PrimaryButton>
              <SecondaryButton to="/early-access" />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 2. What it is ─────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-2">

            <div>
              <Eyebrow label="What it is" />
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
                marginBottom: '20px',
              }}>
                What it is
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.8 }}>
                A focused kit to help you choose your first real offer, sharpen your positioning, and move from idea overload to structured action.
              </p>
            </div>

            <div style={{
              padding: '36px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.2), transparent)',
              }} />
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                What it's not
              </p>
              {[
                'Not a motivation download',
                'Not a random template dump',
                'Not a "build everything at once" system',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="8" height="8" fill="none" viewBox="0 0 8 8">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 3. Who it's for ───────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0A0B10' }}>
        <div className="container">
          <div className="col-2">

            <div>
              <Eyebrow label="Who it's for" color="var(--lilac)" />
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
                marginBottom: '28px',
              }}>
                Who it's for
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'You have too many directions and keep restarting',
                  "You're building a personal brand or solo business and need one clear offer",
                  'You want structure without turning your work into corporate process',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '2px',
                      background: 'rgba(218,191,255,0.1)',
                      border: '1px solid rgba(218,191,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              padding: '36px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.2), transparent)',
              }} />
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
                Not for you (yet)
              </p>
              {[
                "You already have one offer that's converting consistently",
                'You mainly want social media content ideas without offer work',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0, marginTop: '2px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="8" height="8" fill="none" viewBox="0 0 8 8">
                      <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="var(--text-3)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 4. Outcome ────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-2">

            <div>
              <Eyebrow label="What you walk away with" />
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
                marginBottom: '28px',
              }}>
                What you walk away with
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {[
                  'One clearer direction',
                  'One offer you can explain in a sentence',
                  'Cleaner positioning and decision-making',
                  'Less mental clutter, more momentum',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '2px',
                      background: 'rgba(255,191,222,0.1)',
                      border: '1px solid rgba(255,191,222,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{
                padding: '20px 24px',
                borderRadius: '12px',
                background: 'rgba(255,191,222,0.06)',
                border: '1px solid rgba(255,191,222,0.12)',
              }}>
                <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  The kit works because it forces selection, not expansion — clarity through constraints.
                </p>
              </div>
            </div>

            <div style={{
              padding: '48px',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #1F2230 0%, #171923 100%)',
              border: '1px solid rgba(255,191,222,0.15)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.5) 50%, transparent)',
              }} />

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '100px',
                background: 'rgba(255,191,222,0.1)',
                border: '1px solid rgba(255,191,222,0.2)',
                marginBottom: '32px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#FFBFDE' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.06em' }}>
                  Creator Clarity Kit
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '56px', fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '8px',
              }}>
                {PRICE}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', marginBottom: '36px' }}>
                One-time · Instant access
              </p>

              <PrimaryButton href={CHECKOUT_URL} large>Get the Kit</PrimaryButton>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Notion Template',
                  'Workbook',
                  'Prompt Assist',
                  'Start Here Guide',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,191,222,0.5)' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 5. What's inside ──────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0A0B10' }}>
        <div className="container">
          <div style={{ marginBottom: '56px' }}>
            <Eyebrow label="What's inside" color="var(--lilac)" />
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              What's inside
            </h2>
          </div>

          <div className="col-2-sm">
            {kitItems.map(({ number, title, description }) => (
              <div key={number} style={{
                padding: '36px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.2), transparent)',
                }} />
                <span style={{
                  fontSize: '12px', fontWeight: 700, color: 'rgba(218,191,255,0.5)',
                  letterSpacing: '0.08em', display: 'block', marginBottom: '16px',
                  fontFamily: 'var(--font-heading)',
                }}>
                  {number}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.75 }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 6. How to use it ──────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '56px' }}>
            <Eyebrow label="How to use it" />
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              How to use it
            </h2>
          </div>

          <div className="col-3" style={{ marginBottom: '40px' }}>
            {steps.map(({ number, title, body }, i) => (
              <div key={number} style={{
                padding: '36px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: i % 2 === 0
                    ? 'linear-gradient(90deg, transparent, rgba(255,191,222,0.2), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(218,191,255,0.2), transparent)',
                }} />
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', marginBottom: '24px',
                  background: i % 2 === 0 ? 'rgba(255,191,222,0.1)' : 'rgba(218,191,255,0.1)',
                  border: `1px solid ${i % 2 === 0 ? 'rgba(255,191,222,0.2)' : 'rgba(218,191,255,0.2)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700,
                    color: i % 2 === 0 ? 'var(--pink)' : 'var(--lilac)',
                  }}>
                    {number}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px',
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-3)', textAlign: 'center' }}>
            Most people finish the first pass in 60–90 minutes.
          </p>
        </div>
      </section>

      <Divider />

      {/* ── 7. Mid-page CTA ───────────────────────────── */}
      <section id="get" style={{ padding: '80px 0', background: '#0A0B10' }}>
        <div className="container">
          <div className="card-pad-lg" style={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #1A1D2A 0%, #0E0F14 60%, #141620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
              width: '600px', height: '300px',
              background: 'radial-gradient(ellipse, rgba(255,191,222,0.09) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.4) 50%, transparent)',
            }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.15,
                marginBottom: '36px',
              }}>
                Start building with clarity.
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <PrimaryButton href={CHECKOUT_URL} large>Get the Kit</PrimaryButton>
                <SecondaryButton to="/early-access" />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '24px' }}>
                {PRICE} · One-time purchase · Includes Notion Template, Workbook, Prompt Assist, and Start Here Guide
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 8. FAQ ────────────────────────────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-asym">

            <div>
              <Eyebrow label="FAQ" color="var(--lilac)" />
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                Questions
              </h2>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {faqs.map(({ q, a }) => (
                <FAQ key={q} q={q} a={a} />
              ))}
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 9. What happens after purchase ────────────── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-asym">

            <div>
              <Eyebrow label="After purchase" color="var(--lilac)" />
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                What happens next
              </h2>
            </div>

            <div>
              <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '40px' }}>
                After checkout, you'll receive instant access to the full Creator Clarity Kit — including the Notion Template, Workbook, Prompt Assist, and Start Here Guide. No waiting, no onboarding calls, no friction.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Instant access', detail: 'Everything arrives immediately after checkout.' },
                  { label: 'One-time purchase', detail: 'No subscription. No renewal. Yours to keep.' },
                  { label: 'No expiry', detail: 'Take as long as you need. There is no deadline.' },
                  { label: 'Built for fast clarity', detail: 'Most people complete the first pass in 60–90 minutes.' },
                ].map(({ label, detail }) => (
                  <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '6px',
                      background: 'rgba(218,191,255,0.1)',
                      border: '1px solid rgba(218,191,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '3px',
                    }}>
                      <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path d="M2 5l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{label}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '40px', padding: '28px 32px',
                borderRadius: '16px',
                background: 'rgba(218,191,255,0.04)',
                border: '1px solid rgba(218,191,255,0.12)',
              }}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '14px' }}>
                  How to start
                </p>
                <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '20px' }}>
                  Start with the Start Here Guide, then complete your first clarity pass before customizing anything. The goal is to make one strong decision first — not build everything at once.
                </p>
                {['Start simple', "Don't overbuild", 'Focus on one offer first'].map(tip => (
                  <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--lilac)', flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 10. Final CTA ─────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#0A0B10' }}>
        <div className="container">
          <div style={{
            padding: '100px 60px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #1A1D2A 0%, #0E0F14 60%, #141620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
              width: '700px', height: '400px',
              background: 'radial-gradient(ellipse, rgba(255,191,222,0.1) 0%, rgba(218,191,255,0.05) 40%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.4) 50%, transparent)',
            }} />

            <div style={{ position: 'relative' }}>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                Start with clarity.<br />Build with direction.
              </h2>

              <p style={{ fontSize: '18px', color: 'var(--text-3)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto 48px' }}>
                One kit. One clear offer. Less chaos.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <PrimaryButton href={CHECKOUT_URL} large>Get the Kit</PrimaryButton>
                <SecondaryButton to="/early-access" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  `${PRICE} — instant access`,
                  'One-time purchase',
                  'Notion Template, Workbook, Prompt Assist, Start Here Guide',
                ].map((line, i) => (
                  <span key={i} style={{ fontSize: '13px', color: 'var(--text-3)' }}>
                    {i > 0 && <span style={{ marginRight: '24px', opacity: 0.3 }}>·</span>}
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
