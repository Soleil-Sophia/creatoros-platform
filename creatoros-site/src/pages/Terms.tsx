import { useMeta } from '../hooks/useMeta';

export default function Terms() {
  useMeta('Terms — CreatorOS');

  return (
    <div>
      <section style={{ padding: '100px 0 120px' }}>
        <div className="container" style={{ maxWidth: '680px' }}>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1px', background: 'rgba(255,191,222,0.5)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Legal
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 5vw, 52px)',
            fontWeight: 800, color: 'var(--text)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginBottom: '28px',
          }}>
            Terms of Use
          </h1>

          <div style={{
            padding: '36px 44px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #1A1D2A 0%, #141620 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            position: 'relative', overflow: 'hidden',
            marginBottom: '32px',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,191,222,0.25) 50%, transparent)',
            }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '6px', flexShrink: 0, marginTop: '2px',
                background: 'rgba(255,191,222,0.1)',
                border: '1px solid rgba(255,191,222,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                  <path d="M5 2v4M5 7.5v.5" stroke="#FFBFDE" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7 }}>
                This page is a placeholder. Full terms of use will be added before CreatorOS's public launch.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                title: 'Use of products',
                body: 'Digital products purchased from CreatorOS are for personal use. Redistribution or resale without permission is not permitted.',
              },
              {
                title: 'No warranties',
                body: 'CreatorOS products are provided as-is. We make no guarantees about specific business outcomes or results.',
              },
              {
                title: 'Purchases',
                body: 'All sales are final unless otherwise stated. If you have a question about your purchase, contact hello@creatoros.co.',
              },
              {
                title: 'Changes',
                body: 'We may update these terms over time. Continued use of CreatorOS products constitutes acceptance of the updated terms.',
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '28px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '18px', fontWeight: 700,
                  color: 'var(--text)', marginBottom: '12px',
                }}>
                  {title}
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '40px' }}>
            Last updated: 2026. Full legal information will be added before public launch.
          </p>
        </div>
      </section>
    </div>
  );
}
