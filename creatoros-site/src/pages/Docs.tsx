import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';

export default function Docs() {
  useMeta(
    'Documentation — CreatorOS',
    'Documentation for the CreatorOS platform and modules. Coming soon.'
  );

  return (
    <div>
      <section style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-160px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(218,191,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.4)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lilac)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Documentation
            </span>
            <div style={{ width: '24px', height: '1px', background: 'rgba(218,191,255,0.4)' }} />
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            maxWidth: '560px', margin: '0 auto 20px',
          }}>
            Docs are being built alongside the platform.
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--text-3)', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 40px' }}>
            Documentation for each CreatorOS module will be published as modules launch. Check back as the platform develops.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/modules" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 22px', borderRadius: '10px',
              background: 'rgba(218,191,255,0.08)',
              border: '1px solid rgba(218,191,255,0.2)',
              color: 'var(--lilac)', fontSize: '14px', fontWeight: 600,
            }}>
              View Modules
            </Link>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '12px 22px', borderRadius: '10px',
              fontSize: '14px', color: 'var(--text-3)',
              textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.15)',
              textUnderlineOffset: '3px',
            }}>
              Ask a question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
