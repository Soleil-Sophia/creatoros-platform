import { useMeta } from '../hooks/useMeta';

export default function Contact() {
  useMeta('Contact — CreatorOS');

  return (
    <div>
      <section style={{ padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-150px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', maxWidth: '640px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Contact
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '28px',
          }}>
            Contact
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '48px' }}>
            For product questions, partnerships, or general inquiries, reach out here.
          </p>

          <div style={{
            padding: '40px 48px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(218,191,255,0.3) 50%, transparent)',
            }} />

            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Email
            </p>
            <a
              href="mailto:hello@creatoros.co"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px', fontWeight: 700,
                color: 'var(--pink)',
                transition: 'opacity 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.75'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
            >
              hello@creatoros.co
            </a>

            <div style={{
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <p style={{ fontSize: '14px', color: 'var(--text-3)', lineHeight: 1.7 }}>
                We respond personally to every message. If you have a product question, include which tool you're asking about.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
