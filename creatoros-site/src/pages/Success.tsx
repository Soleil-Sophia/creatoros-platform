import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';

const steps = [
  { number: '01', label: 'Open the kit', detail: 'Check your inbox — access arrives immediately after checkout.' },
  { number: '02', label: 'Start with the Start Here Guide', detail: 'It tells you exactly where to begin and what to skip.' },
  { number: '03', label: 'Work through the first clarity pass', detail: 'One pass through the Workbook. Most people finish in 60–90 minutes.' },
  { number: '04', label: 'Use the Notion Template', detail: 'Turn your decisions into a structured workspace you can actually work from.' },
];

const kitItems = [
  { label: 'Notion Template', detail: 'A clean workspace built for the clarity process.' },
  { label: 'Workbook', detail: 'Guided exercises that force useful output.' },
  { label: 'Prompt Assist', detail: 'Structured questions that cut to the real answer.' },
  { label: 'Start Here Guide', detail: 'Tells you exactly where to begin and what to skip.' },
];

function Divider() {
  return (
    <div style={{
      width: '100%', height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)',
    }} />
  );
}

export default function Success() {
  useMeta(
    'Success — CreatorOS',
    "You're in. Creator Clarity Kit by LXST is designed to help you move from idea overload to one clear, testable direction."
  );

  return (
    <div>

      {/* ── Hero ── */}
      <section style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: '680px' }}>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '6px',
                background: 'rgba(255,191,222,0.12)', border: '1px solid rgba(255,191,222,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path d="M2 5l2 2 4-4" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.08em' }}>
                Purchase confirmed
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.03em', lineHeight: 1,
              marginBottom: '24px',
            }}>
              You're in.<br />
              <span style={{ color: 'var(--text-2)' }}>Start with clarity.</span>
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--text-3)', lineHeight: 1.75, maxWidth: '540px' }}>
              Your Creator Clarity Kit is designed to help you move from idea overload to one clear, testable direction.
            </p>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── Delivery expectation ── */}
      <section style={{ padding: '52px 0' }}>
        <div className="container">
          <div style={{
            padding: '32px 40px',
            borderRadius: '16px',
            background: 'rgba(255,191,222,0.04)',
            border: '1px solid rgba(255,191,222,0.12)',
            display: 'flex', alignItems: 'flex-start', gap: '16px',
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '6px',
              background: 'rgba(255,191,222,0.1)', border: '1px solid rgba(255,191,222,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginTop: '2px',
            }}>
              <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path d="M5 1v4M5 7.5v.5" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7 }}>
                After purchase, you should receive access to the full kit right away. If anything looks off, reach out and we'll help you sort it out —{' '}
                <a href="mailto:hello@creatoros.co" style={{ color: 'var(--pink)', fontWeight: 500 }}>
                  hello@creatoros.co
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── What to do first ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-asym">

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                  First steps
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(28px, 3vw, 40px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
                marginBottom: '16px',
              }}>
                What to do first
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                Built for fast clarity — not overwhelm. Start here.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {steps.map(({ number, label, detail }, i) => (
                <div key={number} style={{
                  display: 'flex', gap: '24px', alignItems: 'flex-start',
                  padding: '28px 0',
                  borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700,
                    color: 'var(--pink)', letterSpacing: '0.05em',
                    width: '28px', flexShrink: 0, marginTop: '2px',
                  }}>
                    {number}
                  </div>
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>{label}</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.65 }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── What's included ── */}
      <section style={{ padding: '80px 0', background: '#0A0B10' }}>
        <div className="container">

          <div style={{ marginBottom: '48px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                Your kit
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 800, color: 'var(--text)',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              What's included
            </h2>
          </div>

          <div className="col-2-sm">
            {kitItems.map(({ label, detail }) => (
              <div key={label} style={{
                padding: '32px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.2), transparent)',
                }} />
                <div style={{
                  width: '20px', height: '20px', borderRadius: '6px', marginBottom: '20px',
                  background: 'rgba(218,191,255,0.1)', border: '1px solid rgba(218,191,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                    <path d="M2 5l2 2 4-4" stroke="#DABFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>{label}</p>
                <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.65 }}>{detail}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Divider />

      {/* ── Support ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="col-asym">

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
                  Support
                </span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 800, color: 'var(--text)',
                letterSpacing: '-0.02em', lineHeight: 1.2,
              }}>
                Need help?
              </h2>
            </div>

            <div>
              <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '32px' }}>
                If you have a delivery issue, a product question, or anything else — get in touch directly. No ticket system. No waiting.
              </p>

              <a href="mailto:hello@creatoros.co" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 24px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-2)', fontSize: '15px', fontWeight: 500,
                transition: 'all 0.15s',
              }}>
                hello@creatoros.co
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                  Delivery issue · Product question · Purchase support
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── Bottom nav ── */}
      <section style={{ padding: '60px 0', background: '#0A0B10', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px' }}>
            Built for fast clarity — not overwhelm.
          </p>
          <Link to="/product" style={{
            fontSize: '14px', color: 'var(--text-3)',
            textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.2)',
            textUnderlineOffset: '4px',
          }}>
            Back to product
          </Link>
        </div>
      </section>

    </div>
  );
}
